import type { ScriptureOverview, Shloka } from '../types/canon';

export const VEDAS_SHLOKAS: Shloka[] = [
  {
    id: 'rigveda-nasadiya-1',
    source: 'Rigveda',
    sourceCategory: 'vedas',
    chapterOrHymn: 'Mandala 10, Sukta 129 (Verse 1)',
    chapterOrHymnHi: 'मण्डल १०, सूक्त १२९ (मन्त्र १)',
    authorOrRishi: 'Rishi Prajāpati Parameshṭhin',
    authorOrRishiHi: 'ऋषि प्रजापति परमेष्ठी',
    title: 'Nasadiya Sukta — The Hymn of Primal Creation',
    titleHi: 'नासदीय सूक्त — सृष्टि-उत्पत्ति का आदिम सूक्त',
    devanagari: [
      'नास॑दासी॒न्नो सदा॑सीत्त॒दानीं॒ नासी॒द्रजो॒ नो व्यो॑मा प॒रो यत् ।',
      'किमाव॑रीव॒: कुह॒ कस्य॒ शर्म॒न्नम्भ॒: किमा॑सी॒द्गह॑नं गभी॒रम् ॥ १ ॥'
    ],
    iast: [
      'nā́sadh āsīn nó sád āsīt tadā́nīṃ nā́sīd rájo nó víomā paró yát |',
      'kím ā́varīvaḥ kúha kásya śármann ámbhaḥ kím āsīd gáhanaṃ gabhīrám || 1 ||'
    ],
    metre: 'Trishtubh (44 syllables: 4 × 11)',
    metreHi: 'त्रिष्टुप् छन्द (४४ वर्ण)',
    anvaya: [
      { word: 'tadānīm', meaning: 'at that time before cosmic manifestation', meaningHi: 'सृष्टि के प्रकटीकरण से पूर्व उस समय' },
      { word: 'na asat āsīt', meaning: 'neither non-existence was', meaningHi: 'न असत् (अभाव) था' },
      { word: 'no sat āsīt', meaning: 'nor existence was', meaningHi: 'और न ही सत् (भाव/सृष्टि) था' },
      { word: 'na āsīt rajaḥ', meaning: 'there was neither realm of space / cosmic dust', meaningHi: 'न लोक अथवा अन्तरिक्ष था' },
      { word: 'no vyoma paraḥ yat', meaning: 'nor sky beyond that which exists', meaningHi: 'और न परे कोई आकाश था' },
      { word: 'kim āvarīvaḥ', meaning: 'what concealed it?', meaningHi: 'किसने किसको आच्छादित कर रखा था?' },
      { word: 'kuha kasya śarmann', meaning: 'where, in whose protection?', meaningHi: 'कहाँ और किसके आश्रय में?' },
      { word: 'ambhaḥ kim āsīt', meaning: 'was there water?', meaningHi: 'क्या वहाँ कोई अथाह जल था?' },
      { word: 'gahanam gabhīram', meaning: 'unfathomable and deep', meaningHi: 'जो गहन और अतल गहरा हो' }
    ],
    translation: 'Then was not non-existence nor existence; there was no realm of air, no sky beyond it. What covered it, and where? and what gave shelter? Was water there, unfathomed depth of water?',
    translationHi: 'उस समय (सृष्टि के आरम्भ से पूर्व) न असत् था, न सत् था; न सूक्ष्म लोक था और न ही परे कोई आकाश था। किसने किसको आवृत कर रखा था? कहाँ और किसके संरक्षण में सब कुछ था? क्या वहाँ कोई अगाध, गहन जल था?',
    philosophicalContext: 'The Nasadiya Sukta is widely revered as one of the most intellectually audacious cosmogonic inquiries in world literature. Instead of declaring a dogmatic origin, the Vedic seer contemplates the unmanifest Absolute (Brahman) prior to any duality of being and non-being.',
    philosophicalContextHi: 'नासदीय सूक्त विश्व साहित्य में सृष्टि-मीमांसा की सर्वाधिक गम्भीर एवं विस्मयकारी दार्शनिक रचना है। यहाँ ऋषि किसी हठधर्मी मान्यता को प्रस्तुत करने के स्थान पर उस निर्विशेष परब्रह्म की ओर संकेत करते हैं जो सत् और असत् के द्वन्द्व से भी परे, अपनी ही शक्ति से स्पन्दित हो रहा था।',
    tags: ['Cosmology', 'Rigveda', 'Creation', 'Nasadiya Sukta', 'Metaphysics'],
    audioChantType: 'Vedic Udātta'
  },
  {
    id: 'rigveda-nasadiya-7',
    source: 'Rigveda',
    sourceCategory: 'vedas',
    chapterOrHymn: 'Mandala 10, Sukta 129 (Verse 7)',
    chapterOrHymnHi: 'मण्डल १०, सूक्त १२९ (मन्त्र ७)',
    authorOrRishi: 'Rishi Prajāpati Parameshṭhin',
    authorOrRishiHi: 'ऋषि प्रजापति परमेष्ठी',
    title: 'Nasadiya Sukta — The Final Divine Question',
    titleHi: 'नासदीय सूक्त — परम ज्ञानी की जिज्ञासा',
    devanagari: [
      'इ॒यं विसृ॑ष्टि॒र्यत॑ आब॒भूव॒ यदि॑ वा द॒धे यदि॑ वा॒ न ।',
      'यो अ॒स्याध्य॑क्षः पparamे व्यो॑म॒न्त्सो अ॒ङ्ग वे॑द॒ यदि॑ वा॒ न वेद॑ ॥ ७ ॥'
    ],
    iast: [
      'iyáṃ vísṛṣṭir yáta ābabhū́va yádi vā dadhé yádi vā ná |',
      'yó asyā́dhyakṣaḥ paramé vyòman tsó aṅgá veda yádi vā ná véda || 7 ||'
    ],
    metre: 'Trishtubh (11 syllables per quarter)',
    metreHi: 'त्रिष्टुप् छन्द',
    anvaya: [
      { word: 'iyam visṛṣṭiḥ', meaning: 'this manifold creation', meaningHi: 'यह विविध दृश्यमान सृष्टि' },
      { word: 'yataḥ ābabhūva', meaning: 'from whence it arose', meaningHi: 'जिस मूल स्रोत से उत्पन्न हुई है' },
      { word: 'yadi vā dadhe', meaning: 'whether it fashioned itself', meaningHi: 'चाहे उसने इसे रचा हो' },
      { word: 'yadi vā na', meaning: 'or whether it did not', meaningHi: 'अथवा नहीं रचा हो' },
      { word: 'yaḥ asya adhyakṣaḥ', meaning: 'he who is its surveyor/witness', meaningHi: 'जो इसका परम साक्षी एवं अध्यक्ष है' },
      { word: 'parame vyoman', meaning: 'in highest transcendent space', meaningHi: 'परम व्योम (सर्वोच्च धाम) में' },
      { word: 'saḥ aṅga veda', meaning: 'he alone knows, truly', meaningHi: 'वही वास्तव में इसे जानता है' },
      { word: 'yadi vā na veda', meaning: 'or perchance even he knows not!', meaningHi: 'अथवा सम्भवतः वह भी इसे नहीं जानता!' }
    ],
    translation: 'He, the first origin of this creation, whether he formed it all or did not form it, whose eye controls this world in highest heaven, he verily knows it, or perhaps he knows not!',
    translationHi: 'यह विविध सृष्टि जिस मूल स्रोत से प्रकट हुई है—चाहे उसने इसे रचा हो अथवा न रचा हो—जो परम व्योम में इसका अध्यक्ष और साक्षी है, सम्भवतः वही इसे जानता है, अथवा कदाचित् वह भी नहीं जानता!',
    philosophicalContext: 'The hymn concludes with supreme mystical humility. Even the highest cosmic overseer cannot encompass the primal ground through mere empirical intellect. Truth transcends all conceptual formulation.',
    philosophicalContextHi: 'सूक्त का समापन ज्ञान के चरम विस्मय और विनम्रता के साथ होता है। यहाँ ऋषि यह स्पष्ट करते हैं कि परम सत्य किसी बौद्धिक चौखटे में सीमित नहीं हो सकता; वह मन और बुद्धि की सीमाओं से परे अनिर्वचनीय है।',
    tags: ['Agnosticism', 'Supreme Mystery', 'Rigveda', 'Nasadiya Sukta'],
    audioChantType: 'Vedic Udātta'
  },
  {
    id: 'rigveda-gayatri',
    source: 'Rigveda',
    sourceCategory: 'vedas',
    chapterOrHymn: 'Mandala 3, Sukta 62 (Verse 10)',
    chapterOrHymnHi: 'मण्डल ३, सूक्त ६२ (मन्त्र १०)',
    authorOrRishi: 'Brahmarshi Vishvāmitra',
    authorOrRishiHi: 'ब्रह्मर्षि विश्वामित्र',
    title: 'The Sāvitrī Gāyatrī Mantra — Illumination of Supreme Intellect',
    titleHi: 'सावित्री गायत्री मन्त्र — प्रज्ञा का दिव्य आलोक',
    devanagari: [
      'ॐ भूर्भुव॒: स्व॒: ।',
      'तत्सवितुर्वरे॑ण्यं॒ भर्गो॑ दे॒वस्य॑ धीमहि ।',
      'धियो॒ यो न॑: प्रचो॒दया॑त् ॥'
    ],
    iast: [
      'oṃ bhūr bhuvaḥ svaḥ |',
      'tát savitúr váreṇyaṃ bhárgo devásya dhīmahi |',
      'dhíyo yó naḥ pracodáyāt ||'
    ],
    metre: 'Gayatri (24 syllables: 3 × 8)',
    metreHi: 'गायत्री छन्द (२४ वर्ण: ३ × ८)',
    anvaya: [
      { word: 'om bhūr bhuvaḥ svaḥ', meaning: 'the physical, vital, and celestial planes', meaningHi: 'भूः (पृथ्वी), भुवः (अन्तरिक्ष), स्वः (द्युलोक)' },
      { word: 'savitur devasya', meaning: 'of Savita, the solar divine origin of light', meaningHi: 'सविता देव (समस्त जगत् के उत्पादक एवं प्रकाशक परमात्मा) का' },
      { word: 'tat vareṇyam bhargaḥ', meaning: 'that most adorable and supreme effulgence', meaningHi: 'उस वरेण्य (सर्वश्रेष्ठ) तेज का' },
      { word: 'dhīmahi', meaning: 'we meditate upon', meaningHi: 'हम ध्यान करते हैं' },
      { word: 'yaḥ naḥ dhiyaḥ', meaning: 'may that radiant reality our intuitive intellects', meaningHi: 'जो हमारी बुद्धियों और विचारों को' },
      { word: 'pracodayāt', meaning: 'awaken, inspire, and guide', meaningHi: 'सन्मार्ग की ओर प्रेरित करे' }
    ],
    translation: 'We meditate upon that supreme, adorable splendor of Savita, the Divine Sun of cosmic truth. May that Light awaken and illuminate our inner vision and intuitive intellect.',
    translationHi: 'हम उस प्राणस्वरूप, दुःखनाशक, सुखस्वरूप, श्रेष्ठ, तेजस्वी, पापनाशक, देवस्वरूप परमात्मा का ध्यान करते हैं। वह परमात्मा हमारी बुद्धि को सन्मार्ग में प्रेरित करे।',
    philosophicalContext: 'Known as the Mother of the Vedas (Veda-Mātā), the Gayatri is an invocation for spiritual intelligence (Dhi). It requests that the same sovereign solar consciousness that animates the galaxies illuminate human cognition.',
    philosophicalContextHi: 'वेदों की माता कहलाने वाला गायत्री मन्त्र प्रज्ञा (धी) और अन्तश्चेतना के जागरण की पराकाष्ठा है। यह प्रार्थना करती है कि जो दिव्य सौर चेतना सम्पूर्ण ब्रह्माण्ड को संचालित करती है, वही हमारी अन्तःचेतना को सत्पथ पर प्रेरित करे।',
    tags: ['Gayatri Mantra', 'Solar Consciousness', 'Rigveda', 'Meditation'],
    audioChantType: 'Vedic Udātta'
  },
  {
    id: 'rigveda-purusha-sukta',
    source: 'Rigveda',
    sourceCategory: 'vedas',
    chapterOrHymn: 'Mandala 10, Sukta 90 (Verse 1)',
    chapterOrHymnHi: 'मण्डल १०, सूक्त ९० (मन्त्र १)',
    authorOrRishi: 'Rishi Nārāyaṇa',
    authorOrRishiHi: 'ऋषि नारायण',
    title: 'Purusha Sukta — The Hymn of the Cosmic Being',
    titleHi: 'पुरुष सूक्त — विराट् विश्वात्मा का ध्यान',
    devanagari: [
      'स॒हस्र॑शीर्षा॒ पुरु॑षः सहस्रा॒क्षः स॒हस्र॑पात् ।',
      'स भूमिं॑ वि॒श्वतो॑ वृ॒त्वात्य॑तिष्ठद्दशाङ्गु॒लम् ॥ १ ॥'
    ],
    iast: [
      'sahásraśīrṣā púruṣaḥ sahasrākṣáḥ sahásrapāt |',
      'sá bhū́miṃ viśváto vṛtvā́ti atiṣṭhad daśāṅgulám || 1 ||'
    ],
    metre: 'Anushtubh (32 syllables: 4 × 8)',
    metreHi: 'अनुष्टुप् छन्द (३२ वर्ण: ४ × ८)',
    anvaya: [
      { word: 'sahasra-śīrṣā puruṣaḥ', meaning: 'thousand-headed is the Cosmic Purusha', meaningHi: 'वह परम पुरुष सहस्रों मस्तक वाला है' },
      { word: 'sahasrākṣaḥ', meaning: 'with a thousand eyes', meaningHi: 'सहस्रों नेत्रों वाला' },
      { word: 'sahasra-pāt', meaning: 'and a thousand feet', meaningHi: 'और सहस्रों चरणों वाला है' },
      { word: 'saḥ bhūmim viśvataḥ vṛtvā', meaning: 'he, having encompassed the entire cosmos on every side', meaningHi: 'वह सम्पूर्ण ब्रह्माण्ड को सब ओर से व्याप्त करके' },
      { word: 'ati atiṣṭhat daśāṅgulam', meaning: 'transcends and stands beyond it by ten spans', meaningHi: 'दसों दिशाओं और हृदय प्रदेश से भी परे अनन्त रूप में स्थित है' }
    ],
    translation: 'A thousand heads hath Purusha, a thousand eyes, a thousand feet. On every side pervading earth he fills space and transcends it yet by the breadth of ten fingers into infinity.',
    translationHi: 'उस विराट् परम पुरुष के सहस्रों मस्तक, सहस्रों नेत्र और सहस्रों चरण हैं। वह सम्पूर्ण विश्व को सब ओर से व्याप्त करके भी उससे परे अनन्त विस्तार में प्रतिष्ठित है।',
    philosophicalContext: 'The Purusha Sukta establishes the holographic and organic unity of existence: the cosmos is not an inanimate machine, but the living body of the Supreme Spirit (Purusha), where every creature is an eye, a hand, and a manifestation of the whole.',
    philosophicalContextHi: 'पुरुष सूक्त सम्पूर्ण अस्तित्व की सावयव एकता का प्रतिपादन करता है—संसार कोई जड़ यन्त्र नहीं, अपितु उस परम चेतन विराट् पुरुष का ही साक्षात् शरीर है, जिसमें प्रत्येक प्राणी उसी का अङ्ग और प्रकटीकरण है।',
    tags: ['Purusha Sukta', 'Cosmic Unity', 'Rigveda', 'Sacred Order'],
    audioChantType: 'Vedic Udātta'
  },
  {
    id: 'rigveda-vak-sukta',
    source: 'Rigveda',
    sourceCategory: 'vedas',
    chapterOrHymn: 'Mandala 10, Sukta 125 (Verse 3)',
    chapterOrHymnHi: 'मण्डल १०, सूक्त १२५ (मन्त्र ३)',
    authorOrRishi: 'Brahmavādinī Vāgāmbhr̥ṇī',
    authorOrRishiHi: 'ब्रह्मवादिनी वागाम्भृणी',
    title: 'Vāk Sūkta — The Divine Word as Sovereign Reality',
    titleHi: 'वाक् सूक्त — परम चेतना रूपी देवी वाक्',
    devanagari: [
      'अ॒हं राष्ट्री॑ सं॒गम॑नी॒ वसू॑नां चिकि॒तुषी॑ प्रथ॒मा य॒ज्ञिया॑नाम् ।',
      'तां मा॑ दे॒वा व्य॑दधुः पुरु॒त्रा भूरि॑स्थात्रां॒ भूर्या॑वे॒शय॑न्तीम् ॥ ३ ॥'
    ],
    iast: [
      'aháṃ rā́ṣṭrī saṃgámanī vásūnāṃ cikituṣī́ prathamā́ yajñíyānām |',
      'tā́ṃ mā devā́ vy àdadhuḥ purutrā́ bhū́risthātrāṃ bhū́ry āveśáyantīm || 3 ||'
    ],
    metre: 'Trishtubh (11 syllables per quarter)',
    metreHi: 'त्रिष्टुप् छन्द',
    anvaya: [
      { word: 'aham rāṣṭrī', meaning: 'I am the sovereign queen of all realms', meaningHi: 'मैं सम्पूर्ण जगत् की अधीश्वरी महारानी हूँ' },
      { word: 'saṃgamanī vasūnām', meaning: 'the gatherer of all treasures of bliss', meaningHi: 'समस्त ऐश्वर्यों और धनों को एकत्र करने वाली' },
      { word: 'cikituṣī', meaning: 'the supreme knower of Brahman', meaningHi: 'ब्रह्म का साक्षात् करने वाली परम ज्ञानी' },
      { word: 'prathamā yajñiyānām', meaning: 'first among those worthy of worship', meaningHi: 'यज्ञपात्रों और पूज्यों में सर्वप्रमुख' },
      { word: 'tām mā devāḥ', meaning: 'that very self, the gods', meaningHi: 'मुझ वाक् रूपा को देवताओं ने' },
      { word: 'vyadadhuḥ purutrā', meaning: 'have distributed in manifold places', meaningHi: 'अनेकानेक स्थानों में प्रतिष्ठित किया है' },
      { word: 'bhūristhātrām bhūry āveśayantīm', meaning: 'dwelling in countless abodes and beings', meaningHi: 'जो अनन्त रूपों में सब प्राणियों के भीतर प्रविष्ट है' }
    ],
    translation: 'I am the Sovereign Queen, the gatherer of all treasures, acute in wisdom, foremost of those to whom sacrifice is offered. Thus the Gods have established me in many places with many homes on every side.',
    translationHi: 'मैं सम्पूर्ण जगत् की सम्राज्ञी हूँ, सब धनों का संचय कराने वाली, ब्रह्मज्ञान से सम्पन्न तथा पूज्यों में प्रथम हूँ। देवताओं ने मुझे अनेक स्थानों में प्रतिष्ठित किया है, और मैं सब प्राणियों में प्रविष्ट होकर निवास करती हूँ।',
    philosophicalContext: 'Chanted by the female Vedic seer Vak Ambhrini, this is one of the earliest hymns of non-dual Goddess theology. The spoken word (Vak / Logos) is not merely speech, but the primal vibration and self-awareness of the Absolute that creates, sustains, and liberates the cosmos.',
    philosophicalContextHi: 'ऋषिका वागाम्भृणी द्वारा उच्चारित यह सूक्त शाक्त अद्वैत दर्शन का आदिम स्रोत है। यहाँ वाक् केवल वाणी नहीं, अपितु परब्रह्म की वह आदि-स्फुरणा (नाद ब्रह्म) है जिससे सम्पूर्ण चराचर जगत् की सृष्टि, स्थिति और लय सम्भव होता है।',
    tags: ['Vak Sukta', 'Feminine Seers', 'Logos', 'Rigveda', 'Non-Duality'],
    audioChantType: 'Vedic Udātta'
  }
];

