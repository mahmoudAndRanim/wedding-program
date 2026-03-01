import { useState, useEffect } from 'react'
import './App.css'

// Wedding date: March 28, 2026
const WEDDING_DATE = '2026-03-28'

// DEMO MODE: Set to true to test active indicator (remove before wedding!)
const DEMO_MODE = false

const programTimes = [
  { time: '17:00', endTime: '18:00' },
  { time: '18:00', endTime: '19:00' },
  { time: '19:00', endTime: '21:00' },
  { time: '21:00', endTime: '22:00' },
  { time: '22:00', endTime: '23:00' },
  { time: '23:00', endTime: '23:59' },
]

function getCurrentEventIndex() {
  // Demo mode: always show second item (reception) as active
  if (DEMO_MODE) return 1
  
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
    program: 'Bryllupsprogram',
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
    parking: 'Parkering',
    parkingValue: 'Gratis parkering ved lokalet',
    hashtag: 'Del bilder',
    hashtagValue: '#MahmoudOgRanim',
    ceremonyNote: 'Vi ber om mobilfri seremoni',
    gift: 'Ønskeliste',
    giftValue: 'Bidrag til bryllupsreise',
    contact: 'Kontakt',
    contactValue: 'Mahmoud: 123 45 678',
    photoTitle: 'Del bildene dine',
    photoDesc: 'Last opp bilder fra festen så alle kan se dem!',
    photoBtn: 'Last opp bilder',
    photoView: 'Se bildene',
    langBtn: 'عربي',
  },
  ar: {
    program: 'برنامج الزفاف',
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
    parking: 'موقف السيارات',
    parkingValue: 'موقف مجاني بجانب القاعة',
    hashtag: 'شاركوا الصور',
    hashtagValue: '#محمود_ورنيم',
    ceremonyNote: 'نرجو عدم استخدام الهاتف أثناء الحفل',
    gift: 'الهدايا',
    giftValue: 'مساهمة في شهر العسل',
    contact: 'للتواصل',
    contactValue: 'محمود: ٦٧٨ ٤٥ ١٢٣',
    photoTitle: 'شاركوا صوركم',
    photoDesc: 'ارفعوا صور الحفلة ليراها الجميع!',
    photoBtn: 'رفع الصور',
    photoView: 'عرض الصور',
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
        <div className="info-item">
          <span className="info-label">{t.parking}</span>
          <span className="info-value">{t.parkingValue}</span>
        </div>
      </section>

      {/* Additional info */}
      <section className="extra-section">
        <p className="ceremony-note">{t.ceremonyNote}</p>
        
        {/* Photo sharing */}
        <div className="photo-share-box">
          <div className="photo-icon">📷</div>
          <h3 className="photo-title">{t.photoTitle}</h3>
          <p className="photo-desc">{t.photoDesc}</p>
          <div className="photo-buttons">
            <a 
              href="https://photos.app.goo.gl/NdQ25MoYWbPVSLuu9" 
              target="_blank" 
              rel="noopener noreferrer"
              className="photo-btn upload"
            >
              {t.photoBtn}
            </a>
            <a 
              href="https://photos.app.goo.gl/NdQ25MoYWbPVSLuu9" 
              target="_blank" 
              rel="noopener noreferrer"
              className="photo-btn view"
            >
              {t.photoView}
            </a>
          </div>
          <div className="hashtag-tag">{t.hashtagValue}</div>
        </div>

        <div className="info-item">
          <span className="info-label">{t.gift}</span>
          <span className="info-value">{t.giftValue}</span>
        </div>

        <div className="info-item contact-item">
          <span className="info-label">{t.contact}</span>
          <span className="info-value">{t.contactValue}</span>
        </div>
      </section>
    </div>
  )
}

export default App
