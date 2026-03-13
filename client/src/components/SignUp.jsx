import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/SignupLogin.css";
import { AuthContext } from "../context/AuthContext";
import { signup } from "../services/AuthService";

function SignUp() {
    const [details, setDetails] = useState({
        username: "",
        email: "",
        password: ""
    });
    let [error, setError] = useState(null);
    let { user, setUser, setToken } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setDetails({
            ...details,
            [e.target.name]: e.target.value
        });
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError(null);
        if (!details.username || !details.email || !details.password) {
            setError("Please fill out all fields");
            return;
        }

        try {
            const res = await signup(details.username, details.email, details.password);
            console.log(res);
            if (res.token) {
                const loggedInUser = { _id: res._id, name: res.name, email: res.email };
                setUser(loggedInUser);
                setToken(res.token);
                localStorage.setItem("token", res.token);
                localStorage.setItem("user", JSON.stringify(loggedInUser));
                navigate("/");
            } else {
                setError(res.error || "Signup failed");
            }
        } catch (err) {
            console.log("Erron in Sinup.jsx",err)
            setError(err.message);
        }
    };


    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Create an Account</h2>

                <form className="login-form" onSubmit={handleSignUp}>
                    <div className="login-details">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            name="username"
                            placeholder="Enter Username"
                            value={details.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="login-details">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter Email"
                            value={details.email}
                            onChange={handleChange}
                            required
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
                            required
                        />
                    </div>

                    <button type="submit" className="login-btn">Sign Up</button>

                    <p className="login-footer-text">
                        Already have an account? <Link to="/login" className="login-footer-link">Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
