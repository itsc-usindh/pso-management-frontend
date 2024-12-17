import { useEffect, useState } from "react";
import ComboBox from "../../Components/ComboBox";
import FormInput from "../../Components/FormInput";
import Table from "../../Components/Table";
import Topbar from "../../Components/Topbar";
import SlideIn from "../../Components/SlideIn";
import CallAPI from "../../Utils/callApi";

const AddPurchase = () => {
    const [items, setItems] = useState();
    const [addedItems, setAddedItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState();
    const [purchaseDate, setPurchaseDate] = useState();
    const [officeOrderNumber, setOfficeOrderNumber] = useState();
    const [officeOrderUrl, setOfficeOrderUrl] = useState("https://ipc.gov.pk/SiteImage/Misc/files/office%20order%2031%20jan%202024.jpeg");
    const [vendorDetails, setVendorDetails] = useState();
    const [quantity, setQuantity] = useState();
    const [rate, setRate] = useState();
    const [itemEdit, setItemEdit] = useState();
    const [quantityEdit, setQuantityEdit] = useState();
    const [rateEdit, setRateEdit] = useState();
    const [showSlideIn, setShowSlideIn] = useState();

    useEffect(()=>{
        const loadItems = async ()=>{
            const itemdataRes = await CallAPI('inventory/list');
            if(!itemdataRes.length) return;
            const itemData = itemdataRes.map(item=> {
                return {name: item.name, value:item.id}
            })
            setItems(itemData)
        }

        loadItems();
    },[]);

    const getSelectedOption = (selectedOption) => {
        setSelectedItems(selectedOption)
    }
    const addItem = () => {
        if (!selectedItems || !quantity || !rate) return;
        if (addedItems.some(e => e.id === selectedItems.value)) {
            console.log("Already exists");
            return;
        }

        setAddedItems(prevItems => [
            ...prevItems,
            {
                id: selectedItems.value,
                inventoryItemId: selectedItems.value,
                item: selectedItems.name,
                quantity,
                rate
            }
        ]);
    }

    const updateItem = () => {
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
        if (purchaseDate && officeOrderNumber && vendorDetails && addedItems) {
            const payload = {
                purchaseDate,
                vendorDetails,
                officeOrderNumber,
                officeOrderUrl,
                items: addedItems
            }

            const res = await CallAPI('Purchase/Add', 'POST', payload);
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
                        <FormInput label="Quantity" value={quantityEdit} setValue={setQuantityEdit} />
                    </div>
                    <div className="mb-3">
                        <FormInput label="Rate" value={rateEdit} setValue={setRateEdit} />
                    </div>
                    <div className="">
                        <button className="butn col-12" onClick={() => updateItem()}>Updates</button>
                    </div>
                </div>
            </SlideIn>

            <div className="px-3">
                <div className="box floating-heading">
                    <h2 className="ps-2 mb-4 heading">Add new Purchase</h2>

                    <div className="form row">
                        <div className="col-md-6 mb-3">
                            <div className="mb-3">
                                <FormInput label="Purchase Date" type="date" required setValue={setPurchaseDate} />
                            </div>
                            <div className="mb-3">
                                <FormInput label="Office Order Number" required setValue={setOfficeOrderNumber} />
                            </div>
                            <div>
                                <FormInput label="Office Order" type="file" setValue={setOfficeOrderUrl} />
                            </div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <FormInput label="Vendor Details" required classname="h-100" multiline setValue={setVendorDetails} />
                        </div>
                    </div>

                    <h3 className="ps-3 mt-3 mb-2">Add Items</h3>

                    <div className="row align-items-center">
                        <div className="col-3 col-md-3">
                            {items&&<ComboBox options={items} placeholder="-- Select Item --" itemSelectHandler={getSelectedOption} />}
                        </div>
                        <div className="col-3 col-md-3">
                            <FormInput label="Quantity" setValue={setQuantity} type="number"/>
                        </div>
                        <div className="col-3 col-md-3">
                            <FormInput label="Rate" setValue={setRate} type="number"/>
                        </div>
                        <div className="col-3 col-md-3">
                            <button className="butn" onClick={addItem}>Add</button>
                        </div>

                        <div className="col-12">
                            {(addedItems) && <Table data={addedItems} onEdit={onEditHandler} onDelete={onDeleteHandler} tableOnly isDark isSmall noPagination />}
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

export default AddPurchase;
