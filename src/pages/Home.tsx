import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import FadeIn from '../components/ui/FadeIn'
import CategoryCard from '../components/ui/CategoryCard'
import CourseRow, { Course } from '../components/ui/CourseRow'
import styles from './Home.module.css'

const HERO_IMG = 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1920&auto=format&fit=crop&q=85'

const CATEGORY_CARDS = [
  { title: 'Fahrschule',    href: '/fahrschule', bgUrl: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=700&auto=format&fit=crop&q=80' },
  { title: 'Chauffeur',     href: '/chauffeur',  bgUrl: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=700&auto=format&fit=crop&q=80' },
  { title: 'Fahrlehrer',    href: '/fahrlehrer', bgUrl: 'https://images.unsplash.com/photo-1562516155-e0c1ee44059b?w=700&auto=format&fit=crop&q=80' },
  { title: 'Mieten / Reisen', href: '/mieten',  bgUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&auto=format&fit=crop&q=80' },
]

const COURSES_FAHRSCHULE: Course[] = [
  { name: 'Nothelfer-Kurs Teil 1',    date: 'Sa 06.12.2025', time: '16:30 – 19:30', price: 'CHF 25.00',   seats: 5 },
  { name: 'Nothelfer-Kurs Teil 1',    date: 'Fr 12.12.2025', time: '09:00 – 12:00', price: 'CHF 25.00',   seats: 5 },
  { name: 'Nothelfer-Kurs Teil 2',    date: 'Sa 13.12.2025', time: '09:00 – 17:00', price: 'CHF 115.00',  seats: 6 },
  { name: 'BLS-AED-SRC Komplettkurs', date: 'Di 16.12.2025', time: '08:00 – 12:30', price: 'CHF 165.00',  seats: 6 },
  { name: 'Erste-Hilfe Refresher',    date: 'Do 18.12.2025', time: '08:00 – 12:00', price: 'CHF 155.00',  seats: null },
  { name: 'PGS 1 Motorrad Grundkurs', date: 'Sa 25.01.2026', time: '08:00 – 17:00', price: 'CHF 290.00',  seats: 2 },
]

const COURSES_CZV: Course[] = [
  { name: 'CZV Module 1 – Gefahrenlehre',    date: 'Mo 09.12.2025',      time: '08:00 – 17:00', price: 'CHF 380.00',    seats: 8 },
  { name: 'CZV Module 2 – Ladungssicherung', date: 'Di 10.12.2025',      time: '08:00 – 17:00', price: 'CHF 380.00',    seats: 3 },
  { name: 'CZV Vollkurs (5 Tage)',            date: 'Mo–Fr 16.–20.02.26', time: '08:00 – 17:00', price: 'CHF 1\'890.00', seats: 5 },
]

const COURSES_MOTO: Course[] = [
  { name: 'Schnupperkurs Motorrad',         date: 'Sa 18.01.2026', time: '09:00 – 12:00', price: 'CHF 80.00',  seats: 6 },
  { name: 'PGS 1 Motorrad Grundkurs',       date: 'Sa 25.01.2026', time: '08:00 – 17:00', price: 'CHF 290.00', seats: 2 },
  { name: 'Kurventraining Fortgeschrittene', date: 'So 22.03.2026', time: '08:00 – 17:00', price: 'CHF 340.00', seats: null },
]

const TABS = [
  { id: 'fahrschule', label: '🏫 Fahrschule', courses: COURSES_FAHRSCHULE, cta: { label: 'Alle Kurse ansehen', href: '/fahrschule' } },
  { id: 'czv',        label: '🚛 CZV',        courses: COURSES_CZV,         cta: { label: 'Alle CZV-Kurse', href: '/chauffeur' } },
  { id: 'motorrad',   label: '🏍 Motorrad',   courses: COURSES_MOTO,        cta: { label: 'Alle Motorrad-Kurse', href: '/fahrschule/motorrad' } },
]

const NEWS = [
  { date: '12. April 2026', title: 'Neue Motorrad-Kursdaten für Sommer 2026', excerpt: 'Ab sofort sind alle Motorrad-Grundkurse und Schnupperkurse für die Sommersaison buchbar.', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop&q=80' },
  { date: '08. April 2026', title: 'Zwei neue Fahrlehrer verstärken unser Team', excerpt: 'Mit Marco und Laura haben wir zwei hochqualifizierte Fahrlehrer in unser Team aufgenommen.', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80' },
  { date: '01. April 2026', title: 'Online-Buchung jetzt für alle Kurse verfügbar', excerpt: 'Alle Kurse – von Nothilfe bis CZV – können ab sofort direkt online gebucht und bezahlt werden.', img: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&auto=format&fit=crop&q=80' },
]

const GALLERY = [
  'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=700&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=700&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=700&auto=format&fit=crop&q=80',
]

const USP = [
  { icon: '📅', title: 'Online buchen', desc: 'Kurse & Fahrstunden rund um die Uhr reservieren' },
  { icon: '🏆', title: 'Seit 1989',     desc: 'Jahrzehntelange Erfahrung im Knonaueramt' },
  { icon: '🎓', title: 'Alle Kategorien', desc: 'Kat. B, A, CZV, Nothilfe und vieles mehr' },
  { icon: '📍', title: 'Zentral gelegen', desc: 'Industriestrasse 17, Affoltern am Albis' },
]

export default function Home() {
  const [activeTab, setActiveTab] = useState('fahrschule')
  const tab = TABS.find(t => t.id === activeTab)!

  return (
    <>
      {/* ── HERO ── */}
      <section className={styles.hero}>
        <motion.img
          src={HERO_IMG}
          className={styles.heroBg}
          alt=""
          loading="eager"
          fetchPriority="high"
          initial={{ scale: 1.07 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8, ease: 'linear' }}
        />
        <div className={styles.heroOverlay} />

        <div className={`container ${styles.heroContent}`}>
          <motion.p
            className={styles.heroEyebrow}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
          >
            Fahrschule im Knonaueramt · seit 1989
          </motion.p>
          <motion.h1
            className={styles.heroH1}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.65 }}
          >
            Die Fahrschule<br />im Knonaueramt
          </motion.h1>
          <motion.p
            className={styles.heroSub}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
          >
            Mit über 12 engagierten Mitarbeiterinnen und Mitarbeitern zählt die Chresta GmbH zu den renommiertesten Fahrschulen im Knonaueramt.
          </motion.p>
          <motion.div
            className={styles.heroBtns}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.55 }}
          >
            <Link to="/fahrschule" className="btn btn-teal btn-lg">Kurse entdecken →</Link>
            <Link to="/fahrstunden-buchen" className="btn btn-outline btn-lg">Fahrstunden buchen</Link>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <div className={styles.heroScroll}>
          <span>Scroll</span>
          <div className={styles.heroScrollLine} />
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <div className={styles.trustBar}>
        <div className={styles.trustInner}>
          <span className={styles.trustLabel}>Zertifiziert</span>
          {['asa CZV', 'SFV ASMC', 'EDUQUA'].map(c => (
            <span key={c} className={styles.trustChip}>{c}</span>
          ))}
          <div className={styles.trustDivider} />
          <span className={styles.trustLabel}>Bereiche</span>
          {['Kat. B', '🏍 Motorrad', 'Kat. C/D', 'CZV', 'CMC · CTC'].map(c => (
            <span key={c} className={styles.trustChip}>{c}</span>
          ))}
          <div className={styles.trustDivider} />
          <a href="tel:0447615958" className={styles.trustPhone}>📞 044 761 59 58</a>
        </div>
      </div>

      {/* ── USP STRIP ── */}
      <FadeIn>
        <div className={styles.uspStrip}>
          {USP.map(u => (
            <div key={u.title} className={styles.uspItem}>
              <div className={styles.uspIconWrap}>{u.icon}</div>
              <div>
                <div className={styles.uspTitle}>{u.title}</div>
                <div className={styles.uspDesc}>{u.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </FadeIn>

      {/* ── BOOKING TEASER ── */}
      <section className="section section-bg">
        <div className="container">
          <FadeIn>
            <div className={styles.bookingTeaser}>
              <div className={styles.bookingText}>
                <p className="section-eyebrow">Online buchen</p>
                <h2 className="section-title">Buche jetzt Deine<br />Fahrstunde bequem online</h2>
                <p className={styles.bookingSub}>Direkt im Kalender – ohne Telefonat, jederzeit verfügbar.</p>
                <ul className={styles.bookingList}>
                  {[
                    ['Autofahrschule / Fahrstunden', '(Kategorie B & B Automat)'],
                    ['Motorrad-Ausbildung', '(A1, A beschränkt, A)'],
                    ['Anhänger-Kurse', '(BE, CE)'],
                    ['Lastwagen- und Car-Ausbildung', '(C, CE, D)'],
                  ].map(([label, sub]) => (
                    <li key={label}>
                      <span className={styles.check}>✓</span>
                      <span>{label} <span className={styles.bookingSub2}>{sub}</span></span>
                    </li>
                  ))}
                </ul>
                <div className={styles.bookingBtns}>
                  <Link to="/fahrstunden-buchen" className="btn btn-primary">Fahrstunde online buchen →</Link>
                  <Link to="/fahrschule" className="btn btn-ghost-teal">Alle Kurse ansehen</Link>
                </div>
              </div>
              <div
                className={styles.bookingImg}
                style={{ backgroundImage: `url(https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=900&auto=format&fit=crop&q=85)` }}
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── CATEGORY CARDS ── */}
      <section className="section">
        <div className="container">
          <FadeIn>
            <div className="text-center mb-24">
              <p className="section-eyebrow">Unsere Bereiche</p>
              <h2 className="section-title">Was interessiert dich?</h2>
            </div>
          </FadeIn>
          <div className={styles.catGrid}>
            {CATEGORY_CARDS.map((card, i) => (
              <CategoryCard key={card.title} {...card} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── SEIT 1989 ── */}
      <FadeIn>
        <div className={styles.seitBanner}>
          <p className={styles.seitEyebrow}>Deine Fahrschule im Knonaueramt</p>
          <p className={styles.seitScript}>seit 1989</p>
        </div>
      </FadeIn>

      {/* ── COURSES ── */}
      <section className="section">
        <div className="container">
          <FadeIn>
            <div className={styles.coursesHeader}>
              <div>
                <p className="section-eyebrow">Kurskalender</p>
                <h2 className="section-title" style={{ marginBottom: 0 }}>Kurse online buchen</h2>
              </div>
              <Link to="/fahrschule" className="btn btn-ghost">Alle Kurse</Link>
            </div>
          </FadeIn>

          <div className="tabs">
            {TABS.map(t => (
              <button
                key={t.id}
                className={`tab-btn ${activeTab === t.id ? 'active' : ''}`}
                onClick={() => setActiveTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>

          {tab.courses.map((course, i) => (
            <CourseRow key={i} course={course} index={i} />
          ))}

          <div className="text-center mt-32">
            <Link to={tab.cta.href} className="btn btn-primary">{tab.cta.label} →</Link>
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <FadeIn>
        <section className={styles.teamSection}>
          <div className={styles.teamText}>
            <p className="section-eyebrow" style={{ color: 'var(--teal-light)' }}>Unser Team</p>
            <h2 className={styles.teamTitle}>12 engagierte<br />Fachleute für dich</h2>
            <p className={styles.teamDesc}>Unsere erfahrenen Fahrlehrerinnen und Fahrlehrer begleiten dich persönlich – von der ersten Stunde bis zur Prüfung und darüber hinaus.</p>
            <div className={styles.teamBtns}>
              <Link to="/ueber-uns" className="btn btn-light">Unser Team kennenlernen →</Link>
              <Link to="/kontakt" className="btn btn-outline">Kontakt aufnehmen</Link>
            </div>
          </div>
          <div
            className={styles.teamImg}
            style={{ backgroundImage: `url(https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&auto=format&fit=crop&q=85)` }}
          />
        </section>
      </FadeIn>

      {/* ── GALLERY ── */}
      <div className={styles.gallery}>
        {GALLERY.map((url, i) => (
          <motion.div
            key={i}
            className={styles.galleryImg}
            style={{ backgroundImage: `url(${url})` }}
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>

      {/* ── NEWS ── */}
      <section className="section section-bg">
        <div className="container">
          <FadeIn>
            <div className={styles.coursesHeader}>
              <div>
                <p className="section-eyebrow">Aktuelles</p>
                <h2 className="section-title" style={{ marginBottom: 0 }}>News & Infos</h2>
              </div>
              <Link to="/news" className="btn btn-ghost">Alle News</Link>
            </div>
          </FadeIn>
          <div className={styles.newsGrid}>
            {NEWS.map((n, i) => (
              <FadeIn key={n.title} delay={i * 0.1}>
                <Link to="/news/artikel" className={styles.newsCard}>
                  <div className={styles.newsImg} style={{ backgroundImage: `url(${n.img})` }} />
                  <div className={styles.newsBody}>
                    <div className={styles.newsDate}>{n.date}</div>
                    <div className={styles.newsTitle}>{n.title}</div>
                    <div className={styles.newsExcerpt}>{n.excerpt}</div>
                    <span className={styles.newsLink}>Weiterlesen →</span>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <FadeIn>
        <section className={styles.ctaBanner}>
          <p className={styles.ctaEyebrow}>Bereit für den ersten Schritt?</p>
          <h2 className={styles.ctaTitle}>Starte jetzt deine Ausbildung</h2>
          <p className={styles.ctaSub}>Buche Deine erste Fahrstunde oder melde dich für einen Kurs an.</p>
          <div className={styles.ctaBtns}>
            <Link to="/fahrstunden-buchen" className="btn btn-primary btn-lg">Fahrstunden buchen →</Link>
            <Link to="/fahrschule" className="btn btn-outline btn-lg">Kursangebot ansehen</Link>
          </div>
        </section>
      </FadeIn>
    </>
  )
}
