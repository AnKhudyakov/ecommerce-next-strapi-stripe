import { getIn } from "formik";
import { Box, TextField, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";

const AddressForm = ({
  type,
  values,
  touched,
  errors,
  handleBlur,
  handleChange,
}) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const fields = useSelector((state) => state.checkout.addressFiedls);

  // these functions allow for better code readability
  const formattedName = (field) => `${type}.${field}`;

  const formattedError = (field) =>
    Boolean(
      getIn(touched, formattedName(field)) &&
        getIn(errors, formattedName(field))
    );

  const formattedHelper = (field) =>
    getIn(touched, formattedName(field)) && getIn(errors, formattedName(field));

  const formattedValue = (field) => getIn(values, field);

  return (
    <Box
      display="grid"
      gap="15px"
      gridTemplateColumns="repeat(4, minmax(0, 1fr))"
      sx={{
        "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
      }}
    >
      {fields.map((field) => (
        <TextField
          key={field.name}
          fullWidth
          type="text"
          label={field.label}
          onBlur={handleBlur}
          onChange={handleChange}
          value={formattedValue(field.name)}
          name={formattedName(field.name)}
          error={formattedError(field.name)}
          helperText={formattedHelper(field.name)}
          sx={{ gridColumn: field.column }}
        />
      ))}
    </Box>
  );
};

export default AddressForm;
