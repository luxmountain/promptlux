import {React, useRef} from "react";
import { Avatar } from "@mui/material";

function EditActions({
  avatar,
  isOpenAvatarChange,
  firstName,
  surName,
  userName,
  introduce,
  website,
  errorFirstName,
  errorSurName,
  errorIntroduce,
  errorWebsite,
  errorUserName,
  confirmAvatarChange,
  handleAvatarChange,
  handleFirstNameChange,
  handleSurNameChange,
  handleIntroduceChange,
  handleWebsiteChange,
  handleUserNameChange,
  setIsOpenAvatarChange,
  fileInputRef,
  handleSelectPhoto,
}) {
  return (
    <div className="max-w-[535px] flex flex-col flex-grow p-4 gap-4">
      <div className="flex flex-col gap-2 pb-2">
        <h1 className="text-black text-[28px] font-bold">Edit profile</h1>
        <p className="text-black text-[15px]">
          Keep your personal details private. Information you add here is
          visible to anyone who can view your profile
        </p>
      </div>

      {/* Avatar */}
      <div className="flex flex-col bg-white gap-1">
        <div className="flex flex-col gap-2">
          <p className="text-black text-xs">Photo</p>
        </div>
        <div className="flex flex-row items-center gap-4">
          <Avatar
            alt="User avatar"
            src={avatar}
            sx={{ width: 75, height: 75 }}
          />
          <div className="inline-flex justify-center h-[40px] items-center px-[12px] py-[8px] rounded-[30px] bg-[#e9e9e9] transition duration-300 hover:bg-[#cdcdcd]">
            <button className="text-[16px] font-semibold" onClick={handleAvatarChange}>
              Change
            </button>
          </div>
          {isOpenAvatarChange && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-[20px] shadow-lg w-[540] h-[160] flex flex-col justify-center text-center gap-3">
              <h2 className="text-[28px] font-semibold">Change your photo</h2>
              <div className="mt-4 flex justify-center gap-3">
                <button
                  className="px-4 py-2 rounded-full bg-[#e60023] hover:bg-[#b60000] transition duration-300 text-white text-base font-medium"
                  onClick={handleSelectPhoto}
                >
                  Select photo
                </button>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={(e) => confirmAvatarChange(e.target.files[0])}
                />
              </div>
            </div>
          </div>
        )}
        </div>
      </div>

      {/* Name */}
      <div className="flex flex-row gap-2 w-full">
        <div className="flex flex-col gap-1 w-1/2 flex-1">
          <div>
            <p className="text-black text-xs">First name</p>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <input
              type="text"
              value={firstName}
              onChange={handleFirstNameChange}
              className={`p-2 rounded-[16px] border-2 outline-none min-h-[48px] border-[#cdcdcd] hover:border-[#a5a5a5] transition-all${
                errorFirstName
                  ? "border-[#b60000] focus:border-[#b60000]"
                  : "border-[#e9e9e9] focus:border-4 focus:border-blue-300"
              }`}
            />
            {errorFirstName && (
              <p className="text-[#b60000] text-xs flex items-center gap-1">
                <svg
                  fill="#b60000"
                  aria-hidden="true"
                  height="16"
                  role="img"
                  viewBox="0 0 16 16"
                  width="16"
                >
                  <path d="m15.74 12.33-6-10.64a2 2 0 0 0-3.48 0l-6 10.64c-.75 1.34.21 3 1.74 3h12a2 2 0 0 0 1.74-3m-5.04-.7a1 1 0 0 1 0 1.41 1 1 0 0 1-1.41 0l-1.3-1.3-1.29 1.3a1 1 0 0 1-1.41 0 1 1 0 0 1 0-1.41l1.3-1.3-1.3-1.29a1 1 0 0 1 0-1.41 1 1 0 0 1 1.41 0L8 8.92l1.29-1.3a1 1 0 0 1 1.41 0 1 1 0 0 1 0 1.42l-1.29 1.3z"></path>
                </svg>
                {errorFirstName}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-1 w-1/2 flex-1">
          <div>
            <p className="text-black text-xs">Surname</p>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <input
              type="text"
              value={surName}
              onChange={handleSurNameChange}
              className={`p-2 rounded-[16px] border-2 outline-none min-h-[48px] border-[#cdcdcd] hover:border-[#a5a5a5] transition-all${
                errorSurName
                  ? "border-[#b60000] focus:border-[#b60000]"
                  : "border-[#e9e9e9] focus:border-4 focus:border-blue-300"
              }`}
            />
            {errorSurName && (
              <p className="text-[#b60000] text-xs flex items-center gap-1">
                <svg
                  fill="#b60000"
                  aria-hidden="true"
                  height="16"
                  role="img"
                  viewBox="0 0 16 16"
                  width="16"
                >
                  <path d="m15.74 12.33-6-10.64a2 2 0 0 0-3.48 0l-6 10.64c-.75 1.34.21 3 1.74 3h12a2 2 0 0 0 1.74-3m-5.04-.7a1 1 0 0 1 0 1.41 1 1 0 0 1-1.41 0l-1.3-1.3-1.29 1.3a1 1 0 0 1-1.41 0 1 1 0 0 1 0-1.41l1.3-1.3-1.3-1.29a1 1 0 0 1 0-1.41 1 1 0 0 1 1.41 0L8 8.92l1.29-1.3a1 1 0 0 1 1.41 0 1 1 0 0 1 0 1.42l-1.29 1.3z"></path>
                </svg>
                {errorSurName}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Discription */}
      <div className="flex flex-col gap-1 bg-white w-full">
        <div>
          <p className="text-black text-xs">Introduce</p>
        </div>

        <div className="flex flex-row gap-4 w-full">
          <textarea
            placeholder="Tell your story"
            value={introduce}
            onChange={handleIntroduceChange}
            rows={3}
            className={`p-2 rounded-[16px] border-2 outline-none resize-none w-full border-[#cdcdcd] hover:border-[#a5a5a5] transition-all${
              errorIntroduce
                ? "border-[#b60000] focus:border-[#b60000]"
                : "border-[#e9e9e9] focus:border-4 focus:border-blue-300"
            }`}
          />
          {errorIntroduce && (
            <p className="text-[#b60000] text-xs flex items-center gap-1">
              <svg
                fill="#b60000"
                aria-hidden="true"
                height="16"
                role="img"
                viewBox="0 0 16 16"
                width="16"
              >
                <path d="m15.74 12.33-6-10.64a2 2 0 0 0-3.48 0l-6 10.64c-.75 1.34.21 3 1.74 3h12a2 2 0 0 0 1.74-3m-5.04-.7a1 1 0 0 1 0 1.41 1 1 0 0 1-1.41 0l-1.3-1.3-1.29 1.3a1 1 0 0 1-1.41 0 1 1 0 0 1 0-1.41l1.3-1.3-1.3-1.29a1 1 0 0 1 0-1.41 1 1 0 0 1 1.41 0L8 8.92l1.29-1.3a1 1 0 0 1 1.41 0 1 1 0 0 1 0 1.42l-1.29 1.3z"></path>
              </svg>
              {errorIntroduce}
            </p>
          )}
        </div>
      </div>

      {/* Website */}
      <div className="flex flex-col gap-1 bg-white w-full">
        <div>
          <p className="text-black text-xs">Website</p>
        </div>

        <div className="flex flex-row gap-1 w-full">
          <input
            type="text"
            placeholder="https://"
            value={website}
            onChange={handleWebsiteChange}
            className={`p-2 rounded-[16px] border-2 outline-none resize-none w-full border-[#cdcdcd] hover:border-[#a5a5a5] transition-all${
              errorWebsite
                ? "border-[#b60000] focus:border-[#b60000]"
                : "border-[#e9e9e9] focus:border-4 focus:border-blue-300"
            }`}
          />
        </div>

        {errorWebsite ? (
          <p className="text-[#b60000] text-xs flex items-center gap-1">
            <svg
              fill="#b60000"
              aria-hidden="true"
              height="16"
              role="img"
              viewBox="0 0 16 16"
              width="16"
            >
              <path d="m15.74 12.33-6-10.64a2 2 0 0 0-3.48 0l-6 10.64c-.75 1.34.21 3 1.74 3h12a2 2 0 0 0 1.74-3m-5.04-.7a1 1 0 0 1 0 1.41 1 1 0 0 1-1.41 0l-1.3-1.3-1.29 1.3a1 1 0 0 1-1.41 0 1 1 0 0 1 0-1.41l1.3-1.3-1.3-1.29a1 1 0 0 1 0-1.41 1 1 0 0 1 1.41 0L8 8.92l1.29-1.3a1 1 0 0 1 1.41 0 1 1 0 0 1 0 1.42l-1.29 1.3z"></path>
            </svg>
            {errorWebsite}
          </p>
        ) : (
          <p className="text-[#767676] text-xs">
            Add links to drive traffic to your website
          </p>
        )}
      </div>

      {/* User name */}
      <div className="flex flex-col gap-1 bg-white">
        <div>
          <p className="text-black text-xs">User name</p>
        </div>
        <div className="flex flex-row gap-4 w-full">
          <input
            type="text"
            value={userName}
            onChange={handleUserNameChange}
            className={`p-2 rounded-[16px] border-2 outline-none resize-none w-full border-[#cdcdcd] hover:border-[#a5a5a5] transition-all${
              errorUserName
                ? "border-[#b60000] focus:border-[#b60000]"
                : "border-[#e9e9e9] focus:border-4 focus:border-blue-300"
            }`}
          />
        </div>

        {errorUserName ? (
          <p className="text-[#b60000] text-xs flex items-center gap-1">
            <svg
              fill="#b60000"
              aria-hidden="true"
              height="16"
              role="img"
              viewBox="0 0 16 16"
              width="16"
            >
              <path d="m15.74 12.33-6-10.64a2 2 0 0 0-3.48 0l-6 10.64c-.75 1.34.21 3 1.74 3h12a2 2 0 0 0 1.74-3m-5.04-.7a1 1 0 0 1 0 1.41 1 1 0 0 1-1.41 0l-1.3-1.3-1.29 1.3a1 1 0 0 1-1.41 0 1 1 0 0 1 0-1.41l1.3-1.3-1.3-1.29a1 1 0 0 1 0-1.41 1 1 0 0 1 1.41 0L8 8.92l1.29-1.3a1 1 0 0 1 1.41 0 1 1 0 0 1 0 1.42l-1.29 1.3z"></path>
            </svg>
            {errorUserName}
          </p>
        ) : (
          <p className="text-[#767676] text-xs">
            www.pinterest.com/{userName}
          </p>
        )}
      </div>
    </div>
  );
}

export default EditActions;
