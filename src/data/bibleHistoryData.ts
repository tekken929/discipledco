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
