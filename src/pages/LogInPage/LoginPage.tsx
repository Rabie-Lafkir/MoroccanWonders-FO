import React, { useState, useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { setAuthData } from "../../store/authSlice";
import axiosInstance from "../../helpers/axiosInstance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { ToastContext } from "../../helpers/context/ToastContext";
import { startLoading, stopLoading } from "../../store/loadingSlice";
import "./LoginPage.css";

export default function LoginPage() {
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toastContext = useContext(ToastContext);

  /**
   * Handling 'Remember me' logic
   */
  useEffect(() => {
    const savedUsername = localStorage.getItem("rememberMeUsername");
    const savedPassword = localStorage.getItem("rememberMePassword");
    if (savedUsername && savedPassword) {
      setUsername(savedUsername);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

  /**
   * Regex for email validation
   * @param email 
   * @returns 
   */
  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(String(email).toLowerCase());
  };

  /**
   * Regex for password validation
   * @param password 
   * @returns 
   */
  const validatePassword = (password: string) => {
    // Minimum eight characters, at least one letter, one number, and one special character
    const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(password);
  };

  /**
   * handleLogin
   * @param e 
   * @returns 
   */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(username)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        username: t("validation.invalidEmail"),
      }));
      return;
    }

    if (!validatePassword(password)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: t("validation.passwordRequirements"),
      }));
      return;
    }

    dispatch(startLoading());
    setLoading(true)
    try {
      const response = await axiosInstance.post("/account/login", {
        username,
        password,
      });
      const data = response.data;

      dispatch(
        setAuthData({
          userId: data.userId,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        })
      );

      if (rememberMe) {
        localStorage.setItem("rememberMeUsername", username);
        localStorage.setItem("rememberMePassword", password);
      } else {
        localStorage.removeItem("rememberMeUsername");
        localStorage.removeItem("rememberMePassword");
      }
      setLoading(false)
      navigate("/");
    } catch (error) {
      toastContext?.showToast("error", t("error"), t("loginFailed"));
      setLoading(false)
      console.log(error);
    } finally {
      dispatch(stopLoading());
      setLoading(false)
    }
  };

  /**
   * RedirectToForgetPassword
   */
  const RedirectToForgetPassword = () => {
    navigate("/forget-password", { state: { username } });
  };

  /**
   * togglePasswordVisibility
   */
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Helmet>
        <title>{`${t("login")} - Moroccan Wonders`}</title>
      </Helmet>
      <section className="contact-one" style={{ marginTop: "80px" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="contact-one__content">
                <div className="block-title text-left">
                  <p>{t("login")}</p>
                  <h3>{t("titleLogin")}</h3>
                </div>
                <div className="contact-one__content-text">
                  <p>{t("descriptionLogin")}</p>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <form className="contact-one__form" onSubmit={handleLogin}>
                <div className="row low-gutters">
                  <div className="col-md-12">
                    <div className={`input-group ${errors.username ? "error" : ""}`}>
                      <input
                        name="username"
                        type="text"
                        placeholder="Email"
                        value={username}
                        onChange={(e) => {
                          setUsername(e.target.value);
                          setErrors((prevErrors) => ({
                            ...prevErrors,
                            username: validateEmail(e.target.value)
                              ? ""
                              : t("validation.invalidEmail"),
                          }));
                        }}
                      />
                      {errors.username && (
                        <div className="error-message">{errors.username}</div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className={`input-group ${errors.password ? "error" : ""}`}>
                      <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          setErrors((prevErrors) => ({
                            ...prevErrors,
                            password: validatePassword(e.target.value)
                              ? ""
                              :  t("validation.passwordRequirements"),
                          }));
                        }}
                      />
                      <span
                        className="input-group-icon"
                        onClick={togglePasswordVisibility}
                      >
                        <FontAwesomeIcon
                          icon={showPassword ? faEyeSlash : faEye}
                        />
                      </span>
                      {errors.password && (
                        <div className="error-message">{errors.password}</div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-12">
                    <input
                      name="rememberMe"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <label htmlFor="rememberMe" className="ml-2">
                      {t("rememberMe")}
                    </label>
                  </div>
                  <div className="col-md-12">
                    <div className="input-group">
                      <button
                        type="submit"
                        className="thm-btn contact-one__btn"
                      >
                        {loading? <FontAwesomeIcon icon={faSpinner} spin /> : t("login")}
                      </button>
                    </div>
                    <a
                      href="javascript:void(0)"
                      onClick={RedirectToForgetPassword}
                    >
                      {t("forgetPassword")}
                    </a>
                  </div>
                  <div className="col-md-12">
                    <p>
                      {t("redirectSignup")}
                      <Link to="/signin">{t("signin")}</Link>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
