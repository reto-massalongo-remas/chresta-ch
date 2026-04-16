import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import FadeIn from '../components/ui/FadeIn'

const CATEGORIES = [
  { id: 'b',    label: 'Kat. B – Auto',            icon: '🚗', price: 'CHF 98.00 / Std.' },
  { id: 'b-at', label: 'Kat. B Automat',            icon: '🚙', price: 'CHF 98.00 / Std.' },
  { id: 'a1',   label: 'Kat. A1 – Motorrad',        icon: '🏍', price: 'CHF 105.00 / Std.' },
  { id: 'a',    label: 'Kat. A – Motorrad',         icon: '🏍', price: 'CHF 105.00 / Std.' },
  { id: 'be',   label: 'Kat. BE – Anhänger',        icon: '🚐', price: 'CHF 115.00 / Std.' },
  { id: 'c',    label: 'Kat. C – Lastwagen',        icon: '🚛', price: 'CHF 145.00 / Std.' },
]

const TIMES = ['08:00', '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00']
const TEACHERS = [
  { id: 'marco', name: 'Marco Chresta', img: '👨‍🏫', cats: ['b','b-at','a','a1'] },
  { id: 'laura', name: 'Laura Meier',   img: '👩‍🏫', cats: ['b','b-at','be'] },
  { id: 'peter', name: 'Peter Keller',  img: '👨‍🏫', cats: ['c','be'] },
]

// Build simple calendar grid for current month
function buildCalendar() {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const days: (number|null)[] = Array(firstDay === 0 ? 6 : firstDay - 1).fill(null)
  for (let d = 1; d <= daysInMonth; d++) days.push(d)
  return { days, monthName: now.toLocaleString('de-CH', { month: 'long', year: 'numeric' }) }
}

