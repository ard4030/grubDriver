"use client"
import { AuthContext } from '@/context/AuthContext'
import { fetchData } from '@/utils/functions'
import { useRouter } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IoEyeOutline } from 'react-icons/io5'
import Head from '../global/HeadComp/Head'
import TableView from '../global/MyTable/MyTable'
import styles from './allcont.module.css'
import BalanceDetails from './BalanceDetails'
import ChartMe from './ChartMe'

const AllCont = () => {
    const [tableData,setTableData] = useState("")
    const router = useRouter();
    const { t } = useTranslation();
    const { user } = useContext(AuthContext)

    const columns = [
        {
            title: '#',
            dataIndex: 'key',
            key: 'key',
            render: (_, record) => <span>{record.key}</span>,
        },
        {
            title: t("From Date"),
            dataIndex: 'fromdt',
            key: 'fromdt',
            render: (_, record) => <span>{record.fromdt}</span>,
        },
        {
            title: t("To Date"),
            dataIndex: 'todt',
            key: 'todt',
            render: (_, record) => <span>{record.todt}</span>,
        },
        {
            title: t("Total"),
            dataIndex: 'total',
            key: 'total',
            render: (_, record) => <span>{record.total}</span>,
        },
        {
            title: t("Distance"),
            dataIndex: 'distance',
            key: 'distance',
            render: (_, record) => <span>{record.distance}</span>,
        },
        {
            title: t("Sum"),
            dataIndex: 'sum',
            key: 'sum',
            render: (_, record) => <span>{record.sum}</span>,
        },
        {
            title: 'Action',
            dataIndex: 'status',
            key: 'status',
            render: (_, record) => <div className='stc1'>
                
              <span onClick={() => router.push(`/home/tasks?fromdt=${record.fromdt}&todt=${record.todt}`)}><IoEyeOutline /></span>
            </div>,
          },
        

        
    ];
    
  return (
    <div>
        <Head title={t("Report Earning")} />
        {
          user && user.data.status !== "active" ?
          <div className='noAct'>
            <h1>Your Account need to Active!</h1>
            <button>Go To Profile</button>
          </div>
      :
        <div className={styles.myContent}>
            <div className={styles.topDetails}>
                <BalanceDetails />
                <ChartMe data={tableData?.data?.details?.chart} />
            </div>

            <TableView 
            columns={columns}
            dataSet={true}
            dataSetMethod={setTableData}
            api={"/getStaticWeeks"}
            />
        </div>
      
      }
    </div>
  )
}

export default AllCont