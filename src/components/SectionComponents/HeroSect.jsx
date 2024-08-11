import { Link } from "react-router-dom"
import heroimages from "../../assets/heroImg.svg"
import Button from "../GeneralComponents/Button"

export default function HeroSect() {
    return(
        <>
            <div className="flex flex-col lg:flex-row justify-between items-center gap-5">
                <div className="flex flex-col items-center lg:items-start gap-5 w-12/12 lg:w-6/12">
                    <div className="text-center lg:text-start">
                        <h2 className="text-[56px] font-extrabold">Journify Your Life</h2>
                        <p className="text-xl">Capture life's moments, big and small. Journify is your personal diary. Write, reflect, and grow. Let's start your journaling journey.</p>
                    </div>
                    <Link to={'/login'}>
                        <Button title={"Get Started"}  className="border-[#01563f] hover:bg-[#01563f] hover:text-white"/>
                    </Link>
                </div>
                <div>
                    <img src={heroimages} width={500}/>
                </div>
            </div>
        </>
    )
}