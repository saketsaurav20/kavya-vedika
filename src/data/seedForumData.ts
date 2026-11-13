import type { ForumThread } from '../types/forum';

export const SEED_FORUM_THREADS: ForumThread[] = [
  {
    id: 'thread-nasadiya-paradox',
    category: 'vedic-exegesis',
    title: 'The Agnostic Sublime in the Nāsadīya Sūkta: Did the Vedic Seers Anticipate Modern Quantum Vacuum?',
    author: 'Acharya Vidyasagar',
    authorAvatar: '🕉️',
    createdAt: '2 days ago',
    content: `When reading Rigveda 10.129 (Nāsadīya Sūkta), one is immediately struck by the phrase: "na asat āsīt no sat āsīt tadānīm" (Neither non-existence was nor existence then).

Most classical world mythologies begin with a God or demiurge creating the world out of nothing or from chaotic matter. But here, the Rishi Prajapati Parameshthin denies even the category of non-being! It points to an unmanifest plenum that precedes binary logic.

Notice the final verse: "He whose eye surveys it in the highest heaven, he verily knows—or perhaps even he knows not!"

How do we reconcile this supreme poetic skepticism with the later Vedantic doctrine of Sarvajnatva (all-knowingness) of Ishvara? Was the Vedic worldview far more experimentally open and poetically audacious than later scholastic systems?`,
    tags: ['Rigveda', 'Nasadiya Sukta', 'Cosmology', 'Philosophy of Science', 'Metaphysics'],
    citation: {
      shlokaId: 'rigveda-nasadiya-1',
      text: 'नास॑दासी॒न्नो सदा॑सीत्त॒दानीं॒ नासी॒द्रजो॒ नो व्यो॑मा प॒रो यत् ।',
      source: 'Rigveda 10.129.1'
    },
    upvotes: 42,
    isPinned: true,
    comments: [
      {
        id: 'c-1',
        author: 'Dr. Maitreyi Sharma',
        authorRole: 'Sanskrit Grammarian',
        createdAt: '1 day ago',
        content: `A profound observation, Acharya! In Yaska\'s Nirukta and later Sayana\'s Bhashya, "asat" is defined as that which has no form or name (namarupa-rahitam), whereas "sat" is manifest differentiated name and form. The Sukta is not denying consciousness; it is saying consciousness was in its unqualified, unperturbed state (anid avatam svadhaya tad ekam - That One breathed breathless by its own impulse). In modern physics, the quantum vacuum is never pure void—it is a seething field of latent zero-point energy!`,
        upvotes: 19
      },
      {
        id: 'c-2',
        author: 'Ramanathan Iyer',
        authorRole: 'Vedic Chanting Practitioner',
        createdAt: '18 hours ago',
        content: `If you listen to the Samhita recitation with Udatta, Anudatta, and Svarita accents, the rhythmic drop on "tadānīm" creates an acoustic silence in the listener. The poetry is not just cognitive; the phonetic cadence itself induces the experience of the Void.`,
        upvotes: 11
      }
    ]
  },
  {
    id: 'thread-mandukya-turiya',
    category: 'upanishadic-advaita',
    title: 'Deconstructing the Four States: Is Turiya a "Fourth" State or the Underlying Ground of all Three?',
    author: 'Swami Bodhatmananda',
    authorAvatar: '🪷',
    createdAt: '3 days ago',
    content: `The Mandukya Upanishad introduces the four quarters (pādas) of the Self:
1. Jāgrat (Waking / Vaishvanara)
2. Svapna (Dreaming / Taijasa)
3. Suṣupti (Deep Sleep / Prajna)
4. Turīya (The Transcendent)

Māṇḍūkya Karika of Gaudapada clarifies that Turiya is called "the fourth" only in ordinal sequence for the sake of human instruction. In reality, Turiya is the non-dual substratum upon which waking, dream, and sleep appear as transient projections (like waves upon the ocean).

Let us discuss: How can one cultivate the awareness of the Witness (Sākṣī) during active work in daily life? Does Shankaracharya\'s Aparokshanubhuti provide the practical bridge?`,
    tags: ['Mandukya', 'Turiya', 'Advaita', 'Consciousness', 'Meditation'],
    citation: {
      shlokaId: 'mandukya-upanishad-om',
      text: 'शान्तं शिवमद्वैतं चतुर्थं मन्यन्ते स आत्मा स विज्ञेयः ॥',
      source: 'Mandukya Upanishad, Verse 7'
    },
    upvotes: 38,
    isPinned: false,
    comments: [
      {
        id: 'c-3',
        author: 'Ananya Deshmukh',
        authorRole: 'Vedanta Student',
        createdAt: '2 days ago',
        content: `Sri Ramana Maharshi frequently emphasized that you don\'t need to "enter" Turiya as if it were a new room. You are Turiya right now! Even as you read this screen, who is the unchanging space in which sensations and thoughts arise and dissolve? That stillness is Turiya.`,
        upvotes: 24
      }
    ]
  },
  {
    id: 'thread-kalidasa-mandakranta',
    category: 'classical-rasa',
    title: 'The Aesthetic Genius of Kālidāsa\'s Mandākrāntā Metre in Meghadūta',
    author: 'Pandit Keshava Shastri',
    authorAvatar: '📜',
    createdAt: '4 days ago',
    content: `Why did Kalidasa choose the Mandākrāntā metre (मन्दाक्रान्ता — literally "she who steps slowly and languidly") for all 111 verses of the Meghadūta?

The metre has 17 syllables divided by two distinct caesuras (Yati):
4 syllables (slow, heavy) + 6 syllables + 7 syllables.

The structural weight of the first four heavy syllables (ma-bha-na-ta-ta-ga-ga) mimics the heavy, pregnant monsoon cloud lumbering across the Vindhya ranges, while mirroring the heavy, sluggish grief of the exiled Yaksha!

Can anyone point to other works where metre so perfectly mirrors the internal Bhava (emotional state) and the external Prakriti (natural world)?`,
    tags: ['Kalidasa', 'Meghaduta', 'Chhandas', 'Mandakranta', 'Rasa Theory'],
    citation: {
      shlokaId: 'kalidasa-meghaduta-cloud',
      text: 'आषाढस्य प्रथमदिवसे मेघमाश्लिष्टसानुं वप्रक्रीडापरिणतगजप्रेक्षणीयं ददर्श ॥',
      source: 'Meghadūta 2'
    },
    upvotes: 29,
    isPinned: false,
    comments: [
      {
        id: 'c-4',
        author: 'Arunav Sengupta',
        authorRole: 'Comparative Literature Scholar',
        createdAt: '3 days ago',
        content: `Look at Bhavabhuti\'s use of the Shardulavikridita metre in Uttararamacharita for Rama\'s ferocious sorrow in the Dandaka forest! But Kalidasa\'s choice is unmatched because the rain-cloud in Indian poetry is both an agent of erotic union and the ultimate tormentor of the separated lover (Vipralambha Shringara).`,
        upvotes: 15
      }
    ]
  },
  {
    id: 'thread-kabir-ulatbansi',
    category: 'bhakti-mysticism',
    title: 'The Mystic Paradox of Kabīr: Ulaṭbāṃsī (Inverted Verses) and the Sahaja State',
    author: 'Suraj Bhan',
    authorAvatar: '🪕',
    createdAt: '5 days ago',
    content: `Kabir often sings in Ulatbansi (upside-down poetry):
"एक अचम्भा देखा रे भाई, ठाढ़ा सिंह चरावै गाई । जल की मछली तरुवर ब्याई, पकरि बिलाई मुरगे खाई ॥"
(A wonder I saw, O brother! The lion stands grazing cows; the fish of the waters gives birth upon the treetop; the cat is seized and swallowed by the rooster!)

At first glance, it sounds like nonsense or absurdism. But in Kundalini yoga and Gorakhnath Nath-panthi terminology, each image is an esoteric key:
- The lion (senses/intellect) normally preys on the cow (the soul). In enlightenment, the intellect serves the soul.
- The fish (mind/vital breath) climbing the tree (Sushumna nadi to Sahasrara).

Let us explore Kabir\'s ability to bridge raw vernacular rustic humor with high tantric and non-dual realization!`,
    tags: ['Kabir', 'Ulatbansi', 'Kundalini', 'Nath Tradition', 'Bhakti'],
    citation: {
      shlokaId: 'kabir-doha-prema',
      text: 'ढाई आखर प्रेम का, पढ़े सो पंडित होय ॥',
      source: 'Kabir Sakhi'
    },
    upvotes: 35,
    isPinned: false,
    comments: [
      {
        id: 'c-5',
        author: 'Sadhvi Gayatri',
        authorRole: 'Spiritual Seeker',
        createdAt: '4 days ago',
        content: `Kabir shakes us out of the habit of literalism! When our conventional conceptual worldview is turned upside down, the rational mind short-circuits. In that silence between two thoughts, the Unnamable (Alakh Niranjan) reveals itself.`,
        upvotes: 17
      }
    ]
  },
  {
    id: 'thread-tagore-upanishads',
    category: 'modern-reflections',
    title: 'Tagore and the Upanishads: How Ancient Forest Sermons Breathed Life into Gitanjali',
    author: 'Debashis Roy',
    authorAvatar: '🖋️',
    createdAt: '6 days ago',
    content: `Many Western critics when reading Tagore\'s Gitanjali saw only Christian mysticism or romantic pantheism (like Wordsworth). But Tagore repeatedly insisted in \'Sadhana: The Realisation of Life\' that his father Maharshi Debendranath Tagore raised him exclusively on the Upanishads.

Consider the line from Taittiriya: "Anandādd hy eva khalv imāni bhūtāni jāyante" (From Delight indeed all beings are born, by Delight they are sustained, and unto Delight they return).

Tagore transforms this metaphysical statement into lyric poetry:
"The same stream of life that runs through my veins night and day runs through the world and dances in rhythmic measures. It is the same life that shoots in joy through the dust of the earth in numberless blades of grass..."

How does modern Indian literature succeed in making Vedic abstraction intimately tender and human?`,
    tags: ['Tagore', 'Gitanjali', 'Taittiriya', 'Ananda', 'Modern Renaissance'],
    citation: {
      shlokaId: 'tagore-where-mind-is-free',
      text: 'Where the mind is without fear and the head is held high...',
      source: 'Gitanjali Song 35'
    },
    upvotes: 31,
    isPinned: false,
    comments: [
      {
        id: 'c-6',
        author: 'Prof. Alok Verma',
        authorRole: 'Literature Department',
        createdAt: '5 days ago',
        content: `Beautifully put! Sri Aurobindo called this "the overhead lyric"—poetry that descends from planes higher than the intellectual mind. Tagore bridged the Vedic forest hermitage with the 20th-century world.`,
        upvotes: 14
      }
    ]
  }
];
