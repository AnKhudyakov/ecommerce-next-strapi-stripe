import { Box, Button, IconButton, Typography } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Item from "./Item";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from "../../lib/theme";
import { addToCart } from "../../state";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

const ProductCard = ({ item, items, description }) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("description");
  const [count, setCount] = useState(false);
  const [url, setUrl] = useState("");
  const [urlSecond, setUrlSecond] = useState("");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0.5,
  });
  useEffect(() => {
    if (entry) {
      if (inView) {
        entry.target.play();
      } else {
        entry.target.pause();
      }
    }
  }, [inView]);

  useEffect(() => {
    switch (item.id) {
      case 1:
        setUrl(
          "https://www.apple.com/105/media/us/macbook-air-m1/2022/648bb92f-0bb4-452c-bfbc-2898641b22f5/anim/hero/medium_2x.mp4"
        );
        setUrlSecond(
          "https://www.apple.com/105/media/us/macbook-air-m1/2022/648bb92f-0bb4-452c-bfbc-2898641b22f5/anim/chip/small_2x.mp4"
        );
        break;
      case 6:
        setUrl(
          " https://www.apple.com/105/media/us/macbook-pro-14-and-16/2022/1baf5961-c793-48e7-9efd-0d23cac1e101/anim/hero/large_2x.mp4"
        );
        setUrlSecond(
          "https://www.apple.com/105/media/us/macbook-air-m1/2022/648bb92f-0bb4-452c-bfbc-2898641b22f5/anim/chip/small_2x.mp4"
        );
        break;
      case 2:
        setUrl(
          "https://www.apple.com/105/media/us/iphone-14-pro/2022/a3e991f3-071e-454c-b714-1b2319bb97a8/anim/hero/medium_2x.mp4"
        );
        setUrlSecond(
          "https://www.apple.com/105/media/us/iphone-14-pro/2022/a3e991f3-071e-454c-b714-1b2319bb97a8/anim/camera-intro/large_2x.mp4"
        );
        break;
    }
  }, []);
  return (
     <Box width="100%" m="60px auto">
      {/* {url && (
        <Box width="100%" backgroundColor="black">
          <video
            ref={ref}
            width="100%"
            className="video"
            autoPlay={false}
            muted={true}
            playsInline={true}
            aria-hidden={true}
            src={urlSecond}
          ></video>
        </Box>
      )} */}
      <Box width="80%" m="0px auto">
        <Box display="flex" flexWrap="wrap" columnGap="40px">
          {/* IMAGES */}
          <Box flex="1 1 40%" mb="40px">
            <img
              alt={item?.name}
              width="100%"
              height="100%"
              src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${item?.attributes?.image?.data.attributes.formats.medium.url}`}
              style={{ objectFit: "contain" }}
            />
          </Box>

          {/* ACTIONS */}
          <Box flex="1 1 50%" mb="40px">
            {/* <Box display="flex" justifyContent="space-between">
            <Box>Home/Item</Box>
            <Box>Prev Next</Box>
          </Box> */}

            <Box m="65px 0 25px 0">
              <Typography variant="h3">{item?.attributes?.name}</Typography>
              <Typography>${item?.attributes?.price}</Typography>
              <div
                dangerouslySetInnerHTML={{
                  __html: description,
                }}
              ></div>
              {/* <Typography sx={{ mt: "20px" }}>
              <div dangerouslySetInnerHTML={{ __html: description }}></div>
            </Typography> */}
            </Box>

            <Box display="flex" alignItems="center" minHeight="50px">
              <Box
                display="flex"
                alignItems="center"
                border={`1.5px solid ${shades.neutral[300]}`}
                mr="20px"
                p="2px 5px"
              >
                <IconButton onClick={() => setCount(Math.max(count - 1, 0))}>
                  <RemoveIcon />
                </IconButton>
                <Typography sx={{ p: "0 5px" }}>{count}</Typography>
                <IconButton onClick={() => setCount(count + 1)}>
                  <AddIcon />
                </IconButton>
              </Box>
              <Button
                sx={{
                  borderRadius: 0,
                  minWidth: "150px",
                  padding: "10px 40px",
                }}
                onClick={() =>
                  dispatch(addToCart({ item: { ...item, count } }))
                }
              >
                ADD TO CART
              </Button>
            </Box>
            <Box>
              <Box m="20px 0 5px 0" display="flex">
                <FavoriteBorderOutlinedIcon />
                <Typography sx={{ ml: "5px" }}>ADD TO WISHLIST</Typography>
              </Box>
              <Typography>
                CATEGORIES: {item?.attributes?.category.data.attributes.Name}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* INFORMATION */}
        <Box m="20px 0">
          <Tabs value={value} onChange={handleChange}>
            <Tab label="DESCRIPTION" value="description" />
            <Tab label="REVIEWS" value="reviews" />
          </Tabs>
        </Box>
        <Box display="flex" flexWrap="wrap" gap="15px">
          {value === "description" && (
            <div dangerouslySetInnerHTML={{ __html: description }}></div>
          )}
          {value === "reviews" && <div>reviews</div>}
        </Box>

        {/* RELATED ITEMS */}
        <Box mt="50px" width="100%">
          <Typography variant="h3" fontWeight="bold">
            Related Products
          </Typography>
          <Box
            mt="20px"
            display="flex"
            flexWrap="wrap"
            columnGap="1.33%"
            justifyContent="space-between"
          >
            {items.data.slice(0, 4).map((item, i) => (
              <Item key={`${item.attributes.name}-${i}`} item={item} />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductCard;
