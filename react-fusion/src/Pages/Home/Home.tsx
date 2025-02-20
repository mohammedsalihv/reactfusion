import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1 style={{ color: "white" }}>Welcome to Home </h1>
      <button onClick={handleLogin} style={buttonStyle}>
        Please login to continue
      </button>
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
