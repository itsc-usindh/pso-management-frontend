import { useEffect, useState } from "react";
import SlideIn from "../../Components/SlideIn";
import Table from "../../Components/Table";
import Topbar from "../../Components/Topbar";
import CallAPI from "../../Utils/callApi";
import FormInput from "../../Components/FormInput";
import Toast from "../../Components/Toast";

const Inventory = () => {
    const [list, setList] = useState();
    const [data, setData] = useState();
    const [showSlideIn, setShowSlideIn] = useState();
    const [selectedRow, setSelectedRow] = useState();
    const [eiId, setEiId] = useState('');
    const [eiCode, setEiCode] = useState('');
    const [eiName, setEiName] = useState('');
    const [eiDesc, setEiDesc] = useState('');
    const [toastMessage, setToastMessage] = useState('');
    const [toastState, setToastState] = useState(false);

    useEffect(() => {
        runApi();
    }, []);

    const runApi = async () => {
        const data = await CallAPI("inventory/list");
        setList(data);
        setData(data.map(it => {
            return { id: it.id, "code": it.code, "Name": it.name, description: it.description, available: it.availableQuantity, delivered: it.deliverQuantity, purchased: it.purchaseQuantity }
        }))
    }

    const onRowEditHandler = (row, e) => {
        const _item = list.find(item => item.id === row.id);
        setSelectedRow(_item);
        setEiId(_item.id);
        setEiCode(_item.code);
        setEiName(_item.name);
        setEiDesc(_item.description);
        setShowSlideIn(true);
    }

    const updateItemHandler = async () => {
        if (eiCode !== '' && eiName !== '' && eiDesc !== '') {
            setShowSlideIn(false)
            const payload = {
                id:eiId,
                code:eiCode,
                name:eiName,
                description:eiDesc
            }
            const res = await CallAPI('Inventory/update','POST',payload);
            if(res && res.status){
                setToastState(prev=>true);
                setToastMessage(res.msg);
            }
            else{
                setToastState(prev=>false);
                setToastMessage(res.msg);
            }
        }
    }

    return (
        <>
            <Topbar title="Inventory" />

            <Toast message={toastMessage} error={!toastState} success={toastState} setMessage={setToastMessage} />

            {selectedRow && <SlideIn show={showSlideIn} setShowSlideIn={setShowSlideIn} title={selectedRow.code + " - " + selectedRow.name}>
                <div className="col-12 mb-2">
                    <FormInput label="Code" value={eiCode} setValue={setEiCode} required />
                </div>
                <div className="col-12 mb-2">
                    <FormInput label="Name" value={eiName} setValue={setEiName} required />
                </div>
                <div className="col-12 mb-2">
                    <FormInput label="Description" value={eiDesc} setValue={setEiDesc} required />
                </div>
                <div className="col-12 mb-2 d-flex justify-content-center mt-4">
                    <button className="butn col-5 me-3" onClick={updateItemHandler}>Update</button>
                    <button className="butn butn-scondary col-5" onClick={() => { setShowSlideIn(false) }}>Cancel</button>
                </div>

            </SlideIn>}

            <Table title="Inventory List" data={data} onEdit={onRowEditHandler} />
        </>
    )
}

export default Inventory;