import { LoginMethodIcon } from "hugeicons-react"
import img from "../../assets/account.svg"
import {useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import Button from "../GeneralComponents/Button"
import Input from "../GeneralComponents/Input"
import {useDispatch} from "react-redux"
import { login as authLogin } from "../../../store/authSlice"
import authService from "../../../appwrite/auth"






export default function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")

    const login = async(data) => {
        setError("");
        try {
            const session = await authService.login(data);
            if(session) {
                const userData = await authService.getSession();
                console.log("Check" + userData)
                if (userData) dispatch(authLogin(userData))
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }
    return(
        <>
            <div className="py-14">
                <div className="flex flex-col lg:flex-row items-center gap-5">
                    <div className="w-full lg:w-6/12">
                        <img src={img}/>
                    </div>
                    <div className="w-full lg:w-6/12 flex flex-col gap-5 items-center py-5 px-5">
                        <LoginMethodIcon
                            size={52} 
                            color={"#01563f"}
                            variant={"stroke"}
                        />
                        <div className="flex flex-col items-center text-center">
                            <h2 className="text-[36px] font-extrabold">Welcome Back!!!</h2>
                            <p>Please enter your details</p>
                        </div>
                        {error && <p>{error}</p>}
                        <form onSubmit={handleSubmit(login)} className="w-full lg:w-6/12">
                            <Input type="email" placeholder="Enter your email" 
                                {...register("email", 
                                    {   required: true, 
                                        validate:{matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",} 
                                    })
                                }
                            />
                            <Input type="password" placeholder="Enter your password" {...register("password", {required: true, })}/>
                            <Button title="Login" className="border-[#01563f] my-10 w-full rounded-[25px]" type="submit"/>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}