import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, BookOpen, Users, FolderOpen, MessageCircle, Book, Music, Mic, BookText, UserCheck, Radio, Calendar, Home, Info, Plus } from 'lucide-react';

export function Resurrection() {
  const [menuOpen, setMenuOpen] = useState(false);

  const infoPoints = [
    {
      id: 'early-dating',
      title: 'Early Dating',
      content: 'P52 dates to 125-150 AD, placing it within decades of the original Gospel. This destroys theories of late legendary development.',
      position: { top: '15%', left: '20%' }
    },
    {
      id: 'textual-accuracy',
      title: 'Textual Accuracy',
      content: 'The fragment matches later manuscripts with remarkable precision, demonstrating faithful preservation across centuries.',
      position: { top: '45%', left: '75%' }
    },
    {
      id: 'wide-distribution',
      title: 'Wide Distribution',
      content: 'Found in Egypt, far from John\'s authorship in Ephesus, proving rapid circulation across the ancient world.',
      position: { top: '75%', left: '30%' }
    }
  ];

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

  const gospelEvents = [
    {
      id: 'temple-cleansing',
      title: 'Authority Challenged: The Cleansing of the Temple',
      summary: 'Why Jesus overturned the tables • Corruption within sacred space • Religious systems vs. true worship',
      content: `Content coming soon...`
    },
    {
      id: 'betrayal',
      title: 'Betrayal & the Price of Innocence',
      summary: 'Judas Iscariot\'s payment (30 pieces of silver) • The prophetic and symbolic weight of that amount • The intimacy of betrayal (a disciple, not an enemy)',
      content: `Content coming soon...`
    },
    {
      id: 'pilate',
      title: 'Power, Politics, and Truth',
      summary: 'Pontius Pilate and his interrogation of Jesus • "What is truth?" — philosophical and political tension • Pilate\'s moral conflict vs. public pressure',
      content: `Content coming soon...`
    },
    {
      id: 'crowd',
      title: 'The Crowd and the Collapse of Loyalty',
      summary: 'From praise to "Crucify Him" • Mob mentality and influence of religious leaders • The volatility of human allegiance',
      content: `Content coming soon...`
    },
    {
      id: 'scourging',
      title: 'The Scourging: Flesh Torn, Time Stretched',
      summary: 'Roman flogging practices and brutality • The lashes (often 39, but frequently more in Roman context) • Duration and physical toll before crucifixion even began',
      content: `Content coming soon...`
    },
    {
      id: 'crown-thorns',
      title: 'The Crown of Thorns: Mockery and Kingship',
      summary: 'Roman mockery vs. divine irony • Thorns as a symbol (curse, suffering, kingship) • The inversion of power',
      content: `Content coming soon...`
    },
    {
      id: 'cross-carried',
      title: 'The Burden Shared: The Cross Carried',
      summary: 'Simon of Cyrene compelled to carry the cross • Jesus\' physical exhaustion and human limitation • The weight of the cross—literal and symbolic',
      content: `Content coming soon...`
    },
    {
      id: 'power-restrained',
      title: 'Power Restrained: The Willing Surrender',
      summary: 'Jesus\' authority to stop it at any moment • The choice to remain—restraint as strength • Divine will over self-preservation',
      content: `Content coming soon...`
    },
    {
      id: 'instruments',
      title: 'Instruments of Execution: The Cross Itself',
      summary: 'The stakes/nails and their physical and symbolic role • Roman crucifixion methods • The weight of suffering and public humiliation',
      content: `Content coming soon...`
    },
    {
      id: 'piercing',
      title: 'The Wound That Spoke',
      summary: 'The piercing of Jesus\' side • Blood and water symbolism • Fulfillment of prophecy and confirmation of death',
      content: `Content coming soon...`
    },
    {
      id: 'joseph-tomb',
      title: 'The Hidden Disciple: Joseph and the Tomb',
      summary: 'Joseph of Arimathea • His status, risk, and quiet devotion • The significance of the unused tomb and burial cloth',
      content: `Content coming soon...`
    },
    {
      id: 'silence',
      title: 'The Silence of Intervention',
      summary: 'Heaven\'s restraint during suffering • The absence of rescue despite divine authority • The weight of abandonment and purpose',
      content: `Content coming soon...`
    },
    {
      id: 'stone',
      title: 'The Stone and the Impossible Opening',
      summary: 'The sealed tomb and Roman guard • The stone rolled away—not to let Jesus out, but to reveal He was gone • Divine power displayed without human involvement',
      content: `Content coming soon...`
    },
    {
      id: 'empty-tomb',
      title: 'The Empty Tomb: Absence as Evidence',
      summary: 'What wasn\'t there—and why that matters • The folded burial cloths • The first witnesses and their disbelief',
      content: `Content coming soon...`
    },
    {
      id: 'shroud',
      title: 'The Shroud: Image Without Explanation',
      summary: 'Shroud of Turin and its mysterious imprint • The image: not painted, not burned, not fully explained by modern science • Forensic details aligning with crucifixion wounds described in the Gospels • Ongoing debate: faith, science, and unanswered questions • Not proof forced on belief—but evidence that refuses easy dismissal',
      content: `Content coming soon...`
    }
  ];

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

  return (
    <div className="resurrection-page">
      {/* Hamburger Menu */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="resurrection-hamburger"
        aria-label="Navigation menu"
      >
        {menuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
      </button>

      {/* Side Menu Panel */}
      {menuOpen && (
        <>
          <div
            className="resurrection-overlay"
            onClick={() => setMenuOpen(false)}
          />
          <div className="resurrection-menu">
            <div className="resurrection-menu-header">
              <h3 className="text-xl font-bold text-amber-950">Navigation</h3>
              <button
                onClick={() => setMenuOpen(false)}
                className="text-amber-900 hover:text-amber-950 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="resurrection-menu-content">
              <div className="mb-6">
                <p className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-3 px-3">Main</p>
                {navigationLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setMenuOpen(false)}
                      className="resurrection-menu-link"
                    >
                      <Icon className="w-5 h-5" />
                      <span>{link.title}</span>
                    </Link>
                  );
                })}
              </div>

              <div className="border-t border-amber-400/40 pt-4">
                <p className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-3 px-3">Resources</p>
                {resourceLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setMenuOpen(false)}
                      className="resurrection-menu-link"
                    >
                      <Icon className="w-5 h-5" />
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
      <section className="resurrection-hero">
        <div className="resurrection-hero-content">
          <h1 className="resurrection-title">Resurrection</h1>
          <p className="resurrection-subtitle">The record remained. The witness endured.</p>

          {/* P52 Papyrus Image */}
          <div className="resurrection-papyrus-frame">
            <div className="papyrus-image-container">
              <img
                src="/images/p52.jpg"
                alt="P52 Papyrus Fragment - Earliest known fragment of the Gospel of John"
                className="papyrus-image"
                loading="eager"
              />
              {/* Interactive Info Points */}
              {infoPoints.map((point) => (
                <button
                  key={point.id}
                  className="info-point"
                  style={{ top: point.position.top, left: point.position.left }}
                  onClick={() => setActivePopup(point.id)}
                  aria-label={`Learn about ${point.title}`}
                >
                  <Info className="w-4 h-4" />
                </button>
              ))}
              <div className="papyrus-caption">
                <p className="papyrus-caption-text">P52 • Rylands Papyrus • Gospel of John 18:31-33 • 125-150 AD</p>
              </div>
            </div>
            <p className="persecution-text">
              Through centuries of persecution, through fire and flood, through the hands of scribes
              and the passage of empires, the testimony endured.
            </p>
          </div>

        </div>
      </section>

      {/* Content Sections */}
      <div className="resurrection-content">
        {/* Historical Manuscript Section */}
        <section className="resurrection-section fade-in-section">
          <div className="resurrection-manuscript-box">
            <h2 className="resurrection-section-title">The Witness of P52</h2>
            <div className="resurrection-divider"></div>
            <p className="resurrection-body-text">
              In the sands of Egypt, a fragment survived. P52, discovered in 1920, contains verses
              from the Gospel of John—dated to within a single generation of the original writing.
              A small piece of papyrus, yet a monument to the reliability of Scripture.
            </p>
            <p className="resurrection-body-text">
              It proves what skeptics denied: that the Gospels were written early, circulated widely,
              and preserved faithfully. The resurrection was not a legend added later. It was proclaimed
              from the beginning.
            </p>
            <blockquote className="resurrection-quote">
              "Jesus said to her, 'I am the resurrection and the life. Whoever believes in me,
              though he die, yet shall he live.'"
              <cite>John 11:25 (ESV)</cite>
            </blockquote>
          </div>
        </section>

        {/* Deeper Meaning Section */}
        <section className="resurrection-section fade-in-section">
          <div className="resurrection-truth-block">
            <h2 className="resurrection-section-title">Truth That Endures</h2>
            <div className="resurrection-divider"></div>
            <p className="resurrection-body-text">
              Resurrection is not metaphor. It is not philosophy. It is the central claim of the faith:
              that death is defeated, that Christ rose bodily from the grave, and that this same power
              is available to all who believe.
            </p>
            <p className="resurrection-body-text">
              The early Christians did not die for an idea. They died proclaiming what they witnessed.
              The tomb was empty. The grave clothes remained. The Risen Lord appeared to hundreds.
            </p>
            <p className="resurrection-body-text">
              And the record of this event—copied, preserved, passed down through generations—stands
              as testimony. The manuscript evidence is overwhelming. The historical case is strong.
              The witness endures.
            </p>
          </div>
        </section>

        {/* Scripture Block */}
        <section className="resurrection-section fade-in-section">
          <div className="resurrection-scripture-block">
            <div className="scripture-mark">"</div>
            <p className="resurrection-scripture-text">
              For I delivered to you as of first importance what I also received: that Christ died
              for our sins in accordance with the Scriptures, that he was buried, that he was raised
              on the third day in accordance with the Scriptures, and that he appeared to Cephas,
              then to the twelve. Then he appeared to more than five hundred brothers at one time.
            </p>
            <cite className="resurrection-scripture-cite">1 Corinthians 15:3-6 (ESV)</cite>
          </div>
        </section>

        {/* Final Call */}
        <section className="resurrection-section fade-in-section">
          <div className="resurrection-final-call">
            <h2 className="resurrection-section-title">The Journey Continues</h2>
            <div className="resurrection-divider"></div>
            <p className="resurrection-body-text">
              You have come this far. You have seen the evidence, traced the history, considered
              the witness. The question now is not whether the resurrection happened—the evidence
              speaks. The question is what you will do with it.
            </p>
            <p className="resurrection-body-text">
              Will you step forward into the life that Christ offers? Will you take up the cross,
              deny yourself, and follow? The path is ancient. The truth is eternal. The witness remains.
            </p>
          </div>
        </section>

        {/* Tree of Life - Gospel Timeline */}
        <section className="resurrection-section fade-in-section">
          <div className="tree-of-life-section">
            <h2 className="resurrection-section-title">The Tree of Life</h2>
            <div className="resurrection-divider"></div>

            <div className="tree-container">
              <svg className="tree-svg" viewBox="0 0 500 700" xmlns="http://www.w3.org/2000/svg">
                {/* Tree Trunk */}
                <path d="M 230 700 Q 230 600, 240 540 Q 250 480, 250 380 Q 250 280, 250 150"
                      stroke="#8B7556" strokeWidth="16" fill="none" strokeLinecap="round"/>

                {/* Root System */}
                <path d="M 250 700 Q 230 680, 190 690" stroke="#6B5D48" strokeWidth="8" fill="none" opacity="0.7"/>
                <path d="M 250 700 Q 270 680, 310 690" stroke="#6B5D48" strokeWidth="8" fill="none" opacity="0.7"/>
                <path d="M 250 700 Q 250 690, 250 710" stroke="#6B5D48" strokeWidth="10" fill="none" opacity="0.7"/>

                {/* Main Branches - Extended for 15 circles */}
                <path d="M 250 150 Q 180 130, 140 140" stroke="#8B7556" strokeWidth="10" fill="none"/>
                <path d="M 250 150 Q 320 130, 360 140" stroke="#8B7556" strokeWidth="10" fill="none"/>
                <path d="M 250 200 Q 170 180, 120 190" stroke="#8B7556" strokeWidth="9" fill="none"/>
                <path d="M 250 200 Q 330 180, 380 190" stroke="#8B7556" strokeWidth="9" fill="none"/>
                <path d="M 250 250 Q 190 240, 150 250" stroke="#8B7556" strokeWidth="8" fill="none"/>
                <path d="M 250 250 Q 310 240, 350 250" stroke="#8B7556" strokeWidth="8" fill="none"/>
                <path d="M 250 300 Q 180 290, 130 300" stroke="#8B7556" strokeWidth="7" fill="none"/>
                <path d="M 250 300 Q 320 290, 370 300" stroke="#8B7556" strokeWidth="7" fill="none"/>
                <path d="M 250 350 Q 200 345, 160 355" stroke="#8B7556" strokeWidth="7" fill="none"/>
                <path d="M 250 350 Q 300 345, 340 355" stroke="#8B7556" strokeWidth="7" fill="none"/>
                <path d="M 250 400 Q 190 395, 150 405" stroke="#8B7556" strokeWidth="6" fill="none"/>
                <path d="M 250 400 Q 310 395, 350 405" stroke="#8B7556" strokeWidth="6" fill="none"/>
                <path d="M 250 450 Q 210 445, 170 455" stroke="#8B7556" strokeWidth="6" fill="none"/>
                <path d="M 250 450 Q 290 445, 330 455" stroke="#8B7556" strokeWidth="6" fill="none"/>
                <path d="M 250 500 Q 200 495, 160 505" stroke="#8B7556" strokeWidth="5" fill="none"/>

                {/* Decorative Leaves/Bubbles - Larger and non-clickable */}
                <circle cx="140" cy="140" r="35" fill="#9CA383" opacity="0.7"/>
                <text x="140" y="135" fontSize="11" fill="#2d1810" fontWeight="600" textAnchor="middle" fontFamily="Georgia">Temple</text>
                <text x="140" y="148" fontSize="10" fill="#2d1810" fontWeight="500" textAnchor="middle" fontFamily="Georgia">Cleansing</text>

                <circle cx="360" cy="140" r="35" fill="#9CA383" opacity="0.7"/>
                <text x="360" y="138" fontSize="11" fill="#2d1810" fontWeight="600" textAnchor="middle" fontFamily="Georgia">Betrayal</text>
                <text x="360" y="151" fontSize="10" fill="#2d1810" fontWeight="500" textAnchor="middle" fontFamily="Georgia">30 Silver</text>

                <circle cx="120" cy="190" r="33" fill="#9CA383" opacity="0.7"/>
                <text x="120" y="188" fontSize="11" fill="#2d1810" fontWeight="600" textAnchor="middle" fontFamily="Georgia">Pilate</text>
                <text x="120" y="201" fontSize="9" fill="#2d1810" fontWeight="500" textAnchor="middle" fontFamily="Georgia">& Truth</text>

                <circle cx="380" cy="190" r="33" fill="#9CA383" opacity="0.7"/>
                <text x="380" y="188" fontSize="10" fill="#2d1810" fontWeight="600" textAnchor="middle" fontFamily="Georgia">The Crowd</text>
                <text x="380" y="201" fontSize="9" fill="#2d1810" fontWeight="500" textAnchor="middle" fontFamily="Georgia">Loyalty Lost</text>

                <circle cx="150" cy="250" r="32" fill="#9CA383" opacity="0.7"/>
                <text x="150" y="248" fontSize="10" fill="#2d1810" fontWeight="600" textAnchor="middle" fontFamily="Georgia">Scourging</text>
                <text x="150" y="261" fontSize="9" fill="#2d1810" fontWeight="500" textAnchor="middle" fontFamily="Georgia">39 Lashes</text>

                <circle cx="350" cy="250" r="32" fill="#9CA383" opacity="0.7"/>
                <text x="350" y="248" fontSize="10" fill="#2d1810" fontWeight="600" textAnchor="middle" fontFamily="Georgia">Crown</text>
                <text x="350" y="261" fontSize="9" fill="#2d1810" fontWeight="500" textAnchor="middle" fontFamily="Georgia">of Thorns</text>

                <circle cx="130" cy="300" r="31" fill="#9CA383" opacity="0.7"/>
                <text x="130" y="298" fontSize="10" fill="#2d1810" fontWeight="600" textAnchor="middle" fontFamily="Georgia">Cross</text>
                <text x="130" y="311" fontSize="9" fill="#2d1810" fontWeight="500" textAnchor="middle" fontFamily="Georgia">Carried</text>

                <circle cx="370" cy="300" r="31" fill="#9CA383" opacity="0.7"/>
                <text x="370" y="298" fontSize="10" fill="#2d1810" fontWeight="600" textAnchor="middle" fontFamily="Georgia">Power</text>
                <text x="370" y="311" fontSize="9" fill="#2d1810" fontWeight="500" textAnchor="middle" fontFamily="Georgia">Restrained</text>

                <circle cx="160" cy="355" r="30" fill="#9CA383" opacity="0.7"/>
                <text x="160" y="353" fontSize="10" fill="#2d1810" fontWeight="600" textAnchor="middle" fontFamily="Georgia">The Stakes</text>
                <text x="160" y="366" fontSize="9" fill="#2d1810" fontWeight="500" textAnchor="middle" fontFamily="Georgia">& Nails</text>

                <circle cx="340" cy="355" r="30" fill="#9CA383" opacity="0.7"/>
                <text x="340" y="353" fontSize="10" fill="#2d1810" fontWeight="600" textAnchor="middle" fontFamily="Georgia">Piercing</text>
                <text x="340" y="366" fontSize="9" fill="#2d1810" fontWeight="500" textAnchor="middle" fontFamily="Georgia">His Side</text>

                <circle cx="150" cy="405" r="30" fill="#9CA383" opacity="0.7"/>
                <text x="150" y="403" fontSize="10" fill="#2d1810" fontWeight="600" textAnchor="middle" fontFamily="Georgia">Joseph's</text>
                <text x="150" y="416" fontSize="9" fill="#2d1810" fontWeight="500" textAnchor="middle" fontFamily="Georgia">Tomb</text>

                <circle cx="350" cy="405" r="30" fill="#9CA383" opacity="0.7"/>
                <text x="350" y="403" fontSize="10" fill="#2d1810" fontWeight="600" textAnchor="middle" fontFamily="Georgia">Heaven's</text>
                <text x="350" y="416" fontSize="9" fill="#2d1810" fontWeight="500" textAnchor="middle" fontFamily="Georgia">Silence</text>

                <circle cx="170" cy="455" r="29" fill="#9CA383" opacity="0.7"/>
                <text x="170" y="453" fontSize="10" fill="#2d1810" fontWeight="600" textAnchor="middle" fontFamily="Georgia">The Stone</text>
                <text x="170" y="466" fontSize="8" fill="#2d1810" fontWeight="500" textAnchor="middle" fontFamily="Georgia">Rolled Away</text>

                <circle cx="330" cy="455" r="29" fill="#9CA383" opacity="0.7"/>
                <text x="330" y="453" fontSize="10" fill="#2d1810" fontWeight="600" textAnchor="middle" fontFamily="Georgia">Empty</text>
                <text x="330" y="466" fontSize="9" fill="#2d1810" fontWeight="500" textAnchor="middle" fontFamily="Georgia">Tomb</text>

                <circle cx="250" cy="505" r="29" fill="#9CA383" opacity="0.7"/>
                <text x="250" y="503" fontSize="10" fill="#2d1810" fontWeight="600" textAnchor="middle" fontFamily="Georgia">The Shroud</text>
                <text x="250" y="516" fontSize="8" fill="#2d1810" fontWeight="500" textAnchor="middle" fontFamily="Georgia">Mystery</text>

                {/* Golden Resurrection Crown */}
                <circle cx="250" cy="100" r="42" fill="#d4af37" opacity="0.85"/>
                <text x="250" y="95" fontSize="12" fill="#2d1810" fontWeight="800" textAnchor="middle" fontFamily="Georgia">THE</text>
                <text x="250" y="110" fontSize="13" fill="#2d1810" fontWeight="800" textAnchor="middle" fontFamily="Georgia">RESURRECTION</text>

                {/* Cross at the top */}
                <path d="M 250 55 L 250 105" stroke="#6B5D48" strokeWidth="5" fill="none"/>
                <path d="M 230 70 L 270 70" stroke="#6B5D48" strokeWidth="5" fill="none"/>
              </svg>
            </div>

            {/* Gospel Timeline Content - Expandable Sections */}
            <div className="gospel-timeline">
              {gospelEvents.map((event) => (
                <div key={event.id} className="timeline-event">
                  <div className="timeline-header">
                    <div>
                      <h3 className="timeline-title">{event.title}</h3>
                      <p className="timeline-summary">{event.summary}</p>
                    </div>
                    <button
                      className={`timeline-expand-btn ${expandedSections.has(event.id) ? 'expanded' : ''}`}
                      onClick={() => toggleSection(event.id)}
                      aria-label={expandedSections.has(event.id) ? `Collapse ${event.title}` : `Expand ${event.title}`}
                    >
                      <Plus className={`w-5 h-5 transition-transform ${expandedSections.has(event.id) ? 'rotate-45' : ''}`} />
                    </button>
                  </div>
                  {expandedSections.has(event.id) && (
                    <div className="timeline-content">
                      <p className="timeline-text">{event.content}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
