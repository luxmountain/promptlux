"use client";
import { React, useState, useRef } from "react";
import Menu from "./menu";
import EditActions from "./edit-actions";
import EditConfirm from "./edit-confirm";

function EditProfile() {
  const [avatar, setAvatar] = useState("https://mui.com/static/images/avatar/1.jpg");
  const [firstName, setFirstName] = useState("Vu");
  const [surName, setSurName] = useState("Nguyen");
  const [userName, setUserName] = useState("abc");
  const [introduce, setIntroduce] = useState("");
  const [website, setWebsite] = useState("");
  const [errorFirstName, setErrorFirstName] = useState("");
  const [errorSurName, setErrorSurname] = useState("");
  const [errorIntroduce, setErrorIntroduce] = useState("");
  const [errorWebsite, setErrorWebsite] = useState("");
  const [errorUserName, setErrorUserName] = useState("");

  const [isModified, setIsModified] = useState(false);
  const [hasError, setHasError] = useState(true);
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const [isOpenAvatarChange, setIsOpenAvatarChange] = useState(false);

  const fileInputRef = useRef(null);

  const handleSelectPhoto = () => {
    fileInputRef.current.click(); 
  };


  const checkErrors = () => {
    setHasError(
      !!errorFirstName || !!errorSurName || !!errorIntroduce || !!errorWebsite || !!errorUserName
    );
  };

  const handleFirstNameChange = (e) => {
    const value = e.target.value;
    setFirstName(value);
    setIsModified(true);
    if (value.length > 30) {
      setErrorFirstName("Please enter up to 30 characters.");
    } else if (value.trim() === "") {
      setErrorFirstName("Your profile needs to have a name.");
    } else {
      setErrorFirstName("");
    }
    checkErrors();
  };

  const handleSurNameChange = (e) => {
    const value = e.target.value;
    setSurName(value);
    setIsModified(true);
    if (value.length > 30) {
      setErrorSurname("Please enter up to 30 characters.");
    } else {
      setErrorSurname("");
    }
    checkErrors();
  };

  const handleIntroduceChange = (e) => {
    const value = e.target.value;
    setIntroduce(value);
    setIsModified(true);
    if (value.length > 500) {
      setErrorIntroduce("Please enter up to 500 characters.");
    } else {
      setErrorIntroduce("");
    }
    checkErrors();
  };

  const handleWebsiteChange = (e) => {
    const value = e.target.value;
    setWebsite(value);
    setIsModified(true);
    const urlRegex = /^https:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}.*$/; // Kiểm tra URL hợp lệ
  
    if (!urlRegex.test(value)) {
      setErrorWebsite("Not a valid URL");
    } else {
      setErrorWebsite("");
    }
    checkErrors();
  };

  const handleUserNameChange = (e) => {
    const value = e.target.value;
    setUserName(value);
    setIsModified(true);
    if (value.trim() === "") {
      setErrorUserName("Your profile needs a username. Choose it carefully so that others can find you easily.");
    } else {
      setErrorUserName("");
    }
    checkErrors();
  };

  const handleAvatarChange = () => {
    setIsOpenAvatarChange(true);
  };

  const confirmAvatarChange = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatar(e.target.result); // Cập nhật avatar bằng URL base64
        setIsOpenAvatarChange(false); // Đóng modal sau khi chọn ảnh
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReset = () => {
    setIsOpenConfirm(true);
  };

  const confirmReset = () => {
    setFirstName("Vu");
    setSurName("Nguyen");
    setUserName("abc");
    setIntroduce("");
    setWebsite("");

    setErrorFirstName("");
    setErrorSurname("");
    setErrorIntroduce("");
    setErrorWebsite("");
    setErrorUserName("");

    setIsModified(false);
    setHasError(true);
    setIsOpenConfirm(false);
  };

  const [active, setActive] = useState("profile"); // Lưu trạng thái nút đang chọn

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Div trên - màu đỏ, có hai div con nằm ngang */}
      <div className="flex flex-grow overflow-y-auto pl-8 pt-8">
        {/* Menu bên trái */}
        <Menu active={active} setActive={setActive} />

        {/* Chức năng bên phải */}
        <EditActions
          isOpenAvatarChange={isOpenAvatarChange}
          fileInputRef={fileInputRef}
          firstName={firstName}
          surName={surName}
          userName={userName}
          introduce={introduce}
          website={website}
          errorFirstName={errorFirstName}
          errorSurName={errorSurName}
          errorIntroduce={errorIntroduce}
          errorWebsite={errorWebsite}
          errorUserName={errorUserName}
          confirmAvatarChange={confirmAvatarChange}
          handleAvatarChange={handleAvatarChange}
          handleSelectPhoto={handleSelectPhoto}
          handleFirstNameChange={handleFirstNameChange}
          handleSurNameChange={handleSurNameChange}
          handleIntroduceChange={handleIntroduceChange}
          handleWebsiteChange={handleWebsiteChange}
          handleUserNameChange={handleUserNameChange}
          setIsOpenAvatarChange={setIsOpenAvatarChange}
        />
      </div>

      {/* Div dưới */}
      <EditConfirm
        isModified={isModified}
        isOpenConfirm={isOpenConfirm}
        hasError={hasError}
        handleReset={handleReset}
        confirmReset={confirmReset}
        setIsOpenConfirm={setIsOpenConfirm}
      />
    </div>
  );
}

export default EditProfile;
