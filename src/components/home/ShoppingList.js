import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Item from "../Item";
import { Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "../../../state";
import { fetcher } from "../../../lib/api";

const ShoppingList = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("all");
  const items = useSelector((state) => state.cart.items);
  const breakPoint = useMediaQuery("(min-width:600px)");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  async function getItems() {
    const items = await fetcher(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}products?populate=%2A`
    );
    dispatch(setItems(items.data));
  }

  useEffect(() => {
    getItems();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
    <Box width="80%" margin="80px auto">
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
          m: "25px",
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
        gridTemplateColumns="repeat(auto-fill, 300px)"
        gridTemplateRows="repeat(auto-fill, 400px)"
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
