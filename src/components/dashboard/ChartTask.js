import { fetchData, getNowDate } from '@/utils/functions';
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import styles from './allcont.module.css'
import ChartComp from './ChartComp';

const ChartTask = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false);

  const getData = async () =>{
    let myData = {
      perpage:30,
      page:1,
      sortby:"delivery_date",
      fromdt:"2023-02-24 13:38",
      todt:getNowDate()
    }
    setLoading(true)
    const res = await fetchData('/getStaticWeeks','POST',myData);
    if(res.success){
      if(res.data.code === 1){
        setData(res.data.details.chart)
      }
    }else{
      toast.error(res.data.msg)
    }
    // console.log("myyyyyy",res.data.details.chart)
    setLoading(false)
  }

  useEffect(() => {
    getData()
  }, [])
  
  return (
    <div>
        <h4 className={styles.el4}>Your Chart tasks</h4>
        <ChartComp data={data}  />
    </div>
  )
}

export default ChartTask