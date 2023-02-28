import Link from "next/link";
import { Badge, Box, IconButton } from "@mui/material";
import { setIsCartOpen } from "../../state";
import { setIsProfileOpen } from "../../state/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  HomeOutlined,
  PersonOutline,
  ShoppingBagOutlined,
  MenuOutlined,
  SearchOutlined,
} from "@mui/icons-material";
import { shades } from "../../lib/theme";
import { useRouter } from "next/router";

const Nav = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

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
        backgroundColor="rgba(255, 255, 255, 0.95)"
        color="black"
        position="fixed"
        top="0"
        left="0"
        zIndex="1"
      >
        <Box
          width="80%"
          margin="auto"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Link href="/" passHref>
            <Box
              //onClick={() => handleClick}
              sx={{ "&:hover": { cursor: "pointer" } }}
              color={shades.secondary[500]}
            >
              ECOMMER
            </Box>
          </Link>
          <Box
            display="flex"
            justifyContent="space-between"
            columnGap="20px"
            zIndex="2"
          >
            <Link href="/">
              <IconButton sx={{ color: "black" }}>
                <HomeOutlined />
              </IconButton>
            </Link>

            <IconButton sx={{ color: "black" }}>
              <SearchOutlined />
            </IconButton>

            <IconButton
              sx={{ color: "black" }}
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
                sx={{ color: "black" }}
              >
                <ShoppingBagOutlined />
              </IconButton>
            </Badge>
            <IconButton sx={{ color: "black" }}>
              <MenuOutlined />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </nav>
  );
};

export default Nav;
