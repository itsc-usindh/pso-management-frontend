import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import DashboardLayout from "./Layout/dashboardLayout";
import Dashboard from "./Screens/dashboard";
import ListPurchase from "./Screens/purchase/listPurchase";
import AddPurchase from "./Screens/purchase/addPurchase";
import { useState } from "react";
import Login from "./Screens/login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <Router>
      {(isLoggedIn || window.localStorage.login) ? 
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/listPurchase" element={<ListPurchase />} />
          <Route path="/addPurchase" element={<AddPurchase />} />
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
