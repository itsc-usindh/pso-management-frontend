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
                        <h1>123 <sub>Total Item</sub></h1>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="box">
                        <h1>123 <sub>Total Deleiveries</sub></h1>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="box">
                        <h1>65 <sub>Pending Deleiveries</sub></h1>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Dashboard;