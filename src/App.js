import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import DashboardLayout from "./Layout/dashboardLayout";
import { useState } from "react";
import Login from "./Screens/login";
import Dashboard from "./Screens/dashboard";
import ListPurchase from "./Screens/purchase/listPurchase";
import AddPurchase from "./Screens/purchase/addPurchase";
import ListDelivery from "./Screens/delivery/lisDelivery";
import AddDelivery from "./Screens/delivery/addDelivery";
import Inventory from "./Screens/inventory";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <Router>
      {(isLoggedIn || window.localStorage.login) ? 
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/listPurchase" element={<ListPurchase />} />
          <Route path="/addPurchase" element={<AddPurchase />} />
          <Route path="/listDelivery" element={<ListDelivery />} />
          <Route path="/addDelivery" element={<AddDelivery />} />
        </Routes>
      </DashboardLayout> :

        <Routes>
          <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>}
    </Router>
  );
}

export default App;
