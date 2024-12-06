const FormInput = ({label, type="text", setValue, classname, required=false, multiline=false}) => {
    return(
        <>
            <div className={"form-input" + (classname ? " " + classname : "")}>
                {multiline&&<textarea onChange={e=>setValue&&setValue(e.target.value, e.target.validationMessage === '')} placeholder="" required={required}></textarea>}
                {!multiline&&<input type={type} onChange={e=>setValue&&setValue(e.target.value, e.target.validationMessage === '')} placeholder="" required={required} />}
                <label htmlFor={label}>{label} {required&& <span>*</span>}</label>
            </div>
        </>
    );
}

export default FormInput;