import { useState, useEffect } from 'react'
import './App.css'

// Wedding date: March 28, 2026 at 17:00
const WEDDING_DATE = '2026-03-28'

// DEMO MODE: Set to true to test active indicator
const DEMO_MODE = false

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
    getDirections: 'Veibeskrivelse',
    addToCalendar: 'Legg til i kalender',
    photoTitle: 'Del bilder & video',
    photoDesc: 'Velg bilder/videoer og del til albumet',
    photoSelect: 'Velg filer',
    photoShare: 'Del til album',
    photoView: 'Se album',
    photoTip: 'Velg filer → Trykk "Del til album" → Velg Google Photos',
    photoSelected: 'valgt',
    photoNone: 'Ingen filer valgt',
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
    getDirections: 'الاتجاهات',
    addToCalendar: 'أضف للتقويم',
    photoTitle: 'شاركوا الصور والفيديو',
    photoDesc: 'اختاروا الصور/الفيديو وشاركوها في الألبوم',
    photoSelect: 'اختيار ملفات',
    photoShare: 'مشاركة للألبوم',
    photoView: 'الألبوم',
    photoTip: 'اختاروا الملفات ← اضغطوا "مشاركة" ← اختاروا Google Photos',
    photoSelected: 'ملفات',
    photoNone: 'لم يتم اختيار ملفات',
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
  const [selectedFiles, setSelectedFiles] = useState([])
  const t = translations[lang]
  const isArabic = lang === 'ar'

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files)
    setSelectedFiles(files)
  }

  const handleShare = async () => {
    if (selectedFiles.length === 0) return
    
    // Check if Web Share API with files is supported
    if (navigator.canShare && navigator.canShare({ files: selectedFiles })) {
      try {
        await navigator.share({
          files: selectedFiles,
          title: 'Mahmoud & Ranim Wedding',
          text: t.hashtag,
        })
        setSelectedFiles([])
      } catch (err) {
        if (err.name !== 'AbortError') {
          // Fallback to opening album
          window.open(PHOTO_ALBUM_URL, '_blank')
        }
      }
    } else {
      // Fallback for browsers that don't support file sharing
      window.open(PHOTO_ALBUM_URL, '_blank')
    }
  }

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
        <p className="couple-names">{t.couple}</p>
        <h1 className="page-title">{t.program}</h1>
        <p className="date-line">{t.date}</p>
      </header>

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

      {/* Photo sharing */}
      <section className="photo-section">
        <div className="photo-share-box">
          <div className="photo-icon">📷</div>
          <h3 className="photo-title">{t.photoTitle}</h3>
          <p className="photo-desc">{t.photoDesc}</p>
          
          {/* File selection */}
          <div className="file-upload-area">
            <input 
              type="file" 
              id="photo-input"
              accept="image/*,video/*"
              multiple
              onChange={handleFileSelect}
              className="file-input"
            />
            <label htmlFor="photo-input" className="file-label">
              📁 {t.photoSelect}
            </label>
            
            {selectedFiles.length > 0 ? (
              <div className="file-count">
                ✓ {selectedFiles.length} {t.photoSelected}
              </div>
            ) : (
              <div className="file-count empty">{t.photoNone}</div>
            )}
          </div>

          <div className="photo-buttons">
            <button 
              onClick={handleShare}
              className={`photo-btn upload ${selectedFiles.length === 0 ? 'disabled' : ''}`}
              disabled={selectedFiles.length === 0}
            >
              📤 {t.photoShare}
            </button>
            <a href={PHOTO_ALBUM_URL} target="_blank" rel="noopener noreferrer" className="photo-btn view">
              👀 {t.photoView}
            </a>
          </div>
          
          <p className="photo-tip">{t.photoTip}</p>
          <div className="hashtag-tag">{t.hashtag}</div>
        </div>
      </section>

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
