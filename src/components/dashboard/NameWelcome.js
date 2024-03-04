"use client"
import { AuthContext } from '@/context/AuthContext'
import { useContext } from 'react'
import styles from './allcont.module.css'

const NameWelcome = () => {
  const {user} = useContext(AuthContext);
  return (
    <div className={styles.welcome}>
        <h3>Hi {`${user && user.data.first_name}`}👋</h3>
        <p>Welcome To GrubDriver</p>
    </div>
  )
}

export default NameWelcome