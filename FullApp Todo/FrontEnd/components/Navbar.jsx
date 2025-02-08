import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav>
      <Box
        height={"70px"}
        width={"full"}
        backgroundColor={"gray"}
        px={5}
        py={2}
      >
        <Flex
          justifyContent={"space-between"}
          height={"full"}
          alignItems={"center"}
        >
          <Heading>Todos</Heading>
          <Text fontSize={25} fontWeight={600}>
            <Link to="/">Home</Link>
          </Text>

          <Flex gap={10}>
            <Text fontSize={25} fontWeight={600}>
              <Link to="/login">Login</Link>
            </Text>

            <Text fontSize={25} fontWeight={600}>
              <Link to="/register">Register</Link>
            </Text>
          </Flex>
        </Flex>
      </Box>
    </nav>
  );
};
