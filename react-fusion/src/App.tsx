import { BrowserRouter, Routes, Route } from "react-router-dom";
import Counter from "./Components/Counter/Counter";
import UserForm from "./Components/UserForm/UserForm";
import RichTextEditor from "./Components/RichText/RichTextEditor";
import Login from "./Components/Login/Login";
import Dashboard from "./Pages/Dashboard/Dashbaord";
import { AuthProvider } from "./Auth/AuthContext";
import PrivateRoute from "./Components/PrivateRoute";
import "./App.css";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/Dashboard" element={<Dashboard/>}/>
                    <Route path="/login" element={<Login />} />
                    <Route path="/counter" element={<PrivateRoute><Counter /></PrivateRoute>} />
                    <Route path="/userform" element={<PrivateRoute><UserForm /></PrivateRoute>} />
                    <Route path="/texteditor" element={<PrivateRoute><RichTextEditor /></PrivateRoute>} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;

