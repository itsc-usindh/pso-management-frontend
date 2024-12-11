import photo from "../../Assets/images/photo.jpg"

const Topbar = ({ title }) => {
    const logoutHandler = () =>{
        delete window.localStorage.login;
        window.location.href = '/'
    }
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
                        <div className="top-menu">
                            <p className="user"><img alt="" src={photo} className="profile-photo img-fluid"/>Aimal Jan</p>
                            <p><i className="fa fa-cog"></i> Profile Settings</p>
                            <p onClick={logoutHandler}><i className="fa fa-sign-out"></i> Log out</p>
                        </div>
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