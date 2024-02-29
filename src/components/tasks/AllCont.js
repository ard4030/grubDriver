"use client"
import TableView from '../global/MyTable/MyTable'
import Head from '../myprofile/Head'
import styles from './allcont.module.css'
import { IoEyeOutline } from "react-icons/io5";
import { Box, Modal, Typography } from '@mui/material';
import { useState } from 'react';
import MyModal from '../global/MyModal/MyModal';
import ViewDetails from './ViewDetails';

const AllCont = ({fromdt,todt}) => {

  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState(null);
  console.log("*-*-*",fromdt,todt)


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
        title: 'Order No',
        dataIndex: 'order_id',
        key: 'order_id',
        render: (_, record) => <span>{record.order_id}</span>,
    },
    {
      title: 'Restaurant',
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
      title: 'Time',
      dataIndex: 'deliverydt',
      key: 'deliverydt',
      render: (_, record) => <span>{record.deliverydt}</span>,
    },
    {
      title: 'Name',
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
      title: 'End Task',
      dataIndex: 'endtask_dt',
      key: 'endtask_dt',
      render: (_, record) => <span>{record.endtask_dt}</span>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (_, record) => <span className={`spnStatus ${record.status.toUpperCase()}`}>
        {record.status.toUpperCase()} {record.status.toUpperCase() === "COMPLATE" && `- ${record.balance}`}
        </span>,
    },
    {
      title: 'Action',
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
         title={"Order Details"}
         onClose = {() => setOpen(false)}
         onOpen = {() => setOpen(true)}
        //  onOk = {() => SaveData(cat)}
        >
          <ViewDetails details={details} />
        </MyModal>
    </div>
  )
}

export default AllCont