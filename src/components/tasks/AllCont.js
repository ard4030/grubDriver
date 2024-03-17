"use client"
import TableView from '../global/MyTable/MyTable'
import styles from './allcont.module.css'
import { IoEyeOutline } from "react-icons/io5";
import { Box, Modal, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import MyModal from '../global/MyModal/MyModal';
import ViewDetails from './ViewDetails';
import Head from '../global/HeadComp/Head';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '@/context/AuthContext';

const AllCont = ({fromdt,todt}) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState(null);
  const { user } = useContext(AuthContext)

  const onOpenModal = (details) => {
    if(details.status === "complete"){
      setOpen(true)
      setDetails(details)
    }
  }

  const columns = [
    {
        title: '#',
        dataIndex: 'key',
        key: 'key',
        render: (_, record) => <span>{record.key}</span>,
    },
    {
        title: t("Order No"),
        dataIndex: 'order_id',
        key: 'order_id',
        render: (_, record) => <span>{record.order_id}</span>,
    },
    {
      title: t('Restaurant'),
      dataIndex: 'restaurant_name',
      key: 'restaurant_name',
      render: (_, record) => <span>{record.restaurant_name}</span>,
    },
    // {
    //   title: 'Type',
    //   dataIndex: 'type',
    //   key: 'type',
    //   render: (_, record) => <span>{record.type}</span>,
    // },
    {
      title: t('Time'),
      dataIndex: 'deliverydt',
      key: 'deliverydt',
      render: (_, record) => <span>{record.deliverydt}</span>,
    },
    {
      title: t('Name'),
      dataIndex: 'recipient_name',
      key: 'recipient_name',
      render: (_, record) => <span>{record.recipient_name}</span>,
    },
    // {
    //   title: 'Distance',
    //   dataIndex: 'distance',
    //   key: 'distance',
    //   render: (_, record) => <span>{record.distance}</span>,
    // },
    {
      title: t('End Task'),
      dataIndex: 'endtask_dt',
      key: 'endtask_dt',
      render: (_, record) => <span>{record.endtask_dt}</span>,
    },
    {
      title: t('Status'),
      dataIndex: 'status',
      key: 'status',
      render: (_, record) => <span className={`spnStatus ${record.status.toUpperCase()}`}>
        {record.status.toUpperCase()} {record.status.toUpperCase() === "COMPLATE" && `- ${record.balance}`}
        </span>,
    },
    {
      title: t('Action'),
      dataIndex: 'status',
      key: 'status',
      render: (_, record) => <div className='stc1'>
        {record.status === "complete" && <span onClick={() => onOpenModal(record)}><IoEyeOutline /></span>}
      </div>,
    },
    
  ];


  return (
    <div className={styles.allCont}>
      <Head title={"Tasks list"} />


      {
          user && user.data.status !== "active" ?
          <div className='noAct'>
            <h1>Your Account need to Active!</h1>
            <button>Go To Profile</button>
          </div>
      :

      <>
        <div className={styles.myContent}>
          <TableView
          columns={columns}
          api="/getMyTasks"
          fromdt={fromdt}
          todt={todt}
          />
        </div>
        <MyModal 
          open={open}
          title={t("Order Details")}
          onClose = {() => setOpen(false)}
          onOpen = {() => setOpen(true)}
          //  onOk = {() => SaveData(cat)}
          >
            <ViewDetails details={details} />
        </MyModal>
      </>
      
      }
    </div>
  )
}

export default AllCont