import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";

import Dashboard from "./pages/Dashboard";
import PropertyDashboard from "./pages/PropertyDashboard";
import PropertiesDetails from "./pages/PropertiesDetails";
import ExpenseDashboard from "./pages/ExpenseDashboard";
import MonthlySummaryTable from "./pages/MonthlySummaryTable";
import BookingDashboard from "./pages/BookingDashboard"; // ✅

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Default redirect to /dashboard */}
        <Route index element={<Navigate to="/dashboard" replace />} />

        {/* Dashboard and nested summary route */}
        <Route path="dashboard">
          <Route index element={<Dashboard />} />
          <Route path="summary" element={<MonthlySummaryTable />} />
        </Route>

        {/* Other standalone routes */}
        <Route path="properties" element={<PropertyDashboard />} />
        <Route path="properties/:id" element={<PropertiesDetails />} />
        <Route path="expenses" element={<ExpenseDashboard />} />
        <Route path="bookings" element={<BookingDashboard />} /> {/* ✅ NEW */}
        <Route path="logout" element={<div>Logging out...</div>} />
      </Route>
    </Routes>
  );
};

export default App;


