import { useState } from 'react';
import { Users, ScrollText, Book, Calendar, ArrowLeft, Shield, Search, ChevronDown, ChevronUp, Quote } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Link } from 'react-router-dom';
import { ReturnToHome } from '../components/ReturnToHome';

type AuthorEntry = {
  name: string;
  dates: string;
  books: string;
  background: string;
  detail?: string;
  color: string;
};

const OT_PENTATEUCH: AuthorEntry[] = [
  {
    name: 'Moses',
    dates: 'c. 1446–1406 BC',
    books: 'Genesis, Exodus, Leviticus, Numbers, Deuteronomy',
    background: 'Prince of Egypt, prophet, lawgiver. Educated in the courts of Pharaoh (Acts 7:22), Moses led Israel out of 400 years of slavery. He received the Law on Mount Sinai and wrote the foundation of all Scripture: the Torah. Genesis reaches back to creation itself; Deuteronomy is Moses\'s final address before Israel enters the Promised Land. Jesus himself affirms Mosaic authorship (John 5:46–47).',
    detail: 'The internal evidence is strong: first-person accounts, Egyptian vocabulary, and knowledge of desert conditions all point to a 15th-century BC author embedded in the narrative.',
    color: 'blue',
  },
];

const OT_HISTORY: AuthorEntry[] = [
  {
    name: 'Joshua',
    dates: 'c. 1406–1380 BC',
    books: 'Joshua',
    background: 'Moses\'s military general and successor. Led the Israelites into Canaan, oversaw its conquest and the division of land among the twelve tribes. Joshua 24:26 specifically notes that "Joshua wrote these words in the Book of the Law of God." Emphasizes God\'s faithfulness to every promise He made.',
    color: 'green',
  },
  {
    name: 'Samuel (and possibly Nathan & Gad)',
    dates: 'c. 1100–1000 BC',
    books: 'Judges, Ruth, 1 Samuel (2 Samuel compiled by Nathan & Gad)',
    background: 'The last judge and first major prophet of Israel. Samuel anointed both Saul and David as kings. The Talmud (Baba Bathra 14b) attributes Judges, Ruth, and 1 Samuel to him. 1 Chronicles 29:29 references records kept by Nathan the prophet and Gad the seer that contributed to the Samuel narratives.',
    detail: 'Ruth is set in the time of the judges and is universally considered a beautiful historical novella. Its genealogy (Ruth 4:17–22) points to David and ultimately to Christ.',
    color: 'amber',
  },
  {
    name: '1 & 2 Kings (Unknown prophetic author, possibly Jeremiah)',
    dates: 'c. 560–540 BC',
    books: '1 Kings, 2 Kings',
    background: 'Traditionally attributed to Jeremiah based on thematic and linguistic similarities. The books cover the reigns of Solomon through the fall of Jerusalem in 586 BC. They were compiled from earlier royal annals ("Book of the Acts of Solomon," "Book of the Chronicles of the Kings of Israel"), demonstrating use of primary sources. The theological lens is consistently Deuteronomistic—evaluating kings by their faithfulness to God\'s covenant.',
    color: 'teal',
  },
  {
    name: 'Ezra (compiler of 1 & 2 Chronicles)',
    dates: 'c. 450–430 BC',
    books: '1 Chronicles, 2 Chronicles, Ezra',
    background: 'A priest and scribe "skilled in the Law of Moses" (Ezra 7:6). Chronicles retells Israel\'s history from Adam to the Babylonian exile with a priestly focus on worship and the Davidic covenant. The Talmud (Baba Bathra 15a) attributes Chronicles and Ezra to the same hand. Ezra led the second group of returnees from Babylon and reinstituted the public reading of God\'s Law.',
    color: 'orange',
  },
  {
    name: 'Nehemiah',
    dates: 'c. 430 BC',
    books: 'Nehemiah',
    background: 'Cupbearer to the Persian King Artaxerxes. Nehemiah left comfort and royal security to rebuild Jerusalem\'s walls in 52 days—a feat even his enemies acknowledged was God\'s doing (Neh. 6:16). His memoir-style writing is intensely personal and theologically rich, emphasizing prayer, reform, and covenant renewal.',
    color: 'rose',
  },
  {
    name: 'Mordecai (traditionally) or Ezra',
    dates: 'c. 460–400 BC',
    books: 'Esther',
    background: 'The book of Esther never names God explicitly, yet His providence permeates every scene. It is traditionally associated with Mordecai, though some scholars attribute it to Ezra. Set in the Persian court of Susa, it demonstrates that God\'s protection of His people does not require miraculous intervention to be unmistakable.',
    color: 'purple',
  },
];

