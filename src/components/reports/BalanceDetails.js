import { fetchData } from '@/utils/functions'
import { Skeleton } from '@mui/material'
import { useEffect, useState } from 'react'
import Loading from '../global/Loading/LoadingFull'
import styles from './allcont.module.css'
import { IoIosArrowForward } from "react-icons/io";

const BalanceDetails = () => {
    const [data, setData] = useState(false)
    const [loading, setLoading] = useState(false)

    const getData = async () => {
        setLoading(true)
        const res = await fetchData('/getStaticBalance','POST',{});
        if(res.success){
            if(res.data.code === 1){
                setData(res.data.details)
            }
        }else{

        }
        console.log(res)
        setLoading(false)
    }

    useEffect(() => {
      getData();
    }, [])
    

  return (
    <>
    {
        loading?
        <Loading />
        :
        <div>
            <span>This Week</span>
            <div className={styles.es1}>
                £<span>{data?.week_balance?.toFixed(2)}</span>
                <span className={styles.es5}><IoIosArrowForward /></span>
            </div>

            <span>Balance £{data?.balance?.toFixed(2)}</span>
            <p className={styles.es2}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry
            </p>
        </div>
    }
    </>
    
  )
}

export default BalanceDetails