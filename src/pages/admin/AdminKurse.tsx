import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getAllCourses } from '../../data/courses'
import type { CourseData } from '../../data/courses'
import styles from './AdminKurse.module.css'

/* ─── Status config ──────────────────────────────────────── */

type StatusKey = 'aktiv' | 'wenig' | 'pausiert'

interface StatusConfig {
  label: string
  cls: string
}

const COURSE_STATUS: Record<string, StatusKey> = {
  kurventraining: 'wenig',
}

const STATUS_CONFIG: Record<StatusKey, StatusConfig> = {
  aktiv: { label: 'Aktiv', cls: 'green' },
  wenig: { label: 'Wenig Nachfrage', cls: 'yellow' },
  pausiert: { label: 'Pausiert', cls: 'grey' },
}

function getCourseStatus(slug: string): StatusKey {
  return COURSE_STATUS[slug] ?? 'aktiv'
}

/* ─── Booking count (fake: total seats across sessions minus available) ── */

function getBookingCount(course: CourseData): number {
  return course.sessions.reduce((sum, s) => {
    const booked = s.seats !== null ? s.totalSeats - s.seats : s.totalSeats
    return sum + booked
  }, 0)
}

/* ─── Next available session label ──────────────────────────────────────── */

function getNextSession(course: CourseData): string {
  const available = course.sessions.find(s => s.seats !== null && s.seats > 0)
  if (available) return available.dateLabel
  const next = course.sessions[0]
  return next ? next.dateLabel : '–'
}

/* ─── Category badge colors ──────────────────────────────── */

function CategoryBadge({ category }: { category: string }) {
  const isChauffeur = category === 'Chauffeur'
  return (
    <span
      className={`${styles.catBadge} ${
        isChauffeur ? styles.catChauffeur : styles.catFahrschule
      }`}
    >
      {category}
    </span>
  )
}

/* ─── Status badge ───────────────────────────────────────── */

function StatusBadge({ slug }: { slug: string }) {
  const key = getCourseStatus(slug)
  const { label, cls } = STATUS_CONFIG[key]
  return (
    <span className={`${styles.badge} ${styles[`badge_${cls}`]}`}>{label}</span>
  )
}

/* ─── Component ──────────────────────────────────────────── */

const CATEGORIES = ['Alle', 'Fahrschule', 'Chauffeur'] as const
type CategoryFilter = (typeof CATEGORIES)[number]

const STATUS_FILTERS = ['Alle', 'Aktiv', 'Pausiert'] as const
type StatusFilter = (typeof STATUS_FILTERS)[number]