const OT_POETRY: AuthorEntry[] = [
  {
    name: 'Unknown (possibly Moses, possibly Job himself)',
    dates: 'c. 2100–1500 BC — likely the oldest book in the Bible',
    books: 'Job',
    background: 'Job is widely considered the oldest book of Scripture in terms of the era it describes. The patriarchal setting (no mention of the Mosaic Law or Israel as a nation) places it in the pre-Exodus world. Moses is sometimes proposed as the author given the Hebrew style and the Egyptian parallels, but the author is ultimately unknown. Job confronts the deepest human questions about suffering, justice, and the nature of God—and finds answers not in explanation, but in encounter with the Divine.',
    detail: 'C.S. Lewis called the problem of pain "the most formidable objection to Christianity"—and Job is Scripture\'s most honest engagement with that problem.',
    color: 'slate',
  },
  {
    name: 'David',
    dates: 'c. 1010–970 BC',
    books: 'Psalms 3–9, 11–32, 34–41, 51–65, 68–70, 86, 101, 103, 108–110, 122, 124, 131, 133, 138–145 (and more)',
    background: 'Shepherd, warrior, king, and poet. David wrote at least 73 psalms—ranging from praise (Psalm 23) to repentance (Psalm 51) to lament (Psalm 22, which foreshadows Christ\'s crucifixion with striking precision). His raw honesty before God makes the Psalms the most personally read section of the Bible across all cultures and centuries.',
    detail: 'Psalm 22 opens with the exact words Jesus quoted on the cross (Matt. 27:46) and contains details of crucifixion written 1,000 years before that form of execution existed.',
    color: 'purple',
  },
  {
    name: 'Asaph',
    dates: 'c. 1010–970 BC',
    books: 'Psalms 50, 73–83',
    background: 'Chief musician appointed by David (1 Chron. 16:5). Asaph\'s psalms wrestle deeply with theodicy—the apparent prosperity of the wicked and the suffering of the righteous (Psalm 73 is one of the most philosophically searching psalms in the canon). He was a seer as well as a worship leader (2 Chron. 29:30).',
    color: 'pink',
  },
  {
    name: 'Sons of Korah',
    dates: 'c. 1000–900 BC',
    books: 'Psalms 42–49, 84–85, 87–88',
    background: 'A guild of Levitical singers descended from the Korah who rebelled against Moses (Num. 16). Remarkably, his descendants were spared and became some of Israel\'s most gifted worship composers. Psalm 84 ("How lovely is your dwelling place") is among the most beloved expressions of longing for God in all of Scripture.',
    color: 'indigo',
  },
  {
    name: 'Heman & Ethan (Ezrahites)',
    dates: 'c. 1000 BC',
    books: 'Psalm 88 (Heman), Psalm 89 (Ethan)',
    background: 'Two of the wisest men in Israel, mentioned alongside Solomon (1 Kings 4:31). Heman\'s Psalm 88 is perhaps the darkest in the Psalter—ending with no resolution, only raw darkness—a reminder that lament is a valid form of prayer. Ethan\'s Psalm 89 meditates on the Davidic covenant and God\'s faithfulness even when circumstances seem to contradict it.',
    color: 'cyan',
  },
  {
    name: 'Solomon',
    dates: 'c. 970–930 BC',
    books: 'Proverbs (most of it), Ecclesiastes, Song of Solomon',
    background: 'The wisest man who ever lived (1 Kings 3:12), Solomon wrote or collected the bulk of Proverbs. Ecclesiastes is his reflection in later life on the vanity of pursuing meaning apart from God—every avenue he explored (pleasure, wisdom, wealth, work) ultimately proved hollow. Song of Solomon is a poetic celebration of human love as a reflection of God\'s love for His people.',
    detail: 'R.C. Sproul noted that Ecclesiastes is the most honest philosophical treatise in the ancient world—it takes the secular premise ("life under the sun") to its logical conclusion and finds it bankrupt.',
    color: 'yellow',
  },
  {
    name: 'Agur son of Jakeh',
    dates: 'c. 700–900 BC (uncertain)',
    books: 'Proverbs 30',
    background: 'Almost nothing is known about Agur. His contribution opens with striking humility: "I am too stupid to be a man; I have not the understanding of a man" (Prov. 30:2). This self-deprecation before God sets the tone for a chapter rich in numerical sayings and vivid nature imagery.',
    color: 'lime',
  },
  {
    name: 'King Lemuel (words of his mother)',
    dates: 'c. 900 BC (uncertain)',
    books: 'Proverbs 31',
    background: 'The final chapter of Proverbs records wisdom given by a mother to her son, the king. The famous "Proverbs 31 woman" passage is actually a Hebrew acrostic poem—each verse begins with a successive letter of the Hebrew alphabet—a sign of careful literary craft.',
    color: 'emerald',
  },
];

const OT_MAJOR_PROPHETS: AuthorEntry[] = [
  {
    name: 'Isaiah',
    dates: 'c. 740–680 BC',
    books: 'Isaiah',
    background: 'Isaiah ministered under four kings of Judah and is often called "the evangelical prophet" for his sweeping Messianic prophecies. Isaiah 53 describes a "suffering servant" who bears the sins of others with extraordinary specificity—written 700 years before the crucifixion. Dead Sea Scroll evidence (1QIsa) from 125 BC shows the text was transmitted with remarkable accuracy.',
    detail: 'Fulfilled prophecies include: born of a virgin (7:14), ministry in Galilee (9:1–2), entry on a donkey (62:11), betrayal for silver (not directly Isaiah but echoed), and the crucifixion details of Isaiah 53.',
    color: 'red',
  },
  {
    name: 'Jeremiah',
    dates: 'c. 627–585 BC',
    books: 'Jeremiah, Lamentations',
    background: 'Called as a young man, Jeremiah prophesied for 40 years—warning of Jerusalem\'s fall, enduring imprisonment, and being ignored. He lived to see everything he predicted come true when Babylon destroyed Jerusalem in 586 BC. Lamentations is his poetic mourning over that destruction. He also prophesied a "new covenant" written on the heart (Jer. 31:31–34)—quoted extensively in Hebrews.',
    color: 'slate',
  },
  {
    name: 'Ezekiel',
    dates: 'c. 593–571 BC',
    books: 'Ezekiel',
    background: 'A priest taken to Babylon in the second deportation of 597 BC. Ezekiel received elaborate visions of God\'s glory, Israel\'s sin, and the promise of national and spiritual restoration. His "valley of dry bones" vision (Ezek. 37) pictures Israel\'s resurrection as a nation—and more broadly, God\'s power to bring life from death.',
    color: 'sky',
  },
  {
    name: 'Daniel',
    dates: 'c. 605–530 BC',
    books: 'Daniel',
    background: 'Taken to Babylon as a young nobleman, Daniel rose to the highest levels of government while maintaining uncompromising faithfulness to God. His prophecies of successive world empires (Babylon, Persia, Greece, Rome—Daniel 2 & 7) were so accurate that skeptics long claimed they must have been written after the fact. The discovery of the Dead Sea Scrolls confirmed the book existed before the events skeptics claimed it predicted.',
    color: 'violet',
  },
];

