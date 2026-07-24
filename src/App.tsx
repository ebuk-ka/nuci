import { Routes, Route } from "react-router-dom";

import MainLayout from "@/components/layout/MainLayout";
import ChatWindow from "@/components/chat/ChatWindow";

import Login from "@/pages/Login";
import Register from "@/pages/Register";
// import ProtectedRoute from "@/components/auth/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout>
            <ChatWindow />
          </MainLayout>
        }
      />


      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;