import React from 'react';
import { getAssetUrl } from '../utils/asset';

export type HeroArtworkMode = 'saraswati' | 'vedic-dawn';

interface HeroArtworkProps {
  artworkMode?: HeroArtworkMode;
}

export const HeroArtwork: React.FC<HeroArtworkProps> = ({ artworkMode = 'saraswati' }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none bg-[#0e0c09]" aria-hidden="true">
      {/* 1. Camera wrapper with framing and slight zoom */}
      <div className="absolute inset-[-2%] w-[104%] h-[104%] transform-gpu origin-[50%_40%] scale-[1.03]">
        {/* Layer A: Maa Saraswati Classical Masterpiece Canvas */}
        <div
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            artworkMode === 'saraswati' ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={getAssetUrl('/images/saraswati-devi.jpeg')}
            alt="Maa Saraswati — Supreme Goddess of Wisdom, Arts, and Sacred Chhandas"
            className="w-full h-full object-cover object-[center_30%] filter contrast-[1.08] brightness-[0.86] saturate-[0.96]"
          />
        </div>

        {/* Layer B: Classical Indian Masterpiece Canvas: Vedic Dawn at Naimisharanya / Sacred Himalayan Confluence */}
        <div
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            artworkMode === 'vedic-dawn' ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <svg
            viewBox="0 0 1920 1080"
            className="w-full h-full object-cover"
            preserveAspectRatio="xMidYMid slice"
            xmlns="http://www.w3.org/2000/svg"
          >
          <defs>
            {/* Deep Cosmic Sky Gradient */}
            <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#080709" />
              <stop offset="25%" stopColor="#17121b" />
              <stop offset="50%" stopColor="#2c1a1f" />
              <stop offset="70%" stopColor="#4f261d" />
              <stop offset="85%" stopColor="#87421f" />
              <stop offset="100%" stopColor="#d97d2e" />
            </linearGradient>

            {/* Sacred Solar Golden Disc */}
            <radialGradient id="solarAura" cx="62%" cy="46%" r="50%">
              <stop offset="0%" stopColor="#fff3d1" stopOpacity="0.95" />
              <stop offset="15%" stopColor="#ffd276" stopOpacity="0.8" />
              <stop offset="35%" stopColor="#e5893b" stopOpacity="0.5" />
              <stop offset="60%" stopColor="#8a301a" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#1a0d0a" stopOpacity="0" />
            </radialGradient>

            {/* Sacred River Water Gradient */}
            <linearGradient id="riverGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3d2119" stopOpacity="0.85" />
              <stop offset="40%" stopColor="#69371e" stopOpacity="0.9" />
              <stop offset="70%" stopColor="#251711" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#0d0907" />
            </linearGradient>

            {/* Sacred Fire (Yajna) Glow */}
            <radialGradient id="yajnaGlow" cx="42%" cy="78%" r="35%">
              <stop offset="0%" stopColor="#ffe9a0" stopOpacity="0.95" />
              <stop offset="20%" stopColor="#ff7e29" stopOpacity="0.75" />
              <stop offset="45%" stopColor="#b32408" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>

            {/* Mountain Ridge Gradients */}
            <linearGradient id="himalayaFar" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#35263b" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#1a111a" stopOpacity="0.98" />
            </linearGradient>
            <linearGradient id="himalayaMid" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#211818" />
              <stop offset="100%" stopColor="#0f0c0b" />
            </linearGradient>

            {/* Golden Sandbank & Ghat Silhouette */}
            <linearGradient id="shoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#181310" />
              <stop offset="50%" stopColor="#221813" />
              <stop offset="100%" stopColor="#0a0807" />
            </linearGradient>
          </defs>

          {/* Sky background */}
          <rect width="1920" height="1080" fill="url(#skyGrad)" />

          {/* Distant Vedic Stars & Constellations (Saptarshi / Ursa Major) */}
          <g opacity="0.6">
            <circle cx="320" cy="140" r="1.5" fill="#fff9e6" />
            <circle cx="390" cy="120" r="2" fill="#fff9e6" />
            <circle cx="470" cy="135" r="1.8" fill="#ffd599" />
            <circle cx="530" cy="190" r="2.2" fill="#fff9e6" />
            <circle cx="610" cy="220" r="1.6" fill="#ffd599" />
            <circle cx="680" cy="180" r="2.4" fill="#ffffff" />
            <circle cx="730" cy="240" r="1.9" fill="#fff9e6" />
            {/* Ambient Star Field */}
            <circle cx="150" cy="90" r="1" fill="#fff" opacity="0.4" />
            <circle cx="280" cy="60" r="1.2" fill="#fff" opacity="0.5" />
            <circle cx="850" cy="110" r="1" fill="#fff" opacity="0.3" />
            <circle cx="980" cy="70" r="1.5" fill="#fff" opacity="0.5" />
            <circle cx="1200" cy="95" r="1.2" fill="#fff" opacity="0.4" />
            <circle cx="1450" cy="130" r="1.6" fill="#fff" opacity="0.5" />
            <circle cx="1720" cy="80" r="1.3" fill="#fff" opacity="0.4" />
          </g>

          {/* Rising Sacred Sun (Surya / Savitr) with Golden Aura */}
          <circle cx="1180" cy="510" r="420" fill="url(#solarAura)" />
          <circle cx="1180" cy="510" r="48" fill="#fffbe8" opacity="0.9" />

          {/* Majestic Himalayan Peaks in Golden Morning Twilight */}
          <path d="M0,520 L180,430 L340,490 L520,380 L690,460 L890,340 L1080,450 L1260,370 L1420,440 L1640,350 L1820,420 L1920,400 L1920,700 L0,700 Z" fill="url(#himalayaFar)" />

          {/* Snowcaps catching dawn sunlight */}
          <path d="M520,380 L490,415 L555,420 Z" fill="#ffd89b" opacity="0.45" />
          <path d="M890,340 L855,385 L925,395 Z" fill="#ffe2b0" opacity="0.55" />
          <path d="M1260,370 L1230,410 L1295,415 Z" fill="#ffd599" opacity="0.6" />
          <path d="M1640,350 L1605,395 L1675,400 Z" fill="#ffe2b0" opacity="0.5" />

          {/* Middle Range Forested Hills */}
          <path d="M0,570 Q300,510 650,550 T1300,530 T1920,560 L1920,800 L0,800 Z" fill="url(#himalayaMid)" />

          {/* Sacred Flowing River (The Holy Confluence / Ganga / Sarasvati) */}
          <path d="M0,660 Q450,620 950,650 T1920,680 L1920,1080 L0,1080 Z" fill="url(#riverGrad)" />

          {/* River Shimmer / Golden Light Waves */}
          <path d="M780,680 Q1050,670 1350,690 L1300,720 Q1050,700 820,710 Z" fill="#ffd27d" opacity="0.25" />
          <path d="M650,730 Q1020,715 1420,740 L1360,780 Q1020,755 700,770 Z" fill="#ffb84d" opacity="0.2" />
          <path d="M520,800 Q980,780 1520,810 L1460,860 Q980,825 560,845 Z" fill="#e69533" opacity="0.15" />

          {/* Ancient Sacred Banyan Tree & Forest Hermitage Silhouette (Left) */}
          <g fill="#0e0a08">
            {/* Trunk & Massive Aerial Roots */}
            <path d="M0,480 Q180,500 240,640 Q210,750 260,860 Q280,920 310,1080 L0,1080 Z" />
            <path d="M110,680 Q130,820 120,1080 L80,1080 Q90,830 70,720 Z" opacity="0.9" />
            <path d="M180,710 Q210,870 190,1080 L160,1080 Q175,880 150,740 Z" opacity="0.9" />
            {/* Canopy */}
            <path d="M0,320 Q120,280 260,340 Q380,390 410,480 Q430,580 340,650 Q240,710 110,690 Q20,670 0,640 Z" />
            <path d="M80,300 Q200,240 330,290 Q440,340 460,430 Q440,510 370,540 Z" opacity="0.95" />
          </g>

          {/* Sacred Ghat / Riverside Altar Platform */}
          <path d="M550,860 L1450,860 L1600,1080 L380,1080 Z" fill="url(#shoreGrad)" />

          {/* Stone Steps (Ghats) */}
          <line x1="530" y1="890" x2="1470" y2="890" stroke="#36251c" strokeWidth="6" opacity="0.7" />
          <line x1="500" y1="930" x2="1500" y2="930" stroke="#2d1e17" strokeWidth="8" opacity="0.7" />
          <line x1="460" y1="980" x2="1540" y2="980" stroke="#241812" strokeWidth="10" opacity="0.7" />
          <line x1="420" y1="1040" x2="1580" y2="1040" stroke="#1c120e" strokeWidth="12" opacity="0.7" />

          {/* The Sacred Vedic Fire Altar (Yajna Kunda) */}
          <rect x="760" y="870" width="160" height="50" rx="4" fill="#3a1c13" stroke="#e09543" strokeWidth="2" opacity="0.85" />
          <rect x="785" y="860" width="110" height="20" rx="2" fill="#522416" stroke="#f5bd6c" strokeWidth="1.5" />

          {/* Radiant Agni Flames */}
          <circle cx="840" cy="850" r="140" fill="url(#yajnaGlow)" />
          <path d="M810,870 Q825,810 840,780 Q855,820 870,870 Z" fill="#ffeb99" />
          <path d="M822,870 Q836,825 842,800 Q848,830 858,870 Z" fill="#ffffff" />
          <path d="M798,870 Q815,830 828,815 Q838,845 842,870 Z" fill="#ff771f" opacity="0.85" />
          <path d="M840,870 Q848,835 858,810 Q872,835 882,870 Z" fill="#ff992b" opacity="0.85" />

          {/* Ancient Rishis in Deep Contemplation (Silhouettes around Altar) */}
          {/* Seated Rishi 1 (Left of Yajna) */}
          <g fill="#0e0a08">
            <ellipse cx="730" cy="840" rx="14" ry="16" /> {/* Head with topknot / Jata */}
            <circle cx="730" cy="824" r="8" /> {/* Jata / Bun */}
            <path d="M705,860 Q730,850 755,860 L760,910 Q730,920 700,910 Z" /> {/* Body */}
            <path d="M690,910 Q730,930 770,910 L765,925 Q730,940 695,925 Z" /> {/* Crossed Legs (Padmasana) */}
          </g>

          {/* Seated Rishi 2 (Center Right of Yajna - Offering Oblation) */}
          <g fill="#0e0a08">
            <ellipse cx="950" cy="840" rx="14" ry="16" />
            <circle cx="950" cy="824" r="8" />
            <path d="M925,860 Q950,850 975,860 L980,910 Q950,920 920,910 Z" />
            <path d="M910,910 Q950,930 990,910 L985,925 Q950,940 915,925 Z" />
            {/* Extended Arm with Sruk (Sacrificial Ladle) */}
            <path d="M935,870 Q895,855 865,860" stroke="#0e0a08" strokeWidth="5" strokeLinecap="round" />
          </g>

          {/* Seated Rishi 3 (Far Right - Meditating Seer) */}
          <g fill="#0e0a08" opacity="0.95">
            <ellipse cx="1060" cy="855" rx="13" ry="15" />
            <circle cx="1060" cy="840" r="7" />
            <path d="M1038,872 Q1060,862 1082,872 L1086,920 Q1060,930 1034,920 Z" />
            <path d="M1025,920 Q1060,938 1095,920 L1090,934 Q1060,948 1030,934 Z" />
          </g>

          {/* Ancient Temple Shikhara / Classical Vimana on distant riverbank */}
          <g fill="#1a1413" opacity="0.85">
            <path d="M1650,560 L1685,460 L1720,560 Z" />
            <path d="M1675,460 L1685,420 L1695,460 Z" /> {/* Kalasha / Pinnacle */}
            <rect x="1640" y="560" width="90" height="90" rx="3" />
            <rect x="1620" y="650" width="130" height="40" />
          </g>
        </svg>
        </div>
      </div>

      {/* 2. Light layer: Conic-gradient + radial golden sunbeam rays (mix-blend screen) */}
      <div
        className="absolute inset-[-20%] pointer-events-none opacity-60 mix-blend-screen"
        style={{
          background: `
            conic-gradient(from 170deg at 64% -10%, transparent 0deg, rgba(255, 219, 152, 0.18) 9deg, transparent 15deg, rgba(244, 207, 137, 0.14) 22deg, transparent 30deg),
            radial-gradient(ellipse 45% 55% at 68% 25%, rgba(255, 215, 145, 0.22), transparent 75%)
          `
        }}
      />

      {/* 3. Mist layer: Atmospheric Himalayan & River dawn fog */}
      <div
        className="absolute inset-[-15%] pointer-events-none opacity-50 filter blur-xl"
        style={{
          background: `
            radial-gradient(ellipse 45% 18% at 18% 62%, rgba(225, 215, 190, 0.15), transparent 75%),
            radial-gradient(ellipse 48% 22% at 80% 70%, rgba(230, 200, 160, 0.14), transparent 80%),
            radial-gradient(ellipse 60% 25% at 50% 88%, rgba(245, 185, 120, 0.12), transparent 70%)
          `
        }}
      />

      {/* 4. Patina layer: Antique Sanskrit manuscript texture and subtle vignette */}
      <div
        className="absolute inset-0 pointer-events-none opacity-65"
        style={{
          background: `
            linear-gradient(180deg, rgba(25, 20, 16, 0.08) 0%, rgba(16, 14, 11, 0.22) 100%),
            radial-gradient(circle at 50% 50%, transparent 50%, rgba(11, 10, 8, 0.6) 100%)
          `
        }}
      />
    </div>
  );
};
