import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import FadeIn from '../components/ui/FadeIn'
import CategoryCard from '../components/ui/CategoryCard'

const SUBCATEGORIES = [
  { title: '🩺 Nothilfe', href: '/fahrschule/nothilfe', desc: 'Nothelferkurs, BLS-AED, Erste Hilfe Refresher', bgUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=700&auto=format&fit=crop&q=80' },
  { title: '📖 Theorie',  href: '/fahrschule/theorie',  desc: 'Theorieprüfung, Verkehrskundeunterricht', bgUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=700&auto=format&fit=crop&q=80' },
  { title: '🏍 Motorrad', href: '/fahrschule/motorrad', desc: 'Schnupperkurse, PGS 1/2/3, Kurventraining', bgUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&auto=format&fit=crop&q=80' },
  { title: '🚗 Auto Kat. B', href: '/fahrschule/auto', desc: 'Fahrstunden, WAB, Begleitperson-Kurs', bgUrl: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=700&auto=format&fit=crop&q=80' },
  { title: '🚛 Lastwagen / Car', href: '/fahrschule/lastwagen', desc: 'Kat. C, CE, D Ausbildung', bgUrl: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=700&auto=format&fit=crop&q=80' },
  { title: '🛍 Shop', href: '/shop', desc: 'Lehrmittel, Pakete, Gutscheine', bgUrl: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=700&auto=format&fit=crop&q=80' },
]

const LINKS = [
  { label: '🩺 Nothilfe', href: '/fahrschule/nothilfe' },
  { label: '📖 Theorie',  href: '/fahrschule/theorie' },
  { label: '🚦 Verkehrskunde', href: '/fahrschule/verkehrskunde' },
  { label: '🏍 Motorrad', href: '/fahrschule/motorrad' },
  { label: '🚗 Auto', href: '/fahrschule/auto' },
  { label: '🚕 Taxi', href: '/fahrschule/taxi' },
  { label: '🚛 Lastwagen / Car', href: '/fahrschule/lastwagen' },
  { label: '⛵ Boot', href: '/kontakt' },
  { label: 'WAB 2-Phasen', href: '/fahrschule/wab' },
  { label: 'Begleitperson', href: '/fahrschule/begleitperson' },
  { label: '🛍 Shop', href: '/shop' },
]

export default function Fahrschule() {
  return (
    <>
      {/* Page Hero */}
      <div style={{ background: 'linear-gradient(135deg, var(--teal-dark), var(--teal))', padding: '52px 0' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: 11, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: 10 }}>Chresta GmbH</p>
            <h1 style={{ fontSize: 42, fontWeight: 500, color: '#fff', marginBottom: 12 }}>Fahrschule</h1>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.75)', maxWidth: 540, lineHeight: 1.65, marginBottom: 28 }}>
              Von Nothilfe bis Lastwagen – wir bieten alle Kurse und Ausbildungen für Ihre Führerscheinkategorie.
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {LINKS.slice(0, 6).map(l => (
                <Link key={l.label} to={l.href} className="btn btn-outline" style={{ fontSize: 13, padding: '8px 16px' }}>{l.label}</Link>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="container">
        <div className="breadcrumb">
          <Link to="/">chresta.ch</Link>
          <span className="sep">›</span>
          <strong>Fahrschule</strong>
        </div>
      </div>

      {/* Subcategory grid */}
      <section className="section">
        <div className="container">
          <FadeIn>
            <p className="section-eyebrow">Unser Angebot</p>
            <h2 className="section-title" style={{ marginBottom: 8 }}>Alle Kurse & Ausbildungen</h2>
            <p className="section-sub">Wähle deinen Bereich und buche direkt online.</p>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
            {SUBCATEGORIES.map((c, i) => (
              <CategoryCard key={c.title} title={c.title} href={c.href} bgUrl={c.bgUrl} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <FadeIn>
        <div style={{ background: 'var(--bg)', padding: '48px 0', textAlign: 'center' }}>
          <div className="container">
            <p className="section-eyebrow">1 Klick entfernt</p>
            <h2 className="section-title">Fahrstunde direkt buchen</h2>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginTop: 24 }}>
              <Link to="/fahrstunden-buchen" className="btn btn-primary btn-lg">Fahrstunde buchen →</Link>
              <Link to="/kontakt" className="btn btn-ghost btn-lg">Fragen? Kontaktiere uns</Link>
            </div>
          </div>
        </div>
      </FadeIn>
    </>
  )
}
