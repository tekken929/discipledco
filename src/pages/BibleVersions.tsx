import { useState } from 'react';
import { BookOpen, ChevronDown, ChevronUp } from 'lucide-react';

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
  const [expandedVersion, setExpandedVersion] = useState<string | null>(null);

  const versions: BibleVersion[] = [
    {
      id: 'kjv',
      name: 'King James Version',
      abbreviation: 'KJV',
      year: '1611',
      translatedBy: 'Church of England scholars commissioned by King James I',
      description: 'The classic English translation known for its majestic, poetic language and historical significance in English-speaking Christianity.',
      philosophy: 'Formal equivalence (word-for-word translation from Hebrew, Aramaic, and Greek texts)',
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
      translatedBy: 'Committee of over 100 scholars from various denominations',
      description: 'A balance between word-for-word and thought-for-thought translation, making it accessible while maintaining accuracy. One of the most popular modern translations.',
      philosophy: 'Dynamic equivalence (balances literal translation with readability and meaning)',
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
      translatedBy: 'Translation team led by Dr. Wayne Grudem and J.I. Packer',
      description: 'An essentially literal translation that emphasizes word-for-word accuracy while maintaining literary excellence and readability.',
      philosophy: 'Formal equivalence with literary beauty (word-for-word while preserving flow)',
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
      translatedBy: 'Lockman Foundation scholars',
      description: 'Known as one of the most literally accurate English translations, prioritizing word-for-word precision over readability.',
      philosophy: 'Strict formal equivalence (most literal word-for-word translation)',
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
      translatedBy: 'Team of 90 Bible scholars',
      description: 'A thought-for-thought translation that prioritizes clarity and readability, making Scripture accessible to modern readers.',
      philosophy: 'Dynamic equivalence (meaning-for-meaning translation for maximum clarity)',
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
      translatedBy: 'Catholic scholars building on Protestant RSV (1952)',
      description: 'The Catholic edition offering a faithful translation with the deuterocanonical books included, widely used in Catholic liturgy and study.',
      philosophy: 'Formal equivalence with liturgical beauty (word-for-word suitable for worship)',
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

  const toggleVersion = (id: string) => {
    setExpandedVersion(expandedVersion === id ? null : id);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-6xl mx-auto theme-card rounded-2xl shadow-xl p-8 md:p-12 transition-colors">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-8">Bible Versions</h1>

        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Which one should I use?</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Understanding the different Bible translations can help you choose the version that best suits your study needs.
              Each translation has unique characteristics, from word-for-word accuracy to thought-for-thought readability.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Click on any translation below to see detailed examples of how the original Hebrew and Greek texts were translated into English.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {versions.map((version) => (
              <button
                key={version.id}
                onClick={() => toggleVersion(version.id)}
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
                  {expandedVersion === version.id ? (
                    <>
                      Hide Details <ChevronUp className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      View Translation Examples <ChevronDown className="w-4 h-4" />
                    </>
                  )}
                </div>
              </button>
            ))}
          </div>

          {expandedVersion && (
            <div className="mt-8 animate-in fade-in duration-300">
              {versions
                .filter((v) => v.id === expandedVersion)
                .map((version) => (
                  <div
                    key={version.id}
                    className={`bg-gradient-to-br ${version.colorClass} rounded-2xl p-8 border-2 ${version.borderClass} shadow-2xl`}
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h2 className={`text-3xl font-bold ${version.textClass} mb-2`}>
                          {version.name} ({version.abbreviation})
                        </h2>
                        <p className={`text-lg ${version.textClass} opacity-90`}>
                          Translated: {version.year}
                        </p>
                      </div>
                      <button
                        onClick={() => setExpandedVersion(null)}
                        className={`${version.badgeClass} p-2 rounded-full hover:opacity-80 transition-opacity`}
                      >
                        <ChevronUp className="w-6 h-6" />
                      </button>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-white/50 dark:bg-gray-900/30 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                        <h3 className={`text-xl font-bold ${version.textClass} mb-2 flex items-center gap-2`}>
                          <BookOpen className="w-5 h-5" />
                          Translated By
                        </h3>
                        <p className="text-gray-800 dark:text-gray-200">{version.translatedBy}</p>
                      </div>

                      <div className="bg-white/50 dark:bg-gray-900/30 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                        <h3 className={`text-xl font-bold ${version.textClass} mb-2`}>
                          Translation Philosophy
                        </h3>
                        <p className="text-gray-800 dark:text-gray-200">{version.philosophy}</p>
                      </div>

                      <div>
                        <h3 className={`text-2xl font-bold ${version.textClass} mb-4`}>
                          Translation Examples
                        </h3>
                        <p className="text-gray-800 dark:text-gray-200 mb-6">
                          See how the original Hebrew and Greek words were translated into English:
                        </p>
                        <div className="space-y-4">
                          {version.examples.map((example, idx) => (
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
                                    {version.abbreviation} Translation
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
                ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
