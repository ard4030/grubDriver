"use client"
import { AuthContext } from '@/context/AuthContext'
import { ProfileContext } from '@/context/ProfileContext'
import { LoadingButton } from '@mui/lab'
import { Avatar } from '@mui/material'
import { deepOrange } from '@mui/material/colors'
import { useContext, useState } from 'react'
import LoadingFull from '../global/LoadingFull/LoadingFull'
import LoadingFullNew from '../global/LoadingFullNew/LoadingFullNew'
import AccountDetails from './AccountDetails'
import styles from './allcont.module.css'
import Head from './Head'
import LicenseImagesComp from './LicenseImagesComp'


const AllCont = () => {
    const {loading,saveData} = useContext(ProfileContext);
  return (
    <div 
    onClick={() => console.log(loading)}
    className={styles.allCont}>
        <Head title={"Account"} />
        {loading && <LoadingFullNew />}
        <div className={styles.myContent}>

            <div className={styles.left}>
                <AccountDetails />
                <LicenseImagesComp />
            </div>

            <div className={styles.right}>
                {/* Profile Picture */}
                <div className={styles.profPic}>
                    <Avatar sx={{ 
                        bgcolor: deepOrange[500] ,
                        width:100,
                        height:100,
                        margin:"auto"
                    }}>N</Avatar>
                    
                    <div className={styles.nameProf}>
                        <h3>AliReza Delbari</h3>
                        <span></span>
                    </div>
                </div>
                
            </div>

            <div className={styles.footerBotton}>
                <LoadingButton 
                loading={loading} 
                onClick={() => saveData()}
                size={"large"}
                variant="contained">
                    <span>Save</span>
                </LoadingButton>
            </div> 
        </div>
    </div>
  )
}

export default AllCont