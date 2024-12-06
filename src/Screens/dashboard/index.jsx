import FormInput from "../../Components/FormInput";
import Topbar from "../../Components/Topbar"
import DashboardLayout from "../../Layout/dashboardLayout"

const Dashboard = () => {
    return (

        <>
        <div className="px-2">
            <Topbar title={"Dashboard"} />
        </div>

            <div className="row m-0">
                <div className="col-md-4">
                    <div className="box">
                        <h1>Reports</h1>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="box">
                        <h1>Reports</h1>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="box">
                        <h1>Reports</h1>
                        <FormInput label="Name" type="text"/>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Dashboard;