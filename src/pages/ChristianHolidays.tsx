import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface HolidayEvent {
  name: string;
  date: string;
  time?: string;
  catholic: string;
  protestant: string;
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
        protestant: 'Observance varies. Some follow the full 40 days, others don\'t formally observe. Typically marked by weekly Sunday services + optional small groups'
      },
      {
        name: 'Ash Wednesday',
        date: '46 days before Easter',
        time: 'Morning, noon, and evening services',
        catholic: 'Multiple service times throughout the day. Ashes placed on forehead',
        protestant: 'Observed in some churches. Usually one or two services (evening most common)'
      },
      {
        name: 'Holy Week',
        date: 'Palm Sunday → Easter (Final week)',
        catholic: 'Services held daily, often morning and evening',
        protestant: 'Usually centered around Sunday + 1–2 additional services'
      },
      {
        name: 'Palm Sunday',
        date: 'Sunday before Easter',
        time: 'Regular Sunday service times (morning, sometimes multiple services)',
        catholic: 'Formal liturgy with palm distribution',
        protestant: 'Celebrated during Sunday service. Often includes teaching on the Triumphal Entry'
      },
      {
        name: 'Maundy Thursday (Holy Thursday)',
        date: 'Thursday before Easter',
        time: 'Evening service (commonly 6–8 PM)',
        catholic: 'Evening Mass of the Lord\'s Supper. Includes communion and sometimes foot washing',
        protestant: 'Optional service. Usually a communion-focused evening gathering'
      },
      {
        name: 'Good Friday',
        date: 'Friday before Easter',
        time: 'Afternoon (12–3 PM) or evening (6–7 PM)',
        catholic: 'Afternoon service (often around 3 PM, the traditional hour of Jesus\' death). Very solemn, no full Mass',
        protestant: 'Often evening services. Focus on Scripture, reflection, and the cross'
      },
      {
        name: 'Holy Saturday / Easter Vigil',
        date: 'Saturday before Easter',
        time: 'Catholic: after sunset (often 8–10 PM)',
        catholic: 'Major night service (Easter Vigil). Candlelight, readings, celebration of resurrection beginning',
        protestant: 'Less commonly observed. Some churches hold prayer nights or quiet reflection services'
      },
      {
        name: 'Easter Sunday',
        date: 'Sunday (March/April, varies yearly)',
        time: 'Sunrise (~6 AM), morning services (8–11 AM), sometimes evening',
        catholic: 'Multiple Masses throughout the day. Celebratory, marks end of Lent',
        protestant: 'One of the biggest Sundays of the year. Often includes: Sunrise service, Main morning services, Music and community gatherings'
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
                  <div className="border-t-2 border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-800/50">
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
