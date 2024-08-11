import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appWriteService from "../../appwrite/config";
import Button from "../components/GeneralComponents/Button";
import Container from "../components/SectionComponents/Container";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Journal() {
    const [journal, setJournal] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();


    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = journal && userData ? journal.userID === userData?.userdata?.$id : false;

    useEffect(() => {
        if (slug) {
            appWriteService.getJournal(slug).then((journal) => {
                if (journal) setJournal(journal);
                else navigate("/");
            });
        } else return  navigate("/");
    }, [slug, navigate]);

    const deleteJournal = () => {
        appWriteService.deleteJournal(journal.$id).then((status) => {
            if (status) {
                appWriteService.deleteFile(journal.featuredImage);
                return navigate("/");
            }
        });
    };

    return journal ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={appWriteService.getFilePreview(journal.featuredImage)}
                        alt={journal.title}
                        className="rounded-xl w-6/12 h-[400px] object-contain"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6 flex gap-5">
                            <Link to={`/edit-journal/${journal.$id}`}>
                                <Button className="border-[#01563f]" title="Edit" />
                            </Link>
                            <Button className="border-[#01563f]" onClick={deleteJournal} title="Delete"/>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{journal.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(journal.content)}
                    </div>
            </Container>
        </div>
    ) : null;
}