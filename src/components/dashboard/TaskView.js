import styles from './allcont.module.css'
import { MdOutlineArrowForwardIos } from "react-icons/md";
import LoadingFullNew from '../global/LoadingFullNew/LoadingFullNew';
import Link from 'next/link';

const TaskView = ({tasks=[],loading}) => {
  
  return (
    <div className={`${tasks.length < 1 && styles.lk}`}>
                <h4 
                className={styles.el4}>Your Tasks Status</h4>

                {
                  loading?
                  <LoadingFullNew
                  styles={{display:"flex",justifyContent:"center",alignItems:"center",minHeight:"300px"}}
                  />
                  : tasks && (tasks.length < 1)?
                  <div> No data found!</div>
                  :
                <div className={styles.myTable}>
                  <div  className={styles.head}>
                      <span>#</span>
                      <span>id</span>
                      <span>From Date</span>
                      <span>status</span>
                  </div>

                  {
                    tasks && tasks.length > 0 && tasks.map((item,index) =>{
                      if(index < 5){
                      return <div key={index} className={styles.rows}>
                          <span>{index+1}</span>
                          <span>{item.task_id}</span>
                          <span>{item.delivery_date.substr(0,10)}</span>
                          <span className={`${styles.el8} ${item.status.toUpperCase()}`}>{item.status}</span>
                        </div>
                      }
                    })
                  }
                    
                </div>
                }
                

                {tasks.length > 0 && 
                <Link href={'/home/reports'} className={`${styles.el1} ${styles.el7}`}>
                <p>Show All Tasks</p>
                <MdOutlineArrowForwardIos />
              </Link>}
              </div>
  )
}

export default TaskView