const OT_MINOR_PROPHETS: AuthorEntry[] = [
  { name: 'Hosea', dates: 'c. 755–715 BC', books: 'Hosea', background: 'God commanded Hosea to marry a woman who would be unfaithful—a living parable of Israel\'s spiritual adultery. Through personal pain, Hosea proclaimed God\'s relentless, covenant love. His opening chapters contain some of Scripture\'s most tender expressions of divine mercy.', color: 'orange' },
  { name: 'Joel son of Pethuel', dates: 'c. 835 BC (or possibly 500s BC)', books: 'Joel', background: 'Joel interpreted a devastating locust plague as a foretaste of the Day of the Lord—God\'s coming judgment. His prophecy in Joel 2:28–29 ("your sons and daughters will prophesy...") was directly quoted by Peter at Pentecost (Acts 2:17) as the fulfillment of the outpouring of the Holy Spirit.', color: 'amber' },
  { name: 'Amos', dates: 'c. 760–750 BC', books: 'Amos', background: 'A shepherd and sycamore-fig farmer from Tekoa—not a professional prophet. God called him specifically to confront the comfortable elite of Israel. Amos is one of the Bible\'s strongest voices against social injustice and religious hypocrisy that lacks genuine righteousness.', color: 'teal' },
  { name: 'Obadiah', dates: 'c. 586 BC', books: 'Obadiah', background: 'The shortest book in the Old Testament. Obadiah pronounces judgment on Edom (descendants of Esau) for gloating over Jerusalem\'s destruction. A reminder that God holds every nation accountable, not only Israel.', color: 'rose' },
  { name: 'Jonah son of Amittai', dates: 'c. 785–775 BC', books: 'Jonah', background: 'A prophet from Gath-hepher, mentioned also in 2 Kings 14:25. Jonah\'s resistance to God\'s call and his eventual obedience reveal both human nature and the breathtaking scope of God\'s mercy—even for Assyria, Israel\'s greatest enemy. Jesus himself cited Jonah\'s three days in the fish as a sign of his own death and resurrection (Matt. 12:40).', color: 'sky' },
  { name: 'Micah of Moresheth', dates: 'c. 735–700 BC', books: 'Micah', background: 'A contemporary of Isaiah from a rural village. Micah 5:2 precisely foretells the Messiah\'s birthplace: "But you, O Bethlehem Ephrathah, who are too little to be among the clans of Judah, from you shall come forth for me one who is to be ruler in Israel." This is the passage the chief priests quoted to Herod (Matt. 2:4–6) 700 years later.', color: 'indigo' },
  { name: 'Nahum the Elkoshite', dates: 'c. 663–612 BC', books: 'Nahum', background: 'A century after Jonah\'s ministry brought Nineveh to repentance, the city had returned to brutality. Nahum announces its certain destruction. Nineveh fell in 612 BC, exactly as prophesied—so thoroughly that its location was lost for centuries.', color: 'purple' },
  { name: 'Habakkuk', dates: 'c. 609–598 BC', books: 'Habakkuk', background: 'Habakkuk is unique in that he questions God directly: "How long, O LORD, must I call for help, but you do not listen?" (1:2). God answers—not by removing the problem but by expanding Habakkuk\'s vision. The climax is one of Scripture\'s greatest declarations of faith: "Though the fig tree should not blossom... yet I will rejoice in the LORD" (3:17–18).', color: 'green' },
  { name: 'Zephaniah', dates: 'c. 640–609 BC', books: 'Zephaniah', background: 'A descendant of King Hezekiah, making him royalty. Zephaniah prophesied during the reforming reign of Josiah, calling for genuine repentance. He balances sobering warnings of judgment with one of the most joyful visions of restoration in Scripture: "The LORD your God is in your midst...he will rejoice over you with gladness...he will exult over you with loud singing" (3:17).', color: 'cyan' },
  { name: 'Haggai', dates: 'c. 520 BC', books: 'Haggai', background: 'The first post-exile prophet. After the return from Babylon, the people had rebuilt their own houses while the temple lay in ruins. Haggai\'s short but pointed messages spurred the people to action. The temple was completed four years later. Haggai also looked forward to a "latter glory" of God\'s house—fulfilled ultimately in Christ.', color: 'emerald' },
  { name: 'Zechariah son of Berechiah', dates: 'c. 520–480 BC', books: 'Zechariah', background: 'A younger contemporary of Haggai. Zechariah\'s visions are among the most Messianic in the Old Testament: the king entering Jerusalem on a donkey (9:9, quoted in Matt. 21:5), the thirty pieces of silver (11:12–13, referenced in Matt. 27:9), the piercing of the one they have pierced (12:10, cited in John 19:37). Eight night visions and two oracles of restoration and future glory.', color: 'blue' },
  { name: 'Malachi', dates: 'c. 430 BC', books: 'Malachi', background: 'The last voice in the Old Testament. Malachi confronted a post-exile community that had grown spiritually lax—offering inferior sacrifices and divorcing wives. He closes with the promise of a coming messenger (John the Baptist) who would prepare the way, and the "sun of righteousness" rising with healing in its wings. After Malachi, 400 years of prophetic silence—until the voice of one crying in the wilderness.', color: 'red' },
];

type EvidenceItem = { title: string; description: string; detail: string; color: string; };

