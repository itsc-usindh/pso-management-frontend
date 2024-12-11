import { useEffect, useState } from "react";
import Table from "../../Components/Table";
import Topbar from "../../Components/Topbar";
import CallAPI from "../../Utils/callApi";
import SlideIn from "../../Components/SlideIn";

const ListPurchase = () => {
  const [list, setList] = useState();
  const [data, setData] = useState();
  const [showSlideIn, setShowSlideIn] = useState();
  const [selectedRow, setSelectedRow] = useState();

  useEffect(() => {
    runApi();
    console.log(1)
  }, []);

  const runApi = async () => {
    const data = await CallAPI("Purchase/list");
    setList(data);
    setData(data.map(it => {
      return { id: it.id, "purchase Date": it.purchaseDate, purchase: it.purchase, "vendor Details": it.vendorDetails, organization: it.organization, "office Order#": it.officeOrderNumber, items: it.purchase }
    }))
  }

  const onRowViewHandler = (row, e) => {
    setSelectedRow(list.find(item => item.id === row.id));
    setShowSlideIn(true);
  }
  return (
    <>
      <Topbar title={"Purchase / List"} />

      {selectedRow&&<SlideIn show={showSlideIn} setShowSlideIn={setShowSlideIn} title="Items">
        {selectedRow && <Table data={selectedRow.items} tableOnly isDark isSmall noPagination />}

        {selectedRow.officeOrderUrl && 
        <div className="office-order px-3">
          <img src={selectedRow.officeOrderUrl} alt="" className="img-fluid w-100 bordered-img"/>
        </div>}
      </SlideIn>}

      <Table title="Purchase List" data={data} onView={onRowViewHandler} />
    </>
  );
}

export default ListPurchase;