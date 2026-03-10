import { useState, useEffect } from 'react'
import './App.css'

// Wedding date: March 28, 2026 at 17:00
const WEDDING_DATE = '2026-03-28'

// DEMO MODE: Set to true to test active indicator
const DEMO_MODE = false

const PHOTO_ALBUM_URL = 'https://photos.app.goo.gl/NdQ25MoYWbPVSLuu9'

const programTimes = [
  { time: '17:00', endTime: '18:30' },
  { time: '18:30', endTime: '20:00' },
  { time: '20:00', endTime: '20:45' },
  { time: '20:45', endTime: '21:15' },
  { time: '21:15', endTime: '21:30' },
  { time: '21:30', endTime: '22:00' },
  { time: '22:00', endTime: '23:59' },
]

function getCurrentEventIndex() {
  if (DEMO_MODE) return 0
  
  const now = new Date()
  const today = now.toISOString().split('T')[0]
  
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
    couple: 'Mahmoud & Ranim',
    program: 'Bryllupsprogram',
    date: '28. mars 2026',
    countdown: 'Nedtelling',
    days: 'dager',
    hours: 'timer',
    minutes: 'min',
    reception: 'Velkomst',
    celebrate: 'Inngang & feiring',
    dinner: 'Middag',
    dancing: 'Dans',
    slowDance: 'Slow dance',
    cakeCutting: 'Kakeskjæring',
    continuation: 'Videre dans & feiring',
    venue: 'Sted',
    dresscode: 'Dresscode',
    dresscodeValue: 'Festantrekk',
    parking: 'Parkering',
    parkingValue: 'Gratis parkering ved lokalet',
    getDirections: 'Veibeskrivelse',
    addToCalendar: 'Legg til i kalender',
    photoTitle: 'Del bilder & video',
    photoBtn: 'Åpne album',
    hashtag: '#MahmoudOgRanim',
    weddingDay: 'I dag er dagen! 💍',
    langBtn: 'عربي',
  },
  ar: {
    couple: 'محمود و رنيم',
    program: 'برنامج الحفل',
    date: '٢٨ مارس ٢٠٢٦',
    countdown: 'العد التنازلي',
    days: 'يوم',
    hours: 'ساعة',
    minutes: 'دقيقة',
    reception: 'استقبال الضيوف',
    celebrate: 'دخلة العرسان والاحتفال',
    dinner: 'العشاء',
    dancing: 'رقص',
    slowDance: 'سلو دانس',
    cakeCutting: 'تقطيع الكيك',
    continuation: 'استمرار الرقص والاحتفال',
    venue: 'المكان',
    dresscode: 'الملابس',
    dresscodeValue: 'رسمي أنيق',
    parking: 'موقف السيارات',
    parkingValue: 'موقف مجاني بجانب القاعة',
    getDirections: 'الاتجاهات',
    addToCalendar: 'أضف للتقويم',
    photoTitle: 'شاركوا الصور والفيديو',
    photoBtn: 'افتح الألبوم',
    hashtag: '#محمود_ورنيم',
    weddingDay: 'اليوم هو اليوم! 💍',
    langBtn: 'Norsk',
  }
}

function App() {
  const [lang, setLang] = useState('ar')
  const [currentEvent, setCurrentEvent] = useState(-1)
  const t = translations[lang]
  const isArabic = lang === 'ar'

  useEffect(() => {
    setCurrentEvent(getCurrentEventIndex())
    const eventInterval = setInterval(() => {
      setCurrentEvent(getCurrentEventIndex())
    }, 60000)
    
    return () => clearInterval(eventInterval)
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
        <div className="header-ornament">✦ ✦ ✦</div>
        <p className="page-title">{t.program}</p>
      </header>

      {/* Program */}
      <section className="section-card">
        <div className="program-timeline">
          <div className={`timeline-item ${currentEvent === 0 ? 'active' : ''} ${currentEvent > 0 ? 'completed' : ''}`}>
            <div className="timeline-content">
              <span className="timeline-time">17:00 – 18:30</span>
              <span className="timeline-event">{t.reception}{currentEvent === 0 && <span className="now-badge">{lang === 'ar' ? 'الآن' : 'Nå'}</span>}</span>
            </div>
          </div>

          <div className={`timeline-item ${currentEvent === 1 ? 'active' : ''} ${currentEvent > 1 ? 'completed' : ''}`}>
            <div className="timeline-content">
              <span className="timeline-time">18:30 – 19:45</span>
              <span className="timeline-event">{t.celebrate}{currentEvent === 1 && <span className="now-badge">{lang === 'ar' ? 'الآن' : 'Nå'}</span>}</span>
            </div>
          </div>

          <div className={`timeline-item ${currentEvent === 2 ? 'active' : ''} ${currentEvent > 2 ? 'completed' : ''}`}>
            <div className="timeline-content">
              <span className="timeline-time">20:00</span>
              <span className="timeline-event">{t.dinner}{currentEvent === 2 && <span className="now-badge">{lang === 'ar' ? 'الآن' : 'Nå'}</span>}</span>
            </div>
          </div>

          <div className={`timeline-item ${currentEvent === 3 ? 'active' : ''} ${currentEvent > 3 ? 'completed' : ''}`}>
            <div className="timeline-content">
              <span className="timeline-time">20:45 – 21:15</span>
              <span className="timeline-event">{t.dancing}{currentEvent === 3 && <span className="now-badge">{lang === 'ar' ? 'الآن' : 'Nå'}</span>}</span>
            </div>
          </div>

          <div className={`timeline-item ${currentEvent === 4 ? 'active' : ''} ${currentEvent > 4 ? 'completed' : ''}`}>
            <div className="timeline-content">
              <span className="timeline-time">21:15 – 21:30</span>
              <span className="timeline-event">{t.slowDance}{currentEvent === 4 && <span className="now-badge">{lang === 'ar' ? 'الآن' : 'Nå'}</span>}</span>
            </div>
          </div>

          <div className={`timeline-item ${currentEvent === 5 ? 'active' : ''} ${currentEvent > 5 ? 'completed' : ''}`}>
            <div className="timeline-content">
              <span className="timeline-time">~21:30</span>
              <span className="timeline-event">{t.cakeCutting}{currentEvent === 5 && <span className="now-badge">{lang === 'ar' ? 'الآن' : 'Nå'}</span>}</span>
            </div>
          </div>

          <div className={`timeline-item ${currentEvent === 6 ? 'active' : ''}`}>
            <div className="timeline-content">
              <span className="timeline-time">22:00</span>
              <span className="timeline-event">{t.continuation}{currentEvent === 6 && <span className="now-badge">{lang === 'ar' ? 'الآن' : 'Nå'}</span>}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Photo sharing */}
      <section className="section-card photo-card">
        <h3 className="photo-title">{t.photoTitle}</h3>
        <a href={PHOTO_ALBUM_URL} target="_blank" rel="noopener noreferrer" className="photo-btn">
          📷 {t.photoBtn}
        </a>
        <div className="hashtag-tag">{t.hashtag}</div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-ornament">✦</div>
        <p className="footer-names">{t.couple}</p>
      </footer>
    </div>
  )
}

export default App
