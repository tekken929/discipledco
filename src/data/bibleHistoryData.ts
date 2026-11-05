/**
 * Bible History study series.
 *
 * Structured as eras -> modules so the series can expand indefinitely
 * under the same "Bible History" umbrella. Each module studies an
 * original historical document alongside original commentary.
 *
 * The Early Church era is the first section. The Didache module is
 * fully written; the remaining Early Church modules are scaffolded
 * with titles and descriptions so they are ready to be filled in.
 */

export interface HistoryStudySection {
  heading: string;
  body: string;
}

export interface HistoryKeyPoint {
  title: string;
  body: string;
}

export interface HistoryModule {
  id: string;
  number: number;
  title: string;
  tagline: string;
  description: string;
  dateRange: string;
  /** Optional path to a source document hosted in /public. */
  documentUrl?: string;
  documentLabel?: string;
  sections: HistoryStudySection[];
  keyPoints: HistoryKeyPoint[];
  reflectivePrompt?: string;
  keyTakeaway?: string;
  /** True once the module's content has been fully written. */
  complete: boolean;
}

export interface HistoryEra {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  dateRange: string;
  modules: HistoryModule[];
}

export const bibleHistoryEras: HistoryEra[] = [
  {
    id: 'early-church',
    title: 'The Early Church',
    subtitle: 'The first six hundred years of church history',
    description:
      'The early church was forged in the centuries after the apostles. This section traces how the first Christians worshipped, suffered, debated, and spread — from the first house churches through the conversion of an empire and the councils that shaped Christian belief. Each module studies an original document from the period alongside commentary on its context and meaning.',
    dateRange: 'c. 30 – 600 AD',
    modules: [
      {
        id: 'didache',
        number: 101,
        title: 'The Didache',
        tagline: 'An early church manual instructs in Christian behavior',
        description:
          'The Didache (Greek for "teaching") is one of the earliest Christian documents outside the New Testament — likely written in the first or early second century. It is a short manual of instruction covering the way of life, baptism, the Eucharist, church order, and hospitality. Reading it gives us a window into how the first generations of believers ordered their communities.',
        dateRange: 'c. 50 – 120 AD',
        documentUrl: '/didache.pdf',
        documentLabel: "Read the Didache (PDF)",
        complete: true,
        sections: [
          {
            heading: 'What the Didache Is',
            body: 'The Didache, formally titled "The Teaching of the Lord through the Twelve Apostles to the Gentiles," is a compact instruction manual for Christian communities. It was not written by the apostles, but it claims to preserve their teaching. It was likely composed in Syria or Palestine in the late first or early second century, making it a near-contemporary of some New Testament writings. It was rediscovered in 1873 in a monastery library after being lost for centuries. Its value is immense: it shows us how ordinary believers — not just apostles and theologians — understood and practiced the faith in the very first generations.',
          },
          {
            heading: 'The Two Ways',
            body: 'The Didache opens with the "Two Ways" — the Way of Life and the Way of Death. This framing was common in Jewish wisdom literature and appears elsewhere in early Christian writing. The Way of Life is summarized in the command to love God and love your neighbor, then expanded with practical instructions: bless those who curse you, pray for your enemies, turn the other cheek, give to everyone who asks. The Way of Death is a list of the behaviors that destroy community — murder, adultery, sorcery, greed, hypocrisy. What stands out is how practical and concrete it is. This is not abstract theology. It is a manual for how to live, written for people new to the faith.',
          },
          {
            heading: 'Baptism and the Eucharist',
            body: 'The Didache gives us some of the earliest evidence for how baptism was practiced. It prefers baptism in "living" (running) water, but allows cold water if living water is unavailable, and pouring water over the head three times in the name of the Father, Son, and Holy Spirit if neither is possible. Fasting before baptism is instructed for both the candidate and the one baptizing. The Eucharist instructions are equally revealing. The prayer given thanks first for the cup, then the bread, and calls it "the holy vine of David" and "the bread of life." It is a thanksgiving meal, not yet the developed liturgy of later centuries, but clearly already a central act of worship.',
          },
          {
            heading: 'Church Order and Hospitality',
            body: 'The Didache reveals a church still in transition. It instructs believers to welcome traveling teachers and apostles, but also warns against false ones — a teacher staying more than two days or asking for money is to be regarded with suspicion. Itinerant prophets are honored, but communities are also told to test them. Alongside the traveling ministers, local leaders are emerging: the Didache instructs communities to "appoint for yourselves bishops and deacons" worthy of the Lord. This tension — between charismatic traveling ministers and settled local leadership — marks a real moment in history, when the church was shifting from the era of the apostles to the era of organized local congregations.',
          },
          {
            heading: 'Why It Matters Today',
            body: 'The Didache matters because it shows us Christianity before it became institutional, before the great theologians, before the councils. What you find is strikingly simple and strikingly demanding: love your enemies, give generously, baptize in the name of the Trinity, share a thanksgiving meal, test those who claim spiritual authority, and appoint humble local leaders. It is a reminder that the core of the faith has always been practical obedience to Jesus, lived out in community. For modern readers, it offers a bracing contrast to a comfortable Christianity — and a window into what the first believers thought essential.',
          },
        ],
        keyPoints: [
          {
            title: 'One of the earliest non-biblical Christian texts',
            body: 'Likely written in the late first or early second century, the Didache is a near-contemporary of parts of the New Testament and gives us rare evidence for how the first generations actually practiced the faith.',
          },
          {
            title: 'A practical manual, not a theological treatise',
            body: 'It is organized around instruction for living — the Two Ways, baptism, the Eucharist, hospitality, and church order — rather than doctrinal argument. It shows Christianity as a way of life before it was a system of belief.',
          },
          {
            title: 'A church in transition',
            body: 'The Didache captures the moment when traveling apostles and prophets were giving way to settled local bishops and deacons — a pivotal shift in how the church was organized.',
          },
          {
            title: 'Trinitarian worship from the very beginning',
            body: 'Baptism "in the name of the Father and of the Son and of the Holy Spirit" appears here as established practice, confirming that Trinitarian language shaped worship from the earliest period.',
          },
        ],
        reflectivePrompt:
          'The Didache assumes that knowing Jesus means changing how you live. Where do you see the gap between what you believe and how you actually practice it day to day?',
        keyTakeaway:
          'The Didache shows us a faith that was concrete, communal, and demanding from the very start — obedience to Jesus expressed in daily life, not just in belief.',
      },
      {
        id: 'pliny',
        number: 102,
        title: "Pliny's Letter to Trajan",
        tagline: 'A pagan official asks the emperor how Christians are to be handled',
        description:
          'Around 112 AD, Pliny the Younger, the Roman governor of Bithynia, wrote to the emperor Trajan asking how to deal with the growing number of Christians in his province. His letter and Trajan\'s reply are some of the earliest pagan references to Christianity and reveal how the faith appeared to outsiders — and how dangerous it was simply to be a Christian.',
        dateRange: 'c. 112 AD',
        complete: false,
        sections: [],
        keyPoints: [],
      },
      {
        id: 'polycarp',
        number: 103,
        title: "Polycarp's Martyrdom",
        tagline: 'How a faithful Christian bishop died in flame',
        description:
          'Polycarp was the bishop of Smyrna and a link to the apostolic age — tradition says he was a disciple of the apostle John. Around 155 AD he was arrested and burned alive for refusing to deny Christ. The account of his martyrdom, sent from his church to others, is one of the earliest Christian martyr narratives and shaped how the church understood faithful witness unto death.',
        dateRange: 'c. 155 AD',
        complete: false,
        sections: [],
        keyPoints: [],
      },
      {
        id: 'tertullian',
        number: 104,
        title: "Tertullian's Defense",
        tagline: 'The first theologian of the western church speaks out',
        description:
          'Tertullian (c. 155 – 220 AD) was a lawyer and thinker in Carthage who became the first major theologian to write in Latin. His apologetic writings defended Christians against the rumors and legal persecution of their day, arguing that Christians were loyal citizens whose worship of one God was no threat to Rome.',
        dateRange: 'c. 155 – 220 AD',
        complete: false,
        sections: [],
        keyPoints: [],
      },
      {
        id: 'cyprian',
        number: 105,
        title: 'Cyprian on Church Unity',
        tagline: 'A North African bishop writes on the unity of the church',
        description:
          'Cyprian was bishop of Carthage in the mid-third century and led his church through fierce persecution under the emperor Decius. His writings on church unity — especially the claim that no one can have God as Father who does not have the church as mother — shaped the church\'s understanding of itself for centuries.',
        dateRange: 'c. 200 – 258 AD',
        complete: false,
        sections: [],
        keyPoints: [],
      },
      {
        id: 'antony',
        number: 106,
        title: 'Antony of Egypt',
        tagline: 'A biography of the first notable Christian monk',
        description:
          'Antony (c. 251 – 356 AD) is regarded as the father of Christian monasticism. The biography written by Athanasius tells how he sold his inheritance, retreated to the desert, and spent decades in prayer and spiritual combat. His life inspired thousands to follow him into the desert and reshaped Christian understandings of discipleship.',
        dateRange: 'c. 251 – 356 AD',
        complete: false,
        sections: [],
        keyPoints: [],
      },
      {
        id: 'constantine',
        number: 107,
        title: "Constantine's Vision",
        tagline: "Constantine's conversion had a mighty impact",
        description:
          'Constantine\'s embrace of Christianity before the battle of the Milvian Bridge in 312 AD changed the church from a persecuted minority to a favored religion of empire. This module examines the accounts of his vision, the Edict of Milan, and the lasting consequences of imperial favor for the church.',
        dateRange: 'c. 312 AD',
        complete: false,
        sections: [],
        keyPoints: [],
      },
      {
        id: 'athanasius',
        number: 108,
        title: 'Athanasius on Christ',
        tagline: 'Implications of Christ becoming a man',
        description:
          'Athanasius of Alexandria (c. 296 – 373 AD) defended the full divinity of Christ against the teaching of Arius, even when it cost him repeated exile. His famous work "On the Incarnation" remains one of the clearest explanations of why the Word became flesh and what it means for humanity.',
        dateRange: 'c. 296 – 373 AD',
        complete: false,
        sections: [],
        keyPoints: [],
      },
      {
        id: 'nicea',
        number: 109,
        title: 'Council of Nicea',
        tagline: "The battle over Christ's divinity",
        description:
          'In 325 AD Constantine convened the first ecumenical council at Nicea to settle the dispute over whether the Son was truly God or a created being. The council produced the Nicene Creed, which confessed the Son as "of one being with the Father" — a definition that has shaped Christian orthodoxy ever since.',
        dateRange: '325 AD',
        complete: false,
        sections: [],
        keyPoints: [],
      },
      {
        id: 'augustine',
        number: 110,
        title: "Augustine's Love Sermon",
        tagline: 'A sermon on love — but will you agree with his definition?',
        description:
          'Augustine of Hippo (354 – 430 AD) is perhaps the most influential Christian thinker after the apostles. This module studies one of his sermons on love, exploring how he understood the right ordering of desire and what it means to love God and neighbor rightly.',
        dateRange: 'c. 354 – 430 AD',
        complete: false,
        sections: [],
        keyPoints: [],
      },
      {
        id: 'leo',
        number: 111,
        title: 'Leo Claims Special Role',
        tagline: 'Leo I claims the bishop of Rome is above all other bishops',
        description:
          'Leo the Great (pope 440 – 461 AD) articulated the case for the primacy of the bishop of Rome, grounding it in Christ\'s words to Peter. His Tome, read at the Council of Chalcedon in 451, also shaped the church\'s confession of Christ\'s two natures in one person.',
        dateRange: 'c. 440 – 461 AD',
        complete: false,
        sections: [],
        keyPoints: [],
      },
      {
        id: 'patrick',
        number: 112,
        title: "Patrick's Own Tale",
        tagline: "St. Patrick's confession, a short autobiography",
        description:
          'Patrick (c. 385 – 461 AD) tells his own story in his Confession — kidnapped from Britain, enslaved in Ireland, called back as a missionary to the people who once held him captive. It is one of the few first-person accounts we have from the early medieval church.',
        dateRange: 'c. 385 – 461 AD',
        complete: false,
        sections: [],
        keyPoints: [],
      },
      {
        id: 'gregory',
        number: 113,
        title: 'Gregory I and England',
        tagline: 'How Gregory sent Augustine to convert the English',
        description:
          'Gregory the Great (pope 590 – 604 AD) sent Augustine of Canterbury on a mission to the Anglo-Saxons in 597 AD, an event often dated as the beginning of English Christianity. This module examines Gregory\'s vision for mission and the church he helped build.',
        dateRange: 'c. 590 – 604 AD',
        complete: false,
        sections: [],
        keyPoints: [],
      },
    ],
  },
];

export const bibleHistoryOverview = {
  title: 'Bible History',
  subtitle:
    'A study series tracing the people, documents, and decisions that shaped the church across the centuries. Built to expand, era by era.',
  totalEras: bibleHistoryEras.length,
  totalModules: bibleHistoryEras.reduce((sum, era) => sum + era.modules.length, 0),
};

export function getHistoryEra(eraId: string): HistoryEra | undefined {
  return bibleHistoryEras.find(e => e.id === eraId);
}

export function getHistoryModule(
  eraId: string,
  moduleId: string
): { era: HistoryEra; module: HistoryModule } | undefined {
  const era = getHistoryEra(eraId);
  if (!era) return undefined;
  const module = era.modules.find(m => m.id === moduleId);
  if (!module) return undefined;
  return { era, module };
}
