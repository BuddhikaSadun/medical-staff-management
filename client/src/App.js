import { BrowserRouter, Routes, Route } from "react-router-dom";

import Staff from "./components/Staff";
import AddStaff from "./components/AddStaff";
import UpdateStaff from "./components/UpdateStaff";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Staff />} />
          <Route path="/add" element={<AddStaff />} />
          <Route path="/update/:id" element={<UpdateStaff />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
