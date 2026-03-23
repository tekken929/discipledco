import { useState } from 'react';
import { ChevronRight } from 'lucide-react';

interface TreeNode {
  id: string;
  name: string;
  year?: string;
  description: string;
  color: string;
  children?: TreeNode[];
}

const denominationTree: TreeNode = {
  id: 'root',
  name: 'Early Christianity',
  year: '33 AD',
  description: 'The Church begins at Pentecost after Jesus\' resurrection and ascension',
  color: 'from-yellow-400 to-amber-500',
  children: [
    {
      id: 'undivided',
      name: 'Undivided Church',
      year: '33-1054 AD',
      description: 'One unified church under apostolic authority',
      color: 'from-blue-400 to-indigo-500',
      children: [
        {
          id: 'eastern-orthodox',
          name: 'Eastern Orthodox',
          year: '1054 AD',
          description: 'Split over papal authority and theological differences (Great Schism)',
          color: 'from-cyan-400 to-blue-600',
          children: [
            {
              id: 'greek-orthodox',
              name: 'Greek Orthodox',
              description: 'Maintains Greek liturgical traditions',
              color: 'from-sky-400 to-cyan-600'
            },
            {
              id: 'russian-orthodox',
              name: 'Russian Orthodox',
              description: 'Largest Orthodox church by membership',
              color: 'from-blue-400 to-indigo-600'
            },
            {
              id: 'other-orthodox',
              name: 'Other Orthodox',
              description: 'Including Serbian, Romanian, Bulgarian, and more',
              color: 'from-indigo-400 to-blue-600'
            }
          ]
        },
        {
          id: 'roman-catholic',
          name: 'Roman Catholic',
          year: '1054 AD',
          description: 'Remains under papal authority in Rome',
          color: 'from-red-400 to-rose-600',
          children: [
            {
              id: 'protestant',
              name: 'Protestant Reformation',
              year: '1517 AD',
              description: 'Martin Luther challenges papal authority and church practices',
              color: 'from-green-400 to-emerald-600',
              children: [
                {
                  id: 'lutheran',
                  name: 'Lutheran',
                  year: '1517 AD',
                  description: 'Founded by Martin Luther, emphasis on justification by faith',
                  color: 'from-lime-400 to-green-600',
                  children: [
                    {
                      id: 'elca',
                      name: 'ELCA',
                      description: 'Evangelical Lutheran Church in America',
                      color: 'from-green-300 to-lime-500'
                    },
                    {
                      id: 'lcms',
                      name: 'Lutheran Church Missouri Synod',
                      description: 'More conservative Lutheran body',
                      color: 'from-lime-300 to-green-600'
                    }
                  ]
                },
                {
                  id: 'reformed',
                  name: 'Reformed/Presbyterian',
                  year: '1536 AD',
                  description: 'Founded by John Calvin, emphasis on God\'s sovereignty',
                  color: 'from-teal-400 to-cyan-600',
                  children: [
                    {
                      id: 'presbyterian',
                      name: 'Presbyterian',
                      description: 'Church governed by elders (presbyters)',
                      color: 'from-cyan-400 to-teal-600'
                    },
                    {
                      id: 'dutch-reformed',
                      name: 'Dutch Reformed',
                      description: 'Reformed tradition in Netherlands and beyond',
                      color: 'from-teal-300 to-blue-500'
                    }
                  ]
                },
                {
                  id: 'anglican',
                  name: 'Anglican/Episcopal',
                  year: '1534 AD',
                  description: 'Church of England, middle way between Catholic and Protestant',
                  color: 'from-violet-400 to-purple-600',
                  children: [
                    {
                      id: 'episcopal',
                      name: 'Episcopal Church',
                      description: 'Anglican communion in the United States',
                      color: 'from-purple-400 to-violet-600'
                    },
                    {
                      id: 'methodist',
                      name: 'Methodist',
                      year: '1738 AD',
                      description: 'Founded by John Wesley, emphasis on personal holiness',
                      color: 'from-pink-400 to-rose-600',
                      children: [
                        {
                          id: 'umc',
                          name: 'United Methodist',
                          description: 'Largest Methodist denomination',
                          color: 'from-rose-400 to-pink-600'
                        },
                        {
                          id: 'wesleyan',
                          name: 'Wesleyan Church',
                          description: 'Holiness movement tradition',
                          color: 'from-pink-300 to-rose-500'
                        }
                      ]
                    }
                  ]
                },
                {
                  id: 'baptist',
                  name: 'Baptist',
                  year: '1609 AD',
                  description: 'Believer\'s baptism, local church autonomy',
                  color: 'from-amber-400 to-orange-600',
                  children: [
                    {
                      id: 'southern-baptist',
                      name: 'Southern Baptist',
                      description: 'Largest Baptist and Protestant body in US',
                      color: 'from-orange-400 to-amber-600'
                    },
                    {
                      id: 'american-baptist',
                      name: 'American Baptist',
                      description: 'More liberal Baptist tradition',
                      color: 'from-amber-300 to-yellow-500'
                    }
                  ]
                },
                {
                  id: 'pentecostal',
                  name: 'Pentecostal/Charismatic',
                  year: '1906 AD',
                  description: 'Emphasis on Holy Spirit gifts and experience',
                  color: 'from-fuchsia-400 to-pink-600',
                  children: [
                    {
                      id: 'assemblies',
                      name: 'Assemblies of God',
                      description: 'Largest Pentecostal denomination',
                      color: 'from-pink-400 to-fuchsia-600'
                    },
                    {
                      id: 'foursquare',
                      name: 'Foursquare Church',
                      description: 'Founded by Aimee Semple McPherson',
                      color: 'from-fuchsia-300 to-purple-500'
                    },
                    {
                      id: 'charismatic',
                      name: 'Non-denominational Charismatic',
                      description: 'Independent Spirit-filled churches',
                      color: 'from-purple-300 to-pink-500'
                    }
                  ]
                },
                {
                  id: 'non-denominational',
                  name: 'Non-denominational',
                  year: 'Modern',
                  description: 'Independent churches not affiliated with denominations',
                  color: 'from-slate-400 to-gray-600',
                  children: [
                    {
                      id: 'evangelical',
                      name: 'Evangelical',
                      description: 'Conservative Protestant theology',
                      color: 'from-gray-400 to-slate-600'
                    },
                    {
                      id: 'megachurch',
                      name: 'Megachurches',
                      description: 'Large independent congregations',
                      color: 'from-slate-300 to-gray-500'
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

interface BubbleProps {
  node: TreeNode;
  level: number;
}

function Bubble({ node, level }: BubbleProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center mb-8">
        <button
          onClick={() => hasChildren && setIsExpanded(!isExpanded)}
          className={`relative group transition-all duration-300 ${
            hasChildren ? 'cursor-pointer hover:scale-110' : 'cursor-default'
          }`}
          disabled={!hasChildren}
        >
          <div
            className={`bg-gradient-to-br ${node.color} rounded-full shadow-xl p-6 md:p-8 border-4 border-white dark:border-gray-800 transition-all ${
              isExpanded ? 'ring-4 ring-offset-4 ring-offset-gray-50 dark:ring-offset-gray-900' : ''
            }`}
            style={{
              width: `${Math.max(200 - level * 20, 120)}px`,
              height: `${Math.max(200 - level * 20, 120)}px`,
            }}
          >
            <div className="flex flex-col items-center justify-center h-full text-center">
              <h3 className="font-bold text-white text-sm md:text-base mb-1 leading-tight">
                {node.name}
              </h3>
              {node.year && (
                <span className="text-xs text-white/90 font-semibold bg-black/20 px-2 py-1 rounded-full">
                  {node.year}
                </span>
              )}
            </div>
          </div>

          {hasChildren && (
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg border-2 border-gray-200 dark:border-gray-700">
              <ChevronRight
                className={`w-4 h-4 text-gray-700 dark:text-gray-300 transition-transform duration-300 ${
                  isExpanded ? 'rotate-90' : ''
                }`}
              />
            </div>
          )}
        </button>

        <div className="mt-4 max-w-xs text-center">
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            {node.description}
          </p>
        </div>
      </div>

      {isExpanded && hasChildren && (
        <div className="relative">
          <div className="absolute top-0 left-1/2 w-0.5 h-12 bg-gradient-to-b from-gray-400 to-transparent dark:from-gray-600 transform -translate-x-1/2"></div>

          <div className={`flex flex-wrap justify-center gap-12 mt-12 ${
            node.children!.length > 2 ? 'max-w-6xl' : 'max-w-4xl'
          }`}>
            {node.children!.map((child) => (
              <div key={child.id} className="relative">
                <div className="absolute -top-12 left-1/2 w-0.5 h-12 bg-gradient-to-b from-gray-400 to-transparent dark:from-gray-600 transform -translate-x-1/2"></div>
                <Bubble node={child} level={level + 1} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function DenominationTree() {
  return (
    <div className="w-full overflow-x-auto py-12">
      <div className="min-w-full flex justify-center px-4">
        <Bubble node={denominationTree} level={0} />
      </div>

      <div className="mt-16 theme-card rounded-2xl p-6 md:p-8 max-w-3xl mx-auto">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          How to Use This Tree
        </h3>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
          <li className="flex items-start gap-3">
            <span className="text-xl">•</span>
            <span>Click on any bubble to expand and see its branches</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-xl">•</span>
            <span>Each layer represents a major split or movement in Christian history</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-xl">•</span>
            <span>Colors help distinguish different traditions and their relationships</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-xl">•</span>
            <span>Years shown indicate when major splits or movements began</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
