import React, { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import ModalWrapper from "../wrapper/ModalWrapper";

const LoginModal = ({ isOpen, onClose, onSwitch }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Chặn scroll khi modal mở
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden"); // Đảm bảo xóa khi unmount
    };
  }, [isOpen]);

  if (!isOpen) return null; // Ẩn modal khi không mở

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result.error) {
        alert("Invalid email or password");
      } else {
        onClose(); // Đóng modal sau khi đăng nhập thành công
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      {/* Tiêu đề */}
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">Welcome</h2>
  
      {/* Form đăng nhập */}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <a href="#" className="text-blue-600 text-sm block mb-4">
          Forgot your password?
        </a>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 mb-4 cursor-pointer">
          Log in
        </button>
      </form>
  
      {/* Đăng nhập bằng GitHub */}
      <div className="text-center mb-4">
        <p className="text-gray-500 mb-4">OR</p>
        <button
          onClick={() => signIn("github")}
          className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 flex items-center justify-center gap-2 cursor-pointer"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.167 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.014-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.152-1.11-1.46-1.11-1.46-.907-.62.068-.607.068-.607 1.003.07 1.531 1.03 1.531 1.03.892 1.528 2.34 1.087 2.91.832.092-.646.35-1.087.637-1.338-2.22-.253-4.555-1.11-4.555-4.94 0-1.092.39-1.984 1.03-2.682-.103-.253-.447-1.272.097-2.65 0 0 .84-.27 2.75 1.025a9.53 9.53 0 0 1 2.5-.337c.847.004 1.698.114 2.5.337 1.91-1.295 2.75-1.025 2.75-1.025.544 1.378.2 2.397.097 2.65.64.698 1.03 1.59 1.03 2.682 0 3.842-2.34 4.685-4.566 4.935.36.31.68.92.68 1.855 0 1.34-.012 2.42-.012 2.75 0 .267.18.58.688.482C19.135 20.165 22 16.418 22 12c0-5.523-4.477-10-10-10z"
            />
          </svg>
          Continue with GitHub
        </button>
      </div>
  
      {/* Chính sách điều khoản */}
      <p className="text-gray-500 text-center mt-6 text-sm">
        By continuing, you agree to our{" "}
        <a href="#" className="text-blue-600">Terms of Service</a> and{" "}
        <a href="#" className="text-blue-600">Privacy Policy</a>.
      </p>
  
      {/* Đăng ký tài khoản */}
      <p className="text-center mt-4 text-sm">
        Not a member?{" "}
        <button type="button" onClick={onSwitch} className="text-blue-600 cursor-pointer">
          Register
        </button>
      </p>
    </ModalWrapper>
  );
};

export default LoginModal;
