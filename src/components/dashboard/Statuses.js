"use client"
import styles from './allcont.module.css'
import { FaCheck } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { MdOutlineDoNotDisturb } from "react-icons/md";
import { WiTime9 } from "react-icons/wi";
import { fetchData, getNowDate } from '@/utils/functions';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Skeleton } from '@mui/material';

const Statuses = ({data,loading}) => {

  return (
    <div className={styles.statuses}>
        <h4 className={styles.el3}>Your Tasks Status</h4>

        {
          loading ?
          <>
          <div className={`${styles.comp} ${styles.noaf}`}>
            <Skeleton variant="circular" width={70} height={70} />
          </div>

          <div className={`${styles.comp} ${styles.noaf}`}>
            <Skeleton variant="circular" width={70} height={70} />
          </div>

          <div className={`${styles.comp} ${styles.noaf}`}>
            <Skeleton variant="circular" width={70} height={70} />
          </div>

          <div className={`${styles.comp} ${styles.noaf}`}>
            <Skeleton variant="circular" width={70} height={70} />
          </div>

          </>
          :

          <>
            <div className={styles.comp}>
              <span className={styles.sv}><FaCheck /></span>
              <span className={styles.num}>{(data && data.complete)?data.complete:0}</span>
              <h5>Complete</h5>
            </div>

            <div className={styles.pend}>
              <span className={styles.sv}><WiTime9 /></span>
              <span className={styles.num}>{(data && data.pending)?data.pending:0}</span>
              <h5>Pending</h5>
            </div>

            <div className={styles.canc}>
              <span className={styles.sv}><IoMdClose /></span>
              <span className={styles.num}>{(data && data.canceled)?data.canceled:0}</span>
              <h5>Canceled</h5>
            </div>

            <div className={styles.und}>
              <span className={styles.sv}><MdOutlineDoNotDisturb /></span>
              <span className={styles.num}>{(data && data.all)?data.all:0}</span>
              <h5>All</h5>
            </div>    
          </>
        }

        

    </div>
  )
}

export default Statuses