"use client";
import { useState, useEffect, useRef } from "react";
import ColorThief from "colorthief";

export default function Picture({ imageUrl }) {
  const [imageSize, setImageSize] = useState({ width: 500, height: 300 });
  const [isExpandHovered, setIsExpandHovered] = useState(false);
  const [dominantColor, setDominantColor] = useState("gray"); // Màu chủ đạo
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!imageUrl) return;

    const img = new Image();
    img.crossOrigin = "Anonymous"; // Tránh lỗi CORS nếu ảnh từ nguồn khác
    img.src = imageUrl;
    img.onload = () => {
      // Cập nhật kích thước ảnh
      setImageSize({
        width: Math.min(700, img.width * 0.375),
        height: img.height * 0.375,
      });

      // Lấy màu chủ đạo từ ảnh
      const colorThief = new ColorThief();
      const color = colorThief.getColor(img);
      setDominantColor(`rgb(${color[0]}, ${color[1]}, ${color[2]})`);
    };
  }, [imageUrl]);

  return (
    <div
      className="relative p-4 w-1/2"
      style={{ backgroundColor: dominantColor }}
    >
      {/* Ảnh chính */}
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="Picture"
          className="rounded-lg shadow-lg object-contain"
        />
      ) : (
        <div className="w-[500px] h-[300px] bg-gray-300 animate-pulse rounded-lg"></div>
      )}

      {/* Nút điều khiển */}
      <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
        {/* Nút mở rộng */}
        <button
          onMouseEnter={() => setIsExpandHovered(true)}
          onMouseLeave={() => setIsExpandHovered(false)}
          onClick={() => dialogRef.current.showModal()}
          className="bg-white text-black rounded-full h-12 w-12 flex items-center justify-center hover:w-36 transition-all duration-300 overflow-hidden"
        >
          {isExpandHovered && (
            <span className="text-sm font-semibold ml-2">View Larger</span>
          )}
          <svg className="w-6 h-6" viewBox="0 0 24 24">
            <path d="M9.75 1a1.25 1.25 0 0 1 0 2.5H5.27l5.36 5.37a1.25 1.25 0 0 1-1.76 1.76L3.5 5.27v4.48a1.25 1.25 0 0 1-2.5 0V1zM20.5 14.25a1.25 1.25 0 0 1 2.5 0V23h-8.75a1.25 1.25 0 0 1 0-2.5h4.48l-5.36-5.37a1.25 1.25 0 0 1 1.76-1.76l5.37 5.36z"></path>
          </svg>
        </button>
      </div>

      {/* Dialog hiển thị ảnh lớn */}
      <dialog
        ref={dialogRef}
        className="backdrop-blur-sm bg-white/90 p-4 rounded-lg shadow-lg"
      >
        <img
          src={imageUrl}
          alt="Expanded"
          className="max-w-full max-h-screen object-contain rounded-lg"
        />
        <button
          onClick={() => dialogRef.current.close()}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
        >
          Đóng
        </button>
      </dialog>
    </div>
  );
}
