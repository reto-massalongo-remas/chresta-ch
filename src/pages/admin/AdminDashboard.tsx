import { motion } from 'framer-motion'
import styles from './AdminDashboard.module.css'

/* ─── Fake data ─────────────────────────────────────────── */

const STATS = [
  {
    label: 'Buchungen diesen Monat',
    value: '127',
    delta: '+12%',
    deltaDir: 'up' as const,
    deltaNote: 'vs. letzter Monat',
    icon: '📅',
    accent: '#087283',
  },
  {
    label: 'Umsatz',
    value: "CHF 18'420",
    delta: '+8%',
    deltaDir: 'up' as const,
    deltaNote: 'vs. letzter Monat',
    icon: '💰',
    accent: '#059669',
  },
  {
    label: 'Aktive Kurse',
    value: '12',
    delta: '',
    deltaDir: 'neutral' as const,
    deltaNote: 'laufende Angebote',
    icon: '📚',
    accent: '#7C3AED',
  },
  {
    label: 'Plätze frei diese Woche',
    value: '48',
    delta: 'von 96',
    deltaDir: 'neutral' as const,
    deltaNote: 'Auslastung 50 %',
    icon: '🪑',
    accent: '#D97706',
  },
]

const BOOKINGS = [
  {
    id: 'B-2401',
    name: 'Anna Steiner',
    email: 'a.steiner@mail.ch',
    kurs: 'Nothelfer 1',
    datum: '06.12.2025',
    status: 'bestätigt',
    betrag: 'CHF 25.00',
  },
  {
    id: 'B-2402',
    name: 'Thomas Maurer',
    email: 't.maurer@mail.ch',
    kurs: 'PGS 1 Motorrad',
    datum: '25.01.2026',
    status: 'bestätigt',
    betrag: 'CHF 290.00',
  },
  {
    id: 'B-2403',
    name: 'Sara Meier',
    email: 's.meier@mail.ch',
    kurs: 'BLS-AED',
    datum: '16.12.2025',
    status: 'ausstehend',
    betrag: 'CHF 165.00',
  },
  {
    id: 'B-2404',
    name: 'Lukas Brunner',
    email: 'l.brunner@mail.ch',
    kurs: 'Nothelfer 2',
    datum: '13.12.2025',
    status: 'bestätigt',
    betrag: 'CHF 115.00',
  },
  {
    id: 'B-2405',
    name: 'Eva Zimmermann',
    email: 'e.zimm@mail.ch',
    kurs: 'CZV Modul 1',
    datum: '09.12.2025',
    status: 'storniert',
    betrag: 'CHF 380.00',
  },
  {
    id: 'B-2406',
    name: 'Felix Keller',
    email: 'f.keller@mail.ch',
    kurs: 'Kurventraining',
    datum: '19.04.2026',
    status: 'bestätigt',
    betrag: 'CHF 340.00',
  },
  {
    id: 'B-2407',
    name: 'Mia Hoffmann',
    email: 'm.hoff@mail.ch',
    kurs: 'Erste-Hilfe Refresher',
    datum: '31.01.2026',
    status: 'ausstehend',
    betrag: 'CHF 155.00',
  },
]

const UPCOMING = [
  {
    kurs: 'Nothelfer 1',
    date: 'Sa 06.12.',
    time: '16:30',
    instructor: 'MC',
    booked: 3,
    total: 8,
  },
  {
    kurs: 'CZV Modul 1',
    date: 'Mo 09.12.',
    time: '08:00',
    instructor: 'PK',
    booked: 8,
    total: 16,
  },
  {
    kurs: 'BLS-AED',
    date: 'Di 16.12.',
    time: '08:00',
    instructor: 'MC',
    booked: 2,
    total: 8,
  },
  {
    kurs: 'Nothelfer 2',
    date: 'Sa 13.12.',
    time: '09:00',
    instructor: 'LM',
    booked: 2,
    total: 8,
  },
  {
    kurs: 'Schnupperkurs',
    date: 'Sa 18.01.',
    time: '09:00',
    instructor: 'RB',
    booked: 0,
    total: 6,
  },
]

const ACTIVITY = [
  { icon: '✅', text: 'Anna Steiner hat Nothelfer 1 gebucht (B-2401)', time: 'vor 12 Min.' },
  { icon: '💳', text: 'Zahlung bestätigt – Thomas Maurer CHF 290.00', time: 'vor 28 Min.' },
  { icon: '✉️', text: 'Kursbestätigung versendet an 4 Teilnehmer (BLS-AED 16.12.)', time: 'vor 1 Std.' },
  { icon: '❌', text: 'Stornierung – Eva Zimmermann, CZV Modul 1', time: 'vor 2 Std.' },
  { icon: '👤', text: 'Neues Kundenkonto erstellt – Mia Hoffmann', time: 'vor 3 Std.' },
]

/* ─── Helpers ────────────────────────────────────────────── */

type StatusKey = 'bestätigt' | 'ausstehend' | 'storniert'

