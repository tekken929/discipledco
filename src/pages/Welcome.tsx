import { Link } from 'react-router-dom';

export function Welcome() {
  const bubbles = [
    {
      to: '/easter',
      title: 'Easter',
      subtitle: 'He Is Risen',
      style: {
        top: '5%',
        left: '15%',
        width: '220px',
        height: '180px',
        background: 'linear-gradient(135deg, #fef3c7 0%, #fce7f3 25%, #ddd6fe 50%, #bfdbfe 75%, #a7f3d0 100%)',
        borderRadius: '45% 55% 60% 40% / 50% 45% 55% 50%',
        border: '4px solid rgba(236, 72, 153, 0.4)'
      },
      textStyle: 'bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent',
      size: 'text-2xl'
    },
    {
      to: '/resurrection',
      title: 'Resurrection',
      subtitle: 'P52 Evidence',
      style: {
        top: '8%',
        right: '12%',
        width: '260px',
        height: '200px',
        backgroundImage: 'url(/images/p52.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '40% 60% 55% 45% / 60% 40% 60% 40%',
        border: '4px solid rgba(245, 158, 11, 0.5)'
      },
      overlay: 'bg-gradient-to-r from-black/80 via-black/60 to-black/80',
      textStyle: 'text-amber-100',
      size: 'text-2xl'
    },
    {
      to: '/bible',
      title: 'Bible Overview',
      subtitle: '66 Books',
      style: {
        top: '28%',
        left: '8%',
        width: '200px',
        height: '160px',
        background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
        borderRadius: '50% 50% 45% 55% / 55% 60% 40% 45%',
        border: '3px solid rgba(59, 130, 246, 0.6)'
      },
      textStyle: 'text-white',
      size: 'text-xl'
    },
    {
      to: '/bible-versions',
      title: 'Bible Versions',
      subtitle: 'Translations',
      style: {
        top: '25%',
        left: '38%',
        width: '180px',
        height: '140px',
        background: 'linear-gradient(135deg, #10b981 0%, #047857 100%)',
        borderRadius: '60% 40% 50% 50% / 40% 55% 45% 60%',
        border: '3px solid rgba(16, 185, 129, 0.6)'
      },
      textStyle: 'text-white',
      size: 'text-lg'
    },
    {
      to: '/topics',
      title: 'Biblical Topics',
      subtitle: 'Life Guidance',
      style: {
        top: '22%',
        right: '18%',
        width: '210px',
        height: '170px',
        background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
        borderRadius: '45% 55% 48% 52% / 52% 48% 52% 48%',
        border: '3px solid rgba(139, 92, 246, 0.6)'
      },
      textStyle: 'text-white',
      size: 'text-xl'
    },
    {
      to: '/stories',
      title: 'Bible Stories',
      subtitle: 'Scripture Tales',
      style: {
        top: '50%',
        left: '12%',
        width: '190px',
        height: '150px',
        background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
        borderRadius: '55% 45% 60% 40% / 45% 50% 50% 55%',
        border: '3px solid rgba(245, 158, 11, 0.6)'
      },
      textStyle: 'text-white',
      size: 'text-xl'
    },
    {
      to: '/religions',
      title: 'Religions',
      subtitle: 'Church History',
      style: {
        top: '48%',
        right: '25%',
        width: '200px',
        height: '165px',
        background: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)',
        borderRadius: '50% 50% 40% 60% / 60% 40% 60% 40%',
        border: '3px solid rgba(239, 68, 68, 0.6)'
      },
      textStyle: 'text-white',
      size: 'text-xl'
    },
    {
      to: '/music',
      title: 'Music',
      subtitle: 'Psalms & Hymns',
      style: {
        top: '70%',
        left: '20%',
        width: '180px',
        height: '145px',
        background: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)',
        borderRadius: '40% 60% 55% 45% / 50% 60% 40% 50%',
        border: '3px solid rgba(236, 72, 153, 0.6)'
      },
      textStyle: 'text-white',
      size: 'text-lg'
    },
    {
      to: '/preaching',
      title: 'Wisdom',
      subtitle: 'Sermons',
      style: {
        top: '68%',
        right: '15%',
        width: '170px',
        height: '135px',
        background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
        borderRadius: '65% 35% 50% 50% / 45% 55% 45% 55%',
        border: '3px solid rgba(6, 182, 212, 0.6)'
      },
      textStyle: 'text-white',
      size: 'text-lg'
    },
    {
      to: '/books',
      title: 'Books',
      subtitle: 'Resources',
      style: {
        top: '45%',
        left: '45%',
        width: '160px',
        height: '130px',
        background: 'linear-gradient(135deg, #14b8a6 0%, #0f766e 100%)',
        borderRadius: '48% 52% 58% 42% / 52% 48% 52% 48%',
        border: '3px solid rgba(20, 184, 166, 0.6)'
      },
      textStyle: 'text-white',
      size: 'text-lg'
    },
    {
      to: '/church-mentors',
      title: 'Mentors',
      subtitle: 'Church Leaders',
      style: {
        top: '85%',
        left: '45%',
        width: '175px',
        height: '140px',
        background: 'linear-gradient(135deg, #f97316 0%, #c2410c 100%)',
        borderRadius: '55% 45% 40% 60% / 60% 50% 50% 40%',
        border: '3px solid rgba(249, 115, 22, 0.6)'
      },
      textStyle: 'text-white',
      size: 'text-lg'
    },
    {
      to: '/podcasts',
      title: 'Podcasts',
      subtitle: 'Audio Teaching',
      style: {
        top: '65%',
        left: '62%',
        width: '165px',
        height: '135px',
        background: 'linear-gradient(135deg, #6366f1 0%, #4338ca 100%)',
        borderRadius: '42% 58% 52% 48% / 58% 42% 58% 42%',
        border: '3px solid rgba(99, 102, 241, 0.6)'
      },
      textStyle: 'text-white',
      size: 'text-lg'
    },
    {
      to: '/christian-holidays',
      title: 'Holiday Origins',
      subtitle: 'Easter, Christmas',
      style: {
        top: '12%',
        left: '62%',
        width: '185px',
        height: '145px',
        background: 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)',
        borderRadius: '50% 50% 55% 45% / 48% 52% 48% 52%',
        border: '3px solid rgba(168, 85, 247, 0.6)'
      },
      textStyle: 'text-white',
      size: 'text-lg'
    },
    {
      to: '/faqs',
      title: 'FAQs',
      subtitle: 'Common Questions',
      style: {
        top: '85%',
        right: '8%',
        width: '170px',
        height: '135px',
        background: 'linear-gradient(135deg, #84cc16 0%, #65a30d 100%)',
        borderRadius: '58% 42% 45% 55% / 55% 45% 55% 45%',
        border: '3px solid rgba(132, 204, 22, 0.6)'
      },
      textStyle: 'text-white',
      size: 'text-lg'
    },
    {
      to: '/guidance',
      title: 'Guidance',
      subtitle: 'Daily Wisdom',
      style: {
        top: '42%',
        right: '8%',
        width: '175px',
        height: '140px',
        background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
        borderRadius: '52% 48% 60% 40% / 45% 55% 45% 55%',
        border: '3px solid rgba(14, 165, 233, 0.6)'
      },
      textStyle: 'text-white',
      size: 'text-lg'
    },
    {
      to: '/timeline',
      title: 'Timeline',
      subtitle: 'Biblical History',
      style: {
        top: '3%',
        left: '42%',
        width: '155px',
        height: '125px',
        background: 'linear-gradient(135deg, #64748b 0%, #475569 100%)',
        borderRadius: '60% 40% 52% 48% / 50% 50% 50% 50%',
        border: '3px solid rgba(100, 116, 139, 0.6)'
      },
      textStyle: 'text-white',
      size: 'text-base'
    }
  ];

  return (
    <main className="relative min-h-screen overflow-hidden pb-24 pt-8">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"></div>

      <div className="relative" style={{ minHeight: '1200px' }}>
        {bubbles.map((bubble, index) => (
          <Link
            key={bubble.to}
            to={bubble.to}
            className="absolute print:hidden transition-all duration-500 hover:scale-110 hover:shadow-3xl hover:z-50 group cursor-pointer overflow-hidden shadow-2xl"
            style={{
              ...bubble.style,
              animation: `float ${5 + index * 0.3}s ease-in-out infinite`,
              animationDelay: `${index * 0.2}s`
            }}
          >
            {bubble.overlay && (
              <div className={`absolute inset-0 ${bubble.overlay} group-hover:opacity-70 transition-all flex flex-col items-center justify-center p-4 text-center`}>
                <h2 className={`font-bold ${bubble.textStyle} ${bubble.size} mb-1`} style={{ fontFamily: 'Georgia, serif', textShadow: '0 2px 8px rgba(0,0,0,0.9)' }}>
                  {bubble.title}
                </h2>
                <p className="text-sm opacity-90">{bubble.subtitle}</p>
              </div>
            )}
            {!bubble.overlay && (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                <h2 className={`font-bold ${bubble.textStyle} ${bubble.size} mb-1`} style={{ fontFamily: 'Georgia, serif', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
                  {bubble.title}
                </h2>
                <p className={`text-sm ${bubble.textStyle} opacity-90`}>{bubble.subtitle}</p>
              </div>
            )}
          </Link>
        ))}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-10px) rotate(1deg);
          }
          50% {
            transform: translateY(-5px) rotate(-1deg);
          }
          75% {
            transform: translateY(-15px) rotate(0.5deg);
          }
        }
      `}</style>
    </main>
  );
}
