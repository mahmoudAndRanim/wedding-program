import './App.css'

function App() {
  return (
    <div className="wedding-container">
      {/* Bismillah */}
      <div className="bismillah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
      
      {/* Header */}
      <header className="wedding-header">
        <p className="subtitle">You are cordially invited to celebrate</p>
        <h1 className="couple-names">
          <span className="names-ar">محمود و رنيم</span>
          <span className="names-en">Mahmoud & Ranim</span>
        </h1>
        <div className="date-badge">
          <span className="day">28</span>
          <span className="month">March</span>
          <span className="year">2026</span>
        </div>
        <p className="adults-only">Adults Only Event</p>
      </header>

      {/* Program */}
      <section className="program-section">
        <h2 className="section-title">Program</h2>
        
        <div className="program-timeline">
          <div className="program-item">
            <div className="time">17:00</div>
            <div className="event">
              <h3>Ceremony</h3>
              <p>Wedding ceremony begins</p>
            </div>
          </div>

          <div className="program-item">
            <div className="time">18:00</div>
            <div className="event">
              <h3>Reception</h3>
              <p>Welcome drinks & mingling</p>
            </div>
          </div>

          <div className="program-item">
            <div className="time">19:00</div>
            <div className="event">
              <h3>Dinner</h3>
              <p>Three-course meal</p>
            </div>
          </div>

          <div className="program-item">
            <div className="time">21:00</div>
            <div className="event">
              <h3>Speeches & Entertainment</h3>
              <p>Toasts and surprises</p>
            </div>
          </div>

          <div className="program-item">
            <div className="time">22:00</div>
            <div className="event">
              <h3>Cake & First Dance</h3>
              <p>Wedding cake cutting</p>
            </div>
          </div>

          <div className="program-item">
            <div className="time">23:00</div>
            <div className="event">
              <h3>Party & Dancing</h3>
              <p>Dance floor opens!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Praktisk info */}
      <section className="info-section">
        <h2 className="section-title">Details</h2>
        
        <div className="info-cards">
          <div className="info-card">
            <div className="info-icon">
              <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" /><circle cx="12" cy="9" r="2.5" /></svg>
            </div>
            <h3>Venue</h3>
            <p>Trondheimsveien 48F</p>
            <p className="address">2007 Kjeller</p>
          </div>

          <div className="info-card">
            <div className="info-icon">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
            </div>
            <h3>Time</h3>
            <p>Ceremony at 17:00</p>
          </div>

          <div className="info-card">
            <div className="info-icon">
              <svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="3" y1="10" x2="21" y2="10" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="16" y1="2" x2="16" y2="6" /></svg>
            </div>
            <h3>Date</h3>
            <p>Saturday, March 28, 2026</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="wedding-footer">
        <div className="divider">
          <span className="divider-line"></span>
          <span className="divider-star"></span>
          <span className="divider-line"></span>
        </div>
        <p className="footer-message">We look forward to celebrating with you!</p>
        <p className="couple-initials">M & R</p>
      </footer>
    </div>
  )
}

export default App
