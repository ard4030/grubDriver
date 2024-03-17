"use client"
import { AuthContext } from '@/context/AuthContext'
import { Avatar } from '@mui/material'
import { deepOrange } from '@mui/material/colors'
import { useContext } from 'react'
import styles from './head.module.css'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'
import { LuMenu } from "react-icons/lu";
import { ViewContext } from '@/context/ViewContext'

const Head = ({title}) => {
  const {logOut,user} = useContext(AuthContext);
  const {setOpen,open} = useContext(ViewContext)
  const { t } = useTranslation();

  return (
    <div className={styles.head}>
        <div className={styles.eun}>
          <div className={styles.bhg} onClick={() => setOpen(!open)}><LuMenu /></div> 
          <span> 
            {t('titleHead',{ title })}
          </span>
        </div>

        <div className={styles.el5}>
            <div className={styles.el6}>
                <h3>{`${user?.data?.first_name} ${user?.data?.last_name}`}</h3>
                <span onClick={() => logOut()}>{t("Log Out")}</span>
            </div>

            <div style={{display:"flex"}}>
              {
                user?.data?.photourl?
                <Image 
                style={{borderRadius:"100px"}}
                src={user?.data?.photourl} width={50} height={50} alt="profile picture" />
                :
              <Avatar sx={{ 
                bgcolor: deepOrange[500] ,
                width:50,
                height:50,
                margin:"auto"
                }}>N</Avatar>
              }
                
            </div>
            
        </div>
    </div>
  )
}

export default Head