/**
 * Bible History study series.
 *
 * Structured as eras -> modules so the series can expand indefinitely
 * under the same "Bible History" umbrella. Each module studies an
 * original historical document alongside original commentary and a
 * timeline drawn from the document itself.
 *
 * Content for the Didache module is based on the actual Didache PDF
 * hosted at /public/didache.pdf (Saint Ignatius Orthodox Press edition).
 */

export interface HistoryStudySection {
  heading: string;
  body: string;
}

export interface HistoryKeyPoint {
  title: string;
  body: string;
}

export interface HistoryTimelineEntry {
  label: string;
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
  /** A timeline built from the document's own contents and context. */
  timeline?: HistoryTimelineEntry[];
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
    subtitle: 'The first generations of believers, from the apostles to the councils',
    description:
      'This series opens with the earliest Christian communities — the people who first received the apostles\u2019 teaching and worked out, in real time, how to worship, lead, and live as followers of Jesus. Each module takes a primary document from the period as its anchor and builds a study around what that document actually says.',
    dateRange: 'First to seventh century',
    modules: [
      {
        id: 'didache',
        number: 101,
        title: 'The Didache',
        tagline: 'A first-century manual for Christian living',
        description:
          'The Didache \u2014 Greek for \u201cteaching\u201d \u2014 is a short early Christian text that lays out, in plain language, how a community should live, worship, and order itself. This module walks through the document section by section, using the text itself as the source.',
        dateRange: 'First or early second century',
        documentUrl: '/didache.pdf',
        documentLabel: 'Read the Didache (PDF)',
        complete: true,
        sections: [
          {
            heading: 'What this text is',
            body: 'The Didache (pronounced did-a-key) carries the full title \u201cThe Teaching of the Twelve Apostles.\u201d It is not a letter or a story but a manual \u2014 a catechism for new converts and a guide for a community that is figuring out its practices. Most scholars place its writing in the first or early second century, which makes it one of the very earliest Christian writings outside the New Testament. As the introduction to this edition notes, it was held in such high regard that before the New Testament canon was formally settled, some Bibles even included it. It was then lost for centuries and rediscovered in 1873 by Philotheos Bryennios, the Metropolitan of Nicomedia. Today it sits among the writings known as the Apostolic Fathers \u2014 the second generation of Christian literature.',
          },
          {
            heading: 'The Two Ways',
            body: 'The text opens with a simple framing: \u201cThere are two ways, one of life and one of death, and there is a great difference between the two ways.\u201d The Way of Life begins with the command to love the God who made you and to love your neighbor as yourself, then adds the negative form of the golden rule \u2014 \u201call things you would not want done to you, do not do to another.\u201d From there it expands into concrete instruction: bless those who curse you, pray for your enemies, turn the other cheek, give to everyone who asks without hesitating or complaining. A middle section called \u201cthe Fences\u201d traces how small attitudes give birth to serious sin \u2014 anger leads to murder, lust to promiscuity, greed to theft, complaining to blasphemy. The Way of Death is then read out as a list of what destroys a person and a community: murder, adultery, sorcery, hypocrisy, pride, greed, turning away from the needy. The whole opening is practical, not abstract \u2014 it tells a new believer what to do and what to flee.',
          },
          {
            heading: 'Food, fasting, and prayer',
            body: 'After the Two Ways the manual turns to how a catechumen should live day to day. On food, it gives one firm rule: do not eat meat sacrificed to idols, because that is the worship of dead gods. On fasting, it draws a clear line from surrounding Jewish practice \u2014 \u201cdo not let your fasts fall on the same days as the hypocrites, for they fast on Mondays and Thursdays. Keep your fast on Wednesdays and Fridays.\u201d On prayer, it instructs believers to pray the Lord\u2019s Prayer three times each day, and it gives the text of the prayer in a form very close to Matthew\u2019s Gospel. What stands out is how little is left to invention: the community is handed a shared rhythm of fasting and prayer that binds them together.',
          },
          {
            heading: 'Baptism',
            body: 'The baptism instruction is brief but remarkably specific. The preferred setting is running (\u201cliving\u201d) water, in the Name of the Father, Son, and Holy Spirit. If running water is unavailable, other water will do. If cold water is not possible, use warm. And if none of that is available, pour water on the head three times in the same Trinitarian Name. Before the baptism, both the baptizer and the catechumen \u2014 along with any others who are able \u2014 are to fast, with the catechumen fasting a day or two in advance. The flexibility is striking: the form matters, but the availability of water does not prevent the baptism from happening. And the Trinitarian formula is already fixed as the norm.',
          },
          {
            heading: 'The Eucharist',
            body: 'The Eucharist instructions give us one of the earliest glimpses of Christian worship outside the New Testament. Thanksgiving is offered first over the cup \u2014 \u201cWe give you thanks, our Father, for the holy vine of your son David, which you made known to us through your Son Jesus\u201d \u2014 and then over the broken bread, which is compared to the church itself: \u201cAs this broken bread was scattered upon the mountains and being gathered together became one, so may your Church be gathered together from the ends of the earth into your kingdom.\u201d Only the baptized may receive, \u201cfor concerning this the Lord has said, Do not give the holy things to the dogs.\u201d A longer post-communion prayer follows, thanking God for knowledge, faith, and immortality made known through Jesus, and asking that the church be delivered from evil and perfected in love. This is not yet the developed liturgy of later centuries, but the shape of Christian worship is already unmistakably there.',
          },
          {
            heading: 'Apostles, prophets, and local leaders',
            body: 'The final section reveals a community in the middle of a real transition. It instructs believers to welcome traveling teachers and apostles and to honor prophets, but it also builds in safeguards \u2014 a teacher staying more than two days or asking for money is a false prophet, and prophets are to be tested by their conduct. At the same time, the community is told to \u201cappoint for yourselves bishops and deacons\u201d who are worthy of the Lord, because \u201cthey also perform the service of prophets and teachers.\u201d What we are watching is the shift from itinerant, charismatic ministry to settled local leadership. The manual does not resolve the tension; it holds both together. It closes with a short warning about the end times and an exhortation to be ready, \u201cfor the whole time of your faith will not profit you if you are not made perfect in the last time.\u201d',
          },
        ],
        keyPoints: [
          {
            title: 'A manual, not a treatise',
            body: 'The Didache is organized around practice \u2014 how to live, how to fast, how to pray, how to baptize, how to receive the Eucharist, how to receive teachers. It shows Christianity as a shared way of life before it was a system of doctrine.',
          },
          {
            title: 'Scripture woven through',
            body: 'As this edition\u2019s introduction notes, \u201cScripture weaves through the text\u2019s clear and simple teachings.\u201d The manual is saturated in allusions and quotes from the Gospels and the Old Testament, which is why it was so well-loved by the early church.',
          },
          {
            title: 'Trinitarian baptism from the start',
            body: 'Baptism \u201cin the Name of the Father, and of the Son, and of the Holy Spirit\u201d appears here as the established pattern, with flexibility about the water but no flexibility about the Name.',
          },
          {
            title: 'A community in transition',
            body: 'The text holds side by side the traveling apostle and prophet and the settled bishop and deacon. That tension is a snapshot of the moment when local, organized congregations were becoming the norm.',
          },
          {
            title: 'Lost and found',
            body: 'The Didache vanished for centuries and was rediscovered in 1873 by Philotheos Bryennios. Its return gave the modern church a direct window into first-century practice that had been missing from view.',
          },
        ],
        timeline: [
          {
            label: 'First century',
            title: 'The apostolic generation',
            body: 'The apostles teach the first communities. The Didache preserves, in summary form, the kind of practical instruction new converts would have received in this period.',
          },
          {
            label: 'First / early second century',
            title: 'The Didache is written',
            body: 'A community \u2014 likely in Syria or Palestine \u2014 composes a manual that distills the apostles\u2019 teaching into a guide for living, worship, and order. It circulates among the early churches.',
          },
          {
            label: 'Before 692 AD',
            title: 'Included in some Bibles',
            body: 'Before the New Testament canon was formally settled, some Bibles even included the Didache alongside the books that would become the New Testament \u2014 a sign of how highly it was regarded.',
          },
          {
            label: 'Centuries of loss',
            title: 'The text disappears',
            body: 'The Didache falls out of common use and is lost to the wider church for centuries, surviving only in the background of later writers who quote or allude to it.',
          },
          {
            label: '1873',
            title: 'Rediscovered by Bryennios',
            body: 'Philotheos Bryennios, Metropolitan of Nicomedia, rediscovers the text in a monastery library. It is published a few years later and returns to the church\u2019s attention.',
          },
          {
            label: 'Today',
            title: 'Numbered among the Apostolic Fathers',
            body: 'The Didache is now read as one of the second-generation Christian writings known as the Apostolic Fathers \u2014 a practical witness to how the first believers ordered their life together.',
          },
        ],
        reflectivePrompt:
          'The Didache assumes that following Jesus shows up in how you live day to day \u2014 how you give, how you fast, how you pray, how you treat a visitor. Where do you see the gap between what you believe and what your daily practice actually looks like?',
        keyTakeaway:
          'The Didache is a first-century manual that shows us Christianity as a shared way of life: concrete instruction, common rhythms of prayer and fasting, Trinitarian baptism, a thanksgiving meal, and a community learning to lead itself.',
      },
      {
        id: 'polycarp',
        number: 102,
        title: 'Polycarp of Smyrna',
        tagline: 'A bishop who knew the apostles and died for his Lord',
        description:
          'Polycarp was bishop of Smyrna in Asia Minor and, by tradition, a disciple of the apostle John. His own letter to the Philippians and the account of his martyrdom give us a direct link between the apostolic age and the generation that came after. This module will study his writings and the record of his death.',
        dateRange: 'c. 69 \u2013 155 AD',
        complete: false,
        sections: [],
        keyPoints: [],
      },
      {
        id: 'ignatius',
        number: 103,
        title: 'Ignatius of Antioch',
        tagline: 'Letters written on the road to martyrdom',
        description:
          'Ignatius, bishop of Antioch, wrote a series of letters while being escorted to Rome for execution in the early second century. His letters are some of the earliest testimony to a developing understanding of church order, the Eucharist, and the reality of Christ\u2019s humanity and divinity.',
        dateRange: 'c. 35 \u2013 108 AD',
        complete: false,
        sections: [],
        keyPoints: [],
      },
      {
        id: 'justin',
        number: 104,
        title: 'Justin Martyr',
        tagline: 'A philosopher makes the case for Christ',
        description:
          'Justin was a pagan philosopher who converted to Christianity and became its first major apologist. His writings describe a Christian worship service in striking detail and argue, before the emperor himself, that the Christian faith is both reasonable and true.',
        dateRange: 'c. 100 \u2013 165 AD',
        complete: false,
        sections: [],
        keyPoints: [],
      },
      {
        id: 'irenaeus',
        number: 105,
        title: 'Irenaeus of Lyons',
        tagline: 'Defending the faith against the Gnostics',
        description:
          'Irenaeus, bishop of Lyons in Gaul, wrote a massive refutation of Gnostic teaching that threatened to fracture the early church. His work gives us some of the earliest sustained reflection on the unity of Scripture, the rule of faith, and the continuity of apostolic teaching.',
        dateRange: 'c. 130 \u2013 202 AD',
        complete: false,
        sections: [],
        keyPoints: [],
      },
      {
        id: 'tertullian',
        number: 106,
        title: 'Tertullian of Carthage',
        tagline: 'The first great writer in Latin',
        description:
          'Tertullian was a lawyer and thinker in North Africa who became the first major Christian theologian to write in Latin. His apologetic works defended believers before the Roman authorities, and his later writings shaped how the western church would talk about the Trinity and Christ for centuries.',
        dateRange: 'c. 155 \u2013 220 AD',
        complete: false,
        sections: [],
        keyPoints: [],
      },
      {
        id: 'cyprian',
        number: 107,
        title: 'Cyprian of Carthage',
        tagline: 'A bishop shepherds his people through persecution',
        description:
          'Cyprian led the church in Carthage through the empire-wide persecution under the emperor Decius. His letters and treatises work out how to receive back those who had lapsed under pressure, and what it means for the church to be one.',
        dateRange: 'c. 200 \u2013 258 AD',
        complete: false,
        sections: [],
        keyPoints: [],
      },
      {
        id: 'antony',
        number: 108,
        title: 'Antony and the Desert',
        tagline: 'The rise of Christian monasticism',
        description:
          'Antony of Egypt sold what he had and retreated to the desert, where decades of prayer and spiritual combat made him the model of the monk. The life written about him by Athanasius spread quickly and inspired thousands to follow him into the desert.',
        dateRange: 'c. 251 \u2013 356 AD',
        complete: false,
        sections: [],
        keyPoints: [],
      },
      {
        id: 'constantine',
        number: 109,
        title: 'Constantine and the Empire',
        tagline: 'When the persecuted became favored',
        description:
          'Constantine\u2019s embrace of Christianity changed the church\u2019s place in the world almost overnight. This module examines the accounts of his conversion, the edict that ended imperial persecution, and the difficult consequences of imperial favor for a church that had grown up under opposition.',
        dateRange: 'c. 272 \u2013 337 AD',
        complete: false,
        sections: [],
        keyPoints: [],
      },
      {
        id: 'athanasius',
        number: 110,
        title: 'Athanasius and the Incarnation',
        tagline: 'Defending the full divinity of Christ',
        description:
          'Athanasius of Alexandria spent his life \u2014 and endured repeated exile \u2014 defending the claim that the Son of God is truly God. His work On the Incarnation remains one of the clearest explanations of why the Word became flesh and what it means for humanity.',
        dateRange: 'c. 296 \u2013 373 AD',
        complete: false,
        sections: [],
        keyPoints: [],
      },
      {
        id: 'nicea',
        number: 111,
        title: 'The Council of Nicaea',
        tagline: 'A defining moment for Christian confession',
        description:
          'In 325, bishops gathered at Nicaea to settle the dispute over whether the Son was truly God or a created being. The creed they produced confessed the Son as \u201cof one being with the Father\u201d \u2014 language that has shaped Christian orthodoxy ever since.',
        dateRange: '325 AD',
        complete: false,
        sections: [],
        keyPoints: [],
      },
      {
        id: 'augustine',
        number: 112,
        title: 'Augustine of Hippo',
        tagline: 'The bishop who reshaped the western mind',
        description:
          'Augustine is perhaps the most influential Christian thinker after the apostles. His Confessions, his work on the Trinity, and his writing on grace and the city of God shaped both the church and western thought for more than a thousand years.',
        dateRange: '354 \u2013 430 AD',
        complete: false,
        sections: [],
        keyPoints: [],
      },
      {
        id: 'patrick',
        number: 113,
        title: 'Patrick and Ireland',
        tagline: 'A missionary returns to the people who once held him',
        description:
          'Patrick was taken from Britain as a slave and later returned to Ireland as a missionary. His own Confession tells the story in his own words \u2014 one of the few first-person accounts we have from the early medieval church.',
        dateRange: 'c. 385 \u2013 461 AD',
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
    'A study series built around the original documents that shaped the church. Beginning with the Early Church and the Didache, and expanding era by era.',
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
