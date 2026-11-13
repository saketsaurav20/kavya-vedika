import type { Poet, Shloka } from '../types/canon';
import { getAssetUrl } from '../utils/asset';

export const POETS_LIST: Poet[] = [
  {
    id: 'valmiki',
    name: 'Maharishi Valmiki',
    sanskritName: 'महर्षि वाल्मीकि',
    era: 'Classical / Mythological Era',
    eraHi: 'पौराणिक एवं शास्त्रीय युग',
    periodApprox: 'Circa 1st Millennium BCE',
    periodApproxHi: 'लगभग प्रथम सहस्राब्दी ईसा पूर्व',
    category: 'classical',
    regionOrTradition: 'Naimisharanya / Northern India (Adikavi Tradition)',
    regionOrTraditionHi: 'नैमिषारण्य एवं तमसा तट (आदिकवि परम्परा)',
    bio: 'Revered as the Ādikavi (First Poet) of Sanskrit literature and author of the epic Rāmāyaṇa. Legend recounts his transformation from an ascetic observer to an ecstatic poet upon witnessing the lament of a Krauncha bird, which spontaneously gave birth to the classical Anuṣṭubh metre.',
    bioHi: 'संस्कृत साहित्य के \'आदिकवि\' और अमर महाकाव्य रामायण के रचयिता। तमसा नदी के तट पर क्रौञ्च पक्षी के वध से उत्पन्न इनके हृदय-शोक से ही संस्कृत के प्रथम अनुष्टुप् श्लोक ("मा निषाद...") का प्राकट्य हुआ।',
    imageUrl: getAssetUrl('/images/valmiki-ramayana.jpeg'),
    imageCaption: 'Maharishi Valmiki in divine contemplation penning the sacred Rāmāyaṇa',
    imageCaptionHi: 'महर्षि वाल्मीकि दिव्य ध्यान में पवित्र रामायण की रचना करते हुए',
    imageAlt: 'Maharishi Valmiki authoring the Ramayana',
    imageFocalPoint: 'center 20%',
    famousWorks: ['Rāmāyaṇa (24,000 verses)', 'Yoga Vāsiṣṭha (attributed tradition)'],
    masterpieceQuote: {
      verse: 'मा निषाद प्रतिष्ठां त्वमगमः शाश्वतीः समाः । यत्क्रौञ्चमिथुनादेकमवधीः काममोहितम् ॥',
      translation: 'O Hunter, you shall not achieve renown for endless years, because you have slain one of the pair of curlews while it was infatuated with love.',
      translationHi: 'हे निषाद! तुझे अनन्त वर्षों तक कभी प्रतिष्ठा प्राप्त न हो, क्योंकि तूने काम-मोहित क्रौञ्च पक्षियों के जोड़े में से एक का वध कर दिया है।',
      work: 'Rāmāyaṇa (Bālakāṇḍa 2.15)',
      workHi: 'रामायण (बालकाण्ड २.१५)'
    },
    keyThemes: ['Adikavya', 'Dharma', 'Compassion (Kāruṇya)', 'Ideal Humanity', 'Anushtubh Meter'],
    keyThemesHi: ['आदिकाव्य', 'धर्म एवं मर्यादा', 'करुणा', 'आदर्श मानव चरित्र', 'अनुष्टुप् छन्द']
  },
  {
    id: 'vyasa',
    name: 'Maharishi Ved Vyāsa',
    sanskritName: 'महर्षि वेदव्यास (कृष्ण द्वैपायन)',
    era: 'Vedic / Epic Classical Era',
    eraHi: 'वैदिक एवं महाकाव्य युग',
    periodApprox: 'Circa 1st Millennium BCE',
    periodApproxHi: 'लगभग प्रथम सहस्राब्दी ईसा पूर्व',
    category: 'classical',
    regionOrTradition: 'Pan-Indian Vedic Compiler',
    regionOrTraditionHi: 'अखिल भारतीय वैदिक संकलन परम्परा',
    bio: 'The great sage credited with compiling and arranging the four Vedas (hence "Vyāsa", the arranger), authoring the colossal 100,000-verse Mahābhārata (including the sacred Bhagavad Gītā), the eighteen Purāṇas, and the Brahma Sūtras.',
    bioHi: 'वेदों को चार संहिताओं में विभक्त करने के कारण \'व्यास\' कहलाए। इन्होंने एक लाख श्लोकों वाले महाकाव्य महाभारत (जिसमें श्रीमद्भगवद्गीता समाहित है), अठारह महापुराणों और ब्रह्मसूत्रों की रचना कर भारतीय वाङ्मय को अमर बना दिया।',
    imageUrl: getAssetUrl('/images/ganesha-vyasa-mahabharata.jpeg'),
    imageCaption: 'Bhagavan Ganesha scribing the 100,000-verse Mahābhārata as Sage Vyāsa recites',
    imageCaptionHi: 'भगवान् गणेश महर्षि वेदव्यास के वचनों को लिपिबद्ध करते हुए',
    imageAlt: 'Ganesha transcribing the Mahabharata with Ved Vyasa',
    imageFocalPoint: 'center 40%',
    famousWorks: ['Mahābhārata', 'Bhagavad Gītā', 'Brahma Sūtras', 'Eighteen Mahāpurāṇas'],
    masterpieceQuote: {
      verse: 'यदा यदा हि धर्मस्य ग्लानिर्भवति भारत । अभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम् ॥',
      translation: 'Whenever and wherever there is a decline in righteous order, O descendant of Bharata, and a predominant rise of chaos and injustice, at that time I manifest Myself.',
      translationHi: 'हे भारत (अर्जुन)! जब-जब धर्म की हानि और अधर्म की वृद्धि होती है, तब-तब मैं (धर्म की रक्षा हेतु) स्वयं को साकार रूप में प्रकट करता हूँ।',
      work: 'Bhagavad Gītā (4.7)',
      workHi: 'श्रीमद्भगवद्गीता (४.७)'
    },
    keyThemes: ['Cosmic Order', 'Karmayoga', 'The Tragic Web of Destiny', 'Synthesizer of Sacred Wisdom'],
    keyThemesHi: ['धर्म एवं नियति', 'कर्मयोग', 'ब्रह्मसूत्र', 'वैदिक समन्वय']
  },
  {
    id: 'kalidasa',
    name: 'Mahākavi Kālidāsa',
    sanskritName: 'महाकवि कालिदास',
    era: 'Classical Golden Age (Gupta Era)',
    eraHi: 'शास्त्रीय स्वर्णयुग (गुप्त काल)',
    periodApprox: 'Circa 4th–5th Century CE',
    periodApproxHi: 'लगभग चौथी-पाँचवीं शताब्दी ईस्वी',
    category: 'classical',
    regionOrTradition: 'Ujjayini (Malwa, Central India)',
    regionOrTraditionHi: 'उज्जयिनी (मालवा, मध्य भारत)',
    bio: 'Unanimously acclaimed as the Shakespeare of Sanskrit literature and master of poetic similitude (Upamā Kālidāsasya). His works harmonize nature\'s erotic grandeur with spiritual transcendence and pristine psychological insight.',
    bioHi: 'संस्कृत साहित्य के मुकुटमणि और उपमा सम्राट ("उपमा कालिदासस्य")। इनके नाटकों एवं काव्यों में प्रकृति का सजीव सौन्दर्य, शृङ्गार रस की गरिमा, और मानवीय मनोविज्ञान का अलौकिक समन्वय दिखाई देता है।',
    imageUrl: getAssetUrl('/images/kalidasa-meghaduta.jpeg'),
    imageCaption: 'The Messenger of Hope (Meghadūta) — The exiled Yaksha implores the cloud to fly to Alakāpuri',
    imageCaptionHi: 'मेघदूत — निर्वासित यक्ष रामगिरि पर्वत से मेघ को दूत बनाकर अलकापुरी भेजता है',
    imageAlt: 'Kalidasa Meghaduta - The Messenger of Hope',
    imageFocalPoint: 'center 60%',
    famousWorks: ['Meghadūta (The Cloud Messenger)', 'Abhijñānaśākuntalam', 'Kumārasambhava', 'Raghuvaṃśa', 'Ṛtusaṃhāra'],
    masterpieceQuote: {
      verse: 'कश्चित्कान्ताविरहगुरुणा स्वाधिकारात्प्रमत्ततः... मेघमालोक्य यतते चेतो भवति वियोगिनां ॥',
      translation: 'A certain Yaksha, negligent of his sacred duties, cursed by his master to endure a year\'s separation from his beloved... seeing a solitary dark cloud upon the peak, his longing stirs anew; for what lover does not yearn when rain-clouds gather?',
      translationHi: 'अपने कर्तव्य में प्रमाद करने के कारण स्वामी के शाप से निर्वासित हुआ यक्ष जब आषाढ़ के प्रथम दिन पर्वत-शिखर पर मेघ को देखता है, तो विरह की वेदना उमड़ पड़ती है; क्योंकि मेघ के दर्शन से किसका हृदय व्याकुल नहीं होता?',
      work: 'Meghadūta (Opening)',
      workHi: 'मेघदूतम् (पूर्वमेघ)'
    },
    keyThemes: ['Upamā (Sublime Simile)', 'Vipralambha Shringara (Love in Longing)', 'Nature as Cosmic Witness', 'Sensuous Harmony'],
    keyThemesHi: ['अनुपम उपमाएँ', 'विप्रलम्भ शृङ्गार', 'प्रकृति-चित्रण', 'रस निष्पत्ति']
  },
  {
    id: 'shankara',
    name: 'Ādi Śaṅkarācārya',
    sanskritName: 'आदि शङ्कराचार्य',
    era: 'Early Medieval Classical Philosophy',
    eraHi: 'पूर्व-मध्यकालीन अद्वैत दर्शन',
    periodApprox: '788–820 CE (Kaladi, Kerala)',
    periodApproxHi: '७८८–८२० ईस्वी (कालडी, केरल)',
    category: 'classical',
    regionOrTradition: 'Advaita Vedānta & Pan-Indian Monastic Tradition',
    regionOrTraditionHi: 'अद्वैत वेदान्त एवं चतुराम्नाय मठ परम्परा',
    bio: 'The towering philosopher-poet who consolidated the doctrine of Advaita Vedānta (Absolute Non-Dualism). In a brief lifespan of 32 years, he authored monumental commentaries on the Upanishads, Gita, and Brahma Sutras, while simultaneously composing breathtaking devotional and mystical stotras.',
    bioHi: 'मात्र ३२ वर्ष की अल्पायु में प्रस्थानत्रयी (उपनिषद्, गीता, ब्रह्मसूत्र) पर अमर भाष्य रचकर भारत के चारों कोनों में चार आम्नाय मठों की स्थापना करने वाले जगद्गुरु। इन्होंने निर्गुण ब्रह्म के अद्वैत के साथ-साथ शिव, शक्ति और कृष्ण के अद्भुत स्तोत्र रचे।',
    famousWorks: ['Nirvāṇa Ṣaṭkam', 'Soundarya Laharī', 'Bhaja Govindam', 'Vivekacūḍāmaṇi', 'Prasthanatrayi Bhasya'],
    masterpieceQuote: {
      verse: 'मनोबुद्ध्यहङ्कार चित्तानि नाहं न च श्रोत्रजिह्वे न च घ्राणनेत्रे । चिदानन्दरूपः शिवोऽहं शिवोऽहम् ॥',
      translation: 'I am not mind, nor intellect, nor ego, nor memory; nor am I the ears, the tongue, the nose, or the eyes... I am Consciousness and Pure Bliss: I am Shiva, I am Shiva!',
      translationHi: 'मैं न मन हूँ, न बुद्धि, न अहङ्कार और न चित्त; न कान, न जीभ, न नासिका और न नेत्र... मैं तो नित्य चैतन्य और परमानन्द स्वरूप हूँ: मैं ही शिव हूँ, मैं ही शिव हूँ!',
      work: 'Nirvāṇa Ṣaṭkam (Verse 1)',
      workHi: 'निर्वाणषट्कम् (श्लोक १)'
    },
    keyThemes: ['Advaita Non-Duality', 'Radical De-identification', 'Shivoham (I am Pure Awareness)', 'Devotional Ecstasy'],
    keyThemesHi: ['अद्वैत वेदान्त', 'चिदानन्दरूपः शिवोऽहम्', 'विवेक एवं वैराग्य', 'नेति-नेति विचार']
  },
  {
    id: 'bhartrihari',
    name: 'Bhartṛhari',
    sanskritName: 'भर्तृहरि',
    era: 'Classical Era',
    eraHi: 'शास्त्रीय युग',
    periodApprox: 'Circa 5th Century CE (Ujjain)',
    periodApproxHi: 'लगभग ५वीं शताब्दी ईस्वी (उज्जयिनी)',
    category: 'classical',
    regionOrTradition: 'Philosopher-King & Grammarian',
    regionOrTraditionHi: 'राजर्षि एवं भाषा-दार्शनिक (मालवा)',
    bio: 'A legendary king who vacillated between palace luxury and monastic forest retreat, capturing human contradiction through the Śatakatraya (Three Centuries of Verses: on Ethics, Love, and Renunciation) and pioneering linguistic metaphysics in Vākyapadīya.',
    bioHi: 'राजसुख और वन-वैराग्य के द्वन्द्व को जीकर मानव स्वभाव का यथार्थ चित्रण करने वाले राजर्षि कवि। इन्होंने नीतिशतक, शृङ्गारशतक और वैराग्यशतक के माध्यम से जीवन के तीनों पक्षों का अद्भुत निरूपण किया।',
    famousWorks: ['Vairāgya Śatakam (Century on Renunciation)', 'Nīti Śatakam (Century on Ethics)', 'Śṛṅgāra Śatakam', 'Vākyapadīya'],
    masterpieceQuote: {
      verse: 'भोगा न भुक्ता वयमेव भुक्तास्तपो न तप्तं वयमेव तप्ताः । कालो न यातो वयमेव यातास्तृष्णा न जीर्णा वयमेव जीर्णाः ॥',
      translation: 'We have not enjoyed pleasures; pleasures have consumed us! We have not performed austerities; we ourselves have been scorched! Time has not elapsed; it is our lives that have slipped away! Desire has not decayed; we ourselves have grown old and decayed!',
      translationHi: 'हमने भोगों को नहीं भोगा, अपितु भोगों ने ही हमें खा लिया! हमने तप नहीं किया, हम स्वयं ही सन्ताप से भस्म हो गए! समय नहीं बीता, हमारी आयु ही बीत गई! और तृष्णा कभी बूढ़ी नहीं हुई, हम स्वयं ही जीर्ण-शीर्ण हो गए!',
      work: 'Vairāgya Śatakam (Verse 7)',
      workHi: 'वैराग्यशतकम् (श्लोक ७)'
    },
    keyThemes: ['Transience of Sensual Pleasure', 'Existential Satire', 'The Majesty of Freedom', 'Ethics (Nīti)'],
    keyThemesHi: ['सांसारिक भोगों की नश्वरता', 'वैराग्य', 'नीति एवं सदाचार', 'तृष्णा-मुक्ति']
  },
  {
    id: 'kabir',
    name: 'Sant Kabīr Dās',
    sanskritName: 'सन्त कबीरदास',
    era: 'Bhakti Movement',
    eraHi: 'मध्यकालीन भक्ति आन्दोलन',
    periodApprox: '1398–1518 CE (Varanasi)',
    periodApproxHi: '१३९८–१५१८ ईस्वी (काशी)',
    category: 'bhakti',
    regionOrTradition: 'Nirguna Bhakti (Mystic Weaver of Kashi)',
    regionOrTraditionHi: 'निर्गुण भक्ति धारा (काशी)',
    bio: 'One of the most radical, fearlessly iconoclastic poet-saints of India. A humble weaver who rejected ritualism, caste prejudices, and temple-mosque dogmas to awaken direct, unmediated communion with the Unseen Divine (Ram / Nirguna Brahman) dwelling within the human heart.',
    bioHi: 'निर्गुण भक्ति शाखा के सर्वश्रेष्ठ रहस्यवादी सन्त। पेशे से जुलाहा, जिन्होंने पाखण्ड, जातिभेद और बाह्याडम्बरों पर तीखी चोट करते हुए हृदय के भीतर घट-घट वासी राम के साक्षात्कार का अमर सन्देश दिया।',
    famousWorks: ['Bījak', 'Kabīr Granthāvalī', 'Anurāg Sāgar', 'Verses in Guru Granth Sahib'],
    masterpieceQuote: {
      verse: 'कस्तूरी कुंडल बसै, मृग ढूँढै बन माहिं । ऐसे घट-घट राम हैं, दुनिया देखै नाहिं ॥',
      translation: 'The musk dwells within the deer\'s own navel, yet it wanders bewildered across the forest searching for the fragrance. In the same way, the Divine permeates every human heart, yet the blind world searches everywhere outside.',
      translationHi: 'कस्तूरी मृग की नाभि में ही बसती है, किन्तु वह उसकी सुगन्ध की खोज में सारे वन में भटकता फिरता है। इसी प्रकार परमात्मा घट-घट में विद्यमान है, किन्तु अज्ञानी संसार उसे बाहर खोजता फिरता है।',
      work: 'Kabir Sakhi',
      workHi: 'कबीर साखी'
    },
    keyThemes: ['Nirguna Bhakti', 'Direct Inner Realization', 'Social Equality', 'Ulatbansi (Inverted Mystic Paradox)'],
    keyThemesHi: ['घट-घट वासी राम', 'ढाई आखर प्रेम', 'सामाजिक समता', 'उलटबांसी']
  },
  {
    id: 'tulsidas',
    name: 'Goswāmī Tulsīdās',
    sanskritName: 'गोस्वामी तुलसीदास',
    era: 'Bhakti Renaissance',
    eraHi: 'भक्तिकाल (सगुण रामभक्ति)',
    periodApprox: '1532–1623 CE (Varanasi / Ayodhya)',
    periodApproxHi: '१५३२–१६२३ ईस्वी (काशी/अयोध्या)',
    category: 'bhakti',
    regionOrTradition: 'Saguna Rama Bhakti (Awadhi Literature)',
    regionOrTraditionHi: 'अवधी साहित्य एवं रामभक्ति परम्परा',
    bio: 'The saint-poet whose Awadhi vernacular retelling of the Ramayana—the Rāmcaritmānas—democratized the sacred epic for millions of ordinary households. His mastery of Chaupai meter and tender devotion elevated vernacular poetry to eternal heights.',
    bioHi: 'अवधी भाषा में \'श्रीरामचरितमानस\' की रचना कर रामकथा को जन-जन के कण्ठ का हार बना देने वाले महाकवि। इनकी चौपाइयाँ और दोहे भारतीय जनमानस के आचार-विचार की आधारशिला हैं।',
    imageUrl: getAssetUrl('/images/hanuman-bhakti.jpeg'),
    imageCaption: 'Shri Hanuman (Jai Hanuman 🙏) — Eternal guardian of Rama-Nama and inspiration of the sacred Hanumān Cālīsā',
    imageCaptionHi: 'श्री हनुमान जी — रामनाम के परम रक्षक एवं श्री हनुमान चालीसा के प्रेरक',
    imageAlt: 'Shri Hanuman - Supreme Devotion and Bhakti',
    imageFocalPoint: 'center 62%',
    famousWorks: ['Rāmcaritmānas', 'Vinaya Patrikā', 'Hanumān Cālīsā', 'Kavitāvalī', 'Dohāvalī'],
    masterpieceQuote: {
      verse: 'सीय राममय सब जग जानी । करहुँ प्रनाम जोरि जुग पानी ॥',
      translation: 'Knowing that this entire universe is permeated by Sita and Rama together, I offer my humble reverent salutations with folded hands to all beings.',
      translationHi: 'सम्पूर्ण जगत् को श्रीसीताराममय जानकर मैं दोनों हाथ जोड़कर सभी प्राणियों को प्रणाम करता हूँ।',
      work: 'Rāmcaritmānas (Bālakāṇḍa)',
      workHi: 'श्रीरामचरितमानस (बालकाण्ड)'
    },
    keyThemes: ['Cosmic Compassion', 'Rama as Immanent Truth', 'Awadhi Chaupai Meter', 'Spiritual Surrender'],
    keyThemesHi: ['सीयाराममय जगत्', 'मर्यादा पुरुषोत्तम राम', 'शरणागति', 'भक्ति एवं विनय']
  },
  {
    id: 'mirabai',
    name: 'Mīrābāī',
    sanskritName: 'मीराबाई',
    era: 'Bhakti Movement',
    eraHi: 'भक्ति आन्दोलन (माधुर्य भाव)',
    periodApprox: '1498–1546 CE (Mewar, Rajasthan)',
    periodApproxHi: '१४९८–१५४६ ईस्वी (मेवाड़, राजस्थान)',
    category: 'bhakti',
    regionOrTradition: 'Madhurya Bhakti (Devotion in Divine Romance)',
    regionOrTraditionHi: 'राजस्थानी/ब्रज माधुर्य भाव',
    bio: 'A Rajput princess who fearlessly discarded royal status, defied patriarchal coercion, and wandered as a mendicant singer in ecstasy of Lord Krishna (Girdhar Gopal). Her bhajans are world-renowned for their raw lyrical intensity and ecstatic intimacy.',
    bioHi: 'मेवाड़ की राजवधू जिन्होंने राजमहलों का वैभव त्यागकर गिरिधर गोपाल की भक्ति में स्वयं को समर्पित कर दिया। इनके पदों में विरह की उत्कट वेदना और दिव्य समर्पण का अद्भुत माधुर्य है।',
    famousWorks: ['Mīrābāī Padāvalī', 'Rāga Govinda', 'Gīta Govinda Ṭīkā'],
    masterpieceQuote: {
      verse: 'मेरो तो गिरधर गोपाल दूसरो न कोई । जाके सिर मोर मुकुट मेरो पति सोई ॥',
      translation: 'Mine is only Girdhar Gopal, none other! He upon whose head rests the peacock crown—He alone is my Lord and beloved.',
      translationHi: 'मेरे तो केवल गिरिधर गोपाल हैं, दूसरा कोई नहीं! जिनके शीश पर मोर का मुकुट शोभायमान है, वही मेरे स्वामी हैं।',
      work: 'Padāvalī',
      workHi: 'मीरा पदावली'
    },
    keyThemes: ['Madhurya Bhava', 'Courageous Non-Conformity', 'Ecstatic Devotion', 'Lyrical Intimacy'],
    keyThemesHi: ['माधुर्य भक्ति', 'अगाध विरह', 'गिरिधर गोपाल', 'अनन्य समर्पण']
  },
  {
    id: 'tagore',
    name: 'Rabindranath Tagore',
    sanskritName: 'रबीन्द्रनाथ ठाकुर (कविगुरु)',
    era: 'Modern Renaissance Era',
    eraHi: 'आधुनिक नवजागरण युग',
    periodApprox: '1861–1941 CE (Bengal / Santiniketan)',
    periodApproxHi: '१८६१–१९४१ ईस्वी (बंगाल/शान्तिनिकेतन)',
    category: 'modern',
    regionOrTradition: 'Visva-Bharati / Bengal Renaissance',
    regionOrTraditionHi: 'विश्वभारती एवं भारतीय नवजागरण',
    bio: 'The Nobel Laureate in Literature (1913) who reshaped Bengali and Indian aesthetics. Poetically synthesizing ancient Upanishadic monism with modern humanism, internationalism, and mystic reverence for nature and art.',
    bioHi: 'साहित्य के प्रथम एशियाई नोबेल पुरस्कार विजेता (१९१३)। इन्होंने उपनिषदों के अद्वैत दर्शन को आधुनिक मानवतावाद, प्रकृति-प्रेम और विश्व-बन्धुत्व के साथ समन्वित कर विश्व साहित्य को गीताञ्जलि जैसी कालजयी कृति दी।',
    famousWorks: ['Gītāñjali (Song Offerings)', 'The Post Office', 'Kabuliwala', 'Gora', 'Sonar Tari'],
    masterpieceQuote: {
      verse: 'चित्त येथा भयशून्य, उच्च येथा शिर, ज्ञान येथा मुक्त... सेइ स्वर्गे, पिता, मोर देशेरे जागराओ ॥',
      translation: 'Where the mind is without fear and the head is held high; where knowledge is free; into that heaven of freedom, my Father, let my country awake.',
      translationHi: 'जहाँ मन भयमुक्त हो और मस्तक गर्व से ऊँचा रहे; जहाँ ज्ञान सब के लिए उन्मुक्त हो; हे परमपिता! उसी स्वाधीनता के स्वर्ग में मेरे देश को जाग्रत करो।',
      work: 'Gītāñjali (Song 35)',
      workHi: 'गीताञ्जलि (गीत ३५)'
    },
    keyThemes: ['Universal Humanism', 'Upanishadic Resonance', 'Mystic Lyricism', 'Freedom of Mind'],
    keyThemesHi: ['विश्वमानवतावाद', 'उपनिषद् दर्शन', 'प्रकृति-प्रेम', 'स्वाधीन चेतना']
  },
  {
    id: 'dinkar',
    name: 'Ramdhāri Singh \'Dinkar\'',
    sanskritName: 'रामधारी सिंह \'दिनकर\' (राष्ट्रकवि)',
    era: 'Modern National Era',
    eraHi: 'आधुनिक राष्ट्रीय काव्यधारा (वीर रस)',
    periodApprox: '1908–1974 CE (Bihar)',
    periodApproxHi: '१९०८–१९७४ ईस्वी (बिहार)',
    category: 'modern',
    regionOrTradition: 'Veer Rasa / Chhayavad / Rashtrakavi',
    regionOrTraditionHi: 'वीर रस एवं ओजस्वी राष्ट्रकवि',
    bio: 'Honored as the Rashtrakavi (National Poet) of India. His blazing masterpiece Rashmirathi examines the tragic dignity of Karna and Sri Krishna\'s cosmic peace mission, capturing the heroic courage (Veer Rasa) and moral soul of India.',
    bioHi: 'भारत के राष्ट्रकवि। इनकी कालजयी कृति \'रश्मिरथी\' कर्ण के स्वाभिमान और श्रीकृष्ण की शान्ति-चेतावनी का ज्वलन्त आख्यान है, जो भारतीय शौर्य, ओज और न्यायबोध का अमर प्रतीक है।',
    famousWorks: ['Raśmiraṭhī', 'Urvaśī (Jnanpith Award)', 'Kurukṣetra', 'Hunkār'],
    masterpieceQuote: {
      verse: 'वर्षों तक वन में घूम-घूम, बाधा-विघ्नों को चूम-चूम... जब नाश मनुज पर छाता है, पहले विवेक मर जाता है ॥',
      translation: 'When impending doom gathers over humankind, it is wisdom and discernment that perish first! Krishna then revealed His cosmic form: "Behold, the universe is contained within Me!"',
      translationHi: 'जब नाश मनुज पर छाता है, पहले विवेक मर जाता है! दुर्योधन ने कृष्ण को बाँधने का हठ किया, तब प्रभु ने हुंकार भरी: "हाँ-हाँ, दुर्योधन! बाँध मुझे!"',
      work: 'Raśmiraṭhī (Krishna Ki Cetāvanī)',
      workHi: 'रश्मिरथी (तृतीय सर्ग)'
    },
    keyThemes: ['Veer Rasa (Heroic Fire)', 'Moral Discernment (Viveka)', 'Karna\'s Solitary Dignity', 'Cosmic Form'],
    keyThemesHi: ['वीर रस एवं शौर्य', 'विवेक एवं धर्म', 'कर्ण का त्याग', 'विराट् रूप']
  }
];

