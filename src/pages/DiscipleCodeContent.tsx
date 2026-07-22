import {
  CheckCircle, Star, ArrowRight, BookOpen, Zap,
  Globe, Flame, Shield, Dumbbell, Brain, Trophy, Swords,
  Apple, Cross,
} from 'lucide-react';

const DC_CONFIG = {
  name: 'The Disciple Code',
  website: 'https://thedisciplecode.com',
};

const DC_FEATURES = [
  {
    icon: Flame,
    headline: 'Faith Fueled by Fire',
    sub: 'A code for those who refuse to settle for spiritual mediocrity.',
    body: 'The Disciple Code is built for believers who want more — more depth, more discipline, more impact. Rooted in Scripture, this is a lifestyle code for everyday warriors who want to follow Jesus with everything they have.',
    accent: 'text-orange-500',
    badge: 'bg-orange-950/60 text-orange-400 border border-orange-800/50',
    label: 'The Code',
  },
  {
    icon: Dumbbell,
    headline: 'Fitness Meets Faith',
    sub: 'Your body is a temple — train it like one.',
    body: 'Physical discipline and spiritual discipline go hand in hand. The Disciple Code connects your pursuit of physical strength with your pursuit of godly character — consistency, endurance, and purpose.',
    accent: 'text-red-500',
    badge: 'bg-red-950/60 text-red-400 border border-red-800/50',
    label: 'Fitness',
  },
  {
    icon: Brain,
    headline: 'Mindset & Lifestyle',
    sub: 'Transform your thinking, transform your life.',
    body: 'Renewing your mind is not optional — it is commanded. The Disciple Code digs into the mental and lifestyle habits that separate those who drift from those who dominate. Real talk, real truth, real results.',
    accent: 'text-amber-500',
    badge: 'bg-amber-950/60 text-amber-400 border border-amber-800/50',
    label: 'Mindset',
  },
  {
    icon: Shield,
    headline: 'Defend Your Identity in Christ',
    sub: 'Know who you are and refuse to be moved.',
    body: 'The world will try to define you. The Disciple Code equips you with Scripture, truth, and a battle-tested identity rooted in who God says you are — so you can stand firm when everything around you shakes.',
    accent: 'text-sky-500',
    badge: 'bg-sky-950/60 text-sky-400 border border-sky-800/50',
    label: 'Identity',
  },
];

const MEN_OF_BIBLE = [
  {
    name: 'David',
    title: 'Warrior King',
    trait: 'Courage',
    verse: '1 Samuel 17:45',
    desc: 'A shepherd boy who killed giants and became a king after God\'s own heart. Imperfect, battle-scarred, and fully surrendered.',
    color: 'border-orange-700/60',
    accent: 'text-orange-400',
    bg: 'bg-orange-950/30',
  },
  {
    name: 'Daniel',
    title: 'Unbreakable',
    trait: 'Conviction',
    verse: 'Daniel 6:10',
    desc: 'Thrown to lions for refusing to bend. He prayed three times daily with the whole empire watching. That\'s a man who owns his faith.',
    color: 'border-red-700/60',
    accent: 'text-red-400',
    bg: 'bg-red-950/30',
  },
  {
    name: 'Samson',
    title: 'Set Apart',
    trait: 'Strength',
    verse: 'Judges 16:28',
    desc: 'Raw power given by God. Fell hard, rose harder. Even in his worst moment, he called on God — and God answered.',
    color: 'border-amber-700/60',
    accent: 'text-amber-400',
    bg: 'bg-amber-950/30',
  },
  {
    name: 'Paul',
    title: 'Relentless',
    trait: 'Endurance',
    verse: 'Philippians 4:13',
    desc: 'Beaten, shipwrecked, imprisoned, left for dead — and he kept going. No man in Scripture understood hardness like Paul.',
    color: 'border-slate-600/60',
    accent: 'text-slate-300',
    bg: 'bg-slate-900/50',
  },
  {
    name: 'Joshua',
    title: 'No Fear',
    trait: 'Bold Leadership',
    verse: 'Joshua 1:9',
    desc: '"Be strong and courageous." God said it three times in one chapter. Joshua walked into enemy territory and never flinched.',
    color: 'border-green-700/60',
    accent: 'text-green-400',
    bg: 'bg-green-950/30',
  },
  {
    name: 'Elijah',
    title: 'Fire & Storm',
    trait: 'Boldness',
    verse: '1 Kings 18:36',
    desc: 'Stood alone against 450 false prophets. Called fire from heaven. Real men stand for truth even when they stand alone.',
    color: 'border-yellow-700/60',
    accent: 'text-yellow-400',
    bg: 'bg-yellow-950/30',
  },
];

