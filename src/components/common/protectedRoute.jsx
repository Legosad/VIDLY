import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import auth from "../../services/authService";

const ProtectedRoute = ({ element: Component, ...rest }) => {
  return (
    <>
      <Routes>
        <Route
          {...rest}
          element={auth.getUser() ? <Component /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
};

export default ProtectedRoute;