export default function AdminKurse() {
  const allCourses = useMemo(() => getAllCourses(), [])

  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('Alle')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('Alle')

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    return allCourses.filter(c => {
      if (q && !c.name.toLowerCase().includes(q) && !c.shortName.toLowerCase().includes(q))
        return false
      if (categoryFilter !== 'Alle' && c.category !== categoryFilter) return false
      if (statusFilter !== 'Alle') {
        const key = getCourseStatus(c.slug)
        if (statusFilter === 'Aktiv' && key !== 'aktiv' && key !== 'wenig') return false
        if (statusFilter === 'Pausiert' && key !== 'pausiert') return false
      }
      return true
    })
  }, [allCourses, search, categoryFilter, statusFilter])

  /* Aggregate stats */
  const totalSessions = allCourses.reduce((s, c) => s + c.sessions.length, 0)
  const freeSeats = allCourses.reduce(
    (s, c) =>
      s +
      c.sessions.reduce(
        (ss, sess) => ss + (sess.seats !== null ? sess.seats : 0),
        0,
      ),
    0,
  )

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Kurse verwalten</h1>
          <p className={styles.subtitle}>Übersicht aller Kursangebote</p>
        </div>
        <button className={styles.btnPrimary}>+ Neuer Kurs</button>
      </div>

      {/* Filters */}
      <div className={styles.filterBar}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Kurs suchen…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          className={styles.filterSelect}
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value as CategoryFilter)}
        >
          {CATEGORIES.map(c => (
            <option key={c} value={c}>
              {c === 'Alle' ? 'Alle Kategorien' : c}
            </option>
          ))}
        </select>
        <select
          className={styles.filterSelect}
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value as StatusFilter)}
        >
          {STATUS_FILTERS.map(s => (
            <option key={s} value={s}>
              {s === 'Alle' ? 'Alle Status' : s}
            </option>
          ))}
        </select>
        {(search || categoryFilter !== 'Alle' || statusFilter !== 'Alle') && (
          <button
            className={styles.clearBtn}
            onClick={() => {
              setSearch('')
              setCategoryFilter('Alle')
              setStatusFilter('Alle')
            }}
          >
            Filter zurücksetzen
          </button>
        )}
      </div>

      {/* Stats strip */}
      <div className={styles.statsStrip}>
        <div className={styles.statPill}>
          <span className={styles.statNum}>{allCourses.length}</span>
          <span className={styles.statPillLabel}>Kurse total</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.statPill}>
          <span className={styles.statNum}>{totalSessions}</span>
          <span className={styles.statPillLabel}>aktive Termine</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.statPill}>
          <span className={styles.statNum}>{freeSeats}</span>
          <span className={styles.statPillLabel}>freie Plätze</span>
        </div>
      </div>

      {/* Table card */}
      <div className={styles.card}>
        {filtered.length === 0 ? (
          <div className={styles.emptyState}>
            <span className={styles.emptyIcon}>🔍</span>
            <p>Keine Kurse gefunden für die gewählten Filter.</p>
            <button
              className={styles.btnGhost}
              onClick={() => {
                setSearch('')
                setCategoryFilter('Alle')
                setStatusFilter('Alle')
              }}
            >
              Filter zurücksetzen
            </button>
          </div>
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Kurs</th>
                  <th>Dauer</th>
                  <th>Preis</th>
                  <th>Nächster Termin</th>
                  <th>Buchungen</th>
                  <th>Status</th>
                  <th>Aktionen</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((course, i) => (
                  <motion.tr
                    key={course.slug}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.28 }}
                  >
                    <td>
                      <div className={styles.kursCell}>
                        <span className={styles.kursIcon}>{course.icon}</span>
                        <div>
                          <div className={styles.kursName}>{course.name}</div>
                          <CategoryBadge category={course.category} />
                        </div>
                      </div>
                    </td>
                    <td className={styles.metaCell}>{course.duration}</td>
                    <td className={styles.priceCell}>{course.price}</td>
                    <td className={styles.metaCell}>{getNextSession(course)}</td>
                    <td>
                      <div className={styles.bookingCell}>
                        <span className={styles.bookingNum}>
                          {getBookingCount(course)}
                        </span>
                        <span className={styles.bookingLabel}>gebucht</span>
                      </div>
                    </td>
                    <td>
                      <StatusBadge slug={course.slug} />
                    </td>
                    <td>
                      <div className={styles.actionGroup}>
                        <Link
                          to={`/kurs/${course.slug}`}
                          className={styles.actionLink}
                        >
                          Ansehen
                        </Link>
                        <button className={styles.actionBtn}>Bearbeiten</button>
                        <button className={`${styles.actionBtn} ${styles.actionBtnDanger}`}>
                          Archivieren
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create CTA card */}
      <motion.div
        className={styles.ctaCard}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.35 }}
      >
        <div className={styles.ctaIcon}>📝</div>
        <div className={styles.ctaBody}>
          <div className={styles.ctaTitle}>Neuen Kurs erstellen</div>
          <div className={styles.ctaDesc}>
            Möchten Sie einen neuen Kurs erstellen? Starten Sie mit unserer
            geführten Vorlage.
          </div>
        </div>
        <button className={styles.btnPrimary}>Neuen Kurs erstellen →</button>
      </motion.div>
    </div>
  )
}
