const Topbar = ({ title }) => {
    return (
        <div className="topbar">
            <div className="topbar-content ps-4">
                <h2>{title}</h2>
                <div className="actions">
                    <span className="icon-btn">
                        <i className="fa fa-cog"></i>
                    </span>
                    <span className="icon-btn">
                        <i className="fa fa-user"></i>
                    </span>
                    <span className="icon-btn">
                        <i className="fa fa-bell"></i>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Topbar;