const CODE_PILLARS = ['Protector', 'Provider', 'Leader', 'Husband', 'Father', 'Servant'];

function ActionButtons({ large = false }: { large?: boolean }) {
  const base = large ? 'px-7 py-4 text-sm' : 'px-5 py-3 text-xs';
  return (
    <div className="flex flex-wrap items-center gap-3">
      <a
        href={DC_CONFIG.website}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-none border border-orange-500 transition-all hover:scale-105 shadow-lg uppercase tracking-widest ${base}`}
      >
        <Globe className={large ? 'w-4 h-4' : 'w-3.5 h-3.5'} />
        Visit the Website
        <ArrowRight className={large ? 'w-4 h-4' : 'w-3.5 h-3.5'} />
      </a>
      <button
        disabled
        title="App coming soon"
        className={`inline-flex items-center gap-2 bg-zinc-800/60 text-zinc-500 font-bold rounded-none border border-zinc-700/50 cursor-not-allowed uppercase tracking-widest ${base}`}
      >
        <Apple className={large ? 'w-4 h-4' : 'w-3.5 h-3.5'} />
        App Store
        <span className="text-[9px] font-normal normal-case tracking-normal text-zinc-600 border border-zinc-700 px-1.5 py-0.5 rounded">Soon</span>
      </button>
    </div>
  );
}

export function DiscipleCodeContent() {
  return (
    <div className="bg-[#0a0907]">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-[#0a0907]">
        {/* Noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'1\'/%3E%3C/svg%3E")', backgroundRepeat: 'repeat', backgroundSize: '128px' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-950/5 to-[#0a0907]" />

        {/* Full-bleed hero image */}
        <div className="relative">
          <img
            src="/images/main_logo_header1.png"
            alt="The Disciple Code — Live By The Code. Lead By Example."
            className="w-full max-h-[90vh] object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0907] via-transparent to-transparent" />

          {/* Overlaid CTA */}
          <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-8 pb-10 pt-20">
            <div className="max-w-6xl mx-auto">
              <ActionButtons large />
            </div>
          </div>
        </div>
      </section>

      {/* ── BRAND BANNER ── */}
      <section className="bg-[#0f0c09] border-y border-orange-900/40 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <img
            src="/images/main_app_image_2.png"
            alt="The Disciple Code App"
            className="w-full rounded-sm shadow-2xl shadow-black/60"
          />
        </div>
      </section>

      {/* ── PILLARS BAR ── */}
      <section className="bg-[#111009] border-b border-zinc-800/60 py-6 overflow-x-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="flex items-center justify-between gap-6 min-w-max mx-auto">
            {CODE_PILLARS.map((p, i) => (
              <div key={p} className="flex items-center gap-4">
                <span className="text-xs font-black uppercase tracking-[0.25em] text-zinc-400 whitespace-nowrap">{p}</span>
                {i < CODE_PILLARS.length - 1 && (
                  <span className="text-orange-700 text-lg font-thin">+</span>
                )}
              </div>
            ))}
          </div>
          <p className="text-center text-[10px] uppercase tracking-[0.3em] text-orange-600/70 mt-4 font-bold">
            1 Timothy 6:11
          </p>
        </div>
      </section>

      {/* ── MANIFESTO ── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 39px, #f97316 39px, #f97316 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, #f97316 39px, #f97316 40px)' }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-8 text-center">
          <Swords className="w-10 h-10 text-orange-600 mx-auto mb-6" />
          <p className="text-[11px] font-black uppercase tracking-[0.4em] text-orange-600 mb-4">The Manifesto</p>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-[1.05] tracking-tight uppercase">
            Following Jesus<br />
            <span className="text-orange-500">Costs Everything.</span>
          </h2>
          <div className="border border-orange-900/60 bg-orange-950/20 p-8 md:p-12 mb-8">
            <p className="text-xl md:text-2xl font-bold text-white/80 leading-relaxed">
              This is not a self-help program. This is not a Sunday-only lifestyle.<br />
              <span className="text-orange-400">This is a war — and you need a code to fight it.</span>
            </p>
          </div>
          <p className="text-zinc-500 text-base leading-relaxed max-w-2xl mx-auto">
            The Disciple Code merges faith, fitness, and focused living into a practical daily code
            for men who are done going through the motions.
          </p>
        </div>
      </section>

      {/* ── FEATURES GRID ── */}
      <section className="py-20 bg-[#0d0b08] border-t border-zinc-800/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="mb-14">
            <p className="text-[11px] font-black uppercase tracking-[0.4em] text-orange-600 mb-3">The Four Pillars</p>
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase leading-tight tracking-tight">
              A Life of Discipline<br />Starts with a Decision
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-zinc-800/40">
            {DC_FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.headline}
                  className={`p-8 ${feature.bg} hover:bg-opacity-60 transition-colors group`}
                >
                  <span className={`inline-block text-[9px] font-black uppercase tracking-[0.3em] px-3 py-1 mb-5 border ${feature.badge}`}>
                    {feature.label}
                  </span>
                  <div className="flex items-start gap-4">
                    <Icon className={`w-8 h-8 ${feature.accent} flex-shrink-0 mt-0.5`} />
                    <div>
                      <h3 className="text-lg font-black text-white mb-1 uppercase tracking-tight leading-tight">
                        {feature.headline}
                      </h3>
                      <p className={`text-sm font-bold ${feature.accent} mb-3`}>{feature.sub}</p>
                      <p className="text-zinc-500 text-sm leading-relaxed">{feature.body}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── MEN OF THE BIBLE ── */}
      <section className="py-24 bg-[#0a0907] border-t border-zinc-800/50 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-700/60 to-transparent" />
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'1\'/%3E%3C/svg%3E")', backgroundRepeat: 'repeat', backgroundSize: '128px' }}
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-16">
            <p className="text-[11px] font-black uppercase tracking-[0.4em] text-orange-600 mb-4">Hall of Warriors</p>
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase leading-tight tracking-tight mb-4">
              Men of the Bible
            </h2>
            <div className="w-16 h-px bg-orange-600 mx-auto mb-6" />
            <p className="text-zinc-500 max-w-xl mx-auto text-sm leading-relaxed">
              These were not perfect men. They were broken, tested, and battle-worn.
              But they answered the call — and God used them to change history.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {MEN_OF_BIBLE.map((man) => (
              <div
                key={man.name}
                className={`relative border-l-2 ${man.color} ${man.bg} p-6 hover:border-l-4 transition-all group`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight leading-none mb-1">
                      {man.name}
                    </h3>
                    <p className={`text-[10px] font-black uppercase tracking-[0.3em] ${man.accent}`}>
                      {man.title}
                    </p>
                  </div>
                  <span className={`text-[9px] font-black uppercase tracking-widest border px-2 py-1 ${man.color} ${man.accent}`}>
                    {man.trait}
                  </span>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed mb-4">{man.desc}</p>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-px bg-orange-700" />
                  <p className={`text-[10px] font-black uppercase tracking-widest ${man.accent}`}>
                    {man.verse}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 border border-orange-900/50 bg-orange-950/20 p-8 text-center">
            <BookOpen className="w-8 h-8 text-orange-500 mx-auto mb-4" />
            <p className="text-white font-black text-xl uppercase tracking-tight mb-2">
              Their Stories Are Your Blueprint
            </p>
            <p className="text-zinc-500 text-sm max-w-lg mx-auto">
              The Bible is not a book of fairy tales. It is a field manual written in blood,
              sweat, and sacrifice by men who walked with God through hell and back.
            </p>
          </div>
        </div>
      </section>

      {/* ── CONTENT & COMMUNITY ── */}
      <section className="py-24 bg-[#0d0b08] border-t border-zinc-800/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Zap className="w-8 h-8 text-orange-500 mb-5" />
              <p className="text-[11px] font-black uppercase tracking-[0.4em] text-orange-600 mb-3">Content & Community</p>
              <h2 className="text-3xl md:text-4xl font-black text-white uppercase leading-tight mb-5 tracking-tight">
                The Podcast.<br />The Community.<br />The Code.
              </h2>
              <p className="text-zinc-500 text-base leading-relaxed mb-6">
                No filter. No fluff. Real conversations about faith, fitness, discipline, and what it
                actually looks like to follow Jesus in real life. Raw truth, front and center.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Honest conversations about faith and real life',
                  'Practical steps to build daily discipline',
                  'Fitness principles grounded in Scripture',
                  'Community of like-minded warriors',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-zinc-400">
                    <CheckCircle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <ActionButtons />
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-orange-600/5 blur-2xl rounded-full" />
              <div className="relative border border-zinc-800/60 overflow-hidden">
                <img
                  src="/images/main_logo_header1.png"
                  alt="The Disciple Code"
                  className="w-full object-cover max-h-[520px] object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b08]/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-400 mb-1">Live By The Code</p>
                  <p className="text-white font-black text-xl uppercase tracking-tight">Lead By Example.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSION QUOTE ── */}
      <section className="py-20 bg-[#0a0907] border-t border-zinc-800/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center">
          <Trophy className="w-10 h-10 text-orange-600 mx-auto mb-6" />
          <p className="text-[11px] font-black uppercase tracking-[0.4em] text-orange-600 mb-4">The Mission</p>
          <p className="text-zinc-500 text-base leading-relaxed mb-10 max-w-2xl mx-auto">
            The Disciple Code exists to equip men with a practical framework for living out their
            faith every single day — not just on Sundays. In the gym, at home, at work, and
            everywhere life demands a man to stand.
          </p>
          <div className="border-l-4 border-orange-600 pl-6 text-left max-w-xl mx-auto mb-10">
            <p className="text-2xl font-black text-white italic uppercase leading-tight mb-2">
              "I can do all things through Christ who strengthens me."
            </p>
            <cite className="text-orange-500 font-black text-sm not-italic uppercase tracking-widest">
              Philippians 4:13
            </cite>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-24 bg-[#0d0b08] border-t border-zinc-800/50 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-700/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-orange-950/10 to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-8 text-center">
          <div className="w-16 h-16 border-2 border-orange-700/60 mx-auto mb-8 flex items-center justify-center">
            <Swords className="w-8 h-8 text-orange-500" />
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase leading-[1.05] tracking-tight mb-5">
            Are You Ready to<br />
            <span className="text-orange-500">Live The Code?</span>
          </h2>
          <p className="text-zinc-500 text-base mb-10 max-w-lg mx-auto leading-relaxed">
            Visit the website, explore the content, and join a brotherhood of believers
            who refuse to settle for anything less than everything God called them to be.
          </p>
          <div className="flex justify-center">
            <ActionButtons large />
          </div>
          <div className="mt-12 flex items-center justify-center gap-6 text-zinc-700 text-[10px] uppercase tracking-[0.3em] font-black">
            <span>Faith</span>
            <span className="text-orange-800">+</span>
            <span>Fitness</span>
            <span className="text-orange-800">+</span>
            <span>Discipline</span>
            <span className="text-orange-800">+</span>
            <span>thedisciplecode.com</span>
          </div>
        </div>
      </section>
    </div>
  );
}
