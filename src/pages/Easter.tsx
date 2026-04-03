import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, BookOpen, Users, FolderOpen, MessageCircle, Book, Music, Mic, BookText, UserCheck, Radio, Calendar, Home, ChevronDown, ChevronUp } from 'lucide-react';

export function Easter() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const toggleSection = (id: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedSections(newExpanded);
  };

  const navigationLinks = [
    { to: '/', icon: Home, title: 'Home' },
    { to: '/bible', icon: BookOpen, title: 'Bible Overview' },
    { to: '/bible-versions', icon: BookOpen, title: 'Bible Versions' },
    { to: '/topics', icon: MessageCircle, title: 'Biblical Topics' },
    { to: '/stories', icon: Book, title: 'Bible Stories' },
    { to: '/religions', icon: FolderOpen, title: 'Religions' },
    { to: '/christian-holidays', icon: Calendar, title: 'Holiday Origins' },
    { to: '/faqs', icon: Users, title: 'FAQs' },
  ];

  const resourceLinks = [
    { to: '/music', icon: Music, title: 'Music' },
    { to: '/preaching', icon: Mic, title: 'Wisdom' },
    { to: '/books', icon: BookText, title: 'Books' },
    { to: '/church-mentors', icon: UserCheck, title: 'Mentors' },
    { to: '/podcasts', icon: Radio, title: 'Podcasts' },
  ];

  const easterEvents = [
    {
      id: 'lent',
      name: 'Lent',
      date: 'Ash Wednesday → Holy Saturday (46 days total, 40 fasting days)',
      verses: [
        {
          reference: 'Matthew 4:1-2',
          text: 'Then Jesus was led by the Spirit into the wilderness to be tempted by the devil. After fasting forty days and forty nights, he was hungry.'
        },
        {
          reference: 'Joel 2:12-13',
          text: 'Even now, declares the Lord, return to me with all your heart, with fasting and weeping and mourning. Rend your heart and not your garments. Return to the Lord your God, for he is gracious and compassionate, slow to anger and abounding in love.'
        }
      ],
      significance: 'Lent is a 40-day period of preparation for Easter, mirroring Jesus\' 40 days of fasting in the wilderness. It\'s a time for spiritual discipline, self-examination, and repentance.',
      story: 'After His baptism, Jesus was led into the wilderness where He fasted for 40 days while being tempted by Satan. This period of testing prepared Him for His public ministry. Christians observe Lent to prepare their hearts for Easter, focusing on prayer, fasting, and giving to grow closer to God.'
    },
    {
      id: 'ash-wednesday',
      name: 'Ash Wednesday',
      date: '46 days before Easter',
      verses: [
        {
          reference: 'Genesis 3:19',
          text: 'By the sweat of your brow you will eat your food until you return to the ground, since from it you were taken; for dust you are and to dust you will return.'
        },
        {
          reference: 'Psalm 51:10-12',
          text: 'Create in me a pure heart, O God, and renew a steadfast spirit within me. Do not cast me from your presence or take your Holy Spirit from me. Restore to me the joy of your salvation and grant me a willing spirit, to sustain me.'
        }
      ],
      significance: 'Ash Wednesday marks the beginning of Lent. The ashes symbolize mortality and repentance, reminding us that we are dust and will return to dust, calling us to turn back to God.',
      story: 'The tradition of ashes comes from ancient practices of repentance in the Bible. The ashes, often made from burned palm branches from the previous year\'s Palm Sunday, are applied to the forehead in the shape of a cross while saying "Remember that you are dust, and to dust you shall return." This solemn day begins our journey toward Easter.'
    },
    {
      id: 'holy-week',
      name: 'Holy Week',
      date: 'Palm Sunday → Easter (Final week)',
      verses: [
        {
          reference: 'Mark 11:1-11',
          text: 'As they approached Jerusalem and came to Bethphage and Bethany at the Mount of Olives, Jesus sent two of his disciples, saying to them, "Go to the village ahead of you, and just as you enter it, you will find a colt tied there, which no one has ever ridden. Untie it and bring it here."'
        },
        {
          reference: 'John 12:23-24',
          text: 'Jesus replied, "The hour has come for the Son of Man to be glorified. Very truly I tell you, unless a kernel of wheat falls to the ground and dies, it remains only a single seed. But if it dies, it produces many seeds."'
        }
      ],
      significance: 'Holy Week is the most sacred week in Christianity, commemorating the final week of Jesus\' earthly life, from His triumphal entry into Jerusalem to His crucifixion and resurrection.',
      story: 'This week chronicles Jesus\' journey to the cross. It begins with His celebrated entry into Jerusalem, includes His last supper with disciples, His arrest and trial, His crucifixion on Good Friday, and culminates in His glorious resurrection on Easter Sunday. Each day holds profound meaning in God\'s plan of salvation.'
    },
    {
      id: 'palm-sunday',
      name: 'Palm Sunday',
      date: 'Sunday before Easter',
      verses: [
        {
          reference: 'Matthew 21:8-9',
          text: 'A very large crowd spread their cloaks on the road, while others cut branches from the trees and spread them on the road. The crowds that went ahead of him and those that followed shouted, "Hosanna to the Son of David!" "Blessed is he who comes in the name of the Lord!" "Hosanna in the highest heaven!"'
        },
        {
          reference: 'Zechariah 9:9',
          text: 'Rejoice greatly, Daughter Zion! Shout, Daughter Jerusalem! See, your king comes to you, righteous and victorious, lowly and riding on a donkey, on a colt, the foal of a donkey.'
        }
      ],
      significance: 'Palm Sunday celebrates Jesus\' triumphal entry into Jerusalem, where crowds welcomed Him as the Messiah. Yet this joy would turn to tragedy within days, making it a bittersweet celebration.',
      story: 'Jesus rode into Jerusalem on a donkey, fulfilling ancient prophecy. Crowds laid palm branches and their cloaks on the road, shouting "Hosanna!" recognizing Him as their king. This was the last time Jesus would be publicly celebrated before His arrest and crucifixion. We wave palms to remember how Jesus was welcomed as king, even though He came not to conquer Rome, but to conquer sin and death.'
    },
    {
      id: 'maundy-thursday',
      name: 'Maundy Thursday (Holy Thursday)',
      date: 'Thursday before Easter',
      verses: [
        {
          reference: 'John 13:4-5',
          text: 'So he got up from the meal, took off his outer clothing, and wrapped a towel around his waist. After that, he poured water into a basin and began to wash his disciples\' feet, drying them with the towel that was wrapped around him.'
        },
        {
          reference: 'Luke 22:19-20',
          text: 'And he took bread, gave thanks and broke it, and gave it to them, saying, "This is my body given for you; do this in remembrance of me." In the same way, after the supper he took the cup, saying, "This cup is the new covenant in my blood, which is poured out for you."'
        },
        {
          reference: 'John 13:34-35',
          text: 'A new command I give you: Love one another. As I have loved you, so you must love one another. By this everyone will know that you are my disciples, if you love one another.'
        }
      ],
      significance: 'Maundy Thursday commemorates the Last Supper, where Jesus shared His final meal with His disciples, instituted communion, washed their feet, and gave the command to love one another.',
      story: 'On the night before His crucifixion, Jesus gathered His disciples for Passover. In an act of humble service, He washed their feet, showing that true leadership means serving others. He then broke bread and shared wine, instituting communion as a way to remember His sacrifice. He also gave them a new commandment to love one another as He loved them. That same night, Jesus prayed in the Garden of Gethsemane and was arrested. This day reminds us of Jesus\' servant heart and the gift of communion.'
    },
    {
      id: 'good-friday',
      name: 'Good Friday',
      date: 'Friday before Easter',
      verses: [
        {
          reference: 'John 19:17-18',
          text: 'Carrying his own cross, he went out to the place of the Skull (which in Aramaic is called Golgotha). There they crucified him, and with him two others—one on each side and Jesus in the middle.'
        },
        {
          reference: 'Isaiah 53:5',
          text: 'But he was pierced for our transgressions, he was crushed for our iniquities; the punishment that brought us peace was on him, and by his wounds we are healed.'
        },
        {
          reference: 'John 19:30',
          text: 'When he had received the drink, Jesus said, "It is finished." With that, he bowed his head and gave up his spirit.'
        }
      ],
      significance: 'Good Friday commemorates the crucifixion of Jesus Christ. Though it marks His death, it\'s called "Good" because through His sacrifice, He paid the penalty for our sins and made salvation possible.',
      story: 'After being betrayed, arrested, and tried, Jesus was sentenced to death by crucifixion. He carried His cross to Golgotha where He was nailed to it between two criminals. Despite immense suffering, Jesus showed love and forgiveness, even praying for those who crucified Him. At 3 PM, He declared "It is finished" and died. The sky darkened, the earth shook, and the temple curtain tore in two, symbolizing that the barrier between God and humanity was removed. This was the darkest day in history, yet it brought the greatest hope—Jesus took our punishment so we could have eternal life.'
    },
    {
      id: 'holy-saturday',
      name: 'Holy Saturday / Easter Vigil',
      date: 'Saturday before Easter',
      verses: [
        {
          reference: 'Matthew 27:59-60',
          text: 'Joseph took the body, wrapped it in a clean linen cloth, and placed it in his own new tomb that he had cut out of the rock. He rolled a big stone in front of the entrance to the tomb and went away.'
        },
        {
          reference: '1 Peter 3:18-19',
          text: 'For Christ also suffered once for sins, the righteous for the unrighteous, to bring you to God. He was put to death in the body but made alive in the Spirit. After being made alive, he went and made proclamation to the imprisoned spirits.'
        }
      ],
      significance: 'Holy Saturday is a day of waiting between Jesus\' death and resurrection. It represents the time Jesus\' body lay in the tomb while, according to tradition, His spirit descended to proclaim victory over death.',
      story: 'After Jesus died on the cross, Joseph of Arimathea took His body and placed it in a new tomb, rolling a large stone across the entrance. The disciples were in hiding, devastated and afraid. The religious leaders posted guards at the tomb, fearing His disciples might steal the body. This day reminds us of the seeming finality of death and the darkness before the dawn. Christians wait in anticipation, knowing that Sunday brings the resurrection. The Easter Vigil service, held Saturday evening, celebrates the transition from darkness to light.'
    },
    {
      id: 'easter-sunday',
      name: 'Easter Sunday',
      date: 'Sunday (March/April, varies yearly)',
      verses: [
        {
          reference: 'Matthew 28:5-6',
          text: 'The angel said to the women, "Do not be afraid, for I know that you are looking for Jesus, who was crucified. He is not here; he has risen, just as he said. Come and see the place where he lay."'
        },
        {
          reference: '1 Corinthians 15:20-22',
          text: 'But Christ has indeed been raised from the dead, the firstfruits of those who have fallen asleep. For since death came through a man, the resurrection of the dead comes also through a man. For as in Adam all die, so in Christ all will be made alive.'
        },
        {
          reference: 'John 11:25-26',
          text: 'Jesus said to her, "I am the resurrection and the life. The one who believes in me will live, even though they die; and whoever lives by believing in me will never die."'
        }
      ],
      significance: 'Easter is the most important day in Christianity. It celebrates Jesus\' resurrection from the dead, proving His victory over sin and death and offering eternal life to all who believe in Him.',
      story: 'Three days after Jesus was crucified and buried, women went to His tomb at dawn. They found the stone rolled away and the tomb empty. An angel announced, "He is not here; He has risen!" Jesus appeared to His disciples and many others, proving He had conquered death. This resurrection is the foundation of Christian faith, demonstrating that Jesus is truly the Son of God and that His sacrifice provides salvation and eternal life for all who believe.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-purple-950 dark:to-blue-950">
      {/* Hamburger Menu */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="fixed top-6 left-6 z-50 p-3 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all border-2 border-pink-300 dark:border-pink-700"
        aria-label="Navigation menu"
      >
        {menuOpen ? <X className="w-7 h-7 text-pink-600 dark:text-pink-400" /> : <Menu className="w-7 h-7 text-pink-600 dark:text-pink-400" />}
      </button>

      {/* Side Menu Panel */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setMenuOpen(false)}
          />
          <div className="fixed left-0 top-0 h-full w-80 bg-white dark:bg-gray-800 shadow-2xl z-50 overflow-y-auto">
            <div className="p-6 border-b border-pink-200 dark:border-pink-800">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-pink-900 dark:text-pink-100">Navigation</h3>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="text-pink-700 dark:text-pink-300 hover:text-pink-900 dark:hover:text-pink-100 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <nav className="p-4">
              <div className="mb-6">
                <p className="text-xs font-bold text-pink-800 dark:text-pink-300 uppercase tracking-wider mb-3 px-3">Main</p>
                {navigationLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-pink-100 dark:hover:bg-pink-900/30 transition-colors text-gray-900 dark:text-gray-100"
                    >
                      <Icon className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                      <span>{link.title}</span>
                    </Link>
                  );
                })}
              </div>

              <div className="border-t border-pink-200 dark:border-pink-800 pt-4">
                <p className="text-xs font-bold text-pink-800 dark:text-pink-300 uppercase tracking-wider mb-3 px-3">Resources</p>
                {resourceLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-pink-100 dark:hover:bg-pink-900/30 transition-colors text-gray-900 dark:text-gray-100"
                    >
                      <Icon className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                      <span>{link.title}</span>
                    </Link>
                  );
                })}
              </div>
            </nav>
          </div>
        </>
      )}

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent" style={{ fontFamily: 'Georgia, serif' }}>
            Easter
          </h1>
          <p className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 mb-8 font-semibold">
            He Is Risen
          </p>
          <div className="max-w-3xl mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border-4 border-pink-300/50 dark:border-pink-700/50">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed italic">
              Easter celebrates the resurrection of Jesus Christ, the most significant event in Christian faith. Through His victory over death, Jesus offers eternal life to all who believe. Explore the journey from Lent through Easter Sunday and discover the deep meaning behind each sacred moment.
            </p>
          </div>
        </div>
      </section>

      {/* Easter Journey Timeline */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          The Easter Journey
        </h2>

        <div className="space-y-6">
          {easterEvents.map((event, index) => (
            <div
              key={event.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border-2 border-pink-200 dark:border-pink-800"
            >
              <button
                onClick={() => toggleSection(event.id)}
                className="w-full p-6 flex items-start justify-between text-left hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl font-bold text-pink-600 dark:text-pink-400">
                      {index + 1}
                    </span>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {event.name}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {event.date}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 italic">
                    {event.significance}
                  </p>
                </div>
                {expandedSections.has(event.id) ? (
                  <ChevronUp className="w-6 h-6 text-pink-600 dark:text-pink-400 flex-shrink-0 ml-4" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-pink-600 dark:text-pink-400 flex-shrink-0 ml-4" />
                )}
              </button>

              {expandedSections.has(event.id) && (
                <div className="border-t-2 border-pink-200 dark:border-pink-800 p-6 bg-pink-50/50 dark:bg-pink-900/10 space-y-6">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                      The Story
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {event.story}
                    </p>
                  </div>

                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-3">
                      Supporting Scriptures
                    </h4>
                    <div className="space-y-3">
                      {event.verses.map((verse, vIndex) => (
                        <div key={vIndex} className="space-y-1">
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {verse.reference}
                          </p>
                          <p className="text-gray-700 dark:text-gray-300 italic leading-relaxed pl-3 border-l-2 border-green-300 dark:border-green-700">
                            "{verse.text}"
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Final Celebration Message */}
        <div className="mt-16 bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 dark:from-pink-900/20 dark:via-purple-900/20 dark:to-blue-900/20 rounded-2xl shadow-2xl p-12 text-center border-4 border-pink-300 dark:border-pink-700">
          <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
            The Victory of Easter
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            Easter is more than a celebration—it is the cornerstone of Christian faith. The resurrection of Jesus Christ proves that death has been defeated, sin has been conquered, and eternal life is freely offered to all who believe.
          </p>
          <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
            As we journey through Lent, Holy Week, and Easter Sunday, we remember that Jesus willingly gave His life so that we might have eternal life with God. This is the hope that changes everything.
          </p>
        </div>
      </div>
    </div>
  );
}
