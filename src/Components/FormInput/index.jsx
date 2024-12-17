import { useState } from "react";

const FormInput = ({ label, type = "text", value, setValue, classname, required = false, multiline = false, disabled = false, max="" }) => {
    const [msg,setMsg] = useState('');
    
    const setValueHandler = (e) => {
        setMsg(e.target.validationMessage)
        setValue && setValue(e.target.value, e.target.validationMessage === '');
    }
    return (
        <>
            <div className={"form-input" + (classname ? " " + classname : "")}>
                {multiline && <textarea title={msg} className={msg !== '' ? "invalid":""} onChange={e => setValue && setValue(e.target.value, e.target.validationMessage === '')} placeholder=" " required={required}></textarea>}
                {!multiline && <input type={type} title={msg} className={msg !== '' ? "invalid":""} onChange={setValueHandler} placeholder=" " value={value} required={required} disabled={disabled} max={max} />}
                <label htmlFor={label}>{label} {required && <span>*</span>}</label>
            </div>
        </>
    );
}

export default FormInput;