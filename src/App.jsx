import './App.css'

function App() {
  return (
    <div className="wedding-container">
      {/* Header - enkelt */}
      <header className="wedding-header">
        <h1 className="page-title">Program</h1>
        <p className="date-line">28. mars 2026</p>
      </header>

      {/* Program */}
      <section className="program-section">
        <div className="program-timeline">
          <div className="program-item">
            <div className="time">17:00</div>
            <div className="event">
              <h3>Seremoni</h3>
            </div>
          </div>

          <div className="program-item">
            <div className="time">18:00</div>
            <div className="event">
              <h3>Velkomstdrink</h3>
            </div>
          </div>

          <div className="program-item">
            <div className="time">19:00</div>
            <div className="event">
              <h3>Middag</h3>
            </div>
          </div>

          <div className="program-item">
            <div className="time">21:00</div>
            <div className="event">
              <h3>Taler & Underholdning</h3>
            </div>
          </div>

          <div className="program-item">
            <div className="time">22:00</div>
            <div className="event">
              <h3>Kake & Brudevals</h3>
            </div>
          </div>

          <div className="program-item">
            <div className="time">23:00</div>
            <div className="event">
              <h3>Fest & Dans</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Info */}
      <section className="info-section">
        <div className="info-item">
          <span className="info-label">Sted</span>
          <span className="info-value">Trondheimsveien 48F, 2007 Kjeller</span>
        </div>
        <div className="info-item">
          <span className="info-label">Dresscode</span>
          <span className="info-value">Festantrekk</span>
        </div>
      </section>
    </div>
  )
}

export default App
