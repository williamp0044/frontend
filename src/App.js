import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "./AppLayout";
import Login from "./Login";
import Prompts from "./Prompts";
import Logs from "./Logs";

function App() {
  const isAuthenticated = true;

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<AppLayout />} />
        {isAuthenticated && <Route path="/app" element={<AppLayout />} />}

        <Route path="/logs" element={<Logs />} />
        <Route path="/prompts" element={<Prompts />} />
      </Routes>
    </Router>
  );
}

export default App;
