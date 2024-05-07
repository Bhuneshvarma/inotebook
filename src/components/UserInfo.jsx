import  { useState, useEffect } from 'react';

const UserInfo = () => {
    const [userData, setUserData] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: ''
    });
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/auth/getuser`, {
                    method: 'POST',
                    headers: {
                        "auth-token": localStorage.getItem('token')
                    }
                });

                const userData = await response.json();
                if (response.ok) {
                    setUserData(userData); // Set user data in state
                    setFormData({
                        name: userData.name,
                        email: userData.email
                    });
                } else {
                    console.error('Error fetching user information:', userData.error);
                }
            } catch (error) {
                console.error('Error fetching user information:', error);
            }
        };

        getUserInfo();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/api/auth/updateuser`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                },
                body: JSON.stringify(formData)
            });
            const updatedUserData = await response.json();
            if (response.ok) {
                setUserData(updatedUserData.user);
                console.log("User data updated successfully:", updatedUserData.user);
                setShowForm(false); // Hide the form after successful update
            } else {
                console.error('Error updating user information:', updatedUserData.error);
            }
        } catch (error) {
            console.error('Error updating user information:', error);
        }
    };

    const onhandle = () => {
        // Reload the current page
        window.location.reload();

    }
    const toggleForm = () => {
        setShowForm(!showForm);
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <h2 className="text-center mb-4">User Information</h2>
                    {userData && (
                        <div className="card">
                            <div className="card-body">
                                {showForm ? (
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label htmlFor="name" className="form-label">Name</label>
                                            <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label">Email</label>
                                            <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="password" className="form-label">Password</label>
                                            <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} />
                                        </div>
                                        <button type="submit" onClick={onhandle} className="btn btn-primary">Update</button>
                                    </form>
                                ) : (
                                    <>
                                        <p>ID: {userData._id}</p>
                                        <p>Email: {userData.email}</p>
                                        <p>Name: {userData.name}</p>
                                        <p>Joined: {new Date(userData.date).toLocaleDateString()}</p>
                                    </>
                                )}
                                <button className="btn btn-primary my-3" onClick={toggleForm}>
                                    {showForm ? "Cancel" : "Edit Profile"}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserInfo;
