import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import LoginModal from "../auth/LoginModal"; // Import modal login

function PinItem({ pin }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleClick = () => {
    if (session?.user) {
      router.push(`/pin/${pin.pid}`);
    } else {
      setIsLoginModalOpen(true); // Mở modal nếu chưa đăng nhập
    }
  };

  return (
    <>
      <div className="overflow-hidden mb-8 cursor-pointer" onClick={handleClick}>
        {/* Ảnh bài post */}
        <img
          src={pin.image_url}
          alt={pin.description}
          className="w-full h-auto object-cover rounded-xl overflow-hidden"
        />
        <div className="p-1">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-semibold text-gray-700">
              @{pin.user?.username || "Unknown User"}
            </h3>
            <p className="text-base text-gray-500">{pin.model?.model_name || "Unknown Model"}</p>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
}

export default PinItem;
