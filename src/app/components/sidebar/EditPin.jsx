import React, { useState, useEffect } from "react";

function EditPinSidebar({ isOpen, onClose, pid }) {
  const [isVisible, setIsVisible] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setTimeout(() => setIsVisible(false), 300); // Delay để hoàn tất animation trước khi ẩn
    }
  }, [isOpen]);

  // State lưu trữ dữ liệu nhập vào
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [promptUsed, setPromptUsed] = useState("");
  const [tags, setTags] = useState([]);
  const [isSaveClicked, setIsSaveClicked] = useState(false);

  // Hàm xử lý thêm tag
  const handleAddTag = (e) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      setTags([...tags, e.target.value.trim()]);
      e.target.value = "";
    }
  };

  // Hàm xử lý xóa tag
  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  // Xử lý lưu
  const handleSaveClick = () => {
    setIsSaveClicked(true);
    setTimeout(() => {
      setIsSaveClicked(false);
    }, 2000);
  };

  return isVisible ? (
    <div
      className={`fixed inset-0 transition-opacity duration-300 ${
        isOpen ? "visible opacity-100" : "invisible opacity-0"
      }`}
      style={{ zIndex: 50 }}
    >
      {/* Overlay làm mờ nền */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 ${
          isOpen ? "opacity-50" : "opacity-0"
        }`}
        style={{ zIndex: 50 }}
        onClick={onClose}
      ></div>

      {/* Sidebar với animation kéo từ phải vào */}
      <div
        className={`fixed top-0 right-0 w-96 h-full bg-white shadow-lg p-6 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ zIndex: 51 }}
      >
        <h2 className="text-xl font-semibold mb-4">Edit Pin</h2>

        {/* Nội dung chỉnh sửa */}
        <div className="flex flex-col gap-4 pb-16">
          {/* Title */}
          <div>
            <label className="font-semibold">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Add a title"
              className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="font-semibold">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a detailed description"
              className="resize-none w-full border rounded-lg border-gray-300 p-2 mt-1 focus:ring-2 focus:ring-blue-300"
              rows={3}
            />
          </div>

          {/* Prompt Used */}
          <div>
            <label className="font-semibold">Prompt Used</label>
            <textarea
              value={promptUsed}
              onChange={(e) => setPromptUsed(e.target.value)}
              placeholder="Enter prompt used"
              className="resize-none w-full border rounded-lg p-2 mt-1 focus:ring-2 border-gray-300 focus:ring-blue-300"
              rows={3}
            />
          </div>

          {/* Tags */}
          <div>
            <label className="font-semibold">Tags</label>
            <div className="flex flex-wrap gap-2 border border-gray-300 rounded-lg p-2 mt-1">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full flex items-center"
                >
                  {tag}
                  <button
                    className="ml-2 text-red-500 hover:text-red-700"
                    onClick={() => handleRemoveTag(tag)}
                  >
                    ×
                  </button>
                </span>
              ))}
              <input
                type="text"
                placeholder="Press Enter to add tags"
                onKeyDown={handleAddTag}
                className="flex-1 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Buttons (Fixed bottom-right) */}
        <div className="absolute bottom-8 right-4 flex space-x-4">
          {/* Cancel Button */}
          <button
            onClick={() => {
              onClose();
              setTimeout(() => setIsVisible(false), 300);
            }}
            className="px-4 py-2 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          {/* Save Button */}
          <button
            onClick={handleSaveClick}
            className={`px-4 py-2 rounded-full transition ${
              isSaveClicked
                ? "bg-black text-white cursor-default"
                : "bg-red-500 text-white hover:bg-red-600"
            }`}
            disabled={isSaveClicked}
          >
            {isSaveClicked ? "Saved" : "Save"}
          </button>
        </div>
      </div>
    </div>
  ) : null;
}

export default EditPinSidebar;
