import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./Components/Register";
import VerifyEmail from "./Components/VerifyEmail";
import Home from "./Components/Home";
import Login from "./Components/Login";
import ProtectedRoute from "./Components/ProtectedRoute";
import Dynamic from "./Components/Dynamic";
import EditProfile from "./Components/EditProfile";
import ForgotPassword from "./Components/ForgotPassword";
import Message from "./Components/Message";
import ResetPassword from "./Components/ResetPassword";
import Comment from "./Components/Comment";
import PostDetail from "./Components/PostDetail";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/:item" element = {<Dynamic />}/>
        <Route path="/edit-profile" element = {<EditProfile />}/>
        <Route path="/forgot-password" element = {<ForgotPassword />}/>
        <Route path="/message" element = {<Message />}/>
        <Route path="/reset-password/:token" element = {<ResetPassword />}/>
        <Route path="/comment/:id" element = {<Comment />}/>
        <Route path="/post/:id" element = {<PostDetail />}/>
      </Routes>
    </div>
  );
}

export default App;
