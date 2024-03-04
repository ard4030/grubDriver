"use client"
import Head from '../global/HeadComp/Head'
import styles from './allcont.module.css'
import NameWelcome from './NameWelcome';
import MyBalance from './MyBalance';
import Statuses from './Statuses';
import TaskView from './TaskView';
import ChartTask from './ChartTask';
import { fetchData, getNowDate } from '@/utils/functions';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

const AllCont = () => {
  const [data, setData] = useState(false);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    let data = {
      perpage:30,
      page:1,
      sortby:"delivery_date",
      fromdt:"2023-02-24 13:38",
      todt:getNowDate()
    }
    setLoading(true)
    const res = await fetchData('/getMyTasks','POST',data);
    if(res.success){
      if(res.data.code === 1){
        setData(res.data.details)
      }
    }else{
      toast.error(res.msg)
    }
    setLoading(false)
  }
  
  useEffect(() => {
    getData()
  }, [])


  return (
    <div>
        <Head title={"Dashboard"} />
        <div className={styles.myContent}>
            <div className={styles.contWel}>
              <NameWelcome />
              <MyBalance />
            </div>
            <Statuses data={data.static} loading={loading} />
            <div className={styles.charts}>
              <ChartTask />
              <TaskView loading={loading} tasks={data.rows} />
            </div>

            
        </div>
    </div>
  )
}

export default AllCont