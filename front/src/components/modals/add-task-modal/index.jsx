import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Center,
  ButtonGroup,
  FormControl,
  Grid,
  GridItem,
  FormLabel,
  Input,
  Text,
  Select,
  Textarea,
  Box,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAuth } from "../../authContext/AuthContext";

export const AddTaskModal = ({onSubmit,button,setAssignedUserName,data, editble}) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });
  const [users, setUsers] = useState([]);
  const getAllUsers = async() => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authentication: token },
    };

    const response = await axios
      .get(`http://localhost:5000/users`, config)
      .then((response) => {
        setUsers([...response.data.result]);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getAllUsers();
    reset(data)
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure();


  return (
    <>
      <Text cursor="pointer" onClick={onOpen}>{button}</Text>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl>
                    <FormLabel>Title</FormLabel>
                    <Input mb={8}
                      placeholder="Title"
                      {...register("title", {
                        required: "Title is required",
                        minLength: {
                          value: 2,
                          message: "Title is not valid",
                        },
                      })}
                    />
                    <Text color="tomato">
                      {errors?.title && errors?.title?.message}
                    </Text>
                    <FormLabel>Description</FormLabel>
                    <Textarea mb={8 }
                      placeholder="Description"
                      {...register(
                        "description",
                        {
                          required: "Description is required",
                          minLength: {
                            value: 3,
                            message: "Description is not valid",
                          },
                        }
                      )}
                    />
                    <Text color="tomato">
                      {errors?.description && errors?.description?.message}
                    </Text>
                <FormLabel>User Name</FormLabel>
                
                <Select mb={5} placeholder="Users"  {...register("assignedUserId")}>
                {users?.map(user =>{
                      return <option value={user._id} >{user.firstName} {user.lastName}</option>
                    })}
                </Select>
                { editble ?<Box>
                  <Select
                    mb={5}
                    placeholder="Status"
                    {...register("status")}
                  >
                    <option value="toDo">To Do</option>
                    <option value="inProgress">In Progress</option>
                    <option value="readyQA">Ready For QA</option>
                    <option value="done">Done</option>
                  </Select>
                </Box>:null}
                <Center>
                  <Button
                    borderColor="#08BDA9"
                    bg="#08BDA9"
                    px={20}
                    py={5}
                    type="submit"
                  >
                    ADD TASK
                  </Button>
                </Center>
              </FormControl>
              
            </form>
          </ModalBody>
          <Center>
            <ModalFooter>
              <Button colorScheme="blue" onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </Center>
        </ModalContent>
      </Modal>
    </>
  );
};
