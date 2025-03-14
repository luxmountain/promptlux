import React, { useState, useRef, useEffect } from "react";

const Comment = () => {
  const [message, setMessage] = useState("");
  const [active, setActive] = useState({
    icon: false,
    sticker: false,
    image: false,
    send: false,
  });

  const textFieldRef = useRef(null);
  const containerRef = useRef(null);
  const [fiWidth, setFiWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      setFiWidth(containerRef.current.offsetWidth);
    }

    const handleResize = () => {
      if (containerRef.current) {
        setFiWidth(containerRef.current.offsetWidth);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (textFieldRef.current) {
      textFieldRef.current.style.height = "auto";
      textFieldRef.current.style.height = textFieldRef.current.scrollHeight + "px";
    }
  }, [message]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      console.log("Message sent:", message);
    }
  };

  const toggleActive = (key) => {
    setActive({
      icon: false,
      sticker: false,
      image: false,
      send: false,
      [key]: !active[key],
    });
  };

  return (
    <div ref={containerRef} className="w-full p-3 bg-gray-200 rounded-2xl">
      <div className="flex items-center w-full">
        <div className={`transition-all ${message.length * 10 > fiWidth * 0.45 ? "w-full" : "w-3/5"}`}>
          <textarea
            ref={textFieldRef}
            placeholder="Enter your text here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            className="w-full p-2 text-sm bg-white border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {message.length * 10 > fiWidth * 0.45 && <div className="w-3/5 transition-all"></div>}

        <div className="flex items-center space-x-2">
          <button onClick={() => toggleActive("icon")} className={`p-2 rounded-full transition ${active.icon ? "bg-black text-white" : "bg-gray-200 text-black"}`}>
            😊
          </button>
          <button onClick={() => toggleActive("sticker")} className={`p-2 rounded-full transition ${active.sticker ? "bg-black text-white" : "bg-gray-200 text-black"}`}>
            🎭
          </button>
          <button onClick={() => toggleActive("image")} className={`p-2 rounded-full transition ${active.image ? "bg-black text-white" : "bg-gray-200 text-black"}`}>
            📷
          </button>
        </div>

        {message.trim().length > 0 && (
          <button onClick={() => toggleActive("send")} className="p-2 ml-2 text-white bg-red-500 rounded-full hover:bg-red-700">
            🚀
          </button>
        )}
      </div>
    </div>
  );
};

export default Comment;
