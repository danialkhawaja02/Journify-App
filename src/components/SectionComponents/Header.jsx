import { Link } from "react-router-dom";
import Button from "../GeneralComponents/Button";
import { useSelector, useDispatch } from "react-redux";
import authService from '../../../appwrite/auth'
import {logout} from '../../../store/authSlice'
import { useState, useEffect } from "react";
import { Menu01Icon  } from "hugeicons-react"

export default function Header() {
    const authStatus = useSelector((state)=> state.auth.status)

    const navItems = [
        {
            name: "Home",
            slug: "/",
            active: true
        }, 
        {
            name: "All Journals",
            slug: "/all-journals",
            active: true
        },
        {
            name: "Add Journal",
            slug: "/add-journal",
            active: authStatus,
        }
    ]

    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);

    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }

    const [username, setUsername] = useState("");
    useEffect(()=>{
        const getUserName = async () => {
            const result = await authService.getSession();
            setUsername(result.name)
        };
        getUserName();
    },[])

    return (
    <>
       <nav className="flex flex-col md:flex-row justify-center gap-5 lg:gap-10 p-5">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Journify</h2>
                <div className="block lg:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex items-center px-3 py-2 rounded text-black-500 hover:text-black-400"
                    >
                        <Menu01Icon 
                        size={24} 
                        color={"#000000"}
                        variant={"stroke"}
                        />
                    </button>
                </div>
            </div>
            <div className={`block flex-grow lg:flex lg:items-center lg:w-auto ${isOpen ? "block" : "hidden"}`} >
                <div className="flex items-center justify-center gap-10">
                    <ul className='flex'>
                        {navItems.map((item)=> item.active ?
                            <li key={item.name} className="px-6 font-bold hover:underline">
                                <Link to={item.slug}>{item.name}</Link>
                            </li> : null
                        )}
                    </ul>
                </div>
            </div>
            <div className="flex items-center justify-center gap-3">
                {authStatus? 
                    <>
                     <span className="text-xl font-bold px-2">{`Hi ${username} 👋`}</span>
                     <Button title={"Logout"} className="border-[#01563f] hover:bg-[#01563f] hover:text-white" onClick={logoutHandler}/>                    
                    </> :
                    <>
                    <Link to={"/login"}><Button title={"Login"} className="border-[#01563f] hover:bg-[#01563f] hover:text-white"/></Link>
                    <Link to={"/signup"}><Button title={"Sign Up"} className="border-[#01563f] hover:bg-[#01563f] hover:text-white"/></Link>
                    </>
                }
            </div>
        </nav>
    </>
    )
}