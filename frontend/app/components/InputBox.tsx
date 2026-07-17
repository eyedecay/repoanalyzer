import { Dispatch, SetStateAction } from "react"
interface InputBoxProps {
    value: string;
    onChange: Dispatch<SetStateAction<string>>;
}

const InputBox = ({value, onChange}: InputBoxProps) => {
    return (
        <>
        <input type = "text" placeholder = "Type Here" value = {value} onChange = {(e) => onChange(e.target.value)} className = "input"/> 
        </>
    )
}

export default InputBox