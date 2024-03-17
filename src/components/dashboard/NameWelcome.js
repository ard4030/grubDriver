"use client"
import { AuthContext } from '@/context/AuthContext'
import { useContext } from 'react'
import styles from './allcont.module.css'
import { useTranslation } from 'react-i18next'

const NameWelcome = () => {
  const {user} = useContext(AuthContext);
  const { t } = useTranslation();

  return (
    <div className={styles.welcome}>
        <h3>{t("Hi")} {`${user && user.data.first_name}`}👋</h3>
        <p>{t("Welcome To GrubDriver")}</p>
    </div>
  )
}

export default NameWelcome