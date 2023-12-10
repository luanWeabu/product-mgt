import {
  Alert,
  Button,
  Card,
  Input,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { publicAxios } from "../http/instances";
import API_ENDPOINT from "../constants/api-endpoint";

export default function Register() {
  const [newUser, setNewUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleRegister = async () => {
    try {
      await publicAxios.post(API_ENDPOINT.USER, newUser);
      fetchUser();
      setSuccess("Create User Successfully");
      navigate("/login");
    } catch (error) {
      console.error("Error creating user", error);
    }
  };

  const fetchUser = async () => {
    try {
      await publicAxios.get(API_ENDPOINT.USER);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {success && (
        <Alert color="green" className="absolute w-[30%] top-5">
          {success}
        </Alert>
      )}

      <Card
        color="transparent"
        shadow={false}
        className="min-h-screen justify-center items-center"
      >
        <Typography variant="h4" color="blue-gray">
          Register
        </Typography>

        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={handleRegister}
        >
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              First Name
            </Typography>
            <Input
              size="lg"
              placeholder="First Name"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={newUser.firstname}
              onChange={handleInputChange}
              name="firstname"
              required
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Last Name
            </Typography>
            <Input
              size="lg"
              placeholder="Last Name"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={newUser.lastname}
              name="lastname"
              onChange={handleInputChange}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Email
            </Typography>
            <Input
              size="lg"
              placeholder="Email"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={newUser.email}
              name="email"
              onChange={handleInputChange}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="Password"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={newUser.password}
              name="password"
              onChange={handleInputChange}
              required
            />
          </div>

          <Button className="mt-6" fullWidth type="submit">
            sign up
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-gray-900">
              Sign In
            </Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
}
