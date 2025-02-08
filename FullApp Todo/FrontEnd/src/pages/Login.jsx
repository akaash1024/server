import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  SimpleGrid,
} from "@chakra-ui/react";
import { useState } from "react";

import axios from "axios";

export const Login = () => {
  const API_URL = import.meta.env.VITE_BASE_URL + "/users/login";

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target; 
    setUserInfo((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userInfo);
    try {
      const response = await axios.post(API_URL, userInfo);
      console.log("Response", response);
      console.log("Response", response.data);
    } catch (error) {
      console.error("Error logging in:", error.message);
    }
  };

  return (
    <Flex
      width={"100vw"}
      height={"70vh"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box w={"30%"} boxShadow={"2xl"} py={5} px={10}>
        <Heading my={5}>Login</Heading>
        <form onSubmit={handleSubmit}>
          <SimpleGrid gap={5}>
            <Input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
            <Input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <Button colorScheme="blue" type="submit">
              Login
            </Button>
          </SimpleGrid>
        </form>
      </Box>
    </Flex>
  );
};
