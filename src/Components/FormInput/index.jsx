const FormInput = ({ label, type = "text", value, setValue, classname, required = false, multiline = false, disabled = false, numberOnly = false }) => {
    const setValueHandler = (e) => {
        if(numberOnly){
            if(!isNaN(e.target.value/1)){
                setValue && setValue(e.target.value, e.target.validationMessage === '');
                return;
            }
            else{
                
            }
        }
        setValue && setValue(e.target.value, e.target.validationMessage === '');
    }
    return (
        <>
            <div className={"form-input" + (classname ? " " + classname : "")}>
                {multiline && <textarea onChange={e => setValue && setValue(e.target.value, e.target.validationMessage === '')} placeholder="" required={required}></textarea>}
                {!multiline && <input type={type} onChange={setValueHandler} placeholder="" value={value} required={required} disabled={disabled} />}
                <label htmlFor={label}>{label} {required && <span>*</span>}</label>
            </div>
        </>
    );
}

export default FormInput;