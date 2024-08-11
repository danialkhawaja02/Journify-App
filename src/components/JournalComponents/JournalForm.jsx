import { useForm } from "react-hook-form";
import appWriteService from "../../../appwrite/config";
import { useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Input from "../GeneralComponents/Input";
import Button from "../GeneralComponents/Button";
import Select from "../GeneralComponents/Select";
import TextEditor from "../SectionComponents/TextEditor";

export default function JournalForm({ journal }) {
    const { register, control, watch, handleSubmit, setValue } = useForm({
        defaultValues: {
            title: journal?.title || "",
            slug: journal?.slug || "",
            content: journal?.content || "",
            Status: journal?.Status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const { $id, featuredImage, title } = journal || {};

    const slugTranslate = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    useEffect(() => {
        if (journal) {
            setValue("title", journal.title);
            setValue("content", journal.content);
            setValue("Status", journal.Status || "active");
        }
    }, [journal, setValue, slugTranslate]);

    const Submit = async (data) => {
        // Update Existing Journal
        if (journal) {
            const file = data.image[0] ? await appWriteService.uploadFile(data.image[0]) : null;

            if (file) {
                appWriteService.deleteFile(featuredImage);
            }

            const dbJournal = await appWriteService.updateJournal($id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            if (dbJournal) navigate(`/journal/${dbJournal?.$id}`);
            
        // Add New Journal
        } else {
            const file = await appWriteService.uploadFile(data.image[0]);
            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
            }
            const dbJournal = await appWriteService.createJournal({
                ...data,
                userID: userData?.userdata?.$id,
                slug: slugTranslate(data.title),
            });

            if (dbJournal) navigate(`/journal/${dbJournal.$id}`);
        }
    };

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTranslate(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTranslate, setValue]);

    return (
        <>
            <form onSubmit={handleSubmit(Submit)} className="flex gap-2">
                <div className="w-2/3 px-2 flex flex-col gap-6">
                    <Input
                        label="Title :"
                        placeholder="Title"
                        className="bg-[transparent] border-[0.5px] border-[#01563f] p-2 rounded-[3px] placeholder:text-[#01563f]"
                        {...register("title", { required: true })}
                    />
                    <Input
                        label="Slug :"
                        placeholder="Slug"
                        className="bg-[transparent] border-[0.5px] border-[#01563f] p-2 rounded-[3px] placeholder:text-[#01563f]"
                        {...register("slug", { required: true })}
                    />
                    <TextEditor
                        label="Content :"
                        name="content"
                        control={control}
                        defaultValue={journal?.content || ""}
                    />
                </div>
                <div className="flex flex-col w-1/3 gap-5">
                    <Input
                        label="Featured Image :"
                        type="file"
                        className="mb-4"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("image", { required: !journal })}
                    />
                    {journal && featuredImage && (
                        <div className="w-full mb-4">
                            <img
                                src={appWriteService.getFilePreview(featuredImage)}
                                alt={title}
                                className="rounded-lg"
                            />
                        </div>
                    )}
                    <Select
                        options={["active", "inactive"]}
                        label="Status"
                        className="selectField mb-4"
                        {...register("Status", { required: true })}
                    />
                    <Button
                        type="submit"
                        className="w-full border-[#01563f]"
                        title={`${journal ? "Update" : "Submit"}`}
                    />
                </div>
            </form>
        </>
    );
}
