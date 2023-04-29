import {
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AddTaskModal } from "../modals/add-task-modal";
import { AddUserModal } from "../modals/add-user-modal";
import { RxHamburgerMenu } from "react-icons/rx";
import { useAuth } from "../authContext/AuthContext";
import { useState } from "react";
export const Header = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });
  const { user, setUser } = useAuth();
  const toast = useToast();
  const successToast = (message) => {
    return toast({
      title: "Account created.",
      description: message,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };
  const errorToast = (message) => {
    return toast({
      title: "Sorry.",
      description: message,
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  };
  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authentication: token },
    };
    const allData = { ...data, createdAt: Date.now() };
    await axios
      .post("http://localhost:5000/add-task", allData, config)
      .then(function (response) {
        successToast("Task Created");
        reset();
      })
      .catch(function (error) {
        errorToast(error.response.data.message);
      });
  };

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <Box position="relative" backgroundColor="#319795">
      <Container mb={5}>
        <Grid
          p={2}
          color="#fff"
          textTransform="uppercase"
          justifyContent="center"
          textDecoration="none"
          templateColumns={`repeat(${true ? 4 : 2}, auto)`}
          gap={10}
        >
          <GridItem>
            <Link to="/board">Board</Link>
          </GridItem>
          <GridItem>
            <AddUserModal button={"Add User"} />
          </GridItem>
          <GridItem>
            <AddTaskModal
              onSubmit={onSubmit}
              button={"Add Task"}
            />
          </GridItem>
        </Grid>
      </Container>
      <Box position="absolute" top="0" right="0">
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<RxHamburgerMenu />}
            variant="outline"
          />
          <MenuList>
            <MenuItem>{user.firstName + " " + user.lastName}</MenuItem>
            <MenuItem
              borderRadius="5px"
              onClick={logOut}
              backgroundColor="tomato"
            >
              Log Out
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Box>
  );
};
