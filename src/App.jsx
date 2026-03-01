import { useState, useEffect } from 'react'
import './App.css'

// Wedding date: March 28, 2026 at 17:00
const WEDDING_DATE = '2026-03-28'
const WEDDING_DATETIME = new Date('2026-03-28T17:00:00')

// DEMO MODE: Set to true to test active indicator
const DEMO_MODE = false

const VENUE_ADDRESS = 'Trondheimsveien 48F, 2007 Kjeller'
const GOOGLE_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(VENUE_ADDRESS)}`
const PHOTO_ALBUM_URL = 'https://photos.app.goo.gl/NdQ25MoYWbPVSLuu9'

const programTimes = [
  { time: '17:00', endTime: '18:00' },
  { time: '18:00', endTime: '19:00' },
  { time: '19:00', endTime: '21:00' },
  { time: '21:00', endTime: '22:00' },
  { time: '22:00', endTime: '23:00' },
  { time: '23:00', endTime: '23:59' },
]

function getCurrentEventIndex() {
  if (DEMO_MODE) return 1
  
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

function getCountdown() {
  const now = new Date()
  const diff = WEDDING_DATETIME - now
  
  if (diff <= 0) return null
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  
  return { days, hours, minutes }
}

function generateCalendarFile() {
  const event = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Wedding//Mahmoud & Ranim//EN
BEGIN:VEVENT
DTSTART:20260328T170000
DTEND:20260329T020000
SUMMARY:Bryllup - Mahmoud & Ranim
LOCATION:Trondheimsveien 48F, 2007 Kjeller
DESCRIPTION:Vi gleder oss til å feire med dere!
END:VEVENT
END:VCALENDAR`
  
  const blob = new Blob([event], { type: 'text/calendar' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'mahmoud-ranim-bryllup.ics'
  a.click()
  URL.revokeObjectURL(url)
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
    ceremonyNote: 'Vi ber om mobilfri seremoni 🙏',
    getDirections: 'Veibeskrivelse',
    addToCalendar: 'Legg til i kalender',
    photoTitle: 'Del bilder & video',
    photoDesc: 'Last opp bilder og videoer fra festen!',
    photoBtn: 'Last opp',
    photoView: 'Se album',
    photoTip: 'Tips: Åpne Google Photos-appen for beste opplevelse',
    gift: 'Ønskeliste',
    giftValue: 'Bidrag til bryllupsreise',
    contact: 'Kontakt',
    contactValue: 'Mahmoud: 123 45 678',
    hashtag: '#MahmoudOgRanim',
    weddingDay: 'I dag er dagen! 💍',
    langBtn: 'عربي',
  },
  ar: {
    couple: 'محمود و رنيم',
    program: 'برنامج الزفاف',
    date: '٢٨ مارس ٢٠٢٦',
    countdown: 'العد التنازلي',
    days: 'يوم',
    hours: 'ساعة',
    minutes: 'دقيقة',
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
    ceremonyNote: 'نرجو عدم استخدام الهاتف أثناء الحفل 🙏',
    getDirections: 'الاتجاهات',
    addToCalendar: 'أضف للتقويم',
    photoTitle: 'شاركوا الصور والفيديو',
    photoDesc: 'ارفعوا صور وفيديوهات الحفلة!',
    photoBtn: 'رفع',
    photoView: 'الألبوم',
    photoTip: 'نصيحة: افتحوا تطبيق Google Photos لأفضل تجربة',
    gift: 'الهدايا',
    giftValue: 'مساهمة في شهر العسل',
    contact: 'للتواصل',
    contactValue: 'محمود: ٦٧٨ ٤٥ ١٢٣',
    hashtag: '#محمود_ورنيم',
    weddingDay: 'اليوم هو اليوم! 💍',
    langBtn: 'Norsk',
  }
}

