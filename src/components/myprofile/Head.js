"use client"
import { AuthContext } from '@/context/AuthContext'
import { Avatar } from '@mui/material'
import { deepOrange } from '@mui/material/colors'
import { useContext } from 'react'
import styles from './head.module.css'

const Head = ({title}) => {
  const {logOut,user} = useContext(AuthContext)
  return (
    <div className={styles.head}>
        <span>{title}</span>
        
        <div className={styles.el5}>
            <div className={styles.el6}>
                <h3>{`${user?.data?.first_name} ${user?.data?.last_name}`}</h3>
                <span onClick={() => logOut()}>Log Out</span>
            </div>

            <div>
                <Avatar sx={{ 
                bgcolor: deepOrange[500] ,
                width:50,
                height:50,
                margin:"auto"
                }}>N</Avatar>
            </div>
            
        </div>
    </div>
  )
}

export default Head