import * as React from "react";
import { useState } from "react";
import { fetcher } from "../../lib/api";
import { setToken } from "../../lib/auth";
import { useUser } from "../../lib/authContext";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { shades } from "../../lib/theme";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setIsProfileOpen } from "../../state/profileSlice";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const { user, loading } = useUser();
  const [data, setData] = useState({
    identifier: "",
    password: "",
  });

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const responseData = await fetcher(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/local`,
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
    if (responseData.jwt) {
      setToken(responseData);
    } else {
      setError("Your login or password incorrect");
    }
  };

  return (
    <div className="hidden w-full md:flex md:items-center md:w-auto" id="menu">
      {!loading && !user ? (
        <>
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-login">Login</InputLabel>
            <OutlinedInput
              id="outlined-adornment-login"
              endAdornment={
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              }
              name="identifier"
              onChange={handleChange}
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
              onChange={handleChange}
              name="password"
              label="Password"
            />
          </FormControl>
          {error && (
            <Typography color={shades.secondary[400]} sx={{ ml: "10px" }}>
              {error}
            </Typography>
          )}
          <Button
            sx={{
              borderRadius: 0,
              minWidth: "100%",
              padding: "20px 40px",
              m: "20px 0",
            }}
            onClick={handleSubmit}
          >
            SING IN
          </Button>

          <div>
            Do you have an account?{" "}
            <Link
              href="/register"
              style={{
                color: "#4285f4",
                textDecoration: "underline",
              }}
              className="md:p-2 block py-2 hover:text-purple-400 text-black"
              onClick={() => dispatch(setIsProfileOpen({}))}
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
