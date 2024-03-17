"use client"
import { fetchData } from "@/utils/functions";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AuthContext = createContext();
export const AuthWrapper = ({children}) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(false);
    const router = useRouter();

    const isLogin = async () => {
        setLoading(true)
        const res = await fetchData('/validateDriver','POST',{});
        if(res.success){
            if(res.data.code === 1){
                setUser(res.data.details)
                if(res.data.details.data.status === "active"){
                    router.replace('/home/dashboard')
                }else{
                    router.replace('/home/myprofile')
                }
                // router.replace('/home/dashboard')
            }else{
                setUser(null)
                router.replace('/')
                // toast.error(res.data.msg)
            }
        }else{
            toast.error(res.data.msg)
        }
        setLoading(false)
    }

    const loginUser = async (details) => {
        setLoading(true)
        const res = await fetchData('/validateDriver','POST',details);
        setLoading(false)
        if(res.success){
          if(res.data.code === 1){
            toast.success("Login Successful!")
            localStorage.setItem("driverToken",res.data.details.token)
            setUser(res.data.details)
            if(res.data.details.data.status === "active"){
                router.replace('/home/dashboard')
            }else{
                router.replace('/home/myprofile')
            }
          }else{
            toast.error(res.data.msg)
          }
        }else{
          toast.error(res.error)
        }

    }

    const logOut = async () => {
        localStorage.removeItem("driverToken");
        isLogin()
    }


    useEffect(() => {
        isLogin();
    }, [])
    

    return(
        <AuthContext.Provider value={{loginUser,loading,user,logOut}}>
            {children}
        </AuthContext.Provider>
    )
}