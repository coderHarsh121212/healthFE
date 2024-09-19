import {  Route, BrowserRouter, Routes } from "react-router-dom";
import HealthDashboard from "./components/HealthDashboard";
import AddHealthRecord from "./components/AddHealthRecord";
import HealthRecordDetail from "./components/HealthRecordDetail";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/"  element={<HealthDashboard/>} />
      <Route path="/add" element={<AddHealthRecord/>} />
      <Route path="/health-record/:id" element={<HealthRecordDetail/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
