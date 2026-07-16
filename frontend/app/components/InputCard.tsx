import AnalyzeButton from "./AnalyzeButton"
import InputBox from "./InputBox"

const InputCard = () => {
    return (
        <>
            <div className = "join w-full max-w-sm shadow-2xl">
                <InputBox/>
                <AnalyzeButton/>
            </div>
        </>
    )
}

export default InputCard