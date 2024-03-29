import {
  Box,
  Button,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import styled from "@emotion/styled";
import { setIsProfileOpen } from "../../state/profileSlice";
import { useFetchUser } from "../../lib/authContext";
import Login from "./Login";
import Profile from "./Profile";
import { unsetToken } from "../../lib/auth";

const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProfileMenu = () => {
  const { user, loading } = useFetchUser();
  const dispatch = useDispatch();
  const isProfileOpen = useSelector((state) => state.profile.isProfileOpen);

  const handleSingOut = (e) => {
    e.preventDefault();
    unsetToken();
  };

  const isNonMobile = useMediaQuery("(min-width:400px)");

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
        top="60px"
        right="0"
        bottom="0"
        width={isNonMobile ? "max(400px, 30%)" : "max(350px, 30%)"}
        height="100%"
        backgroundColor="rgba(255, 255, 255, 1)"
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

            {user ? (
              <div>
                <Profile />
                <Button
                  sx={{
                    borderRadius: 0,
                    minWidth: "100%",
                    padding: "20px 40px",
                    m: "20px 0",
                  }}
                  onClick={handleSingOut}
                >
                  SING OUT
                </Button>
              </div>
            ) : (
              <Login />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileMenu;
