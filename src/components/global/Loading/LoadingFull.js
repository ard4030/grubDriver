"use client"
import { AuthContext } from '@/context/AuthContext'
import { CircularProgress } from '@mui/material'
import { useContext } from 'react'
import styles from './loadingfull.module.css'

const Loading = ({minHeight}) => {

  return (

    <div 
    style={{minHeight:minHeight?minHeight:"300px"}}
    className={styles.loading}>
        <CircularProgress size={70} />
    </div>

  )
}

export default Loading