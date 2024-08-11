

export default function Button({title,className, ...props}) {
    return(
        <>
            <button className={`border-2 px-8 py-1.5 rounded-[5px] text-xl font-semibold ${className}`} {...props}>{title}</button>
        </>
    )
}