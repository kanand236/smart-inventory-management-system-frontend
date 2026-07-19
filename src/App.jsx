
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Categories from './pages/Categories'
import Products from './pages/Products'
import Inventory from './pages/Inventory'
import LowStock from './pages/LowStock'
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/Register";

function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/categories"
          element={
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />
        <Route
          path="/inventory"
          element={
            <ProtectedRoute>
              <Inventory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/low-stock"
          element={
            <ProtectedRoute>
              <LowStock />
            </ProtectedRoute>
          }
        />

        <Route
          path="/register"
          element={<Register />}
        />
      </Routes>

    </BrowserRouter>
  )
}

export default App
