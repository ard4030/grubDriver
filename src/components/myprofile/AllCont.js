"use client"
import { AuthContext } from '@/context/AuthContext'
import { ProfileContext } from '@/context/ProfileContext'
import { Alert, LoadingButton } from '@mui/lab'
import { useContext} from 'react'
import { useTranslation } from 'react-i18next'
import Head from '../global/HeadComp/Head'
import LoadingFullNew from '../global/LoadingFullNew/LoadingFullNew'
import AccountDetails from './AccountDetails'
import styles from './allcont.module.css'
import LicenseImagesComp from './LicenseImagesComp'
import ProfilePic from './ProfilePic'


const AllCont = () => {
    const {loading,saveData} = useContext(ProfileContext);
    const { t } = useTranslation();
    const { user } = useContext(AuthContext)
    
  return (
    <div 
    className={styles.allCont}>
        <Head title={t("Account")} />
        {loading && <LoadingFullNew />}
        <div className={styles.myContent}>
            <div className={styles.left}>
                <AccountDetails />
                { user && user.data.status !== "active" && 
                <LicenseImagesComp />
                }
            </div>

            <div className={styles.right}>
                {/* Profile Picture */}
                <ProfilePic />
                
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