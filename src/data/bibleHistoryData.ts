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
