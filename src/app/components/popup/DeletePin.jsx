import React from "react";

function DeletePinPopup({ isOpen, onClose, onConfirm, isLoading }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-xl font-bold mb-3">Are you sure?</h2>
        <p className="text-gray-600">
          If you delete this Pin, it'll be gone forever and no-one who has saved it will be able to view it.
        </p>
        <div className="flex justify-center mt-4 space-x-4">
          {/* Cancel Button */}
          <button
            className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </button>

          {/* Delete Button */}
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletePinPopup;
