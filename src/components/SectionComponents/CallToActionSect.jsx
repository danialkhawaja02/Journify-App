import Button from "../GeneralComponents/Button";




export default function CallToActionSect() {
    return(
        <>
          <div className="flex flex-col items-center gap-10 bg-[#01563f] rounded-[15px] text-white py-14 my-14">
            <div className="flex flex-col items-center justify-center text-center gap-5">
                <h2 className="text-[36px] font-extrabold">Journify Your Life</h2>
                <p className="text-xl">Step into Self-Discovery: Start Journaling Today</p>
            </div>
            <Button title={"Get Started"} className="border-[#fff] hover:text-[#01563f] hover:bg-white" />
            </div>
        </>
    )
}