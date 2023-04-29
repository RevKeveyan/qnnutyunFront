import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Container,
  Divider,
  Grid,
  GridItem,
  Heading,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { AddTaskModal } from "../../components/modals/add-task-modal";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../components/authContext/AuthContext";
export const Task = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);

  const getAllAdminTasks = async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authentication: token },
    };
    const response = await axios
      .get(`http://localhost:5000/tasks/admin/${user._id}`, config)
      .then((response) => {
        setTasks([...response.data.result]);
      })
      .catch((err) => {});
  };

  const getAllUserTasks = async (id) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authentication: token },
    };
    const response = await axios
      .get(`http://localhost:5000/tasks/user/${user._id}`, config)
      .then((response) => {
        setTasks([...response.data.result]);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    if (user.role === "admin") {
      getAllAdminTasks();
    } else {
      getAllUserTasks();
    }
  }, []);


  const renderTasks = (status) =>{
    const newFilters = tasks.filter(task=> task.status === status)
    newFilters.map((task) => {
      return (
        <Card mt={10} maxW="sm">
          <CardBody position="relative">
            <Button
              backgroundColor="tomato"
              position="absolute"
              top="0"
              right="0"
            >
              <AiFillDelete />
            </Button>
            <Button
              backgroundColor="#0074E0"
              position="absolute"
              top="0"
              left="0"
            >
              <AddTaskModal
                backgroundColor="#0074E0"
                position="absolute"
                top="0"
                left="0"
                button={<AiFillEdit />}
                data={""}
              />
            </Button>

            <Stack spacing="3" mt={10}>
              <Heading size="md">{task.title}</Heading>
              <Text textTransform="lowercase" color="green">
                {task.description}
              </Text>
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter>
            <Grid
              gap={10}
              alignContent="center"
              templateColumns="repeat(2, auto)"
            >
              <GridItem>
                {true ? (
                  <Select
                    mb={5}
                    placeholder="Users"
                    {...register("selectedUser")}
                  >
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </Select>
                ) : (
                  <Text p={3}>User Name</Text>
                )}
              </GridItem>
              <GridItem>
                <Select
                  mb={5}
                  placeholder="Status"
                  {...register("selectedStatus")}
                >
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </Select>
              </GridItem>
            </Grid>
          </CardFooter>
          <Box>
            <Grid
              gap={10}
              alignContent="center"
              templateColumns="repeat(2, auto)"
            >
              <GridItem>
                <Text></Text>
              </GridItem>
              <GridItem>
                <Text>Created: 20/12/23</Text>
              </GridItem>
            </Grid>
          </Box>
        </Card>
      );
    })
  }
  return (
    <Box>
      <Grid
        color="black"
        textAlign="center"
        p={2}
        textTransform="uppercase"
        justifyContent="space-between"
        textDecoration="none"
        templateColumns="repeat(4, 300px)"
        gap={10}
      >
        <GridItem>
          <Heading borderBottom="1px solid green" mb={4} size="md">
            TO DO
          </Heading>
          
        </GridItem>
        <GridItem>
          <Heading borderBottom="1px solid green" mb={4} size="md">
            IIN PROGRESS
          </Heading>
        </GridItem>
        <GridItem>
          <Heading borderBottom="1px solid green" mb={4} size="md">
            READY FOR QA
          </Heading>
        </GridItem>
        <GridItem>
          <Heading borderBottom="1px solid green" mb={4} size="md">
            DONE
          </Heading>
        </GridItem>
      </Grid>
    </Box>
  );
};
