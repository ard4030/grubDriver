"use client"
import styles from './allcont.module.css'
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const MyBalance = () => {
  const {user} = useContext(AuthContext);
  const { t } = useTranslation();


  return (
    <div className={styles.blns}>
        <span>{t("Your Balance")}</span>
        <span>£{user && parseFloat(user.data.balance).toFixed(2)}</span>
        <Link href={"/home/reports"} className={styles.el1}>
            <p>{t("Report Earning")}</p>
            <MdOutlineArrowForwardIos />
        </Link>
    </div>
  )
}

export default MyBalance