import {
  Box,
  Typography,
  IconButton,
  useMediaQuery,
  CardMedia,
  Link,
} from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { shades } from "../../../lib/theme";
import { useSelector } from "react-redux";

const MainCarousel = () => {
  const isMobile = useMediaQuery("(min-width:600px)");
  const isNonMobile = useMediaQuery("(min-width:850px)");
  const isNonTablet = useMediaQuery("(min-width:1050px)");
  const slider = useSelector((state) => state.cart.slider);

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
      {slider.map((slide, index) => (
        <Box key={`carousel-video-${index}`}>
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: slide.position,
              height: isMobile?isNonMobile?isNonTablet?"100vh":"70vh":"50vh":"40vh",
              maxHeight: "1200px",
              backgroundAttachment: "fixed",
              position: "relative",
              background: "black",
              paddingTop: "60px",
            }}
          > 
            <CardMedia
              sx={{
                display: "block",
                objectPosition: slide.positionX,
              }}
              component="video"
              src={slide.url}
              autoPlay={true}
              muted={true}
              max-width="100%"
            />
          </Box>

          <Box
            color="white"
            borderRadius="1px"
            textAlign="left"
            position="absolute"
            top={isNonMobile ? "15%" : "25%"}
            maxHeight="300px"
            left={isNonMobile ? "10%" : "5%"}
            margin={isNonMobile ? undefined : "0 auto"}
            maxWidth={isNonMobile ? undefined : "170px"}
          >
            <Typography color={shades.secondary[200]} variant={isNonMobile? isNonTablet ? "h3" : "h4":"h5"}>
              -- NEW ITEMS
            </Typography>

            <Typography variant={isNonMobile? isNonTablet ? "h1" : "h2":"h4"}>
              Summer Sale
            </Typography>
            <Link href="#list">
            <Typography
              fontWeight="bold"
              color={shades.secondary[300]}
              sx={{ textDecoration: "underline" }}
            >
              Discover More
            </Typography>
            </Link>
          </Box>
        </Box>
      ))}
    </Carousel>
  );
};

export default MainCarousel;
