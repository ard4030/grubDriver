"use client"
import { AuthContext } from '@/context/AuthContext'
import { CircularProgress } from '@mui/material'
import { useContext } from 'react'
import styles from './loadingfull.module.css'

const LoadingFullNew = ({styles={}}) => {
  return (
    <div 
    style={styles}
    className={styles.loading}>
        <CircularProgress size={70} />
    </div>
  )
}

export default LoadingFullNew