export default function FahrstundenBuchen() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [cat, setCat] = useState<string | null>(null)
  const [day, setDay] = useState<number | null>(null)
  const [time, setTime] = useState<string | null>(null)
  const [teacher, setTeacher] = useState<string | null>(null)

  const { days, monthName } = buildCalendar()
  const now = new Date()

  const slideVariants = {
    enter: { opacity: 0, x: 40 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
  }

  return (
    <>
      <div style={{ background: 'linear-gradient(135deg, var(--teal-dark), var(--teal))', padding: '48px 0' }}>
        <div className="container">
          <FadeIn>
            <h1 style={{ fontSize: 36, fontWeight: 500, color: '#fff', marginBottom: 8 }}>Fahrstunde buchen</h1>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 15 }}>Wähle Kategorie, Datum und Uhrzeit – fertig.</p>
          </FadeIn>
        </div>
      </div>

      <section className="section">
        <div className="container" style={{ maxWidth: 860 }}>

          {/* Steps */}
          <div className="steps mb-32">
            {['Kategorie', 'Datum & Zeit', 'Bestätigung'].map((s, i) => (
              <>
                <div key={s} className={`step ${step > i + 1 ? 'done' : step === i + 1 ? 'active' : ''}`}>
                  <div className="step-num">{step > i + 1 ? '✓' : i + 1}</div>
                  <span className="step-label">{s}</span>
                </div>
                {i < 2 && <div className="step-line" />}
              </>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                <h2 style={{ fontSize: 22, marginBottom: 20 }}>Welche Kategorie?</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
                  {CATEGORIES.map(c => (
                    <button
                      key={c.id}
                      onClick={() => { setCat(c.id); setStep(2); }}
                      style={{
                        padding: '20px 16px',
                        border: `2px solid ${cat === c.id ? 'var(--teal)' : 'var(--border-lt)'}`,
                        borderRadius: 'var(--radius-lg)',
                        background: cat === c.id ? 'var(--teal-pale)' : 'var(--white)',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all .15s',
                      }}
                    >
                      <div style={{ fontSize: 32, marginBottom: 8 }}>{c.icon}</div>
                      <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{c.label}</div>
                      <div style={{ fontSize: 12, color: 'var(--muted)' }}>{c.price}</div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 260px', gap: 32 }}>
                  {/* Calendar */}
                  <div>
                    <h2 style={{ fontSize: 20, marginBottom: 16 }}>📅 {monthName}</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 4, marginBottom: 8 }}>
                      {['Mo','Di','Mi','Do','Fr','Sa','So'].map(d => (
                        <div key={d} style={{ textAlign: 'center', fontSize: 11, fontFamily: 'var(--font-ui)', color: 'var(--hint)', fontWeight: 600, padding: '4px 0' }}>{d}</div>
                      ))}
                      {days.map((d, i) => (
                        <button
                          key={i}
                          disabled={!d || (d !== null && d < now.getDate())}
                          onClick={() => d && setDay(d)}
                          style={{
                            aspectRatio: '1',
                            borderRadius: 'var(--radius)',
                            border: 'none',
                            background: day === d ? 'var(--teal)' : d && d >= now.getDate() ? 'var(--bg)' : 'transparent',
                            color: day === d ? '#fff' : d && d < now.getDate() ? 'var(--hint)' : 'var(--text)',
                            cursor: d && d >= now.getDate() ? 'pointer' : 'default',
                            fontSize: 13,
                            fontWeight: day === d ? 700 : 400,
                            transition: 'all .12s',
                          }}
                        >
                          {d}
                        </button>
                      ))}
                    </div>

                    {/* Times */}
                    {day && (
                      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
                        <h3 style={{ fontSize: 15, fontWeight: 600, margin: '20px 0 10px' }}>⏰ Uhrzeit wählen</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                          {TIMES.map(t => (
                            <button
                              key={t}
                              onClick={() => setTime(t)}
                              className={`btn btn-sm ${time === t ? 'btn-teal' : 'btn-ghost'}`}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Teacher + Summary */}
                  <div>
                    <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>👨‍🏫 Fahrlehrer</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
                      {TEACHERS.filter(t => !cat || t.cats.includes(cat)).map(t => (
                        <button
                          key={t.id}
                          onClick={() => setTeacher(t.id)}
                          style={{
                            display: 'flex', alignItems: 'center', gap: 12,
                            padding: '12px 14px',
                            border: `2px solid ${teacher === t.id ? 'var(--teal)' : 'var(--border-lt)'}`,
                            borderRadius: 'var(--radius)',
                            background: teacher === t.id ? 'var(--teal-pale)' : 'var(--white)',
                            cursor: 'pointer', textAlign: 'left',
                          }}
                        >
                          <span style={{ fontSize: 24 }}>{t.img}</span>
                          <span style={{ fontSize: 14, fontWeight: 500 }}>{t.name}</span>
                        </button>
                      ))}
                    </div>

                    {/* Summary */}
                    <div style={{ background: 'var(--bg)', borderRadius: 'var(--radius)', padding: 16, fontSize: 13, color: 'var(--muted)' }}>
                      <div style={{ marginBottom: 8, fontWeight: 600, color: 'var(--text)' }}>Übersicht</div>
                      <div>Kat.: {cat ? CATEGORIES.find(c => c.id === cat)?.label : '—'}</div>
                      <div>Datum: {day ? `${day}. ${monthName}` : '—'}</div>
                      <div>Zeit: {time ?? '—'}</div>
                      <div>Lehrer: {teacher ? TEACHERS.find(t => t.id === teacher)?.name : '—'}</div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 16 }}>
                      <button
                        className="btn btn-teal btn-full"
                        disabled={!day || !time}
                        onClick={() => setStep(3)}
                      >
                        Weiter zur Bestätigung →
                      </button>
                      <button className="btn btn-ghost btn-full" onClick={() => setStep(1)}>← Zurück</button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                <div style={{ maxWidth: 480 }}>
                  <h2 style={{ fontSize: 22, marginBottom: 8 }}>✅ Buchung bestätigen</h2>
                  <p style={{ color: 'var(--muted)', marginBottom: 24 }}>Bitte überprüfe deine Angaben.</p>

                  <div className="card mb-24">
                    <div className="card-body">
                      {[
                        ['Kategorie', CATEGORIES.find(c => c.id === cat)?.label ?? '—'],
                        ['Datum', `${day}. ${monthName}`],
                        ['Uhrzeit', time ?? '—'],
                        ['Fahrlehrer', TEACHERS.find(t => t.id === teacher)?.name ?? 'Beliebig'],
                      ].map(([k, v]) => (
                        <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border-lt)', fontSize: 14 }}>
                          <span style={{ color: 'var(--muted)' }}>{k}</span>
                          <span style={{ fontWeight: 500 }}>{v}</span>
                        </div>
                      ))}
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', fontWeight: 700, fontSize: 16 }}>
                        <span>Preis</span>
                        <span>{CATEGORIES.find(c => c.id === cat)?.price}</span>
                      </div>
                    </div>
                  </div>

                  <div className="form-group mb-16">
                    <label className="form-label">Vorname &amp; Nachname</label>
                    <input className="form-input" placeholder="Max Muster" />
                  </div>
                  <div className="form-group mb-16">
                    <label className="form-label">E-Mail</label>
                    <input className="form-input" type="email" placeholder="max@muster.ch" />
                  </div>
                  <div className="form-group mb-24">
                    <label className="form-label">Telefon</label>
                    <input className="form-input" type="tel" placeholder="+41 79 123 45 67" />
                  </div>
                  <label className="checkbox-row mb-24" style={{ display: 'flex' }}>
                    <input type="checkbox" />
                    <span>Ich akzeptiere die <a href="#" style={{ color: 'var(--teal)' }}>AGB</a></span>
                  </label>

                  <div style={{ display: 'flex', gap: 12 }}>
                    <button className="btn btn-teal btn-lg" onClick={() => navigate('/danke/buchung')}>Jetzt buchen →</button>
                    <button className="btn btn-ghost" onClick={() => setStep(2)}>← Zurück</button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  )
}
