import { useEffect, useState } from "react";
import ComboBox from "../../Components/ComboBox";
import FormInput from "../../Components/FormInput";
import Table from "../../Components/Table";
import Topbar from "../../Components/Topbar";
import SlideIn from "../../Components/SlideIn";
import CallAPI from "../../Utils/callApi";

const AddDelivery = () => {
    const [items, setInventoryItems] = useState();
    const [addedItems, setAddedItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState();
    const [deliveryProcessDate, setDeliveryProcessDate] = useState();
    const [deliveryOrderNumber, setDeliveryOrderNumber] = useState();
    const [deliveryOrderUrl, setDeliveryOrderUrl] = useState("https://ipc.gov.pk/SiteImage/Misc/files/office%20order%2031%20jan%202024.jpeg");
    const [departments, setDepartments] = useState();
    const [departmentId, setDepartmentId] = useState();
    const [quantity, setQuantity] = useState();
    const [itemEdit, setItemEdit] = useState();
    const [quantityEdit, setQuantityEdit] = useState();
    const [rateEdit, setRateEdit] = useState();
    const [showSlideIn, setShowSlideIn] = useState();
    const [validQuantity, setValidQuantity] = useState(false);
    const [maxQty, setMaxQty] = useState(0);
    const [maxQtySlideIn, setMaxQtySlideIn] = useState(0);

    useEffect(() => {
        const loadItems = async () => {
            const itemdataRes = await CallAPI('inventory/list');
            if(!itemdataRes.length) return;
            const itemData = itemdataRes.map(item => {
                return { name: item.name, value: item.id, qty:item.availableQuantity }
            })
            setInventoryItems(itemData)
        }
        const loadDepartments = async () => {
            const itemdataRes = await CallAPI('General/GetDepartments');
            if(!itemdataRes.length) return;
            const itemData = itemdataRes.map(item => {
                return { name: item.name, value: item.id }
            })
            setDepartments(itemData)
        }

        loadItems();
        loadDepartments();
    }, []);

    const getSelectedOption = (selectedOption) => {
        setQuantity('');
        setMaxQty(selectedOption.qty)
        setSelectedItems(selectedOption)
    }
    const getSelectedDepartment = (selectedOption) => {
        setDepartmentId(selectedOption.value)
    }
    const addItem = () => {
        if (!selectedItems || !quantity || !validQuantity) return;
        if (addedItems.some(e => e.inventoryItemId === selectedItems.value)) {
            console.log("Already exists");
            return;
        }

        setAddedItems(prevItems => [
            ...prevItems,
            {
                inventoryItemId: selectedItems.value,
                item: selectedItems.name,
                quantity,
                qty:selectedItems.qty,
            }
        ]);
    }

    const updateItem = () => {
        if(quantityEdit > maxQtySlideIn || !quantityEdit || quantityEdit==='') return;
        const _item = addedItems.find(it => it.item === itemEdit);
        if (_item) {
            _item.quantity = quantityEdit;
            _item.rate = rateEdit;
        }
        setItemEdit();
        setQuantityEdit();
        setRateEdit();
        setShowSlideIn(false);
    }

    const onEditHandler = (item) => {
        console.log(addedItems, item)
        console.log(addedItems.find(it=>it.inventoryItemId===item.id))
        setMaxQtySlideIn(addedItems.find(it=>it.inventoryItemId===item.id).qty);
        setItemEdit(item.item);
        setQuantityEdit(item.quantity);
        setRateEdit(item.rate);
        setShowSlideIn(true);
        console.log(item)
    }
    const onDeleteHandler = (item) => {
        console.log(addedItems, item)
        const _items = addedItems.filter(it => it.value !== item.value);
        setAddedItems(_items);
    }

    const saveHandler = async () => {
        if (deliveryProcessDate && deliveryOrderNumber && departmentId && addedItems) {
            const payload = {
                deliveryProcessDate,
                departmentId,
                deliveryOrderNumber,
                deliveryOrderUrl,
                items: addedItems
            }

            const res = await CallAPI('Delivery/Add', 'POST', payload);
        }
    }

    return (
        <>
            <Topbar title="Add" />

            <SlideIn show={showSlideIn} setShowSlideIn={setShowSlideIn} title={"Edit Item - " + itemEdit}>
                <div className="">
                    <div className="mb-3 pt-3">
                        {itemEdit && <FormInput label="Item" disabled value={itemEdit} setValue={setItemEdit} />}
                    </div>
                    <div className="mb-3">
                        <FormInput label={"Quantity max(" + (maxQtySlideIn) + ")"}  value={quantityEdit} setValue={setQuantityEdit} type="number" max={maxQtySlideIn}/>
                    </div>
                    <div className="">
                        <button className="butn col-12" onClick={() => updateItem()}>Updates</button>
                    </div>
                </div>
            </SlideIn>

            <div className="px-3">
                <div className="box floating-heading">
                    <h2 className="ps-2 mb-4 heading">Add Delivery</h2>

                    <div className="form row">
                        <div className="mb-3 col-md-6">
                        {departments && <ComboBox options={departments} placeholder="-- Select Item --" itemSelectHandler={getSelectedDepartment} />}
                        </div>
                        <div className="mb-3 col-md-6">
                            <FormInput label="Process Date" type="date" required setValue={setDeliveryProcessDate} />
                        </div>
                        <div className="mb-3 col-md-6">
                            <FormInput label="Delivery Order Number" required setValue={setDeliveryOrderNumber} />
                        </div>
                        <div className="mb-3 col-md-6">
                            <FormInput label="Delivery Order" type="file" setValue={setDeliveryOrderUrl} />
                        </div>
                    </div>

                    <h3 className="ps-3 mt-3 mb-2">Add Items</h3>

                    <div className="row align-items-center">
                        <div className="col-md-3 col-4">
                            {items && <ComboBox options={items} placeholder="-- Select Item --" itemSelectHandler={getSelectedOption} />}
                        </div>
                        <div className="col-md-3 col-4">
                            <FormInput label={"Quantity max(" + (maxQty) + ")"} value={quantity} disabled={maxQty===0} setValue={(v,vl)=>{setQuantity(v); setValidQuantity(vl)}} type="number" max={maxQty}/>
                        </div>
                        <div className="col-md-3 col-4">
                            <button className="butn" onClick={addItem}>Add</button>
                        </div>

                        <div className="col-12">
                            {(addedItems) && <Table data={addedItems.map(e=>{return {id:e.inventoryItemId,item:e.item,quantity:e.quantity}})} onEdit={onEditHandler} onDelete={onDeleteHandler} tableOnly isDark isSmall noPagination />}
                        </div>
                    </div>
                    <div className="ms-auto col-3 col-md-1 mt-3">
                        <button disabled={addedItems.length === 0} className="butn col-12" onClick={saveHandler}>Save</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddDelivery;
