import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import DashboardLayout from "./Layout/dashboardLayout";
import Dashboard from "./Screens/dashboard";
import ListPurchase from "./Screens/purchase/listPurchase";
import AddPurchase from "./Screens/purchase/addPurchase";

function App() {
  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/listPurchase" element={<ListPurchase />} />
          <Route path="/addPurchase" element={<AddPurchase />} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
}

export default App;
