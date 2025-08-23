import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";



function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setAuthError(err.code);
    }
  };

  return (
    <form id="sign-up-form" onSubmit={handleSignup}>
      <h1>Sign Up</h1>
      <p id="error">{authError.slice(5)}</p>
      <input id="email-input" type="email" value={email} placeholder="Enter your email" onChange={e => setEmail(e.target.value)} />
      <input id="password-input" type="password" value={password} placeholder="Enter your password" onChange={e => setPassword(e.target.value)} />
      <button type="submit">Sign Up</button>
      <Link id="login-link" to="/login" >Already have an account?</Link>
    </form>
  );
}

export default Signup;