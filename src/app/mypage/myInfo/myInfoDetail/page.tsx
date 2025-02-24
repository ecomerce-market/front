"use client";

import React from "react";
import MyInfoDetail from "./myInfoDetail";
import { userService } from "./myInfoDetail.service";

const MyInfoPage = () => {
    return (
        <MyInfoDetail
            onFetchUserData={userService.fetchUserData}
            onVerifyPassword={userService.verifyPassword}
            onUpdateProfile={userService.updateUserProfile}
        />
    );
};

export default MyInfoPage;
