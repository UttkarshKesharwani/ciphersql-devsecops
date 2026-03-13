import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/SignupLogin.css";
import { AuthContext } from "../context/AuthContext";
import { login } from "../services/AuthService";

function Login() {
    let [details, setDetails] = useState({
        email: "",
        password: ""
    });
    let { user, setUser, setToken } = useContext(AuthContext);
    let [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setDetails({
            ...details,
            [e.target.name]: e.target.value
        });
    };


    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        if (!details.email || !details.password) {
            setError("Please fill out all fields");
            return;
        }

        try {
            const res = await login(details.email, details.password);
            console.log(res);
            if (res.token) {
                const loggedInUser = { _id: res._id, name: res.name, email: res.email };
                setUser(loggedInUser);
                setToken(res.token);
                localStorage.setItem("token", res.token);
                localStorage.setItem("user", JSON.stringify(loggedInUser));
                navigate("/");
            } else {
                setError(res.error || "Login failed");
            }
        } catch (err) {
            console.log(err)
            setError(err.message);
        }

    };


    console.log(user)

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Welcome Back</h2>

                {error && <div className="login-error">{error}</div>}

                <form className="login-form" onSubmit={handleLogin}>
                    <div className="login-details">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter Email"
                            value={details.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="login-details">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter Password"
                            value={details.password}
                            onChange={handleChange}
                        />
                    </div>
                    
                    <button type="submit" className="login-btn">Login</button>

                    <p className="login-footer-text">
                        Don't have an account? <Link to="/signup" className="login-footer-link">Sign up</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;