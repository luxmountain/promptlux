import React, { useState, useEffect } from "react";
import EditTag from "../suggestion/EditTag";

function EditPinSidebar({ isOpen, onClose, pid }) {
  const [isVisible, setIsVisible] = useState(isOpen);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [promptUsed, setPromptUsed] = useState("");
  const [selectedTags, setSelectedTags] = useState([]); // Thay đổi từ tags sang selectedTags
  const [isSaveClicked, setIsSaveClicked] = useState(false);
  
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      fetchPinDetails(); // Gọi API lấy dữ liệu khi mở sidebar
    } else {
      setTimeout(() => setIsVisible(false), 300);
    }
  }, [isOpen]);

  // Hàm lấy dữ liệu hiện tại của pin
  const fetchPinDetails = async () => {
    try {
      const response = await fetch(`/api/pins/${pid}`);
      if (!response.ok) throw new Error("Failed to fetch pin details");

      const data = await response.json();
      setTitle(data.title || "");
      setDescription(data.description || "");
      setPromptUsed(data.prompt_used || "");
      setSelectedTags(data.post_tags?.map(tag => tag.tag.tag_content) || []);
    } catch (error) {
      console.error("Error fetching pin details:", error);
    }
  };

  // Hàm xử lý lưu chỉnh sửa
  const handleSaveClick = async () => {
    setIsSaveClicked(true);

    try {
      const response = await fetch(`/api/pins/${pid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          prompt_used: promptUsed,
          tags: selectedTags, // Gửi danh sách tag mới
        }),
      });

      if (!response.ok) throw new Error("Failed to update pin");

      console.log("Pin updated successfully!");
      setTimeout(() => {
        setIsSaveClicked(false);
        onClose(); // Đóng sidebar sau khi cập nhật thành công
      }, 1500);
      window.location.reload();
    } catch (error) {
      console.error("Error updating pin:", error);
      setIsSaveClicked(false);
    }
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
        className="fixed inset-0 bg-black opacity-50"
        style={{ zIndex: 50 }}
        onClick={onClose}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 w-96 h-full bg-white shadow-lg p-6 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ zIndex: 51 }}
      >
        <h2 className="text-xl font-semibold mb-4">Edit Pin</h2>

        {/* Title */}
        <div>
          <label className="font-semibold">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
            className="resize-none w-full border rounded-lg p-2 mt-1 focus:ring-2 border-gray-300 focus:ring-blue-300"
            rows={3}
          />
        </div>

        {/* Tags (Dùng lại component Tag từ Form) */}
        {/* <div>
          <label className="font-semibold">Tags</label>
          <EditTag selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
        </div> */}

        {/* Buttons */}
        <div className="absolute bottom-8 right-4 flex space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-100 transition"
          >
            Cancel
          </button>

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
