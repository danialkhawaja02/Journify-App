import { AccountSetting01Icon } from "hugeicons-react"
import img from "../../assets/account.svg"
import {useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import Button from "../GeneralComponents/Button"
import Input from "../GeneralComponents/Input"
import {useDispatch} from "react-redux"
import { login } from "../../../store/authSlice"
import authService from "../../../appwrite/auth"


export default function SignUp() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm();
    const [error, setError] = useState("")

   const signup = async (data) => {
        setError("")
        try {
            const createAccount =  await authService.createAccount(data);
            if(createAccount) {
                const userData = await authService.getSession()
                if(userData) dispatch(login(userData))
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
                        <AccountSetting01Icon
                            size={52} 
                            color={"#01563f"}
                            variant={"stroke"}
                        />
                        <div className="flex flex-col items-center text-center">
                            <h2 className="text-[36px] font-extrabold">Become a part of our family!!!</h2>
                            <p>Please enter your details</p>
                        </div>
                        {error && <p>{error}</p>}
                        <form onSubmit={handleSubmit(signup)} className="w-full lg:w-6/12">
                            <Input type="text" placeholder="Enter your name" {...register("name", {required: true, })}/>
                            <Input type="email" placeholder="Enter your email" 
                                {...register("email", 
                                    {   required: true, 
                                    })
                                }
                            />
                            <Input type="password" placeholder="Enter your password" {...register("password", {required: true, })}/>
                        <Button title="Create Account" className="border-[#01563f] my-10 w-full rounded-[25px]" type="submit"/>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}