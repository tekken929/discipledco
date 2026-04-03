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
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/P52_recto.jpg/800px-P52_recto.jpg"
                alt="P52 Papyrus Fragment - Earliest known fragment of the Gospel of John"
                className="papyrus-image"
                loading="eager"
              />
              <div className="papyrus-caption">
                <p className="papyrus-caption-text">P52 • Rylands Papyrus • Gospel of John 18:31-33</p>
                <p className="papyrus-caption-date">~125-150 AD</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <div className="resurrection-content">
        {/* Intro Statement */}
        <section className="resurrection-section fade-in-section">
          <div className="resurrection-intro-block">
            <p className="resurrection-intro-text">
              Through centuries of persecution, through fire and flood, through the hands of scribes
              and the passage of empires, the testimony endured.
            </p>
          </div>
        </section>

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
              <cite>John 11:25</cite>
            </blockquote>
          </div>
        </section>

        {/* Evidence Section */}
        <section className="resurrection-section fade-in-section">
          <div className="resurrection-evidence-grid">
            <div className="evidence-card">
              <h3 className="evidence-title">Early Dating</h3>
              <p className="evidence-text">
                P52 dates to 125-150 AD, placing it within decades of the original Gospel.
                This destroys theories of late legendary development.
              </p>
            </div>
            <div className="evidence-card">
              <h3 className="evidence-title">Wide Distribution</h3>
              <p className="evidence-text">
                Found in Egypt, far from John's authorship in Ephesus, proving rapid
                circulation across the ancient world.
              </p>
            </div>
            <div className="evidence-card">
              <h3 className="evidence-title">Textual Accuracy</h3>
              <p className="evidence-text">
                The fragment matches later manuscripts with remarkable precision,
                demonstrating faithful preservation.
              </p>
            </div>
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
            <cite className="resurrection-scripture-cite">1 Corinthians 15:3-6</cite>
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
            <div className="resurrection-closing-mark">✝</div>
          </div>
        </section>
      </div>
    </div>
  );
}
