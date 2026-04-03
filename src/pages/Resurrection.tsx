import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, BookOpen, Users, FolderOpen, MessageCircle, Book, Music, Mic, BookText, UserCheck, Radio, Calendar, Home, Info, Plus } from 'lucide-react';
import { gospelEvents } from '../data/gospelEvents';

export function Resurrection() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePopup, setActivePopup] = useState<string | null>(null);

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

              {/* Info Point Popups */}
              {activePopup && (
                <>
                  <div
                    className="popup-overlay"
                    onClick={() => setActivePopup(null)}
                  />
                  {infoPoints.map(point =>
                    activePopup === point.id && (
                      <div
                        key={point.id}
                        className="info-popup"
                        style={{ top: point.position.top, left: point.position.left }}
                      >
                        <button
                          onClick={() => setActivePopup(null)}
                          className="popup-close"
                          aria-label="Close"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <h3 className="popup-title">{point.title}</h3>
                        <p className="popup-content">{point.content}</p>
                      </div>
                    )
                  )}
                </>
              )}

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
        {/* Historical Manuscript Section - Compact */}
        <section className="resurrection-section fade-in-section">
          <div className="resurrection-compact-block">
            <div className="compact-header" onClick={() => toggleSection('p52-witness')}>
              <div>
                <h2 className="compact-title">The Witness of P52</h2>
                <p className="compact-summary">
                  P52, discovered in 1920, proves the Gospels were written early, circulated widely, and preserved faithfully. The resurrection was proclaimed from the beginning.
                </p>
              </div>
              <button
                className={`compact-expand-btn ${expandedSections.has('p52-witness') ? 'expanded' : ''}`}
                aria-label={expandedSections.has('p52-witness') ? 'Collapse' : 'Expand'}
              >
                <Plus className={`w-5 h-5 transition-transform ${expandedSections.has('p52-witness') ? 'rotate-45' : ''}`} />
              </button>
            </div>
            {expandedSections.has('p52-witness') && (
              <div className="compact-content">
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
            )}
          </div>
        </section>

        {/* Deeper Meaning Section - Compact */}
        <section className="resurrection-section fade-in-section">
          <div className="resurrection-compact-block">
            <div className="compact-header" onClick={() => toggleSection('truth-endures')}>
              <div>
                <h2 className="compact-title">Truth That Endures</h2>
                <p className="compact-summary">
                  Resurrection is not metaphor—it is the central claim: death is defeated, Christ rose bodily, and this power is available to all who believe.
                </p>
              </div>
              <button
                className={`compact-expand-btn ${expandedSections.has('truth-endures') ? 'expanded' : ''}`}
                aria-label={expandedSections.has('truth-endures') ? 'Collapse' : 'Expand'}
              >
                <Plus className={`w-5 h-5 transition-transform ${expandedSections.has('truth-endures') ? 'rotate-45' : ''}`} />
              </button>
            </div>
            {expandedSections.has('truth-endures') && (
              <div className="compact-content">
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
            )}
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

            <button
              className="faith-reflection-btn"
              onClick={() => toggleSection('faith-reflection')}
            >
              My Thoughts on Faith
            </button>

            {expandedSections.has('faith-reflection') && (
              <div className="faith-reflection-content">
                <h3 className="faith-reflection-title">Faith: Evidence and Trust</h3>

                <p className="faith-reflection-text">
                  Faith, as presented in scripture, is not belief without basis. It is trust built on what has been revealed and observed.
                </p>

                <blockquote className="faith-reflection-quote">
                  "Now faith is confidence in what we hope for and assurance about what we do not see."
                  <cite>— Hebrews 11:1 (NIV)</cite>
                </blockquote>

                <p className="faith-reflection-text">
                  The distinction matters. Blind faith assumes without reason. Biblical faith responds to what has been given—historical events, recorded testimony, and consistent claims preserved across texts.
                </p>

                <p className="faith-reflection-text">
                  The resurrection accounts, the crucifixion details, the named individuals, the locations, the physical elements—these are not abstract ideas. They are presented as events that occurred in time, involving identifiable people and places.
                </p>

                <p className="faith-reflection-text">
                  Scripture also acknowledges that belief is not meant to come from overwhelming force:
                </p>

                <blockquote className="faith-reflection-quote">
                  "Then Jesus told him, 'Because you have seen me, you have believed; blessed are those who have not seen and yet have believed.'"
                  <cite>— John 20:29 (NIV)</cite>
                </blockquote>

                <p className="faith-reflection-text">
                  This does not remove evidence—it defines the relationship to it.
                </p>

                <p className="faith-reflection-text">
                  God does not eliminate the need for faith by providing undeniable proof that overrides choice. At the same time, He does not leave belief without foundation. What is given is enough—enough to examine, enough to question, enough to confirm.
                </p>

                <p className="faith-reflection-text">
                  As knowledge increases, the consistency across the accounts, the alignment with historical context, and the preservation of detail all contribute to a stronger basis for belief.
                </p>

                <p className="faith-reflection-text">
                  Faith, then, is not belief in nothing. It is trust formed in response to what has been shown—where the evidence points, but does not force, and where the conclusion remains a decision.
                </p>

                <p className="faith-reflection-text">
                  In that framework, faith grows—not by ignoring evidence, but by engaging with it.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Tree of Life - Gospel Timeline */}
        <section className="resurrection-section fade-in-section">
          <div className="tree-of-life-section">
            <div className="tree-container">
              <svg className="tree-svg" viewBox="0 0 700 1000" xmlns="http://www.w3.org/2000/svg">
                {/* Tree Trunk - Larger */}
                <path d="M 330 1000 Q 330 880, 340 800 Q 350 700, 350 550 Q 350 400, 350 250 Q 350 180, 350 120"
                      stroke="#8B7556" strokeWidth="22" fill="none" strokeLinecap="round"/>

                {/* Root System */}
                <path d="M 350 1000 Q 320 975, 260 985" stroke="#6B5D48" strokeWidth="12" fill="none" opacity="0.7"/>
                <path d="M 350 1000 Q 380 975, 440 985" stroke="#6B5D48" strokeWidth="12" fill="none" opacity="0.7"/>
                <path d="M 350 1000 Q 350 985, 350 1015" stroke="#6B5D48" strokeWidth="14" fill="none" opacity="0.7"/>

                {/* Branches - From bottom to top for 15 events */}
                {/* Bottom level - #1 Temple */}
                <path d="M 350 880 Q 280 860, 220 870" stroke="#8B7556" strokeWidth="10" fill="none"/>

                {/* Level 2 - #2 Betrayal */}
                <path d="M 350 830 Q 420 810, 480 820" stroke="#8B7556" strokeWidth="10" fill="none"/>

                {/* Level 3 - #3 Pilate */}
                <path d="M 350 780 Q 270 760, 210 770" stroke="#8B7556" strokeWidth="9" fill="none"/>

                {/* Level 4 - #4 Crowd */}
                <path d="M 350 730 Q 430 710, 490 720" stroke="#8B7556" strokeWidth="9" fill="none"/>

                {/* Level 5 - #5 Scourging */}
                <path d="M 350 680 Q 260 660, 200 670" stroke="#8B7556" strokeWidth="8" fill="none"/>

                {/* Level 6 - #6 Crown */}
                <path d="M 350 630 Q 440 610, 500 620" stroke="#8B7556" strokeWidth="8" fill="none"/>

                {/* Level 7 - #7 Cross Carried */}
                <path d="M 350 580 Q 250 560, 190 570" stroke="#8B7556" strokeWidth="7" fill="none"/>

                {/* Level 8 - #8 Power Restrained */}
                <path d="M 350 530 Q 450 510, 510 520" stroke="#8B7556" strokeWidth="7" fill="none"/>

                {/* Level 9 - #9 Instruments */}
                <path d="M 350 480 Q 270 460, 210 470" stroke="#8B7556" strokeWidth="7" fill="none"/>

                {/* Level 10 - #10 Piercing */}
                <path d="M 350 430 Q 430 410, 490 420" stroke="#8B7556" strokeWidth="7" fill="none"/>

                {/* Level 11 - #11 Joseph's Tomb */}
                <path d="M 350 380 Q 260 360, 200 370" stroke="#8B7556" strokeWidth="6" fill="none"/>

                {/* Level 12 - #12 Silence */}
                <path d="M 350 330 Q 440 310, 500 320" stroke="#8B7556" strokeWidth="6" fill="none"/>

                {/* Level 13 - #13 Stone */}
                <path d="M 350 280 Q 280 260, 220 270" stroke="#8B7556" strokeWidth="6" fill="none"/>

                {/* Level 14 - #14 Empty Tomb */}
                <path d="M 350 230 Q 420 210, 480 220" stroke="#8B7556" strokeWidth="6" fill="none"/>

                {/* Level 15 - #15 Shroud (centered near top) */}
                <path d="M 350 180 Q 320 165, 280 175" stroke="#8B7556" strokeWidth="5" fill="none"/>
                <path d="M 350 180 Q 380 165, 420 175" stroke="#8B7556" strokeWidth="5" fill="none"/>

                {/* Event Circles - Bottom to Top, Larger */}

                {/* #1 Temple Cleansing - Bottom */}
                <circle cx="220" cy="870" r="60" fill="#9CA383" opacity="0.8"/>
                <text x="220" y="865" fontSize="17" fill="#1a1410" fontWeight="800" textAnchor="middle" fontFamily="Georgia">Temple</text>
                <text x="220" y="885" fontSize="14" fill="#1a1410" fontWeight="700" textAnchor="middle" fontFamily="Georgia">Cleansing</text>

                {/* #2 Betrayal */}
                <circle cx="480" cy="820" r="60" fill="#9CA383" opacity="0.8"/>
                <text x="480" y="815" fontSize="17" fill="#1a1410" fontWeight="800" textAnchor="middle" fontFamily="Georgia">Betrayal</text>
                <text x="480" y="835" fontSize="13" fill="#1a1410" fontWeight="700" textAnchor="middle" fontFamily="Georgia">30 Silver</text>

                {/* #3 Pilate */}
                <circle cx="210" cy="770" r="58" fill="#9CA383" opacity="0.8"/>
                <text x="210" y="768" fontSize="17" fill="#1a1410" fontWeight="800" textAnchor="middle" fontFamily="Georgia">Pilate &</text>
                <text x="210" y="788" fontSize="14" fill="#1a1410" fontWeight="700" textAnchor="middle" fontFamily="Georgia">Truth</text>

                {/* #4 Crowd */}
                <circle cx="490" cy="720" r="58" fill="#9CA383" opacity="0.8"/>
                <text x="490" y="718" fontSize="17" fill="#1a1410" fontWeight="800" textAnchor="middle" fontFamily="Georgia">Crowd</text>
                <text x="490" y="738" fontSize="13" fill="#1a1410" fontWeight="700" textAnchor="middle" fontFamily="Georgia">Loyalty Lost</text>

                {/* #5 Scourging */}
                <circle cx="200" cy="670" r="56" fill="#9CA383" opacity="0.8"/>
                <text x="200" y="668" fontSize="16" fill="#1a1410" fontWeight="800" textAnchor="middle" fontFamily="Georgia">Scourging</text>
                <text x="200" y="686" fontSize="12" fill="#1a1410" fontWeight="700" textAnchor="middle" fontFamily="Georgia">39 Lashes</text>

                {/* #6 Crown of Thorns */}
                <circle cx="500" cy="620" r="56" fill="#9CA383" opacity="0.8"/>
                <text x="500" y="618" fontSize="16" fill="#1a1410" fontWeight="800" textAnchor="middle" fontFamily="Georgia">Crown of</text>
                <text x="500" y="636" fontSize="13" fill="#1a1410" fontWeight="700" textAnchor="middle" fontFamily="Georgia">Thorns</text>

                {/* #7 Cross Carried */}
                <circle cx="190" cy="570" r="54" fill="#9CA383" opacity="0.8"/>
                <text x="190" y="568" fontSize="16" fill="#1a1410" fontWeight="800" textAnchor="middle" fontFamily="Georgia">Cross</text>
                <text x="190" y="586" fontSize="13" fill="#1a1410" fontWeight="700" textAnchor="middle" fontFamily="Georgia">Carried</text>

                {/* #8 Power Restrained */}
                <circle cx="510" cy="520" r="54" fill="#9CA383" opacity="0.8"/>
                <text x="510" y="518" fontSize="15" fill="#1a1410" fontWeight="800" textAnchor="middle" fontFamily="Georgia">Power</text>
                <text x="510" y="536" fontSize="12" fill="#1a1410" fontWeight="700" textAnchor="middle" fontFamily="Georgia">Restrained</text>

                {/* #9 Instruments */}
                <circle cx="210" cy="470" r="52" fill="#9CA383" opacity="0.8"/>
                <text x="210" y="468" fontSize="15" fill="#1a1410" fontWeight="800" textAnchor="middle" fontFamily="Georgia">Stakes &</text>
                <text x="210" y="486" fontSize="13" fill="#1a1410" fontWeight="700" textAnchor="middle" fontFamily="Georgia">Nails</text>

                {/* #10 Piercing */}
                <circle cx="490" cy="420" r="52" fill="#9CA383" opacity="0.8"/>
                <text x="490" y="418" fontSize="15" fill="#1a1410" fontWeight="800" textAnchor="middle" fontFamily="Georgia">Piercing</text>
                <text x="490" y="436" fontSize="12" fill="#1a1410" fontWeight="700" textAnchor="middle" fontFamily="Georgia">His Side</text>

                {/* #11 Joseph's Tomb */}
                <circle cx="200" cy="370" r="50" fill="#9CA383" opacity="0.8"/>
                <text x="200" y="368" fontSize="14" fill="#1a1410" fontWeight="800" textAnchor="middle" fontFamily="Georgia">Joseph's</text>
                <text x="200" y="386" fontSize="12" fill="#1a1410" fontWeight="700" textAnchor="middle" fontFamily="Georgia">Tomb</text>

                {/* #12 Silence */}
                <circle cx="500" cy="320" r="50" fill="#9CA383" opacity="0.8"/>
                <text x="500" y="318" fontSize="14" fill="#1a1410" fontWeight="800" textAnchor="middle" fontFamily="Georgia">Heaven's</text>
                <text x="500" y="336" fontSize="12" fill="#1a1410" fontWeight="700" textAnchor="middle" fontFamily="Georgia">Silence</text>

                {/* #13 Stone */}
                <circle cx="220" cy="270" r="48" fill="#9CA383" opacity="0.8"/>
                <text x="220" y="268" fontSize="14" fill="#1a1410" fontWeight="800" textAnchor="middle" fontFamily="Georgia">Stone</text>
                <text x="220" y="286" fontSize="11" fill="#1a1410" fontWeight="700" textAnchor="middle" fontFamily="Georgia">Rolled Away</text>

                {/* #14 Empty Tomb */}
                <circle cx="480" cy="220" r="48" fill="#9CA383" opacity="0.8"/>
                <text x="480" y="218" fontSize="14" fill="#1a1410" fontWeight="800" textAnchor="middle" fontFamily="Georgia">Empty</text>
                <text x="480" y="236" fontSize="12" fill="#1a1410" fontWeight="700" textAnchor="middle" fontFamily="Georgia">Tomb</text>

                {/* #15 Shroud - Near top */}
                <circle cx="350" cy="175" r="46" fill="#9CA383" opacity="0.8"/>
                <text x="350" y="173" fontSize="14" fill="#1a1410" fontWeight="800" textAnchor="middle" fontFamily="Georgia">Shroud</text>
                <text x="350" y="191" fontSize="11" fill="#1a1410" fontWeight="700" textAnchor="middle" fontFamily="Georgia">Mystery</text>

                {/* Golden Resurrection Crown - At the very top */}
                <circle cx="350" cy="80" r="52" fill="#d4af37" opacity="0.9"/>
                <text x="350" y="72" fontSize="15" fill="#2d1810" fontWeight="900" textAnchor="middle" fontFamily="Georgia">THE</text>
                <text x="350" y="92" fontSize="16" fill="#2d1810" fontWeight="900" textAnchor="middle" fontFamily="Georgia">RESURRECTION</text>

                {/* Cross at the very top */}
                <path d="M 350 25 L 350 85" stroke="#6B5D48" strokeWidth="6" fill="none"/>
                <path d="M 325 45 L 375 45" stroke="#6B5D48" strokeWidth="6" fill="none"/>
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
                      <div className="timeline-text" dangerouslySetInnerHTML={{ __html: event.content }} />
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
