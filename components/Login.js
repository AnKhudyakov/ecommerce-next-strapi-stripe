import * as React from "react";
import { useFetchUser } from "../lib/authContext";
import { useState } from "react";
import { fetcher } from "../lib/api";
import { setToken, unsetToken } from "../lib/auth";
import { useUser } from "../lib/authContext";
//import { Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Link from "@mui/material/Link";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const { user, loading } = useUser();
  const [data, setData] = useState({
    identifier: "",
    password: "",
  });

  const logout = () => {
    unsetToken();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const responseData = await fetcher(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/local`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: data.identifier,
          password: data.password,
        }),
      }
    );
    setToken(responseData);
  };

  return (
    <div className="hidden w-full md:flex md:items-center md:w-auto" id="menu">
      {!loading &&
        (user ? (
          <a
            className="md:p-2 py-2 block hover:text-purple-400"
            onClick={logout}
            style={{ cursor: "pointer" }}
          >
            Logout
          </a>
        ) : (
          ""
        ))}
      {!loading && !user ? (
        <>
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Login</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              endAdornment={
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              }
              label="Login"
            />
          </FormControl>

          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>

          {/*   <form onSubmit={handleSubmit} className="form-inline">
             <TextField
              // html input attribute
              name="email"
              type="email"
              placeholder="johndoe@email.com"
              // pass down to FormLabel as children
              label="Email"
            />
            <TextField
              name="password"
              type="password"
              placeholder="password"
              label="Password"
            /> 

            <Button >Log in</Button>
            <Typography
              endDecorator={<Link href="/sign-up">Sign up</Link>}
              fontSize="sm"
              sx={{ alignSelf: "center" }}
            >
              Don't have an account?
            </Typography>

            
            {/* <input
                  type="text"
                  name="identifier"
                  onChange={handleChange}
                  placeholder="Username"
                  className="md:p-2 form-input py-2 rounded mx-2"
                  required
                />
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  placeholder="Password"
                  className="md:p-2 form-input py-2 rounded mx-2"
                  required
                /> 

                <button
                  className="md:p-2 rounded py-2 text-black bg-purple-200 p-2"
                  type="submit"
                >
                  Login
                </button>
          </form> */}
          <div>
            Do you have an account?{" "}
            <Link
              href="/register"
              color="#4285f4"
              underline="hover"
              className="md:p-2 block py-2 hover:text-purple-400 text-black"
            >
              Sign up
            </Link>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default Login;
