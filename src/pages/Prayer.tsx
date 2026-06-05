import { useState, useEffect, useCallback } from 'react';
import { Sun, Sunset, Moon, Star, ChevronDown, ChevronUp, BookOpen, Heart, Wind, Flame, Clock, Calendar, ArrowLeft, Play, Pause, RotateCcw, Check } from 'lucide-react';
import { ReturnToHome } from '../components/ReturnToHome';
import { supabase } from '../lib/supabase';

// ─── Types ────────────────────────────────────────────────────────────────────

type Office = 'morning' | 'midday' | 'evening' | 'compline';
type Step = 'opening' | 'psalm' | 'scripture' | 'prayers' | 'closing';

interface Verse {
  book: string;
  chapter: number;
  verse: number;
  text: string;
}

interface DailyReading {
  book: string;
  chapter: number;
  startVerse: number;
  endVerse: number;
}

// ─── BCP Prayer Data ──────────────────────────────────────────────────────────

const OFFICES: Record<Office, {
  label: string;
  subtitle: string;
  icon: React.ReactNode;
  gradient: string;
  accentColor: string;
  borderColor: string;
  tagBg: string;
  timeLabel: string;
  openingSentence: { text: string; reference: string };
  confession: string[];
  absolution: string;
  invitatory: { versicle: string; response: string }[];
  canticle: { title: string; lines: string[] };
  responsory: { versicle: string; response: string }[];
  lordsPrayer: string[];
  collects: { title: string; text: string }[];
  blessing: string;
  psalm: number;
  reading: DailyReading;
}> = {
  morning: {
    label: 'Morning Prayer',
    subtitle: 'Lauds — The First Hour',
    icon: <Sun className="w-6 h-6" />,
    gradient: 'from-amber-50 via-orange-50 to-yellow-50 dark:from-amber-950/40 dark:via-orange-950/30 dark:to-yellow-950/20',
    accentColor: 'text-amber-700 dark:text-amber-400',
    borderColor: 'border-amber-300 dark:border-amber-700',
    tagBg: 'bg-amber-100 dark:bg-amber-900/40',
    timeLabel: 'Dawn · 6:00 AM',
    openingSentence: {
      text: 'O Lord, open thou my lips; and my mouth shall shew forth thy praise.',
      reference: 'Psalm 51:15',
    },
    confession: [
      'Almighty and most merciful Father,',
      'we have erred and strayed from thy ways like lost sheep,',
      'we have followed too much the devices and desires of our own hearts,',
      'we have offended against thy holy laws,',
      'we have left undone those things which we ought to have done,',
      'and we have done those things which we ought not to have done.',
      'But thou, O Lord, have mercy upon us.',
      'Spare thou those who confess their faults.',
      'Restore thou those who are penitent,',
      'according to thy promises declared unto mankind',
      'in Christ Jesus our Lord.',
      'And grant, O most merciful Father, for his sake,',
      'that we may hereafter live a godly, righteous, and sober life,',
      'to the glory of thy holy Name. Amen.',
    ],
    absolution: 'The Almighty and merciful Lord grant you absolution and remission of all your sins, true repentance, amendment of life, and the grace and consolation of his Holy Spirit. Amen.',
    invitatory: [
      { versicle: 'O Lord, open thou our lips.', response: 'And our mouth shall shew forth thy praise.' },
      { versicle: 'O God, make speed to save us.', response: 'O Lord, make haste to help us.' },
      { versicle: 'Glory be to the Father, and to the Son, and to the Holy Ghost.', response: 'As it was in the beginning, is now, and ever shall be, world without end. Amen.' },
      { versicle: 'Praise ye the Lord.', response: 'The Lord\'s name be praised.' },
    ],
    canticle: {
      title: 'Venite — O Come, Let Us Sing',
      lines: [
        'O come, let us sing unto the Lord; *',
        '  let us heartily rejoice in the strength of our salvation.',
        'Let us come before his presence with thanksgiving; *',
        '  and shew ourselves glad in him with psalms.',
        'For the Lord is a great God; *',
        '  and a great King above all gods.',
        'In his hand are all the corners of the earth; *',
        '  and the strength of the hills is his also.',
        'The sea is his, and he made it; *',
        '  and his hands prepared the dry land.',
        'O come, let us worship and fall down, *',
        '  and kneel before the Lord our Maker.',
        'For he is the Lord our God; *',
        '  and we are the people of his pasture, and the sheep of his hand.',
        'Glory be to the Father, and to the Son, and to the Holy Ghost; *',
        '  as it was in the beginning, is now, and ever shall be, world without end. Amen.',
      ],
    },
    responsory: [
      { versicle: 'Into thy hands, O Lord, I commend my spirit.', response: 'For thou hast redeemed me, O Lord, thou God of truth.' },
      { versicle: 'Keep me as the apple of an eye.', response: 'Hide me under the shadow of thy wings.' },
    ],
    lordsPrayer: [
      'Our Father, who art in heaven,',
      'hallowed be thy Name,',
      'thy kingdom come,',
      'thy will be done,',
      'on earth as it is in heaven.',
      'Give us this day our daily bread.',
      'And forgive us our trespasses,',
      'as we forgive those who trespass against us.',
      'And lead us not into temptation,',
      'but deliver us from evil.',
      'For thine is the kingdom, and the power,',
      'and the glory, for ever and ever. Amen.',
    ],
    collects: [
      {
        title: 'A Collect for Grace',
        text: 'O Lord our heavenly Father, Almighty and everlasting God, who hast safely brought us to the beginning of this day: Defend us in the same with thy mighty power; and grant that this day we fall into no sin, neither run into any kind of danger; but that all our doings, being ordered by thy governance, may be righteous in thy sight; through Jesus Christ our Lord. Amen.',
      },
      {
        title: 'A Collect for Peace',
        text: 'O God, the author of peace and lover of concord, to know whom is eternal life and whose service is perfect freedom: Defend us, thy humble servants, in all assaults of our enemies; that we, surely trusting in thy defense, may not fear the power of any adversaries; through the might of Jesus Christ our Lord. Amen.',
      },
      {
        title: 'A Prayer for Mission',
        text: 'Almighty and everlasting God, by whose Spirit the whole body of thy faithful people is governed and sanctified: Receive our supplications and prayers which we offer before thee for all members of thy holy Church, that in their vocation and ministry they may truly and godly serve thee; through our Lord and Savior Jesus Christ. Amen.',
      },
    ],
    blessing: 'The grace of our Lord Jesus Christ, and the love of God, and the fellowship of the Holy Ghost, be with us all evermore. Amen.',
    psalm: 95,
    reading: { book: 'Psalms', chapter: 95, startVerse: 1, endVerse: 7 },
  },

  midday: {
    label: 'Midday Prayer',
    subtitle: 'Sext — The Sixth Hour',
    icon: <Flame className="w-6 h-6" />,
    gradient: 'from-sky-50 via-blue-50 to-cyan-50 dark:from-sky-950/40 dark:via-blue-950/30 dark:to-cyan-950/20',
    accentColor: 'text-sky-700 dark:text-sky-400',
    borderColor: 'border-sky-300 dark:border-sky-700',
    tagBg: 'bg-sky-100 dark:bg-sky-900/40',
    timeLabel: 'Noon · 12:00 PM',
    openingSentence: {
      text: 'O God, make speed to save us. O Lord, make haste to help us.',
      reference: 'Psalm 70:1',
    },
    confession: [
      'Most merciful God,',
      'we confess that we have sinned against you',
      'in thought, word, and deed,',
      'by what we have done,',
      'and by what we have left undone.',
      'We have not loved you with our whole heart;',
      'we have not loved our neighbors as ourselves.',
      'We are truly sorry and we humbly repent.',
      'For the sake of your Son Jesus Christ,',
      'have mercy on us and forgive us;',
      'that we may delight in your will,',
      'and walk in your ways,',
      'to the glory of your Name. Amen.',
    ],
    absolution: 'Almighty God have mercy on you, forgive you all your sins through our Lord Jesus Christ, strengthen you in all goodness, and by the power of the Holy Spirit keep you in eternal life. Amen.',
    invitatory: [
      { versicle: 'O God, make speed to save us.', response: 'O Lord, make haste to help us.' },
      { versicle: 'Glory to the Father, and to the Son, and to the Holy Spirit.', response: 'As it was in the beginning, is now, and will be for ever. Amen.' },
    ],
    canticle: {
      title: 'A Song of Creation — Benedicite',
      lines: [
        'Glorify the Lord, all you works of the Lord, *',
        '  praise him and highly exalt him for ever.',
        'In the firmament of his power, glorify the Lord, *',
        '  praise him and highly exalt him for ever.',
        'Glorify the Lord, you angels and all powers of the Lord, *',
        '  O heavens and all waters above the heavens.',
        'Sun and moon and stars of the sky, glorify the Lord, *',
        '  praise him and highly exalt him for ever.',
        'Let the earth glorify the Lord, *',
        '  praise him and highly exalt him for ever.',
        'Glorify the Lord, O mountains and hills,',
        '  and all that grows upon the earth, *',
        '  praise him and highly exalt him for ever.',
      ],
    },
    responsory: [
      { versicle: 'Blessed be the Lord, the God of Israel.', response: 'Who has redeemed his people.' },
      { versicle: 'And has raised up a mighty Savior for us.', response: 'In the house of his servant David.' },
    ],
    lordsPrayer: [
      'Our Father in heaven,',
      'hallowed be your Name,',
      'your kingdom come,',
      'your will be done,',
      'on earth as in heaven.',
      'Give us today our daily bread.',
      'Forgive us our sins',
      'as we forgive those who sin against us.',
      'Save us from the time of trial,',
      'and deliver us from evil.',
      'For the kingdom, the power, and the glory are yours,',
      'now and for ever. Amen.',
    ],
    collects: [
      {
        title: 'A Collect for Guidance',
        text: 'Blessed Savior, at this hour you hung upon the cross, stretching out your loving arms: Grant that all the peoples of the earth may look to you and be saved; for your mercies\' sake. Amen.',
      },
      {
        title: 'For the Presence of God',
        text: 'Lord Jesus Christ, you said to your apostles, "Peace I give to you; my own peace I leave with you:" Regard not our sins, but the faith of your Church, and give to us the peace and unity of that heavenly City, where with the Father and the Holy Spirit you live and reign, now and for ever. Amen.',
      },
    ],
    blessing: 'The peace of God, which passes all understanding, keep your hearts and minds in the knowledge and love of God, and of his Son Jesus Christ our Lord; and the blessing of God Almighty, the Father, the Son, and the Holy Spirit, be among you and remain with you always. Amen.',
    psalm: 119,
    reading: { book: 'Psalms', chapter: 119, startVerse: 105, endVerse: 112 },
  },

  evening: {
    label: 'Evening Prayer',
    subtitle: 'Vespers — The Ninth Hour',
    icon: <Sunset className="w-6 h-6" />,
    gradient: 'from-violet-50 via-purple-50 to-rose-50 dark:from-violet-950/40 dark:via-purple-950/30 dark:to-rose-950/20',
    accentColor: 'text-violet-700 dark:text-violet-400',
    borderColor: 'border-violet-300 dark:border-violet-700',
    tagBg: 'bg-violet-100 dark:bg-violet-900/40',
    timeLabel: 'Dusk · 6:00 PM',
    openingSentence: {
      text: 'Let my prayer be set forth in thy sight as incense; and the lifting up of my hands as the evening sacrifice.',
      reference: 'Psalm 141:2',
    },
    confession: [
      'Most merciful God,',
      'we confess that we have sinned against thee',
      'in thought, word, and deed,',
      'by what we have done,',
      'and by what we have left undone.',
      'We have not loved thee with our whole heart;',
      'we have not loved our neighbours as ourselves.',
      'We are truly sorry and we humbly repent.',
      'For the sake of thy Son Jesus Christ,',
      'have mercy on us and forgive us;',
      'that we may delight in thy will,',
      'and walk in thy ways,',
      'to the glory of thy Name. Amen.',
    ],
    absolution: 'Almighty God have mercy on you, forgive you all your sins through our Lord Jesus Christ, strengthen you in all goodness, and by the power of the Holy Spirit keep you in eternal life. Amen.',
    invitatory: [
      { versicle: 'O God, make speed to save us.', response: 'O Lord, make haste to help us.' },
      { versicle: 'Glory be to the Father, and to the Son, and to the Holy Ghost.', response: 'As it was in the beginning, is now, and ever shall be, world without end. Amen.' },
      { versicle: 'Praise ye the Lord.', response: 'The Lord\'s name be praised.' },
    ],
    canticle: {
      title: 'Magnificat — The Song of Mary',
      lines: [
        'My soul doth magnify the Lord, *',
        '  and my spirit hath rejoiced in God my Savior.',
        'For he hath regarded *',
        '  the lowliness of his handmaiden.',
        'For behold, from henceforth *',
        '  all generations shall call me blessed.',
        'For he that is mighty hath magnified me; *',
        '  and holy is his Name.',
        'And his mercy is on them that fear him *',
        '  throughout all generations.',
        'He hath shewed strength with his arm; *',
        '  he hath scattered the proud in the imagination of their hearts.',
        'He hath put down the mighty from their seat, *',
        '  and hath exalted the humble and meek.',
        'He hath filled the hungry with good things; *',
        '  and the rich he hath sent empty away.',
        'Glory be to the Father, and to the Son, and to the Holy Ghost; *',
        '  as it was in the beginning, is now, and ever shall be, world without end. Amen.',
      ],
    },
    responsory: [
      { versicle: 'Into thy hands, O Lord, I commend my spirit.', response: 'For thou hast redeemed me, O Lord, thou God of truth.' },
      { versicle: 'O satisfy us early with thy mercy.', response: 'That we may rejoice and be glad all our days.' },
    ],
    lordsPrayer: [
      'Our Father, who art in heaven,',
      'hallowed be thy Name,',
      'thy kingdom come,',
      'thy will be done,',
      'on earth as it is in heaven.',
      'Give us this day our daily bread.',
      'And forgive us our trespasses,',
      'as we forgive those who trespass against us.',
      'And lead us not into temptation,',
      'but deliver us from evil.',
      'For thine is the kingdom, and the power,',
      'and the glory, for ever and ever. Amen.',
    ],
    collects: [
      {
        title: 'A Collect for Peace',
        text: 'O God, from whom all holy desires, all good counsels, and all just works do proceed: Give unto thy servants that peace which the world cannot give; that our hearts may be set to obey thy commandments, and also that by thee, we, being defended from the fear of our enemies, may pass our time in rest and quietness; through the merits of Jesus Christ our Savior. Amen.',
      },
      {
        title: 'A Collect for Aid against Perils',
        text: 'Lighten our darkness, we beseech thee, O Lord; and by thy great mercy defend us from all perils and dangers of this night; for the love of thy only Son, our Savior Jesus Christ. Amen.',
      },
      {
        title: 'For the Presence of God',
        text: 'O Lord, support us all the day long, until the shadows lengthen and the evening comes, and the busy world is hushed, and the fever of life is over, and our work is done. Then in thy mercy grant us a safe lodging, and a holy rest, and peace at the last. Amen.',
      },
    ],
    blessing: 'The grace of our Lord Jesus Christ, and the love of God, and the fellowship of the Holy Ghost, be with us all evermore. Amen.',
    psalm: 141,
    reading: { book: 'Psalms', chapter: 141, startVerse: 1, endVerse: 9 },
  },

  compline: {
    label: 'Compline',
    subtitle: 'Night Prayer — The Final Hour',
    icon: <Moon className="w-6 h-6" />,
    gradient: 'from-indigo-50 via-slate-50 to-blue-50 dark:from-indigo-950/60 dark:via-slate-950/50 dark:to-blue-950/40',
    accentColor: 'text-indigo-600 dark:text-indigo-300',
    borderColor: 'border-indigo-300 dark:border-indigo-700',
    tagBg: 'bg-indigo-100 dark:bg-indigo-900/40',
    timeLabel: 'Night · 9:00 PM',
    openingSentence: {
      text: 'The Lord Almighty grant us a peaceful night and a perfect end.',
      reference: 'BCP',
    },
    confession: [
      'I confess to Almighty God,',
      'to his Church, and to you,',
      'that I have sinned by my own fault',
      'in thought, word, and deed,',
      'in things done and left undone;',
      'especially ___.',
      'For these and all other sins',
      'which I cannot now remember,',
      'I am truly sorry.',
      'I pray God to have mercy on me.',
      'I firmly intend amendment of life,',
      'and I humbly beg forgiveness of God and his Church,',
      'and ask you for counsel, direction, and absolution.',
    ],
    absolution: 'Our Lord Jesus Christ, who has left power to his Church to absolve all sinners who truly repent and believe in him, of his great mercy forgive you all your offenses; and by his authority committed to me, I absolve you from all your sins: In the Name of the Father, and of the Son, and of the Holy Spirit. Amen.',
    invitatory: [
      { versicle: 'O God, make speed to save us.', response: 'O Lord, make haste to help us.' },
      { versicle: 'Glory to the Father, and to the Son, and to the Holy Spirit.', response: 'As it was in the beginning, is now, and will be for ever. Amen.' },
    ],
    canticle: {
      title: 'Nunc Dimittis — Song of Simeon',
      lines: [
        'Lord, now lettest thou thy servant depart in peace, *',
        '  according to thy word.',
        'For mine eyes have seen thy salvation, *',
        '  which thou hast prepared before the face of all people;',
        'To be a light to lighten the Gentiles, *',
        '  and to be the glory of thy people Israel.',
        'Glory be to the Father, and to the Son, and to the Holy Ghost; *',
        '  as it was in the beginning, is now, and ever shall be, world without end. Amen.',
      ],
    },
    responsory: [
      { versicle: 'Into your hands, O Lord, I commend my spirit.', response: 'For you have redeemed me, O Lord, O God of truth.' },
      { versicle: 'Keep me, O Lord, as the apple of your eye.', response: 'Hide me under the shadow of your wings.' },
    ],
    lordsPrayer: [
      'Our Father in heaven,',
      'hallowed be your Name,',
      'your kingdom come,',
      'your will be done,',
      'on earth as in heaven.',
      'Give us today our daily bread.',
      'Forgive us our sins',
      'as we forgive those who sin against us.',
      'Save us from the time of trial,',
      'and deliver us from evil.',
      'For the kingdom, the power, and the glory are yours,',
      'now and for ever. Amen.',
    ],
    collects: [
      {
        title: 'The Collect of Compline',
        text: 'Be present, O merciful God, and protect us through the hours of this night, so that we who are wearied by the changes and chances of this life may rest in your eternal changelessness; through Jesus Christ our Lord. Amen.',
      },
      {
        title: 'A Collect for Protection',
        text: 'Keep watch, dear Lord, with those who work, or watch, or weep this night, and give your angels charge over those who sleep. Tend the sick, Lord Christ; give rest to the weary, bless the dying, soothe the suffering, pity the afflicted, shield the joyous; and all for your love\'s sake. Amen.',
      },
    ],
    blessing: 'The almighty and merciful Lord, Father, Son, and Holy Spirit, bless you and keep you. Amen.',
    psalm: 134,
    reading: { book: 'Psalms', chapter: 134, startVerse: 1, endVerse: 3 },
  },
};

