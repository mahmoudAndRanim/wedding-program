import { useState, useEffect } from 'react'
import './App.css'

// Wedding date: March 28, 2026
const WEDDING_DATE = '2026-03-28'

const programTimes = [
  { time: '17:00', endTime: '18:00' },
  { time: '18:00', endTime: '19:00' },
  { time: '19:00', endTime: '21:00' },
  { time: '21:00', endTime: '22:00' },
  { time: '22:00', endTime: '23:00' },
  { time: '23:00', endTime: '23:59' },
]

function getCurrentEventIndex() {
  const now = new Date()
  const today = now.toISOString().split('T')[0]
  
  // Only show progress on wedding day
  if (today !== WEDDING_DATE) return -1
  
  const currentHour = now.getHours()
  const currentMinute = now.getMinutes()
  const currentTimeMinutes = currentHour * 60 + currentMinute
  
  for (let i = 0; i < programTimes.length; i++) {
    const [startH, startM] = programTimes[i].time.split(':').map(Number)
    const [endH, endM] = programTimes[i].endTime.split(':').map(Number)
    const startMinutes = startH * 60 + startM
    const endMinutes = endH * 60 + endM
    
    if (currentTimeMinutes >= startMinutes && currentTimeMinutes < endMinutes) {
      return i
    }
  }
  
  return -1
}

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
  const [lang, setLang] = useState('ar')
  const [currentEvent, setCurrentEvent] = useState(-1)
  const t = translations[lang]
  const isArabic = lang === 'ar'

  useEffect(() => {
    // Check current event on mount and every minute
    setCurrentEvent(getCurrentEventIndex())
    const interval = setInterval(() => {
      setCurrentEvent(getCurrentEventIndex())
    }, 60000) // Update every minute
    
    return () => clearInterval(interval)
  }, [])

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
          <div className={`program-item ${currentEvent === 0 ? 'active' : ''} ${currentEvent > 0 ? 'completed' : ''}`}>
            <div className="time">17:00</div>
            <div className="event">
              <h3>{t.ceremony}</h3>
            </div>
            {currentEvent === 0 && <div className="now-indicator">{lang === 'ar' ? 'الآن' : 'Nå'}</div>}
          </div>

          <div className={`program-item ${currentEvent === 1 ? 'active' : ''} ${currentEvent > 1 ? 'completed' : ''}`}>
            <div className="time">18:00</div>
            <div className="event">
              <h3>{t.reception}</h3>
            </div>
            {currentEvent === 1 && <div className="now-indicator">{lang === 'ar' ? 'الآن' : 'Nå'}</div>}
          </div>

          <div className={`program-item ${currentEvent === 2 ? 'active' : ''} ${currentEvent > 2 ? 'completed' : ''}`}>
            <div className="time">19:00</div>
            <div className="event">
              <h3>{t.dinner}</h3>
            </div>
            {currentEvent === 2 && <div className="now-indicator">{lang === 'ar' ? 'الآن' : 'Nå'}</div>}
          </div>

          <div className={`program-item ${currentEvent === 3 ? 'active' : ''} ${currentEvent > 3 ? 'completed' : ''}`}>
            <div className="time">21:00</div>
            <div className="event">
              <h3>{t.speeches}</h3>
            </div>
            {currentEvent === 3 && <div className="now-indicator">{lang === 'ar' ? 'الآن' : 'Nå'}</div>}
          </div>

          <div className={`program-item ${currentEvent === 4 ? 'active' : ''} ${currentEvent > 4 ? 'completed' : ''}`}>
            <div className="time">22:00</div>
            <div className="event">
              <h3>{t.cake}</h3>
            </div>
            {currentEvent === 4 && <div className="now-indicator">{lang === 'ar' ? 'الآن' : 'Nå'}</div>}
          </div>

          <div className={`program-item ${currentEvent === 5 ? 'active' : ''}`}>
            <div className="time">23:00</div>
            <div className="event">
              <h3>{t.party}</h3>
            </div>
            {currentEvent === 5 && <div className="now-indicator">{lang === 'ar' ? 'الآن' : 'Nå'}</div>}
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
