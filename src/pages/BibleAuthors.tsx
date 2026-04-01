import { Users, ScrollText, Book, Calendar } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export function BibleAuthors() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: otRef, isVisible: otVisible } = useScrollAnimation();
  const { ref: ntRef, isVisible: ntVisible } = useScrollAnimation();
  const { ref: bigPictureRef, isVisible: bigPictureVisible } = useScrollAnimation();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div
        ref={headerRef}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 transition-all duration-500 ${
          headerVisible ? 'fade-in visible' : 'fade-in'
        }`}
      >
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Users className="w-16 h-16 text-gray-700 dark:text-gray-300" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Bible Authors & Evidence
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            The Bible was written over approximately 1,500 years by more than 40 different authors from diverse backgrounds—shepherds, kings, fishermen, prophets, and scholars—all inspired by God to record His message to humanity.
          </p>
        </div>
      </div>

      {/* Old Testament Timeline */}
      <div
        ref={otRef}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 transition-all duration-500 ${
          otVisible ? 'fade-in visible' : 'fade-in'
        }`}
      >
        <div className="theme-card rounded-2xl p-8 md:p-12 shadow-xl mb-12">
          <div className="flex items-center gap-4 mb-8">
            <ScrollText className="w-10 h-10 text-gray-700 dark:text-gray-300" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Old Testament Timeline (c. 1500 BC → 400 BC)
            </h2>
          </div>

          {/* Moses */}
          <div className="mb-10 border-l-4 border-blue-500 pl-6">
            <div className="flex items-center gap-3 mb-3">
              <Calendar className="w-5 h-5 text-blue-500" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Moses (c. 1500–1400 BC)</h3>
            </div>
            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2">
              Books: Genesis, Exodus, Leviticus, Numbers, Deuteronomy
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Wrote Genesis, Exodus, Leviticus, Numbers, Deuteronomy. Moses led Israel out of slavery in Egypt and received God's Law on Mount Sinai. His writings lay the foundation for understanding God's character, human sin, covenant, and obedience. Genesis also reaches back to creation and the earliest history of humanity.
            </p>
          </div>

          {/* Joshua */}
          <div className="mb-10 border-l-4 border-green-500 pl-6">
            <div className="flex items-center gap-3 mb-3">
              <Calendar className="w-5 h-5 text-green-500" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Joshua (c. 1400 BC)</h3>
            </div>
            <p className="text-sm font-semibold text-green-600 dark:text-green-400 mb-2">
              Books: Joshua
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Successor to Moses. He led Israel into the Promised Land and oversaw its conquest and division among the tribes. The book of Joshua emphasizes God's faithfulness to His promises and the importance of obedience.
            </p>
          </div>

          {/* Samuel */}
          <div className="mb-10 border-l-4 border-amber-500 pl-6">
            <div className="flex items-center gap-3 mb-3">
              <Calendar className="w-5 h-5 text-amber-500" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Samuel (c. 1100–1000 BC)</h3>
            </div>
            <p className="text-sm font-semibold text-amber-600 dark:text-amber-400 mb-2">
              Books: 1 Samuel (and likely contributions to Judges & Ruth)
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Prophet and final judge of Israel. He anointed Saul and later David as kings. Samuel played a key role in Israel's transition from judges to monarchy and is associated with writing parts of Judges, Ruth, and 1 Samuel.
            </p>
          </div>

          {/* David */}
          <div className="mb-10 border-l-4 border-purple-500 pl-6">
            <div className="flex items-center gap-3 mb-3">
              <Calendar className="w-5 h-5 text-purple-500" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">David (c. 1000 BC)</h3>
            </div>
            <p className="text-sm font-semibold text-purple-600 dark:text-purple-400 mb-2">
              Books: Many Psalms
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              King of Israel and a central spiritual figure. He wrote many Psalms that express repentance, worship, struggle, and trust in God. His life shows both deep devotion and serious failure, yet a continual returning to God.
            </p>
          </div>

          {/* Asaph & Sons of Korah */}
          <div className="mb-10 border-l-4 border-pink-500 pl-6">
            <div className="flex items-center gap-3 mb-3">
              <Calendar className="w-5 h-5 text-pink-500" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Asaph & Sons of Korah (c. 1000 BC)</h3>
            </div>
            <p className="text-sm font-semibold text-pink-600 dark:text-pink-400 mb-2">
              Books: Psalms (Asaph: 73–83; Sons of Korah: 42–49, etc.)
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Temple worship leaders and musicians. Their Psalms often focus on God's justice, worship, and the tension between what is seen and what is true spiritually.
            </p>
          </div>

          {/* Solomon */}
          <div className="mb-10 border-l-4 border-yellow-500 pl-6">
            <div className="flex items-center gap-3 mb-3">
              <Calendar className="w-5 h-5 text-yellow-500" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Solomon (c. 970–930 BC)</h3>
            </div>
            <p className="text-sm font-semibold text-yellow-600 dark:text-yellow-400 mb-2">
              Books: Proverbs, Ecclesiastes, Song of Songs
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              David's son, known for wisdom. Wrote Proverbs (wisdom for daily life), Ecclesiastes (reflection on meaning and emptiness without God), and Song of Songs (poetic picture of love and covenant).
            </p>
          </div>

          {/* Agur & Lemuel */}
          <div className="mb-10 border-l-4 border-cyan-500 pl-6">
            <div className="flex items-center gap-3 mb-3">
              <Calendar className="w-5 h-5 text-cyan-500" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Agur & Lemuel (c. 900 BC, uncertain)</h3>
            </div>
            <p className="text-sm font-semibold text-cyan-600 dark:text-cyan-400 mb-2">
              Books: Proverbs 30 (Agur), Proverbs 31 (Lemuel)
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Contributors to Proverbs. Their writings reflect humility, wisdom, and reverence for God, especially in leadership and personal conduct.
            </p>
          </div>

          {/* Prophets Section */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Prophets (c. 800–400 BC)</h3>

            {/* Isaiah */}
            <div className="mb-8 border-l-4 border-red-500 pl-6">
              <div className="flex items-center gap-3 mb-3">
                <Calendar className="w-5 h-5 text-red-500" />
                <h4 className="text-xl font-bold text-gray-900 dark:text-white">Isaiah (c. 700 BC)</h4>
              </div>
              <p className="text-sm font-semibold text-red-600 dark:text-red-400 mb-2">Books: Isaiah</p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Spoke to a rebellious nation, warning of judgment but also pointing clearly to the coming Messiah. His writings contain some of the most detailed prophecies about Jesus.
              </p>
            </div>

            {/* Hosea */}
            <div className="mb-8 border-l-4 border-orange-500 pl-6">
              <div className="flex items-center gap-3 mb-3">
                <Calendar className="w-5 h-5 text-orange-500" />
                <h4 className="text-xl font-bold text-gray-900 dark:text-white">Hosea (c. 750 BC)</h4>
              </div>
              <p className="text-sm font-semibold text-orange-600 dark:text-orange-400 mb-2">Books: Hosea</p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                His marriage symbolized Israel's unfaithfulness and God's relentless love and mercy.
              </p>
            </div>

            {/* Amos */}
            <div className="mb-8 border-l-4 border-teal-500 pl-6">
              <div className="flex items-center gap-3 mb-3">
                <Calendar className="w-5 h-5 text-teal-500" />
                <h4 className="text-xl font-bold text-gray-900 dark:text-white">Amos (c. 750 BC)</h4>
              </div>
              <p className="text-sm font-semibold text-teal-600 dark:text-teal-400 mb-2">Books: Amos</p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Called out injustice and empty religion, emphasizing that true faith must produce righteousness.
              </p>
            </div>

            {/* Micah */}
            <div className="mb-8 border-l-4 border-indigo-500 pl-6">
              <div className="flex items-center gap-3 mb-3">
                <Calendar className="w-5 h-5 text-indigo-500" />
                <h4 className="text-xl font-bold text-gray-900 dark:text-white">Micah (c. 700 BC)</h4>
              </div>
              <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-2">Books: Micah</p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Spoke against corruption and foretold the Messiah's birth in Bethlehem.
              </p>
            </div>

            {/* Jonah */}
            <div className="mb-8 border-l-4 border-sky-500 pl-6">
              <div className="flex items-center gap-3 mb-3">
                <Calendar className="w-5 h-5 text-sky-500" />
                <h4 className="text-xl font-bold text-gray-900 dark:text-white">Jonah (c. 800 BC)</h4>
              </div>
              <p className="text-sm font-semibold text-sky-600 dark:text-sky-400 mb-2">Books: Jonah</p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Sent to Nineveh; his story reveals God's compassion even for enemies and exposes human resistance to God's will.
              </p>
            </div>
          </div>

          {/* Later Prophets */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Later Prophets (c. 650–400 BC)</h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="border-l-4 border-slate-500 pl-4">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">Jeremiah (c. 600 BC)</h4>
                <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">Books: Jeremiah, Lamentations</p>
                <p className="text-gray-700 dark:text-gray-300 text-sm">Warned of Jerusalem's fall; deeply emotional; emphasized inward transformation.</p>
              </div>

              <div className="border-l-4 border-slate-500 pl-4">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">Ezekiel (c. 600 BC)</h4>
                <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">Books: Ezekiel</p>
                <p className="text-gray-700 dark:text-gray-300 text-sm">Prophet in exile; used vivid visions to show God's holiness and restoration.</p>
              </div>

              <div className="border-l-4 border-slate-500 pl-4">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">Daniel (c. 600 BC)</h4>
                <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">Books: Daniel</p>
                <p className="text-gray-700 dark:text-gray-300 text-sm">Lived in Babylon; known for faithfulness under pressure and prophetic visions of future kingdoms.</p>
              </div>

              <div className="border-l-4 border-slate-500 pl-4">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">Habakkuk (c. 600 BC)</h4>
                <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">Books: Habakkuk</p>
                <p className="text-gray-700 dark:text-gray-300 text-sm">Wrestled with why God allows injustice.</p>
              </div>

              <div className="border-l-4 border-slate-500 pl-4">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">Zephaniah (c. 630 BC)</h4>
                <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">Books: Zephaniah</p>
                <p className="text-gray-700 dark:text-gray-300 text-sm">Spoke of judgment and future restoration.</p>
              </div>

              <div className="border-l-4 border-slate-500 pl-4">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">Nahum (c. 650 BC)</h4>
                <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">Books: Nahum</p>
                <p className="text-gray-700 dark:text-gray-300 text-sm">Declared judgment on Nineveh.</p>
              </div>

              <div className="border-l-4 border-slate-500 pl-4">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">Obadiah (c. 600 BC)</h4>
                <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">Books: Obadiah</p>
                <p className="text-gray-700 dark:text-gray-300 text-sm">Judgment against Edom.</p>
              </div>
            </div>
          </div>

          {/* Post-Exile Writers */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Post-Exile Writers (c. 500–400 BC)</h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="border-l-4 border-emerald-500 pl-4">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">Haggai (c. 520 BC)</h4>
                <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">Books: Haggai</p>
                <p className="text-gray-700 dark:text-gray-300 text-sm">Urged rebuilding of the temple.</p>
              </div>

              <div className="border-l-4 border-emerald-500 pl-4">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">Zechariah (c. 520 BC)</h4>
                <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">Books: Zechariah</p>
                <p className="text-gray-700 dark:text-gray-300 text-sm">Gave visions of restoration and the coming King.</p>
              </div>

              <div className="border-l-4 border-emerald-500 pl-4">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">Malachi (c. 430 BC)</h4>
                <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">Books: Malachi</p>
                <p className="text-gray-700 dark:text-gray-300 text-sm">Called people back to faithfulness; last OT prophet.</p>
              </div>
            </div>
          </div>

          {/* Historical Writers */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Historical Writers</h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">Ezra (c. 450 BC)</h4>
                <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">Books: Ezra</p>
                <p className="text-gray-700 dark:text-gray-300 text-sm">Priest and scribe who restored the teaching of God's Law.</p>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">Nehemiah (c. 430 BC)</h4>
                <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">Books: Nehemiah</p>
                <p className="text-gray-700 dark:text-gray-300 text-sm">Rebuilt Jerusalem's walls; emphasized leadership and reform.</p>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">Mordecai (c. 400 BC?)</h4>
                <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">Books: Esther (traditionally associated)</p>
                <p className="text-gray-700 dark:text-gray-300 text-sm">Traditionally linked to Esther, showing God's providence behind the scenes.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New Testament Timeline */}
      <div
        ref={ntRef}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 transition-all duration-500 ${
          ntVisible ? 'fade-in visible' : 'fade-in'
        }`}
      >
        <div className="theme-card rounded-2xl p-8 md:p-12 shadow-xl mb-12">
          <div className="flex items-center gap-4 mb-8">
            <Book className="w-10 h-10 text-gray-700 dark:text-gray-300" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              New Testament Timeline (c. AD 45 → 90)
            </h2>
          </div>

          {/* Matthew */}
          <div className="mb-10 border-l-4 border-blue-500 pl-6">
            <div className="flex items-center gap-3 mb-3">
              <Calendar className="w-5 h-5 text-blue-500" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Matthew (c. AD 50–70)</h3>
            </div>
            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2">Books: Matthew</p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              A former tax collector and one of Jesus' 12 disciples. His Gospel presents Jesus as the promised Messiah and King, deeply rooted in Old Testament fulfillment.
            </p>
          </div>

          {/* Mark */}
          <div className="mb-10 border-l-4 border-green-500 pl-6">
            <div className="flex items-center gap-3 mb-3">
              <Calendar className="w-5 h-5 text-green-500" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Mark (c. AD 50–65)</h3>
            </div>
            <p className="text-sm font-semibold text-green-600 dark:text-green-400 mb-2">Books: Mark</p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Close companion of Peter. His Gospel is fast-paced and action-focused, likely reflecting Peter's firsthand accounts of Jesus.
            </p>
          </div>

          {/* Luke */}
          <div className="mb-10 border-l-4 border-amber-500 pl-6">
            <div className="flex items-center gap-3 mb-3">
              <Calendar className="w-5 h-5 text-amber-500" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Luke (c. AD 60–80)</h3>
            </div>
            <p className="text-sm font-semibold text-amber-600 dark:text-amber-400 mb-2">Books: Luke, Acts</p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              A physician and careful historian. Wrote Luke and Acts, giving a detailed, orderly account of Jesus' life and the early church.
            </p>
          </div>

          {/* John */}
          <div className="mb-10 border-l-4 border-purple-500 pl-6">
            <div className="flex items-center gap-3 mb-3">
              <Calendar className="w-5 h-5 text-purple-500" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">John (c. AD 90)</h3>
            </div>
            <p className="text-sm font-semibold text-purple-600 dark:text-purple-400 mb-2">
              Books: John, 1 John, 2 John, 3 John, Revelation
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              One of Jesus' closest disciples. His writings focus on the identity of Jesus as the Son of God and emphasize belief, love, and eternal life.
            </p>
          </div>

          {/* Paul - Expanded */}
          <div className="mb-10 border-l-4 border-red-500 pl-6 bg-red-50 dark:bg-red-950/20 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <Calendar className="w-5 h-5 text-red-500" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Paul (c. AD 50–67) ⭐</h3>
            </div>
            <p className="text-sm font-semibold text-red-600 dark:text-red-400 mb-4">
              Books: Romans, 1 Corinthians, 2 Corinthians, Galatians, Ephesians, Philippians, Colossians, 1 Thessalonians, 2 Thessalonians, 1 Timothy, 2 Timothy, Titus, Philemon
            </p>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Former persecutor of Christians who became a leading apostle. Paul's life is one of the most dramatic transformations in Scripture.
            </p>

            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Did Paul ever meet Jesus?</h4>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
              <li><strong>Paul did not follow Jesus during His earthly ministry like Peter did.</strong></li>
              <li>However, <strong>he did encounter Jesus directly after the resurrection</strong> (Acts 9) on the road to Damascus.</li>
              <li>This was not secondhand—Paul describes it as a real encounter where Jesus spoke to him and changed the direction of his life completely.</li>
            </ul>

            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Key aspects of Paul's life:</h4>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
              <li><strong>Highly educated Pharisee</strong> – deeply trained in Jewish law and tradition.</li>
              <li><strong>Persecutor of Christians</strong> – before his conversion, he actively tried to stop the early church.</li>
              <li><strong>Radical transformation</strong> – after encountering Jesus, he became one of the most committed messengers of the gospel.</li>
              <li><strong>Missionary and church planter</strong> – traveled extensively, facing hardship, imprisonment, and persecution.</li>
            </ul>

            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">His writings:</h4>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-2">
              Paul's letters are deeply theological but also practical. He focuses on:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
              <li>Salvation by grace through faith</li>
              <li>The renewal of the mind (very aligned with your theme)</li>
              <li>Living with discipline, purpose, and awareness</li>
              <li>The inner conflict between flesh and spirit</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
              There's a strong sense in Paul's writing of <strong>intentional thinking, correction of wrong beliefs, and anchoring yourself in truth</strong>. He repeatedly calls people to examine what they believe and to align their minds with God.
            </p>
          </div>

          {/* Peter - Expanded */}
          <div className="mb-10 border-l-4 border-cyan-500 pl-6 bg-cyan-50 dark:bg-cyan-950/20 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <Calendar className="w-5 h-5 text-cyan-500" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Peter (c. AD 60–65) ⭐</h3>
            </div>
            <p className="text-sm font-semibold text-cyan-600 dark:text-cyan-400 mb-4">
              Books: 1 Peter, 2 Peter
            </p>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Peter was one of Jesus' <strong>closest disciples—part of the inner circle</strong> (along with James and John).
            </p>

            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
              <li><strong>Yes, Peter absolutely knew and walked with Jesus personally.</strong></li>
              <li>He was originally a fisherman before Jesus called him to follow Him.</li>
              <li>He witnessed major events firsthand: miracles, teachings, the transfiguration, and Jesus' arrest.</li>
            </ul>

            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Key aspects of Peter's life:</h4>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
              <li><strong>Bold but impulsive</strong> – He often spoke quickly (sometimes rightly, sometimes wrongly).</li>
              <li><strong>Deep devotion</strong> – He declared Jesus as the Christ (Matthew 16:16).</li>
              <li><strong>Failure and restoration</strong> – He denied Jesus three times before the crucifixion, but was later restored by Jesus (John 21).</li>
              <li><strong>Leadership</strong> – Became a central leader in the early church (Acts 2).</li>
            </ul>

            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">His writings (1 & 2 Peter):</h4>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-2">
              Peter writes with the perspective of someone who has <strong>failed, been corrected, and transformed</strong>. His letters focus on:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
              <li>Standing firm in faith during suffering</li>
              <li>Living holy and disciplined lives</li>
              <li>Being aware and watchful (very connected to your book's theme)</li>
              <li>Remembering truth instead of drifting</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
              There's a strong tone of <strong>alertness, humility, and endurance</strong> in his writing—he understands how easy it is to drift because he lived it.
            </p>
          </div>

          {/* James */}
          <div className="mb-10 border-l-4 border-orange-500 pl-6">
            <div className="flex items-center gap-3 mb-3">
              <Calendar className="w-5 h-5 text-orange-500" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">James (c. AD 45–60)</h3>
            </div>
            <p className="text-sm font-semibold text-orange-600 dark:text-orange-400 mb-2">Books: James</p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Brother of Jesus. Focused on practical faith—what real belief looks like in action.
            </p>
          </div>

          {/* Jude */}
          <div className="mb-10 border-l-4 border-pink-500 pl-6">
            <div className="flex items-center gap-3 mb-3">
              <Calendar className="w-5 h-5 text-pink-500" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Jude (c. AD 60–80)</h3>
            </div>
            <p className="text-sm font-semibold text-pink-600 dark:text-pink-400 mb-2">Books: Jude</p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Also a brother of Jesus. Warned strongly against false teaching and spiritual corruption.
            </p>
          </div>

          {/* Author of Hebrews */}
          <div className="mb-10 border-l-4 border-slate-500 pl-6">
            <div className="flex items-center gap-3 mb-3">
              <Calendar className="w-5 h-5 text-slate-500" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Author of Hebrews (unknown, c. AD 60–70)</h3>
            </div>
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-2">Books: Hebrews</p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Identity uncertain. Emphasizes Jesus as greater than everything before—priests, sacrifices, and the law.
            </p>
          </div>
        </div>
      </div>

      {/* Big Picture */}
      <div
        ref={bigPictureRef}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mb-12 transition-all duration-500 ${
          bigPictureVisible ? 'fade-in visible' : 'fade-in'
        }`}
      >
        <div className="theme-card rounded-2xl p-8 md:p-12 shadow-xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            The Big Picture
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <p className="text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">~1500 BC → AD 90</p>
              <p className="text-gray-700 dark:text-gray-300 font-semibold">Time Span</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-bold text-purple-600 dark:text-purple-400 mb-2">~40</p>
              <p className="text-gray-700 dark:text-gray-300 font-semibold">Total Authors</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-bold text-green-600 dark:text-green-400 mb-2">66</p>
              <p className="text-gray-700 dark:text-gray-300 font-semibold">Books</p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Core Theme:</h3>
            <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed italic">
              What you consistently return to—truth, belief, attention—forms who you become.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
