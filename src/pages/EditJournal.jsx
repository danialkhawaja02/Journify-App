import { useParams, useNavigate } from "react-router-dom";
import JournalForm from "../components/JournalComponents/JournalForm";
import { useEffect, useState } from "react";
import appWriteService from "../../appwrite/config"



export default function EditJournal() {
    const [journal, setJournal] = useState([])
    const {slug} = useParams()
    const navigate = useNavigate();
    useEffect(() => {
        if(slug) {
            appWriteService.getJournal(slug).then(journal => {
                if(journal){
                    setJournal(journal)
                }
                else navigate("/")
            })
        }
    },[slug, navigate])
    return journal ?(
        <>
            <div className="py-14">
                <JournalForm journal={journal}/>
            </div>
        </>
    ) : null
}