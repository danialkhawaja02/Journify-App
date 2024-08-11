import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"



export default function AuthLayout({children, authentication = true}) {
    const authStatus = useSelector((state) => state.auth.status)
    const [loader, setLoader] = useState(true);
    const navigate = useNavigate();


    useEffect(()=>{
        if(authentication && authStatus !== authentication)
            navigate("/login")
        else if (!authentication && authStatus !== authentication )
            navigate("/") 

        setLoader(false);
    },[authStatus, authentication, navigate])

    return(
        loader ?
        <h1>Loading ...</h1> : 
        <>{children}</>
    )
}