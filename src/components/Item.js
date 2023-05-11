import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  IconButton,
  Box,
  Typography,
  useTheme,
  Button,
  useMediaQuery,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from "../../lib/theme";
import { addToCart } from "../../state";
import Link from "next/link";

const Item = ({ item, width }) => {
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const {
    palette: { neutral },
  } = useTheme();
  const isNonTablet = useMediaQuery("(min-width:760px)");

  const { category, price, name, image } = item.attributes;
  const {
    data: {
      attributes: {
        formats: {
          medium: { url },
        },
      },
    },
  } = image;

  return (
    <Box>
      <Box
        position="relative"
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
        width={isNonTablet ? "300px" : "250px"}
        height={isNonTablet ? "350px" : "250px"}
        display="flex"
        alignItems="center"
      >
        {" "}
        <Link href={`/product/${item.id}`}>
          <img
            alt={item.name}
            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`}
            style={{
              cursor: "pointer",
              maxWidth: isNonTablet ? "300px" : "250px",
              maxHeight: isNonTablet ? "300px" : "200px",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </Link>
        <Box
          display={isHovered ? "block" : "none"}
          position="absolute"
          bottom="10%"
          left="0"
          width="100%"
          padding="0 5%"
        >
          <Box display="flex" justifyContent="space-between">
            <Box
              display="flex"
              alignItems="center"
              backgroundColor={shades.neutral[200]}
              borderRadius="3px"
            >
              <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                <RemoveIcon />
              </IconButton>
              <Typography color={shades.primary[300]}>{count}</Typography>
              <IconButton onClick={() => setCount(count + 1)}>
                <AddIcon />
              </IconButton>
            </Box>
            <Button
              onClick={() => {
                dispatch(addToCart({ item: { ...item, count } }));
              }}
            >
              Add to Cart
            </Button>
          </Box>
        </Box>
      </Box>

      <Box mt="3px">
        <Typography variant="subtitle2" color={neutral.dark}>
          {category.data.attributes.Name.replace(/([A-Z])/g, " $1").replace(
            /^./,
            (str) => str.toUpperCase()
          )}
        </Typography>
        <Typography>{name}</Typography>
        <Typography fontWeight="bold">${price}</Typography>
      </Box>
    </Box>
  );
};

export default Item;
