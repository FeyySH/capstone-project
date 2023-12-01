import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginSuccess, setLoginSuccess] = useState(false);

    const handleLogin = () => {
        const hardcodedUsername = 'Feyy';
        const hardcodedPassword = '1234';

        if (username === hardcodedUsername && password === hardcodedPassword) {
            console.log('Login successful');
            setLoginSuccess(true);
        } else {
            console.log('Login failed. Incorrect username or password.');
            setLoginSuccess(false);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title text-center">Login</h3>
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="d-grid gap-2">
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={handleLogin}
                                    >
                                        Login
                                    </button>
                                </div>
                            </form>
                            {loginSuccess && <p className="text-success">Login successful!</p>}
                            {!loginSuccess && <p className="text-danger">Login failed. Please check your username and password.</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
