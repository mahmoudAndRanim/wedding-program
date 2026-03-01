import { useState } from 'react'
import './App.css'

const translations = {
  no: {
    program: 'Program',
    date: '28. mars 2026',
    ceremony: 'Seremoni',
    reception: 'Velkomstdrink',
    dinner: 'Middag',
    speeches: 'Taler & Underholdning',
    cake: 'Kake & Brudevals',
    party: 'Fest & Dans',
    venue: 'Sted',
    dresscode: 'Dresscode',
    dresscodeValue: 'Festantrekk',
    langBtn: 'عربي',
  },
  ar: {
    program: 'البرنامج',
    date: '٢٨ مارس ٢٠٢٦',
    ceremony: 'الحفل',
    reception: 'استقبال الضيوف',
    dinner: 'العشاء',
    speeches: 'كلمات وفقرات',
    cake: 'الكيك والرقصة الأولى',
    party: 'سهرة ورقص',
    venue: 'المكان',
    dresscode: 'الملابس',
    dresscodeValue: 'رسمي أنيق',
    langBtn: 'Norsk',
  }
}

function App() {
  const [lang, setLang] = useState('no')
  const t = translations[lang]
  const isArabic = lang === 'ar'

  return (
    <div className={`wedding-container ${isArabic ? 'rtl' : ''}`}>
      {/* Language toggle */}
      <button 
        className="lang-toggle"
        onClick={() => setLang(lang === 'no' ? 'ar' : 'no')}
      >
        {t.langBtn}
      </button>

      {/* Header */}
      <header className="wedding-header">
        <h1 className="page-title">{t.program}</h1>
        <p className="date-line">{t.date}</p>
      </header>

      {/* Program */}
      <section className="program-section">
        <div className="program-timeline">
          <div className="program-item">
            <div className="time">17:00</div>
            <div className="event">
              <h3>{t.ceremony}</h3>
            </div>
          </div>

          <div className="program-item">
            <div className="time">18:00</div>
            <div className="event">
              <h3>{t.reception}</h3>
            </div>
          </div>

          <div className="program-item">
            <div className="time">19:00</div>
            <div className="event">
              <h3>{t.dinner}</h3>
            </div>
          </div>

          <div className="program-item">
            <div className="time">21:00</div>
            <div className="event">
              <h3>{t.speeches}</h3>
            </div>
          </div>

          <div className="program-item">
            <div className="time">22:00</div>
            <div className="event">
              <h3>{t.cake}</h3>
            </div>
          </div>

          <div className="program-item">
            <div className="time">23:00</div>
            <div className="event">
              <h3>{t.party}</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Info */}
      <section className="info-section">
        <div className="info-item">
          <span className="info-label">{t.venue}</span>
          <span className="info-value">Trondheimsveien 48F, 2007 Kjeller</span>
        </div>
        <div className="info-item">
          <span className="info-label">{t.dresscode}</span>
          <span className="info-value">{t.dresscodeValue}</span>
        </div>
      </section>
    </div>
  )
}

export default App
