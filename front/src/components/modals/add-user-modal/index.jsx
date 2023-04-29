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
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export const AddUserModal = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset, 
    formState: { errors },
  } = useForm({
    mode: "onBlur", 
  });

  const toast = useToast();

const successToast = () => {
  return toast({
    title: "Account created.",
    description: "We've created your account for you.",
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

  const onSignUp = async (data) => {
    const allData = {...data,createdAt:Date.now(),role:"user"};
    await axios
      .post("http://localhost:5000/sign-up-user", allData)
      .then(function (response) {
        successToast();
        reset();
      })
      .catch(function (error) {
        errorToast(error.response.data.message);
      });
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Text cursor="pointer"  onClick={onOpen}>Add User</Text>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSignUp)}>
              <FormControl>
                <Grid  templateColumns="repeat(2, 1fr)" gap={6}>
                  <GridItem>
                    <FormLabel>First Name</FormLabel>
                    <Input
                      placeholder="First Name"
                      {...register("firstName", {
                        required: "First name is required",
                        minLength: {
                          value: 2,
                          message: "Name is not valid",
                        },
                      })}
                    />
                    <Text color="tomato">
                      {errors?.firstName && errors?.firstName?.message}
                    </Text>
                  </GridItem>
                  <GridItem w="100%">
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      w="200px"
                      placeholder="Last Name"
                      {...register(
                        "lastName",

                        {
                          required: "Last name is required",
                          minLength: {
                            value: 3,
                            message: "Last Name is not valid",
                          },
                        }
                      )}
                    />
                    <Text color="tomato">
                      {errors?.lastName && errors?.lastName?.message}
                    </Text>
                  </GridItem>
                </Grid>
                <FormLabel>Email</FormLabel>
                <Input
                  placeholder="Email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, // emaili regexpy
                      message: "Invalid email address", // error massage
                    },
                  })}
                />
                <br></br>
                <Text color="tomato">
                  {errors?.email && errors?.email?.message}
                </Text>
                <br></br>
                <FormLabel>Password</FormLabel>
                <Input
                  placeholder="Password"
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                />
                <br></br>
                <Text color="tomato">
                  {errors?.password && errors?.password?.message}
                </Text>
                <br></br>

                <FormLabel>Confirm Password</FormLabel>
                <Input
                  placeholder="Confirm Password"
                  type="password"
                  {...register("confirmPassword", {
                    required: "password is required",
                    validate: (value) => value === watch("password"),
                  })}
                />
                <br></br>
                <Text color="tomato">
                  {errors?.confirmPassword && "Passwords do not match"}
                </Text>
                <br></br>
                <Center>
                    <Button
                      borderColor="#08BDA9"
                      bg="#08BDA9"
                      px={20}
                      py={5}
                      type="submit"
                    >
                      SIGN UP
                    </Button>
                </Center>
              </FormControl>
            </form>
          </ModalBody>
          <Center>
          <ModalFooter >
            <Button colorScheme="blue" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
          </Center>
        </ModalContent>
      </Modal>
    </>
  );
}
