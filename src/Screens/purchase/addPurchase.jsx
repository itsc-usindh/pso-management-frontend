import { useState } from "react";
import ComboBox from "../../Components/ComboBox";
import FormInput from "../../Components/FormInput";
import Table from "../../Components/Table";
import Topbar from "../../Components/Topbar";

const AddPurchase = () => {
    const items = [
        {
            name: "Office Chair",
            value: 1
        },
        {
            name: "Printers",
            value: 2
        },
        {
            name: "LCD",
            value: 3
        },
        {
            name: "Mouse",
            value: 4
        },
        {
            name: "Keyboard",
            value: 5
        }
    ];

    const [addedItems, setAddedItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState();
    const [quantity, setQuantity] = useState();
    const [rate, setRate] = useState();

    const getSelectedOption = (selectedOption) => {
        setSelectedItems(selectedOption)
    }
    const addItem = () => {
        const _newItem = {
            item:selectedItems.name,
            quantity,
            rate
        }
        setAddedItems([...addedItems, _newItem]);
    }
    return (
        <>
            <Topbar title="Add" />

            <div className="box">
                <h2 className="ps-2 mb-4">Add new Purchase</h2>

                <div className="form row">
                    <div className="col-6 mb-3">
                        <div className="mb-3">
                            <FormInput label="Purchase Date" type="date" required />
                        </div>
                        <div className="mb-3">
                            <FormInput label="Office Order Number" required />
                        </div>
                        <div>
                            <FormInput label="Office Order" type="file" />
                        </div>
                    </div>
                    <div className="col-6 mb-3">
                        <FormInput label="Vendor Details" required classname="h-100" multiline />
                    </div>
                </div>

                <h3 className="ps-3 mt-3 mb-2">Add Items</h3>

                <div className="row align-items-center">
                    <div className="col-3">
                        <ComboBox options={items} placeholder="-- Select --" itemSelectHandler={getSelectedOption} />
                    </div>
                    <div className="col-3">
                        <FormInput label="Quantity" setValue={setQuantity}/>
                    </div>
                    <div className="col-3">
                        <FormInput label="Rate" setValue={setRate}/>
                    </div>
                    <div className="col-3">
                        <button className="butn" onClick={addItem}>Add</button>
                    </div>

                    <div className="col-12">
                        <Table data={addedItems} tableOnly/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddPurchase;
// int OrganizationId
// DateTime PurchaseDate
// string? VendorDetails
// string? OfficeOrderNumber
// string? OfficeOrderUrl
// List<PurchaseItemModel>? Items 