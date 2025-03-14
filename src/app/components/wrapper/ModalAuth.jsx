import React, { useEffect } from "react";

const ModalWrapper = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Xử lý đóng modal khi bấm ra ngoài
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose(); // Chỉ đóng nếu bấm vào nền tối
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
      onClick={handleOverlayClick} // Thêm sự kiện này
    >
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer">
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default ModalWrapper;
