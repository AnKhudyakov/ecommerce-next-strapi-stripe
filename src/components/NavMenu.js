import {
  Box,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setAnchorEl } from "../../state/profileSlice";
import { setValue } from "../../state";
import macbook from "../assets/macbook.png";
import iphone from "../assets/iphone.png";
import acc from "../assets/acc.png";
import Image from "next/image";
import { useRouter } from "next/router";
import useMediaQuery from "@mui/material/useMediaQuery";

const NavMenu = () => {
  const router = useRouter();
  const anchorEl = useSelector((state) => state.profile.anchorEl);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const handleClickMac = () => {
    dispatch(setAnchorEl(null));
    router.replace("/#list");
    dispatch(setValue("Mac"));
  };
  const handleClickIphone = () => {
    dispatch(setAnchorEl(null));
    router.replace("/#list");
    dispatch(setValue("Iphone"));
  };
  const handleClickAcc = () => {
    dispatch(setAnchorEl(null));
    router.replace("/#list");
    dispatch(setValue("Accessories"));
  };
  const isNonTablet = useMediaQuery("(min-width:950px)");
  const isNonMobile = useMediaQuery("(min-width:700px)");

  return (
    <Menu
      id="apps-menu"
      MenuListProps={{
        onMouseLeave: () => dispatch(setAnchorEl(null)),
        sx: {
          width: "100%",
          maxWidth: "100%",
          height: "100%",
          display: "flex",
          gap: isNonMobile?"30px":"5px",
          justifyContent: "space-around",
        },
      }}
      anchorEl={anchorEl}
      open={open}
      onClose={() => dispatch(setAnchorEl(null))}
      sx={{
        top: "0px",
        left: isNonMobile?"-8%":"-2%",
        "& .MuiMenuItem-root": { display: "block", height: "100%" },
      }}
      PaperProps={{
        elevation: 0,
        sx: {
          padding: isNonMobile?"10px":"5px",
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: isNonTablet ? 20 : 10,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
    >
      <MenuItem
        orientation="vertical"
        onClick={handleClickMac}
        sx={{
          block: "block",
          height: "100px",
          width: "100%",
        }}
      >
        <Box position="relative" width={isNonMobile?100:60} height={isNonMobile?100:60} mb={1}>
          <Image src={macbook} alt="macbook" fill sizes="" />
        </Box>
        <Typography textAlign="center">Macbook</Typography>
      </MenuItem>
      <MenuItem orientation="vertical" onClick={handleClickIphone}>
        <Box position="relative" width={isNonMobile?100:60} height={isNonMobile?100:60} mb={1}>
          <Image src={iphone} alt="macbook" fill sizes=""/>
        </Box>
        <Typography textAlign="center">iPhone</Typography>
      </MenuItem>
      <MenuItem orientation="vertical" onClick={handleClickAcc}>
        <Box position="relative" width={isNonMobile?100:60} height={isNonMobile?100:60} mb={1}>
          <Image src={acc} alt="macbook" fill sizes=""/>
        </Box>
        <Typography textAlign="center">Accessories</Typography>
      </MenuItem>
    </Menu>
  );
};

export default NavMenu;
