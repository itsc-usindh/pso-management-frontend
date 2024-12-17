import { useEffect, useState } from "react";
import FormInput from "../FormInput";

const Table = ({ title, data, onView, onEdit, onDelete, tableOnly=false, isDark=false, isSmall=false, noPagination=false }) => {
    const maxPages = data && parseInt(data.length % 10 === 0 ? data.length / 10 : (data.length / 10) + 1);
    
    const [tableData, setTableData] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    useEffect(() => {
        if (data && data.length > 0) {
            setTableData(data.slice(0, 10)); 
        }
        else setTableData([]);
    }, [data]);

    const changePage = (pageNumber) => {
        if (pageNumber > maxPages || pageNumber === 0) return;

        const st = (pageNumber - 1) * 10;
        const ed = pageNumber * 10;
        setCurrentPage(pageNumber);

        setTableData(data.slice(st, ed));
    }
    const searchFromData = (search) => {
        setTableData(filterData(search));
    }
    const filterData = (searchString) => {
        return data.filter(item => {
            return Object.keys(item).some(key => {
                const value = item[key];

                if (typeof value === 'string' || typeof value === 'number') {
                    return value.toString().toLowerCase().includes(searchString.toLowerCase());
                }

                return false;
            });
        });
    };
    
    return (
        <div className={"p-3" + (isDark? " dark-table":"") + (isSmall?" small-table":"")}>
            {!tableOnly && <div className="table-header d-flex justify-content-between align-items-center">
                <h2 className="ms-2">{title}</h2>

                <div className="d-flex align-items-center">
                    <span className="icon-btn-w me-3"><i className="fa fa-filter"></i></span>
                    <FormInput label="Search" setValue={searchFromData} />
                </div>
            </div>}

            {(data && tableData && tableData?.length > 0) &&
                <>
                    <div className="overflow-auto">
                        <table className="table table-borderless">
                            <thead>

                                <tr>
                                    {Object.keys(tableData[0]).map(th =>
                                        <th key={th}>{th}</th>
                                    )}
                                    {(onEdit||onDelete||onView) &&<th><div className="d-flex justify-content-center"><i className="fa fa-computer-mouse"></i></div></th>}
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.map((row,index) =>
                                    <tr key={index}>
                                        {Object.keys(row).map(rowItem => <td key={rowItem} className={rowItem}>{row[rowItem]?.toString().startsWith("http") ? <img src={row[rowItem]?.toString()} alt=""/>: <p className="m-0">{row[rowItem]?.toString()}</p> }</td>)}
                                        {(onEdit||onDelete||onView) &&
                                        <td>
                                            <div className="d-flex justify-content-center">
                                                {onView&&<span title="View" className="icon-btn m-0" onClick={e=>onView(row,e)}><i className="fa fa-eye"></i></span>}
                                                {onEdit&&<span title="Edit" className="icon-btn m-0" onClick={e=>onEdit(row,e)}><i className="fa fa-pen"></i></span>}
                                                {onDelete && <span title="Delete" className="icon-btn m-0" onClick={e=>onDelete(row,e)}><i className="fa fa-trash ml-2"></i></span>}
                                            </div>
                                        </td>}
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {!noPagination && <div className="pagination">
                        <span className="icon-btn-w" onClick={() => changePage(currentPage - 1)}><i className="fa fa-chevron-left"></i></span>
                        {Array.from({ length: maxPages }, (_, i) =>
                            <span className={"icon-btn-w" + (currentPage === i + 1 ? " active" : "")} key={i} onClick={() => changePage(i + 1)}>{i + 1}</span>
                        )}
                        <span className="icon-btn-w" onClick={() => changePage(currentPage + 1)}><i className="fa fa-chevron-right"></i></span>
                    </div>}
                </>
            }

            {(!data) &&
                <p className="no-data-row text-center">No Data available</p>
            }
            {(tableData.length === 0) &&
                <p className="no-data-row text-center">No record found</p>
            }
        </div>
    )
}

export default Table;