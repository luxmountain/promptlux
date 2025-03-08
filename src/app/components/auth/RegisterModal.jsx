import React from "react";
import ModalWrapper from "../wrapper/ModalWrapper";

const Register = ({ isOpen, onClose, onSwitch }) => {
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">Register</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Email"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Create a password"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Birthdate</label>
          <input type="date" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
          Register
        </button>
        <p className="text-center mt-4 text-sm">
            Already a member?{" "}
            <button onClick={onSwitch} className="text-blue-600">
                Log in
            </button>
        </p>
      </form>
    </ModalWrapper>
  );
};

export default Register;