const STEPS: { id: Step; label: string }[] = [
  { id: 'opening', label: 'Opening' },
  { id: 'psalm', label: 'Psalm' },
  { id: 'scripture', label: 'Scripture' },
  { id: 'prayers', label: 'Prayers' },
  { id: 'closing', label: 'Closing' },
];

// ─── Verse Fetcher ────────────────────────────────────────────────────────────

function useVerses(book: string, chapter: number, start: number, end: number) {
  const [verses, setVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(false);

  const fetch = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from('kjv_bible')
      .select('book, chapter, verse, text')
      .eq('book', book)
      .eq('chapter', chapter)
      .gte('verse', start)
      .lte('verse', end)
      .order('verse');
    setVerses(data ?? []);
    setLoading(false);
  }, [book, chapter, start, end]);

  useEffect(() => { fetch(); }, [fetch]);
  return { verses, loading };
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function VersicleRow({ versicle, response, accent }: { versicle: string; response: string; accent: string }) {
  return (
    <div className="space-y-1 text-sm leading-relaxed">
      <div className="flex gap-3">
        <span className={`font-semibold ${accent} w-4 shrink-0`}>V.</span>
        <span className="text-gray-800 dark:text-gray-200 italic">{versicle}</span>
      </div>
      <div className="flex gap-3">
        <span className={`font-semibold ${accent} w-4 shrink-0`}>R.</span>
        <span className="text-gray-800 dark:text-gray-200 italic font-medium">{response}</span>
      </div>
    </div>
  );
}

