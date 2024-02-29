"use client"
import { AuthContext } from '@/context/AuthContext'
import { CircularProgress } from '@mui/material'
import { useContext } from 'react'
import styles from './loadingfull.module.css'

const LoadingFullNew = () => {
  return (
    <div className={styles.loading}>
        <CircularProgress size={70} />
    </div>
  )
}

export default LoadingFullNew