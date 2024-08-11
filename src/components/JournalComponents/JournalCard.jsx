import { Link } from "react-router-dom"
import { ArrowUpRight01Icon } from "hugeicons-react"
import appwriteService from "../../../appwrite/config"

export default function JournalCard({$id, title, featuredImage}) {
    return(
        <>
        <Link to={`/journal/${$id}`} className="journalCard">
            <div className="flex flex-col gap-3 max-w-[350px]">
                <div className="imgHover">
                    <img src={appwriteService.getFilePreview(featuredImage)} className="w-[350px] h-[230px] object-cover border-[3px] border-[#01563f]"/>
                </div>
                <div className="flex gap-5 items-center justify-between">
                    <h2 className="font-bold text-xl blogHeading hover:underline">{title}</h2>
                    <ArrowUpRight01Icon
                    size={52} 
                    color={"#01563f"}
                    variant={"stroke"}
                    />
                </div>
            </div>

        </Link>
        </>
    )
}