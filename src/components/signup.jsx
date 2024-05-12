import { useState } from "react";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";


const Signup = (props) => {

  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
  let history = useNavigate();
  const backendApiUrl = import.meta.env.VITE_BACKEND_API;
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { name, email, password } = credentials;
      const response = await fetch(`${backendApiUrl}/api/auth/createuser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });

      const json = await response.json();
      // console.log(json);
      // Optionally, you can provide feedback to the user here
      if (json.success) {
        //Save the authtoken and redirect
        localStorage.setItem('token', json.authtoken);
        history('/');
        props.showAlert("Account Created Successfully", "success")

      } else {
        props.showAlert("Invalid Details", "danger")
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
    <div className="container mt-3">
      <h2 className="my-3">Create an account to use iNotebook</h2>
      <form  className="mt-3" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" name="name" id="name" onChange={onChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" name="email" aria-describedby="emailHelp" id="email" onChange={onChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" onChange={onChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}
Signup.propTypes = {
  showAlert: PropTypes.func
};
export default Signup
