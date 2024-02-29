"use client"
import { fetchData } from "@/utils/functions";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const ProfileContext = createContext();
export const ProfileWrapper = ({children}) => {
    const [details, setDetails] = useState({
        phone:"",
        transport_type_id:"car",
        first_name:"",
        last_name:"",
        username:"",
        email:"",
        password:"",
        repassword:"",
        licence_plate:"",
        color:"",
        documents:{},
        transport_description:""
    })
    const [error,setError] = useState({});
    const [loading,setLoading] = useState(false);

    const getData = async () => {
        setLoading(true)
        const res = await fetchData('/validateDriver','POST',{});
        if(res.success){
            if(res.data.code === 1){
                setDetails({
                    first_name:res.data.details.data.first_name,
                    last_name:res.data.details.data.last_name,
                    phone:res.data.details.data.phone,
                    transport_type_id:res.data.details.data.transport_type_id,
                    username:res.data.details.data.username,
                    email:res.data.details.data.email,
                    licence_plate:res.data.details.data.licence_plate,
                    color:res.data.details.data.color,
                    documents:res.data.details.data.documents,
                    transport_description:res.data.details.data.transport_description
                })
            }else{
               
            }
        }else{
            toast.error(res.data.msg)
        }
        setLoading(false)
    }

    const saveData = async () => {
        setLoading(true)
        let x = details;
        x['documents'] = JSON.stringify(details.documents)
        console.log(x)
        const res = await fetchData('/updateProfile','POST',x);
        if(res.success){
            if(res.data.code === 1){
                toast.success(res.data.msg);
                await getData()
            }else{
                // toast.error(res.data.msg)
            }
        }else{
            toast.error(res.data.msg)
        }
        setLoading(false)
    }

    useEffect(() => {
        getData()
    }, [])
    

    return (
        <ProfileContext.Provider value={{
            details, setDetails,
            loading,setLoading,
            error,setError,
            getData,saveData
        }}>
            {children}
        </ProfileContext.Provider>
    )
}