function SectionTitle({ children, accent }: { children: React.ReactNode; accent: string }) {
  return (
    <h3 className={`text-xs font-bold uppercase tracking-widest ${accent} mb-3`}>{children}</h3>
  );
}

function PrayerBlock({ lines, indent = false }: { lines: string[]; indent?: boolean }) {
  return (
    <div className="space-y-0.5">
      {lines.map((line, i) => (
        <p
          key={i}
          className={`text-sm leading-relaxed text-gray-800 dark:text-gray-200 ${indent && line.startsWith('  ') ? 'pl-6' : ''}`}
        >
          {line.trim()}
        </p>
      ))}
    </div>
  );
}

function StepDots({ current, total, onSelect, accentColor }: {
  current: number;
  total: number;
  onSelect: (i: number) => void;
  accentColor: string;
}) {
  return (
    <div className="flex items-center gap-2 justify-center">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          className={`rounded-full transition-all ${i === current
            ? `w-6 h-2 ${accentColor.replace('text-', 'bg-')}`
            : 'w-2 h-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'
            }`}
        />
      ))}
    </div>
  );
}

// ─── Office Detail View ───────────────────────────────────────────────────────

function OfficeDetail({ officeKey, onBack }: { officeKey: Office; onBack: () => void }) {
  const office = OFFICES[officeKey];
  const [step, setStep] = useState<number>(0);
  const [confessionOpen, setConfessionOpen] = useState(false);
  const [completed, setCompleted] = useState<Set<number>>(new Set());
  const currentStep = STEPS[step];

  const reading = office.reading;
  const { verses, loading: versesLoading } = useVerses(
    reading.book, reading.chapter, reading.startVerse, reading.endVerse
  );

  const markComplete = () => {
    setCompleted(prev => new Set([...prev, step]));
    if (step < STEPS.length - 1) setStep(step + 1);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${office.gradient}`}>
      {/* Header */}
      <div className="sticky top-0 z-40 backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border-b border-gray-200/60 dark:border-gray-700/60">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Daily Office</span>
          </button>
          <div className="text-center">
            <p className={`text-xs font-bold uppercase tracking-widest ${office.accentColor}`}>{office.timeLabel}</p>
          </div>
          <div className="w-20 text-right">
            <span className="text-xs text-gray-500 dark:text-gray-400">{step + 1} / {STEPS.length}</span>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 pb-24 pt-6">
        {/* Office Title */}
        <div className="text-center mb-8">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${office.tagBg} ${office.accentColor} mb-4`}>
            {office.icon}
            <span className="text-sm font-semibold">{office.label}</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{STEPS[step].label}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">{office.subtitle}</p>
        </div>

        {/* Step Nav */}
        <div className="flex gap-1 mb-8 overflow-x-auto pb-1">
          {STEPS.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setStep(i)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                i === step
                  ? `${office.tagBg} ${office.accentColor} ring-1 ${office.borderColor}`
                  : completed.has(i)
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {completed.has(i) && i !== step && <Check className="w-3 h-3" />}
              {s.label}
            </button>
          ))}
        </div>

        {/* ── OPENING ── */}
        {currentStep.id === 'opening' && (
          <div className="space-y-6">
            {/* Opening Sentence */}
            <div className={`theme-card rounded-2xl p-6 border-l-4 ${office.borderColor}`}>
              <SectionTitle accent={office.accentColor}>Opening Sentence</SectionTitle>
              <blockquote className="text-lg leading-relaxed text-gray-800 dark:text-gray-200 italic font-medium mb-3">
                "{office.openingSentence.text}"
              </blockquote>
              <p className={`text-xs font-semibold ${office.accentColor}`}>— {office.openingSentence.reference}</p>
            </div>

            {/* Confession */}
            <div className="theme-card rounded-2xl p-6">
              <button
                className="w-full flex items-center justify-between"
                onClick={() => setConfessionOpen(v => !v)}
              >
                <SectionTitle accent={office.accentColor}>Confession of Sin</SectionTitle>
                {confessionOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
              </button>
              {confessionOpen && (
                <div className="mt-4 space-y-4">
                  <p className="text-xs text-gray-500 dark:text-gray-400 italic">A period of silence for self-examination may be kept.</p>
                  <PrayerBlock lines={office.confession} />
                  <div className={`mt-4 pt-4 border-t ${office.borderColor}`}>
                    <SectionTitle accent={office.accentColor}>Absolution</SectionTitle>
                    <PrayerBlock lines={[office.absolution]} />
                  </div>
                </div>
              )}
            </div>

            {/* Invitatory */}
            <div className="theme-card rounded-2xl p-6">
              <SectionTitle accent={office.accentColor}>Versicles & Responses</SectionTitle>
              <div className="space-y-4">
                {office.invitatory.map((v, i) => (
                  <VersicleRow key={i} versicle={v.versicle} response={v.response} accent={office.accentColor} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── PSALM ── */}
        {currentStep.id === 'psalm' && (
          <div className="space-y-6">
            <div className={`theme-card rounded-2xl p-6 border-l-4 ${office.borderColor}`}>
              <SectionTitle accent={office.accentColor}>Canticle</SectionTitle>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">{office.canticle.title}</h3>
              <div className="space-y-1">
                {office.canticle.lines.map((line, i) => (
                  <p key={i} className={`text-sm leading-relaxed text-gray-800 dark:text-gray-200 ${line.startsWith('  ') ? 'pl-5 text-gray-600 dark:text-gray-400' : ''}`}>
                    {line.trim()}
                  </p>
                ))}
              </div>
            </div>

            {/* Psalm verses from DB */}
            <div className="theme-card rounded-2xl p-6">
              <SectionTitle accent={office.accentColor}>
                Psalm {reading.chapter}:{reading.startVerse}–{reading.endVerse}
              </SectionTitle>
              {versesLoading ? (
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                  Loading psalm…
                </div>
              ) : (
                <div className="space-y-2">
                  {verses.map(v => (
                    <p key={v.verse} className="text-sm leading-relaxed text-gray-800 dark:text-gray-200">
                      <sup className={`text-xs font-bold mr-1 ${office.accentColor}`}>{v.verse}</sup>
                      {v.text}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── SCRIPTURE ── */}
        {currentStep.id === 'scripture' && (
          <div className="space-y-6">
            <div className="theme-card rounded-2xl p-6">
              <SectionTitle accent={office.accentColor}>
                Scripture Reading — {reading.book} {reading.chapter}
              </SectionTitle>
              <p className="text-xs text-gray-500 dark:text-gray-400 italic mb-4">
                Read attentively, allowing the Word to speak to your heart. Pause, reflect, and receive.
              </p>
              {versesLoading ? (
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                  Loading scripture…
                </div>
              ) : (
                <div className="space-y-3">
                  {verses.map(v => (
                    <p key={v.verse} className="text-sm leading-relaxed text-gray-800 dark:text-gray-200">
                      <sup className={`text-xs font-bold mr-1.5 ${office.accentColor}`}>{v.verse}</sup>
                      {v.text}
                    </p>
                  ))}
                </div>
              )}
            </div>

            {/* Responsory */}
            <div className="theme-card rounded-2xl p-6">
              <SectionTitle accent={office.accentColor}>Responsory</SectionTitle>
              <div className="space-y-4">
                {office.responsory.map((r, i) => (
                  <VersicleRow key={i} versicle={r.versicle} response={r.response} accent={office.accentColor} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── PRAYERS ── */}
        {currentStep.id === 'prayers' && (
          <div className="space-y-6">
            {/* Lord's Prayer */}
            <div className={`theme-card rounded-2xl p-6 border-l-4 ${office.borderColor}`}>
              <SectionTitle accent={office.accentColor}>The Lord's Prayer</SectionTitle>
              <PrayerBlock lines={office.lordsPrayer} />
            </div>

            {/* Collects */}
            {office.collects.map((collect, i) => (
              <div key={i} className="theme-card rounded-2xl p-6">
                <SectionTitle accent={office.accentColor}>{collect.title}</SectionTitle>
                <p className="text-sm leading-relaxed text-gray-800 dark:text-gray-200 italic">{collect.text}</p>
              </div>
            ))}

            {/* Silence prompt */}
            <div className="text-center py-4">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${office.tagBg} ${office.accentColor} text-xs font-medium`}>
                <Wind className="w-3.5 h-3.5" />
                A time of silent prayer
              </div>
            </div>
          </div>
        )}

        {/* ── CLOSING ── */}
        {currentStep.id === 'closing' && (
          <div className="space-y-6">
            {/* Canticle at closing */}
            <div className={`theme-card rounded-2xl p-6 border-l-4 ${office.borderColor}`}>
              <SectionTitle accent={office.accentColor}>The Nunc Dimittis</SectionTitle>
              {officeKey === 'compline' ? (
                <div className="space-y-1">
                  {OFFICES.compline.canticle.lines.map((line, i) => (
                    <p key={i} className={`text-sm leading-relaxed text-gray-800 dark:text-gray-200 ${line.startsWith('  ') ? 'pl-5 text-gray-600 dark:text-gray-400' : ''}`}>
                      {line.trim()}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                  Lord, now lettest thou thy servant depart in peace, according to thy word. For mine eyes have seen thy salvation, which thou hast prepared before the face of all people. Glory be to the Father, and to the Son, and to the Holy Ghost; as it was in the beginning, is now, and ever shall be, world without end. Amen.
                </p>
              )}
            </div>

            {/* Blessing */}
            <div className="theme-card rounded-2xl p-6">
              <SectionTitle accent={office.accentColor}>The Blessing</SectionTitle>
              <p className="text-sm leading-relaxed text-gray-800 dark:text-gray-200 italic">{office.blessing}</p>
            </div>

            {/* Completion */}
            {!completed.has(step) && (
              <div className="text-center pt-2">
                <div className={`inline-block px-6 py-4 rounded-2xl ${office.tagBg}`}>
                  <Heart className={`w-8 h-8 mx-auto mb-2 ${office.accentColor}`} />
                  <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">You have completed {office.label}.</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Go in peace, to love and serve the Lord.</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-10 pt-6 border-t border-gray-200/60 dark:border-gray-700/60">
          <button
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0}
            className="px-5 py-2.5 rounded-xl text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            ← Previous
          </button>
          <StepDots current={step} total={STEPS.length} onSelect={setStep} accentColor={office.accentColor} />
          {step < STEPS.length - 1 ? (
            <button
              onClick={markComplete}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium text-white transition-all ${
                office.accentColor.includes('amber') ? 'bg-amber-600 hover:bg-amber-700' :
                office.accentColor.includes('sky') ? 'bg-sky-600 hover:bg-sky-700' :
                office.accentColor.includes('violet') ? 'bg-violet-600 hover:bg-violet-700' :
                'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              Continue →
            </button>
          ) : (
            <button
              onClick={() => { setCompleted(prev => new Set([...prev, step])); onBack(); }}
              className="px-5 py-2.5 rounded-xl text-sm font-medium bg-green-600 hover:bg-green-700 text-white transition-all"
            >
              Finish ✓
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Office Card (Hub) ────────────────────────────────────────────────────────

function OfficeCard({
  officeKey,
  onSelect,
  isCurrentHour,
}: {
  officeKey: Office;
  onSelect: () => void;
  isCurrentHour: boolean;
}) {
  const office = OFFICES[officeKey];
  return (
    <button
      onClick={onSelect}
      className={`w-full text-left theme-card rounded-2xl p-6 transition-all hover:scale-[1.02] active:scale-[0.99] ${
        isCurrentHour ? `ring-2 ${office.borderColor}` : ''
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl ${office.tagBg} ${office.accentColor} flex items-center justify-center`}>
          {office.icon}
        </div>
        {isCurrentHour && (
          <span className={`text-xs font-bold px-2 py-1 rounded-full ${office.tagBg} ${office.accentColor}`}>
            Now
          </span>
        )}
      </div>
      <h3 className="text-base font-bold text-gray-900 dark:text-white mb-0.5">{office.label}</h3>
      <p className={`text-xs font-medium mb-1 ${office.accentColor}`}>{office.subtitle}</p>
      <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
        <Clock className="w-3 h-3" />
        {office.timeLabel}
      </p>
    </button>
  );
}

// ─── Additional Prayers Section ───────────────────────────────────────────────

const ADDITIONAL_PRAYERS = [
  {
    category: 'For the World',
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    prayers: [
      { title: 'For Peace Among Nations', text: 'Almighty God our heavenly Father, guide the nations of this world into the way of justice and truth, and establish among them that peace which is the fruit of righteousness, that they may become the kingdom of our Lord and Savior Jesus Christ. Amen.' },
      { title: 'For the Human Family', text: 'O God, you made us in your own image and redeemed us through Jesus your Son: Look with compassion on the whole human family; take away the arrogance and hatred which infect our hearts; break down the walls that separate us; unite us in bonds of love; and work through our struggle and confusion to accomplish your purposes on earth; that, in your good time, all nations and races may serve you in harmony around your heavenly throne; through Jesus Christ our Lord. Amen.' },
    ],
  },
  {
    category: 'For the Church',
    color: 'text-rose-600 dark:text-rose-400',
    bg: 'bg-rose-50 dark:bg-rose-900/20',
    prayers: [
      { title: 'For the Unity of the Church', text: 'O God the Father of our Lord Jesus Christ, our only Savior, the Prince of Peace: Give us grace seriously to lay to heart the great dangers we are in by our unhappy divisions; take away all hatred and prejudice, and whatever else may hinder us from godly union and concord; that, as there is but one Body and one Spirit, one hope of our calling, one Lord, one Faith, one Baptism, one God and Father of us all, so we may henceforth be all of one heart, and of one soul, united in one holy bond of truth and peace, of faith and charity, and may with one mind and one mouth glorify thee; through Jesus Christ our Lord. Amen.' },
      { title: 'For all Christians in their Vocation', text: 'Almighty and everlasting God, by whose Spirit the whole body of your faithful people is governed and sanctified: Receive our supplications and prayers which we offer before you for all members of your holy Church, that in their vocation and ministry they may truly and devoutly serve you; through our Lord and Savior Jesus Christ. Amen.' },
    ],
  },
  {
    category: 'Personal Devotion',
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-50 dark:bg-emerald-900/20',
    prayers: [
      { title: 'In the Morning', text: 'This is another day, O Lord. I know not what it will bring forth, but make me ready, Lord, for whatever it may be. If I am to stand up, help me to stand bravely. If I am to sit still, help me to sit quietly. If I am to lie low, help me to do it patiently. And if I am to do nothing, let me do it gallantly. Make these words more than words, and give me the Spirit of Jesus. Amen.' },
      { title: 'At Night', text: 'O Lord, I give thanks to you for the day that has passed. Forgive me for the moments when I strayed from your path. Give rest to my body and quietness to my mind. Watch over me through the night and raise me up to serve you again at dawn. Into your hands I commend my spirit. Amen.' },
      { title: 'For Guidance', text: 'Direct us, O Lord, in all our doings with your most gracious favor, and further us with your continual help; that in all our works begun, continued, and ended in you, we may glorify your holy Name, and finally, by your mercy, obtain everlasting life; through Jesus Christ our Lord. Amen.' },
    ],
  },
];

// ─── Main Prayer Page ─────────────────────────────────────────────────────────

export default function Prayer() {
  const [selectedOffice, setSelectedOffice] = useState<Office | null>(null);
  const [expandedPrayer, setExpandedPrayer] = useState<string | null>(null);

  const currentHour = new Date().getHours();
  const currentOffice: Office =
    currentHour >= 5 && currentHour < 12 ? 'morning' :
    currentHour >= 12 && currentHour < 15 ? 'midday' :
    currentHour >= 15 && currentHour < 21 ? 'evening' : 'compline';

  if (selectedOffice) {
    return <OfficeDetail officeKey={selectedOffice} onBack={() => setSelectedOffice(null)} />;
  }

  return (
    <div className="min-h-screen theme-background">
      <ReturnToHome />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800" />
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}
        />
        <div className="relative max-w-2xl mx-auto px-4 py-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/80 text-xs font-semibold uppercase tracking-widest mb-6">
            <BookOpen className="w-4 h-4" />
            Book of Common Prayer
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
            The Daily Office
          </h1>
          <p className="text-white/70 text-base leading-relaxed max-w-md mx-auto">
            A sacred rhythm of prayer drawn from the ancient tradition of the Church — four offices to sanctify each part of the day.
          </p>

          {/* Current time indicator */}
          <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm">
            <Calendar className="w-4 h-4 text-white/60" />
            <span className="text-white/60">Currently:</span>
            <span className="font-semibold">{OFFICES[currentOffice].label}</span>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-10">
        {/* Four Offices Grid */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">The Four Hours</h2>
            <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
              <Star className="w-3 h-3" />
              <span>Suggested by hour</span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(Object.keys(OFFICES) as Office[]).map(key => (
              <OfficeCard
                key={key}
                officeKey={key}
                onSelect={() => setSelectedOffice(key)}
                isCurrentHour={key === currentOffice}
              />
            ))}
          </div>
        </section>

        {/* What is the Daily Office */}
        <section className="mb-12">
          <div className="theme-card rounded-2xl p-6 border-l-4 border-slate-400 dark:border-slate-600">
            <h2 className="text-base font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-slate-500" />
              About the Daily Office
            </h2>
            <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              <p>
                The Daily Office is a structured order of prayer practiced by Christians since the earliest centuries of the Church. Rooted in the Jewish tradition of praying at set hours, it was formalized in the Rule of St. Benedict and later shaped into the Book of Common Prayer by Archbishop Thomas Cranmer in 1549.
              </p>
              <p>
                Each office follows a simple pattern: <strong className="text-gray-700 dark:text-gray-300">Opening</strong> sentences of Scripture, <strong className="text-gray-700 dark:text-gray-300">Psalmody</strong>, a <strong className="text-gray-700 dark:text-gray-300">Scripture reading</strong>, <strong className="text-gray-700 dark:text-gray-300">Prayers</strong> and collects, and a <strong className="text-gray-700 dark:text-gray-300">Closing</strong> blessing — sanctifying morning, midday, evening, and night.
              </p>
              <p>
                All scripture readings are drawn live from the King James Bible (KJV) — the same translation used in the historic BCP tradition.
              </p>
            </div>
          </div>
        </section>

        {/* Additional Prayers */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-5">Prayers for Every Occasion</h2>
          <div className="space-y-4">
            {ADDITIONAL_PRAYERS.map(section => (
              <div key={section.category} className="theme-card rounded-2xl overflow-hidden">
                <div className={`px-5 py-3 ${section.bg}`}>
                  <h3 className={`text-xs font-bold uppercase tracking-widest ${section.color}`}>{section.category}</h3>
                </div>
                <div className="divide-y divide-gray-100 dark:divide-gray-800">
                  {section.prayers.map(prayer => (
                    <div key={prayer.title}>
                      <button
                        className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                        onClick={() => setExpandedPrayer(expandedPrayer === prayer.title ? null : prayer.title)}
                      >
                        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{prayer.title}</span>
                        {expandedPrayer === prayer.title
                          ? <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" />
                          : <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                        }
                      </button>
                      {expandedPrayer === prayer.title && (
                        <div className="px-5 pb-5">
                          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400 italic border-l-2 border-gray-200 dark:border-gray-700 pl-4">
                            {prayer.text}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
