import Table from "../../Components/Table";
import Topbar from "../../Components/Topbar";

const ListPurchase = () => {
    const data = [
        {
          "organizationId": 1,
          "purchaseId": 1,
          "purchaseDate": "2024-12-02T00:00:00",
          "purchase": "Office Chairs, Printer",
          "vendorDetails": null,
          "organization": "University Of Sindh",
          "officeOrderNumber": "PUOS1234",
          "officeOrderUrl": "",
        },
        {
          "organizationId": 1,
          "purchaseId": 2,
          "purchaseDate": "2024-12-04T00:00:00",
          "purchase": "Office Chairs, Printer",
          "vendorDetails": null,
          "organization": "University Of Sindh",
          "officeOrderNumber": "AEB234231",
          "officeOrderUrl": "https://plchldr.co/i/336x280",
        }
      ]
    return (
        <>
            <Topbar title={"Purchase / List"} />

            <Table title="Purchase List" data={data}/>
        </>
    );
}

export default ListPurchase;