import * as THREE from 'three';
import { getAssetUrl } from '../../utils/asset';
import gsap from 'gsap';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import type { GranthBook, BookshelfMode } from '../../types/bookshelf';
import { BookTextureFactory } from './BookTextureFactory';
import { bookAudio } from '../../utils/pageTurnSound';

interface BookMeshUserData {
  book: GranthBook;
  basePos: THREE.Vector3;
  baseRot: THREE.Euler;
  targetPos: THREE.Vector3;
  targetRot: THREE.Euler;
  hoverOffset: number;
  currentYLift: number;
  currentRotX: number;
}

export class BookshelfScene {
  private container: HTMLDivElement;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private animFrameId: number = 0;

  private books: GranthBook[];
  private bookMeshes: THREE.Mesh[] = [];
  private bookMeshMap: Map<string, THREE.Mesh> = new Map();

  private raycaster: THREE.Raycaster = new THREE.Raycaster();
  private mouse: THREE.Vector2 = new THREE.Vector2(-999, -999);
  private hoveredBook: GranthBook | null = null;
  private activeSelectedMesh: THREE.Mesh | null = null;
  private selectedBook: GranthBook | null = null;

  private mode: BookshelfMode = 'browsing';

  // 1. Unified 3D Shelf Group for physical inertia and subtle yaw/pitch sway
  private shelfGroup: THREE.Group = new THREE.Group();

  // 2. Lerped Mouse Vector for physical damping factor of 0.05
  private lerpedMouse: THREE.Vector2 = new THREE.Vector2(0, 0);

  // 3. Pointer-Event State Manager: locks interactions during GSAP transitions
  private isInteractionLocked: boolean = false;

  // Diya Lights for dynamic flicker
  private diyaLights: THREE.PointLight[] = [];

  // Floating Dust Particles
  private particles: THREE.Points | null = null;

  // Camera Orbit / Pan state
  private isPointerDown = false;
  private pointerStart = { x: 0, y: 0 };
  private cameraBaseY = 0.0;
  private cameraBaseX = -0.95;
  private cameraTargetY = 0.0;
  private cameraTargetX = -0.95;

  // 1. GSAP Ticker & Page Visibility synchronization
  private tickerCallback: (time: number, deltaTime: number, frame: number) => void;
  private visibilityHandler: () => void;
  private isTabActive: boolean = true;

  // 2. Hanging Pendant Lamp Damped Spring Physics (Harmonic Oscillator)
  private lampPivotGroup: THREE.Group = new THREE.Group();
  private lampAngleX: number = 0;
  private lampAngleZ: number = 0;
  private lampVelX: number = 0;
  private lampVelZ: number = 0;
  private readonly lampSpringK: number = 0.055;
  private readonly lampDamping: number = 0.045;

  // 3. Hanging Lamp interactive light state and clickable meshes
  private lampSpot!: THREE.SpotLight;
  private centerGlow!: THREE.PointLight;
  private shadeMesh!: THREE.Mesh;
  private bulbMesh!: THREE.Mesh;
  private bulbMat!: THREE.MeshBasicMaterial;
  private isLampLightOn: boolean = true;
  private lampClickableMeshes: THREE.Mesh[] = [];
  private prevMouse: THREE.Vector2 = new THREE.Vector2(0, 0);

  // 4. Analog Clock Hand Pivots (Real-Time local time tracking)
  private clockHourHandPivot: THREE.Group | null = null;
  private clockMinHandPivot: THREE.Group | null = null;
  private clockSecHandPivot: THREE.Group | null = null;

  // 5. Stored Bound Event Listeners for clean DOM removal
  private boundMouseMove = this.onMouseMove.bind(this);
  private boundMouseDown = this.onMouseDown.bind(this);
  private boundMouseUp = this.onMouseUp.bind(this);
  private boundClick = this.onClick.bind(this);
  private boundResize = this.onWindowResize.bind(this);

  // Callbacks
  public onHoverChange: (book: GranthBook | null, screenPos?: { x: number; y: number } | null) => void = () => {};
  public onBookOpened: (book: GranthBook) => void = () => {};
  public onReturnComplete: () => void = () => {};

  constructor(container: HTMLDivElement, books: GranthBook[]) {
    this.container = container;
    this.books = books;

    // 1. Scene & Warm Studio Atmosphere
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x171410); // Warm architectural graphite-wood
    this.scene.fog = new THREE.FogExp2(0x171410, 0.015); // Soft, gentle depth haze
    this.scene.add(this.shelfGroup);

    // 2. Adaptive Viewport Fitting Camera Setup
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    const aspect = width / height;

    const { fov, z: cameraZ } = this.calculateAdaptiveCameraFit();

    this.camera = new THREE.PerspectiveCamera(fov, aspect, 0.1, 100);
    this.camera.position.set(-0.95, 0.0, cameraZ);
    this.camera.lookAt(-0.5, 0.0, 0);

    // 3. Device Pixel Ratio (DPR) Optimization capped at 2
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.08;
    container.appendChild(this.renderer.domElement);

    // Initialize GPU Anisotropy setting (min 8 per shelf.js spec)
    BookTextureFactory.setMaxAnisotropy(this.renderer.capabilities.getMaxAnisotropy());

    // 4. Construct Elements
    this.setupLighting();
    this.buildRoomAndWindow();
    this.buildWoodenBookshelf();
    this.buildBooks();
    this.buildTempleParticles();

    // 5. Event Listeners
    this.bindEvents();

    // 6. GSAP Ticker Synchronization & Page Visibility API
    // Replaces standard requestAnimationFrame with GSAP Ticker to eliminate micro-stutter
    this.tickerCallback = (_time: number, _deltaTime: number) => {
      if (!this.isTabActive) return;
      this.renderTick();
    };
    gsap.ticker.add(this.tickerCallback);

