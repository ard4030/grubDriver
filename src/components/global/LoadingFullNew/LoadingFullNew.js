"use client"
import { AuthContext } from '@/context/AuthContext'
import { CircularProgress } from '@mui/material'
import { useContext } from 'react'
import style1 from './loadingfull.module.css'

const LoadingFullNew = ({styles={}}) => {
  return (
    <div 
    style={styles}
    className={style1.loading}>
        <CircularProgress size={70} />
    </div>
  )
}

export default LoadingFullNew