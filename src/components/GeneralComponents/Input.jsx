import { forwardRef, useId } from "react";

function Input({label, placeholder, type = "text", ...props }, ref) {
    const id = useId();
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={id}>{label}</label>
            <input 
                type={type} 
                placeholder={placeholder} 
                ref={ref} 
                id={id}
                className="inputField"
                {...props}
            />
        </div>
    );
}

export default forwardRef(Input);
