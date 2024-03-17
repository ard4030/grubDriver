"use client"
import TableView from '../global/MyTable/MyTable'
import styles from './allcont.module.css'
import { IoEyeOutline } from "react-icons/io5";
import { Box, FormControl, InputLabel, MenuItem, Modal, Select, TextField, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import MyModal from '../global/MyModal/MyModal';
import ViewDetails from './ViewDetails';
import { AuthContext } from '@/context/AuthContext';
import { fetchData } from '@/utils/functions';
import { LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Head from '../global/HeadComp/Head';
import { useTranslation } from 'react-i18next';

const AllCont = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [bAccounts, setBaccounts] = useState([]);
  const [myData, setMyData] = useState({
    amount:"0",
    acc_id:""
  });
  const {user} = useContext(AuthContext)
  const [refresh, setRefresh] = useState(false);
  const { t } = useTranslation();


  const onOpenModal = (details) => {
      setOpen(true)
      setDetails(details)
  }

  const columns = [
    {
        title: '#',
        dataIndex: 'key',
        key: 'key',
        render: (_, record) => <span>{record.key}</span>,
    },
    {
        title: t("Id"),
        dataIndex: 'withdrawal_id',
        key: 'withdrawal_id',
        render: (_, record) => <span>{record.withdrawal_id}</span>,
    },
    {
      title: t("Amount"),
      dataIndex: 'amount',
      key: 'amount',
      render: (_, record) => <span>£{parseInt(record.amount).toFixed(2)}</span>,
    },
    // {
    //   title: 'Type',
    //   dataIndex: 'type',
    //   key: 'type',
    //   render: (_, record) => <span>{record.type}</span>,
    // },
    {
      title: t("Time"),
      dataIndex: 'date_created',
      key: 'date_created',
      render: (_, record) => <span>{record.date_created}</span>,
    },

    {
      title: t("Status"),
      dataIndex: 'status',
      key: 'status',
      render: (_, record) => <span className={`spnStatus ${record.status.toUpperCase()}`}>
        {record.status.toUpperCase()} {record.status.toUpperCase() === "COMPLATE" && `- ${record.balance}`}
        </span>,
    },
    {
      title: t("Action"),
      dataIndex: 'status',
      key: 'status',
      render: (_, record) => <div className='stc1'>
        <span onClick={() => onOpenModal(record)}><IoEyeOutline /></span>
      </div>,
    },
    
  ];

  const getBankAccounts = async () => {
    setLoading(true)
    const res =  await fetchData('/getAccountsBank','POST',{});
    if(res.success){
        if(res.data.code === 1){
            setBaccounts(res.data.details.rows)
            setMyData({...myData,acc_id:res.data.details.rows[0]?res.data.details.rows[0].acc_id:""})
        }else{

        }
    }else{

    }

    setLoading(false)
  }

  useEffect(() => {
    getBankAccounts()
    // getBalance()
  }, [])

  const SendRequest = async () => {
    setLoading(true)
    const res = await fetchData('/saveWithdrawal','POST',myData);
    if(res.success){
      if(res.data.code === 1){
        toast.success("Withdrawal Created!")
        setRefresh(!refresh)
        setOpenDialog(false)
      }else{
        toast.error(res.data.msg)
      }
    }
    setLoading(false)
  }

  const getBalance = async () => {
    setLoading(true)
    const res = await fetchData('/getStaticBalance','POST',{});
    setLoading(false)
  }


  return (
    <div className={styles.allCont}>
      <Head title={t("Withdrawals")} />
      {
          user && user.data.status !== "active" ?
          <div className='noAct'>
            <h1>Your Account need to Active!</h1>
            <button>Go To Profile</button>
          </div>
      :
      <>
        <div className={styles.myContent}>
          {
            user && parseFloat(user.data.balance) > 0 && 
            <button 
            onClick={() => setOpenDialog(true)}
            className={styles.rqw}>{t("Request Withdrawal")}</button>
          }
          <TableView
          columns={columns}
          api="/getWithdrawals"
          refresh={refresh}
          />
        </div>

        <MyModal 
          open={open}
          title={`${t("Widthdrawal")} #${details?details.withdrawal_id:""}`}
          onClose = {() => setOpen(false)}
          onOpen = {() => setOpen(true)}
          //  onOk = {() => SaveData(cat)}
          >
            <ViewDetails details={details} />
        </MyModal>

        <MyModal 
          open={openDialog}
          title={`${t("Widthdrawal")} #${details?details.withdrawal_id:""}`}
          onClose = {() => setOpenDialog(false)}
          onOpen = {() => setOpenDialog(true)}
          showHeader={false}
          showFooter = {false}
          //  onOk = {() => SaveData(cat)}
          >
            <div className={styles.el1}>
              <span className={styles.el2}>{t("Amount")}</span>
              <span className={styles.el3}>£</span>
              <input 
              placeholder='5'
              value={myData.amount}
              onChange={(e) => setMyData({...myData,amount:e.target.value})}
              />
            </div>

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">{t("Bank Account")}</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={myData.acc_id}
                label={t("Bank Account")}
                onChange={(e) => setMyData({...myData,acc_id:e.target.value})}
              >
                {
                  bAccounts.map((item,index) => 
                  <MenuItem key={index} value={item.acc_id}>
                    <span>{item.account_name}</span>
                    <span>&nbsp;{` (${item.bank_account_number})`}</span>
                  </MenuItem>
                  
                  )
                }
              </Select>
            </FormControl>

            <LoadingButton 
            onClick={SendRequest}
            style={{margin:"auto",marginTop:"20px"}}
            loading={loading} variant="outlined">
              {t("Save")}
            </LoadingButton>

            {/* <TextField
            variant='contained'
            label="Bank Account"
            /> */}
        </MyModal> 
      </>
      
      }

      
    </div>
  )
}

export default AllCont