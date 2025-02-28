import { useEffect, useState } from "react";
import ComboBox from "../../Components/ComboBox";
import FormInput from "../../Components/FormInput";
import Table from "../../Components/Table";
import Topbar from "../../Components/Topbar";
import SlideIn from "../../Components/SlideIn";
import CallAPI from "../../Utils/callApi";
import Toast from "../../Components/Toast";

const AddInventory = () => {
    const [code, setCode] = useState();
    const [name, setName] = useState();
    const [description, setDescription] = useState();

    const [message, setMessage] = useState();
    const [success, setSuccess] = useState(true);

    const saveHandler = async () => {
        if (code && name && description ) {
            const payload = {
                code,
                description,
                name,
            }

            const res = await CallAPI('Inventory/Add', 'POST', payload);
            setMessage(res.msg);
            setSuccess(res.status);

            setCode('');
            setName('');
            setDescription('');
        }
        else{
            setName('a');
            setName('');

        }
    }

    return (
        <>
            <Toast message={message} setMessage={setMessage} success={success}/>
            <Topbar title="Add" />

            <div className="px-3">
                <div className="box floating-heading">
                    <h2 className="ps-2 mb-4 heading">Add new Inventory</h2>

                    <div className="form row">
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <FormInput label="Code" type="text" required value={code} setValue={setCode} />
                            </div>
                            <div className="col-md-6">
                                <FormInput label="Name" type="text" required value={name} setValue={setName} />
                            </div>
                        </div>
                       
                    </div>
                    <div className=" mb-3">
                            <FormInput label="Description" required classname="h-100" multiline value={description} setValue={setDescription} />
                        </div>

                    
                    <div className="ms-auto col-3 col-md-1 mt-3">
                        <button  className="butn col-12" onClick={saveHandler}>Save</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddInventory;
