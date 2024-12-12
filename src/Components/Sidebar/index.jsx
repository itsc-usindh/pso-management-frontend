import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";


const Sidebar = () => {
    const [expandedItem, setExpandedItem] = useState();
    const currentPath= useLocation().pathname;

    useEffect(()=>{
        console.log((currentPath))
        if(!routes.find(r=>r.subMenu?.some(sr=> sr.route === currentPath)))
        setExpandedItem("");
    },[currentPath]);
    const routes = [
        {
            name: "Dashboard",
            route: "/",
            icon: <i className="fas fa-home icon"></i>,
            type: 1,
            subMenu:null
        },
        {
            name: "Inventory Items",
            route: "/inventory",
            icon: <i className="fas fa-box-open icon"></i>,
            type: 1,
            subMenu:null
        },
        {
            name: "Purchase",
            route: "/purchase",
            icon: <i className="fas fa-shopping-cart icon"></i>,
            type: 2,
            subMenu: [
                {
                    name: "List Purchase",
                    route: "/listPurchase",
                    icon: <i className="fas fa-bars icon"></i>,
                    type: 1
                },
                {
                    name: "Add Purchase",
                    route: "/addPurchase",
                    icon: <i className="fas fa-plus icon"></i>,
                    type: 1
                }
            ]
        },
        {
            name: "Delivery",
            route: "/delivery",
            icon: <i className="fas fa-shopping-cart icon"></i>,
            type: 2,
            subMenu: [
                {
                    name: "List Deliveries",
                    route: "/listDelivery",
                    icon: <i className="fas fa-bars icon"></i>,
                    type: 1
                },
                {
                    name: "Add Delivery",
                    route: "/addDelivery",
                    icon: <i className="fas fa-plus icon"></i>,
                    type: 1
                }
            ]
        },
        {
            name: "Dashboard2",
            route: "/2",
            icon: <i className="fas fa-home icon"></i>,
            type: 1,
            subMenu:null
        },
    ];

    
    const expandItem = (selectedRoute) => {
        if(selectedRoute === expandedItem) setExpandedItem("");
        else setExpandedItem(selectedRoute)
    }

    return (
        <div className="sidebar-content">
            <div className="title">
                <h1>PSO Management</h1>
                <div className="seperator"></div>
            </div>
            <ul className="nav-items">
                {
                    routes.map((route, i) => {
                        if (route.type === 1)
                            return <li key={route.name} className={currentPath === route.route ? "active" : ""}>
                                <Link to={route.route}>
                                    {route.icon}
                                    <span>{route.name}</span>
                                </Link>
                            </li>
                        else
                            return (<li key={route.name} className={expandedItem === route.name ? "expand":""}>
                                <div className="btn-expandable" onClick={(e)=>expandItem(route.name)}>
                                    {route.icon}
                                    <span className="w-100">{route.name}</span>
                                    <i className="fas fa-chevron-right icon icon-sm"></i>
                                </div>
                                <div className="sub-menu">
                                    <ul className="m-0">
                                        {route.subMenu.map(sm =>
                                            <li key={sm.name} className={currentPath === sm.route ? "active" : ""}>
                                                <Link to={sm.route}>
                                                    {sm.icon}
                                                    <span>{sm.name}</span>
                                                </Link>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </li>)
                    }
                    )
                }
            </ul>
        </div>
    );
}

export default Sidebar;