import Image from 'next/image'
import styles from './viewdetails.module.css'
import testBg from "@/public/Images/testbg.webp"
import { FaRegUser } from "react-icons/fa6";
import { HiOutlineMapPin } from "react-icons/hi2";
import { PiPhoneCallLight } from "react-icons/pi";
import { CiUser } from "react-icons/ci";
import { LoadingButton } from '@mui/lab';
import TaskImages from './TaskImages';
import MapLocation from './MapLocation';
import MapModal from './MapModal';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const ViewDetails = ({details}) => {
    const { t } = useTranslation()
    const [open, setOpen] = useState(false)
    let currentDate;
    let monthName;
    if(details){
        currentDate = new Date(details.deliverydt.substr(0,10));
        monthName = currentDate.toLocaleString('default', { month: 'long' });
    }

  return (
    <>
    {
    details && 
    <div className={styles.details}>
        <div className={styles.headDetails}>
            <div className={styles.elk}>
                <span>{t("Order No")} - {details.order_id}</span>
                <p>{t("Order Date")} <span>{currentDate.getDate()} {monthName.substring(0,3)} @{details.deliverydt.substr(11)}</span></p>
            </div>
            <div className={styles.contImage}> <Image fill src={testBg} /> </div>
        </div>

        <span className={styles.lengthItems}>{`${JSON.parse(details.json_details).length} ${t("Items")}`} </span>

        <div className={styles.contDetails}>
            <div className={styles.headDet}>
                <h5>{t("Customer Details")}</h5>
                <button onClick={() => setOpen(true)}>{t("GO TO DIRECTION")}</button>
            </div>

            <div className={styles.item}>
                <span className={styles.ico}><CiUser /></span>
                <span className={styles.naming}>John Smith</span>
            </div>

            <div className={styles.item}>
                <span className={styles.ico}><HiOutlineMapPin /></span>
                <span className={styles.naming}>{details.delivery_address} <span className={styles.dst}>{`(${t("Distance")} - ${parseFloat(details.distance).toFixed(2)} mi)`}</span></span>
            </div>

            <div className={styles.item}>
                <span className={styles.ico}><PiPhoneCallLight /></span>
                <span className={styles.naming}>{details.contact_number}</span>
            </div>

            <div className={styles.paymentPending}>
                <span>{`${t("Payment")} - ${t("Pending")} : `}</span>
                <span className={styles.el1}>£{(parseFloat(details.total_w_tax)-parseFloat(details.amount_paid)).toFixed(2)}</span>
            </div>
        </div>

        <div className={styles.deliveryDetails}>
            <h5>{t("Delivery Details")}</h5>
            <div className={styles.dlDet}>
                <div className={styles.el2}>
                    <span>{t("Recipient Name")}</span>
                    <span>John Smith</span>
                </div>
                <span className={styles.ch}>{t("CHANGE")}</span>
            </div>
        </div>

        <TaskImages images={details.images.split("|SEP|")} />

        {open && <MapModal open={open} setClose={() => setOpen(false)} />}
    </div>
    }
    </>

  )
}

export default ViewDetails