
export default function CardBoxSect({title, content, image}) {
    return(
        <>
            <div className="flex flex-col justify-center items-center gap-3 boxShadow rounded-[15px] p-10 bg-[#fff]">
                <img src={image} className="w-[250px] h-[250px]"/>
                <div className="flex flex-col justify-center items-center">
                    <h2 className="text-[32px] font-extrabold text-center">{title}</h2>
                    <p className="text-lg text-center">{content}</p>
                </div>
            </div>
        </>
    )
}