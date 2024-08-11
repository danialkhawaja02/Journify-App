import { Facebook01Icon, NewTwitterRectangleIcon, InstagramIcon } from "hugeicons-react";


export default function Footer() {
    return (
        <>
            <div className="flex flex-col gap-5 justify-center items-center py-10">
                <div>
                    <h2 className="text-2xl font-bold">Journify</h2>
                </div>
                <div className="flex gap-5">
                    <Facebook01Icon
                        size={36} 
                        color={"#01563f"}
                        variant={"stroke"}
                    />
                    <NewTwitterRectangleIcon
                        size={36} 
                        color={"#01563f"}
                        variant={"stroke"}
                    />
                    <InstagramIcon
                        size={36} 
                        color={"#01563f"}
                        variant={"stroke"}
                    />
                </div>
                <div>
                    <p>© 2024 - Journify, All Right Reserved.</p>
                </div>
            </div>
        </>
    )
}