const manuscriptEvidence: EvidenceItem[] = [
  {
    title: 'Dead Sea Scrolls (Discovered 1947)',
    description: 'In 1947, a Bedouin shepherd discovered ancient scrolls in caves near Qumran. Among them were manuscripts of nearly every Old Testament book—dating to 125–200 BC, pushing the oldest known OT manuscripts back over 1,000 years from the previously oldest copies.',
    detail: 'The Great Isaiah Scroll (1QIsa) is virtually identical to the Masoretic text used in modern Bibles—word for word, chapter for chapter. This demonstrates that the Old Testament was transmitted with extraordinary fidelity across a millennium of copying. Wes Huff regularly cites the Dead Sea Scrolls as one of the most powerful evidences for the reliability of the biblical text.',
    color: 'blue',
  },
  {
    title: 'New Testament Manuscripts — The Numbers Are Staggering',
    description: 'No ancient document comes close to the NT in manuscript quantity and proximity to original composition.',
    detail: '5,800+ Greek NT manuscripts · 10,000+ Latin manuscripts · 9,300+ other early translations = over 24,000 total manuscript copies. Compare: Julius Caesar\'s Gallic Wars — 251 manuscripts, earliest copy 950 years after writing. Homer\'s Iliad — 1,800 manuscripts. The NT is in a class entirely its own. As scholars Norman Geisler and William Nix concluded: "No other book of the ancient world even comes close to the NT in terms of manuscript attestation."',
    color: 'green',
  },
  {
    title: 'Rylands Papyrus P52 — Earliest NT Fragment',
    description: 'A small papyrus fragment found in Egypt containing verses from John 18, dated to approximately AD 117–138—within a generation of the Gospel\'s composition.',
    detail: 'This fragment demolishes the once-popular claim that John was written late (2nd–3rd century). It was found in Egypt, meaning John\'s Gospel had already traveled hundreds of miles from its place of origin within decades. The image of P52 is displayed elsewhere in this app—one of the most physically tangible pieces of evidence for the early dating of Scripture.',
    color: 'amber',
  },
  {
    title: 'Early Church Fathers Quotations',
    description: 'Even if every New Testament manuscript were destroyed, the NT could be reconstructed almost entirely from quotations in the writings of early church fathers like Ignatius (c. AD 107), Polycarp (c. AD 110), and Clement of Rome (c. AD 96).',
    detail: 'Sir David Dalrymple calculated that all but 11 verses of the NT could be recovered from patristic citations alone. These are independent chains of transmission that all converge on the same text—confirming that the NT canon was recognized and circulating within the lifetime of eyewitnesses.',
    color: 'purple',
  },
  {
    title: 'The Septuagint (LXX) — 250 BC',
    description: 'The Greek translation of the Hebrew Old Testament, commissioned in Alexandria around 250 BC. Jesus and Paul frequently quoted from it. Its existence proves the OT was complete before the NT was written.',
    detail: 'When NT authors say "as it is written," they are often quoting the LXX. This translation was in widespread use throughout the Greek-speaking world—showing that the Jewish scriptures were recognized as authoritative not just in Palestine but across the ancient Mediterranean.',
    color: 'red',
  },
];

const archaeologicalEvidence: EvidenceItem[] = [
  {
    title: 'Tel Dan Stele (1993)',
    description: 'Discovered in northern Israel, this 9th-century BC Aramaic inscription references "the House of David"—the first extrabiblical mention of David as the founder of a royal dynasty.',
    detail: 'Prior to this discovery, some scholars denied the historical existence of David. The inscription, made by a neighboring king celebrating his military victories, casually references the Davidic dynasty as a known political reality—exactly as the Bible describes.',
    color: 'blue',
  },
  {
    title: 'Pontius Pilate Inscription (1961)',
    description: 'A limestone block found at Caesarea Maritima bearing the Latin inscription "Pontius Pilatus, Prefect of Judaea."',
    detail: 'For centuries, some critics claimed Pilate was a legendary figure. This stone, now in the Israel Museum, confirms his exact title and role—matching perfectly with Luke\'s careful historical references. Luke is widely regarded by historians as one of the most precise ancient historians for his attention to titles and political detail.',
    color: 'amber',
  },
  {
    title: 'Pool of Siloam (2004)',
    description: 'Workers repairing a water main in Jerusalem\'s City of David uncovered the first-century Pool of Siloam—exactly where Jesus sent a blind man to wash (John 9:7).',
    detail: 'This physical location, lost for centuries, was verified by archaeologists. John\'s Gospel has been confirmed repeatedly by archaeology: the Pool of Bethesda (John 5:2), the Praetorium, and the pavement (John 19:13) have all been excavated and verified.',
    color: 'teal',
  },
  {
    title: 'Hezekiah\'s Tunnel (Confirmed)',
    description: 'A 533-metre tunnel carved beneath Jerusalem to bring water inside the city walls, mentioned in 2 Kings 20:20 and 2 Chronicles 32:30.',
    detail: 'The Siloam Inscription, discovered in the tunnel in 1880, records the moment the two groups of workers met while digging from opposite ends—matching the Bible\'s account of Hezekiah\'s engineering feat during the Assyrian siege of 701 BC.',
    color: 'green',
  },
  {
    title: 'The Mesha Stele (c. 840 BC)',
    description: 'A Moabite stone inscribed by King Mesha of Moab, referencing the God of Israel (YHWH), the tribe of Gad, and events matching those in 2 Kings 3.',
    detail: 'This stone—one of the most significant archaeological finds in biblical studies—was inscribed by a political opponent of Israel, yet corroborates the biblical record of the Moabite king, the territory of Gad, and the worship of YHWH in ancient Israel.',
    color: 'orange',
  },
  {
    title: 'Cyrus Cylinder (539 BC)',
    description: 'A clay cylinder recording Cyrus the Great\'s policy of returning displaced peoples to their homelands—matching Isaiah 44:28 and Ezra 1:1–4 precisely.',
    detail: 'Isaiah 44:28 names Cyrus as the one who will authorize the rebuilding of Jerusalem—written approximately 150 years before Cyrus was born. The Cyrus Cylinder, held in the British Museum, confirms Cyrus enacted exactly this policy. Critics once claimed this was impossible; the archaeology simply confirms what the text says.',
    color: 'red',
  },
];

