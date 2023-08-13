import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signup from "./components/Signup";
import Login from "./components/Login";
import Staff from "./components/Staff";
import AddStaff from "./components/AddStaff";
import UpdateStaff from "./components/UpdateStaff";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Staff />} />
          <Route path="/add" element={<AddStaff />} />
          <Route path="/update/:id" element={<UpdateStaff />} />
          <Route path="/staff/:id" element={<Staff />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
