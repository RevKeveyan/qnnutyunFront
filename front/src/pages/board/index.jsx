import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Container,
  Divider,
  FormControl,
  Grid,
  GridItem,
  Heading,
  Select,
  Stack,
  Text,
  useToast,
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
  const [users, setUsers] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [status, seStstus] = useState(false);

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
  const getAllUserTasks = async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authentication: token },
    };
    const response = await axios
      .get(`http://localhost:5000/tasks/user/${user._id}`, config)
      .then((response) => {
        setTasks([...response.data.result]);
        setLoaded(true);
      })
      .catch((err) => {});
  };

  const getAllUsers = async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authentication: token },
    };

    const response = await axios
      .get(`http://localhost:5000/users`, config)
      .then((response) => {
        setUsers([...response.data.result]);
        setLoaded(true);
      })
      .catch((err) => {});
  };

  const onDelete = async (id) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authentication: token },
    };
    const response = await axios
      .delete(`http://localhost:5000/delete-task/${id}`, config)
      .then((response) => {
        successToast("Task deleted");
        setLoaded(true);
        
      })
      .catch((err) => {
        console.log(err);
        if(err)errorToast("Delete error");
        
      });
  };
  const onEdit = async (data) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authentication: token },
    };
    const response = await axios
      .put("http://localhost:5000/update-task", data, config)
      .then((response) => {
        successToast("Task Updated");
      })
      .catch((error) => {
        errorToast(error.response.data.message);
      });
  };

  useEffect(() => {
    getAllUsers();
    if (user.role === "admin") {
      getAllAdminTasks();
    } else {
      getAllUserTasks();
    }
  }, []);

  const renderTasks = (status) => {
    const newTasks = tasks.filter((task) => task.status === status);
    return newTasks.map((task) => {
      return (
        <Card border="1px solid green" key={task?._id} mt={10} maxW="sm">
          <CardBody position="relative">
            <Button
              onClick={() => onDelete(task?._id)}
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
                onSubmit={onEdit}
                data={task}
                backgroundColor="#0074E0"
                editble={true}
                position="absolute"
                top="0"
                left="0"
                button={<AiFillEdit />}
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
                  <Text>{new Date(task.createdAt).toLocaleString()}</Text>
                </GridItem>
              </Grid>
            </Box>
          </CardFooter>
        </Card>
      );
    });
  };

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
          {tasks.length > 0 ? renderTasks("toDo") : <Text>text</Text>}
        </GridItem>
        <GridItem>
          <Heading borderBottom="1px solid green" mb={4} size="md">
            IIN PROGRESS
          </Heading>
          {tasks.length > 0 ? renderTasks("inProgress") : <Text>text</Text>}
        </GridItem>
        <GridItem>
          <Heading borderBottom="1px solid green" mb={4} size="md">
            READY FOR QA
          </Heading>
          {tasks.length > 0 ? renderTasks("readyQA") : <Text>text</Text>}
        </GridItem>
        <GridItem>
          <Heading borderBottom="1px solid green" mb={4} size="md">
            DONE
          </Heading>
          {tasks.length > 0 ? renderTasks("done") : <Text>text</Text>}
        </GridItem>
      </Grid>
    </Box>
  );
};
