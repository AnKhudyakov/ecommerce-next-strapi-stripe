import { Box, Button, IconButton, Typography, Tabs, Tab } from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Item from "./Item";
import { shades } from "../../lib/theme";
import { addToCart } from "../../state";

const ProductCard = ({ item, items, description }) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("description");
  const [count, setCount] = useState(false);
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box width="100%" m="60px auto">
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
            <Box m="65px 0 25px 0">
              <Typography variant="h3">{item?.attributes?.name}</Typography>
              <Typography>${item?.attributes?.price}</Typography>
              <div
                dangerouslySetInnerHTML={{
                  __html: description,
                }}
              ></div>
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