const STATUS_MAP: Record<StatusKey, { label: string; cls: string }> = {
  bestätigt: { label: 'Bestätigt', cls: 'green' },
  ausstehend: { label: 'Ausstehend', cls: 'orange' },
  storniert: { label: 'Storniert', cls: 'grey' },
}

function isStatusKey(s: string): s is StatusKey {
  return s in STATUS_MAP
}

function StatusBadge({ status }: { status: string }) {
  const key = isStatusKey(status) ? status : 'ausstehend'
  const { label, cls } = STATUS_MAP[key]
  return <span className={`${styles.badge} ${styles[`badge_${cls}`]}`}>{label}</span>
}

function CapacityBar({ booked, total }: { booked: number; total: number }) {
  const pct = total > 0 ? Math.round((booked / total) * 100) : 0
  const color =
    pct === 0 ? '#E5E7EB' : pct >= 80 ? '#EF4444' : pct >= 50 ? '#F59E0B' : '#10B981'
  return (
    <div className={styles.capBar}>
      <div className={styles.capTrack}>
        <div
          className={styles.capFill}
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
      <span className={styles.capLabel}>
        {booked}/{total}
      </span>
    </div>
  )
}

/* ─── Component ──────────────────────────────────────────── */

export default function AdminDashboard() {
  const today = new Date().toLocaleDateString('de-CH', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Dashboard</h1>
          <p className={styles.subtitle}>{today}</p>
        </div>
        <button className={styles.btnPrimary}>+ Neues erstellen</button>
      </div>

      {/* Stats row */}
      <div className={styles.statsRow}>
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            className={styles.statCard}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.35 }}
          >
            <div className={styles.statTop}>
              <span className={styles.statIcon} style={{ background: `${stat.accent}18` }}>
                {stat.icon}
              </span>
              {stat.delta && (
                <span
                  className={`${styles.statDelta} ${
                    stat.deltaDir === 'up' ? styles.deltaUp : styles.deltaNeutral
                  }`}
                >
                  {stat.deltaDir === 'up' && '↑ '}
                  {stat.delta}
                </span>
              )}
            </div>
            <div className={styles.statValue}>{stat.value}</div>
            <div className={styles.statLabel}>{stat.label}</div>
            <div className={styles.statNote}>{stat.deltaNote}</div>
          </motion.div>
        ))}
      </div>

      {/* Two-column layout */}
      <div className={styles.columns}>
        {/* Recent bookings */}
        <motion.div
          className={styles.card}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.38 }}
        >
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Letzte Buchungen</h2>
            <button className={styles.btnGhost}>Alle anzeigen →</button>
          </div>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Kurs</th>
                  <th>Datum</th>
                  <th>Status</th>
                  <th>Betrag</th>
                  <th>Aktionen</th>
                </tr>
              </thead>
              <tbody>
                {BOOKINGS.map((b, i) => (
                  <motion.tr
                    key={b.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.05 }}
                  >
                    <td>
                      <div className={styles.nameCell}>
                        <span className={styles.nameText}>{b.name}</span>
                        <span className={styles.emailText}>{b.email}</span>
                      </div>
                    </td>
                    <td className={styles.kursCell}>{b.kurs}</td>
                    <td className={styles.monoCell}>{b.datum}</td>
                    <td>
                      <StatusBadge status={b.status} />
                    </td>
                    <td className={styles.monoCell}>{b.betrag}</td>
                    <td>
                      <div className={styles.actionGroup}>
                        <button className={styles.actionBtn}>Ansehen</button>
                        <button className={styles.actionBtn}>Bearbeiten</button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Upcoming sessions */}
        <motion.div
          className={styles.card}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.42, duration: 0.38 }}
        >
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Nächste Termine</h2>
            <button className={styles.btnGhost}>Kalender →</button>
          </div>
          <div className={styles.sessionList}>
            {UPCOMING.map((s, i) => (
              <motion.div
                key={`${s.kurs}-${s.date}`}
                className={styles.sessionCard}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.48 + i * 0.06 }}
              >
                <div className={styles.sessionTop}>
                  <div className={styles.sessionInfo}>
                    <span className={styles.sessionKurs}>{s.kurs}</span>
                    <span className={styles.sessionMeta}>
                      {s.date} · {s.time}
                    </span>
                  </div>
                  <span className={styles.instructorBadge}>{s.instructor}</span>
                </div>
                <CapacityBar booked={s.booked} total={s.total} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Activity log */}
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.58, duration: 0.38 }}
      >
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>Aktivitätsprotokoll</h2>
          <span className={styles.logBadge}>Heute</span>
        </div>
        <ul className={styles.activityList}>
          {ACTIVITY.map((a, i) => (
            <li key={i} className={styles.activityItem}>
              <span className={styles.activityIcon}>{a.icon}</span>
              <span className={styles.activityText}>{a.text}</span>
              <span className={styles.activityTime}>{a.time}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  )
}
