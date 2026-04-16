import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import styles from './CourseRow.module.css'

export interface Course {
  name: string
  date: string
  time: string
  price: string
  seats: number | null   // null = ausgebucht
}

interface Props {
  course: Course
  index: number
}

export default function CourseRow({ course, index }: Props) {
  const full = course.seats === null || course.seats === 0
  const low  = course.seats !== null && course.seats <= 2

  return (
    <motion.div
      className={styles.row}
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.35, ease: 'easeOut' }}
    >
      <span className={styles.name}>{course.name}</span>
      <span className={styles.date}>{course.date}</span>
      <span className={styles.time}>{course.time}</span>
      <span className={styles.price}>{course.price}</span>
      <span className={`${styles.seats} ${full ? styles.full : low ? styles.low : styles.ok}`}>
        {full ? 'ausgebucht' : `${course.seats} Plätze frei`}
      </span>
      {full ? (
        <button className={`${styles.bookBtn} ${styles.bookFull}`} disabled>voll</button>
      ) : (
        <Link to="/warenkorb" className={styles.bookBtn}>buchen →</Link>
      )}
    </motion.div>
  )
}
