import { forwardRef } from "react";

function Select ({ options, className, value, ...rest }, ref) {
    return (
        <div>
            <select ref={ref} className={className} value={value} {...rest}>
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default forwardRef(Select);
