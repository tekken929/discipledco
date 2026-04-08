import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Music2, Calendar, ExternalLink } from 'lucide-react';
import { HallowedMusicPlayer } from '../components/HallowedMusicPlayer';
import { HallowedMusicUpload } from '../components/HallowedMusicUpload';
import '../hallowed.css';

export function Hallowed() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleUploadComplete = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="hallowed-page">
      <Link
        to="/music"
        className="fixed top-8 left-8 z-50 flex items-center gap-2 text-white hover:opacity-70 transition-opacity"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-sm tracking-widest uppercase">Return to Previous</span>
      </Link>

      <section className="hallowed-hero">
        <div className="hallowed-hero-content">
          <div className="hallowed-logo">
            <div className="logo-circle">
              <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="100" cy="100" r="99" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
                <circle cx="100" cy="100" r="85" stroke="currentColor" strokeWidth="0.5" opacity="0.2"/>

                <path
                  d="M100 30 L100 170 M60 100 L140 100"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />

                <circle cx="100" cy="60" r="15" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <path
                  d="M85 55 L90 50 L95 55 M105 55 L110 50 L115 55"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M85 65 L90 70 L95 65 M105 65 L110 70 L115 65"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  fill="none"
                />

                <path
                  d="M70 140 L75 130 L80 135 L85 125 L90 130 L95 120 L100 125 L105 120 L110 130 L115 125 L120 135 L125 130 L130 140"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0.4"
                />
              </svg>
            </div>
            <h1 className="hallowed-band-name">HALLOWED</h1>
            <p className="hallowed-tagline">Sacred Sound</p>
            <HallowedMusicPlayer key={refreshKey} />
          </div>
        </div>
      </section>

      <section className="hallowed-section">
        <div className="hallowed-content-block">
          <h2 className="hallowed-section-title">About</h2>
          <div className="hallowed-divider"></div>
          <p className="hallowed-text">
            Hallowed emerged from the depths of spiritual questioning and exploration.
            We craft heavy, atmospheric soundscapes that wrestle with faith, doubt, and the
            eternal search for meaning in a chaotic world.
          </p>
          <p className="hallowed-text">
            Our music blends crushing riffs with ethereal melodies, creating a worship experience
            that acknowledges both the light and the darkness. Every note is a prayer, every lyric
            a meditation on the divine mystery.
          </p>
        </div>
      </section>

      <section className="hallowed-section">
        <div className="hallowed-content-block">
          <h2 className="hallowed-section-title">Music</h2>
          <div className="hallowed-divider"></div>

          <div className="hallowed-releases">
            <div className="release-card">
              <div className="release-artwork">
                <div className="artwork-placeholder">
                  <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="400" height="400" fill="#0a0a0a"/>
                    <circle cx="200" cy="200" r="120" stroke="white" strokeWidth="1" opacity="0.2"/>
                    <circle cx="200" cy="200" r="90" stroke="white" strokeWidth="1" opacity="0.15"/>
                    <circle cx="200" cy="200" r="60" stroke="white" strokeWidth="1" opacity="0.1"/>
                    <path d="M200 80 L200 320 M80 200 L320 200" stroke="white" strokeWidth="2" opacity="0.3"/>
                    <Music2 x="170" y="170" width="60" height="60" stroke="white" strokeWidth="1" opacity="0.4"/>
                  </svg>
                </div>
              </div>
              <h3 className="release-title">Ashes to Light</h3>
              <p className="release-year">2024</p>
            </div>

            <div className="release-card">
              <div className="release-artwork">
                <div className="artwork-placeholder">
                  <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="400" height="400" fill="#0a0a0a"/>
                    <path d="M100 150 L150 100 L200 150 L250 100 L300 150" stroke="white" strokeWidth="2" opacity="0.2"/>
                    <path d="M100 250 L150 200 L200 250 L250 200 L300 250" stroke="white" strokeWidth="2" opacity="0.2"/>
                    <circle cx="200" cy="200" r="40" stroke="white" strokeWidth="1" opacity="0.3"/>
                    <Music2 x="170" y="170" width="60" height="60" stroke="white" strokeWidth="1" opacity="0.4"/>
                  </svg>
                </div>
              </div>
              <h3 className="release-title">The Narrow Path</h3>
              <p className="release-year">2023</p>
            </div>

            <div className="release-card">
              <div className="release-artwork">
                <div className="artwork-placeholder">
                  <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="400" height="400" fill="#0a0a0a"/>
                    <circle cx="200" cy="200" r="150" stroke="white" strokeWidth="1" opacity="0.15"/>
                    <path d="M200 50 L200 350" stroke="white" strokeWidth="1" opacity="0.3"/>
                    <path d="M50 200 L350 200" stroke="white" strokeWidth="1" opacity="0.3"/>
                    <path d="M350 350 L50 50" stroke="white" strokeWidth="0.5" opacity="0.2"/>
                    <Music2 x="170" y="170" width="60" height="60" stroke="white" strokeWidth="1" opacity="0.4"/>
                  </svg>
                </div>
              </div>
              <h3 className="release-title">Covenant</h3>
              <p className="release-year">2022</p>
            </div>
          </div>
        </div>
      </section>

      <section className="hallowed-section">
        <div className="hallowed-content-block">
          <h2 className="hallowed-section-title">Live</h2>
          <div className="hallowed-divider"></div>

          <div className="hallowed-shows">
            <div className="show-item">
              <div className="show-date">
                <Calendar className="w-5 h-5 inline-block mr-2 opacity-50" />
                <div>APR 15, 2026</div>
              </div>
              <div className="show-details">
                <div className="show-venue">The Sanctuary</div>
                <div className="show-location">Portland, OR</div>
              </div>
            </div>

            <div className="show-item">
              <div className="show-date">
                <Calendar className="w-5 h-5 inline-block mr-2 opacity-50" />
                <div>MAY 3, 2026</div>
              </div>
              <div className="show-details">
                <div className="show-venue">Cathedral Club</div>
                <div className="show-location">Seattle, WA</div>
              </div>
            </div>

            <div className="show-item">
              <div className="show-date">
                <Calendar className="w-5 h-5 inline-block mr-2 opacity-50" />
                <div>MAY 20, 2026</div>
              </div>
              <div className="show-details">
                <div className="show-venue">The Chapel</div>
                <div className="show-location">San Francisco, CA</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="hallowed-section">
        <div className="hallowed-content-block">
          <h2 className="hallowed-section-title">Connect</h2>
          <div className="hallowed-divider"></div>

          <div className="hallowed-links">
            <a href="#" className="hallowed-link">
              Spotify <ExternalLink className="w-4 h-4 inline-block ml-1" />
            </a>
            <a href="#" className="hallowed-link">
              Apple Music <ExternalLink className="w-4 h-4 inline-block ml-1" />
            </a>
            <a href="#" className="hallowed-link">
              Bandcamp <ExternalLink className="w-4 h-4 inline-block ml-1" />
            </a>
            <a href="#" className="hallowed-link">
              Instagram <ExternalLink className="w-4 h-4 inline-block ml-1" />
            </a>
            <a href="#" className="hallowed-link">
              YouTube <ExternalLink className="w-4 h-4 inline-block ml-1" />
            </a>
          </div>
        </div>
      </section>

      <footer className="hallowed-footer">
        <blockquote className="hallowed-quote">
          "Make a joyful noise unto the Lord, all the earth: make a loud noise, and rejoice, and sing praise."
          <cite>Psalm 98:4</cite>
        </blockquote>
        <div className="hallowed-admin-section">
          <HallowedMusicUpload onUploadComplete={handleUploadComplete} />
        </div>
      </footer>
    </div>
  );
}
