'use client'
import styles from './sidebarpanel.module.css'
import profilePhoto from "@/public/Images/manprof.png"
import Image from 'next/image'
import { GoHomeFill } from "react-icons/go";
import { FaUserLarge } from "react-icons/fa6";
import { FaClipboardList } from "react-icons/fa";
import { HiDocumentReport } from "react-icons/hi";
import { RiMoneyEuroCircleFill } from "react-icons/ri";
import { BsBank2 } from "react-icons/bs";
import { MdPassword } from "react-icons/md";
import { LiaAffiliatetheme } from "react-icons/lia";
import { useContext, useEffect } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { Chip } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import LanguageChanger from '../global/LanguageChanger/LanguageChanger';
import { useTranslation } from 'react-i18next';
import { ViewContext } from '@/context/ViewContext';

const SidebarPanel = () => {
  const {user,loading} = useContext(AuthContext);
  const {open,setOpen} = useContext(ViewContext)
  const { t } = useTranslation();
  const pathName = usePathname();
  const router = useRouter();

  useEffect(() => {
    // suspended
    if(!user && !loading){
      router.push('/')
    }

    if(user && !loading){
      if(user.data.status === "suspended") router.push('/home/myprofile')
    }
  }, [user])
  


  return (
    <div className={`${styles.sideBar} ${open && "opening"}`}>

      {/* Top Profile*/}
      <div className={styles.topProf}>
        <span className={styles.logo}></span>
        <span className={styles.textLogo}>Grub Driver</span>
      </div>

      <div className={styles.sectionList}>
        <span>{t("General")}</span>
        <ul>

          {
             user && user.data.status === "active" && 
            <li 
            onClick={() => {
              setOpen(false)
              router.push('/home/dashboard')
            }}
            className={`${pathName === "/home/dashboard" && styles.active}`}
            >
              <GoHomeFill />
              <span>{t("Home")}</span>
            </li>
          }
          

          <li 
          onClick={() => {
            setOpen(false)
            router.push('/home/myprofile')
          }}
          className={`${pathName === "/home/myprofile" && styles.active}`}
          >
            <FaUserLarge />
            <span>{t("My profile")}</span>
          </li>

          {
            user && user.data.status === "active" && 
            <>
              <li 
              onClick={() => {
                setOpen(false)
                router.push('/home/tasks')
              }}
              className={`${pathName === "/home/tasks" && styles.active}`}
              >
                <FaClipboardList />
                <span>{t("All Tasks")}</span>
              </li>

              <li 
              onClick={() => {
                setOpen(false)
                router.push('/home/reports')
              }}
              className={`${pathName === "/home/reports" && styles.active}`}
              >
                <HiDocumentReport />
                <span>{t("Report")}</span>
              </li>

              <li 
              onClick={() => {
                setOpen(false)
                router.push('/home/financial')
              }}
              className={`${pathName === "/home/financial" && styles.active}`}
              >
                <RiMoneyEuroCircleFill />
                <span>{t("Financial")}</span>
              </li>

              <li 
              onClick={() => {
                setOpen(false)
                router.push('/home/bankaccounts')
              }}
              className={`${pathName === "/home/bankaccounts" && styles.active}`}
              >
                <BsBank2 />
                <span>{t("Bank Accounts")}</span>
              </li>
            </>
          }

          
        </ul>
      </div>

      <div className={styles.sectionList}>
        <span>{t("Setting")}</span>
        <ul>
          <li 
          onClick={() => {
            setOpen(false)
            router.push('/home/changepassword')
          }}
          className={`${pathName === "/home/changepassword" && styles.active}`}
          >
            <MdPassword />
            <span>{t("Change Password")}</span>
          </li>

          <li >
            <LiaAffiliatetheme />
            <span>{t("Darkmod")}</span>
          </li>
        </ul>
      </div>
      <LanguageChanger left={"7%"} />
    </div>
  )
}

export default SidebarPanel