import { useState } from "react";
import { useRouter } from "next/router";
import { setToken } from "../../lib/auth";
import { fetcher } from "../../lib/api";
import { Button } from "@mui/material";
import { shades } from "../../lib/theme";

const Register = () => {
  const router = useRouter();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const responseData = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/local/register`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: userData.email,
            password: userData.password,
            username: userData.username,
          }),
          method: "POST",
        }
      );
      setToken(responseData);
      router.redirect("/profile");
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  return (
    <div
      className="flex w-full"
      style={{ marginTop: "60px", textAlign: "center" }}
    >
      <div className="w-full bg-white border-2 rounded p-8 m-4 md:max-w-sm md:mx-auto">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 py-2">
            Register
          </span>
        </h1>
        <form
          onSubmit={handleSubmit}
          className="mb-4 md:flex md:flex-wrap md:justify-between"
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <div className="flex flex-col mb-4 md:w-full">
            <input
              className="border-2 py-2 px-3"
              type="text"
              name="username"
              placeholder="Username"
              onChange={(e) => handleChange(e)}
              required
              style={{ marginBottom: "20px", padding: "10px 30px" }}
            />
          </div>
          <div className="flex flex-col mb-4 md:w-full">
            <input
              className="border-2 py-2 px-3"
              type="email"
              name="email"
              placeholder="Email"
              onChange={(e) => handleChange(e)}
              required
              style={{ marginBottom: "20px", padding: "10px 30px" }}
            />
          </div>
          <div className="flex flex-col mb-6 md:w-full">
            <input
              className="border-2 py-2 px-3"
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => handleChange(e)}
              required
              style={{ marginBottom: "10px", padding: "10px 30px" }}
            />
          </div>
          <div>
            <Button
              sx={{
                backgroundColor: shades.primary[400],
                color: "white",
                borderRadius: 0,
                minWidth: "100px",
                padding: "20px 40px",
                m: "20px 0",
              }}
              type="submit"
            >
              Register
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