    this.visibilityHandler = this.onVisibilityChange.bind(this);
    document.addEventListener('visibilitychange', this.visibilityHandler);
  }

  private onVisibilityChange() {
    if (document.hidden) {
      this.isTabActive = false;
      bookAudio.suspend();
    } else {
      this.isTabActive = true;
      bookAudio.resume();
    }
  }

  private setupLighting() {
    // 1. Dual-tone Hemisphere Light (Soft Sky Light from top + Warm Wood bounce from floor)
    const hemiLight = new THREE.HemisphereLight(0xdce7f6, 0x48321e, 1.45);
    this.scene.add(hemiLight);

    // 2. Main Overhead Key Directional Light (Casting soft shadows)
    const keyLight = new THREE.DirectionalLight(0xfff3e2, 3.2);
    keyLight.position.set(2.5, 7.5, 7.0);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 25;
    keyLight.shadow.camera.left = -6.5;
    keyLight.shadow.camera.right = 6.5;
    keyLight.shadow.camera.top = 4.5;
    keyLight.shadow.camera.bottom = -4.5;
    keyLight.shadow.bias = -0.00015;
    keyLight.shadow.normalBias = 0.02;
    keyLight.shadow.radius = 2.0;
    this.scene.add(keyLight);

    // 3. Front-Left Cool Fill Light (Brings out rich color separation on book covers)
    const fillLight = new THREE.DirectionalLight(0xc6d7ee, 1.4);
    fillLight.position.set(-6, 2.5, 6.5);
    this.scene.add(fillLight);

    // 4. Center Ambient Point Light (Warm room glow directly facing the books)
    this.centerGlow = new THREE.PointLight(0xffbe82, 2.6, 14, 1.3);
    this.centerGlow.position.set(0, 0.0, 4.8);
    this.scene.add(this.centerGlow);

    // 5. Overhead Hanging Pendant Lamp Spotlight (#ffc994 warm amber-peach per shelf.js spec)
    this.lampSpot = new THREE.SpotLight(0xffc994, 4.2, 18, Math.PI / 3.4, 0.55, 1.2);
    this.lampSpot.position.set(0, 3.65, 0.7);
    this.lampSpot.target.position.set(0, 0.2, 0.4);
    this.lampSpot.castShadow = true;
    this.lampSpot.shadow.mapSize.width = 2048;
    this.lampSpot.shadow.mapSize.height = 2048;
    this.lampSpot.shadow.camera.near = 0.5;
    this.lampSpot.shadow.camera.far = 8.0;
    this.lampSpot.shadow.bias = -0.0001;
    this.lampSpot.shadow.normalBias = 0.015;
    this.lampSpot.shadow.radius = 2.0;
    this.scene.add(this.lampSpot);
    this.scene.add(this.lampSpot.target);

    // 6. Cool Moonlight Streaming from Left Window (#7f9fd6 blue moonlight per shelf.js spec)
    const moonLight = new THREE.DirectionalLight(0x7f9fd6, 1.8);
    moonLight.position.set(-9.0, 3.8, 2.5);
    moonLight.target.position.set(-1.0, 0.0, 0.0);
    this.scene.add(moonLight);
    this.scene.add(moonLight.target);

    // Soft moon point glow near the window to illuminate the frame & sill with atmospheric radiance
    const moonGlow = new THREE.PointLight(0xa5c4ea, 1.4, 7.0, 1.5);
    moonGlow.position.set(-7.2, 1.8, 0.6);
    this.scene.add(moonGlow);

    // 7. Four Brass Diya Oil Lamps positioned gracefully along shelf corners
    const diyaPositions = [
      new THREE.Vector3(-4.9, 1.15, 0.8),
      new THREE.Vector3(4.9, 1.15, 0.8),
      new THREE.Vector3(-4.9, -0.7, 0.8),
      new THREE.Vector3(4.9, -0.7, 0.8)
    ];

    diyaPositions.forEach(pos => {
      const diya = new THREE.PointLight(0xff9e38, 2.4, 7, 1.6);
      diya.position.copy(pos);
      this.scene.add(diya);
      this.diyaLights.push(diya);

      // Brass Diya Lamp Geometry
      const diyaMat = new THREE.MeshStandardMaterial({
        color: 0xdeb86a,
        roughness: 0.28,
        metalness: 0.85
      });
      const bowl = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.08, 0.12, 16), diyaMat);
      bowl.position.set(pos.x, pos.y - 0.10, pos.z - 0.15);
      this.scene.add(bowl);

      // Flame glow mesh
      const flameMat = new THREE.MeshBasicMaterial({ color: 0xffdf78 });
      const flame = new THREE.Mesh(new THREE.SphereGeometry(0.045, 8, 8), flameMat);
      flame.position.set(pos.x, pos.y - 0.02, pos.z - 0.15);
      this.scene.add(flame);
    });
  }

  private buildRoomAndWindow() {
    // 1. Architectural Dark Walnut Window Frame
    const frameWood = new THREE.MeshStandardMaterial({
      color: 0x3d2b1f,
      roughness: 0.45,
      metalness: 0.05
    });

    const winWidth = 2.8;
    const winHeight = 4.2;
    const winDepth = 0.22;
    const winPosX = -7.2;
    const winPosY = 0.65;
    const winPosZ = 0.2;

    // Deep Window Sill & Beveled Header Lintel
    const winSill = new THREE.Mesh(new THREE.BoxGeometry(winWidth + 0.35, 0.16, winDepth + 0.24), frameWood);
    winSill.position.set(winPosX, winPosY - winHeight / 2 - 0.08, winPosZ + 0.06);
    winSill.castShadow = true;
    winSill.receiveShadow = true;
    this.scene.add(winSill);

    const winTop = new THREE.Mesh(new THREE.BoxGeometry(winWidth + 0.25, 0.16, winDepth + 0.05), frameWood);
    winTop.position.set(winPosX, winPosY + winHeight / 2 + 0.08, winPosZ);
    winTop.castShadow = true;
    this.scene.add(winTop);

    // Left and Right Frame Jambs
    [-winWidth / 2, winWidth / 2].forEach(xOff => {
      const winSide = new THREE.Mesh(new THREE.BoxGeometry(0.14, winHeight, winDepth), frameWood);
      winSide.position.set(winPosX + xOff, winPosY, winPosZ);
      winSide.castShadow = true;
      this.scene.add(winSide);
    });

    // Architectural Window Mullions (Horizontal and Vertical Dividing Bars)
    const mullionMat = new THREE.MeshStandardMaterial({ color: 0x322319, roughness: 0.4 });
    const mullionV = new THREE.Mesh(new THREE.BoxGeometry(0.07, winHeight, 0.09), mullionMat);
    mullionV.position.set(winPosX, winPosY, winPosZ);
    mullionV.castShadow = true;
    this.scene.add(mullionV);

    [-winHeight / 6, winHeight / 4].forEach(yOff => {
      const mullionH = new THREE.Mesh(new THREE.BoxGeometry(winWidth, 0.07, 0.09), mullionMat);
      mullionH.position.set(winPosX, winPosY + yOff, winPosZ);
      mullionH.castShadow = true;
      this.scene.add(mullionH);
    });

    // Enclosing Architectural Window Reveals (Box connecting front frame to rear sky aperture)
    // Guarantees window aperture is 100% identical in size to the frame with zero light leaks
    const revealDepth = 0.32;
    const revealZ = winPosZ - revealDepth / 2;
    const innerW = winWidth - 0.14;
    const innerH = winHeight - 0.16;

    // Left reveal
    const revealL = new THREE.Mesh(new THREE.BoxGeometry(0.04, innerH, revealDepth), frameWood);
    revealL.position.set(winPosX - innerW / 2, winPosY, revealZ);
    revealL.receiveShadow = true;
    this.scene.add(revealL);

    // Right reveal
    const revealR = new THREE.Mesh(new THREE.BoxGeometry(0.04, innerH, revealDepth), frameWood);
    revealR.position.set(winPosX + innerW / 2, winPosY, revealZ);
    revealR.receiveShadow = true;
    this.scene.add(revealR);

    // Top reveal
    const revealT = new THREE.Mesh(new THREE.BoxGeometry(innerW, 0.04, revealDepth), frameWood);
    revealT.position.set(winPosX, winPosY + innerH / 2, revealZ);
    revealT.receiveShadow = true;
    this.scene.add(revealT);

    // Bottom reveal sill
    const revealB = new THREE.Mesh(new THREE.BoxGeometry(innerW, 0.04, revealDepth), frameWood);
    revealB.position.set(winPosX, winPosY - innerH / 2, revealZ);
    revealB.receiveShadow = true;
    this.scene.add(revealB);

    // 2. The Atmospheric Backdrop (Sky Texture with linear gradient from moon-blue #9fb0cf to twilight)
    // Sized to exactly back the window aperture flush at the rear of the reveals
    const skyTex = BookTextureFactory.createWindowSkyTexture();
    const skyMat = new THREE.MeshBasicMaterial({
      map: skyTex,
      depthWrite: false
    });
    const skyPanel = new THREE.Mesh(new THREE.PlaneGeometry(innerW + 0.1, innerH + 0.1), skyMat);
    skyPanel.position.set(winPosX, winPosY, winPosZ - revealDepth);
    this.scene.add(skyPanel);

    // 3. The Moon (The Emissive Source positioned gracefully in the upper-right window pane)
    const moonTex = BookTextureFactory.createMoonTexture();
    const moonMat = new THREE.MeshStandardMaterial({
      map: moonTex,
      transparent: true,
      opacity: 0.98,
      roughness: 0.2,
      metalness: 0.05,
      emissive: new THREE.Color(0xdce8fa),
      emissiveIntensity: 2.2,
      depthWrite: false
    });
    const moonSize = 1.15;
    const moon = new THREE.Mesh(new THREE.PlaneGeometry(moonSize, moonSize), moonMat);
    moon.position.set(winPosX + 0.42, winPosY + 0.82, winPosZ - revealDepth + 0.04);
    this.scene.add(moon);

    // 4. Potted Botanical Plant on Window Sill
    const potMat = new THREE.MeshStandardMaterial({ color: 0x8c5238, roughness: 0.6 });
    const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.09, 0.16, 16), potMat);
    pot.position.set(winPosX - 0.55, winPosY - winHeight / 2 + 0.08, winPosZ + 0.12);
    pot.castShadow = true;
    pot.receiveShadow = true;
    this.scene.add(pot);

    const plantMat = new THREE.MeshStandardMaterial({ color: 0x2e523c, roughness: 0.5 });
    const foliage = new THREE.Mesh(new THREE.DodecahedronGeometry(0.18, 1), plantMat);
    foliage.position.set(winPosX - 0.55, winPosY - winHeight / 2 + 0.26, winPosZ + 0.12);
    foliage.castShadow = true;
    this.scene.add(foliage);
  }

  private buildWoodenBookshelf() {
    // Procedural Wood Grain & Architectural Backboard Textures (generated via Canvas math)
    const woodTex = BookTextureFactory.createWoodGrainTexture();
    const backWoodTex = BookTextureFactory.createBackboardWoodTexture();

    // Warm Honey Walnut Teak Wood (Matte organic PBR properties with procedural grain)
    const woodMat = new THREE.MeshStandardMaterial({
      map: woodTex,
      roughness: 0.55,
      metalness: 0.02
    });

    const backWoodMat = new THREE.MeshStandardMaterial({
      map: backWoodTex,
      roughness: 0.68,
      metalness: 0.02
    });

    const brassTrimMat = new THREE.MeshStandardMaterial({
      color: 0xdeb86a,
      roughness: 0.28,
      metalness: 0.85
    });

    const shelfWidth = 11.0;
    const shelfDepth = 1.45;
    const shelfThickness = 0.10;

    // Helper to register frustum culled mesh into shelf group
    const addToShelf = (mesh: THREE.Mesh) => {
      mesh.geometry.computeBoundingBox();
      mesh.geometry.computeBoundingSphere();
      mesh.frustumCulled = true;
      this.shelfGroup.add(mesh);
      return mesh;
    };

    // 1. Solid Back Wall Panel (Rich warm dark teak backing)
    const backPanel = new THREE.Mesh(
      new THREE.BoxGeometry(shelfWidth + 0.8, 6.6, 0.12),
      backWoodMat
    );
    backPanel.position.set(0, 0.05, -shelfDepth / 2 - 0.02);
    backPanel.castShadow = true;
    backPanel.receiveShadow = true;
    addToShelf(backPanel);

    // 2. Left and Right Fluted Pillars with Anti-Sharp Beveled Edges (RoundedBoxGeometry)
    const pillarHeight = 6.6;
    const pillarWidth = 0.38;
    [-shelfWidth / 2 - pillarWidth / 2, shelfWidth / 2 + pillarWidth / 2].forEach(x => {
      const pillar = new THREE.Mesh(
        new RoundedBoxGeometry(pillarWidth, pillarHeight, shelfDepth + 0.16, 2, 0.015),
        woodMat
      );
      pillar.position.set(x, 0.05, 0);
      pillar.castShadow = true;
      pillar.receiveShadow = true;
      addToShelf(pillar);

      // Brass Inlaid Flutes on Pillars
      const flute = new THREE.Mesh(
        new RoundedBoxGeometry(0.04, pillarHeight - 0.4, shelfDepth + 0.18, 2, 0.005),
        brassTrimMat
      );
      flute.position.set(x, 0.05, 0);
      flute.castShadow = true;
      flute.receiveShadow = true;
      addToShelf(flute);
    });

    // 3. Top Crown Cornice (Architectural Header Molding)
    const crown = new THREE.Mesh(
      new RoundedBoxGeometry(shelfWidth + 1.2, 0.26, shelfDepth + 0.24, 2, 0.015),
      woodMat
    );
    crown.position.set(0, 3.25, 0.04);
    crown.castShadow = true;
    crown.receiveShadow = true;
    addToShelf(crown);

    const crownLip = new THREE.Mesh(
      new RoundedBoxGeometry(shelfWidth + 1.25, 0.03, 0.04, 2, 0.005),
      brassTrimMat
    );
    crownLip.position.set(0, 3.12, shelfDepth / 2 + 0.14);
    crownLip.castShadow = true;
    crownLip.receiveShadow = true;
    addToShelf(crownLip);

    // 4. Bottom Foundation Plinth
    const plinth = new THREE.Mesh(
      new RoundedBoxGeometry(shelfWidth + 1.0, 0.26, shelfDepth + 0.20, 2, 0.015),
      woodMat
    );
    plinth.position.set(0, -2.95, 0.02);
    plinth.castShadow = true;
    plinth.receiveShadow = true;
    addToShelf(plinth);

    // 5. 4 Horizontal Shelves with Clearances & Beveled Edge Highlights
    // Crown Ceiling: Y = 2.85
    // Tier 0 Floor: Y = 0.95 (Clearance = 1.80 units)
    // Tier 1 Floor: Y = -0.90 (Clearance = 1.75 units)
    // Tier 2 Floor: Y = -2.75 (Clearance = 1.75 units)
    const shelfYPositions = [2.85, 0.95, -0.90, -2.75];

    shelfYPositions.forEach(y => {
      // RoundedBoxGeometry allows ambient spotlight to catch soft specular rim highlights
      const shelf = new THREE.Mesh(
        new RoundedBoxGeometry(shelfWidth, shelfThickness, shelfDepth, 2, 0.012),
        woodMat
      );
      shelf.position.set(0, y, 0);
      shelf.castShadow = true;
      shelf.receiveShadow = true;
      addToShelf(shelf);

      // Polished Brass Inlaid Lip on Front Edge
      const lip = new THREE.Mesh(
        new RoundedBoxGeometry(shelfWidth - 0.02, 0.028, 0.035, 2, 0.005),
        brassTrimMat
      );
      lip.position.set(0, y, shelfDepth / 2 + 0.018);
      lip.castShadow = true;
      lip.receiveShadow = true;
      addToShelf(lip);
    });

    // 6. Architectural Vertical Partition Dividers (Separating prop nooks from book tiers)
    [-3.4, 3.4].forEach(x => {
      const divider0 = new THREE.Mesh(
        new RoundedBoxGeometry(0.08, 1.80, shelfDepth - 0.08, 2, 0.008),
        woodMat
      );
      divider0.position.set(x, 1.90, 0);
      divider0.castShadow = true;
      divider0.receiveShadow = true;
      addToShelf(divider0);

      const divider1 = new THREE.Mesh(
        new RoundedBoxGeometry(0.08, 1.75, shelfDepth - 0.08, 2, 0.008),
        woodMat
      );
      divider1.position.set(x, 0.02, 0);
      divider1.castShadow = true;
      divider1.receiveShadow = true;
      addToShelf(divider1);
    });

    // 7. Decorative Brass Bookends for Tier 0 & Tier 1
    const bookendPositions = [
      { x: -2.3, y: 1.0 + 0.42, z: 0.25 },
      { x: 2.3, y: 1.0 + 0.42, z: 0.25 },
      { x: -2.5, y: -0.85 + 0.42, z: 0.25 },
      { x: 2.5, y: -0.85 + 0.42, z: 0.25 }
    ];

    bookendPositions.forEach(bPos => {
      const bookend = new THREE.Mesh(
        new RoundedBoxGeometry(0.08, 0.85, 0.85, 2, 0.010),
        brassTrimMat
      );
      bookend.position.set(bPos.x, bPos.y, bPos.z);
      bookend.castShadow = true;
      bookend.receiveShadow = true;
      addToShelf(bookend);
    });

    // 8. Overhead Hanging Pendant Lamp with Physical Pivot Anchor at (0, 4.9, 0.7)
    // Anchored for Damped Harmonic Spring Physics & Interactive Light Toggle
    const lampMat = new THREE.MeshStandardMaterial({
      color: 0x222224,
      roughness: 0.28,
      metalness: 0.82
    });

    this.lampPivotGroup = new THREE.Group();
    this.lampPivotGroup.position.set(0, 4.9, 0.7); // Ceiling anchor point

    // Suspension cord hangs down from y = 0 to y = -1.25 (length 1.25)
    const cord = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 1.25, 8), lampMat);
    cord.position.set(0, -0.625, 0);
    this.lampPivotGroup.add(cord);

    // Conical Brass/Iron Shade hangs at y = -1.25
    this.shadeMesh = new THREE.Mesh(new THREE.ConeGeometry(0.55, 0.38, 24, 1, true), lampMat);
    this.shadeMesh.position.set(0, -1.25, 0);
    this.lampPivotGroup.add(this.shadeMesh);

    // Inner warm brass reflector rim
    const innerRim = new THREE.Mesh(
      new THREE.CylinderGeometry(0.54, 0.54, 0.03, 24, 1, true),
      brassTrimMat
    );
    innerRim.position.set(0, -1.43, 0);
    this.lampPivotGroup.add(innerRim);

    // Incandescent Bulb inside shade at y = -1.35
    this.bulbMat = new THREE.MeshBasicMaterial({ color: 0xfffae8 });
    this.bulbMesh = new THREE.Mesh(new THREE.SphereGeometry(0.08, 16, 16), this.bulbMat);
    this.bulbMesh.position.set(0, -1.35, 0);
    this.lampPivotGroup.add(this.bulbMesh);

    // Hanging Pull String / Chain attached to the lamp shade rim
    const pullCordMat = new THREE.MeshStandardMaterial({
      color: 0xd4b886,
      roughness: 0.35,
      metalness: 0.75
    });
    const pullCord = new THREE.Mesh(
      new THREE.CylinderGeometry(0.005, 0.005, 0.65, 8),
      pullCordMat
    );
    pullCord.position.set(0.18, -1.65, 0.06);
    this.lampPivotGroup.add(pullCord);

    // Brass pull bead / acorn at the bottom of the pull string
    const pullBead = new THREE.Mesh(
      new THREE.SphereGeometry(0.03, 14, 14),
      brassTrimMat
    );
    pullBead.position.set(0.18, -1.98, 0.06);
    this.lampPivotGroup.add(pullBead);

    this.shelfGroup.add(this.lampPivotGroup);

    // Register all clickable lamp parts for hover swinging and click toggle
    this.lampClickableMeshes = [cord, this.shadeMesh, this.bulbMesh, pullCord, pullBead];

    // 9. Analog Library Clock on Tier 0 (right nook at x = 4.0)
    // Synchronized to real-time current local time with hour, minute, and second hands
    const clockGroup = new THREE.Group();
    clockGroup.position.set(4.0, 1.52, 0.25);

    const clockFrameMat = new THREE.MeshStandardMaterial({ color: 0x3d2719, roughness: 0.4, metalness: 0.1 });
    const clockDialMat = new THREE.MeshStandardMaterial({ color: 0xfbf8ee, roughness: 0.85, metalness: 0.02 });
    const clockFrame = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.38, 0.12, 32), clockFrameMat);
    clockFrame.rotation.x = Math.PI / 2;
    clockFrame.castShadow = true;
    clockGroup.add(clockFrame);

    const clockBezel = new THREE.Mesh(
      new THREE.CylinderGeometry(0.385, 0.385, 0.03, 32, 1, true),
      brassTrimMat
    );
    clockBezel.rotation.x = Math.PI / 2;
    clockBezel.position.set(0, 0, 0.055);
    clockGroup.add(clockBezel);

    const clockDial = new THREE.Mesh(new THREE.CircleGeometry(0.33, 32), clockDialMat);
    clockDial.position.set(0, 0, 0.065);
    clockGroup.add(clockDial);

    // 12 Classical Hour Markers
    const markerMat = new THREE.MeshBasicMaterial({ color: 0x24180f });
    for (let h = 0; h < 12; h++) {
      const angle = (h / 12) * Math.PI * 2;
      const isMajor = h % 3 === 0;
      const marker = new THREE.Mesh(
        new THREE.BoxGeometry(isMajor ? 0.016 : 0.008, isMajor ? 0.045 : 0.025, 0.004),
        markerMat
      );
      const r = 0.27;
      marker.position.set(Math.sin(angle) * r, Math.cos(angle) * r, 0.068);
      marker.rotation.z = -angle;
      clockGroup.add(marker);
    }

    const handMat = new THREE.MeshBasicMaterial({ color: 0x161616 });
    const secHandMat = new THREE.MeshBasicMaterial({ color: 0xb83a24 }); // Classic vermilion second hand

    // Hour hand pivot
    this.clockHourHandPivot = new THREE.Group();
    this.clockHourHandPivot.position.set(0, 0, 0.072);
    const hourHand = new THREE.Mesh(new THREE.BoxGeometry(0.022, 0.15, 0.006), handMat);
    hourHand.position.set(0, 0.065, 0); // Anchored at pivot base
    this.clockHourHandPivot.add(hourHand);
    clockGroup.add(this.clockHourHandPivot);

    // Minute hand pivot
    this.clockMinHandPivot = new THREE.Group();
    this.clockMinHandPivot.position.set(0, 0, 0.076);
    const minHand = new THREE.Mesh(new THREE.BoxGeometry(0.016, 0.22, 0.006), handMat);
    minHand.position.set(0, 0.10, 0); // Anchored at pivot base
    this.clockMinHandPivot.add(minHand);
    clockGroup.add(this.clockMinHandPivot);

    // Second hand pivot (continuous sweeping/ticking second hand)
    this.clockSecHandPivot = new THREE.Group();
    this.clockSecHandPivot.position.set(0, 0, 0.080);
    const secHand = new THREE.Mesh(new THREE.BoxGeometry(0.006, 0.26, 0.004), secHandMat);
    secHand.position.set(0, 0.08, 0);
    this.clockSecHandPivot.add(secHand);
    clockGroup.add(this.clockSecHandPivot);

    // Center brass cap
    const centerPin = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.024, 0.02, 16), brassTrimMat);
    centerPin.rotation.x = Math.PI / 2;
    centerPin.position.set(0, 0, 0.084);
    clockGroup.add(centerPin);

    this.shelfGroup.add(clockGroup);

    // 10. Glazed Ceramic Vase with Golden Wheat Stems on Tier 0 (left nook at x = -4.0)
    const vaseMat = new THREE.MeshStandardMaterial({ color: 0x8f7259, roughness: 0.35, metalness: 0.1 });
    const vase = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.12, 0.48, 20), vaseMat);
    vase.position.set(-4.0, 1.34, 0.25);
    vase.castShadow = true;
    vase.receiveShadow = true;
    addToShelf(vase);

    const stemMat = new THREE.MeshStandardMaterial({ color: 0xcca664, roughness: 0.5 });
    [-0.04, 0, 0.04].forEach((xOff, idx) => {
      const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.65, 8), stemMat);
      stem.position.set(-4.0 + xOff, 1.62, 0.25);
      stem.rotation.z = (idx - 1) * 0.12;
      stem.castShadow = true;
      addToShelf(stem);
    });

    // 11. Framed Sacred Miniature Artwork on Tier 1 (right nook at x = 4.0)
    // Showcases authentic sacred portrait of Maa Saraswati Devi from public/images
    const frameMesh = new THREE.Mesh(
      new RoundedBoxGeometry(0.68, 0.88, 0.06, 2, 0.008),
      brassTrimMat
    );
    frameMesh.position.set(4.0, -0.42, 0.25);
    frameMesh.castShadow = true;
    addToShelf(frameMesh);

    // Passe-partout cream border mount
    const mountMat = new THREE.MeshStandardMaterial({
      color: 0xf5f0e6,
      roughness: 0.85
    });
    const mountMesh = new THREE.Mesh(new THREE.PlaneGeometry(0.60, 0.80), mountMat);
    mountMesh.position.set(4.0, -0.42, 0.282);
    addToShelf(mountMesh);

    // Sacred Artwork Texture from /images/saraswati-devi.jpeg
    const textureLoader = new THREE.TextureLoader();
    const artTexture = textureLoader.load(getAssetUrl('/images/saraswati-devi.jpeg'), (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = BookTextureFactory.getMaxAnisotropy();
      tex.needsUpdate = true;
    });

    const artMat = new THREE.MeshStandardMaterial({
      map: artTexture,
      roughness: 0.35,
      metalness: 0.05
    });
    const art = new THREE.Mesh(new THREE.PlaneGeometry(0.52, 0.72), artMat);
    art.position.set(4.0, -0.42, 0.286);
    art.castShadow = true;
    art.receiveShadow = true;
    addToShelf(art);
  }

  private buildBooks() {
    const pageEdgeTex = BookTextureFactory.getPageEdgeTexture();
    const pageEdgeMat = new THREE.MeshStandardMaterial({
      map: pageEdgeTex,
      roughness: 0.85,
      metalness: 0.05
    });

    // Group books by shelf tier (0 = Top, 1 = Middle, 2 = Bottom)
    const tiers: Record<number, GranthBook[]> = { 0: [], 1: [], 2: [] };
    this.books.forEach(b => {
      if (tiers[b.shelfTier]) {
        tiers[b.shelfTier].push(b);
      }
    });

    // Exact floor Y where the book base rests (shelf center Y + shelfThickness / 2)
    const floorYByTier: Record<number, number> = {
      0: 1.00,
      1: -0.85,
      2: -2.70
    };

    [0, 1, 2].forEach(tierNum => {
      const tierBooks = tiers[tierNum];
      const count = tierBooks.length;
      if (count === 0) return;

      const spacing = tierNum === 0 ? 0.32 : tierNum === 1 ? 0.24 : 0.18;
      const totalWidth = tierBooks.reduce((acc, b) => acc + b.thickness + spacing, 0);
      let currentX = -totalWidth / 2 + 0.15;

      tierBooks.forEach((book, bookIdx) => {
        const spineTex = BookTextureFactory.createSpineTexture(book);
        const coverTex = BookTextureFactory.createCoverTexture(book);

        const spineMat = new THREE.MeshStandardMaterial({
          map: spineTex,
          roughness: 0.38,
          metalness: 0.24
        });

        const coverMat = new THREE.MeshStandardMaterial({
          map: coverTex,
          roughness: 0.35,
          metalness: 0.22
        });

        // 6 faces:
        // 0: Right (+X) -> Front Cover
        // 1: Left (-X) -> Back Cover
        // 2: Top (+Y) -> Top Page Edge
        // 3: Bottom (-Y) -> Bottom Page Edge
        // 4: Front (+Z) -> Spine (facing viewer on shelf)
        // 5: Back (-Z) -> Fore-edge (facing inner shelf wall)
        const materials = [
          coverMat,
          coverMat,
          pageEdgeMat,
          pageEdgeMat,
          spineMat,
          pageEdgeMat
        ];

        // Procedural Entropy (Organic Imperfection) per book:
        // Uses deterministic pseudo-random seeds per tier & index to mimic a curated, centuries-old sacred library
        const seed1 = Math.sin(tierNum * 17.3 + bookIdx * 31.7);
        const heightScale = 0.96 + (seed1 * 0.5 + 0.5) * 0.08; // scale factor between 0.96 and 1.04
        const bookHeight = book.height * heightScale;

        const seed2 = Math.cos(tierNum * 23.1 + bookIdx * 19.3);
        const thicknessScale = 0.95 + (seed2 * 0.5 + 0.5) * 0.10; // scale factor between 0.95 and 1.05
        const bookThickness = book.thickness * thicknessScale;

        const seed3 = Math.sin(tierNum * 11.7 + bookIdx * 43.1);
        const zJitter = seed3 * 0.015; // subtle ±0.015 unit depth variance on shelf slot

        const seed4 = Math.cos(tierNum * 29.5 + bookIdx * 13.9);
        const yawJitter = seed4 * 0.015; // subtle ±0.015 rad yaw variance
        const rollJitter = seed1 * 0.012; // subtle natural book lean

        // Soft-edged RoundedBoxGeometry (radius 0.014, segments 3)
        // Tiny gaps between adjacent books and shelf planks allow shadow engine to calculate natural contact shadows
        const geometry = new RoundedBoxGeometry(bookThickness, bookHeight, book.width, 3, 0.014);
        const mesh = new THREE.Mesh(geometry, materials);
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        const posX = currentX + bookThickness / 2;
        const posY = floorYByTier[tierNum] + bookHeight / 2;
        const posZ = 0.25 + zJitter;

        mesh.position.set(posX, posY, posZ);

        // Natural leaning tilt for end books on Tier 1 and Tier 2 + organic subtle tilt
        let rotZ = rollJitter;
        if (tierNum === 1 && bookIdx === tierBooks.length - 1) {
          rotZ = -0.08;
        } else if (tierNum === 2 && bookIdx === 0) {
          rotZ = 0.08;
        }

        mesh.rotation.set(0, yawJitter, rotZ);

        const userData: BookMeshUserData = {
          book,
          basePos: new THREE.Vector3(posX, posY, posZ),
          baseRot: new THREE.Euler(0, yawJitter, rotZ),
          targetPos: new THREE.Vector3(posX, posY, posZ),
          targetRot: new THREE.Euler(0, yawJitter, rotZ),
          hoverOffset: 0,
          currentYLift: 0,
          currentRotX: 0
        };
        mesh.userData = userData;

        // Frustum culling optimization: GPU ignores off-screen codices
        geometry.computeBoundingBox();
        geometry.computeBoundingSphere();
        mesh.frustumCulled = true;

        this.shelfGroup.add(mesh);
        this.bookMeshes.push(mesh);
        this.bookMeshMap.set(book.id, mesh);

        currentX += bookThickness + spacing;
      });
    });
  }

  private buildTempleParticles() {
    const particleCount = 140;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const speeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 11;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6.5;
      positions[i * 3 + 2] = Math.random() * 4 - 0.2;
      speeds[i] = Math.random() * 0.0025 + 0.0008;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    (geometry as unknown as { speeds: Float32Array }).speeds = speeds;

    const material = new THREE.PointsMaterial({
      color: 0xffe29a,
      size: 0.038,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
  }

  private bindEvents() {
    const el = this.renderer.domElement;
    el.addEventListener('mousemove', this.boundMouseMove);
    el.addEventListener('mousedown', this.boundMouseDown);
    window.addEventListener('mouseup', this.boundMouseUp);
    el.addEventListener('click', this.boundClick);
    window.addEventListener('resize', this.boundResize);
  }

  private onMouseMove(e: MouseEvent) {
    const rect = this.renderer.domElement.getBoundingClientRect();
    const newX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const newY = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    if (this.mouse.x !== -999) {
      this.prevMouse.set(this.mouse.x, this.mouse.y);
    } else {
      this.prevMouse.set(newX, newY);
    }
    this.mouse.x = newX;
    this.mouse.y = newY;

    if (this.isInteractionLocked || this.mode !== 'browsing') {
      this.isPointerDown = false;
      return;
    }

    // Smooth camera tilt and horizontal pan when dragging
    if (this.isPointerDown) {
      const deltaY = (e.clientY - this.pointerStart.y) * 0.0035;
      const deltaX = (e.clientX - this.pointerStart.x) * 0.0055;
      // Dragging to the right pulls scene right -> reveals window on left (negative cameraTargetX)
      // Dragging to the left pulls scene left -> reveals books and clock on right (positive cameraTargetX)
      this.cameraTargetY = Math.max(-1.8, Math.min(1.8, this.cameraBaseY + deltaY));
      this.cameraTargetX = Math.max(-5.5, Math.min(3.5, this.cameraBaseX - deltaX));
    }
  }

  private onMouseDown(e: MouseEvent) {
    if (this.isInteractionLocked || this.mode !== 'browsing') return;

    if (e.button === 0) {
      this.isPointerDown = true;
      this.pointerStart = { x: e.clientX, y: e.clientY };
      this.cameraBaseY = this.cameraTargetY;
      this.cameraBaseX = this.cameraTargetX;
    }
  }

  private onMouseUp() {
    this.isPointerDown = false;
  }

  private onClick(e: MouseEvent) {
    if (this.isInteractionLocked || this.mode !== 'browsing') return;

    const rect = this.renderer.domElement.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const clickY = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(new THREE.Vector2(clickX, clickY), this.camera);

    // 1. Raycast Hanging Lamp / Pull String / Brass Bead
    const lampIntersects = this.raycaster.intersectObjects(this.lampClickableMeshes, true);
    if (lampIntersects.length > 0) {
      this.toggleLampLight();
      return;
    }

    // 2. Raycast Books on Shelf
    const intersects = this.raycaster.intersectObjects(this.bookMeshes);
    if (intersects.length > 0) {
      const clickedMesh = intersects[0].object as THREE.Mesh;
      const data = clickedMesh.userData as BookMeshUserData;
      if (data && data.book) {
        this.selectAndFetchBook(data.book);
      }
    }
  }

  /**
   * Toggles the pendant lamp spotlight and ambient room bounce with GSAP easing
   * Applying an audible click and physical jerk/tug impulse to the lamp spring system as if pulling the chain!
   */
  public toggleLampLight() {
    this.isLampLightOn = !this.isLampLightOn;

    // Audible chain pull click
    bookAudio.playLampClick(this.isLampLightOn);

    // Physical pull impulse: pulling down on chain creates immediate swing!
    this.lampVelX += 0.055;
    this.lampVelZ += (Math.random() - 0.5) * 0.045;

    // Kill any active lighting tweens
    gsap.killTweensOf(this.lampSpot);
    gsap.killTweensOf(this.centerGlow);

    if (this.isLampLightOn) {
      gsap.to(this.lampSpot, {
        intensity: 4.2,
        duration: 0.35,
        ease: 'power2.out'
      });
      gsap.to(this.centerGlow, {
        intensity: 2.6,
        duration: 0.35,
        ease: 'power2.out'
      });
      if (this.bulbMat) {
        this.bulbMat.color.setHex(0xfffae8);
      }
    } else {
      gsap.to(this.lampSpot, {
        intensity: 0.0,
        duration: 0.25,
        ease: 'power2.in'
      });
      gsap.to(this.centerGlow, {
        intensity: 0.45, // Soft ambient illumination from moonlight and diyas remains
        duration: 0.25,
        ease: 'power2.in'
      });
      if (this.bulbMat) {
        this.bulbMat.color.setHex(0x282420);
      }
    }
  }

  /**
   * GSAP Animated Book Extraction:
   * 1. Locks interaction state manager to prevent race conditions or duplicate clicks
   * 2. Slides out along +Z from its own shelf slot (power2.out)
   * 3. Arcs forward directly towards the camera at center screen (power3.out)
   * 4. Rotates so the front cover faces the viewer
   */
  public selectAndFetchBook(book: GranthBook) {
    if (this.isInteractionLocked || this.mode !== 'browsing') return;

    const mesh = this.bookMeshMap.get(book.id);
    if (!mesh) return;

    // State Locking: prevent any concurrent clicks, drags, or raycasting
    this.isInteractionLocked = true;
    this.mode = 'fetching';
    this.selectedBook = book;
    this.activeSelectedMesh = mesh;

    // Immediately clear hover badges and tooltips
    this.hoveredBook = null;
    this.onHoverChange(null, null);
    document.body.style.cursor = 'default';
    document.body.classList.remove('has-hovered-book');

    // Attach to world scene so flight is independent of shelfGroup sway
    this.scene.attach(mesh);
    // Disable frustum culling during flight so mesh never clips near camera edges
    mesh.frustumCulled = false;

    // Kill any active tweens on this mesh
    gsap.killTweensOf(mesh.position);
    gsap.killTweensOf(mesh.rotation);

    const data = mesh.userData as BookMeshUserData;
    data.hoverOffset = 0;
    data.currentYLift = 0;
    data.currentRotX = 0;

    // Target coordinates directly in front of the camera (FOV 27)
    const targetY = this.camera.position.y * 0.45;
    const targetZ = this.camera.position.z - 4.6;

    const tl = gsap.timeline({
      onComplete: () => {
        this.mode = 'reading';
        this.onBookOpened(book);
      }
    });

    // Step 1: Slide forward out of its shelf slot
    tl.to(mesh.position, {
      z: data.basePos.z + 1.25,
      duration: 0.36,
      ease: 'power2.out'
    });

    // Step 2: Arc to center screen directly in front of camera (1.18s decelerating flight per shelf.js spec)
    tl.to(mesh.position, {
      x: 0,
      y: targetY,
      z: targetZ,
      duration: 1.18,
      ease: 'power3.out'
    }, '-=0.08');

    // Concurrently rotate to face front cover towards viewer with spine on the left
    tl.to(mesh.rotation, {
      x: 0.08,
      y: -Math.PI / 2,
      z: 0,
      duration: 1.18,
      ease: 'power3.out'
    }, '<');

    // Concurrently center camera on the opened reading folio
    tl.to(this.camera.position, {
      x: 0,
      duration: 1.18,
      ease: 'power3.out'
    }, '<');
  }

  /**
   * GSAP Animated Book Return:
   * 1. Arcs from center screen back to its exact shelf position aperture (power3.inOut)
   * 2. Slides gently into its slot (power2.in)
   * 3. Re-attaches to shelfGroup and unlocks interactions once animation completely finishes
   */
  public returnBookToShelf() {
    if (!this.activeSelectedMesh || !this.selectedBook) return;

    this.isInteractionLocked = true;
    this.mode = 'returning';
    const mesh = this.activeSelectedMesh;
    const data = mesh.userData as BookMeshUserData;

    // Kill any active tweens
    gsap.killTweensOf(mesh.position);
    gsap.killTweensOf(mesh.rotation);

    const tl = gsap.timeline({
      onComplete: () => {
        // Re-attach to shelfGroup once safely back in base
        this.shelfGroup.attach(mesh);
        mesh.position.copy(data.basePos);
        mesh.rotation.copy(data.baseRot);
        data.hoverOffset = 0;
        data.currentYLift = 0;
        data.currentRotX = 0;

        // Re-enable frustum culling on shelf
        mesh.frustumCulled = true;
        mesh.geometry.computeBoundingSphere();

        this.activeSelectedMesh = null;
        this.selectedBook = null;

        // Interaction state unlock
        this.mode = 'browsing';
        this.isInteractionLocked = false;
        this.onReturnComplete();
      }
    });

    // Step 1: Arc from center screen back to its exact shelf slot aperture
    tl.to(mesh.position, {
      x: data.basePos.x,
      y: data.basePos.y,
      z: data.basePos.z + 1.25,
      duration: 0.95,
      ease: 'power3.inOut'
    });

    tl.to(mesh.rotation, {
      x: data.baseRot.x,
      y: data.baseRot.y,
      z: data.baseRot.z,
      duration: 0.95,
      ease: 'power3.inOut'
    }, '<');

    // Restore camera position back to user's browsing viewpoint
    tl.to(this.camera.position, {
      x: this.cameraTargetX,
      duration: 0.95,
      ease: 'power3.inOut'
    }, '<');

    // Step 2: Slide gently into its slot
    tl.to(mesh.position, {
      z: data.basePos.z,
      duration: 0.35,
      ease: 'power2.in'
    });
  }

  public jumpToTier(tier: 0 | 1 | 2) {
    if (this.isInteractionLocked || this.mode !== 'browsing') return;
    const targetYByTier: Record<number, number> = {
      0: 1.4,
      1: 0.0,
      2: -1.4
    };
    this.cameraTargetY = targetYByTier[tier] ?? 0;
    this.cameraTargetX = 0.0; // Center squarely on books
  }

  public jumpToWindow() {
    if (this.isInteractionLocked || this.mode !== 'browsing') return;
    this.cameraTargetX = -4.5; // Focus directly on the serene moonlit window
    this.cameraTargetY = 0.65;
  }

  public jumpToAll() {
    if (this.isInteractionLocked || this.mode !== 'browsing') return;
    this.cameraTargetX = -0.95; // Master default view (both window and bookcase visible)
    this.cameraTargetY = 0.0;
  }

  public getIsInteractionLocked(): boolean {
    return this.isInteractionLocked;
  }

  public getHoveredBookScreenPosition(): { x: number; y: number } | null {
    if (!this.hoveredBook) return null;
    const mesh = this.bookMeshMap.get(this.hoveredBook.id);
    if (!mesh) return null;

    const vec = new THREE.Vector3();
    mesh.getWorldPosition(vec);
    vec.y += this.hoveredBook.height * 0.5 + 0.18;
    vec.project(this.camera);

    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;

    return {
      x: (vec.x * 0.5 + 0.5) * width,
      y: (-vec.y * 0.5 + 0.5) * height
    };
  }

  /**
   * Adaptive Viewport Fitting:
   * Dynamically calculates camera distance (Z-axis) & FOV based on current window width and height
   * ensuring the entire sanctum (both the moonlit window on the left and the 3D bookcase)
   * is comfortably framed on both mobile and widescreen desktop viewports without clipping.
   */
  public calculateAdaptiveCameraFit(): { fov: number; z: number } {
    const width = this.container?.clientWidth || window.innerWidth;
    const height = this.container?.clientHeight || window.innerHeight;
    const aspect = width / height;

    // Adaptive FOV per viewport
    let fov = 27;
    if (aspect < 0.7) {
      fov = 35; // Mobile portrait
    } else if (aspect < 1.0) {
      fov = 31; // Tablet portrait / foldable
    } else if (aspect > 2.2) {
      fov = 28; // Ultrawide desktop
    } else {
      fov = 27; // Standard desktop
    }

    const vFovRad = (fov * Math.PI) / 180;
    const halfFovTan = Math.tan(vFovRad * 0.5);

    // Target bounding dimensions of the full sanctum:
    // Window on left (-8.6) to Bookcase right edge (+5.9) = 14.5 units width!
    const targetHeight = 6.5;
    const targetWidth = aspect < 1.0 ? 9.6 : 14.8;

    const zFromHeight = (targetHeight * 0.5) / halfFovTan;
    const zFromWidth = (targetWidth * 0.5) / (halfFovTan * aspect);

    // Ensure entire shelf and moonlit window fill the viewport gracefully without being cut off
    let z = Math.max(zFromHeight, zFromWidth) + 0.6;
    if (aspect < 1.0) {
      // Clamped range on mobile so codices stay comfortably touchable and legible
      z = Math.min(Math.max(z, 15.0), 20.0);
    }

    return { fov, z };
  }

  private onWindowResize() {
    if (!this.container) return;
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;
    const aspect = width / height;

    const { fov, z: cameraZ } = this.calculateAdaptiveCameraFit();

    this.camera.fov = fov;
    this.camera.aspect = aspect;
    this.camera.position.z = cameraZ;
    this.camera.updateProjectionMatrix();

    // Device Pixel Ratio (DPR) Optimization capped at 2 for sharp Retina display without 4K GPU strain
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.setSize(width, height);
  }

  private renderTick() {
    const t = performance.now() * 0.001;

    // 0. Hanging Pendant Lamp Damped Harmonic Spring Physics (Harmonic Oscillator)
    // As the mouse moves and shelf sways, it transmits a subtle harmonic impulse
    const impulseZ = this.lerpedMouse.x * 0.003;
    const impulseX = -this.lerpedMouse.y * 0.002;

    const accelZ = -this.lampSpringK * this.lampAngleZ - this.lampDamping * this.lampVelZ + impulseZ;
    const accelX = -this.lampSpringK * this.lampAngleX - this.lampDamping * this.lampVelX + impulseX;

    this.lampVelZ += accelZ;
    this.lampVelX += accelX;

    this.lampAngleZ += this.lampVelZ;
    this.lampAngleX += this.lampVelX;

    this.lampPivotGroup.rotation.z = this.lampAngleZ;
    this.lampPivotGroup.rotation.x = this.lampAngleX;

    // Sync lampSpot with swinging lamp bulb position & direction
    if (this.bulbMesh && this.lampSpot) {
      this.bulbMesh.getWorldPosition(this.lampSpot.position);
      this.lampSpot.target.position.set(
        this.lampSpot.position.x + Math.sin(this.lampAngleZ) * 3.5,
        0.0,
        this.lampSpot.position.z + Math.sin(this.lampAngleX) * 3.5
      );
    }

    // Update Analog Library Clock to Real-Time Local Time
    if (this.clockHourHandPivot && this.clockMinHandPivot && this.clockSecHandPivot) {
      const now = new Date();
      const hours = now.getHours() % 12;
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const millis = now.getMilliseconds();

      const secProgress = (seconds + millis / 1000) / 60;
      const minProgress = (minutes + secProgress) / 60;
      const hourProgress = (hours + minProgress) / 12;

      this.clockSecHandPivot.rotation.z = -secProgress * Math.PI * 2;
      this.clockMinHandPivot.rotation.z = -minProgress * Math.PI * 2;
      this.clockHourHandPivot.rotation.z = -hourProgress * Math.PI * 2;
    }

    // 1. Flicker Diya Lights gently
    this.diyaLights.forEach((diya, i) => {
      diya.intensity = 2.4 + Math.sin(t * 7.0 + i * 1.6) * 0.24 + Math.cos(t * 11.5 + i * 2.0) * 0.12;
    });

    // 2. Animate Dust Particles
    if (this.particles) {
      const positions = this.particles.geometry.attributes.position.array as Float32Array;
      const speeds = (this.particles.geometry as unknown as { speeds: Float32Array }).speeds;
      for (let i = 0; i < positions.length / 3; i++) {
        positions[i * 3 + 1] += speeds[i];
        if (positions[i * 3 + 1] > 3.4) {
          positions[i * 3 + 1] = -3.4;
        }
      }
      this.particles.geometry.attributes.position.needsUpdate = true;
    }

    // 3. Physical Inertia via Lerp with Damping Factor 0.05
    const damping = 0.05;

    if (this.mouse.x !== -999 && this.mouse.y !== -999) {
      this.lerpedMouse.x += (this.mouse.x - this.lerpedMouse.x) * damping;
      this.lerpedMouse.y += (this.mouse.y - this.lerpedMouse.y) * damping;
    }

    // Smooth Camera and Shelf Movement with 0.05 damping
    if (this.mode === 'browsing') {
      const targetCamX = this.cameraTargetX + this.lerpedMouse.x * 0.40;
      const targetCamY = this.cameraTargetY + this.lerpedMouse.y * 0.24;
      this.camera.position.x += (targetCamX - this.camera.position.x) * damping;
      this.camera.position.y += (targetCamY - this.camera.position.y) * damping;

      // Camera looks ahead with natural horizontal tracking (bookshelf plinth stays rock-solid on floor)
      const lookTargetX = this.camera.position.x * 0.55;
      this.camera.lookAt(lookTargetX, this.camera.position.y * 0.78, 0);

      // Raycasting for Hover Detection (disabled when interaction is locked)
      if (!this.isInteractionLocked) {
        this.raycaster.setFromCamera(this.mouse, this.camera);

        // A. Check hover on Hanging Lamp & Pull String to impart physical swing impulse
        let isHoveringLamp = false;
        const lampIntersects = this.raycaster.intersectObjects(this.lampClickableMeshes, true);
        if (lampIntersects.length > 0) {
          isHoveringLamp = true;
          const mouseDeltaX = this.mouse.x - this.prevMouse.x;
          const mouseDeltaY = this.mouse.y - this.prevMouse.y;
          const speed = Math.sqrt(mouseDeltaX * mouseDeltaX + mouseDeltaY * mouseDeltaY);
          const pushForce = Math.max(speed * 0.22, 0.007);
          this.lampVelZ += (mouseDeltaX !== 0 ? Math.sign(mouseDeltaX) : (Math.random() - 0.5)) * pushForce;
          this.lampVelX += (mouseDeltaY !== 0 ? -Math.sign(mouseDeltaY) : 1) * pushForce;
        }

        // B. Check hover on Book Meshes
        const intersects = this.raycaster.intersectObjects(this.bookMeshes);

        let foundHover: GranthBook | null = null;
        let hoveredMeshTarget: THREE.Mesh | null = null;

        if (intersects.length > 0) {
          hoveredMeshTarget = intersects[0].object as THREE.Mesh;
          const data = hoveredMeshTarget.userData as BookMeshUserData;
          if (data && data.book) {
            foundHover = data.book;
          }
        }

        if (this.hoveredBook?.id !== foundHover?.id) {
          this.hoveredBook = foundHover;
          const screenPos = foundHover ? this.getHoveredBookScreenPosition() : null;
          this.onHoverChange(foundHover, screenPos);
          document.body.style.cursor = (foundHover || isHoveringLamp) ? 'pointer' : 'default';
          if (foundHover) {
            document.body.classList.add('has-hovered-book');
          } else {
            document.body.classList.remove('has-hovered-book');
          }
        } else if (this.hoveredBook && foundHover) {
          // Update screen position dynamically as camera/shelf sways with mouse lerp
          const screenPos = this.getHoveredBookScreenPosition();
          this.onHoverChange(this.hoveredBook, screenPos);
          document.body.style.cursor = 'pointer';
        } else if (isHoveringLamp) {
          document.body.style.cursor = 'pointer';
        } else if (!foundHover) {
          document.body.style.cursor = 'default';
        }

        // Single-Book Isolated Hover Elevation:
        // Strictly ONLY the codex directly under the mouse pointer lifts up and slides forward!
        // All adjacent/neighboring books remain fully seated in their shelf slots.
        this.bookMeshes.forEach(mesh => {
          const data = mesh.userData as BookMeshUserData;
          const isThisHovered = hoveredMeshTarget === mesh;

          // Target transformations: ONLY active hovered codex moves!
          const targetOffset = isThisHovered ? 0.52 : 0;
          const targetYLift = isThisHovered ? 0.085 : 0;
          const targetRotX = isThisHovered ? -0.045 : 0;

          // Smooth exponential damping toward target (0.18 per frame)
          data.hoverOffset += (targetOffset - data.hoverOffset) * 0.18;
          data.currentYLift += (targetYLift - data.currentYLift) * 0.18;
          data.currentRotX += (targetRotX - data.currentRotX) * 0.18;

          mesh.position.z = data.basePos.z + data.hoverOffset;
          mesh.position.y = data.basePos.y + data.currentYLift;
          mesh.rotation.x = data.baseRot.x + data.currentRotX;
        });
      }
    }

    this.prevMouse.copy(this.mouse);

    this.renderer.render(this.scene, this.camera);
  }

  public destroy() {
    // 1. Detach GSAP Ticker & Page Visibility Listener
    gsap.ticker.remove(this.tickerCallback);
    document.removeEventListener('visibilitychange', this.visibilityHandler);

    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
    }

    // 2. Kill all active GSAP Tweens on codices, camera, and shelf
    this.bookMeshes.forEach(mesh => {
      gsap.killTweensOf(mesh.position);
      gsap.killTweensOf(mesh.rotation);
    });
    gsap.killTweensOf(this.camera.position);
    gsap.killTweensOf(this.shelfGroup.rotation);

    // 3. Remove DOM event listeners using exact bound references
    const el = this.renderer.domElement;
    el.removeEventListener('mousemove', this.boundMouseMove);
    el.removeEventListener('mousedown', this.boundMouseDown);
    window.removeEventListener('mouseup', this.boundMouseUp);
    el.removeEventListener('click', this.boundClick);
    window.removeEventListener('resize', this.boundResize);

    // 4. Strict GPU Memory Disposal Routine (The Anti-Crash)
    // Traverses the entire scene graph and calls .dispose() on all geometries, materials, shadow maps, and textures
    this.scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh || obj instanceof THREE.Points) {
        if (obj.geometry) {
          obj.geometry.dispose();
        }
        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach((mat) => this.disposeMaterial(mat));
          } else {
            this.disposeMaterial(obj.material);
          }
        }
      } else if ('shadow' in obj && (obj as unknown as { shadow?: { map?: THREE.WebGLRenderTarget } }).shadow?.map) {
        (obj as unknown as { shadow: { map: THREE.WebGLRenderTarget } }).shadow.map.dispose();
      }
    });

    // 5. Clear static procedural texture cache in BookTextureFactory
    BookTextureFactory.disposeAll();

    // 6. Clear scene graph and internal object collections
    this.scene.clear();
    this.bookMeshes.length = 0;
    this.bookMeshMap.clear();
    this.diyaLights.length = 0;
    this.particles = null;
    this.activeSelectedMesh = null;
    this.selectedBook = null;
    this.hoveredBook = null;

    if (this.container && el.parentNode === this.container) {
      this.container.removeChild(el);
    }
    this.renderer.dispose();
  }

  private disposeMaterial(mat: THREE.Material) {
    const m = mat as unknown as Record<string, unknown>;
    for (const key in m) {
      const val = m[key];
      if (val && typeof val === 'object' && (val as THREE.Texture).isTexture) {
        (val as THREE.Texture).dispose();
      }
    }
    mat.dispose();
  }
}
