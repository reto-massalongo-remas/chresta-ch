import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import FadeIn from '../components/ui/FadeIn'
import CourseRow, { Course } from '../components/ui/CourseRow'

const COURSES: { section: string; courses: Course[] }[] = [
  {
    section: '🏍 Schnupperkurse',
    courses: [
      { name: 'Schnupperkurs', date: 'Sa 18.01.2026', time: '09:00 – 12:00', price: 'CHF 80.00', seats: 6 },
      { name: 'Schnupperkurs', date: 'Sa 01.02.2026', time: '13:00 – 16:00', price: 'CHF 80.00', seats: 4 },
    ],
  },
  {
    section: '📋 Obligatorische Grundkurse (PGS)',
    courses: [
      { name: 'PGS 1 – Grundkurs',    date: 'Sa 25.01.2026', time: '08:00 – 17:00', price: 'CHF 290.00', seats: 3 },
      { name: 'PGS 2 – Aufbaukurs',   date: 'Sa 08.02.2026', time: '08:00 – 17:00', price: 'CHF 290.00', seats: null },
      { name: 'PGS 3 – Abschlusskurs',date: 'Sa 22.02.2026', time: '08:00 – 17:00', price: 'CHF 290.00', seats: 7 },
    ],
  },
  {
    section: '🎯 Manövertraining',
    courses: [
      { name: 'Manövertraining Halbtag', date: 'So 01.03.2026', time: '08:00 – 12:00', price: 'CHF 180.00', seats: 5 },
    ],
  },
  {
    section: '✅ Prüfungsvorbereitung',
    courses: [
      { name: 'P1 – Theorieprüfung Vorbereitung', date: 'Fr 14.02.2026', time: '18:00 – 20:00', price: 'CHF 60.00',  seats: 8 },
      { name: 'P2 – Praxisprüfung Vorbereitung',  date: 'Sa 28.02.2026', time: '07:30 – 09:30', price: 'CHF 120.00', seats: 4 },
    ],
  },
]

export default function KursTemplate() {
  return (
    <>
      {/* Page Hero */}
      <div style={{ background: 'linear-gradient(135deg, #1a2a35, #2d4a5a)', padding: '48px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
            <motion.span
              style={{ fontSize: 64 }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 220 }}
            >🏍️</motion.span>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
            >
              <h1 style={{ fontSize: 34, fontWeight: 600, color: '#fff', marginBottom: 6 }}>Motorrad Ausbildung</h1>
              <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 15, maxWidth: 500, lineHeight: 1.65 }}>
                Von der Schnupperstunde bis zur Prüfung – wir begleiten dich durch alle Stufen der Motorradausbildung. Kategorien A1, A beschränkt und A.
              </p>
            </motion.div>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Link to="/fahrstunden-buchen" className="btn btn-teal">Fahrstunde buchen →</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="container">
        <div className="breadcrumb">
          <Link to="/">chresta.ch</Link>
          <span className="sep">›</span>
          <Link to="/fahrschule">Fahrschule</Link>
          <span className="sep">›</span>
          <strong>Motorrad</strong>
        </div>
      </div>

      {/* Content */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 40, alignItems: 'start' }}>

            {/* Main */}
            <div>
              {COURSES.map((block, bi) => (
                <FadeIn key={block.section} delay={bi * 0.08}>
                  <div className="card mb-24">
                    <div className="card-header">{block.section}</div>
                    <div className="card-body" style={{ padding: '8px 0 0' }}>
                      {block.courses.map((c, i) => (
                        <CourseRow key={i} course={c} index={i} />
                      ))}
                    </div>
                  </div>
                </FadeIn>
              ))}

              <FadeIn>
                <div style={{ background: 'var(--teal-pale)', borderRadius: 'var(--radius)', padding: '12px 16px', fontSize: 13, color: 'var(--teal-dark)' }}>
                  💡 Tipp: Kein eigenes Motorrad?{' '}
                  <Link to="/mieten/motorrad" style={{ fontWeight: 600, color: 'var(--teal)' }}>Motorrad mieten →</Link>
                </div>
              </FadeIn>

              {/* Cross-sell */}
              <div className="cross-sell">
                <div className="cross-sell-title">↔ Auch interessant</div>
                <div className="cross-pills">
                  {['Nothelferkurs', 'Verkehrskunde', 'Kurventraining', 'Motorrad Mieten'].map(l => (
                    <Link key={l} to="/fahrschule" className="cross-pill">{l}</Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <FadeIn>
                <div className="card" style={{ background: '#fff8e1', border: '1px solid #ffe082' }}>
                  <div className="card-body text-center">
                    <div style={{ fontSize: 36, marginBottom: 12 }}>📅</div>
                    <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>Fahrstunde buchen</h3>
                    <p style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 16 }}>Individuelle Fahrstunden für Kat. A1, A beschränkt, A</p>
                    <Link to="/fahrstunden-buchen" className="btn btn-teal btn-full">Termin wählen →</Link>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.1}>
                <div className="card">
                  <div className="card-header">Führerscheinkategorien</div>
                  <div className="card-body">
                    {[['Kat. A1', 'ab 16 J.'], ['Kat. A beschränkt', 'ab 18 J.'], ['Kat. A', 'ab 24 J.']].map(([k, v]) => (
                      <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '8px 0', borderBottom: '1px solid var(--border-lt)' }}>
                        <span>{k}</span>
                        <span className="badge badge-teal">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.15}>
                <div className="card">
                  <div className="card-header">Fragen?</div>
                  <div className="card-body">
                    <p style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 14 }}>Unser Team berät dich gerne persönlich.</p>
                    <a href="tel:0447615958" className="btn btn-ghost-teal btn-full" style={{ marginBottom: 8 }}>📞 044 761 59 58</a>
                    <Link to="/kontakt" className="btn btn-ghost-teal btn-full">✉️ Nachricht senden</Link>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
