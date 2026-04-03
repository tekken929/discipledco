import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, BookOpen, Users, FolderOpen, MessageCircle, Book, Music, Mic, BookText, UserCheck, Radio, Calendar, Home } from 'lucide-react';

export function Resurrection() {
  const [menuOpen, setMenuOpen] = useState(false);

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
              <div className="papyrus-caption">
                <p className="papyrus-caption-text">P52 • Rylands Papyrus • Gospel of John 18:31-33 • 125-150 AD</p>
              </div>
            </div>
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
              <svg className="tree-svg" viewBox="0 0 400 600" xmlns="http://www.w3.org/2000/svg">
                {/* Tree Trunk */}
                <path d="M 180 600 Q 180 500, 190 450 Q 200 400, 200 300 Q 200 200, 200 100"
                      stroke="#8B7556" strokeWidth="12" fill="none" strokeLinecap="round"/>

                {/* Root System */}
                <path d="M 200 600 Q 180 580, 150 590" stroke="#6B5D48" strokeWidth="6" fill="none" opacity="0.7"/>
                <path d="M 200 600 Q 220 580, 250 590" stroke="#6B5D48" strokeWidth="6" fill="none" opacity="0.7"/>
                <path d="M 200 600 Q 200 590, 200 610" stroke="#6B5D48" strokeWidth="8" fill="none" opacity="0.7"/>

                {/* Main Branches */}
                <path d="M 200 100 Q 150 80, 120 90" stroke="#8B7556" strokeWidth="8" fill="none"/>
                <path d="M 200 100 Q 250 80, 280 90" stroke="#8B7556" strokeWidth="8" fill="none"/>
                <path d="M 200 150 Q 140 130, 100 140" stroke="#8B7556" strokeWidth="7" fill="none"/>
                <path d="M 200 150 Q 260 130, 300 140" stroke="#8B7556" strokeWidth="7" fill="none"/>
                <path d="M 200 200 Q 160 190, 130 200" stroke="#8B7556" strokeWidth="6" fill="none"/>
                <path d="M 200 200 Q 240 190, 270 200" stroke="#8B7556" strokeWidth="6" fill="none"/>
                <path d="M 200 250 Q 150 240, 120 250" stroke="#8B7556" strokeWidth="6" fill="none"/>
                <path d="M 200 250 Q 250 240, 280 250" stroke="#8B7556" strokeWidth="6" fill="none"/>
                <path d="M 200 300 Q 170 295, 140 305" stroke="#8B7556" strokeWidth="5" fill="none"/>
                <path d="M 200 300 Q 230 295, 260 305" stroke="#8B7556" strokeWidth="5" fill="none"/>

                {/* Leaves/Crown */}
                <circle cx="120" cy="90" r="25" fill="#9CA383" opacity="0.6"/>
                <circle cx="280" cy="90" r="25" fill="#9CA383" opacity="0.6"/>
                <circle cx="100" cy="140" r="22" fill="#9CA383" opacity="0.6"/>
                <circle cx="300" cy="140" r="22" fill="#9CA383" opacity="0.6"/>
                <circle cx="130" cy="200" r="20" fill="#9CA383" opacity="0.6"/>
                <circle cx="270" cy="200" r="20" fill="#9CA383" opacity="0.6"/>
                <circle cx="200" cy="70" r="30" fill="#9CA383" opacity="0.7"/>
                <circle cx="150" cy="110" r="20" fill="#9CA383" opacity="0.6"/>
                <circle cx="250" cy="110" r="20" fill="#9CA383" opacity="0.6"/>

                {/* Cross at the top */}
                <path d="M 200 40 L 200 80" stroke="#6B5D48" strokeWidth="4" fill="none"/>
                <path d="M 185 50 L 215 50" stroke="#6B5D48" strokeWidth="4" fill="none"/>
              </svg>
            </div>

            {/* Gospel Timeline Content */}
            <div className="gospel-timeline">
              <div className="timeline-event">
                <h3 className="timeline-title">Jesus Predicts His Death</h3>
                <p className="timeline-text">
                  {/* Space for additional content */}
                </p>
              </div>

              <div className="timeline-event">
                <h3 className="timeline-title">The Last Supper</h3>
                <p className="timeline-text">
                  {/* Space for additional content */}
                </p>
              </div>

              <div className="timeline-event">
                <h3 className="timeline-title">Garden of Gethsemane</h3>
                <p className="timeline-text">
                  {/* Space for additional content */}
                </p>
              </div>

              <div className="timeline-event">
                <h3 className="timeline-title">Before Pilate</h3>
                <p className="timeline-text">
                  {/* Space for additional content */}
                </p>
              </div>

              <div className="timeline-event">
                <h3 className="timeline-title">"Crucify Him!"</h3>
                <p className="timeline-text">
                  {/* Space for additional content */}
                </p>
              </div>

              <div className="timeline-event">
                <h3 className="timeline-title">The Way of Sorrows</h3>
                <p className="timeline-text">
                  {/* Space for additional content */}
                </p>
              </div>

              <div className="timeline-event">
                <h3 className="timeline-title">The Crucifixion</h3>
                <p className="timeline-text">
                  {/* Space for additional content */}
                </p>
              </div>

              <div className="timeline-event">
                <h3 className="timeline-title">The Burial</h3>
                <p className="timeline-text">
                  {/* Space for additional content */}
                </p>
              </div>

              <div className="timeline-event">
                <h3 className="timeline-title">The Empty Tomb</h3>
                <p className="timeline-text">
                  {/* Space for additional content */}
                </p>
              </div>

              <div className="timeline-event">
                <h3 className="timeline-title">The Resurrection</h3>
                <p className="timeline-text">
                  {/* Space for additional content */}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
