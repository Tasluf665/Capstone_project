import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { $user, setUser } from "store/user";
import { useStore } from "@nanostores/react";
import secureLocalStorage from "react-secure-storage";
import { useSearchParams } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import "./styles.css";

const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:3002";

const AuthScreen = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const user = useStore($user);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token).data;
      secureLocalStorage.setItem("session", decodedToken); // Store user in secure storage
      setUser(decodedToken); // Store user in store
      navigate("/dashboard");
    }
  }, [token]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear errors on typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!isLogin && !formData.name.trim()) {
      newErrors.name = "El nombre es requerido";
    }

    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    if (!formData.password) {
      newErrors.password = "La contraseña es requerida";
    } else if (formData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    if (!isLogin && formData.password !== formData.passwordConfirm) {
      newErrors.passwordConfirm = "Las contraseñas no coinciden";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      if (isLogin) {
        axios
          .post(`${BACKEND_URL}/api/user/auth/login`, {
            email: formData.email,
            password: formData.password,
          })
          .then((response) => {
            console.log("Inicio de sesión exitoso", response.data.data);

            secureLocalStorage.setItem("session", response.data.data); // Store user in secure storage

            setUser(response.data.data); // Store user in store
            setSubmitted(true);
            setFormData({
              name: "",
              email: "",
              password: "",
            });
            // redirect to dashboard
            navigate("/dashboard");
          })
          .catch((error) => {
            console.error("Error al iniciar sesión", error);
            setErrors({ email: "Credenciales inválidas" });
          });
      } else {
        axios
          .post(`${BACKEND_URL}/api/user/auth/signup`, {
            name: formData.name,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
            passwordConfirm: formData.passwordConfirm,
          })
          .then((response) => {
            console.log("Registro exitoso", response.data);
            setSubmitted(true);
            setFormData({
              name: "",
              lastName: "",
              email: "",
              password: "",
              passwordConfirm: "",
            });

            navigate("/dashboard");
          })
          .catch((error) => {
            console.error("Error al registrarse", error);
            setErrors({ email: "Error en el registro" });
          });
      }
    }
  };

  // Toggle between login and signup
  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setFormData({
      name: "",
      email: "",
      password: "",
    });
  };

  const handleGoogleSignIn = () => {
    // Redirect to Google sign-in route
    window.location.href = `${BACKEND_URL}/auth/google/signin`;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            {isLogin ? "Log In" : "Sign Up"}
          </h1>
          <p className="text-gray-600 mt-2">
            {isLogin
              ? "Enter your credentials to log in"
              : "Fill out the form to sign up"}
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-6 w-full">
          {/* Campo de nombre (solo en registro) */}
          {!isLogin && (
            <div className="mt-6">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name
              </label>
              <div className="relative">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className={`pl-10 w-full py-2 px-4 border ${errors.name ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Your full name"
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>
          )}
          {/* Campo de apellido (solo en registro) */}
          {!isLogin && (
            <div className="mt-6">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Last Name
              </label>
              <div className="relative">
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="pl-10 w-full py-2 px-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your last name"
                />
              </div>
            </div>
          )}

          {/* Campo de email */}
          <div className="mt-6">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={`pl-10 w-full py-2 px-4 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="example@email.com"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Campo de contraseña */}
          <div className="mt-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                className={`pl-10 w-full py-2 px-4 border ${errors.password ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder={isLogin ? "Your password" : "Create a password"}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? <span>I</span> : <span>O</span>}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          {/* Campo de confirmación de contraseña (solo en registro) */}
          {!isLogin && (
            <div className="mt-6">
              <label
                htmlFor="passwordConfirm"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="passwordConfirm"
                  name="passwordConfirm"
                  type={showPassword ? "text" : "password"}
                  value={formData.passwordConfirm}
                  onChange={handleChange}
                  className={`pl-10 w-full py-2 px-4 border ${errors.passwordConfirm ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Confirm your password"
                />
              </div>
              {errors.passwordConfirm && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.passwordConfirm}
                </p>
              )}
            </div>
          )}

          {/* Botón de envío */}
          <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
            <button
              type="submit"
              disabled={submitted}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '9999px',
                fontSize: '1rem',
                fontWeight: 'bold',
                color: '#fff',
                background: submitted ? '#22c55e' : '#6366f1',
                border: 'none',
                cursor: 'pointer',
                marginBottom: 12,
                transition: 'background 0.2s',
              }}
              onMouseOver={e => { if (!submitted) e.currentTarget.style.background = '#4f46e5'; }}
              onMouseOut={e => { if (!submitted) e.currentTarget.style.background = '#6366f1'; }}
            >
              {submitted ? "Success" : <span>{isLogin ? "Log In" : "Sign Up"}</span>}
            </button>
            <div style={{ display: 'flex', alignItems: 'center', margin: '4px 0' }}>
              <div style={{ flex: 1, height: 1, background: '#d1d5db' }} />
              <span style={{ margin: '0 12px', color: '#6b7280', fontWeight: 600 }}>OR</span>
              <div style={{ flex: 1, height: 1, background: '#d1d5db' }} />
            </div>
            <button
              type="button"
              onClick={handleGoogleSignIn}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                padding: '12px',
                borderRadius: '9999px',
                background: '#fff',
                color: '#374151',
                fontWeight: 'bold',
                fontSize: '1rem',
                border: '1px solid #e5e7eb',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
              onMouseOver={e => { e.currentTarget.style.background = '#f3f4f6'; }}
              onMouseOut={e => { e.currentTarget.style.background = '#fff'; }}
            >
              <img
                src="https://img.icons8.com/color/48/000000/google-logo.png"
                alt="Google"
                style={{ width: 22, height: 22, marginRight: 8 }}
              />
              <span>Continue with Google</span>
            </button>
          </div>
        </form>

        {/* Alternar entre inicio de sesión y registro */}
        <div className="text-center">
          <button
            type="button"
            onClick={toggleAuthMode}
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            {isLogin
              ? "Don't have an account? Sign up"
              : "Already have an account? Log in"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
