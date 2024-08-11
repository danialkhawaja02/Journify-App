import { useEffect, useState } from "react";
import Container from "../components/SectionComponents/Container";
import JournalCard from "../components/JournalComponents/JournalCard";
import appWriteService from "../../appwrite/config";
import Button from "../components/GeneralComponents/Button";

export default function AllJournal() {
    const [journals, setJournals] = useState([]);
    const [status, setChangeStatus] = useState("active");

    useEffect(() => {
        appWriteService.getJournals([]).then((journals) => {
            if (journals) {
                setJournals(journals.documents);
            }
        });
    }, []);

    return (
        <>
            <div>
                <Container>
                    <div className="flex flex-col gap-5">
                        <h2 className="text-[36px] font-extrabold self-center">All Journals</h2>
                        <div className="flex gap-5 justify-center">
                            <Button title="Active" className={`border-[#01563f] ${status === "active" ? "bg-[#01563f] text-white" : ""}`} onClick={() => setChangeStatus("active")} />
                            <Button title="Inactive" className={`border-[#01563f] ${status === "inactive" ? "bg-[#01563f] text-white" : ""}`} onClick={() => setChangeStatus("inactive")} />
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 justify-items-center pt-3">
                            {journals.length > 0 && (
                                <>
                                    {journals.map((journal) =>
                                        journal.Status === status ?
                                            
                                                <JournalCard
                                                    {...journal}
                                                    key={journal.$id}
                                                />
                                            : null
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </Container>
            </div>
        </>
    );
}
