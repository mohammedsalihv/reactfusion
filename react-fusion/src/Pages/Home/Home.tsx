
import { useAuth } from "../../Auth/AuthContext";

const Home = () => {
    const { login } = useAuth();

    return (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
            <h1>Welcome to Public Page</h1>
            <button onClick={login} style={buttonStyle}>Login with Google</button>
        </div>
    );
};

const buttonStyle: React.CSSProperties = {
    padding: "10px 20px",
    background: "#4285F4",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
};

export default Home;
