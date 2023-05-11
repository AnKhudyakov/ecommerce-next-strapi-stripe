import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import { Box, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { setValue } from "../../state";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginRight: "2px",
    marginLeft: "2px",
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  color: "rgba(255, 255, 255, .8)",
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "rgba(255, 255, 255, .8)",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "25vw",
      maxWidth: "400px",
      "&:focus": {
        width: "30vw",
        maxWidth: "400px",
      },
    },
  },
}));

const SearchMenu = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isSearchOpen = useSelector((state) => state.profile.isSearchOpen);

  const handleSearch = (e) => {
    if (e.keyCode === 13) {
      router.replace("/#list");
      dispatch(setValue("all"));
    }
  };

  return (
    <Box
      display={isSearchOpen ? "block" : "none"}
      backgroundColor="rgba(22, 22, 23, .6)"
      position="fixed"
      zIndex={10}
      width="45%"
      maxWidth="470px"
      height="36px"
      right="0"
      top="60px"
      borderRadius=" 0px 0 0 5px"
    >
      <Search onKeyDown={handleSearch}>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
        />
      </Search>
    </Box>
  );
};
export default SearchMenu;
