import { useEffect, useState } from "react";
import { useSelector } from "react-redux"; 
import { Link } from "react-router-dom";
import JournalCard from "../JournalComponents/JournalCard";
import appWriteService from "../../../appwrite/config";
import Button from "../GeneralComponents/Button";

export default function JournalsSect() {
    const [journals, setJournals] = useState([]);
    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {
        console.log(journals);
        if (userData) {
            appWriteService.getJournals([]).then((journals) => {
                if (journals) {
                    setJournals(journals.documents);
                }
            });
        }
    }, [userData]);

    return (
        <>
            <div className="py-14 flex flex-col gap-8">
                <h2 className="text-[36px] text-center lg:text-left font-extrabold">Your Latest Journal</h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 justify-items-center lg:justify-items-stretch">
                    {journals.slice(0, 3).map((journal) =>
                        journal.Status === "active" ? (
                            <JournalCard {...journal} key={journal.$id} />
                        ) : null
                    )}
                </div>
                {userData ? (
                    <Link to="/all-journals" className="self-center">
                        <Button className="border-[#01563f] hover:bg-[#01563f] hover:text-white" title="View All" />
                    </Link>
                ) : (
                    <h2 className="text-[36px] font-extrabold text-center">Login to see your journals</h2>
                )}
            </div>
        </>
    );
}
