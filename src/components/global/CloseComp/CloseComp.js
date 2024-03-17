"use client"
import { ViewContext } from '@/context/ViewContext'
import { useContext } from 'react'
import styles from './closecomp.module.css'

const CloseComp = () => {
  const {open , setOpen} = useContext(ViewContext)
  return (
    <>
    {open && <span
    onClick={() => setOpen(false)}
    className={styles.cls}>CloseComp</span>}
    </>
    
  )
}

export default CloseComp