import { useEffect, useState } from "react";
import SlideIn from "../../Components/SlideIn";
import Table from "../../Components/Table";
import Topbar from "../../Components/Topbar";
import CallAPI from "../../Utils/callApi";

const ListDelivery = () => {
    const [list, setList] = useState();
    const [data, setData] = useState();
    const [showSlideIn, setShowSlideIn] = useState();
    const [selectedRow, setSelectedRow] = useState();

    useEffect(() => {
        runApi();
        console.log(1)
    }, []);

    const runApi = async () => {
        const data = await CallAPI("Delivery/list");
        setList(data);
        setData(data.map(it => {
            return { id: it.deliveryId, "Delivery Order#": it.deliveryOrderNumber, items: it.deliverables, department: it.department, "Process Date": it.deliveryProcessDate }
        }))
    }

    const onRowViewHandler = (row, e) => {
        console.log(row)
        setSelectedRow(list.find(item => item.deliveryId === row.id));
        setShowSlideIn(true);
    }
    return (
        <>
            <Topbar title={"Delivery / List"} />

            {selectedRow && <SlideIn show={showSlideIn} setShowSlideIn={setShowSlideIn} title="Items">
                {selectedRow && <Table data={selectedRow.items} tableOnly isDark isSmall noPagination />}

                {selectedRow.deliveryOrderUrl &&
                    <div className="office-order px-3">
                        <img src={selectedRow.deliveryOrderUrl} alt="" className="img-fluid w-100 bordered-img" />
                    </div>}
            </SlideIn>}
            <Table title="Delivery List" data={data} onView={onRowViewHandler} />
        </>
    );
}


export default ListDelivery;