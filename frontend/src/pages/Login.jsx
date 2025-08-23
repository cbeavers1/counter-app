import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [authError, setAuthError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/dashboard");
        } catch (err) {
            console.error(err);
            setAuthError(err.code);
        }
    };

  return (
    <form id="sign-up-form" onSubmit={handleLogin}>
        <h1>Login</h1>
        <p id="error">{authError.slice(5)}</p>
        <input id="email-input" type="email" value={email} placeholder="Enter your email" onChange={e => setEmail(e.target.value)} />
        <input id="password-input" type="password" value={password} placeholder="Enter your password" onChange={e => setPassword(e.target.value)} />
        <button type="submit">Login</button>
    </form>
  );
}

export default Login;