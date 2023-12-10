import React, { useState } from "react";
import {
  Card,
  Input,
  Button,
  Typography,
  Alert,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { publicAxios } from "../http/instances";
import API_ENDPOINT from "../constants/api-endpoint";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const getdata = await publicAxios.post(API_ENDPOINT.LOGIN, {
        email,
        password,
      });
      sessionStorage.setItem("token", JSON.stringify(getdata));
      if (getdata) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error", error);
      setError("Invalid email or password");
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      {error && (
        <Alert color="red" className="absolute w-[30%] top-5">
          {error}
        </Alert>
      )}
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Login
        </Typography>
        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 "
          onSubmit={handleSubmit}
        >
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Email
            </Typography>
            <Input
              size="lg"
              placeholder="Your Email"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="Your password"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button className="mt-6" fullWidth type="submit">
            sign In
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <Link to="/register" className="font-medium text-gray-900">
              Sign In
            </Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
}
