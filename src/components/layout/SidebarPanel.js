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
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { Chip } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';

const SidebarPanel = () => {
  const {user,loading} = useContext(AuthContext);
  const pathName = usePathname();
  const router = useRouter();

  if(!user && !loading){
    router.push('/')
  }


  return (
    <div className={styles.sideBar}>

      {/* Top Profile*/}
      <div className={styles.topProf}>
        <span className={styles.logo}></span>
        <span className={styles.textLogo}>Grub Driver</span>
      </div>

      <div className={styles.sectionList}>
        <span>General</span>
        <ul>
          <li 
          onClick={() => router.push('/home/dashboard')}
          className={`${pathName === "/home/dashboard" && styles.active}`}
          >
            <GoHomeFill />
            <span>Home</span>
          </li>

          <li 
          onClick={() => router.push('/home/myprofile')}
          className={`${pathName === "/home/myprofile" && styles.active}`}
          >
            <FaUserLarge />
            <span>My profile</span>
          </li>

          <li 
          onClick={() => router.push('/home/tasks')}
          className={`${pathName === "/home/tasks" && styles.active}`}
          >
            <FaClipboardList />
            <span>All Tasks</span>
          </li>

          <li 
          onClick={() => router.push('/home/reports')}
          className={`${pathName === "/home/reports" && styles.active}`}
          >
            <HiDocumentReport />
            <span>Report</span>
          </li>

          <li 
          onClick={() => router.push('/home/financial')}
          className={`${pathName === "/home/financial" && styles.active}`}
          >
            <RiMoneyEuroCircleFill />
            <span>Financial</span>
          </li>

          <li 
          onClick={() => router.push('/home/bankaccounts')}
          className={`${pathName === "/home/bankaccounts" && styles.active}`}
          >
            <BsBank2 />
            <span>Bank Accounts</span>
          </li>
        </ul>
      </div>

      <div className={styles.sectionList}>
        <span>Setting</span>
        <ul>
          <li 
          onClick={() => router.push('/home/changepassword')}
          className={`${pathName === "/home/changepassword" && styles.active}`}
          >
            <MdPassword />
            <span>Change Password</span>
          </li>

          <li >
            <LiaAffiliatetheme />
            <span>Darkmod</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default SidebarPanel