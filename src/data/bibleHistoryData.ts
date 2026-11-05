/**
 * Bible History study series.
 *
 * Structured as eras -> modules so the series can expand indefinitely
 * under the same "Bible History" umbrella.
 *
 * The first era, "The Forbidden Book," is built around the paper
 * "The Forbidden Book: The Preservation of Scripture, the Struggle
 * for the English Bible, and the Men Who Changed Christian History."
 * The modules follow the paper's chapters in chronological order.
 *
 * The Didache module is based on the actual Didache PDF hosted at
 * /public/didache.pdf (Saint Ignatius Orthodox Press edition).
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
    id: 'forbidden-book',
    title: 'The Forbidden Book',
    subtitle:
      'The preservation of Scripture, the struggle for the English Bible, and the men who changed Christian history',
    description:
      'This series follows the long journey of the Bible from handwritten scrolls to printed books in the hands of ordinary people. It traces the scribes who preserved the text, the scholars who translated it, the reformers who risked everything to get it into the language of the common people, and the men and women who carried it across the Atlantic. Each module is anchored in a chapter from the study paper "The Forbidden Book" and moves in chronological order from the earliest written word to the American Bible.',
    dateRange: 'c. 1400 BC \u2013 1800 AD',
    modules: [
      {
        id: 'bible-before-printing',
        number: 101,
        title: 'The Bible Before the Printing Press',
        tagline: 'How Scripture survived centuries of handwritten copying',
        description:
          'Before the Bible could be printed, bought, or carried, every word had to be written by hand on materials prepared from scratch. This module covers papyrus, parchment, and vellum; the scribes who copied the text; the illuminated manuscripts; and the work of Moses, Ezra, and the Masoretes in preserving the written word.',
        dateRange: 'c. 1400 BC \u2013 15th century AD',
        complete: true,
        sections: [
          {
            heading: 'The beginning of a written legacy',
            body: 'The word Bible comes from the Greek word biblia, meaning books. Its history is connected to biblos, a term associated with papyrus, one of the earliest materials used for writing. Papyrus was made from a plant that grew along the Nile River in Egypt. Workers cut the plant\u2019s inner stalk into thin strips, arranged them in overlapping layers, pressed them together, and allowed them to dry. The finished sheets could then be joined to form scrolls. Biblical writings were also preserved on parchment, made from specially prepared animal skins. A finer type of parchment, called vellum, became especially valuable for books intended to endure. Before printing, producing a Bible required obtaining the materials, preparing the writing surfaces, making the ink, and copying every word by hand. A complete Bible could contain hundreds of carefully prepared pages, and if a mistake was discovered, the scribe had to correct it by hand.',
          },
          {
            heading: 'Moses and the written law',
            body: 'The biblical account of God\u2019s written revelation begins with Israel and the covenant established through Moses. According to Exodus, Moses led the Israelites out of slavery in Egypt and brought them to Mount Sinai, where they received God\u2019s commandments. The Ten Commandments formed a central part of this covenant. The first five books of the Bible \u2014 Genesis, Exodus, Leviticus, Numbers, and Deuteronomy \u2014 became known as the Torah, a Hebrew word commonly translated as instruction or law. They are also called the Pentateuch, a Greek-derived term meaning five books. Jewish and Christian tradition have long associated these five books with Moses, who is repeatedly described within the biblical narrative as recording God\u2019s instructions. Together, these books became the foundation of Israel\u2019s sacred writings.',
          },
          {
            heading: 'Ezra and the return to Scripture',
            body: 'Centuries after Moses, Jerusalem was conquered by the Babylonians, the Temple was destroyed, and many inhabitants of Judah were carried into exile. After the Persian Empire conquered Babylon, groups of Jewish exiles were permitted to return. Among the important figures of this period was Ezra, a priest and scribe whose work centered on the study and teaching of the Law of Moses. Nehemiah chapter 8 records an assembly in which Ezra brought the Book of the Law before the people. Men, women, and others capable of understanding gathered to listen, and the reading was accompanied by explanations so that the people could understand what was being taught. The written law was not simply preserved as an ancient possession \u2014 it was read aloud, explained, and applied to the lives of the people. The Hebrew Scriptures eventually came to be organized into three principal divisions: the Law, the Prophets, and the Writings, together known as the Tanakh.',
          },
          {
            heading: 'From scrolls to books',
            body: 'The codex \u2014 a book consisting of bound leaves rather than a scroll \u2014 gradually replaced the scroll as the preferred format for Christian writings. The change made it easier to find specific passages and to carry a larger collection of texts in a single volume. Some early Bibles were written in plain script for study or worship, while others contained decorated letters, colorful illustrations, and elaborate designs. These illustrated books are known as illuminated manuscripts, and their decoration required additional artists and craftsmen, sometimes extending the work of producing a single volume over many months or years. The preservation of Scripture depended upon this world of handwritten books. Each surviving manuscript represents a connection between the people who first received the biblical writings and the generations who continued to read them.',
          },
          {
            heading: 'The Masoretes and the Hebrew text',
            body: 'The Masoretes were Jewish scribes and scholars who worked to preserve the Hebrew text of the Old Testament with extraordinary care. They developed systems of vowel points and accent marks to ensure the text was read correctly, and they recorded detailed notes about spelling, grammar, and pronunciation. The resulting text, known as the Masoretic Text, became the standard Hebrew Bible and remains the basis for most Old Testament translations today. Their work represents one of the most remarkable efforts of textual preservation in history.',
          },
        ],
        keyPoints: [
          {
            title: 'Every Bible was handwritten',
            body: 'Before printing, each copy of Scripture required someone to prepare the writing surface, make the ink, and copy every word by hand. A complete Bible was a major financial investment, placing it beyond the means of ordinary families.',
          },
          {
            title: 'The Torah as the foundation',
            body: 'The five books of Moses \u2014 Genesis through Deuteronomy \u2014 formed the foundation of Israel\u2019s sacred writings. They established the religious and moral foundations of the community and were read aloud, explained, and applied.',
          },
          {
            title: 'Ezra and public reading',
            body: 'Ezra\u2019s public reading of the Law after the exile shows that Scripture was never meant to be merely preserved \u2014 it was meant to be read, explained, and lived.',
          },
          {
            title: 'The Masoretic Text',
            body: 'The Masoretes preserved the Hebrew text with extraordinary precision, developing vowel systems and notation that ensured the text could be read correctly for generations to come.',
          },
        ],
        timeline: [
          {
            label: 'c. 1400 BC',
            title: 'Moses and the written law',
            body: 'Moses records God\u2019s instructions at Mount Sinai. The Torah \u2014 the first five books \u2014 becomes the foundation of Israel\u2019s sacred writings.',
          },
          {
            label: 'c. 586 BC',
            title: 'The Babylonian exile',
            body: 'Jerusalem is conquered, the Temple is destroyed, and many of the people of Judah are carried into exile. The question of how to preserve their identity and covenant becomes urgent.',
          },
          {
            label: 'c. 458 BC',
            title: 'Ezra and the return to Scripture',
            body: 'After the exile, Ezra the priest and scribe reads the Law publicly and explains it to the people. The written word is restored as the center of the community\u2019s life.',
          },
          {
            label: 'c. 5th century BC \u2013 10th century AD',
            title: 'The Masoretes preserve the Hebrew text',
            body: 'Jewish scribes and scholars develop systems of vowel points and notation to ensure the Hebrew text is preserved and read correctly. The Masoretic Text becomes the standard Hebrew Bible.',
          },
          {
            label: 'Up to the 15th century',
            title: 'The age of handwritten Bibles',
            body: 'For centuries, every Bible is copied by hand on papyrus, parchment, or vellum. Illuminated manuscripts represent some of the most beautiful books ever produced, but also some of the most expensive.',
          },
        ],
        reflectivePrompt:
          'For most of history, owning a Bible was impossible for ordinary people. How does knowing the cost of preserving Scripture change the way you think about having access to it today?',
        keyTakeaway:
          'The Bible survived because scribes, priests, and scholars devoted their lives to copying it by hand \u2014 a labor that made each manuscript precious and each word worth protecting.',
      },
      {
        id: 'didache',
        number: 102,
        title: 'The Didache',
        tagline: 'A first-century manual for Christian living',
        description:
          'The Didache \u2014 Greek for \u201cteaching\u201d \u2014 is a short early Christian text that lays out, in plain language, how a community should live, worship, and order itself. As the Forbidden Book paper notes in its glossary, it is \u201can early Christian manual of teaching and practice.\u201d This module walks through the document section by section, using the text itself as the source.',
        dateRange: 'First or early second century AD',
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
            body: 'The Eucharist instructions give us one of the earliest glimpses of Christian worship outside the New Testament. Thanksgiving is offered first over the cup \u2014 \u201cWe give you thanks, our Father, for the holy vine of your son David, which you made known to us through your Son Jesus\u201d \u2014 and then over the broken bread, which is compared to the church itself: \u201cAs this broken bread was scattered upon the mountains and being gathered together became one, so may your Church be gathered together from the ends of the earth into your kingdom.\u201d Only the baptized may receive. A longer post-communion prayer follows, thanking God for knowledge, faith, and immortality made known through Jesus, and asking that the church be delivered from evil and perfected in love. This is not yet the developed liturgy of later centuries, but the shape of Christian worship is already unmistakably there.',
          },
          {
            heading: 'Apostles, prophets, and local leaders',
            body: 'The final section reveals a community in the middle of a real transition. It instructs believers to welcome traveling teachers and apostles and to honor prophets, but it also builds in safeguards \u2014 a teacher staying more than two days or asking for money is a false prophet, and prophets are to be tested by their conduct. At the same time, the community is told to \u201cappoint for yourselves bishops and deacons\u201d who are worthy of the Lord, because \u201cthey also perform the service of prophets and teachers.\u201d What we are watching is the shift from itinerant, charismatic ministry to settled local leadership. The manual does not resolve the tension; it holds both together. It closes with a short warning about the end times and an exhortation to be ready.',
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
        ],
        timeline: [
          {
            label: 'First century',
            title: 'The apostolic generation',
            body: 'The apostles teach the first communities. The Didache preserves, in summary form, the kind of practical instruction new converts would have received.',
          },
          {
            label: 'First / early second century',
            title: 'The Didache is written',
            body: 'A community composes a manual that distills the apostles\u2019 teaching into a guide for living, worship, and order. It circulates among the early churches.',
          },
          {
            label: 'Before 692 AD',
            title: 'Included in some Bibles',
            body: 'Before the New Testament canon was formally settled, some Bibles even included the Didache alongside the books that would become the New Testament.',
          },
          {
            label: '1873',
            title: 'Rediscovered by Bryennios',
            body: 'Philotheos Bryennios, Metropolitan of Nicomedia, rediscovers the text in a monastery library. It is published a few years later and returns to the church\u2019s attention.',
          },
        ],
        reflectivePrompt:
          'The Didache assumes that following Jesus shows up in how you live day to day \u2014 how you give, how you fast, how you pray, how you treat a visitor. Where do you see the gap between what you believe and what your daily practice actually looks like?',
        keyTakeaway:
          'The Didache is a first-century manual that shows us Christianity as a shared way of life: concrete instruction, common rhythms of prayer and fasting, Trinitarian baptism, a thanksgiving meal, and a community learning to lead itself.',
      },
      {
        id: 'canon-and-vulgate',
        number: 103,
        title: 'The Formation of the Bible and the Latin Vulgate',
        tagline: 'How the twenty-seven books were recognized and the Bible became Latin',
        description:
          'The first Christians did not possess a bound New Testament. Individual writings were copied, carried between communities, read in worship, and evaluated over generations. This module traces how the canon was recognized \u2014 through Origen, Eusebius, Athanasius, and the councils \u2014 and how Jerome\u2019s Latin Vulgate became the principal Bible of Western Christianity for a thousand years.',
        dateRange: 'c. 100 \u2013 400 AD',
        complete: false,
        sections: [],
        keyPoints: [],
      },
      {
        id: 'wycliffe',
        number: 104,
        title: 'John Wycliffe and the First Complete English Bible',
        tagline: 'A scholar challenges the church and translates Scripture into English',
        description:
          'In fourteenth-century England, the Bible was Latin and the common people could not read it. John Wycliffe, an Oxford scholar, argued that Scripture should be available in the language people spoke and pushed for an English Bible. He was opposed, condemned after his death, and his remains were burned \u2014 but the demand for an English Bible could not be stopped.',
        dateRange: 'c. 1320s \u2013 1384',
        complete: false,
        sections: [],
        keyPoints: [],
      },
      {
        id: 'gutenberg-erasmus',
        number: 105,
        title: 'Gutenberg, Erasmus, and the Recovery of Biblical Languages',
        tagline: 'Printing changes everything and Greek returns',
        description:
          'Gutenberg\u2019s printing press transformed how books were made and how ideas spread. Erasmus published the first printed Greek New Testament, giving scholars direct access to the original language of the New Testament for the first time in centuries. Together, these developments set the stage for every translation that followed.',
        dateRange: 'c. 1450 \u2013 1516',
        complete: false,
        sections: [],
        keyPoints: [],
      },
      {
        id: 'bilney',
        number: 106,
        title: 'Thomas Bilney and the Early English Reformation',
        tagline: 'A quiet scholar whose reading of a single verse changed England',
        description:
          'Thomas Bilney was a Cambridge scholar who bought a copy of Erasmus\u2019s Greek New Testament and was struck by a single verse. His conversion, his influence on Hugh Latimer, and his eventual martyrdom represent the quiet beginnings of the English Reformation \u2014 a movement that started not with a hammer on a door but with a reader and a text.',
        dateRange: 'c. 1495 \u2013 1531',
        complete: false,
        sections: [],
        keyPoints: [],
      },
      {
        id: 'tyndale',
        number: 107,
        title: 'William Tyndale: Translation, Persecution, and Martyrdom',
        tagline: 'The man who gave England the Bible from the original languages',
        description:
          'Tyndale set out to translate the New Testament from Greek into English so that, in his words, \u201cthe boy that driveth the plough\u201d might know the Scripture. He was forced to leave England, worked in hiding on the continent, was betrayed, arrested, and executed. His translation became the foundation of nearly every English Bible that followed.',
        dateRange: 'c. 1494 \u2013 1536',
        complete: false,
        sections: [],
        keyPoints: [],
      },
      {
        id: 'geneva-bible',
        number: 108,
        title: 'The Geneva Bible and the Marian Persecutions',
        tagline: 'A Bible for English homes during a time of fire',
        description:
          'When Mary I took the throne and began burning Protestants, English exiles fled to Geneva and produced a new English Bible \u2014 the Geneva Bible. It was the first English Bible translated from the original languages, designed for home reading, and it became the Bible of Shakespeare, the Puritans, and the Pilgrims. John Foxe\u2019s Book of Martyrs recorded the stories of those who died.',
        dateRange: 'c. 1553 \u2013 1560',
        complete: false,
        sections: [],
        keyPoints: [],
      },
      {
        id: 'luther',
        number: 109,
        title: 'Martin Luther and the Protestant Reformation',
        tagline: 'A monk, a door, and a Bible for the German people',
        description:
          'Luther\u2019s challenge to indulgences in 1517 began a Reformation that reshaped the Western church. His discovery of justification by faith through reading the letters of Paul, his translation of the New Testament into German while hidden at Wartburg Castle, and his influence on Tyndale and the spread of vernacular Scripture made him one of the pivotal figures in the history of the Bible.',
        dateRange: 'c. 1483 \u2013 1546',
        complete: false,
        sections: [],
        keyPoints: [],
      },
      {
        id: 'king-james',
        number: 110,
        title: 'The Making of the King James Bible',
        tagline: 'A new king, a divided church, and a translation for the ages',
        description:
          'King James I commissioned a new English translation to unite a divided church. The translators drew heavily on Tyndale\u2019s work and produced a Bible that would shape the English language and the English-speaking world for four centuries. This module examines how it was made, what it inherited from Tyndale, and why it was designed to be free of polemical marginal notes.',
        dateRange: '1604 \u2013 1611',
        complete: false,
        sections: [],
        keyPoints: [],
      },
      {
        id: 'septuagint-apocrypha',
        number: 111,
        title: 'The Septuagint, the Apocrypha, and the Books of the Bible',
        tagline: 'Why different Bibles have different books',
        description:
          'The Old Testament was preserved in both Hebrew and Greek, and different Christian traditions came to different conclusions about which books belonged in the Bible. This module examines the Septuagint, Jerome\u2019s distinction between the Hebrew canon and other books, what was actually printed in the 1611 King James Bible, and how the Apocrypha disappeared from many Protestant editions.',
        dateRange: 'c. 250 BC \u2013 19th century',
        complete: false,
        sections: [],
        keyPoints: [],
      },
      {
        id: 'american-bible',
        number: 112,
        title: 'An English Bible Crosses the Atlantic',
        tagline: 'Printing Scripture in a new nation',
        description:
          'The English Bible crossed the Atlantic with the colonists, but printing Scripture in America faced legal and financial obstacles. Robert Aitken produced the first American English Bible, Bible societies expanded distribution, and the new constitutional order of religious liberty created conditions for the Bible to spread as never before.',
        dateRange: 'c. 1600s \u2013 1800s',
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
    'A study series built around the original documents and historical paper that trace how the Bible was preserved, translated, and carried to the world. Beginning with "The Forbidden Book" and expanding era by era.',
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
