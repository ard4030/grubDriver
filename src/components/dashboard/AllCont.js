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
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '@/context/AuthContext';

const AllCont = () => {
  const [data, setData] = useState(false);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const { user } = useContext(AuthContext);

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
        <Head title={t("Dashboard")} />
        {
          user && user.data.status !== "active" ?
          <div className='noAct'>
            <h1>Your Account need to Active!</h1>
            <button>Go To Profile</button>
          </div>
      :
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
        }
    </div>
  )
}

export default AllCont