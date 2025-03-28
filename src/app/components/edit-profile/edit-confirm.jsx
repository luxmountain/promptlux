import React from "react";

function EditConfirm({
  isModified,
  isOpenConfirm,
  hasError,
  handleReset,
  confirmReset,
  setIsOpenConfirm,
}) {
  return (
    <div className="shadow-[0px_0px_8px_0px_rgba(0,0,0,0.1)] bg-white p-8 flex justify-center gap-4">
      <button
        className={`px-4 py-2 rounded-[24px] ${
          isModified
            ? "text-black text-base font-semibold bg-[#e9e9e9] transition duration-300 hover:bg-[#cdcdcd]"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
        }`}
        disabled={!isModified}
        onClick={handleReset}
      >
        Reset
      </button>
      {isOpenConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-[20px] shadow-lg w-[540] h-[202] flex flex-col justify-center text-center gap-3">
            <h2 className="text-[28px] font-semibold">Are you sure?</h2>
            <p className="text-base text-gray-600">
              Any changes you have made will be lost.
            </p>
            <div className="mt-4 flex justify-center gap-3">
              <button
                className="px-4 py-2 rounded-full bg-[#e9e9e9] transition duration-300 hover:bg-[#cdcdcd] text-black font-medium"
                onClick={() => setIsOpenConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-full bg-[#e60023] hover:bg-[#b60000] transition duration-300 text-white text-base font-medium"
                onClick={confirmReset}
              >
                Reset changes
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        className={`px-4 py-2 rounded-[24px] ${
          isModified && !hasError
            ? "bg-[#e60023] text-white text-base font-semibold hover:bg-[#b60000] transition duration-300"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
        }`}
        disabled={!isModified || hasError}
      >
        Save
      </button>
    </div>
  );
}

export default EditConfirm;