const scholarQuotes = [
  {
    quote: 'I am trying here to prevent anyone from saying the really foolish thing that people often say about Him: "I\'m ready to accept Jesus as a great moral teacher, but I don\'t accept His claim to be God." A man who was merely a man and said the sort of things Jesus said would not be a great moral teacher. He would either be a lunatic—on the level with the man who says he is a poached egg—or else he would be the Devil of Hell. You must make your choice.',
    author: 'C.S. Lewis',
    work: 'Mere Christianity',
    note: 'Lewis\'s "Lord, Liar, or Lunatic" argument cuts through the comfortable middle ground and forces a definitive response to Jesus\'s own claims.',
  },
  {
    quote: 'The Bible is not simply a book of religious opinions. It is the inspired Word of God. When we say the Bible is inspired, we mean that God himself superintended the writing of it so that the words, as originally given, are without error in everything they affirm.',
    author: 'R.C. Sproul',
    work: 'Knowing Scripture',
    note: 'Sproul was meticulous in distinguishing the doctrine of inerrancy from fundamentalism—grounding it in careful historical and theological scholarship.',
  },
  {
    quote: 'The New Testament has more manuscript copies, more early copies, and a shorter gap between composition and earliest manuscript than any other work of antiquity. If you reject the New Testament on textual grounds, you must reject all of ancient history—because nothing else even comes close to its manuscript attestation.',
    author: 'Wes Huff',
    work: 'Defending the Bible\'s Reliability (Apologetics lectures)',
    note: 'Huff\'s approach applies the bibliographic test—the same standard historians use for any ancient document—and demonstrates that the NT passes with unmatched results.',
  },
  {
    quote: 'The early dating of Paul\'s letters places them within decades of the events they describe, while eyewitnesses and hostile witnesses were still alive. This is not mythology; this is reportage.',
    author: 'Wes Huff',
    work: 'On the Historicity of the Resurrection',
    note: 'Paul\'s creedal statement in 1 Corinthians 15:3–8 is dated by most NT scholars to within 2–5 years of the crucifixion—among the earliest historical testimony to the resurrection.',
  },
];

type SectionProps = { entry: AuthorEntry };

