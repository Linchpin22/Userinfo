import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Use Routes instead of Switch
import UserTable from "./UserTable";
import UserDetail from "./UserDetail";
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <Router>
       <ToastContainer />
      <Routes> {/* Change Switch to Routes */}
        <Route path="/" element={<UserTable />} /> {/* Use element prop instead of component */}
        <Route path="/user/:id" element={<UserDetail />} /> {/* Use element prop instead of component */}
      </Routes>
    </Router>
  );
};

export default App;


