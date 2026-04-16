import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './Header.module.css'
import Logo from '../ui/Logo'

const NAV = [
  {
    label: 'Fahrschule',
    href: '/fahrschule',
    cols: [
      {
        title: 'Kurse & Ausbildung',
        links: [
          { label: '🏍 Motorrad', href: '/fahrschule/motorrad' },
          { label: '🚗 Auto (Kat. B)', href: '/fahrschule/auto' },
          { label: '🚕 Taxi', href: '/fahrschule/taxi' },
          { label: '🚛 Lastwagen / Car', href: '/fahrschule/lastwagen' },
          { label: '⛵ Boot', href: '/kontakt' },
        ],
      },
      {
        title: 'Sicherheit & Theorie',
        links: [
          { label: '🩺 Nothilfe', href: '/fahrschule/nothilfe' },
          { label: '📖 Theorie', href: '/fahrschule/theorie' },
          { label: '🚦 Verkehrskunde', href: '/fahrschule/verkehrskunde' },
          { label: '⛺ Fahrschul-Camp', href: '/fahrschule/camp' },
          { label: '📚 Weiterbildung', href: '/fahrschule/weiterbildung' },
        ],
      },
      {
        title: 'Weiterbildung',
        links: [
          { label: 'WAB 2-Phasen Kurs', href: '/fahrschule/wab' },
          { label: 'Begleitperson-Kurs', href: '/fahrschule/begleitperson' },
          { label: 'E-Bike Fahrkurs', href: '/fahrschule/ebike' },
          { label: '↔ Kurventraining', href: '/fahrschule/kurventraining' },
        ],
      },
      {
        title: 'Shop',
        links: [
          { label: '📘 Lehrmittel', href: '/shop' },
          { label: '📦 Pakete / ABOs', href: '/shop' },
          { label: '🎁 Gutscheine', href: '/shop' },
        ],
      },
    ],
  },
  {
    label: 'Chauffeur',
    href: '/chauffeur',
    cols: [
      {
        title: 'CZV-Ausbildung',
        links: [
          { label: 'CZV-Weiterbildung', href: '/chauffeur/czv-weiterbildung' },
          { label: 'CZV-Ausbildung', href: '/chauffeur/czv-ausbildung' },
          { label: 'Fahrstunden Transporter', href: '/fahrstunden-buchen' },
          { label: 'Fahrstunden Car / Bus', href: '/fahrstunden-buchen' },
          { label: 'Fahrstunden Lastwagen', href: '/fahrstunden-buchen' },
        ],
      },
      {
        title: 'Clubs',
        links: [
          { label: 'CTC Trucker-Club', href: '/mieten/ctc' },
          { label: 'CMC Moto-Club', href: '/mieten/cmc' },
        ],
      },
    ],
  },
  {
    label: 'Fahrlehrer',
    href: '/fahrlehrer',
    cols: [
      {
        title: 'Weiterbildung',
        links: [
          { label: 'Weiterbildung Kat. A', href: '/fahrlehrer/kat-a' },
          { label: 'Weiterbildung Kat. B', href: '/fahrlehrer/kat-b' },
          { label: 'Weiterbildung Kat. C/D', href: '/fahrlehrer/kat-cd' },
          { label: 'WAB Moderator', href: '/fahrlehrer/wab' },
          { label: 'Nothilfe-Instruktor', href: '/fahrlehrer/nothilfe' },
        ],
      },
      {
        title: 'Infos',
        links: [
          { label: 'Über unser Team', href: '/ueber-uns' },
          { label: 'Kontakt aufnehmen', href: '/kontakt' },
        ],
      },
    ],
  },
  {
    label: 'Mieten / Reisen',
    href: '/mieten',
    cols: [
      {
        title: 'Fahrzeuge',
        links: [
          { label: '🏍 Motorrad Mieten', href: '/mieten/motorrad' },
          { label: '🚗 Anhänger Mieten', href: '/mieten/anhaenger' },
          { label: '🚌 Reisebus Mieten', href: '/mieten/reisebus' },
          { label: '👔 Chauffeur-Service', href: '/mieten/chauffeur' },
        ],
      },
      {
        title: 'Ausrüstung & Räume',
        links: [
          { label: '🧥 Kleidung Mieten', href: '/mieten/kleidung' },
          { label: '🖥 Simulator Mieten', href: '/mieten/simulator' },
          { label: '🏢 Raum Mieten', href: '/mieten/raum' },
          { label: '🅿️ Parkplatz Mieten', href: '/mieten/parkplatz' },
        ],
      },
      {
        title: 'Clubs & Touren',
        links: [
          { label: 'CTC Trucker-Club', href: '/mieten/ctc' },
          { label: 'CMC Moto-Club', href: '/mieten/cmc' },
          { label: '🏔 Motorrad Touren', href: '/mieten/touren' },
        ],
      },
    ],
  },
  {
    label: 'Über Uns',
    href: '/ueber-uns',
    cols: [
      {
        title: 'Unternehmen',
        links: [
          { label: 'Unser Team', href: '/ueber-uns#team' },
          { label: 'Fahrzeuge', href: '/ueber-uns#fahrzeuge' },
          { label: 'Schulungsräume', href: '/ueber-uns#raeume' },
          { label: 'Leitbild & Vision', href: '/ueber-uns#leitbild' },
        ],
      },
      {
        title: 'Mehr',
        links: [
          { label: '📰 News & Aktuelles', href: '/news' },
          { label: '✉️ Kontakt', href: '/kontakt' },
          { label: '📥 Downloads', href: '#' },
        ],
      },
    ],
  },
]

const menuVariants = {
  hidden: { opacity: 0, y: -8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.18, ease: 'easeOut' } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.12 } },
}

