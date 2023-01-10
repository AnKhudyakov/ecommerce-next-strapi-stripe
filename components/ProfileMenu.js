import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import styled from "@emotion/styled";
import { shades } from "../lib/theme";
import { setIsProfileOpen } from "../state/profileSlice";
import { useRouter } from "next/router";
import { useFetchUser } from "../lib/authContext";
import { useState } from "react";
import { fetcher } from "../lib/api";
import { getIdFromLocalCookie, getTokenFromServerCookie } from "../lib/auth";
import Login from "./Login";
import Profile from "./Profile";

const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProfileMenu = () => {
    const { user, loading } = useFetchUser();
  
  //const router = useRouter();
  const dispatch = useDispatch();
  const isProfileOpen = useSelector((state) => state.profile.isProfileOpen);

  const handleClick = () => {
    //router.redirect("/checkout");
    dispatch(setIsProfileOpen({}));
  };

  return (
    <Box
      display={isProfileOpen ? "block" : "none"}
      backgroundColor="rgba(0, 0, 0, 0.4)"
      position="fixed"
      zIndex={10}
      width="100%"
      height="100%"
      left="0"
      top="0"
      overflow="auto"
    >
      <Box
        position="fixed"
        right="0"
        bottom="0"
        width="max(400px, 30%)"
        height="100%"
        backgroundColor="white"
      >
        <Box padding="30px" overflow="auto" height="100%">
          {/* HEADER */}
          <FlexBox mb="15px">
            <Typography variant="h3">Profile</Typography>
            <IconButton onClick={() => dispatch(setIsProfileOpen({}))}>
              <CloseIcon />
            </IconButton>
          </FlexBox>

          {/* CART LIST */}
          <Box></Box>

          {/* ACTIONS */}
          <Box m="20px 0">
            <FlexBox m="20px 0">
              <Typography fontWeight="bold">SING IN</Typography>
            </FlexBox>

            {user?<Profile/>:<Login/>}
            
            <Button
              sx={{
                backgroundColor: shades.primary[400],
                color: "white",
                borderRadius: 0,
                minWidth: "100%",
                padding: "20px 40px",
                m: "20px 0",
              }}
              onClick={() => {
                handleClick;
              }}
            >
              SING IN
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileMenu;
