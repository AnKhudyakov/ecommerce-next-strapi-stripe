import { Box, Typography, IconButton, useMediaQuery } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { shades } from "../../../lib/theme";

// imports all images from assets folder
const importAll = (r) =>
  r.keys().reduce((acc, item) => {
    acc[item.replace("./", "")] = r(item);
    return acc;
  }, {});

export const heroTextureImports = importAll(
  require.context("../../assets", false, /\.(png|jpe?g|svg)$/)
);

const MainCarousel = () => {
  console.log(Object.values(heroTextureImports));
  const isNonMobile = useMediaQuery("(min-width:600px)");
  return (
    <Carousel
      infiniteLoop={true}
      showThumbs={false}
      showIndicators={false}
      showStatus={false}
      renderArrowPrev={(onClickHandler, hasPrev, label) => (
        <IconButton
          onClick={onClickHandler}
          sx={{
            position: "absolute",
            top: "50%",
            left: "0",
            color: "grey",
            padding: "5px",
            zIndex: "10",
          }}
        >
          <NavigateBeforeIcon sx={{ fontSize: 40 }} />
        </IconButton>
      )}
      renderArrowNext={(onClickHandler, hasNext, label) => (
        <IconButton
          onClick={onClickHandler}
          sx={{
            position: "absolute",
            top: "50%",
            right: "0",
            color: "grey",
            padding: "5px",
            zIndex: "10",
          }}
        >
          <NavigateNextIcon sx={{ fontSize: 40 }} />
        </IconButton>
      )}
    >
      {Object.values(heroTextureImports).map((texture, index) => (
        <Box key={`carousel-image-${index}`}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              //marginTop: "60px",
              marginLeft: "15%",
              width: "100%",
              height: "100vh",
              padding: "80px 0px 0px 0px",
              backgroundAttachment: "fixed",
              //backgroundColor: "#1d1d1f",
              position: "relative",
            }}
          >
            <img
              src={texture.default.src}
              alt={`carousel-${index}`}
              style={{
                maxWidth: "60%",
                maxHeight: "100%",
                objectFit: "cover",
                objectPosition: "center",
                //position: "absolute",
                //top: "0",
                //left: "0",
                // backgroundAttachment: "fixed",
              }}
            />
          </div>

          <Box
            color="white"
            padding="20px"
            borderRadius="1px"
            textAlign="left"
            backgroundColor="rgb(0, 0, 0, 0.4)"
            position="absolute"
            top="46%"
            left={isNonMobile ? "10%" : "0"}
            right={isNonMobile ? undefined : "0"}
            margin={isNonMobile ? undefined : "0 auto"}
            maxWidth={isNonMobile ? undefined : "240px"}
          >
            <Typography color={shades.secondary[200]}>-- NEW ITEMS</Typography>
            <Typography variant="h1">Summer Sale</Typography>
            <Typography
              fontWeight="bold"
              color={shades.secondary[300]}
              sx={{ textDecoration: "underline" }}
            >
              Discover More
            </Typography>
          </Box>
        </Box>
      ))}
    </Carousel>
  );
};

export default MainCarousel;