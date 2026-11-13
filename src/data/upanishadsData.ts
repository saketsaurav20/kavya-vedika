import type { ScriptureOverview, Shloka } from '../types/canon';

export const UPANISHADS_SHLOKAS: Shloka[] = [
  {
    id: 'isha-upanishad-1',
    source: 'Isha Upanishad',
    sourceCategory: 'upanishads',
    chapterOrHymn: 'Verse 1',
    chapterOrHymnHi: 'मन्त्र १',
    authorOrRishi: 'Shukla Yajurveda Tradition',
    authorOrRishiHi: 'शुक्ल यजुर्वेद परम्परा',
    title: 'Īśāvāsyam Idaṃ Sarvam — The Divine Immanence & Non-Attachment',
    titleHi: 'ईशावास्यमिदं सर्वम् — सर्वव्यापी ईश्वर एवं त्यागपूर्वक भोग',
    devanagari: [
      'ॐ ई॒शा वा॒स्य॑मि॒दं सर्वं॒ यत्किञ्च॒ जग॑त्यां॒ जग॑त् ।',
      'तेन॑ त्य॒क्तेन॑ भुञ्जीथा॒ मा गृ॑धः कस्य॑स्वि॒द्धन॑म् ॥ १ ॥'
    ],
    iast: [
      'oṃ īśāvāsyam idaṃ sarvaṃ yat kiñca jagatyāṃ jagat |',
      'tena tyaktena bhuñjīthā mā gṛdhaḥ kasya svid dhanam || 1 ||'
    ],
    metre: 'Anushtubh (8 syllables per quarter)',
    metreHi: 'अनुष्टुप् छन्द',
    anvaya: [
      { word: 'īśā vāsyam', meaning: 'is to be enveloped/clothed by the Divine Lord', meaningHi: 'ईश्वर से आच्छादित/व्याप्त है' },
      { word: 'idam sarvam', meaning: 'all this visible existence', meaningHi: 'यह सम्पूर्ण दृश्यमान जगत्' },
      { word: 'yat kiñca jagatyām jagat', meaning: 'whatever moves in this transient universe', meaningHi: 'इस परिवर्तनशील संसार में जो कुछ भी गतिशील है' },
      { word: 'tena tyaktena', meaning: 'by that joyful renunciation of ownership', meaningHi: 'उसका त्यागभाव से (आसक्तिरहित होकर)' },
      { word: 'bhuñjīthāḥ', meaning: 'rejoice and enjoy life', meaningHi: 'भोग करो / पालन करो' },
      { word: 'mā gṛdhaḥ', meaning: 'covet not / do not greedily grasp', meaningHi: 'लोभ मत करो' },
      { word: 'kasya svid dhanam', meaning: 'for whose is all this wealth?', meaningHi: 'धन वास्तव में किसका है? (किसी का नहीं, सब परमात्मा का है)' }
    ],
    translation: 'All this, whatever moves in this moving world, is enveloped by God. Therefore find your enjoyment in renunciation; do not covet what belongs to another—for whose, indeed, is wealth?',
    translationHi: 'इस सम्पूर्ण गतिमान संसार में जो कुछ भी चर-अचर जगत् है, वह सब परमात्मा से व्याप्त है। अतः उस परमात्मा को स्मरण रखते हुए त्यागपूर्वक इसका भोग करो; किसी के धन का लोभ मत करो—धन वास्तव में किसका है?',
    philosophicalContext: 'The opening mantra of the Isha Upanishad is Mahatma Gandhi\'s favorite verse. He remarked that if all Indian scriptures were burned and only this verse survived, the entirety of Hinduism would remain intact. It teaches synthesis: live fully in the world, but with inner detachment, seeing all things as the sacred garments of Brahman.',
    philosophicalContextHi: 'ईशोपनिषद् का यह प्रथम मन्त्र वेदान्त दर्शन का सार है। महात्मा गान्धी ने कहा था कि यदि हिन्दुओं के समस्त ग्रन्थ नष्ट हो जाएँ और केवल यह एक मन्त्र बच जाए, तो भी सम्पूर्ण सनातन धर्म जीवित रहेगा। यह संसार से भागने का नहीं, अपितु सबमें ईश्वर को देखते हुए अनासक्त भाव से जीने का सन्देश देता है।',
    tags: ['Isha Upanishad', 'Renunciation', 'Immanence', 'Advaita', 'Detachment'],
    audioChantType: 'Meditative Sloka'
  },
  {
    id: 'katha-upanishad-1-3-14',
    source: 'Katha Upanishad',
    sourceCategory: 'upanishads',
    chapterOrHymn: 'Valli 3, Verse 14',
    chapterOrHymnHi: 'वल्ली ३, मन्त्र १४',
    authorOrRishi: 'Yama (Lord of Truth) to Nachiketa',
    authorOrRishiHi: 'यमराज द्वारा नचिकेता को उपदेश',
    title: 'Uttiṣṭhata Jāgrata — Arise, Awake, and Walk the Razor\'s Edge',
    titleHi: 'उत्तिष्ठत जाग्रत — उठो, जागो और क्षुर की धार पर चलो',
    devanagari: [
      'उत्तिष्ठत जाग्रत प्राप्य वरान्निबोधत ।',
      'क्षुरस्य धारा निशिता दुरत्यया दुर्गं पथस्तत्कवयो वदन्ति ॥ १४ ॥'
    ],
    iast: [
      'uttiṣṭhata jāgrata prāpya varān nibodhata |',
      'kṣurasya dhārā niśitā duratyayā durgaṃ pathas tat kavayo vadanti || 14 ||'
    ],
    metre: 'Anushtubh (4 × 8)',
    metreHi: 'अनुष्टुप् छन्द',
    anvaya: [
      { word: 'uttiṣṭhata', meaning: 'arise!', meaningHi: 'उठो!' },
      { word: 'jāgrata', meaning: 'awake from spiritual slumber!', meaningHi: 'अज्ञान की निद्रा से जागो!' },
      { word: 'prāpya varān', meaning: 'approaching the illumined teachers of truth', meaningHi: 'श्रेष्ठ ज्ञानियों और गुरुओं के समीप जाकर' },
      { word: 'nibodhata', meaning: 'comprehend and realize the Self', meaningHi: 'आत्मज्ञान को प्राप्त करो' },
      { word: 'kṣurasya dhārā niśitā', meaning: 'like the sharp whetted edge of a razor', meaningHi: 'उस्तरे की तीक्ष्ण धार के समान' },
      { word: 'duratyayā', meaning: 'perilous and hard to traverse', meaningHi: 'जिसपर चलना अत्यन्त कठिन है' },
      { word: 'durgaṃ pathas tat kavayo vadanti', meaning: 'that path is impassable, say the wise seers', meaningHi: 'उस मार्ग को तत्त्वदर्शी कवियों ने दुर्गम कहा है' }
    ],
    translation: 'Arise! Awake! Approach the great teachers and realize the Self! Like the sharp edge of a razor, difficult to tread and hard to cross, is that path—so declare the wise poets and seers.',
    translationHi: 'उठो! जागो! और श्रेष्ठ ज्ञानियों के समीप जाकर आत्मज्ञान को प्राप्त करो। ज्ञानी महापुरुष कहते हैं कि वह आध्यात्मिक मार्ग छुरे की तीक्ष्ण धार के समान अत्यन्त दुर्गम और कठिन है।',
    philosophicalContext: 'Immortalized in the modern era by Swami Vivekananda as his rallying cry to humanity ("Arise, awake, and stop not till the goal is reached"). The metaphor of the razor\'s edge (kṣurasya dhārā) warns that subtle inner awakening demands total alertness against the illusions of ego and sensory distraction.',
    philosophicalContextHi: 'स्वामी विवेकानन्द ने इस मन्त्र को अपने अमर सन्देश ("उठो, जागो और तब तक मत रुको जब तक लक्ष्य प्राप्त न हो जाए") का आधार बनाया। क्षुर की तीक्ष्ण धार का रूपक यह चेतावनी देता है कि आत्मसाक्षात्कार का मार्ग प्रमाद और आलस्य से नहीं, अखण्ड जागरूकता और साधना से सिद्ध होता है।',
    tags: ['Katha Upanishad', 'Awakening', 'Vivekananda', 'Self-Realization', 'Razors Edge'],
    audioChantType: 'Meditative Sloka'
  },
  {
    id: 'mandukya-upanishad-om',
    source: 'Mandukya Upanishad',
    sourceCategory: 'upanishads',
    chapterOrHymn: 'Verse 1 & 7',
    chapterOrHymnHi: 'मन्त्र १ एवं ७',
    authorOrRishi: 'Atharvaveda Tradition',
    authorOrRishiHi: 'अथर्ववेद परम्परा',
    title: 'Oṃkāra & The Four Quarters — Jagrat, Svapna, Sushupti, and Turiya',
    titleHi: 'ॐकार एवं चेतना के चार पाद — जाग्रत्, स्वप्न, सुषुप्ति तथा तुरीय',
    devanagari: [
      'ओमित्येतदक्षरमिदँ सर्वं तस्योपव्याख्यानं भूतं भवद् भविष्यदिति सर्वमोङ्कार एव ।',
      'नान्तःप्रज्ञं न बहिष्प्रज्ञं नोभयतःप्रज्ञं... शान्तं शिवमद्वैतं चतुर्थं मन्यन्ते स आत्मा स विज्ञेयः ॥'
    ],
    iast: [
      'om ity etad akṣaram idaṃ sarvaṃ tasyopavyākhyānaṃ bhūtaṃ bhavad bhaviṣyad iti sarvam oṅkāra eva |',
      'nāntaḥ-prajñaṃ na bahiḥ-prajñaṃ nobhayataḥ-prajñaṃ... śāntaṃ śivam advaitaṃ caturthaṃ manyante sa ātmā sa vijñeyaḥ ||'
    ],
    metre: 'Upanishadic Prose (Gadyam)',
    metreHi: 'गद्यात्मक उपनिषद् सूत्र',
    anvaya: [
      { word: 'om iti etad akṣaram', meaning: 'OM, this imperishable syllable', meaningHi: 'ॐ—यह अविनाशी अक्षर' },
      { word: 'idam sarvam', meaning: 'is this entire universe', meaningHi: 'यह सब दृश्यमान जगत् ही है' },
      { word: 'bhūtam bhavat bhaviṣyat', meaning: 'what was, what is, and what shall be', meaningHi: 'जो भूत, वर्तमान और भविष्यत् है' },
      { word: 'sarvam oṅkāra eva', meaning: 'all is indeed the syllable OM', meaningHi: 'वह सब ॐकार ही है' },
      { word: 'śāntam śivam advaitam', meaning: 'serene, auspicious, non-dual', meaningHi: 'शान्त, कल्याणमय और अद्वैत' },
      { word: 'caturtham manyante', meaning: 'the fourth transcendental state (Turiya)', meaningHi: 'चौथा पाद (तुरीय) माना जाता है' },
      { word: 'sa ātmā sa vijñeyaḥ', meaning: 'that is the Self; that is to be known', meaningHi: 'वही वास्तविक आत्मा है, वही जानने योग्य है' }
    ],
    translation: 'OM—this imperishable word is all this. Its further explanation is: the past, the present, and the future—all is verily OM. Beyond the waking, dreaming, and deep sleep states lies Turiya: ungraspable, serene, auspicious, non-dual. That is the true Self; that is to be realized.',
    translationHi: 'ॐ—यह अविनाशी ब्रह्म ही यह सम्पूर्ण जगत् है। भूत, वर्तमान और भविष्य—सब ॐकार ही है। जाग्रत्, स्वप्न और सुषुप्ति इन तीन अवस्थाओं से परे जो अचिन्त्य, शान्त, शिव और अद्वैत चतुर्थ तत्त्व है, वही तुरीय आत्मा है, और वही जानने योग्य है।',
    philosophicalContext: 'The Mandukya is the shortest principal Upanishad (only 12 verses), but the Muktika Upanishad declares that for the attainment of liberation, Mandukya alone is sufficient. It maps the phenomenology of human consciousness with unparalleled clinical and mystical precision.',
    philosophicalContextHi: 'माण्डूक्योपनिषद् आकार में केवल १२ मन्त्रों का सबसे छोटा उपनिषद् है, किन्तु मुक्तिकोपनिषद् का कथन है: "माण्डूक्यमेकमेवालं मुमुक्षूणां विमुक्तये" (मोक्ष की प्राप्ति हेतु अकेला माण्डूक्य ही पर्याप्त है)। यह मानव चेतना की अवस्थाओं का अद्वितीय विश्लेषण प्रस्तुत करता है।',
    tags: ['Mandukya', 'Turiya', 'OM', 'Consciousness', 'Advaita'],
    audioChantType: 'Meditative Sloka'
  },
  {
    id: 'chandogya-tat-tvam-asi',
    source: 'Chandogya Upanishad',
    sourceCategory: 'upanishads',
    chapterOrHymn: 'Prapathaka 6, Khanda 8, Verse 7',
    chapterOrHymnHi: 'प्रपाठक ६, खण्ड ८, मन्त्र ७',
    authorOrRishi: 'Sage Uddālaka Āruṇi to Shvetaketu',
    authorOrRishiHi: 'महर्षि उद्दालक आरुणि द्वारा श्वेतकेतु को उपदेश',
    title: 'Tat Tvam Asi — That Thou Art (The Great Mahāvākya)',
    titleHi: 'तत्त्वमसि — वह ब्रह्म तू ही है (महावाक्य)',
    devanagari: [
      'स य एषोऽणिमैतदात्म्यमिदँ सर्वं तत्सत्यँ स आत्मा तत्त्वमसि श्वेतकेतो इति ।',
      'भूय एव मा भगवान् विज्ञापयत्विति तथा सोम्येति होवाच ॥'
    ],
    iast: [
      'sa ya eṣo \'ṇimaitad-ātmyam idaṃ sarvaṃ tat satyaṃ sa ātmā tat tvam asi śvetaketo iti |',
      'bhūya eva mā bhagavān vijñāpayatv iti tathā somyeti hovāca ||'
    ],
    metre: 'Upanishadic Narrative Prose',
    metreHi: 'आख्यानपरक वैदिक गद्य',
    anvaya: [
      { word: 'saḥ yaḥ eṣaḥ aṇimā', meaning: 'that which is this finest, subtlest essence', meaningHi: 'जो यह सूक्ष्मातिसूक्ष्म तत्त्व है' },
      { word: 'aitad-ātmyam idam sarvam', meaning: 'in that is the inner self of this entire cosmos', meaningHi: 'उसी के आत्मस्वरूप में यह सम्पूर्ण जगत् प्रतिष्ठित है' },
      { word: 'tat satyam saḥ ātmā', meaning: 'that is the Truth, that is the Self', meaningHi: 'वही सत्य है, वही आत्मा है' },
      { word: 'tat tvam asi śvetaketo', meaning: 'That Thou Art, O Shvetaketu!', meaningHi: 'हे श्वेतकेतु! वह (परम ब्रह्म) तू ही है!' }
    ],
    translation: 'That which is the subtlest essence—in it all that exists has its self. That is the True. That is the Self. That thou art, O Shvetaketu!',
    translationHi: 'जो यह परम सूक्ष्म आत्मा है, उसी के स्वरूप से यह सम्पूर्ण विश्व युक्त है। वही परम सत्य है, वही आत्मा है, और हे श्वेतकेतु! वह तू ही है (तत्त्वमसि)।',
    philosophicalContext: 'One of the four foundational Mahāvākyas (Great Utterances) of Vedanta. Sage Uddalaka instructs his proud son Shvetaketu through organic metaphors (the invisible seed of the banyan tree, salt dissolved in water) that the individual soul is identical with the cosmic conscious ground of being.',
    philosophicalContextHi: 'वेदान्त के चार प्रमुख महावाक्यों में से एक। महर्षि उद्दालक ने वटवृक्ष के बीज और जल में घुले नमक के सुन्दर दृष्टान्तों द्वारा अपने पुत्र श्वेतकेतु को यह साक्षात्कार कराया कि जीवात्मा और परमात्मा में कोई तात्त्विक भेद नहीं है।',
    tags: ['Mahavakya', 'Tat Tvam Asi', 'Chandogya Upanishad', 'Identity', 'Vedanta'],
    audioChantType: 'Meditative Sloka'
  },
  {
    id: 'brihadaranyaka-asato-ma',
    source: 'Brihadaranyaka Upanishad',
    sourceCategory: 'upanishads',
    chapterOrHymn: 'Adhyaya 1, Brahmana 3, Verse 28',
    chapterOrHymnHi: 'अध्याय १, ब्राह्मण ३, मन्त्र २८',
    authorOrRishi: 'Maharshi Yājñavalkya',
    authorOrRishiHi: 'महर्षि याज्ञवल्क्य',
    title: 'Pāvamāna Mantra — Asato Mā Sadgamaya',
    titleHi: 'पावमान मन्त्र — असतो मा सद्गमय (सार्वभौम प्रार्थना)',
    devanagari: [
      'ॐ असतो मा सद्गमय ।',
      'तमसो मा ज्योतिर्गमय ।',
      'मृत्योर्मा अमृतं गमय ।',
      'ॐ शान्तिः शान्तिः शान्तिः ॥'
    ],
    iast: [
      'oṃ asato mā sad gamaya |',
      'tamaso mā jyotir gamaya |',
      'mṛtyor mā amṛtaṃ gamaya |',
      'oṃ śāntiḥ śāntiḥ śāntiḥ ||'
    ],
    metre: 'Anushtubh variation',
    metreHi: 'अनुष्टुप् छन्द भेद',
    anvaya: [
      { word: 'asataḥ mā sat gamaya', meaning: 'from the unreal, lead me to the real', meaningHi: 'मुझे असत्य से सत्य की ओर ले चलें' },
      { word: 'tamasaḥ mā jyotiḥ gamaya', meaning: 'from darkness, lead me to the light', meaningHi: 'मुझे अज्ञान रूपी अन्धकार से ज्ञान रूपी प्रकाश की ओर ले चलें' },
      { word: 'mṛtyoḥ mā amṛtam gamaya', meaning: 'from death, lead me to immortality', meaningHi: 'मुझे मृत्यु (नश्वरता) से अमरत्व की ओर ले चलें' }
    ],
    translation: 'From the unreal, lead me to the Real. From darkness, lead me to the Light. From death, lead me to Immortality. Om, Peace, Peace, Peace.',
    translationHi: 'हे परमात्मन्! मुझे असत्य से सत्य की ओर ले चलो। मुझे अज्ञानान्धकार से आत्मज्ञान के प्रकाश की ओर ले चलो। मुझे मृत्यु के भय से अमरत्व की ओर ले चलो। ॐ शान्तिः शान्तिः शान्तिः।',
    philosophicalContext: 'Perhaps the most beloved universal prayer from antiquity. "Unreal" (asat) refers to transient appearances and ego delusions; "Real" (sat) is eternal being. "Darkness" is spiritual amnesia; "Light" is illumination. "Death" is identification with the perishable body; "Immortality" is the realization of the deathless Atman.',
    philosophicalContextHi: 'विश्व इतिहास की सर्वाधिक लोकप्रसिद्ध आध्यात्मिक प्रार्थना। यहाँ \'असत्\' का तात्पर्य क्षणभंगुर संसार और अहङ्कार के भ्रम से है, \'सत्\' नित्य परब्रह्म है। \'तमस्\' आत्म-विस्मृति है और \'ज्योति\' आत्मसाक्षात्कार है। \'मृत्यु\' देहाभिमान है और \'अमृत\' अविनाशी आत्मा का बोध है।',
    tags: ['Brihadaranyaka', 'Asato Ma', 'Universal Prayer', 'Peace', 'Immortality'],
    audioChantType: 'Meditative Sloka'
  },
  {
    id: 'mundaka-two-birds',
    source: 'Mundaka Upanishad',
    sourceCategory: 'upanishads',
    chapterOrHymn: 'Mundaka 3, Khanda 1, Verse 1',
    chapterOrHymnHi: 'मुण्डक ३, खण्ड १, मन्त्र १',
    authorOrRishi: 'Sage Angiras to Shaunaka',
    authorOrRishiHi: 'महर्षि अङ्गिरा द्वारा शौनक को उपदेश',
    title: 'The Two Golden Birds — Jīvātman & Paramātman',
    titleHi: 'द्वा सुपर्णा — दो दिव्य पक्षी: जीवात्मा एवं परमात्मा रूपी साक्षी',
    devanagari: [
      'द्वा सुपर्णा सयुजा सखाया समानं वृक्षं परिषस्वजाते ।',
      'तयोरन्यः पिप्पलं स्वाद्वत्त्यनश्नन्नन्यो अभिचाकशीति ॥ १ ॥'
    ],
    iast: [
      'dvā suparṇā sayujā sakhāyā samānaṃ vṛkṣaṃ pariṣasvajāte |',
      'tayor anyaḥ pippalaṃ svādv atty anaśnann anyo abhicākaśīti || 1 ||'
    ],
    metre: 'Trishtubh (4 × 11)',
    metreHi: 'त्रिष्टुप् छन्द',
    anvaya: [
      { word: 'dvā suparṇā sayujā sakhāyā', meaning: 'two birds of fair plumage, inseparable companions', meaningHi: 'सुन्दर पंखों वाले दो पक्षी, जो परस्पर अभिन्न सखा हैं' },
      { word: 'samānam vṛkṣam pariṣasvajāte', meaning: 'cling to the selfsame tree (the body)', meaningHi: 'एक ही शरीर रूपी वृक्ष का आश्रय लिए हुए हैं' },
      { word: 'tayoḥ anyaḥ pippalam svādu atti', meaning: 'one of the two eats the sweet and bitter fruits', meaningHi: 'उन दोनों में से एक (जीवात्मा) कर्मफलों का स्वाद लेता है' },
      { word: 'anaśnan anyaḥ abhicākaśīti', meaning: 'the other, without eating, looks on in witness', meaningHi: 'दूसरा (परमात्मा) कुछ न खाते हुए केवल साक्षी रूप में प्रकाशित रहता है' }
    ],
    translation: 'Two birds of beautiful plumage, close companions, cling to the same tree. One of them eats the sweet and bitter fruits; the other looks on in witness without eating.',
    translationHi: 'सुन्दर पंखों वाले दो सखा पक्षी (जीवात्मा और परमात्मा) एक ही वृक्ष (शरीर) पर साथ-साथ रहते हैं। उनमें से एक पक्षी कर्मफलों के खट्टे-मीठे फलों को स्वाद ले-लेकर खाता है, जबकि दूसरा पक्षी कुछ न खाते हुए केवल शान्त साक्षी भाव से देखता रहता है।',
    philosophicalContext: 'A masterwork of poetic allegory. The tree represents the human psychophysical organism. One bird is the empirical ego (Jiva) lost in the drama of pleasure and pain. The second bird is the silent Witness Consciousness (Sakshi Atman), ever free, peaceful, and radiant within.',
    philosophicalContextHi: 'उपनिषदों का अमर काव्यात्मक रूपक। वृक्ष मानव शरीर है, पहला पक्षी सुख-दुःख के द्वन्द्व में उलझा जीवात्मा है, और दूसरा पक्षी हृदय में विराजमान नित्यमुक्त साक्षी चैतन्य (परमात्मा) है। जब जीवात्मा साक्षी का दर्शन करता है, तब वह समस्त शोकों से मुक्त हो जाता है।',
    tags: ['Mundaka Upanishad', 'Witness Consciousness', 'Allegory', 'Atman', 'Ego'],
    audioChantType: 'Meditative Sloka'
  }
];

