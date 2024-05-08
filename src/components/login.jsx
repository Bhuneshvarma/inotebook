import { useState } from "react";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom/dist";
const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    let history = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: credentials.email, password: credentials.password })
            });

            const json = await response.json();
            // console.log(json);
            // Optionally, you can provide feedback to the user here
            if (json.success) {
                //Save the authtoken and redirect
                localStorage.setItem('token', json.authtoken);
                props.showAlert("Logged in Successfully", "success")
                history("/");

            } else {
                props.showAlert("Invalid credentials", "danger")
            }


        } catch (error) {
            alert.error('Error during login:', error);
            // Optionally, provide feedback to the user about the error
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div style={{backgroundColor:"#cde2f9"}} className="container mt-4  p-xxl-3">
            <h2 >Login to continue iNotebook</h2>
            <form  className="mt-3" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} name="email" aria-describedby="emailHelp" id="email" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} id="password" name="password" onChange={onChange} />
                </div>
                <button  type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
};
Login.propTypes = {
    showAlert: PropTypes.func
};
export default Login;