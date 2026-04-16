import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

const cols = [
  {
    title: 'Fahrschule',
    links: [
      { label: 'Nothilfe', href: '/fahrschule/nothilfe' },
      { label: 'Theorie', href: '/fahrschule/theorie' },
      { label: 'Verkehrskunde', href: '/fahrschule/verkehrskunde' },
      { label: 'Motorrad', href: '/fahrschule/motorrad' },
      { label: 'Auto (Kat. B)', href: '/fahrschule/auto' },
      { label: 'Lastwagen / Car', href: '/fahrschule/lastwagen' },
      { label: 'Boot', href: '/kontakt' },
      { label: 'Weiterbildung', href: '/fahrschule/weiterbildung' },
      { label: 'Shop', href: '/shop' },
    ],
  },
  {
    title: 'Chauffeur / Fahrlehrer',
    links: [
      { label: 'CZV-Weiterbildung', href: '/chauffeur/czv-weiterbildung' },
      { label: 'CZV-Ausbildung', href: '/chauffeur/czv-ausbildung' },
      { label: 'Fahrstunden Lastwagen', href: '/fahrstunden-buchen' },
      { label: '–', href: '#' },
      { label: 'Weiterbildung Kat. A', href: '/fahrlehrer/kat-a' },
      { label: 'Weiterbildung Kat. B', href: '/fahrlehrer/kat-b' },
      { label: 'WAB Moderator', href: '/fahrlehrer/wab' },
    ],
  },
  {
    title: 'Mieten / Reisen',
    links: [
      { label: 'CTC Trucker-Club', href: '/mieten/ctc' },
      { label: 'CMC Moto-Club', href: '/mieten/cmc' },
      { label: 'Motorrad Touren', href: '/mieten/touren' },
      { label: 'Motorrad Mieten', href: '/mieten/motorrad' },
      { label: 'Kleidung Mieten', href: '/mieten/kleidung' },
      { label: 'Anhänger Mieten', href: '/mieten/anhaenger' },
      { label: 'Reisebus Mieten', href: '/mieten/reisebus' },
      { label: 'Simulator Mieten', href: '/mieten/simulator' },
    ],
  },
  {
    title: 'Über Uns / Rechtliches',
    links: [
      { label: 'Team', href: '/ueber-uns#team' },
      { label: 'Kontakt', href: '/kontakt' },
      { label: 'Schulungsräume', href: '/ueber-uns#raeume' },
      { label: 'News', href: '/news' },
      { label: '–', href: '#' },
      { label: 'AGB', href: '#' },
      { label: 'Datenschutz', href: '#' },
      { label: 'Impressum', href: '#' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>

        {/* Brand column */}
        <div className={styles.brand}>
          <div className={styles.logoScript}>Chresta</div>
          <div className={styles.logoSub}>Affoltern am Albis</div>
          <div className={styles.since}>seit 1989</div>
          <address className={styles.addr}>
            Chresta GmbH<br />
            Industriestrasse 17<br />
            8910 Affoltern am Albis<br /><br />
            <a href="tel:0447615958">044 761 59 58</a><br />
            <a href="mailto:info@chresta.ch">info@chresta.ch</a>
          </address>
          <div className={styles.social}>
            <a href="#" aria-label="LinkedIn">in</a>
            <a href="#" aria-label="YouTube">▶</a>
            <a href="#" aria-label="Facebook">f</a>
          </div>
        </div>

        {/* Link columns */}
        {cols.map(col => (
          <div key={col.title} className={styles.col}>
            <h4 className={styles.colTitle}>{col.title}</h4>
            <ul>
              {col.links.map(link => (
                <li key={link.label}>
                  {link.label === '–' ? (
                    <span style={{ display: 'block', height: 12 }} />
                  ) : (
                    <Link to={link.href} className={styles.colLink}>{link.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className={styles.bottom}>
        <p>© 2025 Chresta GmbH · Affoltern am Albis · Alle Rechte vorbehalten</p>
        <div className={styles.certs}>
          <span>asa CZV</span>
          <span>SFV ASMC</span>
          <span>EDUQUA</span>
        </div>
      </div>
    </footer>
  )
}
