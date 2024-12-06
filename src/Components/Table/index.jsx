import { useState } from "react";
import FormInput from "../FormInput";
import { tab } from "@testing-library/user-event/dist/tab";

const Table = ({ title, data, tableOnly=false }) => {
    const maxPages = data && (data.length % 10 === 0 ? data.length / 10 : (data.length / 10) + 1);

    const [tableData, setTableData] = useState(data && data.slice(0, 10))
    const [currentPage, setCurrentPage] = useState(1)
    

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

    if(!data) return(<></>);
    
    return (
        <div className="p-3">
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
                                        <th>{th}</th>
                                    )}
                                    <th><i className="fa fa-computer-mouse"></i></th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.map(row =>
                                    <tr>
                                        {Object.keys(row).map(rowItem => <td>{row[rowItem]?.toString()}</td>)}
                                        <td>
                                            <span className="icon-btn m-0"><i className="fa fa-pen"></i></span>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="pagination">
                        <span className="icon-btn-w" onClick={() => changePage(currentPage - 1)}><i className="fa fa-chevron-left"></i></span>
                        {Array.from({ length: maxPages }, (_, i) =>
                            <span className={"icon-btn-w" + (currentPage === i + 1 ? " active" : "")} key={i} onClick={() => changePage(i + 1)}>{i + 1}</span>
                        )}
                        <span className="icon-btn-w" onClick={() => changePage(currentPage + 1)}><i className="fa fa-chevron-right"></i></span>
                    </div>
                </>
            }

            {(!data && !tableOnly) &&
                <p className="no-data-row text-center">No Data available</p>
            }
            {(tableData.length === 0 && !tableOnly) &&
                <p className="no-data-row text-center">No record found</p>
            }
        </div>
    )
}

export default Table;