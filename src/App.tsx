import { Routes, Route, Navigate } from 'react-router-dom';
import SideMenu from './components/SideMenu';
import HomePage from './components/HomePage';
import InventoryPage from './components/InventoryPage';
import NewProductPage from './components/NewProductPage';
import EditProductPage from './components/EditProductPage';
import SmartInventoryPage from './components/SmartInventoryPage';
import OCRResultPage from './components/OCRResultPage';
import ProfilePage from './components/ProfilePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';

function App() {
  return (
    <Routes>
      {/* Auth Routes - No sidebar */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Main App Routes - With sidebar */}
      <Route
        path="/*"
        element={
          <div className="min-h-screen bg-bg-main">
            <SideMenu />
            <main className="md:pl-64">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/inventory" element={<InventoryPage />} />
                <Route path="/new-product" element={<NewProductPage />} />
                <Route path="/edit-product/:id" element={<EditProductPage />} />
                <Route path="/smart-inventory" element={<SmartInventoryPage />} />
                <Route path="/ocr-result" element={<OCRResultPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
        }
      />
    </Routes>
  );
}

export default App;