const EASE = [0.4, 0, 0.2, 1] as const

export default function Header() {
  const { pathname } = useLocation()
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileSubMenu, setMobileSubMenu] = useState<(typeof NAV)[0] | null>(null)
  const [direction, setDirection] = useState(1)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setMobileSubMenu(null)
  }, [pathname])

  const isHome = pathname === '/'
  const transparent = isHome && !scrolled

  function openSub(item: (typeof NAV)[0]) {
    setDirection(1)
    setMobileSubMenu(item)
  }

  function closeSub() {
    setDirection(-1)
    setMobileSubMenu(null)
  }

  function closeAll() {
    setMobileOpen(false)
    setMobileSubMenu(null)
  }

  const slideVariants = {
    initial: (dir: number) => ({
      x: dir > 0 ? '100%' : '-8%',
      opacity: dir > 0 ? 0.5 : 0,
    }),
    animate: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
      x: dir > 0 ? '-8%' : '100%',
      opacity: 0,
    }),
  }

  return (
    <header className={`${styles.header} ${transparent ? styles.transparent : ''}`}>
      <div className={styles.inner}>

        {/* Logo */}
        <Link to="/" className={styles.logo}>
          <Logo height={44} />
        </Link>

        {/* Desktop Nav */}
        <nav className={styles.nav}>
          {NAV.map(item => (
            <div
              key={item.label}
              className={styles.navItem}
              onMouseEnter={() => setOpenMenu(item.label)}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <Link
                to={item.href}
                className={`${styles.navLink} ${pathname.startsWith(item.href) ? styles.navLinkActive : ''}`}
              >
                {item.label}
                <span className={styles.chev}>▾</span>
              </Link>

              <AnimatePresence>
                {openMenu === item.label && (
                  <motion.div
                    className={`${styles.megaMenu} ${item.cols.length >= 4 ? styles.megaMenuWide : ''}`}
                    variants={menuVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    {item.cols.map(col => (
                      <div key={col.title} className={styles.megaCol}>
                        <div className={styles.megaColTitle}>{col.title}</div>
                        <ul>
                          {col.links.map(link => (
                            <li key={link.label}>
                              <Link
                                to={link.href}
                                className={styles.megaLink}
                                onClick={() => setOpenMenu(null)}
                              >
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    <div className={styles.megaFooter}>
                      <Link
                        to="/fahrstunden-buchen"
                        className="btn btn-teal btn-sm"
                        onClick={() => setOpenMenu(null)}
                      >
                        Fahrstunden buchen →
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* Actions — desktop shows booking button, mobile shows only cart */}
        <div className={styles.actions}>
          <Link to="/warenkorb" className={styles.cartBtn} title="Warenkorb">
            <span>🛒</span>
            <span className={styles.cartBadge}>2</span>
          </Link>
          <Link to="/fahrstunden-buchen" className="btn btn-primary">
            Fahrstunden buchen
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className={styles.mobileToggle}
          onClick={() => setMobileOpen(v => !v)}
          aria-label={mobileOpen ? 'Menü schliessen' : 'Menü öffnen'}
        >
          <span className={mobileOpen ? styles.barTop : ''} />
          <span className={mobileOpen ? styles.barMid : ''} />
          <span className={mobileOpen ? styles.barBot : ''} />
        </button>
      </div>

      {/* Mobile fullscreen panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className={styles.mobilePanel}
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)', transition: { duration: 0.3, ease: EASE } }}
            exit={{ clipPath: 'inset(0 0 100% 0)', transition: { duration: 0.25, ease: EASE } }}
          >
            {/* Panel header */}
            <div className={styles.mobilePanelHead}>
              <Link to="/" onClick={closeAll}>
                <Logo height={36} />
              </Link>
              <button className={styles.mobileClose} onClick={closeAll} aria-label="Menü schliessen">
                ✕
              </button>
            </div>

            {/* Scrollable body with page-slide animation */}
            <div className={styles.mobilePanelScroll}>
              <AnimatePresence mode="wait" custom={direction}>
                {!mobileSubMenu ? (
                  <motion.div
                    key="main"
                    className={styles.mobileMainPage}
                    custom={direction}
                    variants={slideVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.28, ease: EASE }}
                  >
                    {NAV.map(item => (
                      <button
                        key={item.label}
                        className={styles.mobileNavRow}
                        onClick={() => openSub(item)}
                      >
                        {item.label}
                        <span className={styles.mobileNavChev}>›</span>
                      </button>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key={mobileSubMenu.label}
                    className={styles.mobileSubPage}
                    custom={direction}
                    variants={slideVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.28, ease: EASE }}
                  >
                    <button className={styles.mobileBackRow} onClick={closeSub}>
                      <span className={styles.mobileBackArrow}>‹</span>
                      <span className={styles.mobileBackLabel}>{mobileSubMenu.label}</span>
                    </button>

                    {mobileSubMenu.cols.map(col => (
                      <div key={col.title} className={styles.mobileSection}>
                        <div className={styles.mobileSectionTitle}>{col.title}</div>
                        {col.links.map(link => (
                          <Link
                            key={link.label}
                            to={link.href}
                            className={styles.mobileSubLink}
                            onClick={closeAll}
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Panel footer */}
            <div className={styles.mobilePanelFoot}>
              <Link to="/fahrstunden-buchen" className="btn btn-teal btn-full" onClick={closeAll}>
                Fahrstunden buchen →
              </Link>
              <div className={styles.mobileContact}>
                <a href="tel:0447615958">📞 044 761 59 58</a>
                <a href="mailto:info@chresta.ch">✉ info@chresta.ch</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
