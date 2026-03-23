import { useState } from 'react';
import { BookOpen, X } from 'lucide-react';

interface TranslationExample {
  original: string;
  originalLanguage: string;
  meaning: string;
  translation: string;
}

interface BibleVersion {
  id: string;
  name: string;
  abbreviation: string;
  year: string;
  translatedBy: string;
  description: string;
  philosophy: string;
  colorClass: string;
  borderClass: string;
  textClass: string;
  badgeClass: string;
  image: string;
  examples: TranslationExample[];
}

export function BibleVersions() {
  const [selectedVersion, setSelectedVersion] = useState<BibleVersion | null>(null);

  const versions: BibleVersion[] = [
    {
      id: 'kjv',
      name: 'King James Version',
      abbreviation: 'KJV',
      year: '1611',
      translatedBy: 'The King James Version was created in 1611 using a word-for-word translation philosophy, aiming for both accuracy and beauty. It was translated by teams of scholars using the best manuscripts available at the time, and it became one of the most influential Bible translations in history.',
      description: 'The classic English translation known for its majestic, poetic language and historical significance in English-speaking Christianity.',
      philosophy: 'Its translation philosophy centered on formal equivalence—a “word-for-word” approach—aiming to stay as close as possible to the structure and meaning of the original languages. At the same time, it was intentionally written with literary beauty and rhythm, designed to be read aloud, memorized, and carried into worship.  The translators used the best manuscripts available at the time, including the Hebrew Masoretic Text and the Greek Textus Receptus, while also building upon earlier English translations like Tyndale’s work. Their process involved multiple layers of review, ensuring a high level of precision and accountability. While later discoveries of older manuscripts have led to newer translations, the KJV remains one of the most influential and enduring Bible translations—valued for its faithfulness, structure, and unmatched poetic clarity.',
      colorClass: 'from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/30',
      borderClass: 'border-amber-200 dark:border-amber-700',
      textClass: 'text-amber-900 dark:text-amber-100',
      badgeClass: 'bg-amber-600 text-white',
      image: 'https://images.pexels.com/photos/1112048/pexels-photo-1112048.jpeg?auto=compress&cs=tinysrgb&w=1200',
      examples: [
        {
          original: 'ἀγάπη (agapē)',
          originalLanguage: 'Greek',
          meaning: 'Unconditional, selfless love - the highest form of love that seeks the best for others',
          translation: '"Charity" (1 Corinthians 13:13) - Though modern versions use "love," KJV uses "charity" to convey sacrificial love'
        },
        {
          original: 'רוּחַ (ruach)',
          originalLanguage: 'Hebrew',
          meaning: 'Breath, wind, or spirit - representing God\'s active, life-giving presence',
          translation: '"Spirit" or "breath" (Genesis 1:2) - "And the Spirit of God moved upon the face of the waters"'
        },
        {
          original: 'μετανοέω (metanoeō)',
          originalLanguage: 'Greek',
          meaning: 'To change one\'s mind completely, to turn around in thinking and direction',
          translation: '"Repent" (Matthew 4:17) - "Repent: for the kingdom of heaven is at hand"'
        }
      ]
    },
    {
      id: 'niv',
      name: 'New International Version',
      abbreviation: 'NIV',
      year: '1978',
      translatedBy: 'The New International Version (NIV), first published in 1978 and later updated, was created to provide a clear, accurate, and accessible English translation of the Bible for modern readers. It was produced by a large international team of over 100 evangelical scholars from multiple denominations, working under the Committee on Bible Translation. Their goal was to faithfully represent the original Hebrew, Aramaic, and Greek texts while making the meaning easily understood in contemporary language.',
      description: 'A balance between word-for-word and thought-for-thought translation, making it accessible while maintaining accuracy. One of the most popular modern translations.',
      philosophy: 'The NIV follows a dynamic equivalence (thought-for-thought) translation philosophy, focusing on conveying the intended meaning of the original text rather than strictly preserving word-for-word structure. This allows for greater readability and clarity, especially for new readers, while still maintaining strong fidelity to the original message. The translators used a wide range of ancient manuscripts—including earlier and more numerous sources than were available in 1611—resulting in a translation that reflects both modern scholarship and linguistic precision. The NIV has become one of the most widely used Bible translations in the world due to its balance of accuracy and readability.',
      colorClass: 'from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30',
      borderClass: 'border-blue-200 dark:border-blue-700',
      textClass: 'text-blue-900 dark:text-blue-100',
      badgeClass: 'bg-blue-600 text-white',
      image: 'https://images.pexels.com/photos/3184428/pexels-photo-3184428.jpeg?auto=compress&cs=tinysrgb&w=1200',
      examples: [
        {
          original: 'ἀγάπη (agapē)',
          originalLanguage: 'Greek',
          meaning: 'Unconditional, selfless love - God\'s perfect love for humanity',
          translation: '"Love" (1 Corinthians 13:13) - More accessible to modern readers than "charity"'
        },
        {
          original: 'צְדָקָה (tzedakah)',
          originalLanguage: 'Hebrew',
          meaning: 'Righteousness and justice combined with charitable giving - doing what is right',
          translation: '"Righteousness" or "justice" (Psalm 23:3) - "He guides me along the right paths"'
        },
        {
          original: 'παράκλητος (paraklētos)',
          originalLanguage: 'Greek',
          meaning: 'One called alongside to help, advocate, comforter, counselor',
          translation: '"Advocate" (1 John 2:1) - Emphasizes Jesus as our defender before God'
        }
      ]
    },
    {
      id: 'esv',
      name: 'English Standard Version',
      abbreviation: 'ESV',
      year: '2001',
      translatedBy: 'Translation team led by Dr. Wayne Grudem and J.I. Packer. The English Standard Version (ESV), first published in 2001, was created as a modern, precise, and readable translation that maintains a strong connection to the wording and structure of the original biblical texts. Produced by a team of over 100 scholars and editors under Crossway, the ESV builds on the legacy of earlier translations like the Revised Standard Version (RSV), while refining it for accuracy and clarity based on updated manuscript evidence.',
      description: 'An essentially literal translation that emphasizes word-for-word accuracy while maintaining literary excellence and readability.',
      philosophy: 'The ESV follows an essentially literal translation philosophy, often described as a balance between word-for-word precision and readability. It aims to preserve key terms, sentence structure, and theological language wherever possible, while still communicating clearly in modern English. Like the NIV, it draws from a broad and early manuscript base, including critical editions of the Hebrew Masoretic Text and Greek New Testament. The result is a translation that is highly respected for study, teaching, and preaching—offering both accuracy and consistency while remaining accessible to modern readers.',
      colorClass: 'from-emerald-50 to-emerald-100 dark:from-emerald-900/30 dark:to-emerald-800/30',
      borderClass: 'border-emerald-200 dark:border-emerald-700',
      textClass: 'text-emerald-900 dark:text-emerald-100',
      badgeClass: 'bg-emerald-600 text-white',
      image: 'https://images.pexels.com/photos/1112081/pexels-photo-1112081.jpeg?auto=compress&cs=tinysrgb&w=1200',
      examples: [
        {
          original: 'λόγος (logos)',
          originalLanguage: 'Greek',
          meaning: 'Word, reason, divine expression - God\'s complete revelation and creative power',
          translation: '"Word" (John 1:1) - "In the beginning was the Word, and the Word was with God, and the Word was God"'
        },
        {
          original: 'חֶסֶד (chesed)',
          originalLanguage: 'Hebrew',
          meaning: 'Loyal love, covenant faithfulness, loving-kindness - God\'s steadfast mercy',
          translation: '"Steadfast love" (Psalm 136:1) - Captures both God\'s loyalty and His tender affection'
        },
        {
          original: 'δικαιοσύνη (dikaiosynē)',
          originalLanguage: 'Greek',
          meaning: 'Righteousness, justice, being in right standing - conformity to God\'s character',
          translation: '"Righteousness" (Romans 3:22) - "The righteousness of God through faith in Jesus Christ"'
        }
      ]
    },
    {
      id: 'nasb',
      name: 'New American Standard Bible',
      abbreviation: 'NASB',
      year: '1971 (updated 1995, 2020)',
      translatedBy: 'Lockman Foundation scholars, The New American Standard Bible (NASB), first published in 1971 and updated in later editions (notably 1995 and 2020), was created to be one of the most precise and literal English translations of the Bible available. It was produced by a team of conservative evangelical scholars under the Lockman Foundation, with a strong commitment to preserving the exact wording and structure of the original Hebrew, Aramaic, and Greek texts.',
      description: 'Known as one of the most literally accurate English translations, prioritizing word-for-word precision over readability.',
      philosophy: 'The NASB follows a strict formal equivalence (word-for-word) translation philosophy, often going further than most translations in maintaining grammatical detail and consistency of key terms. This makes it especially valued for in-depth study, though sometimes at the expense of smooth readability in modern English. The translators used a wide range of early and reliable manuscripts, incorporating advances in biblical scholarship while maintaining a high view of Scripture. The result is a translation known for its precision, transparency to the original languages, and reliability for serious study.',
      colorClass: 'from-slate-50 to-slate-100 dark:from-slate-900/30 dark:to-slate-800/30',
      borderClass: 'border-slate-200 dark:border-slate-700',
      textClass: 'text-slate-900 dark:text-slate-100',
      badgeClass: 'bg-slate-600 text-white',
      image: 'https://images.pexels.com/photos/1112080/pexels-photo-1112080.jpeg?auto=compress&cs=tinysrgb&w=1200',
      examples: [
        {
          original: 'ἱλαστήριον (hilastērion)',
          originalLanguage: 'Greek',
          meaning: 'Place of propitiation, mercy seat - where God\'s wrath is satisfied and mercy shown',
          translation: '"Propitiation" (Romans 3:25) - Maintains technical theological term showing Christ satisfies God\'s justice'
        },
        {
          original: 'שָׁלוֹם (shalom)',
          originalLanguage: 'Hebrew',
          meaning: 'Peace, wholeness, completeness, welfare - total well-being and harmony with God',
          translation: '"Peace" (Numbers 6:26) - "The LORD lift up His countenance on you, and give you peace"'
        },
        {
          original: 'κοινωνία (koinōnia)',
          originalLanguage: 'Greek',
          meaning: 'Fellowship, partnership, sharing in common - intimate spiritual participation',
          translation: '"Fellowship" (1 John 1:3) - Emphasizes shared participation in Christ'
        }
      ]
    },
    {
      id: 'nlt',
      name: 'New Living Translation',
      abbreviation: 'NLT',
      year: '1996 (revised 2004, 2015)',
      translatedBy: 'The New Living Translation (NLT), first published in 1996 and revised in subsequent years, was designed to present the Bible in clear, natural, and highly readable modern English. Produced by a large team of evangelical scholars, the NLT is a revision and expansion of earlier paraphrase work (The Living Bible), but it was fully retranslated from the original Hebrew, Aramaic, and Greek texts to ensure accuracy alongside clarity.',
      description: 'A thought-for-thought translation that prioritizes clarity and readability, making Scripture accessible to modern readers.',
      philosophy: 'The NLT follows a dynamic equivalence (thought-for-thought) philosophy, prioritizing the communication of meaning in a way that feels natural to contemporary readers. This approach often rephrases idioms, clarifies implied ideas, and simplifies complex sentence structures, making it especially accessible for new believers or those unfamiliar with biblical language. While it is less literal than translations like the NASB or ESV, it is grounded in strong scholarship and widely respected for its ability to make Scripture understandable and engaging without losing its core message.',
      colorClass: 'from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30',
      borderClass: 'border-orange-200 dark:border-orange-700',
      textClass: 'text-orange-900 dark:text-orange-100',
      badgeClass: 'bg-orange-600 text-white',
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1200',
      examples: [
        {
          original: 'μεταμορφόω (metamorphoō)',
          originalLanguage: 'Greek',
          meaning: 'To transform, transfigure - complete change in form and nature',
          translation: '"Let God transform you" (Romans 12:2) - Makes the active transformation clear and personal'
        },
        {
          original: 'תְּשׁוּבָה (teshuvah)',
          originalLanguage: 'Hebrew',
          meaning: 'Return, repentance - turning back to God with a changed heart',
          translation: '"Turn from your sins" - Expresses the action and meaning clearly'
        },
        {
          original: 'σπλαγχνίζομαι (splagchnizomai)',
          originalLanguage: 'Greek',
          meaning: 'Deep compassion from the gut, moved with pity - visceral emotional response',
          translation: '"His heart was filled with compassion" (Mark 1:41) - Conveys the emotional depth'
        }
      ]
    },
    {
      id: 'rsv',
      name: 'Revised Standard Version Catholic Edition',
      abbreviation: 'RSV-CE',
      year: '1966',
      translatedBy: 'The Revised Standard Version – Catholic Edition (RSV-CE), first published in 1966, is a Catholic adaptation of the Revised Standard Version (RSV), itself a revision of the American Standard Version. It was developed to provide a faithful, accurate, and dignified English translation that aligns with Catholic teaching and includes the full canon of Scripture, including the Deuterocanonical books.',
      description: 'The Catholic edition offering a faithful translation with the deuterocanonical books included, widely used in Catholic liturgy and study.',
      philosophy: 'The RSV-CE follows a formal equivalence approach, aiming to preserve the wording and structure of the original texts while maintaining clear and elevated English style. It is often regarded as a middle ground between strict literal translations and more dynamic ones, balancing accuracy with readability. The translation draws from well-established critical editions of the Hebrew and Greek texts and incorporates traditional renderings valued in liturgy and theology. The RSV-CE is widely respected within Catholic scholarship and is often used for study, teaching, and devotional reading due to its precision and reverent tone.',
      colorClass: 'from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30',
      borderClass: 'border-red-200 dark:border-red-700',
      textClass: 'text-red-900 dark:text-red-100',
      badgeClass: 'bg-red-600 text-white',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200',
      examples: [
        {
          original: 'κεχαριτωμένη (kecharitōmenē)',
          originalLanguage: 'Greek',
          meaning: 'Full of grace, highly favored - one who has been graced by God',
          translation: '"Full of grace" (Luke 1:28) - The angel\'s greeting to Mary emphasizing God\'s favor'
        },
        {
          original: 'εὐχαριστία (eucharistia)',
          originalLanguage: 'Greek',
          meaning: 'Thanksgiving, gratitude - giving thanks to God',
          translation: '"Eucharist/thanksgiving" (Luke 22:19) - "He gave thanks" at the Last Supper'
        },
        {
          original: 'μετάνοια (metanoia)',
          originalLanguage: 'Greek',
          meaning: 'Change of mind and heart - fundamental reorientation of life toward God',
          translation: '"Repentance" (Acts 2:38) - "Repent and be baptized" - turning completely to God'
        }
      ]
    }
  ];

  return (
    <>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto theme-card rounded-2xl shadow-xl p-8 md:p-12 transition-colors">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-8">Bible Versions</h1>

          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Which one should I use?</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Some Bibles prioritize the exact words.
Others prioritize the meaning behind them.
The difference isn’t about right or wrong—it’s about how directly the translation reflects the original text versus how clearly it communicates it in modern language.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Click on any translation below to see detailed examples of how the original Hebrew and Greek texts were translated into English.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {versions.map((version) => (
                <button
                  key={version.id}
                  onClick={() => setSelectedVersion(version)}
                  className={`bg-gradient-to-br ${version.colorClass} rounded-xl p-6 border-2 ${version.borderClass} hover:shadow-xl transition-all text-left group hover:scale-105 relative overflow-hidden`}
                >
                  <img
                    src={version.image}
                    alt={version.name}
                    className="w-full h-48 object-cover rounded-lg mb-4 group-hover:opacity-90 transition-opacity"
                  />
                  <div className="flex items-center justify-between mb-2">
                    <h3 className={`text-xl font-bold ${version.textClass}`}>
                      {version.abbreviation}
                    </h3>
                    <span className={`${version.badgeClass} px-3 py-1 rounded-full text-xs font-bold`}>
                      {version.year}
                    </span>
                  </div>
                  <h4 className={`text-lg font-semibold ${version.textClass} mb-3`}>{version.name}</h4>
                  <p className={`text-sm ${version.textClass} opacity-90 mb-3`}>
                    {version.description}
                  </p>
                  <div className={`inline-flex items-center gap-2 ${version.badgeClass} px-4 py-2 rounded-lg text-sm font-semibold`}>
                    View Translation Examples
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      {selectedVersion && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className={`bg-gradient-to-br ${selectedVersion.colorClass} rounded-2xl p-8 border-2 ${selectedVersion.borderClass} shadow-2xl`}>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className={`text-3xl font-bold ${selectedVersion.textClass} mb-2`}>
                    {selectedVersion.name} ({selectedVersion.abbreviation})
                  </h2>
                  <p className={`text-lg ${selectedVersion.textClass} opacity-90`}>
                    Translated: {selectedVersion.year}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedVersion(null)}
                  className={`${selectedVersion.badgeClass} p-2 rounded-full hover:opacity-80 transition-opacity`}
                  aria-label="Close"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="bg-white/50 dark:bg-gray-900/30 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                  <h3 className={`text-xl font-bold ${selectedVersion.textClass} mb-2 flex items-center gap-2`}>
                    <BookOpen className="w-5 h-5" />
                    Translated By
                  </h3>
                  <p className="text-gray-800 dark:text-gray-200">{selectedVersion.translatedBy}</p>
                </div>

                <div className="bg-white/50 dark:bg-gray-900/30 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                  <h3 className={`text-xl font-bold ${selectedVersion.textClass} mb-2`}>
                    Translation Philosophy
                  </h3>
                  <p className="text-gray-800 dark:text-gray-200">{selectedVersion.philosophy}</p>
                </div>

                <div>
                  <h3 className={`text-2xl font-bold ${selectedVersion.textClass} mb-4`}>
                    Translation Examples
                  </h3>
                  <p className="text-gray-800 dark:text-gray-200 mb-6">
                    See how the original Hebrew and Greek words were translated into English:
                  </p>
                  <div className="space-y-4">
                    {selectedVersion.examples.map((example, idx) => (
                      <div
                        key={idx}
                        className="bg-white dark:bg-gray-900 rounded-xl p-6 border-2 border-gray-300 dark:border-gray-700 shadow-lg"
                      >
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-sm font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
                              Original {example.originalLanguage}
                            </h4>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                              {example.original}
                            </p>
                            <h5 className="text-sm font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
                              Meaning
                            </h5>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                              {example.meaning}
                            </p>
                          </div>
                          <div className="border-l-4 border-gray-300 dark:border-gray-600 pl-6">
                            <h4 className="text-sm font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
                              {selectedVersion.abbreviation} Translation
                            </h4>
                            <p className="text-gray-800 dark:text-gray-200 leading-relaxed text-lg">
                              {example.translation}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
