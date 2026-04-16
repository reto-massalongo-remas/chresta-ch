import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import FadeIn from '../components/ui/FadeIn'

const ARTICLES = [
  { date: '12. April 2026', title: 'Neue Motorrad-Kursdaten für Sommer 2026', excerpt: 'Ab sofort sind alle Motorrad-Grundkurse und Schnupperkurse für die Sommersaison buchbar. Jetzt sichern!', img: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&auto=format&fit=crop&q=80', tag: 'Kurse' },
  { date: '08. April 2026', title: 'Zwei neue Fahrlehrer verstärken unser Team', excerpt: 'Mit Marco und Laura haben wir zwei hochqualifizierte Fahrlehrer in unser Team aufgenommen. Herzlich willkommen!', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80', tag: 'Team' },
  { date: '01. April 2026', title: 'Online-Buchung jetzt für alle Kurse verfügbar', excerpt: 'Alle Kurse – von Nothilfe bis CZV – können ab sofort direkt online gebucht und bezahlt werden.', img: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&auto=format&fit=crop&q=80', tag: 'Neuigkeit' },
  { date: '15. März 2026', title: 'Fahrschul-Camp Sommer 2026 – Anmeldung offen', excerpt: 'Unser beliebtes Fahrschul-Camp findet diesen Sommer wieder statt. Begrenzte Plätze – jetzt anmelden!', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop&q=80', tag: 'Veranstaltung' },
  { date: '02. März 2026', title: 'CZV-Vollkurs jetzt mit Zertifikat', excerpt: 'Alle CZV-Absolventen erhalten neu ein offizielles asa-Zertifikat, das digital abrufbar ist.', img: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&auto=format&fit=crop&q=80', tag: 'CZV' },
  { date: '10. Feb. 2026', title: 'Neues Motorrad: BMW R 1250 GS in der Flotte', excerpt: 'Unsere Mietflotte wächst! Ab sofort steht das beliebte BMW R 1250 GS zur Miete bereit.', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=80', tag: 'Mieten' },
]

export default function News() {
  return (
    <>
      <div style={{ background: 'var(--bg)', padding: '52px 0', borderBottom: '1px solid var(--border-lt)' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="section-eyebrow">Aktuelles</p>
            <h1 className="section-title" style={{ fontSize: 42 }}>News & Infos</h1>
          </motion.div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
            {ARTICLES.map((a, i) => (
              <FadeIn key={a.title} delay={i * 0.07}>
                <Link to="/news/artikel" style={{ display: 'block', border: '1px solid var(--border-lt)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', background: 'var(--white)', boxShadow: 'var(--shadow)', textDecoration: 'none', transition: 'transform .2s, box-shadow .2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-md)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow)'; }}
                >
                  <div style={{ height: 200, backgroundImage: `url(${a.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                  <div style={{ padding: 20 }}>
                    <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                      <span className="badge badge-teal">{a.tag}</span>
                      <span style={{ fontFamily: 'var(--font-ui)', fontSize: 11, color: 'var(--hint)' }}>{a.date}</span>
                    </div>
                    <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text)', marginBottom: 8, lineHeight: 1.4 }}>{a.title}</h2>
                    <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>{a.excerpt}</p>
                    <span style={{ display: 'block', marginTop: 12, color: 'var(--teal)', fontSize: 13, fontWeight: 500 }}>Weiterlesen →</span>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
