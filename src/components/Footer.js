import { useTheme } from "@emotion/react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { shades } from "../../lib/theme";
import Image from "next/image";
import local from "../assets/local.svg";
import phone from "../assets/phone.svg";
import email from "../assets/email.svg";

const Footer = () => {
  const {
    palette: { neutral },
  } = useTheme();
  const isNonMobile = useMediaQuery("(min-width:500px)");

  return (
    <Box marginTop="70px" padding="40px 0" backgroundColor={neutral.light}>
      <Box
        width="80%"
        margin="auto"
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
        rowGap="30px"
        columnGap="clamp(20px, 30px, 40px)"
      >
        <Box width="clamp(20%, 30%, 40%)">
          <Typography
            variant="h4"
            fontWeight="bold"
            mb="30px"
            color={shades.secondary[500]}
          >
            ECOMMER
          </Typography>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat
          </div>
        </Box>

        <Box>
          <Typography variant="h4" fontWeight="bold" mb="30px">
            About Us
          </Typography>
          <Typography mb="30px">Careers</Typography>
          <Typography mb="30px">Our Stores</Typography>
          <Typography mb="30px">Terms & Conditions</Typography>
          <Typography mb="30px">Privacy Policy</Typography>
        </Box>

        <Box>
          <Typography variant="h4" fontWeight="bold" mb="30px">
            Customer Care
          </Typography>
          <Typography mb="30px">Help Center</Typography>
          <Typography mb="30px">Track Your Order</Typography>
          <Typography mb="30px">Corporate & Bulk Purchasing</Typography>
          <Typography mb="30px">Returns & Refunds</Typography>
        </Box>

        <Box width={isNonMobile ? "clamp(20%, 25%, 30%)" : "100%"}>
          <Typography variant="h4" fontWeight="bold" mb="30px">
            Contact Us
          </Typography>
          <Box display="flex" alignItems="center" mb="30px" ml="5px">
            <Image src={local} alt="local" />
            <Typography ml="12px">
              622 Dixie Path, South Tobinchester, UT 98336
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" mb="30px">
            <Image src={email} alt="email" />
            <Typography ml="10px" sx={{ wordWrap: "break-word" }}>
              Email: test@gmail.com
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" mb="30px">
            <Image src={phone} alt="phone" />
            <Typography ml="12px">(+1) 234 56 78</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
