import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation"; // Correct import for Next.js 13+
import EditPinSidebar from "../sidebar/EditPin";
import DeletePinPopup from "../popup/DeletePin"; // Import the popup

function CreatedUserActions({ pid, uid, postOwnerId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const menuRef = useRef(null);
  const router = useRouter(); // Use Next.js navigation

  if (uid !== postOwnerId) {
    return null;
  }

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle Pin Deletion
  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/pins/${pid}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete pin");
      }

      console.log(`Pin ${pid} deleted successfully`);
      setIsDeletePopupOpen(false);

      // Redirect to user page after deletion
      router.push("/");
    } catch (error) {
      console.error("Error deleting pin:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="relative" ref={menuRef}>
        {/* Menu Button (3-dot icon) */}
        <button className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
            height="24px"
            width="24px"
            viewBox="0 0 16 16"
          >
            <path d="M8,6.5A1.5,1.5,0,1,1,6.5,8,1.5,1.5,0,0,1,8,6.5ZM.5,8A1.5,1.5,0,1,0,2,6.5,1.5,1.5,0,0,0,.5,8Zm12,0A1.5,1.5,0,1,0,14,6.5,1.5,1.5,0,0,0,12.5,8Z"/>
          </svg>
        </button>

        {/* Popup Menu */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg">
            {/* Edit Button */}
            <button
              className="cursor-pointer w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={() => {
                setIsOpen(false);
                setIsSidebarOpen(true);
              }}
            >
              ✏️ Edit Pin
            </button>

            {/* Delete Button */}
            <button
              className="cursor-pointer w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
              onClick={() => {
                setIsOpen(false);
                setIsDeletePopupOpen(true);
              }}
            >
              🗑️ Delete Pin
            </button>
          </div>
        )}
      </div>

      {/* Sidebar Edit Pin */}
      <EditPinSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        pid={pid}
      />

      {/* Delete Confirmation Popup */}
      <DeletePinPopup
        isOpen={isDeletePopupOpen}
        onClose={() => setIsDeletePopupOpen(false)}
        onConfirm={handleDelete}
        isLoading={isDeleting}
      />
    </>
  );
}

export default CreatedUserActions;