function App() {
  const [lang, setLang] = useState('ar')
  const [currentEvent, setCurrentEvent] = useState(-1)
  const [countdown, setCountdown] = useState(getCountdown())
  const t = translations[lang]
  const isArabic = lang === 'ar'
  const isWeddingDay = new Date().toISOString().split('T')[0] === WEDDING_DATE

  useEffect(() => {
    setCurrentEvent(getCurrentEventIndex())
    const eventInterval = setInterval(() => {
      setCurrentEvent(getCurrentEventIndex())
    }, 60000)
    
    const countdownInterval = setInterval(() => {
      setCountdown(getCountdown())
    }, 60000)
    
    return () => {
      clearInterval(eventInterval)
      clearInterval(countdownInterval)
    }
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
        <p className="couple-names">{t.couple}</p>
        <h1 className="page-title">{t.program}</h1>
        <p className="date-line">{t.date}</p>
      </header>

      {/* Countdown or Wedding Day Message */}
      {isWeddingDay ? (
        <div className="wedding-day-banner">
          {t.weddingDay}
        </div>
      ) : countdown && (
        <section className="countdown-section">
          <div className="countdown-boxes">
            <div className="countdown-box">
              <span className="countdown-number">{countdown.days}</span>
              <span className="countdown-label">{t.days}</span>
            </div>
            <div className="countdown-box">
              <span className="countdown-number">{countdown.hours}</span>
              <span className="countdown-label">{t.hours}</span>
            </div>
            <div className="countdown-box">
              <span className="countdown-number">{countdown.minutes}</span>
              <span className="countdown-label">{t.minutes}</span>
            </div>
          </div>
        </section>
      )}

      {/* Program */}
      <section className="program-section">
        <div className="program-timeline">
          <div className={`program-item ${currentEvent === 0 ? 'active' : ''} ${currentEvent > 0 ? 'completed' : ''}`}>
            <div className="time">17:00</div>
            <div className="event"><h3>{t.ceremony}</h3></div>
            {currentEvent === 0 && <div className="now-indicator">{lang === 'ar' ? 'الآن' : 'Nå'}</div>}
          </div>

          <div className={`program-item ${currentEvent === 1 ? 'active' : ''} ${currentEvent > 1 ? 'completed' : ''}`}>
            <div className="time">18:00</div>
            <div className="event"><h3>{t.reception}</h3></div>
            {currentEvent === 1 && <div className="now-indicator">{lang === 'ar' ? 'الآن' : 'Nå'}</div>}
          </div>

          <div className={`program-item ${currentEvent === 2 ? 'active' : ''} ${currentEvent > 2 ? 'completed' : ''}`}>
            <div className="time">19:00</div>
            <div className="event"><h3>{t.dinner}</h3></div>
            {currentEvent === 2 && <div className="now-indicator">{lang === 'ar' ? 'الآن' : 'Nå'}</div>}
          </div>

          <div className={`program-item ${currentEvent === 3 ? 'active' : ''} ${currentEvent > 3 ? 'completed' : ''}`}>
            <div className="time">21:00</div>
            <div className="event"><h3>{t.speeches}</h3></div>
            {currentEvent === 3 && <div className="now-indicator">{lang === 'ar' ? 'الآن' : 'Nå'}</div>}
          </div>

          <div className={`program-item ${currentEvent === 4 ? 'active' : ''} ${currentEvent > 4 ? 'completed' : ''}`}>
            <div className="time">22:00</div>
            <div className="event"><h3>{t.cake}</h3></div>
            {currentEvent === 4 && <div className="now-indicator">{lang === 'ar' ? 'الآن' : 'Nå'}</div>}
          </div>

          <div className={`program-item ${currentEvent === 5 ? 'active' : ''}`}>
            <div className="time">23:00</div>
            <div className="event"><h3>{t.party}</h3></div>
            {currentEvent === 5 && <div className="now-indicator">{lang === 'ar' ? 'الآن' : 'Nå'}</div>}
          </div>
        </div>
      </section>

      {/* Venue & Info */}
      <section className="info-section">
        <div className="venue-card">
          <div className="venue-icon">📍</div>
          <div className="venue-details">
            <span className="venue-label">{t.venue}</span>
            <span className="venue-address">{VENUE_ADDRESS}</span>
          </div>
          <a 
            href={GOOGLE_MAPS_URL} 
            target="_blank" 
            rel="noopener noreferrer"
            className="map-btn"
          >
            {t.getDirections}
          </a>
        </div>

        <div className="info-grid">
          <div className="info-card">
            <span className="info-icon">👔</span>
            <span className="info-label">{t.dresscode}</span>
            <span className="info-value">{t.dresscodeValue}</span>
          </div>
          <div className="info-card">
            <span className="info-icon">🚗</span>
            <span className="info-label">{t.parking}</span>
            <span className="info-value">{t.parkingValue}</span>
          </div>
        </div>

        <button className="calendar-btn" onClick={generateCalendarFile}>
          📅 {t.addToCalendar}
        </button>
      </section>

      {/* Photo sharing */}
      <section className="photo-section">
        <div className="photo-share-box">
          <div className="photo-icon">📷</div>
          <h3 className="photo-title">{t.photoTitle}</h3>
          <p className="photo-desc">{t.photoDesc}</p>
          <div className="photo-buttons">
            <a href={PHOTO_ALBUM_URL} target="_blank" rel="noopener noreferrer" className="photo-btn upload">
              {t.photoBtn}
            </a>
            <a href={PHOTO_ALBUM_URL} target="_blank" rel="noopener noreferrer" className="photo-btn view">
              {t.photoView}
            </a>
          </div>
          <p className="photo-tip">{t.photoTip}</p>
          <div className="hashtag-tag">{t.hashtag}</div>
        </div>
      </section>

      {/* Ceremony note */}
      <p className="ceremony-note">{t.ceremonyNote}</p>

      {/* Gift & Contact */}
      <section className="footer-section">
        <div className="info-item">
          <span className="info-label">🎁 {t.gift}</span>
          <span className="info-value">{t.giftValue}</span>
        </div>
        <div className="info-item">
          <span className="info-label">📞 {t.contact}</span>
          <span className="info-value">{t.contactValue}</span>
        </div>
      </section>
    </div>
  )
}

export default App
