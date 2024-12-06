import { useState } from "react";
import Footer from "../Components/Footer";
import Sidebar from "../Components/Sidebar";

const DashboardLayout = ({children}) => {
    const [collapse, setCollapse] = useState(false);
    return(
        <div className={"dashboard light" + (collapse ? " sidebar-collapsed" : "")}>
            <div className="sidebar">
                <span className="nav-collpase-btn" onClick={()=>setCollapse(!collapse)}><i className={"fa" + (collapse ? " fa-bars" : " fa-chevron-left")}></i></span>
                <Sidebar/>
            </div>
            <div className="content">
                {children}
            </div>
            <div className="footer">
                <Footer/>
            </div>
        </div>
    );
}

export default DashboardLayout;