export const UPANISHADS_OVERVIEW: ScriptureOverview[] = [
  {
    id: 'upanishads-canon',
    name: 'The Mukhya Upanishads',
    sanskritName: 'मुख्य उपनिषदः',
    category: 'upanishads',
    summary: 'The culmination of the Vedic revelation (Vedānta). Composed by forest-dwelling seers between 800 BCE and 300 BCE, they mark the inward turn of human inquiry—from external rites to the intimate nature of the Self (Atman) and the Ultimate Ground of reality (Brahman).',
    summaryHi: 'वैदिक वाङ्मय का सर्वोच्च शिखर और ज्ञानकाण्ड (वेदान्त)। अरण्यवासी ऋषियों द्वारा साक्षात्कृत ये ग्रन्थ बाह्य अनुष्ठानों से मुड़कर मानव अन्तःकरण की गहराई में स्थित आत्मा और ब्रह्म के अद्वैत रहस्य का अनावरण करते हैं।',
    significance: 'Regarded by Arthur Schopenhauer as "the solace of my life and the solace of my death," the Upanishads are the intellectual bedrock of Indian philosophy and global non-dual spirituality.',
    significanceHi: 'जर्मन दार्शनिक शोपेनहावर ने कहा था: "उपनिषद् मेरे जीवन का सम्बल रहे हैं और मेरी मृत्यु का भी परम सम्बल होंगे।" यह वैश्विक अद्वैत दर्शन का मेरुदण्ड हैं।',
    structure: 'Ten to twelve primary (Mukhya) Upanishads commented upon by Adi Shankaracharya and subsequent Acharyas.',
    structureHi: 'आदिशङ्कराचार्य द्वारा भाष्य-प्रतिष्ठित १० से १२ मुख्य उपनिषद् (ईश, केन, कठ, प्रश्न, मुण्डक, माण्डूक्य, तैत्तिरीय, ऐतरेय, छान्दोग्य, बृहदारण्यक)।',
    centralTheme: 'Ayam Atma Brahma (This Self is Brahman) and liberation through knowledge (Jnana).',
    centralThemeHi: 'अयम् आत्मा ब्रह्म (यह आत्मा ही ब्रह्म है) तथा ज्ञान द्वारा आत्यन्तिक मोक्ष की प्राप्ति।',
    sampleSuktasOrVerses: UPANISHADS_SHLOKAS
  }
];
