import { useEffect, useState } from "react";
import FormInput from "../FormInput";

const ComboBox = ({options, itemSelectHandler, placeholder}) => {
    const [boxOpened, setBoxOpened] = useState(false);
    const [displayText, setDisplayText] = useState(placeholder ? placeholder : options && options[0].name);
    const [searchOption, setSearchOption] = useState("");
    const [mainOption, setMainOption] = useState(options);

    useEffect(()=>{
        options && searchOption != "" && setMainOption(options.filter(opt=>opt.name.toLowerCase().includes(searchOption.toLowerCase())));
        searchOption === "" && setMainOption(options);
    },[searchOption]);

    const openHandler = () =>{
        setBoxOpened(!boxOpened)
    }
    const innerItemSelectHandler = (selectedOption) =>{
        setBoxOpened(false);
        setDisplayText(selectedOption.name);
        itemSelectHandler&&itemSelectHandler(selectedOption);
    }
    return (
        <div className="combobox">
            <div className={"combobox-btn" + (boxOpened? " open":"")} onClick={openHandler}>
                <p>{displayText}</p>
                <i className="fa fa-chevron-down"></i>
            </div>
            <div className="combobox-items">
                <FormInput setValue={setSearchOption}/>
                {mainOption&& mainOption.map(option=>
                    <p key={option.value} onClick={()=>innerItemSelectHandler(option)}>{option.name}</p>
                )}
            </div>
        </div>
    );
}

export default ComboBox;