import { fetchData } from '@/utils/functions'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { IoEyeOutline } from 'react-icons/io5'
import Head from '../global/HeadComp/Head'
import TableView from '../global/MyTable/MyTable'
import styles from './allcont.module.css'
import BalanceDetails from './BalanceDetails'
import ChartMe from './ChartMe'

const AllCont = () => {
    const [tableData,setTableData] = useState("")
    const router = useRouter();
    // console.log("****",tableData)

    const columns = [
        {
            title: '#',
            dataIndex: 'key',
            key: 'key',
            render: (_, record) => <span>{record.key}</span>,
        },
        {
            title: 'From Date',
            dataIndex: 'fromdt',
            key: 'fromdt',
            render: (_, record) => <span>{record.fromdt}</span>,
        },
        {
            title: 'To Date',
            dataIndex: 'todt',
            key: 'todt',
            render: (_, record) => <span>{record.todt}</span>,
        },
        {
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
            render: (_, record) => <span>{record.total}</span>,
        },
        {
            title: 'Distance',
            dataIndex: 'distance',
            key: 'distance',
            render: (_, record) => <span>{record.distance}</span>,
        },
        {
            title: 'Sum',
            dataIndex: 'sum',
            key: 'sum',
            render: (_, record) => <span>{record.sum}</span>,
        },
        {
            title: 'Action',
            dataIndex: 'status',
            key: 'status',
            render: (_, record) => <div className='stc1'>
                {console.log(record.fromdt)}
              <span onClick={() => router.push(`/home/tasks?fromdt=${record.fromdt}&todt=${record.todt}`)}><IoEyeOutline /></span>
            </div>,
          },
        

        
    ];
    
  return (
    <div>
        <Head title={"Report Earning"} />
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
    </div>
  )
}

export default AllCont