import { useState } from "react";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";

const Login = ({ showAlert }) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const history = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://inotebook-backend-rust.vercel.app/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });

            const data = await response.json();
            if (response.ok) {
                // Save the authtoken and redirect
                localStorage.setItem('token', data.authtoken);
                showAlert("Logged in Successfully", "success");
                history('/');
            } else {
                showAlert("Invalid credentials", "danger");
            }
        } catch (error) {
            console.error('Error during login:', error);
            showAlert("Error during login", "danger");
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div className="container mt-4 p-xxl-3">
            <h2>Login to continue iNotebook</h2>
            <form className="mt-3" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} name="email" id="email" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} id="password" name="password" onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
};

Login.propTypes = {
    showAlert: PropTypes.func.isRequired
};

export default Login;
