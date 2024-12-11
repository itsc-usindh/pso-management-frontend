const SlideIn = ({ title, children, show, setShowSlideIn }) => {
    return (
        <div className={"slidein" + (show ? " show" : "")}>
            <div className="d-flex align-items-center">
                <span className="icon-btn m-0 me-2" onClick={() => setShowSlideIn && setShowSlideIn(false)}><i className="fa fa-times"></i></span>
                {title && <h3 className="m-0">{title}</h3>}
            </div>
            <hr />

            <div className="content">
                {children}
            </div>
        </div>
    )
}

export default SlideIn;