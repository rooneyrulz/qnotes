import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { FaGoogle, FaGithub, FaSignInAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import PulseLoader from "react-spinners/PulseLoader";

import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";
import usePersist from "../../hooks/usePersist";
import usePersistOAuth from "../../hooks/usePersistOAuth";
import useTitle from "../../hooks/useTitle";
import useLoading from "../../hooks/useLoading";

const Login = () => {
  useTitle("QNotes: Employee Login");

  const userRef = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [, setLoading] = useLoading();
  const [persist, setPersist] = usePersist();
  const [, setPersistOAuth] = usePersistOAuth();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const handleGoogleLogin = () => {
    setPersistOAuth(true);
    setLoading(true);
    window.open(process.env.REACT_APP_GOOGLE_OAUTH_URL, "_self");
  };

  const handleGithubLogin = () => {
    setPersistOAuth(true);
    setLoading(true);
    window.open(process.env.REACT_APP_GITHUB_OAUTH_URL, "_self");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { accessToken } = await login({ username, password }).unwrap();
      handleLoginSuccess(accessToken);
    } catch (err) {
      handleLoginError(err);
    }
  };

  const handleLoginSuccess = (accessToken) => {
    if (accessToken) {
      dispatch(setCredentials({ accessToken }));
      navigate("/dash");
      toast("Login Successful!", { type: "success" });
      setUsername("");
      setPassword("");
    }
  };

  const handleLoginError = (err) => {
    if (!err.status) {
      toast("No server response!!", { type: "error" });
    } else {
      handleServerError(err);
    }
  };

  const handleServerError = (err) => {
    switch (err.status) {
      case 400:
        toast("Fill all fields!", { type: "error" });
        break;
      case 401:
        toast("Unauthorized!", { type: "error" });
        break;
      default:
        const errorMessage = err.data?.message || "Something went wrong!";
        toast(errorMessage, { type: "error" });
        break;
    }
  };

  const handleUserInput = (e) => setUsername(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);
  const handleToggle = () => setPersist((prev) => !prev);

  if (isLoading) return <PulseLoader color={"#FFF"} />;

  const content = (
    <section className="public">
      <header>
        <h1>Employee Login</h1>
      </header>
      <main className="login">
        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            className="form__input"
            type="text"
            id="username"
            ref={userRef}
            value={username}
            onChange={handleUserInput}
            autoComplete="off"
            placeholder="Your awesome username"
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            className="form__input"
            type="password"
            id="password"
            onChange={handlePwdInput}
            value={password}
            placeholder="Your cool password"
            required
          />
          <div className="form__helper">
            <span className="form__text">
              We will never share your usernames, email addresses. Your password
              is encrypted.
            </span>
          </div>
          <button
            type="submit"
            className="form__submit-button form-button-login"
          >
            <FaSignInAlt /> <span>Sign In</span>
          </button>
          <button
            type="button"
            className="form__submit-button form-button-google"
            onClick={handleGoogleLogin}
          >
            <FaGoogle /> Google
          </button>
          <button
            type="button"
            className="form__submit-button form-button-github"
            onClick={handleGithubLogin}
          >
            <FaGithub /> GitHub
          </button>
          <label htmlFor="persist" className="form__persist">
            <input
              type="checkbox"
              className="form__checkbox"
              id="persist"
              onChange={handleToggle}
              checked={persist}
            />
            Trust This Device
          </label>
        </form>
      </main>
    </section>
  );

  return content;
};
export default Login;
