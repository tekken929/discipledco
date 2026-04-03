import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, BookOpen, Users, FolderOpen, MessageCircle, Book, Music, Mic, BookText, UserCheck, Radio, Calendar, Home, Info, Plus } from 'lucide-react';

interface InfoPopupProps {
  title: string;
  content: string;
  onClose: () => void;
}

function InfoPopup({ title, content, onClose }: InfoPopupProps) {
  return (
    <>
      <div className="popup-overlay" onClick={onClose} />
      <div className="popup-container">
        <div className="info-popup">
          <button onClick={onClose} className="popup-close" aria-label="Close">
            <X className="w-5 h-5" />
          </button>
          <h3 className="popup-title">{title}</h3>
          <div className="popup-divider"></div>
          <div className="popup-content" dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    </>
  );
}

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

  const gospelEvents = [
    {
      id: 'prediction',
      title: 'Jesus Predicts His Death',
      content: `Jesus knew His mission from the beginning. He repeatedly told His disciples that He must suffer, die, and rise again.<br><br>
        <strong>Matthew 16:21 (ESV):</strong> "From that time Jesus began to show his disciples that he must go to Jerusalem and suffer many things from the elders and chief priests and scribes, and be killed, and on the third day be raised."<br><br>
        <strong>Mark 10:33-34 (ESV):</strong> "See, we are going up to Jerusalem, and the Son of Man will be delivered over to the chief priests and the scribes, and they will condemn him to death and deliver him over to the Gentiles. And they will mock him and spit on him, and flog him and kill him. And after three days he will rise."`
    },
    {
      id: 'last-supper',
      title: 'The Last Supper',
      content: `On the night before His crucifixion, Jesus gathered with His disciples to share the Passover meal, instituting the Lord's Supper.<br><br>
        <strong>Matthew 26:26-28 (ESV):</strong> "Now as they were eating, Jesus took bread, and after blessing it broke it and gave it to the disciples, and said, 'Take, eat; this is my body.' And he took a cup, and when he had given thanks he gave it to them, saying, 'Drink of it, all of you, for this is my blood of the covenant, which is poured out for many for the forgiveness of sins.'"<br><br>
        <strong>John 13:34-35 (ESV):</strong> "A new commandment I give to you, that you love one another: just as I have loved you, you also are to love one another."`
    },
    {
      id: 'gethsemane',
      title: 'Garden of Gethsemane',
      content: `In the garden, Jesus prayed with such intensity that His sweat became like drops of blood, fully aware of the suffering to come.<br><br>
        <strong>Matthew 26:39 (ESV):</strong> "And going a little farther he fell on his face and prayed, saying, 'My Father, if it be possible, let this cup pass from me; nevertheless, not as I will, but as you will.'"<br><br>
        <strong>Luke 22:44 (ESV):</strong> "And being in agony he prayed more earnestly; and his sweat became like great drops of blood falling down to the ground."`
    },
    {
      id: 'pilate',
      title: 'Before Pilate',
      content: `Jesus was brought before Pontius Pilate, the Roman governor. Though Pilate found no fault in Him, political pressure would seal Christ's fate.<br><br>
        <strong>John 18:37-38 (ESV):</strong> "Then Pilate said to him, 'So you are a king?' Jesus answered, 'You say that I am a king. For this purpose I was born and for this purpose I have come into the world—to bear witness to the truth. Everyone who is of the truth listens to my voice.' Pilate said to him, 'What is truth?'"<br><br>
        <strong>Luke 23:4 (ESV):</strong> "Then Pilate said to the chief priests and the crowds, 'I find no guilt in this man.'"`
    },
    {
      id: 'crucify',
      title: '"Crucify Him!"',
      content: `The crowd, stirred by the religious leaders, chose a murderer over the Messiah and demanded Jesus be crucified.<br><br>
        <strong>Matthew 27:22-23 (ESV):</strong> "Pilate said to them, 'Then what shall I do with Jesus who is called Christ?' They all said, 'Let him be crucified!' And he said, 'Why? What evil has he done?' But they shouted all the more, 'Let him be crucified!'"<br><br>
        <strong>Mark 15:13-14 (ESV):</strong> "And they cried out again, 'Crucify him.' And Pilate said to them, 'Why? What evil has he done?' But they shouted all the more, 'Crucify him.'"`
    },
    {
      id: 'via-dolorosa',
      title: 'The Way of Sorrows',
      content: `Jesus carried His cross through Jerusalem to Golgotha, the place of the skull. Beaten, mocked, and exhausted, He walked the path of redemption.<br><br>
        <strong>John 19:17 (ESV):</strong> "And he went out, bearing his own cross, to the place called The Place of a Skull, which in Aramaic is called Golgotha."<br><br>
        <strong>Luke 23:26 (ESV):</strong> "And as they led him away, they seized one Simon of Cyrene, who was coming in from the country, and laid on him the cross, to carry it behind Jesus."`
    },
    {
      id: 'crucifixion',
      title: 'The Crucifixion',
      content: `Between two thieves, the Son of God was crucified. From the cross, He spoke words of forgiveness, compassion, and ultimate surrender.<br><br>
        <strong>Luke 23:34 (ESV):</strong> "And Jesus said, 'Father, forgive them, for they know not what they do.'"<br><br>
        <strong>John 19:30 (ESV):</strong> "When Jesus had received the sour wine, he said, 'It is finished,' and he bowed his head and gave up his spirit."<br><br>
        <strong>Matthew 27:51 (ESV):</strong> "And behold, the curtain of the temple was torn in two, from top to bottom. And the earth shook, and the rocks were split."`
    },
    {
      id: 'burial',
      title: 'The Burial',
      content: `Joseph of Arimathea, a secret disciple, requested Jesus' body and laid it in his own new tomb. The stone was sealed, guards were posted.<br><br>
        <strong>Matthew 27:59-60 (ESV):</strong> "And Joseph took the body and wrapped it in a clean linen shroud and laid it in his own new tomb, which he had cut in the rock. And he rolled a great stone to the entrance of the tomb and went away."<br><br>
        <strong>John 19:41-42 (ESV):</strong> "Now in the place where he was crucified there was a garden, and in the garden a new tomb in which no one had yet been laid."`
    },
    {
      id: 'empty-tomb',
      title: 'The Empty Tomb',
      content: `On the first day of the week, women came to the tomb with spices. They found the stone rolled away and the tomb empty. Angels declared: "He is not here; he has risen!"<br><br>
        <strong>Mark 16:5-6 (ESV):</strong> "And entering the tomb, they saw a young man sitting on the right side, dressed in a white robe, and they were alarmed. And he said to them, 'Do not be alarmed. You seek Jesus of Nazareth, who was crucified. He has risen; he is not here. See the place where they laid him.'"<br><br>
        <strong>Luke 24:5-6 (ESV):</strong> "Why do you seek the living among the dead? He is not here, but has risen."`
    },
    {
      id: 'resurrection',
      title: 'The Resurrection',
      content: `Jesus appeared to Mary Magdalene, to Peter, to the disciples, and to more than 500 witnesses. Death was defeated. The grave was conquered.<br><br>
        <strong>John 20:19-20 (ESV):</strong> "On the evening of that day, the first day of the week, the doors being locked where the disciples were for fear of the Jews, Jesus came and stood among them and said to them, 'Peace be with you.' When he had said this, he showed them his hands and his side. Then the disciples were glad when they saw the Lord."<br><br>
        <strong>1 Corinthians 15:5-6 (ESV):</strong> "He appeared to Cephas, then to the twelve. Then he appeared to more than five hundred brothers at one time."`
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

          {/* Info Popups */}
          {activePopup && infoPoints.find(p => p.id === activePopup) && (
            <InfoPopup
              title={infoPoints.find(p => p.id === activePopup)!.title}
              content={infoPoints.find(p => p.id === activePopup)!.content}
              onClose={() => setActivePopup(null)}
            />
          )}
          {activePopup && gospelEvents.find(e => e.id === activePopup) && (
            <InfoPopup
              title={gospelEvents.find(e => e.id === activePopup)!.title}
              content={gospelEvents.find(e => e.id === activePopup)!.content}
              onClose={() => setActivePopup(null)}
            />
          )}
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

                {/* Leaves/Crown with labels - clickable */}
                <circle cx="120" cy="90" r="25" fill="#9CA383" opacity="0.6" onClick={() => setActivePopup('burial')} style={{cursor: 'pointer'}}/>
                <text x="120" y="95" fontSize="10" fill="#2d1810" fontWeight="600" textAnchor="middle" fontFamily="Georgia">Burial</text>

                <circle cx="280" cy="90" r="25" fill="#9CA383" opacity="0.6" onClick={() => setActivePopup('empty-tomb')} style={{cursor: 'pointer'}}/>
                <text x="280" y="95" fontSize="10" fill="#2d1810" fontWeight="600" textAnchor="middle" fontFamily="Georgia">Empty</text>

                <circle cx="100" cy="140" r="22" fill="#9CA383" opacity="0.6" onClick={() => setActivePopup('crucifixion')} style={{cursor: 'pointer'}}/>
                <text x="100" y="145" fontSize="9" fill="#2d1810" fontWeight="600" textAnchor="middle" fontFamily="Georgia">Crucifixion</text>

                <circle cx="300" cy="140" r="22" fill="#9CA383" opacity="0.6" onClick={() => setActivePopup('via-dolorosa')} style={{cursor: 'pointer'}}/>
                <text x="300" y="145" fontSize="9" fill="#2d1810" fontWeight="600" textAnchor="middle" fontFamily="Georgia">Via</text>

                <circle cx="130" cy="200" r="20" fill="#9CA383" opacity="0.6" onClick={() => setActivePopup('crucify')} style={{cursor: 'pointer'}}/>
                <text x="130" y="205" fontSize="8" fill="#2d1810" fontWeight="600" textAnchor="middle" fontFamily="Georgia">Crucify</text>

                <circle cx="270" cy="200" r="20" fill="#9CA383" opacity="0.6" onClick={() => setActivePopup('pilate')} style={{cursor: 'pointer'}}/>
                <text x="270" y="205" fontSize="8" fill="#2d1810" fontWeight="600" textAnchor="middle" fontFamily="Georgia">Pilate</text>

                <circle cx="200" cy="70" r="30" fill="#d4af37" opacity="0.8" onClick={() => setActivePopup('resurrection')} style={{cursor: 'pointer'}}/>
                <text x="200" y="70" fontSize="9" fill="#2d1810" fontWeight="700" textAnchor="middle" fontFamily="Georgia">THE</text>
                <text x="200" y="82" fontSize="9" fill="#2d1810" fontWeight="700" textAnchor="middle" fontFamily="Georgia">RESURRECTION</text>

                <circle cx="150" cy="110" r="20" fill="#9CA383" opacity="0.6" onClick={() => setActivePopup('last-supper')} style={{cursor: 'pointer'}}/>
                <text x="150" y="115" fontSize="8" fill="#2d1810" fontWeight="600" textAnchor="middle" fontFamily="Georgia">Supper</text>

                <circle cx="250" cy="110" r="20" fill="#9CA383" opacity="0.6" onClick={() => setActivePopup('gethsemane')} style={{cursor: 'pointer'}}/>
                <text x="250" y="115" fontSize="8" fill="#2d1810" fontWeight="600" textAnchor="middle" fontFamily="Georgia">Garden</text>

                {/* Cross at the top */}
                <path d="M 200 40 L 200 80" stroke="#6B5D48" strokeWidth="4" fill="none"/>
                <path d="M 185 50 L 215 50" stroke="#6B5D48" strokeWidth="4" fill="none"/>
              </svg>
            </div>

            {/* Gospel Timeline Content */}
            <div className="gospel-timeline">
              {gospelEvents.map((event) => (
                <div key={event.id} className="timeline-event">
                  <div className="timeline-header">
                    <h3 className="timeline-title">{event.title}</h3>
                    <button
                      className="timeline-expand-btn"
                      onClick={() => setActivePopup(event.id)}
                      aria-label={`Learn more about ${event.title}`}
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="timeline-text">
                    {/* Space for additional content */}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
