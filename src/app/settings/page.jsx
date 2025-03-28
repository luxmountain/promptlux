"use client";
import React, { useState, useRef } from "react";
import EditActions from "../components/edit-profile/edit-actions";
import EditConfirm from "../components/edit-profile/edit-confirm";
import SettingMenu from "../components/wrapper/SettingMenu";

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

  const handleReset = () => setIsOpenConfirm(true);
  
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

  return (
    <SettingMenu>
      {/* Chức năng bên phải */}
      <EditActions
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
      />

      {/* Xác nhận khi reset */}
      <EditConfirm
        isModified={isModified}
        isOpenConfirm={isOpenConfirm}
        hasError={hasError}
        handleReset={handleReset}
        confirmReset={confirmReset}
        setIsOpenConfirm={setIsOpenConfirm}
      />
    </SettingMenu>
  );
}

export default EditProfile;
