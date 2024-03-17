import { Button, FormControl, InputLabel, MenuItem, Select, Switch, TextField } from '@mui/material'
import styles from './allcount.module.css'
import { FaPlus } from "react-icons/fa";
import { useContext, useEffect, useState } from 'react';
import { fetchData, listcountry } from '@/utils/functions';
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import MyModal from '../global/MyModal/MyModal';
import { toast } from 'react-toastify';
import { Popconfirm } from 'antd';
import Head from '../global/HeadComp/Head';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '@/context/AuthContext';

const AllCont = () => {
    const { t } = useTranslation();
    const [data, setData] = useState([]);
    const [loading, setloading] = useState(false);
    const [open, setOpen] = useState(false);
    const {user} = useContext(AuthContext)
    const countrys = listcountry();
    const [account,setAccount] = useState({
        account_name:"",
        bank_account_number:"",
        bank_branch:"",
        bank_country:"",
        bank_name:"",
        swift_code:"",
        isdefault:0,
        acc_id:0
    })
    

    useEffect(() => {
        getData()
    }, [])
    
    const getData = async () => {
        setloading(true)
        const res =  await fetchData('/getAccountsBank','POST',{});
        if(res.success){
            if(res.data.code === 1){
                setData(res.data.details.rows)
            }else{

            }
        }else{

        }

        setloading(false)
    }

    const handleChange = (e) => {
        e.preventDefault();
        setAccount({...account,[e.target.name]:e.target.value})
    }

    const SaveData = async () => {
        setloading(true)
        const formData = new FormData();
        formData.append("data",JSON.stringify(account));
        formData.append("token",localStorage.getItem("driverToken"))
        formData.append("api_key",process.env.NEXT_PUBLIC_API_KEY)
        const res = await fetchData('/saveAccountBankWeb','POST',{},formData);
        if(res.success){
            if(res.data.code === 1){
                toast.success("Save Data Success!")
                setAccount({
                    account_name:"",
                    bank_account_number:"",
                    bank_branch:"",
                    bank_country:"",
                    bank_name:"",
                    swift_code:"",
                    isdefault:0,
                    acc_id:0
                })
                setOpen(false)
                await getData()
            }else{
                toast.error(res.data.msg)
            }
        }
        setloading(false)
    }

    const changeDefault = async (id) => {
        setloading(true)
        const res = await fetchData('/setDefaultAccountBank','POST',{id:parseInt(id)});
        if(res.success){
            if(res.data.code === 1){
                toast.success("Changed Success!")
                await getData()
            }else{
                toast.error(res.data.msg)
            }
        }
        setloading(false)
    }

    const deleteAccount = async (id) => {
        setloading(true)
        const res = await fetchData('/deleteAccountBank','POST',{id:parseInt(id)});
        if(res.success){
            if(res.data.code === 1){
                toast.success("Delete Success!")
                await getData()
            }else{
                toast.error(res.data.msg)
            }
        }
        setloading(false)
    }

    const closeModal = () => {
        setAccount({
            account_name:"",
            bank_account_number:"",
            bank_branch:"",
            bank_country:"",
            bank_name:"",
            swift_code:"",
            isdefault:0,
            acc_id:0
        })
        setOpen(false)
    } 


  return (
    <div>
        <Head title={t("Bank Accounts")} />
        {
          user && user.data.status !== "active" ?
          <div className='noAct'>
            <h1>Your Account need to Active!</h1>
            <button>Go To Profile</button>
          </div>
      :
      <>
        <div className={styles.myContent}>
            <header>
                <div></div>
                <Button 
                onClick={() => setOpen(true)}
                style={{background:"#0a99ff"}}
                variant='contained'>
                <FaPlus /> &nbsp;  {t("Add New")}
                </Button>
            </header>

            {
                data.map((item,index) => 
                    <div key={index} className={`${styles.item} ${item.isdefault === "1" && styles.act}`}>

                        <div className={styles.action}>
                            <span onClick={() => {
                                setAccount(item)
                                setOpen(true)
                            }}><FiEdit /></span>
                            <Popconfirm
                                title={t("Delete the task")}
                                description={t("Are you sure to delete this task?")}
                                onConfirm={() => deleteAccount(item.acc_id)}
                                // onCancel={cancel}
                                okText={t("Yes")}
                                cancelText={t("No")}
                            >
                                <span><MdDeleteOutline /></span>
                            </Popconfirm>
                            
                            {item.isdefault === "0" && <span onClick={() => changeDefault(item.acc_id)}><FaCheck /></span>}
                        </div>

                        <span className={styles.bName}>{item.bank_name}</span>
                        <span className={styles.bBranch}>{item.bank_branch}</span>
                        <div className={styles.number}>
                            <span>{item.bank_account_number.substring(0,4)}</span>
                            <span>{item.bank_account_number.substring(4,8)}</span>
                            <span>{item.bank_account_number.substring(8,12)}</span>
                        </div>
                        <div className={styles.aName}>
                            <span>{item.account_name}</span>
                            <span>{item.swift_code}</span>
                        </div>

                    </div>
                )
            }
        </div>

        <MyModal 
         open={open}
         loadingBtnText={`${account.acc_id > 0 ? t("Edit") :t("Create")}`}
         loadingBtnLoading={loading}
         loadingBtn={true}
         loadingBtnClick={() => SaveData()}
         title={t("Save")}
         onClose = {() => closeModal()}
         onOpen = {() => setOpen(true)}
        //  onOk = {() => SaveData(cat)}
        >
          <TextField 
          style={{marginBottom:"15px"}}
          fullWidth 
          id="outlined-basic" 
          label={t("Holder's Name")} 
          value={account.account_name}
          onChange={handleChange}
          name="account_name"
          variant="outlined" />
          
          <TextField 
          style={{marginBottom:"15px"}}
          fullWidth 
          value={account.bank_account_number}
          onChange={handleChange}
          name="bank_account_number"
          id="outlined-basic" 
          label={t("Account Number")} 
          variant="outlined" />
          
          <TextField 
          style={{marginBottom:"15px"}}
          fullWidth 
          value={account.swift_code}
          onChange={handleChange}
          name="swift_code"
          id="outlined-basic" 
          label={t("Sort Code")} 
          variant="outlined" />

          <TextField 
          style={{marginBottom:"15px"}}
          fullWidth 
          id="outlined-basic" 
          value={account.bank_name}
          onChange={handleChange}
          name="bank_name"
          label={t("Bank Name in Full")} 
          variant="outlined" />

          <TextField 
          style={{marginBottom:"15px"}}
          fullWidth 
          value={account.bank_branch}
          onChange={handleChange}
          name="bank_branch"
          id="outlined-basic" 
          label={t("Bank Branch City")} 
          variant="outlined" />

        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{t("Bank Branch Country")}</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={account.bank_country}
            onChange={handleChange}
            name="bank_country"
        >
            {
                Object.values(countrys).map((item,index) => 
                    <MenuItem key={index} value={Object.keys(countrys)[index]}>
                        {item}
                    </MenuItem>
                )
            }

        </Select>
        </FormControl>

          <div className={styles.lb1}>
                <label>Default Account</label>
                <Switch 
                onChange={() => setAccount({...account,isdefault:account.isdefault === 0?1:0})}
                checked={parseInt(account.isdefault) === 1?true:false } />   
          </div>  

        </MyModal>
      </>
      }
    </div>
  )
}

export default AllCont