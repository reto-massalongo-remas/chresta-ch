import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import FadeIn from '../components/ui/FadeIn'

const TEAM = [
  { name: 'Marco Chresta',   role: 'Inhaber & Fahrlehrer', cats: 'Kat. B, A, A1', img: '👨‍💼' },
  { name: 'Laura Meier',     role: 'Fahrlehrerin',          cats: 'Kat. B, BE', img: '👩‍🏫' },
  { name: 'Peter Keller',    role: 'Fahrlehrer CZV',        cats: 'Kat. C, CE, D', img: '👨‍🏫' },
  { name: 'Sandra Brunner',  role: 'Nothilfe-Instruktorin', cats: 'Nothilfe, BLS', img: '👩‍⚕️' },
  { name: 'Thomas Müller',   role: 'Fahrlehrer',            cats: 'Kat. B, A', img: '👨‍🏫' },
  { name: 'Sabine Koch',     role: 'Administratin',         cats: 'Büro & Support', img: '👩‍💻' },
]

export default function UeberUns() {
  return (
    <>
      <div style={{ background: 'linear-gradient(135deg, var(--navy), #1e2560)', padding: '64px 0' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: 11, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: 10 }}>
              Chresta GmbH · Affoltern am Albis
            </p>
            <h1 style={{ fontSize: 46, fontWeight: 500, color: '#fff', marginBottom: 14 }}>Über Uns</h1>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', maxWidth: 520, lineHeight: 1.7 }}>
              Seit 1989 begleiten wir unsere Kundinnen und Kunden auf dem Weg zum Führerausweis und darüber hinaus.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Leitbild */}
      <section id="leitbild" className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <FadeIn>
              <p className="section-eyebrow">Unsere Vision</p>
              <h2 className="section-title">Sicher unterwegs – jetzt und in Zukunft</h2>
              <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.75, marginBottom: 16 }}>
                Die Chresta GmbH ist eine der renommiertesten Fahrschulen im Knonaueramt. Mit über 12 Mitarbeiterinnen und Mitarbeitern bieten wir ein umfassendes Angebot: von der klassischen Fahrausbildung bis zu CZV-Weiterbildungen für Berufschauffeure.
              </p>
              <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.75 }}>
                Unser Ziel ist es, Fahranfänger und erfahrene Lenker gleichermassen kompetent, sicher und motiviert zu begleiten – mit modernem Unterricht, einem freundlichen Team und flexibler Online-Buchung.
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {[['35+', 'Jahre Erfahrung'], ['12+', 'Mitarbeitende'], ['1000+', 'Kurse / Jahr'], ['98%', 'Empfehlerquote']].map(([n, l]) => (
                  <div key={l} style={{ background: 'var(--bg)', borderRadius: 'var(--radius-lg)', padding: '28px 20px', textAlign: 'center' }}>
                    <div style={{ fontSize: 36, fontWeight: 700, color: 'var(--teal)', marginBottom: 6 }}>{n}</div>
                    <div style={{ fontSize: 13, color: 'var(--muted)' }}>{l}</div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="section section-bg">
        <div className="container">
          <FadeIn>
            <p className="section-eyebrow">Menschen</p>
            <h2 className="section-title" style={{ marginBottom: 40 }}>Unser Team</h2>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
            {TEAM.map((m, i) => (
              <FadeIn key={m.name} delay={i * 0.08}>
                <div className="card text-center" style={{ padding: '32px 24px' }}>
                  <div style={{ fontSize: 56, marginBottom: 16 }}>{m.img}</div>
                  <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>{m.name}</h3>
                  <p style={{ fontSize: 13, color: 'var(--teal)', fontWeight: 500, marginBottom: 4 }}>{m.role}</p>
                  <p style={{ fontSize: 12, color: 'var(--hint)' }}>{m.cats}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Fahrzeuge */}
      <section id="fahrzeuge" className="section">
        <div className="container">
          <FadeIn>
            <p className="section-eyebrow">Fahrzeugflotte</p>
            <h2 className="section-title">Modernste Fahrzeuge</h2>
            <p className="section-sub">Unsere Flotte wird regelmässig erneuert und ist mit modernster Sicherheitstechnik ausgestattet.</p>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
            {[['🚗', 'Kat. B – Auto', '8 Fahrzeuge'], ['🏍', 'Motorräder', '6 Fahrzeuge'], ['🚛', 'Lastwagen', '2 Fahrzeuge'], ['🚌', 'Reisebus', '1 Fahrzeug']].map(([icon, name, count]) => (
              <FadeIn key={name}>
                <div className="card text-center" style={{ padding: 28 }}>
                  <div style={{ fontSize: 48, marginBottom: 12 }}>{icon}</div>
                  <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{name}</div>
                  <div style={{ fontSize: 12, color: 'var(--hint)' }}>{count}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div style={{ background: 'var(--teal)', padding: '56px 32px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 34, fontWeight: 500, color: '#fff', marginBottom: 12 }}>Bereit loszulegen?</h2>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/fahrstunden-buchen" className="btn btn-primary btn-lg">Fahrstunde buchen →</Link>
          <Link to="/kontakt" className="btn btn-outline btn-lg">Kontakt aufnehmen</Link>
        </div>
      </div>
    </>
  )
}