export const POETS_SHLOKAS: Shloka[] = [
  {
    id: 'shankara-nirvana-shatkam-1',
    source: 'Nirvāṇa Ṣaṭkam',
    sourceCategory: 'classical',
    chapterOrHymn: 'Verse 1',
    chapterOrHymnHi: 'श्लोक १',
    authorOrRishi: 'Ādi Śaṅkarācārya',
    authorOrRishiHi: 'आदि शङ्कराचार्य',
    title: 'Mano-Buddhy-Ahaṅkāra — The Pure Consciousness (Cidānandarūpaḥ)',
    titleHi: 'मनोबुद्ध्यहङ्कार — चिदानन्दरूपः शिवोऽहम् (परम चैतन्य)',
    devanagari: [
      'मनोबुद्ध्यहङ्कार चित्तानि नाहं न च श्रोत्रजिह्वे न च घ्राणनेत्रे ।',
      'न च व्योम भूमिर्न तेजो न वायुश्चिदानन्दरूपः शिवोऽहं शिवोऽहम् ॥ १ ॥'
    ],
    iast: [
      'mano-buddhy-ahaṅkāra cittāni nāhaṃ na ca śrotra-jihve na ca ghrāṇa-netre |',
      'na ca vyoma bhūmir na tejo na vāyuś cid-ānanda-rūpaḥ śivo \'ham śivo \'ham || 1 ||'
    ],
    metre: 'Bhujangaprayata (4 × 12 syllables)',
    metreHi: 'भुजङ्गप्रयात छन्द',
    anvaya: [
      { word: 'manaḥ buddhiḥ ahaṅkāraḥ cittāni na aham', meaning: 'I am not the mind, intellect, ego, or memory', meaningHi: 'मैं न मन हूँ, न बुद्धि, न अहङ्कार और न चित्त' },
      { word: 'na ca śrotra-jihve na ca ghrāṇa-netre', meaning: 'nor am I ears, tongue, nose, or eyes', meaningHi: 'न मैं कान, जीभ, नासिका अथवा नेत्र हूँ' },
      { word: 'na ca vyoma bhūmiḥ na tejaḥ na vāyuḥ', meaning: 'neither space, nor earth, fire, or air', meaningHi: 'न मैं आकाश, पृथ्वी, अग्नि अथवा वायु हूँ' },
      { word: 'cid-ānanda-rūpaḥ śivaḥ aham śivaḥ aham', meaning: 'I am the form of Pure Consciousness and Bliss: I am Shiva!', meaningHi: 'मैं केवल ज्ञान और आनन्द स्वरूप शिव हूँ, मैं ही शिव हूँ!' }
    ],
    translation: 'I am not the mind, intellect, ego, or memory; I am not the ears, tongue, nose, or eyes; I am not space, earth, fire, or wind. I am the form of Pure Consciousness and Eternal Bliss: I am Shiva, I am Shiva!',
    translationHi: 'मैं न मन हूँ, न बुद्धि, न अहङ्कार और न चित्त; न कान, न जीभ, न नाक और न आँखें; न आकाश, न पृथ्वी, न अग्नि और न वायु। मैं तो सच्चिदानन्द स्वरूप शिव हूँ, मैं ही शिव हूँ!',
    philosophicalContext: 'Composed when young Shankara met his master Govinda Bhagavatpada on the banks of the Narmada river. Asked "Who are you?", the boy spontaneously chanted this six-verse masterpiece of Neti-Neti (Not this, Not this), establishing that the true identity of every human being is non-dual divine Awareness.',
    philosophicalContextHi: 'जब आचार्य शङ्कर नर्मदा तट पर गुरु गोविन्द भगवत्पाद से मिले और गुरु ने पूछा—"तुम कौन हो?", तब बालक शङ्कर ने यह अमर निर्वाणषट्कम् रचा। यह \'नेति-नेति\' (यह नहीं, यह नहीं) के द्वारा यह सिद्ध करता है कि हमारी वास्तविक पहचान देह नहीं, नित्यमुक्त शिव-चैतन्य है।',
    tags: ['Nirvana Shatakam', 'Adi Shankara', 'Shivoham', 'Advaita', 'Neti Neti'],
    audioChantType: 'Meditative Sloka'
  },
  {
    id: 'kalidasa-meghaduta-cloud',
    source: 'Meghadūta',
    sourceCategory: 'classical',
    chapterOrHymn: 'Purvamegha, Verse 2',
    chapterOrHymnHi: 'पूर्वमेघ, श्लोक २',
    authorOrRishi: 'Mahākavi Kālidāsa',
    authorOrRishiHi: 'महाकवि कालिदास',
    title: 'The Cloud as Messenger — Kālidāsa\'s Sublime Lyricism',
    titleHi: 'आषाढस्य प्रथमदिवसे — मेघ का दूत बनना',
    devanagari: [
      'तस्मिन्नद्रौ कतिचिदबलाविप्रयुक्तः स कामी नीत्वा मासान्कनकवलयभ्रंशरिक्तप्रकोष्ठः ।',
      'आषाढस्य प्रथमदिवसे मेघमाश्लिष्टसानुं वप्रक्रीडापरिणतगजप्रेक्षणीयं ददर्श ॥ २ ॥'
    ],
    iast: [
      'tasminn adrau katicid abalā-viprayuktaḥ sa kāmī nītvā māsān kanaka-valaya-bhraṃśa-rikta-prakoṣṭhaḥ |',
      'āṣāḍhasya prathama-divase megham āśliṣṭa-sānuṃ vapra-krīḍā-pariṇata-gaja-prekṣaṇīyaṃ dadarśa || 2 ||'
    ],
    metre: 'Mandākrāntā (17 syllables: slow, stately, melancholy)',
    metreHi: 'मन्दाक्रान्ता छन्द (१७ वर्ण)',
    anvaya: [
      { word: 'tasmin adrau', meaning: 'upon that sacred mountain of Ramagiri', meaningHi: 'उस रामगिरि पर्वत पर' },
      { word: 'katicid māsān nītvā', meaning: 'having spent several agonizing months', meaningHi: 'विरह के कई मास व्यतीत कर' },
      { word: 'kanaka-valaya-bhraṃśa-rikta-prakoṣṭhaḥ', meaning: 'wrist empty as gold bracelet slipped off', meaningHi: 'कृश हो जाने से जिसके हाथ का सुवर्ण-कङ्कण खिसक गया था' },
      { word: 'āṣāḍhasya prathama-divase', meaning: 'on the first day of the monsoon month of Ashadha', meaningHi: 'आषाढ़ मास के प्रथम दिन' },
      { word: 'megham dadarśa', meaning: 'he beheld a rain-cloud', meaningHi: 'पर्वत-शिखर से चिपके हुए मेघ को देखा' },
      { word: 'vapra-krīḍā-gaja-prekṣaṇīyam', meaning: 'resembling a playful elephant against an embankment', meaningHi: 'जो टीले पर क्रीड़ा करते गजराज के समान दर्शनीय लग रहा था' }
    ],
    translation: 'Separated from his beloved upon that mountain, his golden bracelet slipping from his wasted wrist with grief, on the first day of Ashadha he beheld a dark rain-cloud embracing the peak, magnificent as an elephant bent in playful combat against an earthen bank.',
    translationHi: 'उस रामगिरि पर्वत पर अपनी प्रियतमा से बिछुड़े हुए, विरह में कृश होने के कारण कलाई से सोने का कङ्कण खिसक जाने वाले उस यक्ष ने आषाढ़ मास के पहले दिन पर्वत-शिखर से लिपटे हुए मेघ को देखा, जो किसी टीले पर क्रीड़ा करते हुए हाथी के समान दर्शनीय था।',
    philosophicalContext: 'Widely celebrated as one of the most sublime romantic openings in global literature. Kalidasa invented the Dūtakāvya (messenger-poem) genre, where human emotion, monsoon weather, and Indian geography fuse into aesthetic ecstasy (Rasa).',
    philosophicalContextHi: 'विश्व साहित्य की सर्वाधिक उत्कृष्ट विप्रलम्भ शृङ्गारिक रचना। कालिदास ने \'दूतकाव्य\' विधा को जन्म दिया, जिसमें मेघ के मार्ग द्वारा सम्पूर्ण आर्यावर्त की प्रकृति, तीर्थों और लोक-जीवन का सजीव दर्शन कराया गया है।',
    tags: ['Kalidasa', 'Meghaduta', 'Mandakranta', 'Sanskrit Poetry', 'Rasa'],
    audioChantType: 'Meditative Sloka'
  },
  {
    id: 'kabir-doha-prema',
    source: 'Kabīr Sākhī',
    sourceCategory: 'bhakti',
    chapterOrHymn: 'Sākhī 12',
    chapterOrHymnHi: 'साखी १२',
    authorOrRishi: 'Sant Kabīr',
    authorOrRishiHi: 'सन्त कबीरदास',
    title: 'Pothi Padhi Padhi Jag Mua — The Two-and-a-Half Letters of Love',
    titleHi: 'पोथी पढ़ि पढ़ि जग मुआ — ढाई आखर प्रेम का',
    devanagari: [
      'पोथी पढ़ि पढ़ि जग मुआ, पंडित भया न कोय ।',
      'ढाई आखर प्रेम का, पढ़े सो पंडित होय ॥'
    ],
    iast: [
      'pothī paḍhi paḍhi jaga muā, paṃḍita bhayā na koya |',
      'ḍhāī ākhara prema kā, paḍhe so paṃḍita hoya ||'
    ],
    metre: 'Dohā (13 + 11 mātrās)',
    metreHi: 'दोहा छन्द (१३ + ११ मात्राएँ)',
    anvaya: [
      { word: 'pothī paḍhi paḍhi jaga muā', meaning: 'reading heavy books again and again the world passed away', meaningHi: 'मोटे-मोटे ग्रन्थ पढ़-पढ़कर संसार मृत्यु को प्राप्त हो गया' },
      { word: 'paṃḍita bhayā na koya', meaning: 'yet none became truly enlightened', meaningHi: 'परन्तु कोई सच्चा ज्ञानी नहीं बन सका' },
      { word: 'ḍhāī ākhara prema kā', meaning: 'the two and a half letters of Love', meaningHi: 'प्रेम के ढाई अक्षर को' },
      { word: 'paḍhe so paṃḍita hoya', meaning: 'whosoever realizes this alone is the true scholar', meaningHi: 'जो अपने जीवन में उतार ले, वही सच्चा पण्डित है' }
    ],
    translation: 'Reading heavy scriptures again and again, the whole world died, yet none became truly enlightened. But whoever realizes the two-and-a-half letters of Love (Prem)—that one alone is truly wise.',
    translationHi: 'बड़े-बड़े ग्रन्थ और शास्त्र पढ़ते-पढ़ते संसार के अनगिनत लोग मृत्यु को प्राप्त हो गए, किन्तु कोई वास्तविक पण्डित (ज्ञानी) नहीं बन सका। जो व्यक्ति प्रेम के केवल ढाई अक्षरों को अपने जीवन में धारण कर लेता है, वही सच्चा ज्ञानी है।',
    philosophicalContext: 'Kabir strikes at empty pedantry and intellectual posturing. True spiritual knowing is not intellectual accumulation of dogmas; it is heart-surrender to the divine mystery in every living soul.',
    philosophicalContextHi: 'कबीर बाह्य पाण्डित्य और किताबी ज्ञान की व्यर्थता पर चोट करते हैं। ब्रह्म कोई बौद्धिक बहस का विषय नहीं है, वह तो प्राणिमात्र के प्रति अनन्त करुणा और विशुद्ध प्रेम का साक्षात् रूप है।',
    tags: ['Kabir', 'Love', 'Prem', 'Bhakti', 'Simplicity'],
    audioChantType: 'Bhakti Bhajan'
  },
  {
    id: 'tagore-where-mind-is-free',
    source: 'Gītāñjali',
    sourceCategory: 'modern',
    chapterOrHymn: 'Song 35',
    chapterOrHymnHi: 'गीत ३५',
    authorOrRishi: 'Rabindranath Tagore',
    authorOrRishiHi: 'रबीन्द्रनाथ ठाकुर',
    title: 'Where the Mind is Without Fear — Tagore\'s Prayer for Humanity',
    titleHi: 'जहाँ चित्त भय-शून्य हो — विश्वमानव के लिए प्रार्थना',
    devanagari: [
      'चित्त येथा भयशून्य, उच्च येथा शिर, ज्ञान येथा मुक्त,',
      'येथा गृह्रे प्राचीर दिये देशरे खण्ड खण्ड करिया राखेनाइ...',
      'येथा विचार निर्मल स्रोतेर मतो चले, सेइ स्वर्गे मोरा देशेरे जागराओ ॥'
    ],
    iast: [
      'citta yethā bhayaśūnya, ucca yethā śira, jñāna yethā mukta |',
      'yethā gṛher prācīra diye deśere khaṇḍa khaṇḍa kariyā rākhenāi... |',
      'yethā vicāra nirmala srotera mato cale, sei svarge morā deśere jāgarāo ||'
    ],
    metre: 'Free Verse / Bengali Payar Evolution',
    metreHi: 'पयर आधारित आधुनिक मुक्तक',
    anvaya: [
      { word: 'citta bhayaśūnya', meaning: 'the mind fearless', meaningHi: 'जहाँ मन भय से मुक्त हो' },
      { word: 'ucca śira', meaning: 'head held high with dignity', meaningHi: 'मस्तक स्वाभिमान से ऊँचा रहे' },
      { word: 'jñāna mukta', meaning: 'knowledge free and accessible', meaningHi: 'जहाँ ज्ञान पर किसी का प्रतिबन्ध न हो' },
      { word: 'vicāra nirmala srota', meaning: 'stream of clear unclouded reason', meaningHi: 'जहाँ विचार की धारा रूढ़ियों में न सूखकर निर्मल बहे' },
      { word: 'sei svarge jāgarāo', meaning: 'into that heaven of freedom, awake my country', meaningHi: 'उसी स्वाधीनता के स्वर्ग में मेरे देश को जाग्रत करो' }
    ],
    translation: 'Where the mind is without fear and the head is held high; where knowledge is free; where the world has not been broken up into fragments by narrow domestic walls; where words come out from the depth of truth... into that heaven of freedom, my Father, let my country awake.',
    translationHi: 'जहाँ चित्त भयशून्य हो और मस्तक सदैव ऊँचा रहे; जहाँ ज्ञान पर कोई बन्धन न हो; जहाँ संकीर्ण घरेलू दीवारों से संसार टुकड़े-टुकड़े न बँटा हो; जहाँ शब्द सत्य के अन्तस्तल से फूटते हों... हे परमपिता! उसी स्वाधीनता के स्वर्ग में मेरे देश को जाग्रत करो।',
    philosophicalContext: 'A modern Upanishad written in the fires of India\'s anti-colonial awakening. Tagore conceives freedom not merely as political independence, but as the liberation of human consciousness from prejudice, fear, tribalism, and superstition.',
    philosophicalContextHi: 'भारतीय नवजागरण का आधुनिक उपनिषद्। टैगोर यहाँ केवल राजनीतिक स्वाधीनता की बात नहीं कर रहे, अपितु मानव चेतना की उस मुक्ति की प्रार्थना कर रहे हैं जो अन्धविश्वास, संकीर्णता और भय से ऊपर उठकर विश्व-मानवता में लीन हो सके।',
    tags: ['Tagore', 'Gitanjali', 'Freedom', 'Humanism', 'Courage'],
    audioChantType: 'Meditative Sloka'
  },
  {
    id: 'dinkar-krishna-chetavani',
    source: 'Raśmiraṭhī',
    sourceCategory: 'modern',
    chapterOrHymn: 'Canto 3 (Krishna Ki Cetāvanī)',
    chapterOrHymnHi: 'तृतीय सर्ग (कृष्ण की चेतावनी)',
    authorOrRishi: 'Ramdhāri Singh \'Dinkar\'',
    authorOrRishiHi: 'रामधारी सिंह \'दिनकर\'',
    title: 'Hit-Vachan Nahin Tune Mana — Sri Krishna\'s Divine Warning',
    titleHi: 'हित-वचन नहीं तूने माना — भगवान् श्रीकृष्ण की दिव्य चेतावनी',
    devanagari: [
      'हित-वचन नहीं तूने माना, मैत्री का मूल्य न पहचाना,',
      'तो ले, मैं भी अब जाता हूँ, अन्तिम संकल्प सुनाता हूँ।',
      'याचना नहीं, अब रण होगा, जीवन-जय या कि मरण होगा ॥'
    ],
    iast: [
      'hita-vacana nahīṃ tūne mānā, maitrī kā mūlya na pahacānā |',
      'to le, maiṃ bhī aba jātā hūṃ, antima saṅkalpa sunātā hūṃ |',
      'yācanā nahīṃ, aba raṇa hogā, jīvana-jaya yā ki maraṇa hogā ||'
    ],
    metre: 'Hindi Viraha / Rann-Gita Chhanda (Blazing Veer Rasa)',
    metreHi: 'वीर रस छन्द',
    anvaya: [
      { word: 'hita-vacana nahīṃ mānā', meaning: 'you refused words of welfare', meaningHi: 'तूने कल्याणकारी वचनों को नहीं माना' },
      { word: 'maitrī kā mūlya na pahacānā', meaning: 'failed to honor friendship', meaningHi: 'मित्रता के मूल्य को नहीं समझा' },
      { word: 'antima saṅkalpa sunātā hūṃ', meaning: 'hear then my final resolve', meaningHi: 'अतः मेरा अन्तिम संकल्प सुन ले' },
      { word: 'yācanā nahīṃ aba raṇa hogā', meaning: 'no more pleading, now there shall be war', meaningHi: 'अब कोई याचना नहीं होगी, अब महायुद्ध होगा' },
      { word: 'jīvana-jaya yā ki maraṇa hogā', meaning: 'triumph of life or total death', meaningHi: 'या तो धर्म का जीवन-विजय होगा अथवा महाविनाश' }
    ],
    translation: 'You heeded not the words of peace; you recognized not the sacred value of friendship! So be it—I depart now, but hear my final proclamation: No more petitions, no more pleading—now there shall be war! A fight unto life\'s triumph or total destruction!',
    translationHi: 'तूने शान्ति और कल्याण के वचनों को नहीं माना, मित्रता के पवित्र मूल्य को नहीं पहचाना! तो ले, अब मैं भी लौटता हूँ और अपना अन्तिम संकल्प सुनाता हूँ: अब कोई याचना नहीं होगी, अब केवल रण होगा—या तो सत्य की विजय होगी अथवा महाविनाश!',
    philosophicalContext: 'One of the most fiery poems in modern Hindi literature. Dinkar depicts Sri Krishna attempting to avert world war at Duryodhana\'s court. When Duryodhana attempts to chain Krishna, the Lord reveals His Visvarupa (Universal Cosmic Form). It stands as a timeless warning against hubris, egoism, and the silencing of conscience.',
    philosophicalContextHi: 'आधुनिक हिन्दी साहित्य की सर्वाधिक ओजस्वी और रोमाञ्चक कविता। दुर्योधन की सभा में पाण्डवों के दूत बनकर गए श्रीकृष्ण द्वारा युद्ध टालने के प्रयास और दुर्योधन द्वारा उन्हें बन्दी बनाने की मूर्खता पर प्रकट विराट् रूप का यह अमर उद्घोष है।',
    tags: ['Dinkar', 'Rashmirathi', 'Veer Rasa', 'Krishna', 'Courage'],
    audioChantType: 'Meditative Sloka'
  }
];

export const ALL_CANON_SHLOKAS: Shloka[] = [
  ...POETS_SHLOKAS
];
