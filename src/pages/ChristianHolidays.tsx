import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface HolidayEvent {
  name: string;
  date: string;
  time?: string;
  catholic: string;
  protestant: string;
  verses?: {
    reference: string;
    text: string;
  }[];
  significance?: string;
  story?: string;
}

interface Holiday {
  name: string;
  description: string;
  timeline: HolidayEvent[];
}

const holidays: Holiday[] = [
  {
    name: 'Easter',
    description: 'Celebration of the resurrection of Jesus Christ',
    timeline: [
      {
        name: 'Lent',
        date: 'Ash Wednesday → Holy Saturday (46 days total, 40 fasting days)',
        catholic: 'Observed daily throughout Lent. Practices include fasting, prayer, and confession. Fridays: Abstain from meat. Services often held daily or weekly (morning/evening)',
        protestant: 'Observance varies. Some follow the full 40 days, others don\'t formally observe. Typically marked by weekly Sunday services + optional small groups',
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
        name: 'Ash Wednesday',
        date: '46 days before Easter',
        time: 'Morning, noon, and evening services',
        catholic: 'Multiple service times throughout the day. Ashes placed on forehead',
        protestant: 'Observed in some churches. Usually one or two services (evening most common)',
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
        name: 'Holy Week',
        date: 'Palm Sunday → Easter (Final week)',
        catholic: 'Services held daily, often morning and evening',
        protestant: 'Usually centered around Sunday + 1–2 additional services',
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
        name: 'Palm Sunday',
        date: 'Sunday before Easter',
        time: 'Regular Sunday service times (morning, sometimes multiple services)',
        catholic: 'Formal liturgy with palm distribution',
        protestant: 'Celebrated during Sunday service. Often includes teaching on the Triumphal Entry',
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
        name: 'Maundy Thursday (Holy Thursday)',
        date: 'Thursday before Easter',
        time: 'Evening service (commonly 6–8 PM)',
        catholic: 'Evening Mass of the Lord\'s Supper. Includes communion and sometimes foot washing',
        protestant: 'Optional service. Usually a communion-focused evening gathering',
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
        name: 'Good Friday',
        date: 'Friday before Easter',
        time: 'Afternoon (12–3 PM) or evening (6–7 PM)',
        catholic: 'Afternoon service (often around 3 PM, the traditional hour of Jesus\' death). Very solemn, no full Mass',
        protestant: 'Often evening services. Focus on Scripture, reflection, and the cross',
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
        name: 'Holy Saturday / Easter Vigil',
        date: 'Saturday before Easter',
        time: 'Catholic: after sunset (often 8–10 PM)',
        catholic: 'Major night service (Easter Vigil). Candlelight, readings, celebration of resurrection beginning',
        protestant: 'Less commonly observed. Some churches hold prayer nights or quiet reflection services',
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
        name: 'Easter Sunday',
        date: 'Sunday (March/April, varies yearly)',
        time: 'Sunrise (~6 AM), morning services (8–11 AM), sometimes evening',
        catholic: 'Multiple Masses throughout the day. Celebratory, marks end of Lent',
        protestant: 'One of the biggest Sundays of the year. Often includes: Sunrise service, Main morning services, Music and community gatherings',
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
    ]
  },
  {
    name: 'Christmas',
    description: 'Celebration of the birth of Jesus Christ',
    timeline: [
      {
        name: 'Advent',
        date: '4 Sundays before Christmas',
        time: 'Sunday services throughout Advent season',
        catholic: 'Four-week preparation period. Weekly Sunday services with Advent wreath lighting ceremony. Daily Mass attendance encouraged',
        protestant: 'Varies by denomination. Most observe with Sunday services and Advent calendars. Focus on anticipation and preparation'
      },
      {
        name: 'Christmas Eve',
        date: 'December 24',
        time: 'Afternoon (4–5 PM), Evening (7–9 PM), Midnight Mass (11 PM–12 AM)',
        catholic: 'Multiple Mass times. Midnight Mass is traditional and highly attended. Family-focused earlier services available',
        protestant: 'Usually one or two evening services (candlelight services common). Focus on nativity story and carols'
      },
      {
        name: 'Christmas Day',
        date: 'December 25',
        time: 'Morning services (various times)',
        catholic: 'Multiple Masses throughout the day. Celebration continues from Christmas Eve',
        protestant: 'Morning worship services. Many churches have single morning service to allow family time'
      },
      {
        name: 'Twelve Days of Christmas',
        date: 'December 25 – January 5',
        catholic: 'Continuation of Christmas celebration until Epiphany. Daily observance encouraged',
        protestant: 'Less commonly observed as formal liturgical season. Individual observation varies'
      }
    ]
  },
  {
    name: 'Pentecost',
    description: 'Celebration of the Holy Spirit descending on the apostles',
    timeline: [
      {
        name: 'Pentecost Sunday',
        date: '50 days after Easter',
        time: 'Morning services',
        catholic: 'Major feast day. Special liturgy celebrating the birth of the Church. Red vestments worn',
        protestant: 'Important celebration. Focus on the gift of the Holy Spirit. Many churches emphasize spiritual renewal'
      }
    ]
  },
  {
    name: 'Epiphany',
    description: 'Celebration of the visit of the Magi and revelation of Christ to the Gentiles',
    timeline: [
      {
        name: 'Epiphany',
        date: 'January 6',
        time: 'Morning services',
        catholic: 'Major feast celebrating the manifestation of Christ. Marks end of Christmas season',
        protestant: 'Observed by some denominations. Focus on the Magi visiting Jesus and the revelation to all nations'
      }
    ]
  }
];

function HolidayDropdown({ holiday }: { holiday: Holiday }) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedEvents, setExpandedEvents] = useState<Set<number>>(new Set());

  const toggleEvent = (index: number) => {
    const newExpanded = new Set(expandedEvents);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedEvents(newExpanded);
  };

  return (
    <div className="theme-card border-2 rounded-2xl overflow-hidden transition-all hover:shadow-lg">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
      >
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {holiday.name}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {holiday.description}
          </p>
        </div>
        {isOpen ? (
          <ChevronUp className="w-6 h-6 text-gray-600 dark:text-gray-400 flex-shrink-0 ml-4" />
        ) : (
          <ChevronDown className="w-6 h-6 text-gray-600 dark:text-gray-400 flex-shrink-0 ml-4" />
        )}
      </button>

      {isOpen && (
        <div className="border-t-2 border-gray-200 dark:border-gray-700">
          <div className="p-6 space-y-4">
            {holiday.timeline.map((event, index) => (
              <div
                key={index}
                className="theme-card border-2 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => toggleEvent(index)}
                  className="w-full p-4 flex items-start justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                      {event.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      📅 {event.date}
                    </p>
                    {event.time && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        ⏰ {event.time}
                      </p>
                    )}
                  </div>
                  {expandedEvents.has(index) ? (
                    <ChevronUp className="w-5 h-5 text-gray-600 dark:text-gray-400 flex-shrink-0 ml-4" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400 flex-shrink-0 ml-4" />
                  )}
                </button>

                {expandedEvents.has(index) && (
                  <div className="border-t-2 border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-800/50 space-y-6">
                    {event.significance && (
                      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                        <h5 className="font-bold text-gray-900 dark:text-white mb-2">
                          Why We Celebrate
                        </h5>
                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                          {event.significance}
                        </p>
                      </div>
                    )}

                    {event.story && (
                      <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border-l-4 border-amber-500">
                        <h5 className="font-bold text-gray-900 dark:text-white mb-2">
                          The Story
                        </h5>
                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                          {event.story}
                        </p>
                      </div>
                    )}

                    {event.verses && event.verses.length > 0 && (
                      <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500">
                        <h5 className="font-bold text-gray-900 dark:text-white mb-3">
                          Supporting Scriptures
                        </h5>
                        <div className="space-y-3">
                          {event.verses.map((verse, vIndex) => (
                            <div key={vIndex} className="space-y-1">
                              <p className="font-semibold text-sm text-gray-900 dark:text-white">
                                {verse.reference}
                              </p>
                              <p className="text-sm text-gray-700 dark:text-gray-300 italic leading-relaxed pl-3 border-l-2 border-green-300 dark:border-green-700">
                                "{verse.text}"
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h5 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                          <span className="text-lg">⛪</span>
                          Catholic
                        </h5>
                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                          {event.catholic}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h5 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                          <span className="text-lg">✝️</span>
                          Protestant
                        </h5>
                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                          {event.protestant}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function ChristianHolidays() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-6xl mx-auto theme-card rounded-2xl shadow-xl p-8 md:p-12 transition-colors">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
          Christian Holiday Origins
        </h1>
        <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
          Discover the true origins and biblical foundations of Christian celebrations, with detailed comparisons of Catholic and Protestant observances.
        </p>

        <div className="mb-12">
          <img
            src="/images/origin1.jpg"
            alt="Empty Tomb - Resurrection"
            className="w-full max-w-3xl h-96 object-cover rounded-2xl shadow-2xl mx-auto"
          />
        </div>

        <div className="mb-8 p-6 theme-card border-2 rounded-xl">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Core Difference
          </h2>
          <div className="space-y-2 text-gray-700 dark:text-gray-300">
            <p>
              <span className="font-bold">Catholic:</span> Structured rhythm across specific days and even specific hours
            </p>
            <p>
              <span className="font-bold">Protestant:</span> Centered mainly around Sunday worship + key event services
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {holidays.map((holiday, index) => (
            <HolidayDropdown key={index} holiday={holiday} />
          ))}
        </div>
      </div>
    </main>
  );
}
