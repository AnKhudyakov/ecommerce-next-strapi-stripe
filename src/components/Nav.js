import Link from "next/link";
import { Badge, Box, IconButton, useMediaQuery } from "@mui/material";
import { setIsCartOpen } from "../../state";
import {
  setIsProfileOpen,
  setIsSearchOpen,
  setAnchorEl,
} from "../../state/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  HomeOutlined,
  PersonOutline,
  ShoppingBagOutlined,
  MenuOutlined,
  SearchOutlined,
} from "@mui/icons-material";
import { shades } from "../../lib/theme";

const Nav = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const isNonTablet = useMediaQuery("(min-width:700px)");
  const isHovered = useMediaQuery("(hover:hover)");

  return (
    <nav
      className="
          flex flex-wrap
          items-center
          justify-between
          w-full
          py-4
          md:py-0
          px-4
          text-lg text-gray-700
          bg-white
        "
    >
      <Box
        display="flex"
        alignItems="center"
        width="100%"
        height="60px"
        backgroundColor="rgba(22, 22, 23, .7)"
        color="black"
        position="fixed"
        top="0"
        left="0"
        zIndex="1"
        justifyContent="space-between"
      >
        <Box
          width={isNonTablet ? "80%" : "100%"}
          margin={isNonTablet ? "auto" : "5%"}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Link href="/" passHref>
            <Box
              sx={{
                "&:hover": {
                  cursor: "pointer",
                  color: `${shades.secondary[300]}`,
                },
              }}
              color={shades.secondary[500]}
            >
              ECOMMER
            </Box>
          </Link>
          <Box
            display="flex"
            justifyContent="space-between"
            columnGap={isNonTablet ? "60px" : "15px"}
            zIndex="2"
          >
            <Link href="/">
              <IconButton sx={{ color: "rgba(255, 255, 255, .8)" }}>
                <HomeOutlined />
              </IconButton>
            </Link>

            <IconButton
              sx={{ color: "rgba(255, 255, 255, .8)" }}
              onClick={() => dispatch(setIsSearchOpen({}))}
            >
              <SearchOutlined />
            </IconButton>

            <IconButton
              sx={{ color: "rgba(255, 255, 255, .8)" }}
              onClick={() => dispatch(setIsProfileOpen({}))}
            >
              <PersonOutline />
            </IconButton>

            <Badge
              badgeContent={cart.length}
              color="secondary"
              invisible={cart.length === 0}
              sx={{
                "& .MuiBadge-badge": {
                  right: 5,
                  top: 5,
                  padding: "0 4px",
                  height: "14px",
                  minWidth: "13px",
                },
              }}
            >
              <IconButton
                onClick={() => dispatch(setIsCartOpen({}))}
                sx={{ color: "rgba(255, 255, 255, .8)" }}
              >
                <ShoppingBagOutlined />
              </IconButton>
            </Badge>
            <IconButton
              onClick={(e) => {
                dispatch(setAnchorEl(e.currentTarget));
              }}
              onMouseOver={(e) => {
                isHovered ? dispatch(setAnchorEl(e.currentTarget)) : null;
              }}
              sx={{ color: "rgba(255, 255, 255, .8)" }}
            >
              <MenuOutlined />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </nav>
  );
};

export default Nav;