function AuthorCard({ entry }: SectionProps) {
  const [expanded, setExpanded] = useState(false);
  const colorMap: Record<string, string> = {
    blue: 'border-blue-500 text-blue-600 dark:text-blue-400',
    green: 'border-green-500 text-green-600 dark:text-green-400',
    amber: 'border-amber-500 text-amber-600 dark:text-amber-400',
    purple: 'border-purple-500 text-purple-600 dark:text-purple-400',
    pink: 'border-pink-500 text-pink-600 dark:text-pink-400',
    yellow: 'border-yellow-500 text-yellow-600 dark:text-yellow-400',
    cyan: 'border-cyan-500 text-cyan-600 dark:text-cyan-400',
    red: 'border-red-500 text-red-600 dark:text-red-400',
    orange: 'border-orange-500 text-orange-600 dark:text-orange-400',
    teal: 'border-teal-500 text-teal-600 dark:text-teal-400',
    indigo: 'border-indigo-500 text-indigo-600 dark:text-indigo-400',
    sky: 'border-sky-500 text-sky-600 dark:text-sky-400',
    slate: 'border-slate-500 text-slate-600 dark:text-slate-400',
    rose: 'border-rose-500 text-rose-600 dark:text-rose-400',
    lime: 'border-lime-500 text-lime-600 dark:text-lime-400',
    emerald: 'border-emerald-500 text-emerald-600 dark:text-emerald-400',
    violet: 'border-violet-500 text-violet-600 dark:text-violet-400',
  };
  const classes = colorMap[entry.color] ?? colorMap.slate;
  const [borderClass, textClass] = classes.split(' ');

  return (
    <div className={`mb-8 border-l-4 ${borderClass} pl-6`}>
      <div className="flex items-start gap-3 mb-2">
        <Calendar className={`w-5 h-5 mt-1 flex-shrink-0 ${textClass}`} />
        <div className="flex-1">
          <h4 className="text-lg font-bold text-gray-900 dark:text-white">{entry.name}</h4>
          <p className={`text-sm font-semibold ${textClass}`}>{entry.dates}</p>
          <p className={`text-xs font-medium ${textClass} opacity-80 mb-2`}>{entry.books}</p>
        </div>
      </div>
      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{entry.background}</p>
      {entry.detail && (
        <>
          <button
            onClick={() => setExpanded(!expanded)}
            className={`mt-2 flex items-center gap-1 text-xs font-semibold ${textClass} hover:opacity-70 transition-opacity`}
          >
            {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            {expanded ? 'Less detail' : 'Scholarly note'}
          </button>
          {expanded && (
            <p className="mt-2 text-xs text-gray-600 dark:text-gray-400 italic leading-relaxed border-l-2 border-gray-300 dark:border-gray-600 pl-3">
              {entry.detail}
            </p>
          )}
        </>
      )}
    </div>
  );
}

export function BibleAuthors() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: otRef, isVisible: otVisible } = useScrollAnimation();
  const { ref: ntRef, isVisible: ntVisible } = useScrollAnimation();
  const { ref: evidenceRef, isVisible: evidenceVisible } = useScrollAnimation();
  const { ref: archaeoRef, isVisible: archaeoVisible } = useScrollAnimation();
  const { ref: quotesRef, isVisible: quotesVisible } = useScrollAnimation();
  const { ref: bigPictureRef, isVisible: bigPictureVisible } = useScrollAnimation();

  return (
    <>
      <ReturnToHome />
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-600 dark:bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-700 dark:hover:bg-gray-600 transition-all shadow-md hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Bible Overviews</span>
          </Link>
        </div>

        {/* Hero */}
        <div
          ref={headerRef}
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 transition-all duration-500 ${headerVisible ? 'fade-in visible' : 'fade-in'}`}
        >
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-6">
              <Users className="w-16 h-16 text-gray-700 dark:text-gray-300" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Bible Authors & Evidence
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
              The Bible was written over approximately 1,500 years, across 3 continents, in 3 languages (Hebrew, Aramaic, Greek), by over 40 authors from vastly different backgrounds — yet it tells one coherent story of God's redemption of humanity.
            </p>
          </div>

          {/* Stats bar */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
            {[
              { value: '~1,500', label: 'Years of Writing', color: 'text-blue-600 dark:text-blue-400' },
              { value: '40+', label: 'Authors', color: 'text-green-600 dark:text-green-400' },
              { value: '66', label: 'Books', color: 'text-amber-600 dark:text-amber-400' },
              { value: '3', label: 'Languages', color: 'text-purple-600 dark:text-purple-400' },
              { value: '24,000+', label: 'NT Manuscripts', color: 'text-red-600 dark:text-red-400' },
            ].map((s) => (
              <div key={s.label} className="theme-card rounded-xl p-4 text-center shadow-md">
                <p className={`text-2xl md:text-3xl font-bold ${s.color}`}>{s.value}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* OLD TESTAMENT */}
        <div
          ref={otRef}
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-all duration-500 ${otVisible ? 'fade-in visible' : 'fade-in'}`}
        >
          <div className="theme-card rounded-2xl p-8 md:p-12 shadow-xl mb-12">
            <div className="flex items-center gap-4 mb-8">
              <ScrollText className="w-10 h-10 text-gray-700 dark:text-gray-300" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Old Testament Authors
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-8 text-sm">c. 1500 BC — 430 BC · 39 books · Written in Hebrew and Aramaic</p>

            {/* Pentateuch */}
            <section className="mb-10">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
                The Pentateuch — Foundation of Scripture
              </h3>
              {OT_PENTATEUCH.map((e) => <AuthorCard key={e.name} entry={e} />)}
            </section>

            {/* History */}
            <section className="mb-10">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
                Historical Books
              </h3>
              {OT_HISTORY.map((e) => <AuthorCard key={e.name} entry={e} />)}
            </section>

            {/* Poetry & Wisdom */}
            <section className="mb-10">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
                Poetry & Wisdom Literature
              </h3>
              {OT_POETRY.map((e) => <AuthorCard key={e.name} entry={e} />)}
            </section>

            {/* Major Prophets */}
            <section className="mb-10">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
                Major Prophets
              </h3>
              {OT_MAJOR_PROPHETS.map((e) => <AuthorCard key={e.name} entry={e} />)}
            </section>

            {/* Minor Prophets */}
            <section>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
                The Twelve Minor Prophets
              </h3>
              <div className="grid md:grid-cols-2 gap-2">
                {OT_MINOR_PROPHETS.map((e) => <AuthorCard key={e.name} entry={e} />)}
              </div>
            </section>
          </div>
        </div>

        {/* NEW TESTAMENT */}
        <div
          ref={ntRef}
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-all duration-500 ${ntVisible ? 'fade-in visible' : 'fade-in'}`}
        >
          <div className="theme-card rounded-2xl p-8 md:p-12 shadow-xl mb-12">
            <div className="flex items-center gap-4 mb-8">
              <Book className="w-10 h-10 text-gray-700 dark:text-gray-300" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                New Testament Authors
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-8 text-sm">c. AD 45 — AD 90 · 27 books · Written in Greek · All within living memory of eyewitnesses</p>

            {/* Gospels */}
            <section className="mb-10">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
                The Four Gospels
              </h3>
              {([
                {
                  name: 'Matthew (Levi)', dates: 'c. AD 50–70', books: 'Matthew',
                  background: 'A former tax collector and one of Jesus\' twelve apostles — an eyewitness. Tax collectors were despised social outcasts; his calling by Jesus (Matt. 9:9) is itself a demonstration of grace. Matthew\'s Gospel is the most Jewish of the four, deliberately structured around five major discourses (mirroring the five books of Moses) and presenting Jesus as the long-awaited Messianic King. Matthew contains 130+ Old Testament quotations and allusions.',
                  detail: 'The "formula quotations" in Matthew (e.g., "This was to fulfill what was spoken by the prophet...") appear 12 times — a literary device by an author deeply versed in the Hebrew scriptures.',
                  color: 'blue',
                },
                {
                  name: 'John Mark', dates: 'c. AD 50–65', books: 'Mark',
                  background: 'A companion of Peter (1 Pet. 5:13) and Paul. Mark\'s Gospel is widely recognized as a record of Peter\'s preaching, giving it the authority of an apostolic eyewitness source while written by Mark. The early church historian Papias (c. AD 125) explicitly states: "Mark, having become the interpreter of Peter, wrote down accurately whatsoever he remembered." The Gospel is fast-paced (the word "immediately" appears 41 times), action-focused, and gritty.',
                  detail: 'Mark 14:51–52 uniquely records a young man who fled naked at Jesus\' arrest — a detail so odd that scholars widely believe it is Mark himself, an eyewitness note he embedded in the account.',
                  color: 'green',
                },
                {
                  name: 'Luke the Physician', dates: 'c. AD 60–80', books: 'Luke, Acts',
                  background: 'A Greek-speaking physician (Col. 4:14) and close companion of Paul. Luke explicitly states his historical methodology in Luke 1:1–4: he carefully investigated everything, consulted eyewitnesses, and wrote an orderly account. His two-volume work (Luke + Acts) covers the birth of Jesus through Paul\'s imprisonment in Rome. Archaeologist Sir William Ramsay initially set out to disprove Luke\'s reliability — and concluded after extensive fieldwork that Luke was "among the very greatest of historians."',
                  detail: 'Luke names 32 countries, 54 cities, and 9 islands accurately in Acts alone. His use of precise regional titles (proconsul, praetor, politarchs) — which varied by city and era — has been repeatedly confirmed by archaeology.',
                  color: 'amber',
                },
                {
                  name: 'John the Apostle', dates: 'c. AD 85–95', books: 'John, 1 John, 2 John, 3 John, Revelation',
                  background: 'One of Jesus\' three closest disciples (along with Peter and James). A fisherman before Jesus called him, John became known as "the disciple whom Jesus loved." He was the only one of the twelve apostles present at the crucifixion (John 19:26). John\'s Gospel is the most theologically reflective of the four — written last, it assumes knowledge of the other Gospels and drives toward a singular purpose: "these are written so that you may believe that Jesus is the Christ, the Son of God" (John 20:31).',
                  detail: 'John\'s letters are the most intimate in the NT — a pastor who has seen the risen Lord writing to communities he loves. Revelation is his prophetic vision given on the island of Patmos where he was exiled for his faith.',
                  color: 'purple',
                },
              ] as AuthorEntry[]).map((e) => <AuthorCard key={e.name} entry={e} />)}
            </section>

            {/* Paul */}
            <section className="mb-10">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
                Paul — The Most Prolific NT Author
              </h3>
              <div className="border-l-4 border-red-500 pl-6 bg-red-50 dark:bg-red-950/20 p-6 rounded-lg mb-4">
                <div className="flex items-center gap-3 mb-2">
                  <Calendar className="w-5 h-5 text-red-500" />
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white">Paul of Tarsus (c. AD 50–67)</h4>
                </div>
                <p className="text-sm font-semibold text-red-600 dark:text-red-400 mb-3">
                  Romans · 1 & 2 Corinthians · Galatians · Ephesians · Philippians · Colossians · 1 & 2 Thessalonians · 1 & 2 Timothy · Titus · Philemon (13 letters)
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-3">
                  A highly educated Pharisee who actively persecuted and imprisoned Christians — then had a dramatic encounter with the risen Jesus on the road to Damascus (Acts 9) and became the greatest missionary in church history. His transformation is one of the most powerful evidences for the resurrection: no natural explanation accounts for a man of his education, social standing, and theological conviction abandoning everything to suffer shipwreck, imprisonment, beatings, and ultimately execution for the gospel.
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-3">
                  Paul's creedal statement in 1 Corinthians 15:3–8 — listing resurrection eyewitnesses including 500 people "most of whom are still alive" — is dated by most NT scholars to within 2–5 years of the crucifixion. This is not mythology; it is the language of a man inviting verification from living witnesses.
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                  His letters shaped the theological vocabulary of Western civilization: grace, justification, sanctification, the body of Christ. His focus on the renewal of the mind (Romans 12:2), living by the Spirit, and understanding one's identity in Christ remains profoundly relevant.
                </p>
              </div>
            </section>

            {/* Peter */}
            <section className="mb-10">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
                Peter & the General Epistles
              </h3>
              {([
                {
                  name: 'Simon Peter', dates: 'c. AD 60–65', books: '1 Peter, 2 Peter',
                  background: 'Fisherman, apostle, and leader of the early church. Peter was part of Jesus\' inner circle — present at the Transfiguration, the Garden of Gethsemane, and the tomb. He denied Jesus three times the night of his arrest and was personally restored by the risen Christ (John 21). His letters carry the weight of a man who has failed, been forgiven, and transformed. His exhortations to "be sober-minded, be watchful" (1 Pet. 5:8) carry the urgency of someone who knows what it costs to let your guard down.',
                  detail: 'Church historian Clement of Alexandria and Origen both record that Peter was crucified upside-down in Rome — his own request, as he felt unworthy to die in the same way as Jesus. This level of commitment is not manufactured.',
                  color: 'cyan',
                },
                {
                  name: 'James, brother of Jesus', dates: 'c. AD 45–62', books: 'James',
                  background: 'James did not believe in Jesus during his earthly ministry (John 7:5). After the resurrection, he became one of the pillars of the Jerusalem church (Gal. 1:19) and was martyred by stoning around AD 62, according to the historian Josephus. His letter is intensely practical: real faith produces action. The letter of James is one of the earliest NT writings, predating most of Paul\'s letters.',
                  detail: 'The transformation of James — from skeptic to martyr — is one of the most historically compelling evidences for the resurrection. He would have known whether his brother\'s body was in the tomb.',
                  color: 'orange',
                },
                {
                  name: 'Jude, brother of Jesus', dates: 'c. AD 60–80', books: 'Jude',
                  background: 'Like James, Jude was a younger half-brother of Jesus and an unbeliever during Jesus\' ministry. His short letter is a fierce warning against false teachers who distort grace into license. He opens humbly: "Jude, a servant of Jesus Christ and brother of James" — not "brother of Jesus," which would have been his right. His humility before the Lord he once doubted is remarkable.',
                  color: 'pink',
                },
                {
                  name: 'Author of Hebrews (identity unknown)', dates: 'c. AD 60–70', books: 'Hebrews',
                  background: 'The most debated authorship question in the NT. Origen (AD 185–254) wrote: "Who wrote the epistle God only knows certainly." Candidates include Paul, Apollos, Barnabas, Priscilla, and Luke. What is certain: the author was highly educated, deeply versed in the Levitical system, and wrote to Jewish believers in danger of abandoning Christianity. Hebrews argues systematically that Jesus is greater than angels, Moses, Aaron, and the entire sacrificial system — the perfect and final High Priest.',
                  detail: 'R.C. Sproul noted that the anonymous nature of Hebrews is itself evidence of its authenticity — no forger would omit a prestigious name. The book was accepted because its content was recognized as authoritative, not because of a famous byline.',
                  color: 'slate',
                },
              ] as AuthorEntry[]).map((e) => <AuthorCard key={e.name} entry={e} />)}
            </section>
          </div>
        </div>

        {/* MANUSCRIPT EVIDENCE */}
        <div
          ref={evidenceRef}
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-all duration-500 ${evidenceVisible ? 'fade-in visible' : 'fade-in'}`}
        >
          <div className="theme-card rounded-2xl p-8 md:p-12 shadow-xl mb-12">
            <div className="flex items-center gap-4 mb-4">
              <Search className="w-10 h-10 text-gray-700 dark:text-gray-300" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Manuscript Evidence
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-8 text-sm leading-relaxed">
              The bibliographic test asks: how many manuscript copies survive, and how close are they in time to the original composition? Applying this standard — the same historians use for Caesar, Plato, or Homer — the Bible is in a category of its own.
            </p>
            <div className="space-y-6">
              {manuscriptEvidence.map((item) => {
                const colorMap: Record<string, string> = {
                  blue: 'border-blue-500 bg-blue-50 dark:bg-blue-950/20',
                  green: 'border-green-500 bg-green-50 dark:bg-green-950/20',
                  amber: 'border-amber-500 bg-amber-50 dark:bg-amber-950/20',
                  purple: 'border-purple-500 bg-purple-50 dark:bg-purple-950/20',
                  red: 'border-red-500 bg-red-50 dark:bg-red-950/20',
                };
                const [borderClass, bgClass] = (colorMap[item.color] ?? colorMap.blue).split(' ');
                return (
                  <div key={item.title} className={`border-l-4 ${borderClass} ${bgClass} rounded-lg p-6`}>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-3">{item.description}</p>
                    <p className="text-gray-600 dark:text-gray-400 text-xs italic leading-relaxed border-l-2 border-gray-300 dark:border-gray-600 pl-3">{item.detail}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ARCHAEOLOGICAL EVIDENCE */}
        <div
          ref={archaeoRef}
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-all duration-500 ${archaeoVisible ? 'fade-in visible' : 'fade-in'}`}
        >
          <div className="theme-card rounded-2xl p-8 md:p-12 shadow-xl mb-12">
            <div className="flex items-center gap-4 mb-4">
              <Shield className="w-10 h-10 text-gray-700 dark:text-gray-300" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Archaeological Corroboration
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-8 text-sm leading-relaxed">
              Over 25,000 archaeological discoveries in the biblical lands have been made since the 19th century. As archaeologist Nelson Glueck wrote: "No archaeological discovery has ever controverted a biblical reference." The following are among the most significant finds.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {archaeologicalEvidence.map((item) => {
                const colorMap: Record<string, string> = {
                  blue: 'border-blue-500',
                  amber: 'border-amber-500',
                  teal: 'border-teal-500',
                  green: 'border-green-500',
                  orange: 'border-orange-500',
                  red: 'border-red-500',
                };
                return (
                  <div key={item.title} className={`border-l-4 ${colorMap[item.color] ?? 'border-slate-500'} pl-4`}>
                    <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">{item.title}</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-2">{item.description}</p>
                    <p className="text-gray-600 dark:text-gray-400 text-xs italic leading-relaxed">{item.detail}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* SCHOLAR QUOTES */}
        <div
          ref={quotesRef}
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-all duration-500 ${quotesVisible ? 'fade-in visible' : 'fade-in'}`}
        >
          <div className="theme-card rounded-2xl p-8 md:p-12 shadow-xl mb-12">
            <div className="flex items-center gap-4 mb-8">
              <Quote className="w-10 h-10 text-gray-700 dark:text-gray-300" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Voices of Scholarship
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-8 text-sm">
              Perspectives from C.S. Lewis, R.C. Sproul, and Wes Huff — three of the most respected voices in Christian apologetics and theology.
            </p>
            <div className="space-y-8">
              {scholarQuotes.map((q, i) => (
                <div key={i} className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                  <blockquote className="text-gray-800 dark:text-gray-200 leading-relaxed italic mb-4 text-base">
                    "{q.quote}"
                  </blockquote>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-3">
                    <span className="font-bold text-gray-900 dark:text-white">— {q.author}</span>
                    <span className="text-gray-500 dark:text-gray-400 text-sm">{q.work}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed border-t border-gray-200 dark:border-gray-700 pt-3">{q.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Big Picture */}
        <div
          ref={bigPictureRef}
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-12 transition-all duration-500 ${bigPictureVisible ? 'fade-in visible' : 'fade-in'}`}
        >
          <div className="theme-card rounded-2xl p-8 md:p-12 shadow-xl bg-gradient-to-br from-blue-50 to-slate-50 dark:from-blue-950/30 dark:to-slate-950/30">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              One Story. One Author Behind All Authors.
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {[
                { value: '~1,500 BC → AD 90', label: 'Written across', color: 'text-blue-600 dark:text-blue-400' },
                { value: '40+', label: 'Human authors', color: 'text-green-600 dark:text-green-400' },
                { value: '1', label: 'Coherent narrative', color: 'text-amber-600 dark:text-amber-400' },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className={`text-3xl md:text-4xl font-bold ${s.color} mb-2`}>{s.value}</p>
                  <p className="text-gray-700 dark:text-gray-300 font-semibold">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Forty authors. Three continents. Three languages. Fifteen centuries. Different genres, different cultures, different eras — and yet the Bible tells a single, unified story from creation to new creation, from the first garden to the last city. The theme never changes: God pursues humanity. Sin separates. God provides a way back. That story reaches its climax in one person — Jesus of Nazareth — who every prophet, every Psalm, and every sacrifice pointed toward.
              </p>
              <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                C.S. Lewis put it simply: the Bible is not merely a collection of religious writings. It is the story into which all other stories fit — the story that makes sense of what we are, why things are broken, and why there is still hope. The evidence for its reliability is not a matter of blind faith. It is a matter of history, archaeology, manuscript science, and the testimony of transformed lives across every century since it was written.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
