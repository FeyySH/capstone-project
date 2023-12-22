// app.jsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./components/AuthProvider";
import HomePage from "./pages/HomePage";
import NewBooking from "./pages/NewBooking";
import AuthPage from "./pages/AuthPage";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/profile" element={<HomePage />} />
          <Route path="/booking" element={<NewBooking />} />
          <Route path="/login" element={<AuthPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
