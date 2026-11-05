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
        complete: true,
        sections: [
          {
            heading: 'From the Apostles to the Early Church',
            body: 'By the end of the first century, Christianity had spread beyond Jerusalem into cities throughout the Roman Empire. Christian congregations read the sacred writings inherited from Judaism and shared letters written by apostles and their associates. The four Gospels preserved accounts of the life and teaching of Jesus, while letters addressed questions arising in churches separated by considerable distances. Colossians 4:16 describes an exchange of letters between congregations, providing an early example of how Christian writings circulated. The first Christians did not possess a bound New Testament containing twenty-seven books. Individual writings were copied, carried between communities, read in worship, and evaluated over generations. Some works became widely recognized as authoritative, while others were used for instruction without being included in Scripture. Questions of authorship, connection to the apostles, consistency with received teaching, and longstanding use shaped the discussions. The word canon refers to the collection of writings accepted as Scripture. Its underlying Greek sense is that of a rule or standard. The recognition of the Christian canon was a historical process rather than a single event in which one person produced a complete list and immediately secured universal agreement.',
          },
          {
            heading: 'Origen and the Comparison of Biblical Texts',
            body: 'Origen, who lived approximately from AD 185 to 253, was one of the most prolific scholars of early Christianity. Much of his work was connected to Alexandria in Egypt and later Caesarea. Both cities belonged to a Greek-speaking intellectual world in which Jewish Scriptures, Christian writings, and classical learning could be studied together. His remarkable project, the Hexapla, placed versions of the Old Testament side by side. Its columns included Hebrew and different Greek renderings, making it possible to compare passages rather than depend on one translation alone. The project was enormous, and only portions survive. It nevertheless shows that ancient Christians recognized differences among copies and translations and attempted to investigate them systematically. Origen also referred to books received as Christian Scripture and others whose status was discussed. His surviving writings are evidence for the developing recognition of the New Testament, although they do not establish that the entire canon was formally settled in his lifetime.',
          },
          {
            heading: 'Eusebius and the Books Under Discussion',
            body: 'Eusebius of Caesarea, born around AD 260, lived during a period of persecution and then the dramatic legalization of Christianity under Constantine. His Ecclesiastical History preserved accounts of Christian leaders, writings, disputes, and communities from the earlier centuries. In Book III, chapter 25, Eusebius classified Christian writings according to how they were received. He distinguished widely accepted books from disputed books and from writings regarded as spurious. The Gospels, Acts, and many apostolic letters were firmly established. James, Jude, Second Peter, and Second and Third John were among the writings discussed in connection with disputed reception. Revelation had a particularly complex history of acceptance. These distinctions provide evidence of both continuity and debate. They show that early Christians possessed a substantial common body of writings while some communities continued to examine a smaller number of books.',
          },
          {
            heading: 'Athanasius and the Twenty-Seven Books',
            body: 'Athanasius became bishop of Alexandria in the fourth century and was prominent in disputes over the relationship of Jesus Christ to God the Father. His thirty-ninth Festal Letter, written in AD 367, contains the earliest surviving list that exactly matches the twenty-seven books of the New Testament used by most Christians today. The letter named the four Gospels, Acts, the apostolic letters, and Revelation. Athanasius also distinguished books he recommended for instruction from those he included in the canon. The Didache and the Shepherd of Hermas were among writings known in early Christian circles but not placed in his New Testament list. Athanasius did not compose these books or bring them into existence. His letter is an important record of which writings a leading fourth-century bishop recognized as the canonical New Testament. It was part of a wider process of recognition that continued across different Christian regions.',
          },
          {
            heading: 'Councils and the Recognition of Scripture',
            body: 'As Christian communities grew, bishops met in regional councils to address worship, discipline, doctrine, and the reading of Scripture. The Council of Laodicea, commonly dated to the fourth century, issued regulations concerning church life and biblical reading. A biblical list transmitted as its sixtieth canon has a disputed textual history, so it cannot be treated without qualification as an undisputed original decision of the council. The councils of Hippo in AD 393 and Carthage in AD 397 belong to the history of regional North African discussions of the canon. Their biblical lists are important evidence of the books accepted for reading in those churches. They did not simply exclude all writings later called the Apocrypha; the North African lists included books such as Tobit, Judith, and Maccabees. This distinction becomes significant when comparing later Catholic and Protestant Old Testaments. The New Testament lists associated with these councils correspond to the twenty-seven books familiar today. The Old Testament presented additional complexities because Hebrew and Greek manuscript traditions transmitted collections that were not always identical.',
          },
          {
            heading: 'The Septuagint and the Greek Scriptures',
            body: 'After the conquests of Alexander the Great in the fourth century BC, Greek became a major language across the eastern Mediterranean. Jewish communities living in Greek-speaking cities needed access to their sacred writings in a language they could understand. The translation of the Torah into Greek probably began in Alexandria during the third century BC, and other biblical books were translated over time. These Greek translations became known collectively as the Septuagint, abbreviated LXX. The name reflects an ancient tradition concerning seventy or seventy-two translators. The Septuagint was not produced as one uniform book in a single sitting, and surviving Greek manuscripts reflect a complicated history of translation and collection. Greek Scripture was important to early Christians because the New Testament was written in Greek and many of its biblical quotations reflect Greek textual traditions. Some Greek biblical collections included writings such as Tobit, Judith, Wisdom, Sirach, Baruch, and Maccabees, as well as additions to Esther and Daniel. The precise contents of ancient collections varied. Later Christians used different terms for these books. In Protestant usage, Apocrypha often identifies writings printed separately from the Hebrew-based Old Testament canon. Catholic usage commonly calls several of them deuterocanonical. Eastern Orthodox traditions have their own histories of reception. The differences concern which writings are recognized as Scripture, not whether the writings existed or were read in antiquity.',
          },
          {
            heading: 'Jerome and the Latin Vulgate',
            body: 'By the late fourth century, Latin was central to religious life in the western Roman Empire. Latin translations of Scripture already circulated, but their wording differed among manuscripts and versions. Jerome, born around AD 347, had studied Latin and Greek and acquired Hebrew, giving him unusual access to the languages behind biblical translations. In AD 382, Pope Damasus I asked Jerome to revise the Latin Gospel text. Jerome later undertook further translation and revision, including substantial Old Testament work using Hebrew. The resulting Latin biblical tradition became known as the Vulgate, a name associated with common or widely used language. It was not a single edition issued at one moment, but a textual tradition that developed and circulated over centuries. Jerome discussed the books of the Hebrew Bible in his preface to Samuel and Kings, often called the Prologus Galeatus. He distinguished the Hebrew collection from other books read by Christians. Yet later Latin Bible manuscripts also included writings outside that Hebrew collection, illustrating the difference between a scholar\u2019s classification and the contents of books used in worship and study. Jerome\u2019s Latin work gradually became the principal biblical text of Western Christianity. Monasteries copied it, theologians cited it, and clergy used it in religious education and worship. Latin connected scholars across regions with different spoken languages, but its use also meant that direct reading of the Bible was difficult for people without a Latin education.',
          },
          {
            heading: 'A Changing Language of Worship and Learning',
            body: 'In medieval Europe, the languages spoken in homes and marketplaces gradually developed into English, French, German, and other regional languages. Latin remained the language of much formal education, church administration, and theological writing. Ordinary believers commonly encountered biblical accounts through sermons, public worship, teaching, and religious art rather than through personally reading a complete Latin Bible. This linguistic division helps explain the later demand for vernacular Scripture, meaning translations into the language people spoke every day. The history of English translation did not begin with a sudden discovery of the Bible. It arose from a world in which Scripture was already widely used in religious institutions but access to its written Latin form depended heavily on education.',
          },
        ],
        keyPoints: [
          {
            title: 'The canon was a process, not a single event',
            body: 'The recognition of the Christian canon was a historical process rather than a single event in which one person produced a complete list and immediately secured universal agreement. Writings were copied, carried between communities, read in worship, and evaluated over generations.',
          },
          {
            title: 'Origen\u2019s Hexapla',
            body: 'Origen placed Hebrew and multiple Greek versions of the Old Testament side by side in parallel columns, showing that ancient Christians recognized differences among copies and translations and attempted to investigate them systematically.',
          },
          {
            title: 'Athanasius\u2019s thirty-ninth Festal Letter (AD 367)',
            body: 'Athanasius\u2019s letter contains the earliest surviving list that exactly matches the twenty-seven books of the New Testament used by most Christians today. He also distinguished books recommended for instruction from those included in the canon.',
          },
          {
            title: 'Jerome and the Vulgate',
            body: 'Jerome revised and translated Scripture into Latin using Hebrew and Greek sources. The resulting Vulgate became the principal biblical text of Western Christianity for a thousand years \u2014 connecting scholars across regions but making direct reading difficult for people without a Latin education.',
          },
        ],
        timeline: [
          {
            label: 'First century',
            title: 'Apostolic writings circulate',
            body: 'Christian congregations read the sacred writings inherited from Judaism and shared letters written by apostles. Writings were copied, carried between communities, and read in worship.',
          },
          {
            label: 'c. 185 \u2013 253 AD',
            title: 'Origen and the Hexapla',
            body: 'Origen, working in Alexandria and Caesarea, produces the Hexapla \u2014 a massive comparison of Hebrew and Greek Old Testament texts in parallel columns.',
          },
          {
            label: 'c. 260 \u2013 340 AD',
            title: 'Eusebius classifies Christian writings',
            body: 'Eusebius of Caesarea distinguishes widely accepted books from disputed books and from writings regarded as spurious in his Ecclesiastical History.',
          },
          {
            label: 'AD 367',
            title: 'Athanasius\u2019s thirty-ninth Festal Letter',
            body: 'Athanasius, bishop of Alexandria, issues the earliest surviving list that exactly matches the twenty-seven books of the New Testament.',
          },
          {
            label: 'AD 382',
            title: 'Pope Damasus asks Jerome to revise the Latin Gospels',
            body: 'Jerome begins the work of revision and translation that will produce the Latin Vulgate, eventually including Old Testament work from Hebrew.',
          },
          {
            label: 'AD 393 / 397',
            title: 'Councils of Hippo and Carthage',
            body: 'Regional North African councils recognize the twenty-seven New Testament books and list Old Testament books that include Tobit, Judith, and Maccabees.',
          },
          {
            label: 'Fifth century onward',
            title: 'The Vulgate becomes the Bible of the West',
            body: 'Jerome\u2019s Latin work gradually becomes the principal biblical text of Western Christianity. Monasteries copy it, theologians cite it, and clergy use it in worship \u2014 but ordinary people cannot read it without a Latin education.',
          },
        ],
        reflectivePrompt:
          'The Bible was not handed down as a single bound book but recognized over generations of reading, copying, and debate. How does knowing the human history behind the canon affect your trust in the Scripture you hold today?',
        keyTakeaway:
          'The New Testament canon was recognized through a centuries-long process of reading, copying, and evaluation \u2014 from the apostolic writings through Origen, Eusebius, Athanasius, and the councils. Jerome\u2019s Latin Vulgate then became the Bible of Western Christianity for a thousand years, preserving the text but also creating a barrier between Scripture and the common people.',
      },
      {
        id: 'wycliffe',
        number: 104,
        title: 'John Wycliffe and the First Complete English Bible',
        tagline: 'A scholar challenges the church and translates Scripture into English',
        description:
          'In fourteenth-century England, the Bible was Latin and the common people could not read it. John Wycliffe, an Oxford scholar, argued that Scripture should be available in the language people spoke and pushed for an English Bible. He was opposed, condemned after his death, and his remains were burned \u2014 but the demand for an English Bible could not be stopped.',
        dateRange: 'c. 1320s \u2013 1384',
        complete: true,
        sections: [
          {
            heading: 'A Church Across Europe',
            body: 'By the later Middle Ages, the Western Church had become one of Europe\u2019s most influential institutions. Its bishops and priests supervised worship and religious education, while monasteries preserved books and trained generations of scholars. The bishop of Rome, known as the pope, held a position of special authority in the Latin Church. The Church also owned land, maintained courts, and exercised political influence in a world where religious and civil institutions were closely connected. For many Europeans, the Church shaped the rhythms of life from birth to burial. Baptism, marriage, confession, the Eucharist, and funerals were familiar parts of community life. This was not a period without biblical study or reform. Monastic scholars copied Scripture, universities developed methods of theological argument, and preachers called for moral renewal. At the same time, wealth and political power created opportunities for abuse. Complaints about clerical misconduct, church appointments, and the use of money in religious life appear in medieval records well before the Protestant Reformation.',
          },
          {
            heading: 'Indulgences and the Question of Money',
            body: 'One of the practices that later provoked intense criticism was the granting of indulgences. In Catholic theology, an indulgence concerns the remission of temporal punishment associated with sins whose guilt has already been forgiven. It is distinct from the forgiveness of sin itself. Medieval indulgences developed in connection with penitential practices, pilgrimages, crusades, and acts of devotion. By the late medieval period, indulgences were sometimes connected to financial contributions, including support for religious buildings and other church projects. Such arrangements could be presented in ways that encouraged people to believe money could secure spiritual benefits. Criticism of their promotion would become especially prominent in the early sixteenth century.',
          },
          {
            heading: 'Two Popes and a Divided Western Church',
            body: 'Beginning in 1095, a series of military campaigns known as the Crusades brought European armies into conflict in the eastern Mediterranean. Pope Urban II called for the First Crusade at the Council of Clermont, and participants were promised spiritual privileges. Crusading violence was not confined to battles in the Holy Land. During the First Crusade, Jewish communities in parts of the Rhineland suffered massacres. The Fourth Crusade culminated in the sack of Constantinople in 1204, deepening divisions between the Latin West and the Greek-speaking Christian East. Then, in 1378, a disputed papal election produced a crisis that divided Western Christianity for decades. Urban VI was elected in Rome, but a group of cardinals later rejected the circumstances of that election and chose Clement VII, who established his court at Avignon. The period is known as the Western Schism. It did not create two different Christian religions, but it placed rival claimants to the papacy at the center of the same Western Church. The Council of Constance, meeting from 1414 to 1418, eventually helped bring the schism to an end through the election of Martin V in 1417. The crisis exposed how closely the leadership of the Church was tied to the political divisions of Europe.',
          },
          {
            heading: 'John Wycliffe Enters the Story',
            body: 'Christianity had reached Britain long before the medieval controversies over papal authority. One important center of religious life was the island of Iona, off the western coast of Scotland. In AD 563, Columba, an Irish monk, established a monastic community there. Iona became a center of learning and missionary activity, with influence extending into parts of Scotland and northern England. Later writers sometimes portrayed early British Christian communities such as the Culdees as a continuous hidden organization opposed to Rome and connected them with later reformers. Surviving evidence does not establish such a secret organization directing the careers of Wycliffe or Luther. John Wycliffe emerged in fourteenth-century England during a period marked by war, plague, political conflict, and growing criticism of ecclesiastical wealth. Educated at Oxford, he became known as a theologian who questioned aspects of church authority and argued that Scripture should occupy a central place in Christian teaching. His criticisms developed within the medieval Church rather than outside it. The Western Schism gave additional force to arguments about authority, because the competing papal claimants made the question of who could speak for the Church unusually visible.',
          },
          {
            heading: 'England in the Fourteenth Century',
            body: 'In fourteenth-century England, the Bible occupied a central place in Christian worship, but the language of its most widely used written form was Latin. Priests and scholars trained in Latin could study the Vulgate, while many ordinary English people encountered Scripture through sermons, religious instruction, church art, and passages rendered aloud into their own language. English translations of individual biblical books and passages had existed for centuries. What had not yet appeared was a complete English Bible produced in the form associated with the movement that gathered around John Wycliffe. Wycliffe lived in a century shaped by the Black Death, conflicts between the English crown and the papacy, and disputes over the wealth and authority of the clergy. The plague that struck England in 1348\u20131349 killed a devastating proportion of the population. Its effects reached villages, monasteries, and universities, weakening established institutions and changing the lives of those who survived. John Wycliffe was born in Yorkshire, probably in the 1320s or early 1330s. He studied at the University of Oxford, where theology, philosophy, and the writings of earlier Christian thinkers formed the center of advanced education. His academic career included associations with Balliol College and other Oxford institutions, and he eventually became a doctor of theology.',
          },
          {
            heading: 'A Scholar Challenges Religious Authority',
            body: 'Wycliffe\u2019s arguments developed over time. He questioned whether church leaders should possess extensive worldly wealth and whether their political power could be justified by their religious office. In his writings on lordship and dominion, he argued that authority was inseparable from responsibility before God. Such arguments carried political consequences in a country where bishops and religious institutions owned substantial land and where the papacy made financial claims upon English church life. He also challenged the claim that the pope could exercise unrestricted authority over Christians. For Wycliffe, the authority of Scripture supplied the standard by which the conduct and teaching of religious leaders should be judged. In 1377, Pope Gregory XI issued bulls criticizing propositions associated with Wycliffe. The charges did not immediately end his career. Political circumstances and the protection of influential supporters complicated attempts to proceed against him. The following year, the Western Schism began, dividing Latin Christianity between rival papal claimants and further unsettling the question of who could speak with supreme authority for the Church.',
          },
          {
            heading: 'Lutterworth and the Question of the Eucharist',
            body: 'Wycliffe became rector of Lutterworth in Leicestershire in 1374, and the parish remained associated with his final years. As his criticisms sharpened, he disputed the doctrine of transubstantiation, the teaching that in the Eucharist the substance of bread and wine becomes Christ\u2019s body and blood while their outward appearances remain. Wycliffe maintained that the bread and wine did not cease to exist in the way the prevailing scholastic explanation required. This controversy was particularly serious because the Eucharist stood at the heart of medieval Christian worship. In 1381, Oxford authorities condemned propositions connected with Wycliffe\u2019s Eucharistic teaching. The following year, an ecclesiastical assembly at Blackfriars in London, commonly called the Earthquake Synod, condemned a series of propositions attributed to him and his followers. The historical dispute itself is clear: Wycliffe\u2019s understanding of the Eucharist placed him in opposition to established church teaching.',
          },
          {
            heading: 'The Bible in the English Language',
            body: 'The translation associated with Wycliffe\u2019s circle marked an important development in the history of English Scripture. The work produced a complete Bible in Middle English, the form of the language spoken and written in England before the emergence of modern English. Unlike William Tyndale\u2019s later translation, it was made from the Latin Vulgate rather than directly from Hebrew and Greek manuscripts. Two broad forms of the Wycliffite Bible survive. The earlier version follows the Latin text closely and can be difficult to read. A later revision uses more natural English expression. Scholars have associated Nicholas of Hereford with parts of the earlier translation and John Purvey with the later revision, but the precise responsibilities of individual translators remain debated. The project is therefore more accurately described as the work of Wycliffe\u2019s movement than as a complete Bible translated single-handedly by Wycliffe himself. The books circulated in handwritten copies because the printing press had not yet been introduced into Europe. Producing a Bible remained expensive and slow, yet numerous surviving manuscripts show that these English texts reached readers in different settings. Their existence also demonstrates that the history of the English Bible did not begin with the sixteenth-century Reformation. Wycliffe\u2019s followers became known as Lollards, a name applied to groups who criticized aspects of established church practice and emphasized the authority of Scripture.',
          },
          {
            heading: 'Restrictions, Death, and the Burning of His Remains',
            body: 'Wycliffe died at Lutterworth on 31 December 1384, following a stroke. His death did not end disputes over his teaching. In the decades that followed, English authorities moved against Lollardy, and the circulation of religious texts became increasingly subject to ecclesiastical regulation. The Constitutions of Oxford, issued under Archbishop Thomas Arundel in 1407\u20131409, restricted unauthorized translation of Scripture into English and the reading of translations made in Wycliffe\u2019s time or afterward without ecclesiastical approval. The regulations did not simply announce that every English biblical passage was forbidden; they imposed a system of approval that could prevent unauthorized texts from circulating. The Council of Constance, meeting from 1414 to 1418, condemned Wycliffe\u2019s teachings and ordered his remains to be removed from consecrated ground. In 1428, decades after his death, his bones were exhumed at Lutterworth and burned, and the ashes were dispersed. The act was intended as a public rejection of a man whose writings had continued to influence religious controversy long after his death. Wycliffe\u2019s influence also extended beyond England. Jan Hus, a reforming preacher and university figure in Bohemia, encountered ideas associated with Wycliffe. Hus was condemned at the Council of Constance and burned in 1415. When printing and new language scholarship transformed European learning in the following century, the question of who could read Scripture and in what language would return with even greater force.',
          },
        ],
        keyPoints: [
          {
            title: 'The medieval Church\u2019s wealth and authority created tensions',
            body: 'The Western Church was one of Europe\u2019s most powerful institutions, owning land, maintaining courts, and exercising political influence. Complaints about clerical misconduct and the use of money in religious life appear well before the Reformation.',
          },
          {
            title: 'The Western Schism exposed the question of authority',
            body: 'From 1378 to 1417, rival popes in Rome and Avignon divided Western Christianity. The crisis made the question of who could speak for the Church unusually visible and gave force to arguments about reform.',
          },
          {
            title: 'Wycliffe made Scripture the standard',
            body: 'Wycliffe argued that the authority of Scripture, not the pope, supplied the standard by which the conduct and teaching of religious leaders should be judged. His circle produced the first complete Bible in English, translated from the Latin Vulgate.',
          },
          {
            title: 'Condemned after death',
            body: 'Wycliffe died in 1384, but the Council of Constance condemned his teachings and in 1428 his bones were exhumed and burned. The Constitutions of Oxford restricted English Bible translation, yet Wycliffite manuscripts continued to circulate.',
          },
        ],
        timeline: [
          {
            label: '1095',
            title: 'The First Crusade',
            body: 'Pope Urban II calls for the First Crusade at the Council of Clermont. Crusading violence reaches Jewish communities in the Rhineland and later culminates in the sack of Constantinople in 1204.',
          },
          {
            label: '1348 \u2013 1349',
            title: 'The Black Death strikes England',
            body: 'The plague kills a devastating proportion of the population, reaching villages, monasteries, and universities, weakening established institutions and forming the background to Wycliffe\u2019s education.',
          },
          {
            label: 'c. 1320s \u2013 1330s',
            title: 'John Wycliffe is born',
            body: 'Wycliffe is born in Yorkshire. He studies at the University of Oxford, where theology, philosophy, and the writings of earlier Christian thinkers form the center of advanced education.',
          },
          {
            label: '1374',
            title: 'Wycliffe becomes rector of Lutterworth',
            body: 'Wycliffe takes up the parish in Leicestershire that will remain associated with his final years, while continuing his scholarly and reforming work.',
          },
          {
            label: '1377',
            title: 'Pope Gregory XI issues bulls against Wycliffe',
            body: 'The pope criticizes propositions associated with Wycliffe, but political circumstances and the protection of influential supporters prevent immediate action against him.',
          },
          {
            label: '1378',
            title: 'The Western Schism begins',
            body: 'A disputed papal election produces rival popes in Rome and Avignon, dividing Western Christianity for decades and intensifying debates about authority.',
          },
          {
            label: '1381 \u2013 1382',
            title: 'Wycliffe\u2019s teachings condemned',
            body: 'Oxford authorities condemn his Eucharistic teaching in 1381. The Earthquake Synod at Blackfriars in London condemns further propositions in 1382.',
          },
          {
            label: '31 December 1384',
            title: 'Wycliffe dies at Lutterworth',
            body: 'Wycliffe dies following a stroke. His followers, known as Lollards, continue to circulate English biblical texts and criticize aspects of established church practice.',
          },
          {
            label: '1407 \u2013 1409',
            title: 'The Constitutions of Oxford',
            body: 'Archbishop Thomas Arundel issues regulations restricting unauthorized translation of Scripture into English and the reading of Wycliffite translations without ecclesiastical approval.',
          },
          {
            label: '1415',
            title: 'Jan Hus burned at the stake',
            body: 'Hus, a reforming preacher in Bohemia who encountered Wycliffe\u2019s ideas, is condemned and burned at the Council of Constance.',
          },
          {
            label: '1428',
            title: 'Wycliffe\u2019s remains burned',
            body: 'Decades after his death, Wycliffe\u2019s bones are exhumed at Lutterworth, burned, and the ashes dispersed \u2014 a public rejection ordered by the Council of Constance.',
          },
        ],
        reflectivePrompt:
          'Wycliffe argued that Scripture, not church authority, should be the standard by which religious leaders are judged \u2014 and his circle produced the first complete English Bible despite the risks. What does it mean to you that people were willing to die, and even have their bones dug up and burned, so that the Bible could exist in a language ordinary people could read?',
        keyTakeaway:
          'John Wycliffe was an Oxford scholar who argued that Scripture, not the pope, should be the standard for Christian teaching and life. His circle produced the first complete Bible in English, translated from the Latin Vulgate and circulated in handwritten copies. He was condemned after death, his remains were burned, and English Bible translation was restricted \u2014 but the demand for Scripture in the language of the people could not be stopped.',
      },
      {
        id: 'gutenberg-erasmus',
        number: 105,
        title: 'Gutenberg, Erasmus, and the Recovery of Biblical Languages',
        tagline: 'Printing changes everything and Greek returns',
        description:
          'Gutenberg\u2019s printing press transformed how books were made and how ideas spread. Erasmus published the first printed Greek New Testament, giving scholars direct access to the original language of the New Testament for the first time in centuries. Together, these developments set the stage for every translation that followed.',
        dateRange: 'c. 1450 \u2013 1516',
        complete: true,
        sections: [
          {
            heading: 'The Arrival of Printing',
            body: 'For centuries, the production of books depended upon handwritten copies. The fifteenth century brought a change that would alter the distribution of Scripture throughout Europe. In Mainz, a city in the German lands, Johannes Gutenberg developed a system of printing with reusable metal type. Individual letters could be arranged into lines, inked, pressed onto paper or vellum, and then used again for another page. This process did not eliminate the need for skilled labor, but it made the production of multiple copies far faster than handwriting each one. Gutenberg\u2019s famous forty-two-line Bible was produced around 1454\u20131455. It was printed in Latin, not German or English, and its appearance deliberately resembled the manuscript Bibles familiar to readers of the time. Decorated initials could still be added by hand. The new technology therefore began by reproducing an established kind of religious book even as it transformed the means of making it. The printing enterprise involved costly equipment and complicated business arrangements. Johann Fust provided financial backing to Gutenberg, and Peter Sch\u00f6ffer became an important early printer associated with Fust. Printing spread rapidly beyond Mainz. Presses appeared in other German cities, Italy, France, the Low Countries, and eventually England. Books could now be reproduced in larger numbers, and scholars in different places could consult editions containing substantially the same printed text. The new technology also made it possible for religious arguments, translations, and criticisms to circulate with a speed unknown in Wycliffe\u2019s lifetime.',
          },
          {
            heading: 'A Return to Greek and Hebrew',
            body: 'Printing was only one part of the transformation. European scholars were also renewing their study of Greek and Hebrew, the principal languages in which the biblical books had been written. In much of medieval Western Europe, Latin had been the ordinary language of advanced theological study. The revival of Greek learning encouraged scholars to examine ancient Christian writings without relying entirely upon Latin translations. This movement belonged to a wider intellectual culture commonly called Renaissance humanism. The term does not mean that its scholars rejected Christianity. Many were committed Christians who believed that careful attention to languages, grammar, history, and original documents could improve religious learning. Their approach was often described by the Latin expression ad fontes, meaning \u201cto the sources.\u201d Thomas Linacre, an English physician and scholar, was among those who studied Greek in Italy and helped strengthen Greek learning in England. A famous story attributes to him the remark that either the Greek New Testament was not the Gospel or Christians were not living as Christians. John Colet, another English scholar, lectured on the letters of Paul at Oxford and emphasized their historical and literary setting. His work encouraged students to read biblical writings as connected arguments rather than isolated statements. In Florence, the Dominican preacher Girolamo Savonarola publicly denounced moral corruption and called for reform. He was executed in 1498. His story illustrates the wider atmosphere of religious criticism that existed before Martin Luther\u2019s public challenge to indulgences in 1517.',
          },
          {
            heading: 'Erasmus and the Printed Greek New Testament',
            body: 'Desiderius Erasmus, born in the Low Countries in the 1460s, became one of the best-known scholars of his generation. He studied classical languages, edited ancient writings, criticized abuses within Christian society, and urged readers to return to the teachings of Jesus and the apostles. His work combined deep engagement with Christian tradition and a desire to correct errors that had accumulated through careless copying or misunderstanding. In 1516, the Basel printer Johann Froben published Erasmus\u2019s Novum Instrumentum, an edition containing the Greek New Testament alongside a revised Latin translation and scholarly notes. The publication was not the first Greek New Testament text ever prepared for printing, but it was the first complete printed Greek New Testament to reach publication and wide circulation. Erasmus worked from a limited group of Greek manuscripts available to him. His edition contained readings and editorial decisions that later scholars would reconsider, yet it gave readers access to a printed Greek text at a moment when printing was transforming scholarly exchange. In the introduction to his New Testament, Erasmus expressed the hope that ordinary Christians would become familiar with Scripture. He imagined farmers, weavers, and travelers speaking or singing its words in the course of daily life. His emphasis on broad access to biblical teaching anticipated the concerns of later vernacular translators, even though Erasmus himself did not pursue the same public confrontation with ecclesiastical authorities as some reformers.',
          },
          {
            heading: 'The Road Toward English Translation',
            body: 'The combination of printing and Greek scholarship altered the possibilities available to translators. Wycliffe\u2019s circle had worked from the Latin Vulgate and depended on handwritten manuscripts. By the early sixteenth century, a translator with sufficient training could compare printed Greek texts, consult Latin editions, and prepare a work that printers might reproduce in hundreds or thousands of copies. This new environment influenced Martin Luther in Germany and William Tyndale in England. Their translations would emerge from different political and religious circumstances, but both belonged to a world in which Scripture could be studied in its ancient languages and printed for readers far beyond the university or monastery. The changes did not guarantee that religious authorities would welcome every translation. Printing could spread a book rapidly, but it could also bring its author into conflict with rulers and church leaders who feared unauthorized teaching. The same press that made Scripture more widely available could reproduce denunciations, prohibitions, and arguments against its translators. In England, the next generation of reform-minded readers included Thomas Bilney, whose encounter with Erasmus\u2019s printed New Testament became a turning point in his religious life.',
          },
        ],
        keyPoints: [
          {
            title: 'Printing with movable type',
            body: 'Gutenberg\u2019s system of reusable metal type made the production of multiple copies far faster than handwriting each one. His forty-two-line Bible, produced around 1454\u20131455, began by reproducing a familiar kind of religious book even as it transformed the means of making it.',
          },
          {
            title: 'Renaissance humanism and ad fontes',
            body: 'European scholars renewed their study of Greek and Hebrew, the original languages of the Bible. Their approach \u2014 ad fontes, \u201cto the sources\u201d \u2014 encouraged examination of ancient Christian writings without relying entirely on Latin translations.',
          },
          {
            title: 'Erasmus\u2019s Novum Instrumentum (1516)',
            body: 'Erasmus published the first complete printed Greek New Testament, giving readers access to a printed Greek text alongside a revised Latin translation and scholarly notes. He hoped that ordinary Christians would become familiar with Scripture.',
          },
          {
            title: 'The stage is set for vernacular translation',
            body: 'Printing and Greek scholarship together altered what translators could do. A translator with sufficient training could now compare printed Greek texts and prepare a work that printers might reproduce in hundreds or thousands of copies \u2014 setting the stage for Luther and Tyndale.',
          },
        ],
        timeline: [
          {
            label: 'c. 1454 \u2013 1455',
            title: 'Gutenberg\u2019s forty-two-line Bible',
            body: 'Johannes Gutenberg produces the first major book printed with movable metal type in Mainz. It is a Latin Bible whose appearance deliberately resembles the manuscript Bibles familiar to readers.',
          },
          {
            label: 'Late 15th century',
            title: 'Printing spreads across Europe',
            body: 'Presses appear in German cities, Italy, France, the Low Countries, and eventually England. Books can now be reproduced in larger numbers, and scholars can consult editions containing the same printed text.',
          },
          {
            label: '1498',
            title: 'Savonarola executed',
            body: 'The Dominican preacher Girolamo Savonarola, who denounced moral corruption and called for reform in Florence, is executed \u2014 illustrating the atmosphere of religious criticism before Luther.',
          },
          {
            label: 'Early 16th century',
            title: 'Greek and Hebrew scholarship revives',
            body: 'Scholars such as Thomas Linacre and John Colet strengthen Greek learning in England. The Renaissance humanist call ad fontes \u2014 \u201cto the sources\u201d \u2014 encourages study of biblical texts in their original languages.',
          },
          {
            label: '1516',
            title: 'Erasmus publishes the Novum Instrumentum',
            body: 'The Basel printer Johann Froben publishes Erasmus\u2019s edition of the Greek New Testament alongside a revised Latin translation and scholarly notes \u2014 the first complete printed Greek New Testament to reach wide circulation.',
          },
        ],
        reflectivePrompt:
          'Gutenberg\u2019s press made it possible for books \u2014 including the Bible \u2014 to spread faster than ever before. Erasmus imagined farmers, weavers, and travelers speaking Scripture in daily life. If you had lived in that moment, would you have used this new technology to spread God\u2019s word or to control it?',
        keyTakeaway:
          'Gutenberg\u2019s printing press and Erasmus\u2019s printed Greek New Testament together transformed the possibilities for biblical scholarship and translation. For the first time in centuries, scholars had direct access to the Greek text of the New Testament, and books could be reproduced in numbers that handwritten copying could never match. These developments set the stage for every vernacular translation that followed.',
      },
      {
        id: 'bilney',
        number: 106,
        title: 'Thomas Bilney and the Early English Reformation',
        tagline: 'A quiet scholar whose reading of a single verse changed England',
        description:
          'Thomas Bilney was a Cambridge scholar who bought a copy of Erasmus\u2019s Greek New Testament and was struck by a single verse. His conversion, his influence on Hugh Latimer, and his eventual martyrdom represent the quiet beginnings of the English Reformation \u2014 a movement that started not with a hammer on a door but with a reader and a text.',
        dateRange: 'c. 1495 \u2013 1531',
        complete: true,
        sections: [
          {
            heading: 'An England on the Edge of Change',
            body: 'In the opening decades of the sixteenth century, the religious life of England remained closely connected to the institutions and traditions of the medieval Western Church. Churches and monasteries stood at the center of local communities, priests conducted worship in Latin, and the universities trained generations of clergy in theology, philosophy, and the interpretation of Scripture. Yet the same universities were also becoming places where students encountered new editions of ancient texts and began to question whether inherited explanations always reflected the language of the earliest Christian writings. The printing press had made it possible to reproduce books in quantities that earlier generations could scarcely have imagined. Scholars could now compare editions, exchange arguments through printed publications, and study works that had previously been difficult to obtain. The revival of Greek learning was especially important for the study of the New Testament, whose books had originally been written in Greek rather than Latin. The appearance of Erasmus\u2019s printed Greek New Testament in 1516 brought these developments into direct contact with the religious education of young English scholars. Among the students whose lives became connected to this changing world was Thomas Bilney. His story belongs to the years before the English monarchy formally broke with Rome, when calls for reform were still developing within universities, preaching circles, and small communities of readers. Bilney did not become a king, bishop, or famous Bible translator. His influence was carried chiefly through personal conversations, preaching, and the people who remembered him after his death.',
          },
          {
            heading: 'Thomas Bilney at Cambridge',
            body: 'Thomas Bilney was born in Norfolk, probably near the end of the fifteenth century, and studied at Cambridge. The surviving record of his early life is incomplete, but his later association with Trinity Hall places him within a university known for training students in law and other learned disciplines. Cambridge was a place where the older methods of medieval scholarship existed alongside growing interest in the writings of classical antiquity and the languages of the Bible. University learning required long hours of reading and disputation. Students examined established authorities and practiced defending propositions through formal argument. Religious questions were often approached through collections of theological explanations developed over centuries. For some students, the renewed availability of biblical texts in Greek created an opportunity to examine familiar teachings in a different way. A passage heard repeatedly in Latin could acquire new force when read directly in a recently printed edition of the New Testament. Bilney became associated with a circle of Cambridge scholars interested in these new studies. His religious development was remembered by later Protestant writers as an early example of the change that could occur when a reader encountered the biblical text for himself.',
          },
          {
            heading: 'A Greek New Testament and a Single Verse',
            body: 'Erasmus\u2019s New Testament, printed at Basel in 1516, presented the Greek text alongside a revised Latin translation. For English readers accustomed to the Latin Bible, the edition offered a new way to examine the wording of the apostolic writings. Erasmus also encouraged the reading of Scripture beyond the narrow circle of professional scholars, arguing that its teachings should become familiar to ordinary Christians. The account of Bilney most often repeated in Reformation histories describes him purchasing a copy of Erasmus\u2019s New Testament and reading the first letter of Paul to Timothy. One sentence in particular became associated with his religious awakening: \u201cChrist Jesus came into the world to save sinners,\u201d followed by Paul\u2019s acknowledgment that he was foremost among them (1 Timothy 1:15). The verse places the purpose of Christ\u2019s coming beside a personal confession of sin, and Bilney\u2019s later admirers presented his encounter with it as a decisive turning point. John Foxe, whose sixteenth-century collection of martyr narratives became an influential record of the English Reformation, preserved an account of Bilney\u2019s experience. Foxe described Bilney as having been troubled by the burden of sin and as finding consolation through Paul\u2019s words. The importance of this episode in the wider story of the English Bible lies in the relationship between reading and religious change. Bilney\u2019s experience was not presented as the discovery of an unknown passage. The words had existed for centuries. What had changed was the availability of a printed edition that invited readers to examine the New Testament closely and consider its teaching for themselves.',
          },
          {
            heading: 'Hugh Latimer and the Influence of a Conversation',
            body: 'One of the most significant figures connected to Bilney was Hugh Latimer, another Cambridge scholar who would later become one of the best-known preachers of the English Reformation. Latimer\u2019s early position was not identical to Bilney\u2019s. Later accounts describe him as a defender of established religious teaching who opposed some of the newer reforming arguments circulating in the university. According to the tradition preserved by Foxe, Bilney approached Latimer and asked to make a confession to him. In the course of their conversation, Bilney spoke about his own religious struggles and the understanding of Scripture that had brought him relief. The story portrays a private exchange, rather than a public confrontation, as the occasion through which Latimer began to reconsider his position. The connection between the two men is well established in the literature of the English Reformation, and Latimer\u2019s later career gave the episode enduring importance. He became an influential preacher, served as bishop of Worcester, and was eventually executed during the reign of Mary I in 1555. Bilney\u2019s work at Cambridge also brought him into contact with other men who would become involved in religious reform. The movement did not begin as a single organization with a unified plan. It developed through reading, preaching, debate, friendship, and disagreement.',
          },
          {
            heading: 'Preaching, Arrest, and Recantation',
            body: 'Bilney began preaching beyond the university, carrying his understanding of Scripture into churches and communities where religious authorities were increasingly concerned about the spread of unauthorized teachings. England had already experienced conflicts over vernacular Scripture and the legacy of the Lollards. The writings associated with Martin Luther, which began circulating after 1517, added new urgency to questions about religious authority, salvation, and the interpretation of the Bible. Bilney was brought before church authorities in 1527. His examination concerned teachings that officials regarded as dangerous or contrary to accepted doctrine. Faced with the possibility of severe punishment, he submitted to the authorities and recanted. A recantation was a formal withdrawal of beliefs or statements that had been condemned. Such acts could allow an accused person to escape a harsher sentence, but they also placed the individual under continuing scrutiny. The record of Bilney\u2019s recantation is important because it complicates any simple picture of a reformer who moved directly from conviction to execution. His life included hesitation, fear, and a public reversal. Later Protestant accounts describe him as deeply distressed by his recantation and determined to resume preaching. Religious persecution in this period was carried out through institutions that regarded doctrinal unity as a matter of public as well as spiritual order. An accusation of heresy was therefore not merely a disagreement over an interpretation of Scripture. It could involve formal investigations, required statements of belief, imprisonment, and punishment by civil authorities following an ecclesiastical judgment.',
          },
          {
            heading: 'The Road to Norwich',
            body: 'Bilney returned to public religious activity and was arrested again. His earlier recantation increased the seriousness of the renewed accusation, since a person who returned to condemned teachings could be treated as a relapsed heretic. He was ultimately condemned and handed over for execution at Norwich in Norfolk. Thomas Bilney was burned at the stake in August 1531. His death came before the formal establishment of the Church of England\u2019s independence from papal jurisdiction and before the great wave of officially authorized English Bible printing later in the decade. He belonged to an earlier and more uncertain phase of reform, when the boundaries between established church life and emerging evangelical teaching were still being contested. Accounts of Bilney\u2019s final days describe his conversations with friends, his prayers, and his preparation for death. Norwich was an important English city with an established religious life, and a public execution there served as a warning to others accused of spreading condemned beliefs. The death of Bilney was remembered by later reformers as part of a sequence of prosecutions that preceded the more familiar persecutions of the mid-sixteenth century.',
          },
          {
            heading: 'Bilney and the Changing English Religious World',
            body: 'Bilney did not leave behind a complete English Bible, nor did he direct the large translation projects that would later transform religious reading in England. His place in this history is different. He represents the growing influence of printed biblical texts upon educated readers and the way personal engagement with Scripture could lead to public conflict over religious teaching. His encounter with Erasmus\u2019s New Testament links the scholarship of the Renaissance to the preaching and persecution of the English Reformation. His relationship with Hugh Latimer connects an early Cambridge circle to later national events. His examination and execution show the consequences that could follow when a preacher\u2019s interpretation of Scripture came into conflict with ecclesiastical authority. The next stage of the English Bible\u2019s history would involve a man who sought not only to study the biblical text in its original languages but to place an English translation directly into the hands of ordinary readers.',
          },
        ],
        keyPoints: [
          {
            title: 'A reader, not a translator',
            body: 'Bilney did not produce a Bible translation. His influence was carried through personal conversations, preaching, and the people he influenced \u2014 representing how printed Scripture changed educated readers before it changed the public church.',
          },
          {
            title: 'Erasmus\u2019s New Testament and 1 Timothy 1:15',
            body: 'Bilney purchased a copy of Erasmus\u2019s 1516 Greek New Testament and was struck by Paul\u2019s words: \u201cChrist Jesus came into the world to save sinners.\u201d His encounter shows how the availability of a printed edition invited readers to examine the New Testament for themselves.',
          },
          {
            title: 'A private conversation changed Latimer',
            body: 'Bilney\u2019s conversation with Hugh Latimer \u2014 who later became a famous preacher and bishop executed under Mary I \u2014 shows how reform spread through personal relationships before it became a public movement.',
          },
          {
            title: 'Recantation and relapse',
            body: 'Bilney recanted under pressure in 1527 but returned to preaching and was arrested again as a relapsed heretic. He was burned at Norwich in August 1531, before the English Church broke with Rome.',
          },
        ],
        timeline: [
          {
            label: 'c. 1495',
            title: 'Thomas Bilney is born',
            body: 'Bilney is born in Norfolk, probably near the end of the fifteenth century. He will later study at Cambridge during a period of growing interest in Greek and the biblical languages.',
          },
          {
            label: '1516',
            title: 'Erasmus\u2019s Greek New Testament appears',
            body: 'Erasmus\u2019s Novum Instrumentum is published at Basel, presenting the Greek New Testament alongside a revised Latin translation. The edition reaches English universities and changes how young scholars encounter Scripture.',
          },
          {
            label: 'c. 1520s',
            title: 'Bilney reads 1 Timothy 1:15',
            body: 'Bilney purchases a copy of Erasmus\u2019s New Testament and reads Paul\u2019s words: \u201cChrist Jesus came into the world to save sinners.\u201d The encounter becomes a decisive turning point in his religious life.',
          },
          {
            label: 'c. 1520s',
            title: 'Bilney and Latimer at Cambridge',
            body: 'Bilney\u2019s private conversation with Hugh Latimer leads the future bishop and preacher to reconsider his opposition to reforming arguments.',
          },
          {
            label: '1527',
            title: 'Bilney examined and recants',
            body: 'Bilney is brought before church authorities for teachings deemed dangerous. Faced with severe punishment, he formally recants \u2014 a decision that later distresses him deeply.',
          },
          {
            label: 'August 1531',
            title: 'Bilney burned at Norwich',
            body: 'After returning to preaching and being arrested as a relapsed heretic, Bilney is burned at the stake in Norwich \u2014 before the Church of England\u2019s formal break with Rome.',
          },
        ],
        reflectivePrompt:
          'Bilney\u2019s life was changed by reading a single verse in a Bible he could finally afford to buy. He did not write a famous translation or lead a national movement \u2014 he simply read, believed, and told others. Who are the quiet people in your life whose influence has shaped your faith without ever being famous for it?',
        keyTakeaway:
          'Thomas Bilney was a Cambridge scholar whose encounter with Erasmus\u2019s printed Greek New Testament \u2014 and a single verse, 1 Timothy 1:15 \u2014 became a turning point in his life. Through personal conversations, especially with Hugh Latimer, and through preaching, he helped shape the early English Reformation. He recanted under pressure in 1527, returned to preaching, and was burned at Norwich in 1531 as a relapsed heretic \u2014 before the English Church formally broke with Rome.',
      },
      {
        id: 'tyndale',
        number: 107,
        title: 'William Tyndale: Translation, Persecution, and Martyrdom',
        tagline: 'The man who gave England the Bible from the original languages',
        description:
          'Tyndale set out to translate the New Testament from Greek into English so that, in his words, \u201cthe boy that driveth the plough\u201d might know the Scripture. He was forced to leave England, worked in hiding on the continent, was betrayed, arrested, and executed. His translation became the foundation of nearly every English Bible that followed.',
        dateRange: 'c. 1494 \u2013 1536',
        complete: true,
        sections: [
          {
            heading: 'An English Bible from the Original Languages',
            body: 'William Tyndale was born in Gloucestershire around the end of the fifteenth century, in an England where religion, education, and public authority were closely connected. Latin remained the principal language of university theology and church worship, although English was the language most people used in daily life. The Bible associated with John Wycliffe had demonstrated that Scripture could be read in English, but those translations were based upon the Latin Vulgate and circulated in handwritten copies. Tyndale would pursue a different method. He wanted to work from the Hebrew and Greek texts themselves, and he wanted the resulting English words to reach readers through the printing press. Tyndale studied at Oxford, where he received academic degrees, and later spent time at Cambridge, a center of new interest in the biblical languages. Renaissance scholarship had encouraged students to examine older texts, while Erasmus\u2019s printed Greek New Testament of 1516 gave scholars a widely available resource for studying the language of the Christian Scriptures. These developments made possible a kind of translation that had previously required access to rare manuscripts and specialized libraries. Tyndale acquired the linguistic training needed to use them. Accounts of his early years also connect him with conversations among scholars and reform-minded readers in Cambridge. The White Horse inn became associated in later histories with meetings of men interested in Luther\u2019s writings and religious reform. What is clear is that questions about Scripture, preaching, and church authority were circulating among educated Englishmen during these years.',
          },
          {
            heading: 'The Plowboy and the Meaning of Translation',
            body: 'Tyndale\u2019s ambition was not simply to produce a more elegant Bible for scholars. He believed that ordinary English readers should be able to encounter the biblical text in a language they understood. An early account of his life, preserved by John Foxe in Acts and Monuments, describes an argument with a learned opponent in which Tyndale declared that, if God spared his life, he would cause a boy driving a plow to know more Scripture than that opponent. The remark is known through Foxe\u2019s later narrative rather than a surviving transcript of the exchange, but it expresses the purpose with which Tyndale\u2019s work became identified. The obstacles were substantial. English church authorities had placed restrictions upon unauthorized biblical translation and reading, particularly after the spread of Wycliffite teaching. The Constitutions of Oxford, associated with Archbishop Thomas Arundel in 1408, required ecclesiastical approval for new English translations and for the use of certain earlier ones. Such regulations did not mean that no English biblical passage existed or that every English reader was prosecuted, but they made the printing and circulation of a new unauthorized translation a dangerous undertaking. Tyndale entered this world of religious suspicion at a time when the circulation of Luther\u2019s writings had sharpened official concern about reforming ideas.',
          },
          {
            heading: 'Leaving England',
            body: 'Tyndale sought support for a translation project in London. He approached Cuthbert Tunstall, bishop of London, hoping that the work might proceed with episcopal protection. The request was unsuccessful. Tyndale spent time in the household of the merchant Humphrey Monmouth, whose support helped sustain him, but he eventually concluded that he could not complete and publish his work safely in England. In 1524 he departed for the continent. His subsequent movements are not documented at every stage, and accounts differ about the precise order of his visits. Wittenberg, where Martin Luther taught, is often connected with his travels; Cologne and Worms are more firmly connected with the printing history of his New Testament. Cologne was a major center of printing and commerce. There, in 1525, Tyndale arranged for an English New Testament to be printed. The undertaking was interrupted after authorities learned of it. The printer\u2019s work stopped, but a fragment of the unfinished edition survived. Known as the Cologne Fragment, it preserves part of Matthew\u2019s Gospel and demonstrates that the first attempt to print Tyndale\u2019s English New Testament had already advanced before the interruption. Tyndale then continued the project at Worms, where a complete printed New Testament appeared in 1526. Unlike Wycliffe\u2019s handwritten Bible, this edition could be reproduced in hundreds or thousands of copies. Printing did not eliminate the danger of possessing the book, but it transformed the speed at which copies could be made and distributed.',
          },
          {
            heading: 'The New Testament Crosses the Channel',
            body: 'The 1526 New Testament was a compact book intended to be read and transported. Copies entered England through commercial routes linking continental ports with English merchants. Religious authorities regarded the unauthorized translation and its accompanying reforming ideas as a serious threat. Bishop Tunstall publicly condemned the book, and copies were burned at St Paul\u2019s Cross in London. Burning a book was a public act of religious and political condemnation. The authorities sought to demonstrate that the text was unacceptable and to discourage its circulation. Yet the existence of printing presses beyond England meant that destroying one shipment could not necessarily prevent new copies from arriving. The controversy became a struggle over publication, distribution, and the authority to determine which English biblical texts could be read. Tyndale\u2019s English was direct and frequently memorable. He sought wording that ordinary readers could understand while remaining closely connected to the Greek text. His translation choices also provoked controversy. Words such as congregation, elder, and repentance were debated because their meaning touched questions of church structure and doctrine. These disagreements were not merely about literary style. They concerned how the language of Scripture should be understood and who possessed authority to interpret it.',
          },
          {
            heading: 'Translation Beyond the New Testament',
            body: 'Tyndale did not stop with the New Testament. He also worked on the Hebrew Scriptures, publishing the Pentateuch in English in 1530. These five books, Genesis through Deuteronomy, required him to work with Hebrew as well as Greek and to make decisions about names, legal terms, and religious expressions that did not always have obvious English equivalents. His translation of the book of Jonah appeared in 1531, and work attributed to him on additional Old Testament books survived through later English Bible editions. The task was immense. The original languages belonged to cultures separated from Tudor England by many centuries, and translating them demanded both linguistic knowledge and judgment about how ancient expressions could be rendered intelligibly. Tyndale\u2019s writings also placed him in conflict with powerful figures. He disputed the theology of Thomas More and criticized religious practices that he believed lacked scriptural warrant. In The Practice of Prelates, published in 1530, he opposed Henry VIII\u2019s attempt to end his marriage to Catherine of Aragon. His position complicated any simple assumption that his disagreement with Roman church authority meant agreement with the king. Tyndale\u2019s convictions could bring him into conflict with both ecclesiastical and royal power.',
          },
          {
            heading: 'Antwerp, Betrayal, and Arrest',
            body: 'During the 1530s, Tyndale lived in Antwerp, an important trading city in the Habsburg Netherlands. English merchants there provided contacts and, at times, practical support. The city offered opportunities for publishing and communication, but it did not place him beyond the reach of religious authorities. In 1535, a man named Henry Phillips gained Tyndale\u2019s confidence and became involved in the events leading to his arrest. Tyndale was seized and imprisoned at Vilvoorde, near Brussels, where he remained for more than a year. One surviving letter attributed to Tyndale\u2019s imprisonment gives an unusually personal view of his circumstances. Written in Latin to a prison official, it asks for warmer clothing, a lamp, and, above all, a Hebrew Bible, Hebrew grammar, and Hebrew dictionary so that he could continue his studies. The request reveals the practical difficulties of imprisonment and the persistence of his interest in translation. While Tyndale was imprisoned, English Bible publishing continued to develop. Miles Coverdale\u2019s complete printed English Bible appeared in 1535, drawing upon earlier translation work, including Tyndale\u2019s.',
          },
          {
            heading: 'The Death of William Tyndale',
            body: 'Tyndale was tried for heresy in the Habsburg Netherlands and condemned. In October 1536, he was executed at Vilvoorde. Accounts describe him as being strangled before his body was burned, a form of execution used in some cases involving condemned heretics. Later accounts preserve a final prayer attributed to him: that the king of England\u2019s eyes might be opened. The words are famous through the tradition recorded by Foxe, rather than through a contemporary transcript of the execution. Only a few years after Tyndale\u2019s execution, English Bibles were being printed with royal permission. The Matthew Bible of 1537, associated with John Rogers and incorporating substantial work by Tyndale, received royal license. The Great Bible followed in 1539 and was authorized for use in English churches. These editions were not simply identical reprints of Tyndale\u2019s work, but they carried forward a large part of the translation he had begun. Tyndale did not live to see a complete English Bible openly placed in parish churches. Nevertheless, his translation helped shape the English biblical language that later generations inherited. Phrases and patterns of expression from his New Testament passed into subsequent versions and, through them, into the King James Bible of 1611.',
          },
        ],
        keyPoints: [
          {
            title: 'From the original languages, not the Latin',
            body: 'Unlike Wycliffe\u2019s Bible, which was translated from the Latin Vulgate, Tyndale worked from the Hebrew and Greek texts themselves. This was made possible by Erasmus\u2019s 1516 printed Greek New Testament and the Renaissance revival of biblical language study.',
          },
          {
            title: 'The plowboy and the printing press',
            body: 'Tyndale declared he would cause a boy driving a plow to know more Scripture than his opponents. Combined with the printing press, his translation could reach ordinary readers in hundreds or thousands of copies \u2014 a transformation Wycliffe\u2019s handwritten manuscripts could never achieve.',
          },
          {
            title: 'Cologne, Worms, and the channel crossing',
            body: 'Tyndale\u2019s 1525 printing at Cologne was interrupted but survived as the Cologne Fragment. The complete New Testament appeared at Worms in 1526 and entered England through merchant routes, where Bishop Tunstall condemned it and copies were burned at St Paul\u2019s Cross.',
          },
          {
            title: 'Vilvoorde and the final prayer',
            body: 'Tyndale was betrayed by Henry Phillips in Antwerp in 1535, imprisoned at Vilvoorde for over a year, and executed in October 1536. His final prayer \u2014 \u201cthat the king of England\u2019s eyes might be opened\u201d \u2014 was fulfilled within years as English Bibles received royal license.',
          },
        ],
        timeline: [
          {
            label: 'c. 1494',
            title: 'William Tyndale is born',
            body: 'Tyndale is born in Gloucestershire. He will study at Oxford and Cambridge, acquiring the linguistic training needed to translate from Hebrew and Greek.',
          },
          {
            label: '1524',
            title: 'Tyndale leaves England',
            body: 'Unable to secure episcopal support for his translation from Bishop Tunstall of London, Tyndale departs for the European continent to pursue the work in safety.',
          },
          {
            label: '1525',
            title: 'The Cologne Fragment',
            body: 'Tyndale arranges for an English New Testament to be printed at Cologne, but authorities interrupt the work. A surviving fragment of Matthew\u2019s Gospel proves the attempt had already advanced.',
          },
          {
            label: '1526',
            title: 'The complete New Testament at Worms',
            body: 'A complete printed English New Testament appears at Worms. Copies enter England through merchant routes. Bishop Tunstall condemns the book, and copies are burned at St Paul\u2019s Cross in London.',
          },
          {
            label: '1530',
            title: 'The Pentateuch in English',
            body: 'Tyndale publishes the first five books of the Old Testament in English, working from Hebrew. In The Practice of Prelates, he also opposes Henry VIII\u2019s attempt to end his marriage to Catherine of Aragon.',
          },
          {
            label: '1531',
            title: 'The book of Jonah',
            body: 'Tyndale\u2019s translation of Jonah appears, extending his Old Testament work.',
          },
          {
            label: '1535',
            title: 'Betrayal and arrest at Antwerp',
            body: 'Henry Phillips gains Tyndale\u2019s confidence and betrays him. Tyndale is seized and imprisoned at Vilvoorde near Brussels. From prison, he writes asking for a Hebrew Bible, grammar, and dictionary to continue his work.',
          },
          {
            label: 'October 1536',
            title: 'Tyndale executed at Vilvoorde',
            body: 'Tyndale is tried for heresy, condemned, strangled, and burned. His final prayer \u2014 \u201cthat the king of England\u2019s eyes might be opened\u201d \u2014 is remembered through Foxe\u2019s account. Within years, English Bibles receive royal license.',
          },
          {
            label: '1537 / 1539',
            title: 'The Matthew Bible and the Great Bible',
            body: 'The Matthew Bible (1537), incorporating Tyndale\u2019s work, receives royal license. The Great Bible (1539) is authorized for use in English churches \u2014 fulfilling the hope Tyndale did not live to see.',
          },
        ],
        reflectivePrompt:
          'Tyndale left England, worked in hiding, was betrayed by a friend, spent over a year in prison, and was executed \u2014 so that a plowboy could read the Bible in English. His translation became the foundation of nearly every English Bible that followed. What would you be willing to sacrifice so that someone else could read God\u2019s word?',
        keyTakeaway:
          'William Tyndale was the translator who gave England the Bible from the original Hebrew and Greek. His 1526 New Testament, printed at Worms, entered England through merchant routes and was burned at St Paul\u2019s Cross. He published the Pentateuch in 1530 and Jonah in 1531, was betrayed in Antwerp in 1535, and was executed at Vilvoorde in October 1536. Within years, his translation received royal license and carried forward into the King James Bible of 1611.',
      },
      {
        id: 'geneva-bible',
        number: 108,
        title: 'The Geneva Bible and the Marian Persecutions',
        tagline: 'A Bible for English homes during a time of fire',
        description:
          'When Mary I took the throne and began burning Protestants, English exiles fled to Geneva and produced a new English Bible \u2014 the Geneva Bible. It was the first English Bible translated from the original languages, designed for home reading, and it became the Bible of Shakespeare, the Puritans, and the Pilgrims. John Foxe\u2019s Book of Martyrs recorded the stories of those who died.',
        dateRange: 'c. 1553 \u2013 1560',
        complete: true,
        sections: [
          {
            heading: 'England After Tyndale',
            body: 'William Tyndale died in 1536, but the struggle surrounding English Scripture did not end with his execution. Within a few years, English Bibles were being printed under royal permission, even as religious authority remained deeply contested. Henry VIII had broken with the authority of the pope, yet that political separation did not mean that England had adopted every teaching associated with Protestant reform. The Crown continued to determine what could be preached, printed, and practiced, and changes in the monarch could bring sudden changes in religious policy. The Bible itself stood at the center of these developments. Miles Coverdale\u2019s complete printed English Bible appeared in 1535. The Matthew Bible, published in 1537 under a name associated with John Rogers, drew extensively on Tyndale\u2019s work. In 1539, the Great Bible appeared as a large edition intended for use in churches. These editions made the English biblical text more visible, but the question of which translation could be used, and who could interpret it, remained inseparable from the religious policies of the government. The reign of Edward VI, who succeeded Henry VIII in 1547, encouraged Protestant reforms in English worship. His death in 1553 brought his half-sister Mary Tudor to the throne.',
          },
          {
            heading: 'Mary I and the Marian Persecutions',
            body: 'Mary I ruled from 1553 until 1558. During her reign, the government restored Catholic religious policy and revived the prosecution of Protestant heresy. Heresy was a legal and religious charge applied to teachings that authorities judged contrary to the established faith. Those convicted under the revived laws could be handed over to secular officials for execution by burning. The number of Protestants executed during Mary\u2019s reign is commonly given as approximately 280 to 300. The victims included bishops, clergy, artisans, and ordinary believers. Among the most widely remembered were Hugh Latimer and Nicholas Ridley, burned at Oxford in October 1555, and Thomas Cranmer, the former archbishop of Canterbury, executed in March 1556. Their deaths became central episodes in the Protestant memory of the English Reformation. The records also preserve the names of less prominent people. Their cases demonstrate that the prosecutions extended beyond famous religious leaders. Men and women from different walks of life faced examinations concerning the Mass, the Eucharist, and their willingness to accept the restored religious settlement. Religious persecution was not confined to one confession or one reign. In sixteenth-century Europe, both Catholic and Protestant governments used law and punishment to enforce religious conformity. The English persecutions under Mary nevertheless acquired a particularly lasting place in English Protestant history because of the writings that followed them.',
          },
          {
            heading: 'John Foxe and the Book of Martyrs',
            body: 'John Foxe was an English Protestant scholar and writer who spent part of Mary\u2019s reign in exile. He gathered accounts of Christians who had suffered or died for their religious beliefs and assembled them into a large historical work. Its full title, Acts and Monuments of These Latter and Perilous Days, Touching Matters of the Church, was often shortened to Acts and Monuments. It became widely known as Foxe\u2019s Book of Martyrs. The first English edition appeared in 1563, after Mary\u2019s death and the accession of Elizabeth I. Foxe continued to revise and expand the work in later editions. His book drew upon letters, court proceedings, official records, personal accounts, and earlier chronicles. It described persecutions from the early history of Christianity through the conflicts of the Reformation, giving particular attention to the English Protestants executed under Mary. Foxe\u2019s work is an important historical source because it preserves material that might otherwise have been lost. It is also a work written from a clearly Protestant perspective, and its narratives must be read alongside surviving legal documents and other contemporary testimony. The book was illustrated with woodcuts depicting trials, imprisonment, and executions. Woodcuts were images made from carved wooden blocks that could be printed alongside movable type. In an age when many readers encountered history through sermons, public readings, and pictures, the combination of narrative and illustration helped make the stories memorable.',
          },
          {
            heading: 'The English Exiles in Geneva',
            body: 'Many Protestants who fled England during Mary\u2019s reign settled in European cities where Protestant churches were established. Geneva, in present-day Switzerland, became one of the most important destinations. The city was closely associated with John Calvin, whose teaching and church organization had made Geneva a center of Reformed Protestantism. The English community in Geneva included ministers, scholars, and other refugees. John Knox, the Scottish reformer, served for a time among English-speaking Protestants there. Other exiles brought experience in biblical translation, printing, and theological study. Their work developed within a community that regarded the reading and explanation of Scripture as central to religious life. Geneva offered more than temporary safety. Its printing industry and network of scholars made it possible to prepare a new English Bible. The translators could consult earlier English versions, including Tyndale\u2019s work, and compare them with Hebrew and Greek texts. The resulting translation would become one of the most influential English Bibles of the sixteenth and seventeenth centuries.',
          },
          {
            heading: 'The Geneva Bible of 1560',
            body: 'The complete Geneva Bible was published in 1560. An English New Testament associated with the Geneva exiles had appeared in 1557. The 1560 edition presented the whole Bible in an accessible printed format and became especially well known for its explanatory notes, introductions, maps, and other aids for readers. Unlike the large Great Bible designed for public reading in churches, the Geneva Bible was produced in editions suited to private and household use. Its smaller format made it easier to own and carry. Readers could encounter the biblical text alongside explanations intended to help them understand unfamiliar places, words, and passages. The Geneva Bible was also influential in the use of numbered verses throughout the text. Robert Estienne had introduced a familiar system of New Testament verse numbering in the middle of the century, and the Geneva Bible helped establish the practice of printing both Old and New Testament passages with numbered verses. These numbers allowed readers to locate a passage quickly and compare it with other texts. The familiar habit of identifying a biblical passage by book, chapter, and verse became increasingly practical for everyday readers.',
          },
          {
            heading: 'Marginal Notes and Political Controversy',
            body: 'The Geneva Bible\u2019s marginal notes were another distinctive feature. A marginal note is a short explanation printed beside or near the main text. The Geneva notes reflected Reformed Protestant teaching and sometimes addressed the conduct of rulers, the duties of subjects, and the limits of earthly authority. Certain notes were sharply critical of practices associated with the papacy. Their presence meant that the Geneva Bible was more than a translation: it was also a printed guide to a particular way of reading and interpreting Scripture. The distinction between biblical text and explanatory notes would become important when King James I later supported a new English translation. He objected to some of the Geneva Bible\u2019s political commentary, especially notes that appeared to justify resistance to rulers. The new translation published in 1611 was therefore prepared without the same kind of extensive polemical marginal commentary.',
          },
          {
            heading: 'A Bible in English Homes',
            body: 'After Elizabeth I became queen in 1558, the Geneva Bible found a broad English-speaking readership. It was printed in numerous editions and used for generations alongside other English Bibles. Its influence extended into the literary culture of the period, when biblical language and imagery were familiar to writers, preachers, and audiences. William Shakespeare lived during the years when the Geneva Bible was widely read. Biblical references and turns of phrase appear throughout his plays, although identifying the exact translation behind an individual allusion requires careful comparison. The Geneva Bible was among the versions available in the England Shakespeare knew, and its widespread circulation made it an important part of the religious and literary setting of his age. English settlers also carried Bibles across the Atlantic. The Geneva Bible is associated with early Protestant migration, including the period of the Mayflower voyage in 1620. It was among the English versions used by seventeenth-century colonists, though the surviving evidence does not establish that every passenger or household owned the same edition. References to the Bible in early colonial accounts show how strongly biblical language shaped the communities these migrants formed.',
          },
          {
            heading: 'Earlier Movements and the Waldensians',
            body: 'The history of religious dissent did not begin with the sixteenth-century reformers. Among the earlier movements remembered in Protestant histories were the Waldensians, whose origins are associated with Peter Waldo, a merchant from Lyon in the late twelfth century. Waldo and his followers emphasized preaching, poverty, and the use of Scripture in language that ordinary people could understand. The movement came into conflict with ecclesiastical authorities over unauthorized preaching and other religious practices. Waldensian communities endured persecution and survived in parts of Europe, particularly in Alpine regions. During the Reformation, some Waldensians entered into closer association with Protestant churches. Their history became part of later Protestant accounts of believers who had challenged established religious authority before Luther and Tyndale. Stories about the Waldensians sometimes portray them as an unbroken, fully formed Protestant church extending back to the earliest centuries of Christianity. The surviving medieval evidence instead places the movement\u2019s recognizable beginnings in the late twelfth century.',
          },
          {
            heading: 'From the Geneva Bible to a New Royal Translation',
            body: 'By the beginning of the seventeenth century, English readers had access to several influential biblical translations. Tyndale\u2019s work had shaped the language of the English New Testament. Coverdale and other translators had contributed complete Bibles. The Great Bible had been used in churches, while the Geneva Bible had become particularly popular in homes and among many Protestant readers. These translations were not identical. They differed in wording, editorial choices, and explanatory material. The Geneva Bible\u2019s notes in particular reflected religious and political disputes that continued after the Elizabethan settlement. A new king would soon be asked to authorize a translation intended to serve the English Church without those controversial notes. The English Bible had moved from the dangerous work of exiled translators into the center of national religious life. Its history remained closely tied to rulers, church authorities, printers, and readers, but it had also become a familiar book in households and communities.',
          },
        ],
        keyPoints: [
          {
            title: 'The Marian persecutions',
            body: 'Mary I ruled from 1553 to 1558 and restored Catholic religious policy. Approximately 280 to 300 Protestants were executed by burning, including Hugh Latimer, Nicholas Ridley, and Thomas Cranmer. The prosecutions extended to ordinary men and women, not only famous leaders.',
          },
          {
            title: 'Foxe\u2019s Book of Martyrs',
            body: 'John Foxe gathered accounts of Christians who suffered for their faith into Acts and Monuments (1563), widely known as the Book of Martyrs. Illustrated with woodcuts, it shaped English Protestant memory of the Reformation for generations.',
          },
          {
            title: 'The Geneva Bible of 1560',
            body: 'English exiles in Geneva produced a complete Bible in 1560, designed for home reading in a smaller format than the church-sized Great Bible. It featured explanatory notes, maps, introductions, and numbered verses \u2014 making it the most reader-friendly English Bible of its age.',
          },
          {
            title: 'Notes that provoked a king',
            body: 'The Geneva Bible\u2019s marginal notes reflected Reformed Protestant teaching and sometimes justified resistance to rulers. King James I\u2019s objection to these political notes would lead to the commissioning of the King James Bible in 1611 without such commentary.',
          },
        ],
        timeline: [
          {
            label: '1535 / 1537 / 1539',
            title: 'English Bibles under royal permission',
            body: 'Coverdale\u2019s Bible (1535), the Matthew Bible (1537), and the Great Bible (1539) make the English biblical text increasingly visible \u2014 but religious policy remains tied to the monarch.',
          },
          {
            label: '1547 \u2013 1553',
            title: 'Edward VI and Protestant reform',
            body: 'Edward VI\u2019s reign encourages Protestant reforms in English worship. His death in 1553 brings Mary Tudor to the throne and reverses the direction of religious policy.',
          },
          {
            label: '1553 \u2013 1558',
            title: 'Mary I and the burnings',
            body: 'Mary I restores Catholic policy and revives prosecution of Protestant heresy. Approximately 280 to 300 Protestants are burned, including Latimer, Ridley, and Cranmer. Many reformers flee to the continent.',
          },
          {
            label: 'October 1555 / March 1556',
            title: 'Latimer, Ridley, and Cranmer',
            body: 'Hugh Latimer and Nicholas Ridley are burned at Oxford in October 1555. Thomas Cranmer, former archbishop of Canterbury, is executed in March 1556. Their deaths become central to Protestant memory of the Reformation.',
          },
          {
            label: '1557',
            title: 'Geneva New Testament',
            body: 'English exiles in Geneva publish an English New Testament, a precursor to the complete Geneva Bible. The city\u2019s printing industry and scholarly community make the work possible.',
          },
          {
            label: '1560',
            title: 'The complete Geneva Bible',
            body: 'The Geneva Bible is published, presenting the whole Bible in an accessible format with explanatory notes, maps, and numbered verses. It is designed for home reading and becomes the most popular English Bible for generations.',
          },
          {
            label: '1563',
            title: 'Foxe\u2019s Book of Martyrs',
            body: 'John Foxe publishes Acts and Monuments, gathering accounts of persecuted Christians with woodcut illustrations. The work shapes English Protestant memory of the Reformation for centuries.',
          },
          {
            label: '1558 onward',
            title: 'The Geneva Bible in English homes',
            body: 'After Elizabeth I becomes queen, the Geneva Bible finds a broad readership. It shapes the language of Shakespeare, crosses the Atlantic with colonists, and remains the most widely used English Bible until the King James Bible of 1611.',
          },
        ],
        reflectivePrompt:
          'During Mary\u2019s reign, approximately 280 to 300 people were burned for their faith, and many more fled to Geneva, where they produced the Bible that would fill English homes for generations. Foxe\u2019s Book of Martyrs made sure their stories were not forgotten. What stories of faith and sacrifice do you think should be remembered in your own community?',
        keyTakeaway:
          'The Geneva Bible was produced by English exiles who fled the Marian persecutions and settled in John Calvin\u2019s Geneva. Published in 1560, it was designed for home reading with explanatory notes, maps, and numbered verses \u2014 becoming the Bible of Shakespeare, the Puritans, and the Pilgrims. John Foxe\u2019s Book of Martyrs preserved the stories of those who died under Mary I. The Geneva Bible\u2019s political marginal notes would later provoke King James I to commission a new translation without them.',
      },
      {
        id: 'luther',
        number: 109,
        title: 'Martin Luther and the Protestant Reformation',
        tagline: 'A monk, a door, and a Bible for the German people',
        description:
          'Luther\u2019s challenge to indulgences in 1517 began a Reformation that reshaped the Western church. His discovery of justification by faith through reading the letters of Paul, his translation of the New Testament into German while hidden at Wartburg Castle, and his influence on Tyndale and the spread of vernacular Scripture made him one of the pivotal figures in the history of the Bible.',
        dateRange: 'c. 1483 \u2013 1546',
        complete: true,
        sections: [
          {
            heading: 'A Scholar in a Changing Europe',
            body: 'When Martin Luther entered the University of Wittenberg in the early sixteenth century, the religious life of Europe was already undergoing change. Printed books circulated more widely than they had a generation earlier, scholars were comparing ancient manuscripts, and debates about the authority of church leaders were reaching universities and royal courts. Luther would become one of the best-known figures in these disputes, but his work began within the institutions of the Western Church, where he served as a monk, priest, and university teacher. Luther was born in Eisleben, in the German territories of the Holy Roman Empire, in 1483. He studied at Erfurt and entered an Augustinian monastery in 1505. He was ordained a priest in 1507 and began teaching at Wittenberg soon afterward, receiving his doctorate in theology in 1512. His university work involved the close reading of biblical books, especially the Psalms and the letters of Paul. The Holy Roman Empire was not a single nation like modern Germany; it was a complex collection of territories governed by princes, cities, and ecclesiastical authorities under an elected emperor. The account of Luther\u2019s rise is sometimes connected in later retellings with secret networks of earlier reformers, including the followers of John Wycliffe. Wycliffe\u2019s writings did influence the Bohemian reformer Jan Hus, and the memory of Hus became important in later Protestant accounts of Luther. Surviving contemporary records, however, do not establish that a secret Lollard organization selected or directed Luther. His documented path into public controversy runs through his religious order, his university teaching, and his disagreements with the sale of indulgences.',
          },
          {
            heading: 'Indulgences and the Ninety-Five Theses',
            body: 'An indulgence, in Catholic teaching, concerns the remission of temporal punishment associated with sins whose guilt has been forgiven. In late medieval practice, indulgences were also connected with prescribed acts of devotion and, in some circumstances, financial contributions. The preaching and administration of indulgences became controversial when promises made to ordinary believers appeared to exceed the Church\u2019s stated teaching. In 1517, a campaign to promote indulgences was associated with the Dominican preacher Johann Tetzel and with the financing arrangements of Archbishop Albert of Mainz. A portion of the revenue was connected with the rebuilding of St. Peter\u2019s Basilica in Rome, while other financial obligations were also involved. Luther objected particularly to claims that appeared to make spiritual benefits dependent upon payment and to encourage people to place confidence in an indulgence certificate rather than repentance. On 31 October 1517, Luther sent a letter to Archbishop Albert containing ninety-five propositions for theological debate. These became known as the Ninety-Five Theses. The familiar story that Luther nailed the theses to the door of the Castle Church at Wittenberg belongs to the traditional account; the surviving evidence most securely establishes the letter and the circulation of the theses. Their Latin text was soon printed and distributed, carrying a university dispute into a much wider public discussion. The theses did not begin as a complete statement of a separate Protestant religion. They questioned the preaching of indulgences, the limits of papal authority over penalties, and the relationship between repentance and forgiveness. As the controversy developed, Luther\u2019s disagreements extended to the authority of councils and popes, the interpretation of Scripture, and the nature of salvation.',
          },
          {
            heading: 'Faith, Scripture, and the Letters of Paul',
            body: 'Luther\u2019s biblical studies were central to his developing theology. The language of faith and righteousness in Paul\u2019s letter to the Romans became especially important. Romans 1:17 quotes the declaration that the righteous will live by faith, a passage drawn from Habakkuk 2:4. Hebrews 11:1 likewise describes faith in relation to things hoped for and not seen. These passages appear in discussions of Luther because they illuminate the scriptural language through which he explained his understanding of salvation. Luther taught that sinners are justified before God through faith in Christ rather than by earning acceptance through human works. The Latin expression sola fide means \u201cby faith alone.\u201d Another Reformation expression, sola scriptura, describes Scripture as the final governing authority for Christian doctrine, rather than denying that teachers, councils, and historical traditions have any role. These positions became defining features of Lutheran and other Protestant movements, although Protestant reformers did not agree on every doctrine. His opponents argued that his teaching challenged the Church\u2019s established authority and misrepresented the relationship between faith, grace, and Christian obedience. The dispute was therefore not simply over access to books. It concerned who possessed authority to interpret Scripture and how its teachings should be understood within the life of the Church.',
          },
          {
            heading: 'The Diet of Worms',
            body: 'By 1520, the dispute had reached the papacy. Pope Leo X issued a document threatening Luther with excommunication unless he withdrew specified teachings. Luther publicly burned a copy of the papal document, and in January 1521 he was excommunicated. The matter then came before the imperial assembly convened at Worms under Emperor Charles V. A diet was a formal assembly of political authorities within the Holy Roman Empire. At the Diet of Worms in April 1521, Luther was asked whether he acknowledged the books placed before him and whether he would retract their contents. He acknowledged his writings but requested an opportunity to answer carefully. His response the following day appealed to Scripture and reasoned argument, insisting that his conscience was bound by the word of God. Later retellings frequently conclude Luther\u2019s declaration with the words \u201cHere I stand; I can do no other.\u201d The precise wording of this famous conclusion is uncertain in the earliest surviving accounts, although the broader substance of his refusal to recant is well documented. The imperial Edict of Worms condemned Luther and placed him under an imperial ban, making his protection and movements politically dangerous.',
          },
          {
            heading: 'Wartburg Castle and the German New Testament',
            body: 'After leaving Worms, Luther was taken into protective custody by supporters of Frederick the Wise, Elector of Saxony. He was concealed at Wartburg Castle, where he lived under an assumed identity. During this period he began translating the New Testament into German from the Greek text, drawing upon the scholarship and printed editions available in his day. Luther completed an initial translation in approximately eleven weeks during the winter of 1521\u20131522. The work was revised with assistance after his return to Wittenberg and appeared in print in September 1522. It is often called the September Testament. Its illustrations, language, and relatively accessible presentation helped it reach a broad German readership. The full Luther Bible, including the Old Testament, followed in 1534 after years of additional translation work. German-speaking Christians had possessed biblical translations before Luther, including printed editions from the fifteenth century. His translation nevertheless became especially influential because of its use of the original languages, its circulation through the printing trade, and its German prose. He aimed to write in language ordinary German readers could understand rather than reproduce foreign sentence structures word for word. The work also raised questions about the ordering and authority of biblical books. Luther placed certain New Testament writings, including Hebrews, James, Jude, and Revelation, toward the end of his edition and expressed reservations about their relative standing. His treatment of Old Testament books not found in the Hebrew canon also influenced later Protestant Bible publishing.',
          },
          {
            heading: 'Luther, Tyndale, and the Spread of Vernacular Scripture',
            body: 'The English translator William Tyndale worked during the same period. Both men made use of the growing availability of printed Greek biblical texts and both sought to put Scripture into the language of ordinary readers. Tyndale\u2019s translation work began while Luther\u2019s writings were already circulating across Europe. Their translations were not identical, but they belonged to a connected world of scholarship, religious dispute, and printing. Luther\u2019s writings also traveled through merchant networks, university circles, and printers. In England, religious authorities examined and condemned books associated with his teaching, even as students and reform-minded clergy continued to read them. The controversies surrounding Luther and Tyndale demonstrate how printing made it increasingly difficult for authorities to confine religious arguments to a single city or university. The Reformation did not end with Luther\u2019s appearance at Worms or with the publication of his German Bible. It developed through many regions and under leaders who sometimes disagreed sharply with one another. Yet the sequence from the Ninety-Five Theses to the Diet of Worms and the Wartburg translation shows how a dispute over religious practice became connected with the authority of Scripture and the availability of the Bible in everyday language. In England, these developments formed part of the longer history that eventually led to the commissioning of a new translation under King James I.',
          },
        ],
        keyPoints: [
          {
            title: 'From monk to reformer',
            body: 'Luther was an Augustinian monk, priest, and university teacher at Wittenberg, not a lay revolutionary. His path into public controversy ran through his religious order, his university teaching on the Psalms and Paul\u2019s letters, and his objections to the sale of indulgences.',
          },
          {
            title: 'The Ninety-Five Theses and the printing press',
            body: 'On 31 October 1517, Luther sent ninety-five propositions for debate to Archbishop Albert. The theses were soon printed and distributed, carrying a university dispute into a much wider public discussion \u2014 demonstrating how the printing press amplified religious controversy.',
          },
          {
            title: 'Sola fide and sola scriptura',
            body: 'Luther taught that sinners are justified before God through faith in Christ (sola fide) and that Scripture is the final governing authority for Christian doctrine (sola scriptura). These became defining features of Lutheran and other Protestant movements.',
          },
          {
            title: 'The September Testament',
            body: 'Hidden at Wartburg Castle under an assumed identity, Luther translated the New Testament into German from the Greek text in approximately eleven weeks. Published in September 1522, it reached a broad readership and demonstrated that the Bible could be put into the language of ordinary people.',
          },
        ],
        timeline: [
          {
            label: '1483',
            title: 'Luther is born',
            body: 'Martin Luther is born in Eisleben, in the German territories of the Holy Roman Empire.',
          },
          {
            label: '1505',
            title: 'Enters the Augustinian monastery',
            body: 'After studying at Erfurt, Luther enters an Augustinian monastery. He is ordained a priest in 1507.',
          },
          {
            label: '1512',
            title: 'Doctor of theology at Wittenberg',
            body: 'Luther receives his doctorate in theology and begins teaching at the University of Wittenberg, where his close reading of the Psalms and Paul\u2019s letters shapes his developing theology.',
          },
          {
            label: '31 October 1517',
            title: 'The Ninety-Five Theses',
            body: 'Luther sends a letter to Archbishop Albert of Mainz containing ninety-five propositions questioning the preaching and theology of indulgences. The theses are soon printed and distributed widely.',
          },
          {
            label: '1520 \u2013 January 1521',
            title: 'Excommunication',
            body: 'Pope Leo X issues a document threatening excommunication. Luther publicly burns the papal bull and is excommunicated in January 1521.',
          },
          {
            label: 'April 1521',
            title: 'The Diet of Worms',
            body: 'Before Emperor Charles V, Luther is asked to retract his writings. He refuses, insisting his conscience is bound by Scripture. The Edict of Worms condemns him and places him under an imperial ban.',
          },
          {
            label: '1521 \u2013 1522',
            title: 'Wartburg Castle and the German New Testament',
            body: 'Hidden at Wartburg Castle by Frederick the Wise, Luther translates the New Testament into German from the Greek text in approximately eleven weeks. The September Testament appears in print in September 1522.',
          },
          {
            label: '1534',
            title: 'The complete Luther Bible',
            body: 'After years of additional translation work, the full Luther Bible including the Old Testament is published, shaping German religious and literary language for centuries.',
          },
        ],
        reflectivePrompt:
          'Luther was a university teacher who discovered in Paul\u2019s letters that the righteous will live by faith. His study of Scripture led him to challenge the most powerful institution in Europe, and his translation of the New Testament into German put the Bible into the hands of ordinary people. How has your own reading of Scripture challenged or changed your understanding of God?',
        keyTakeaway:
          'Martin Luther was an Augustinian monk and university teacher at Wittenberg whose 1517 Ninety-Five Theses challenged the sale of indulgences and sparked the Protestant Reformation. His study of Romans led him to teach justification by faith alone (sola fide) and the final authority of Scripture (sola scriptura). After his refusal to recant at the Diet of Worms in 1521, he was concealed at Wartburg Castle, where he translated the New Testament into German from the Greek text in approximately eleven weeks. The September Testament appeared in 1522 and the complete Luther Bible in 1534, shaping German religious life and influencing William Tyndale and the spread of vernacular Scripture across Europe.',
      },
      {
        id: 'king-james',
        number: 110,
        title: 'The Making of the King James Bible',
        tagline: 'A new king, a divided church, and a translation for the ages',
        description:
          'King James I commissioned a new English translation to unite a divided church. The translators drew heavily on Tyndale\u2019s work and produced a Bible that would shape the English language and the English-speaking world for four centuries. This module examines how it was made, what it inherited from Tyndale, and why it was designed to be free of polemical marginal notes.',
        dateRange: '1604 \u2013 1611',
        complete: true,
        sections: [
          {
            heading: 'A New King and a Divided Church',
            body: 'When James VI of Scotland became James I of England in 1603, he inherited a kingdom that had experienced nearly a century of religious upheaval. The English Church had separated from papal authority under Henry VIII, undergone further Protestant reforms during the reign of Edward VI, returned to Roman Catholic rule under Mary I, and established a Protestant settlement under Elizabeth I. By the beginning of the seventeenth century, England possessed several English translations of the Bible. The work begun by John Wycliffe\u2019s followers had been followed by William Tyndale, Miles Coverdale, John Rogers, and the translators responsible for the Geneva Bible and the Bishops\u2019 Bible. Each translation had emerged from a particular historical setting, and their differences reflected developments in language, biblical scholarship, and religious authority. The Geneva Bible, first published in 1560, had become especially popular among English Protestants. Its smaller format made it suitable for personal and family reading, while its numbered verses, explanatory notes, and cross-references helped readers study Scripture independently. The Bishops\u2019 Bible, published in 1568, served a different purpose. Prepared under the authority of the Church of England, it was intended to provide a suitable English Bible for public worship. Although it received official support, it did not displace the Geneva Bible from the homes of many English readers. James inherited these competing translations along with disagreements over how the Church of England should be governed and how its worship should be conducted. Among those seeking further reform were the Puritans, Protestants who believed that the English Church retained practices and ceremonies that should be changed.',
          },
          {
            heading: 'The Hampton Court Conference of 1604',
            body: 'In January 1604, James convened a religious conference at Hampton Court Palace, near London. The meeting brought together representatives of the established Church and a small group of ministers seeking additional reforms. Among the Puritan representatives was John Rainolds, also known as Reynolds, an Oxford scholar and president of Corpus Christi College. During the discussions, Rainolds proposed that a new translation of the Bible be undertaken. The suggestion arose partly from dissatisfaction with existing English versions. The Geneva Bible was admired for its usefulness, but its explanatory notes sometimes expressed political and religious interpretations that James considered objectionable. The Bishops\u2019 Bible had official standing but was not universally regarded as a satisfactory translation. James approved the proposal. His role was not to translate the Bible personally but to authorize a scholarly undertaking and establish conditions for the work. The new translation was intended for public worship and was to omit the contentious doctrinal and political notes found in some earlier editions. The translators were instructed to follow the Bishops\u2019 Bible as a starting point while consulting earlier English versions when their wording more faithfully represented the original text.',
          },
          {
            heading: 'The Scholars and Their Work',
            body: 'The translation was organized into six companies of scholars working at Westminster, Oxford, and Cambridge. Approximately fifty men were appointed, although the precise number who participated throughout the project is uncertain. They included university professors, ministers, and specialists in Hebrew and Greek. Two companies worked at each of the three locations, dividing responsibility for the Old Testament, the Apocrypha, and the New Testament. The translators had access to earlier English Bibles, printed Hebrew and Greek editions, Latin translations, and other scholarly resources. Their task involved comparing texts, examining difficult passages, and deciding how biblical language could be represented accurately and clearly in English. The instructions called for individual examination of assigned passages followed by collective review. Difficult questions could be referred to scholars beyond the immediate company, and the companies could communicate with one another. The method brought individual expertise together with discussion and revision, helping produce a consistent literary style across the finished work.',
          },
          {
            heading: 'William Tyndale and the English Bible Tradition',
            body: 'The new Bible stood upon the work of earlier translators, especially William Tyndale. His English New Testament of 1526 had introduced phrasing that continued through later editions, including the Matthew Bible, the Great Bible, the Geneva Bible, and the Bishops\u2019 Bible. The King James translators were instructed to consult this inherited English tradition rather than discard it. A substantial amount of Tyndale\u2019s wording survived in the Authorized Version, particularly in the New Testament. Estimates of the proportion vary because scholars measure verbal dependence in different ways. The frequently repeated figure that more than ninety percent of the King James New Testament follows Tyndale should therefore be understood as an estimate rather than an exact count established by the translation committees. The continuity can be heard in familiar expressions and sentence rhythms that had already appeared in English Scripture before 1611. Yet the Authorized Version was not simply a reprint of Tyndale. Its translators revised vocabulary, grammar, and passages in light of their available sources and the standards established for the new work.',
          },
          {
            heading: 'The Bible of 1611',
            body: 'The completed translation appeared in 1611, printed in London by Robert Barker, the king\u2019s printer. Its title page identified it as newly translated from the original tongues and compared with former translations, a description that acknowledged both the Hebrew and Greek sources and the work of previous English translators. The first edition was a large volume intended especially for reading in churches. Its text appeared in a style of black-letter printing familiar from earlier English Bibles. The edition contained the Old Testament, a separate section of books called the Apocrypha, and the New Testament. It also included introductory material, calendars, and other features customary in early modern Bible printing. The presence of the Apocrypha in the 1611 Bible is an important part of its original form. These books were printed between the Old and New Testaments, rather than being silently omitted. Their later removal from many Protestant editions belongs to a subsequent chapter of Bible publishing history.',
          },
          {
            heading: 'A Bible Without Polemical Marginal Notes',
            body: 'One distinguishing feature of the new translation was its treatment of marginal notes. The Geneva Bible had offered extensive explanatory comments, including interpretations that sometimes criticized rulers or identified religious opponents with figures in biblical prophecy. James objected to notes he considered politically dangerous or disrespectful of royal authority. The new translation\u2019s instructions restricted marginal notes to explanations of Hebrew or Greek words and similar textual matters. Readers would encounter the biblical text without the extensive doctrinal commentary that had helped make the Geneva Bible popular. The decision reflected the religious and political circumstances of the commission as well as its editorial design. The King James Bible did not immediately replace every other English Bible. Geneva editions continued to circulate for years, and the Authorized Version\u2019s influence expanded through repeated printing, church use, and familiarity. Over time, its language became deeply associated with English Protestant worship and literature.',
          },
          {
            heading: 'The Legacy of the Authorized Version',
            body: 'The King James Bible became one of the most influential books in the history of the English language. Its expressions entered preaching, literature, public speech, and ordinary conversation. Its literary influence came not from a single author but from the accumulated history of English biblical translation, shaped by the scholarship and editorial decisions of the 1611 companies. The Authorized Version also preserves the complicated history of the Bible in England. Wycliffe\u2019s movement had circulated handwritten English Scriptures; Tyndale had translated from Greek and Hebrew while living in exile; Coverdale and later editors had produced complete printed English Bibles; and the Geneva translators had created a portable study Bible for English-speaking Protestants. The 1611 edition gathered much of that earlier work into a translation prepared under royal authority.',
          },
        ],
        keyPoints: [
          {
            title: 'A Puritan proposal at Hampton Court',
            body: 'The new translation was proposed by John Rainolds, a Puritan scholar, at the Hampton Court Conference of 1604. James approved it not to advance Puritanism but to provide a Bible for public worship without the Geneva Bible\u2019s controversial notes.',
          },
          {
            title: 'Six companies, three locations',
            body: 'Approximately fifty scholars in six companies at Westminster, Oxford, and Cambridge divided responsibility for the Old Testament, Apocrypha, and New Testament. Individual work was followed by collective review, producing a consistent literary style.',
          },
          {
            title: 'Built on Tyndale\u2019s foundation',
            body: 'The translators were instructed to follow the Bishops\u2019 Bible as a base while consulting earlier English versions. A substantial proportion of Tyndale\u2019s wording survived, particularly in the New Testament \u2014 making the King James Bible a culmination of nearly a century of English translation.',
          },
          {
            title: 'No polemical notes',
            body: 'Unlike the Geneva Bible, the King James Bible restricted marginal notes to explanations of Hebrew or Greek words. James objected to the Geneva Bible\u2019s political commentary, especially notes that appeared to justify resistance to rulers.',
          },
        ],
        timeline: [
          {
            label: '1603',
            title: 'James VI becomes James I of England',
            body: 'James inherits a kingdom with competing English Bible translations and deep disagreements over how the Church of England should be governed and how its worship should be conducted.',
          },
          {
            label: 'January 1604',
            title: 'The Hampton Court Conference',
            body: 'James convenes a religious conference at Hampton Court Palace. The Puritan scholar John Rainolds proposes a new Bible translation. James approves the project.',
          },
          {
            label: '1604 \u2013 1611',
            title: 'The translation work',
            body: 'Approximately fifty scholars in six companies at Westminster, Oxford, and Cambridge translate and review the Bible, comparing texts and examining difficult passages over seven years.',
          },
          {
            label: '1611',
            title: 'The King James Bible is published',
            body: 'The completed translation appears, printed by Robert Barker. It includes the Old Testament, a separate Apocrypha section, and the New Testament \u2014 with marginal notes restricted to textual matters rather than doctrinal commentary.',
          },
          {
            label: 'After 1611',
            title: 'Gradual dominance',
            body: 'The King James Bible does not immediately replace the Geneva Bible. Its influence expands through repeated printing, church use, and familiarity, eventually becoming the dominant English Bible for centuries.',
          },
        ],
        reflectivePrompt:
          'The King James Bible was not the work of a single genius but of approximately fifty scholars building on a century of translation \u2014 from Wycliffe\u2019s handwritten manuscripts to Tyndale\u2019s printed New Testament to the Geneva Bible\u2019s study notes. The 1611 edition gathered all of that earlier work into one translation. What does this tell you about how God works through generations of ordinary people to accomplish something that lasts?',
        keyTakeaway:
          'The King James Bible was commissioned by James I at the Hampton Court Conference of 1604, proposed by the Puritan scholar John Rainolds. Approximately fifty scholars in six companies at Westminster, Oxford, and Cambridge worked from 1604 to 1611, using the Bishops\u2019 Bible as their base while consulting earlier English versions \u2014 especially Tyndale\u2019s. The 1611 edition included the Apocrypha and restricted marginal notes to textual matters, omitting the polemical commentary of the Geneva Bible. Its language, shaped by a century of English translation, became one of the most influential books in the history of the English language.',
      },
      {
        id: 'septuagint-apocrypha',
        number: 111,
        title: 'The Septuagint, the Apocrypha, and the Books of the Bible',
        tagline: 'Why different Bibles have different books',
        description:
          'The Old Testament was preserved in both Hebrew and Greek, and different Christian traditions came to different conclusions about which books belonged in the Bible. This module examines the Septuagint, Jerome\u2019s distinction between the Hebrew canon and other books, what was actually printed in the 1611 King James Bible, and how the Apocrypha disappeared from many Protestant editions.',
        dateRange: 'c. 250 BC \u2013 19th century',
        complete: true,
        sections: [
          {
            heading: 'The Bible Was Not Always Printed with the Same Table of Contents',
            body: 'The first edition of the King James Bible, printed in London in 1611, contained a section that many readers of modern Protestant Bibles have never encountered. Between the Old and New Testaments stood a collection of writings commonly called the Apocrypha. Their presence in that edition was neither a printing accident nor a later addition. The translators and printers of the Authorized Version inherited a long English and European tradition in which these books were frequently published alongside the other biblical writings. The presence or absence of these books raises two separate questions. The first concerns translation: how the writings of Scripture moved from Hebrew, Aramaic, and Greek into Latin, English, German, and other languages. The second concerns the canon: which writings a particular religious community recognized as Scripture. A translation can be accurate within its chosen books while differing from another Bible in the number of books printed. Understanding this distinction makes the history of the Septuagint, Vulgate, and King James Bible considerably easier to follow. For much of Christian history, handwritten and printed Bibles did not always have identical tables of contents. Jewish, Roman Catholic, Protestant, and Eastern Orthodox traditions developed different practices concerning a relatively small group of ancient writings. The disagreement concerns the boundaries of the Old Testament, not whether the four Gospels or the letters of Paul belong in the New Testament.',
          },
          {
            heading: 'The Hebrew Scriptures and Their Arrangement',
            body: 'The Jewish Scriptures are traditionally arranged in three divisions: the Torah, the Prophets, and the Writings. The collection is known as the Tanakh, a name formed from the Hebrew initials of those divisions. In the familiar Jewish reckoning, the Tanakh contains twenty-four books. That number does not mean it omits the writings found in the thirty-nine-book Protestant Old Testament. The books are counted and grouped differently. Samuel, Kings, and Chronicles, for example, are each counted as one book in the Hebrew arrangement, while the twelve shorter prophetic books form one collection. The Protestant Old Testament contains the same basic collection of writings in a different order and division, producing thirty-nine books. The order most familiar to English readers follows a pattern shaped by ancient Greek and Latin biblical traditions, with historical books, poetry and wisdom, and prophets arranged in groups. The books now called deuterocanonical by Catholics, or commonly called Apocrypha by Protestants, were not included within the traditional Jewish Tanakh. Their appearance in ancient Greek and Latin biblical collections became part of the later Christian discussion about the Old Testament canon.',
          },
          {
            heading: 'The Septuagint: Jewish Scripture in Greek',
            body: 'Greek became an important language across the eastern Mediterranean following the conquests of Alexander the Great in the fourth century BC. Jewish communities living outside Judea increasingly used Greek in daily life. In Alexandria, Egypt, the translation of the Torah into Greek began during the third century BC. Other Jewish writings were translated in subsequent generations. The resulting Greek biblical tradition is commonly called the Septuagint, often abbreviated LXX. The name is associated with the ancient story of seventy or seventy-two translators. That tradition appears in the Letter of Aristeas, a Jewish account of the translation of the Law for an Egyptian ruler. The story is part of the historical reception of the Greek Scriptures, although the full collection now associated with the Septuagint was not translated by one group at one time. Different books have different histories and styles of translation. Greek biblical manuscripts preserve a wider range of Jewish writings than the traditional Hebrew canon. Important surviving Christian codices, including Vaticanus, Sinaiticus, and Alexandrinus, do not all contain exactly the same books. Among the writings transmitted in Greek were Wisdom of Solomon, Sirach, Tobit, Judith, Baruch, and the books of Maccabees. Greek versions of Esther and Daniel also preserve material beyond the shorter Hebrew and Aramaic forms.',
          },
          {
            heading: 'Jerome and the Latin Bible',
            body: 'Jerome began revising Latin Gospel texts under Pope Damasus I in the late fourth century and later translated much of the Old Testament with close attention to Hebrew. His work contributed to the Latin biblical tradition eventually known as the Vulgate. This Bible became the principal scriptural text of much of Western Christianity, although the Latin Vulgate as used in later centuries also contained texts and revisions that were not all produced by Jerome himself. Jerome recognized a distinction between the books of the Hebrew Bible and certain other Jewish writings read among Christians. In his preface to Samuel and Kings, commonly called the Prologus Galeatus, he discussed the Hebrew collection and placed other books outside it. Elsewhere his treatment of these writings was not uniform, and their continued circulation in Latin Bibles shows that Jerome\u2019s views did not settle their reception throughout the Western Church. Latin manuscripts could include Tobit, Judith, Wisdom, Sirach, and the Maccabean books, among others. Over centuries of copying, the contents and arrangement of particular biblical volumes varied. The Latin Bible shaped Christian worship, scholarship, and teaching, but the precise canonical status of every accompanying writing was not described identically by all medieval authors.',
          },
          {
            heading: 'The Councils, the Reformation, and the Council of Trent',
            body: 'Regional church councils at Hippo in 393 and Carthage in 397 are frequently cited in histories of the biblical canon. Their lists included writings that Roman Catholic tradition later called deuterocanonical. These records should not be confused with a declaration that such books were merely historical reading; the surviving canonical lists place them among books designated for scriptural reading. Later church traditions nevertheless interpreted and received these writings in different ways. In the sixteenth century, Protestant reformers increasingly distinguished the Hebrew collection from the additional writings preserved in Greek and Latin Bibles. Martin Luther\u2019s German Bible of 1534 placed the Apocrypha in a separate section. Its heading explained that the books were not held equal to Holy Scripture but were useful and good to read. The separation was a statement about their status, not evidence that every copy was immediately printed without them. The Roman Catholic Council of Trent, in its fourth session in 1546, issued a decree listing the biblical books it received as sacred and canonical. The list included Tobit, Judith, Wisdom, Sirach, Baruch, and First and Second Maccabees, as well as the fuller forms of Esther and Daniel. Catholic and Protestant disagreements about these writings thus became more explicitly defined during the Reformation. Eastern Orthodox churches inherited Greek biblical traditions with somewhat different collections and liturgical practices. Depending on the church and edition, books such as First Esdras, Third Maccabees, and Psalm 151 may appear.',
          },
          {
            heading: 'What Was Printed in the 1611 King James Bible?',
            body: 'The 1611 Authorized Version was printed with the thirty-nine books of the Protestant Old Testament, twenty-seven books of the New Testament, and a separate Apocrypha section between them. The Apocrypha commonly contained fourteen separately titled items: First Esdras, Second Esdras, Tobit, Judith, the Rest of Esther, Wisdom of Solomon, Ecclesiasticus or Sirach, Baruch with the Epistle of Jeremiah, the Song of the Three Holy Children, the History of Susanna, Bel and the Dragon, the Prayer of Manasses, First Maccabees, and Second Maccabees. The familiar statement that the 1611 Bible had eighty books comes from adding those fourteen separately listed items to the sixty-six books of the Protestant canon. It describes the organization of that edition, not a universal agreement that all eighty were equally canonical. The translators included the Apocrypha in keeping with an established publishing practice, while the Church of England\u2019s Thirty-Nine Articles distinguished those writings from books used to establish doctrine.',
          },
          {
            heading: 'How the Apocrypha Disappeared from Many Protestant Editions',
            body: 'Over time, Protestant Bible printing increasingly favored editions containing only the sixty-six books recognized as canonical in many Protestant churches. One influential development occurred in 1826, when the British and Foreign Bible Society adopted a policy against using its funds to print or circulate the Apocrypha. This decision influenced Bible distribution on a large scale, although editions including the Apocrypha continued to be published. It would therefore be inaccurate to describe 1885 as the year when the Apocrypha was first removed from Protestant Bibles. The Revised Version of the English Bible appeared in stages during the 1880s, but the movement toward sixty-six-book Protestant editions had begun much earlier. An English Bible printed without the Apocrypha is not necessarily a new translation. It may contain exactly the same wording in Genesis, Isaiah, Matthew, and Romans as another printing that includes the additional section. The difference can lie entirely in the publisher\u2019s selection and arrangement of books.',
          },
          {
            heading: 'The Bibles Along the Road to the King James Version',
            body: 'The history of English Scripture is easier to follow when the major editions are considered in order. The Wycliffite Bible of the late fourteenth century was translated from the Latin Vulgate into Middle English and circulated in handwritten copies. The Gutenberg Bible, produced in Mainz around 1454\u20131455, was a printed Latin Vulgate whose importance lies in its use of movable-type printing. Erasmus\u2019s Novum Instrumentum of 1516 was a printed Greek New Testament that helped make the Greek text available to scholars and translators. William Tyndale\u2019s English New Testament appeared in 1526, translated from Greek. The Coverdale Bible of 1535 was the first complete printed English Bible. The Matthew Bible of 1537 brought together Tyndale\u2019s and Coverdale\u2019s work. The Great Bible of 1539 was intended for use in English churches. The Geneva Bible of 1560 became popular for its accessible format and notes. The Bishops\u2019 Bible of 1568 was produced for public worship. The Douay\u2013Rheims Bible, translated by English Catholics from the Latin Vulgate, appeared in stages between 1582 and 1610. The King James Bible of 1611 followed the Bishops\u2019 Bible as its principal English base while drawing on earlier versions, especially Tyndale\u2019s language.',
          },
          {
            heading: 'A Guide to the Major Bible Traditions',
            body: 'The Hebrew Tanakh is the Jewish collection of Scripture, traditionally counted as twenty-four books. The Septuagint is the ancient Greek translation tradition of Jewish writings, with a manuscript history that includes books beyond the Hebrew collection. The Latin Vulgate is the principal historical Latin biblical tradition of Western Christianity. These are not simply three editions of an identical bound book; they differ in language, textual history, and, in particular manuscripts, contents. The Roman Catholic Bible ordinarily contains seventy-three books: forty-six in the Old Testament and twenty-seven in the New. The Protestant Bible ordinarily contains sixty-six: thirty-nine in the Old Testament and twenty-seven in the New. Orthodox biblical collections may be broader and vary by ecclesiastical tradition. The New Testament collection of twenty-seven books is shared by these major Christian traditions.',
          },
        ],
        keyPoints: [
          {
            title: 'Translation versus canon',
            body: 'The number of books in a Bible is a question of canon \u2014 which writings a religious community recognizes as Scripture \u2014 not a question of translation accuracy. A Bible can be faithfully translated while containing different books from another Bible in the same language.',
          },
          {
            title: 'The Septuagint preserved more books',
            body: 'The ancient Greek translation of Jewish Scripture, begun in Alexandria in the third century BC, preserved writings beyond the Hebrew canon \u2014 including Tobit, Judith, Wisdom, Sirach, Baruch, and Maccabees. These books entered Christian biblical traditions through Greek manuscripts.',
          },
          {
            title: 'The 1611 Bible had eighty books',
            body: 'The original King James Bible contained the thirty-nine Old Testament books, twenty-seven New Testament books, and fourteen Apocryphal items between them \u2014 totaling eighty. The Church of England\u2019s Thirty-Nine Articles distinguished these writings from books used to establish doctrine.',
          },
          {
            title: 'The Apocrypha\u2019s gradual disappearance',
            body: 'The British and Foreign Bible Society\u2019s 1826 policy against funding Apocrypha printing influenced Protestant Bible distribution on a large scale. The movement toward sixty-six-book Protestant editions had begun well before the Revised Version of the 1880s.',
          },
        ],
        timeline: [
          {
            label: 'c. 250 BC',
            title: 'The Septuagint translation begins',
            body: 'Jewish communities in Alexandria begin translating the Torah into Greek. Other Jewish writings are translated in subsequent generations, producing a Greek biblical tradition that includes books beyond the Hebrew canon.',
          },
          {
            label: 'c. 90 BC \u2013 1st century AD',
            title: 'Greek biblical manuscripts circulate',
            body: 'Greek manuscripts preserve a wider range of Jewish writings than the Hebrew canon. Codices Vaticanus, Sinaiticus, and Alexandrinus later preserve portions of this tradition with somewhat varying contents.',
          },
          {
            label: 'c. 390s AD',
            title: 'Jerome and the Prologus Galeatus',
            body: 'Jerome translates much of the Old Testament from Hebrew and distinguishes the Hebrew canon from other Jewish writings in his preface to Samuel and Kings. His views do not settle the reception of those writings in the Western Church.',
          },
          {
            label: '393 / 397',
            title: 'Councils of Hippo and Carthage',
            body: 'Regional church councils produce canon lists that include writings later called deuterocanonical by Catholics. The lists place these books among writings designated for scriptural reading.',
          },
          {
            label: '1534',
            title: 'Luther\u2019s German Bible separates the Apocrypha',
            body: 'Martin Luther places the Apocrypha in a separate section with a heading explaining the books are not held equal to Holy Scripture but are useful and good to read.',
          },
          {
            label: '1546',
            title: 'The Council of Trent defines the Catholic canon',
            body: 'The Council of Trent issues a decree listing the biblical books it receives as sacred and canonical, including Tobit, Judith, Wisdom, Sirach, Baruch, and First and Second Maccabees, and the fuller forms of Esther and Daniel.',
          },
          {
            label: '1611',
            title: 'The King James Bible includes the Apocrypha',
            body: 'The 1611 Authorized Version is printed with the thirty-nine Old Testament books, twenty-seven New Testament books, and fourteen Apocryphal items between them \u2014 totaling eighty books.',
          },
          {
            label: '1826',
            title: 'The British and Foreign Bible Society policy',
            body: 'The British and Foreign Bible Society adopts a policy against using its funds to print or circulate the Apocrypha, influencing Protestant Bible distribution on a large scale and accelerating the movement toward sixty-six-book editions.',
          },
        ],
        reflectivePrompt:
          'The original 1611 King James Bible contained eighty books, not sixty-six. The extra books were part of a centuries-old tradition going back to the Greek Septuagint. They were gradually removed from Protestant editions not by translators but by Bible societies and publishers. Understanding why different Bibles have different books helps us respect both the history of Scripture and the traditions of other Christians. How does knowing this history change the way you think about your own Bible?',
        keyTakeaway:
          'The Old Testament was preserved in both Hebrew and Greek. The Septuagint, begun in Alexandria around 250 BC, transmitted writings beyond the Hebrew canon \u2014 including Tobit, Judith, Wisdom, Sirach, Baruch, and Maccabees. Jerome recognized the distinction in his Prologus Galeatus, but these books continued to circulate in Latin Bibles. The Council of Trent in 1546 defined them as canonical for Catholics, while Protestant reformers placed them in a separate section. The 1611 King James Bible included fourteen Apocryphal items between the Old and New Testaments, totaling eighty books. The British and Foreign Bible Society\u2019s 1826 policy against funding Apocrypha printing accelerated their disappearance from Protestant editions. Catholic Bibles contain seventy-three books, Protestant Bibles sixty-six, and Orthodox collections vary by tradition \u2014 but all share the same twenty-seven-book New Testament.',
      },
      {
        id: 'american-bible',
        number: 112,
        title: 'An English Bible Crosses the Atlantic',
        tagline: 'Printing Scripture in a new nation',
        description:
          'The English Bible crossed the Atlantic with the colonists, but printing Scripture in America faced legal and financial obstacles. Robert Aitken produced the first American English Bible, Bible societies expanded distribution, and the new constitutional order of religious liberty created conditions for the Bible to spread as never before.',
        dateRange: 'c. 1600s \u2013 1800s',
        complete: true,
        sections: [
          {
            heading: 'An English Bible Crosses the Atlantic',
            body: 'By the time permanent English settlements were established along the Atlantic coast of North America, the Bible had already passed through centuries of translation, dispute, printing, and religious reform. The settlers did not bring a single uniform edition. They carried Bibles shaped by the churches and movements from which they came, and those differences traveled with them into the new colonies. The Geneva Bible had been widely used by English Protestants since its publication in 1560. Its compact format and extensive study notes made it practical for household reading, and its influence extended into the early years of English settlement in America. The King James Bible, first published in 1611, gradually became increasingly familiar, especially in communities associated with the Church of England. Neither translation displaced the other overnight. Availability, church allegiance, family inheritance, and the cost of books all affected what readers owned. The English colonies also contained people whose religious lives did not fit the established English church. Puritans, Separatists, Quakers, Baptists, Catholics, and other groups disagreed about worship, church authority, and the proper relationship between civil government and religious belief. The Bible was central to many of their arguments, but agreement about its importance did not produce agreement about its interpretation. For much of the colonial period, imported books supplied the English-speaking population. Printing a complete Bible required a substantial investment in type, paper, labor, and distribution.',
          },
          {
            heading: 'The First Bible Printed in British North America',
            body: 'One of the earliest and most remarkable biblical printing projects in North America was not an English Bible. It was a translation prepared for Indigenous readers in the language now commonly called Massachusett, an Algonquian language spoken in parts of southern New England. The missionary John Eliot worked with Native speakers and assistants to prepare the text. Their contributions were indispensable to a project that required knowledge of a language unfamiliar to European printers and scholars. The New Testament appeared in 1661, followed by the complete Bible in 1663. The full edition was printed at Cambridge, Massachusetts, and is often called the Eliot Indian Bible. Its title began Mamusse Wunneetupanatamwe Up-Biblum God, meaning, in broad terms, the whole holy Bible of God. It was the first complete Bible printed in British North America. The printing was undertaken by Samuel Green and Marmaduke Johnson, with assistance from James Printer, also known as Wowaus, an Indigenous printer who worked in the Cambridge press. The project required special typographical arrangements to represent unfamiliar sounds and long words. The historical setting was complicated. Eliot\u2019s work was connected to efforts to convert Native communities to Christianity and to the creation of so-called praying towns. These communities existed amid expanding English settlement, land pressures, and conflicts that profoundly affected Indigenous peoples. Copies of the Eliot Bible survive today in research libraries and collections. They preserve evidence of a written form of Massachusett and of the collaborative labor that made the translation possible.',
          },
          {
            heading: 'Printing Scripture in the Colonies',
            body: 'The growth of colonial printing did not immediately result in a locally printed English Bible. A Bible was a lengthy and expensive undertaking, and colonial presses operated under economic and political constraints. Printers could import English editions, but producing their own required access to sufficient materials and a market capable of supporting the cost. The first complete Bible printed in America in a European language was a German Bible produced by Christopher Sower, also spelled Sauer, at Germantown, Pennsylvania, in 1743. Sower served the German-speaking communities of Pennsylvania and drew on the Luther Bible tradition. His edition illustrates the multilingual religious life of the colonies. These are distinct milestones: the first Bible printed in British North America was the Eliot Bible in Massachusett in 1663; the first complete Bible printed in America in a European language was Sower\u2019s German Bible in 1743; and the first complete English Bible printed in the United States was Robert Aitken\u2019s edition in 1782. These descriptions refer to different milestones, not competing claims to the same event.',
          },
          {
            heading: 'The Revolution and the Problem of Supply',
            body: 'When conflict between Britain and its American colonies developed into war in 1775, imported goods became more difficult to obtain. Printed Bibles were among the books affected by disruptions to Atlantic commerce. The scarcity prompted proposals for domestic printing and for importing Bibles from other European sources. In 1777, a memorial presented to the Continental Congress raised the shortage of Bibles. A congressional committee considered the matter and recommended importing 20,000 Bibles from Holland, Scotland, or elsewhere. Congress did not establish a government Bible press or commission a new American translation. The surviving congressional records describe a proposed response to scarcity, not a general policy of government-sponsored Bible publication. The episode is sometimes retold as though the Continental Congress ordered a Bible to be printed and distributed throughout the colonies. That description goes beyond what the records support. The committee\u2019s recommendation concerned the importation of existing Bibles; the subsequent printing of an American English Bible was undertaken by a private printer.',
          },
          {
            heading: 'Robert Aitken and the First American English Bible',
            body: 'Robert Aitken was a Philadelphia printer who undertook the difficult task of producing a complete English Bible during the Revolutionary War. He printed an English New Testament in 1777 and, in 1782, completed an edition containing both the Old and New Testaments. His Bible followed the King James translation and was issued in a relatively small format. Aitken petitioned the Continental Congress concerning his undertaking. In September 1782, Congress received a committee report that described an examination of the edition by two chaplains, William White and George Duffield. The chaplains commended the printing as accurate and suitable for publication. Congress recommended Aitken\u2019s edition to the inhabitants of the United States. This recommendation was significant, but its nature should be described carefully. Congress did not translate the text, finance the original printing, purchase copies for every citizen, or create a national Bible. Aitken\u2019s Bible remained a privately printed commercial publication. The congressional action acknowledged the quality and usefulness of an edition already produced. The Aitken Bible is sometimes called the \u201cBible of the Revolution.\u201d The name refers to the historical period in which it appeared and the unusual congressional recommendation it received. The practical difficulties of the project were substantial. Paper and type were costly, skilled labor was limited, and wartime uncertainty complicated trade. Aitken\u2019s edition nonetheless demonstrated that a complete English Bible could be produced by an American printer rather than imported from Britain.',
          },
          {
            heading: 'Religious Liberty and the New Constitutional Order',
            body: 'The establishment of the United States did not settle the religious disagreements inherited from colonial society. Some states retained religious tests or supported particular churches, while others moved toward broader legal protections for religious practice. The federal Constitution of 1787 prohibited religious tests for federal office in Article VI, a provision that departed from the practice of several earlier political systems. The First Amendment, ratified in 1791, prohibited Congress from making a law respecting an establishment of religion or prohibiting its free exercise. These provisions did not declare the Bible irrelevant to American life. They placed important limits on the religious powers of the federal government and protected religious exercise against congressional interference. The constitutional language emerged from sustained debates. Baptists and other dissenting groups had long objected to government preference for particular churches. James Madison and Thomas Jefferson became influential advocates of religious liberty, although their arguments and beliefs were not identical. In Virginia, the Statute for Religious Freedom, drafted by Jefferson and enacted in 1786, rejected coercion in matters of religious belief and provided an important example for later discussion. For Bible readers, religious liberty meant that the circulation of Scripture was increasingly sustained by churches, families, booksellers, printers, and voluntary associations rather than by a single national church. The same legal order also protected those who interpreted Scripture differently, followed other religious traditions, or rejected religious belief.',
          },
          {
            heading: 'Bible Societies and the Expansion of Distribution',
            body: 'After independence, American printing expanded rapidly. The development of transportation networks, commercial publishing, and voluntary religious organizations changed the scale on which Bibles could be produced and circulated. Local Bible societies appeared in the early nineteenth century, following developments already underway in Britain and elsewhere. The American Bible Society was founded in 1816 to encourage the publication and distribution of Scripture. It brought together supporters from different Protestant denominations who believed that the Bible should be widely available. Its work relied on donations, printing arrangements, local auxiliaries, and networks of volunteers and clergy. Bible societies helped make printed Scripture more accessible, but their efforts also involved choices about translation and the biblical canon. In the English-speaking Protestant world, the King James Bible was widely favored. Many societies distributed editions without the Apocrypha, reflecting the canonical preferences of the Protestant organizations that supported them. The growth of Bible distribution did not eliminate disagreements about Scripture. Catholic communities used their own approved translations, including the Douay\u2013Rheims tradition, and Jewish communities maintained the Hebrew Bible and developed English translations for their readers. Indigenous-language translations continued in many regions, sometimes through missionary institutions and sometimes through the substantial intellectual and linguistic work of Indigenous translators themselves.',
          },
          {
            heading: 'The Bible in Public Life and Private Homes',
            body: 'During the eighteenth and nineteenth centuries, biblical language appeared frequently in American sermons, newspapers, speeches, literature, and political debate. Familiar phrases from the King James Bible became part of the vocabulary of English-speaking communities, even among readers who did not share the same religious convictions. Household Bibles often served purposes beyond worship. Families recorded births, marriages, and deaths in their pages, turning a printed religious book into a lasting family record. Churches used Scripture in preaching and instruction, while schools and charitable societies sometimes incorporated biblical readings into education. Yet the presence of the Bible in public culture should not be mistaken for agreement about its interpretation. Protestants debated baptism, church government, salvation, and biblical authority. Catholics and Protestants disagreed over the canon and the relationship between Scripture and tradition. The Bible also figured in struggles over national identity. Supporters of abolition drew on biblical themes of liberation, justice, and human dignity, while defenders of slavery cited other passages in support of their position. Reformers and their opponents could appeal to the same collection of sacred writings. These conflicts reveal the difference between possessing a biblical text and agreeing about its meaning.',
          },
          {
            heading: 'What the American Story Reveals',
            body: 'The history of the Bible in America began long before the United States existed. It involved imported English translations, Indigenous-language scholarship, German printing, wartime shortages, private publishing, and the creation of voluntary organizations devoted to distributing Scripture. The central milestones are distinct. Eliot\u2019s Massachusett Bible of 1663 was the first complete Bible printed in British North America. Christopher Sower\u2019s German Bible of 1743 was the first complete Bible printed there in a European language. Robert Aitken\u2019s 1782 King James edition was the first complete English Bible printed in the United States and received a formal recommendation from the Continental Congress. None of these achievements requires exaggeration to establish its historical significance. Across these developments, the question of who could obtain and read Scripture remained closely connected to language, printing technology, money, religious institutions, and political authority. The ability to print a Bible did not guarantee that everyone could read one, and the freedom to read it did not require agreement about its meaning. The journey from manuscript copying to American mass printing was neither a straight line nor the achievement of a single person. It depended on generations of scribes, translators, scholars, printers, patrons, readers, and communities.',
          },
        ],
        keyPoints: [
          {
            title: 'The first American Bible was not in English',
            body: 'John Eliot\u2019s Massachusett Bible of 1663, printed at Cambridge, Massachusetts, was the first complete Bible printed in British North America. It was prepared with Native speakers and assistants, including the Indigenous printer James Printer (Wowaus).',
          },
          {
            title: 'Three distinct firsts',
            body: 'The Eliot Bible (1663) was the first complete Bible in British North America. Sower\u2019s German Bible (1743) was the first in a European language. Aitken\u2019s English Bible (1782) was the first complete English Bible printed in the United States. These are different milestones, not competing claims.',
          },
          {
            title: 'The Aitken Bible and Congress',
            body: 'Robert Aitken\u2019s 1782 King James edition received a congressional recommendation after chaplains examined it. Congress did not translate, finance, or create a national Bible. The Aitken Bible was a privately printed commercial publication, sometimes called the \u201cBible of the Revolution.\u201d',
          },
          {
            title: 'Religious liberty and Bible distribution',
            body: 'The First Amendment (1791) and state-level religious liberty statutes created a legal order in which Bible circulation was sustained by churches, families, and voluntary associations like the American Bible Society (founded 1816) rather than by a single national church.',
          },
        ],
        timeline: [
          {
            label: '1661 / 1663',
            title: 'The Eliot Indian Bible',
            body: 'John Eliot\u2019s Massachusett New Testament appears in 1661 and the complete Bible in 1663, printed at Cambridge, Massachusetts. It is the first complete Bible printed in British North America, prepared with Native speakers including the Indigenous printer James Printer.',
          },
          {
            label: '1743',
            title: 'Sower\u2019s German Bible',
            body: 'Christopher Sower prints a German Bible at Germantown, Pennsylvania, drawing on the Luther Bible tradition. It is the first complete Bible printed in America in a European language, serving German-speaking communities.',
          },
          {
            label: '1775 \u2013 1777',
            title: 'Wartime Bible shortages',
            body: 'The Revolutionary War disrupts Atlantic commerce, making imported Bibles scarce. In 1777, a memorial to the Continental Congress raises the shortage. A committee recommends importing 20,000 Bibles, but Congress does not establish a government Bible press.',
          },
          {
            label: '1782',
            title: 'Robert Aitken\u2019s English Bible',
            body: 'Philadelphia printer Robert Aitken completes the first English Bible printed in the United States, following the King James translation. Congress recommends the edition after chaplains examine it. It is sometimes called the \u201cBible of the Revolution.\u201d',
          },
          {
            label: '1786',
            title: 'Virginia Statute for Religious Freedom',
            body: 'Thomas Jefferson\u2019s statute, enacted in Virginia in 1786, rejects coercion in matters of religious belief and provides an important example for later federal protections.',
          },
          {
            label: '1787 / 1791',
            title: 'The Constitution and the First Amendment',
            body: 'The Constitution of 1787 prohibits religious tests for federal office (Article VI). The First Amendment, ratified in 1791, prohibits Congress from establishing a religion or prohibiting its free exercise.',
          },
          {
            label: '1816',
            title: 'The American Bible Society',
            body: 'The American Bible Society is founded to encourage the publication and distribution of Scripture, bringing together supporters from different Protestant denominations. Its work relies on donations, printing arrangements, and networks of volunteers.',
          },
          {
            label: '19th century',
            title: 'Mass distribution and ongoing disagreement',
            body: 'Bible societies and mass printing make inexpensive copies widely available. The King James Bible remains influential, but Catholics use the Douay\u2013Rheims tradition, Jewish communities maintain the Hebrew Bible, and disagreements over slavery and interpretation reveal the difference between possessing the Bible and agreeing about its meaning.',
          },
        ],
        reflectivePrompt:
          'The first complete Bible printed in America was not in English but in Massachusett, an Algonquian language, prepared with Native speakers. The first English Bible printed in America was produced by a private printer during the Revolutionary War, not by the government. And the new constitutional order protected the freedom of every person to read Scripture \u2014 or not \u2014 according to conscience. What does the American story teach you about the relationship between the Bible, freedom, and the communities that produced it?',
        keyTakeaway:
          'The Bible crossed the Atlantic with English colonists who carried different translations \u2014 Geneva Bibles, King James Bibles, and others. The first complete Bible printed in British North America was John Eliot\u2019s Massachusett Bible of 1663, prepared with Native speakers. Christopher Sower\u2019s German Bible of 1743 was the first in a European language. Robert Aitken\u2019s 1782 King James edition was the first complete English Bible printed in the United States, receiving a congressional recommendation. The First Amendment (1791) created a legal order in which Bible circulation was sustained by voluntary associations like the American Bible Society (1816) rather than by a national church. Biblical language shaped American public life, but possession of the Bible did not produce agreement about its meaning \u2014 as debates over slavery and religious freedom revealed.',
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
