import React, { useEffect } from "react";
import { Tabs, useMediaQuery, Tab, Box, Typography } from "@mui/material";
import Item from "../Item";
import { useDispatch, useSelector } from "react-redux";
import { setItems, setValue } from "../../../state";
import { fetcher } from "../../../lib/api";

const ShoppingList = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const value = useSelector((state) => state.cart.value);
  const isNonTablet = useMediaQuery("(min-width:760px)");
  const breakPoint = useMediaQuery("(min-width:600px)");
  const handleChange = (event, newValue) => {
    dispatch(setValue(newValue));
  };
  async function getItems() {
    const items = await fetcher(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/products?populate=%2A`
    );
    dispatch(setItems(items.data));
  }

  useEffect(() => {
    getItems();
  }, []);

  const accessories = items.filter(
    (item) => item.attributes.category.data.attributes.Name === "Accessories"
  );
  const mac = items.filter(
    (item) => item.attributes.category.data.attributes.Name === "Mac"
  );
  const iphone = items.filter(
    (item) => item.attributes.category.data.attributes.Name === "Iphone"
  );

  return (
    <Box width="80%" margin="80px auto" id="list">
      <Typography variant="h3" textAlign="center">
        Our Featured <b>Products</b>
      </Typography>
      <Tabs
        textColor="primary"
        indicatorColor="primary"
        value={value}
        onChange={handleChange}
        centered
        TabIndicatorProps={{ sx: { display: breakPoint ? "block" : "none" } }}
        sx={{
          m: isNonTablet ? "25px" : "5px",
          "& .MuiTabs-flexContainer": {
            flexWrap: "wrap",
          },
        }}
      >
        <Tab label="ALL" value="all" />
        <Tab label="Mac" value="Mac" />
        <Tab label="Iphone" value="Iphone" />
        <Tab label="Accessories" value="Accessories" />
      </Tabs>
      <Box
        margin="0 auto"
        display="grid"
        gridTemplateColumns={
          isNonTablet ? "repeat(auto-fill, 300px)" : "repeat(auto-fill, 250px)"
        }
        gridTemplateRows={
          isNonTablet ? "repeat(auto-fill, 400px)" : "repeat(auto-fill, 305px)"
        }
        justifyContent="space-around"
        rowGap="20px"
        columnGap="1.33%"
      >
        {value === "all" &&
          items.map((item) => (
            <Item item={item} key={`${item.attributes.name}-${item.id}`} />
          ))}
        {value === "Mac" &&
          mac.map((item) => (
            <Item item={item} key={`${item.attributes.name}-${item.id}`} />
          ))}
        {value === "Iphone" &&
          iphone.map((item) => (
            <Item item={item} key={`${item.attributes.name}-${item.id}`} />
          ))}
        {value === "Accessories" &&
          accessories.map((item) => (
            <Item item={item} key={`${item.attributes.name}-${item.id}`} />
          ))}
      </Box>
    </Box>
  );
};

export default ShoppingList;