export const VEDAS_OVERVIEW: ScriptureOverview[] = [
  {
    id: 'rigveda',
    name: 'Rigveda',
    sanskritName: 'ऋग्वेद',
    category: 'vedas',
    summary: 'The most archaic sacred text in the Indo-European lineage, consisting of 1,028 suktas (hymns) organized into 10 Mandalas. It represents the ecstatic visionary hymns of ancient Rishis invoking cosmic powers (Devas) like Agni, Indra, Soma, and Usha, culminating in pure non-dual philosophical hymns.',
    summaryHi: 'मानव इतिहास का प्राचीनतम एवं सर्वाधिक पावन ग्रन्थ, जिसमें १० मण्डलों में व्यवस्थित १,०२८ सूक्त और १०,५५२ ऋचाएँ संगृहीत हैं। यह अग्नि, इन्द्र, सोम और उषा आदि दिव्य शक्तियों की स्तुति से आरम्भ होकर नासदीय सूक्त जैसे विशुद्ध अद्वैत दर्शन पर समाप्त होता है।',
    significance: 'Regarded as the primal fountainhead of Indian civilization, Sanskrit prosody, music, and metaphysics.',
    significanceHi: 'भारतीय संस्कृति, अध्यात्म, संस्कृत भाषा, छन्दशास्त्र और दार्शनिक प्रज्ञा का आदिम अक्षय स्रोत।',
    structure: '10 Mandalas, 1,028 Suktas, 10,552 Mantras/Riks.',
    structureHi: '१० मण्डल, १,०२८ सूक्त, १०,५५२ मन्त्र/ऋचाएँ।',
    centralTheme: 'Ṛta (Cosmic Harmonic Truth), Agni as inner flame of aspiration, and non-dual origin of existence.',
    centralThemeHi: 'ऋत (सृष्टि का शाश्वत नियम), अन्तश्चेतना की ज्वाला रूप अग्नि, तथा परब्रह्म की अद्वैत अनुभूति।',
    sampleSuktasOrVerses: VEDAS_SHLOKAS.filter(s => s.source === 'Rigveda')
  },
  {
    id: 'samaveda',
    name: 'Samaveda',
    sanskritName: 'सामवेद',
    category: 'vedas',
    summary: 'The Veda of Sacred Melody and Chants (Saman). Almost all its verses are taken from the Rigveda, but set to sophisticated musical scales (Gana) and tonal rhythms that gave birth to Indian classical music (Raga & Tala).',
    summaryHi: 'दिव्य गान और संगीत का वेद (सामन्)। इसके प्रायः सभी मन्त्र ऋग्वेद से उद्धृत हैं, किन्तु उन्हें विशिष्ट स्वर-लहरियों और तालों में निबद्ध किया गया है, जिसने भारतीय शास्त्रीय संगीत (राग एवं ताल) को जन्म दिया।',
    significance: 'Lord Krishna declares in Bhagavad Gita 10.22: "Among the Vedas, I am the Samaveda" (वेदानां सामवेदोऽस्मि).',
    significanceHi: 'भगवान् श्रीकृष्ण ने श्रीमद्भगवद्गीता (१०.२२) में उद्घोष किया है: "वेदों में मैं सामवेद हूँ" (वेदानां सामवेदोऽस्मि)।',
    structure: '1,875 verses divided into Archika and Gana divisions.',
    structureHi: '१,८७५ मन्त्र, आर्चिक एवं गान विभागों में विभक्त।',
    centralTheme: 'Nada Brahman (Sound as Divine Reality) and musical ecstasis in sacred contemplation.',
    centralThemeHi: 'नाद ब्रह्म (ध्वनि रूपी परमात्मा) तथा आध्यात्मिक समाधि की संगीत-मय अनुभूति।',
    sampleSuktasOrVerses: []
  },
  {
    id: 'yajurveda',
    name: 'Yajurveda',
    sanskritName: 'यजुर्वेद',
    category: 'vedas',
    summary: 'The Veda of sacrificial formulas and ritual prose (Yajus). Preserved in two main recensions: Shukla (White) and Krishna (Black) Yajurveda. It contains the sacred Sri Rudram and the celebrated Shanti Mantras.',
    summaryHi: 'यज्ञीय अनुष्ठानों एवं मन्त्र-गद्य (यजुष्) का वेद। यह शुक्ल एवं कृष्ण यजुर्वेद की दो मुख्य शाखाओं में सुरक्षित है। इसमें प्रसिद्ध श्रीरुद्रम् तथा सार्वभौमिक शान्ति मन्त्र समाहित हैं।',
    significance: 'Provides the inner link between external cosmic sacrifice (Yajna) and psychological self-offering to the transcendent.',
    significanceHi: 'बाह्य यज्ञ और आन्तरिक आत्म-समर्पण के मध्य दार्शनिक सेतु का निर्माण करता है।',
    structure: 'Divided into Shukla (Vajasaneyi Samhita) and Krishna (Taittiriya, Maitrayani) traditions.',
    structureHi: 'शुक्ल (वाजसनेयि संहिता) एवं कृष्ण (तैत्तिरीय, मैत्रायणी) परम्पराओं में विभक्त।',
    centralTheme: 'Sacrifice as self-dedication, universal harmony, and universal peace (Shanti).',
    centralThemeHi: 'आत्म-समर्पण रूपी यज्ञ, विश्व-कल्याण और सार्वभौमिक शान्ति।',
    sampleSuktasOrVerses: []
  },
  {
    id: 'atharvaveda',
    name: 'Atharvaveda',
    sanskritName: 'अथर्ववेद',
    category: 'vedas',
    summary: 'Attributed to sages Atharvan and Angiras, this Veda engages with daily human existence, healing herbs, psychology, statecraft, mathematical harmony, and profound philosophical hymns such as the Prithvi Sukta (Hymn to Mother Earth).',
    summaryHi: 'महर्षि अथर्वा और अङ्गिरा से सम्बद्ध यह वेद दैनिक जीवन, आयुर्वेद, मानसशास्त्र, राष्ट्ररक्षा तथा माता पृथ्वी के प्रति कृतज्ञता प्रकट करने वाले प्रसिद्ध पृथ्वी सूक्त का भण्डार है।',
    significance: 'Pioneered Indian medicine (Ayurveda), ecological reverence, and the non-dual Mundaka/Mandukya Upanishads.',
    significanceHi: 'आयुर्वेद, पर्यावरण संरक्षण की दिव्य दृष्टि तथा मुण्डक/माण्डूक्य उपनिषदों की दार्शनिक पीठिका।',
    structure: '20 Kandas, 730 hymns, approximately 6,000 mantras.',
    structureHi: '२० काण्ड, ७३० सूक्त, लगभग ६,००० मन्त्र।',
    centralTheme: 'Prithvi Sukta (Ecological sanctity of Earth) and holistic integration of spirit with worldly life.',
    centralThemeHi: 'पृथ्वी सूक्त (माता भूमिः पुत्रोऽहं पृथिव्याः) तथा आध्यात्मिक एवं व्यावहारिक जीवन का समग्र समन्वय।',
    sampleSuktasOrVerses: []
  }
];
