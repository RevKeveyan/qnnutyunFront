import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Alert,
  AlertIcon,
  Text,
  useToast,
  Heading,
} from "@chakra-ui/react";

export const Login = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showError, setShowError] = useState(false);
  const toast = useToast();

  const successToast =()=>{
  return toast({
          title: 'Success.',
          status: 'success',
          duration: 3000,
          isClosable: true,
      });
  };
  const errorToast = (massage)=>{
      return toast({
          title: 'Sorry.',
          description: massage,
          status: 'error',
          duration: 3000,
          isClosable: true,
      });
  };

  const signIn = async (data) => {
    await axios.post("http://localhost:5000/sign-in", data) 
            .then((response) => {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                successToast();
                reset();
              })
            .catch((error) =>{
                errorToast(error.response.data.message);
            });
        };
        

  return (
    <Box  maxWidth={400} mx="auto" mt={10} p={5} boxShadow="md" rounded="md">
      <Heading textAlign='center' borderBottom="1px solid green" pb={2} mb={4} size="md">
            Log In
          </Heading>
      {showError && (
        <Alert status="error" mb={5}>
          <AlertIcon />
          Invalid email or password.
        </Alert>
      )}
      <form onSubmit={handleSubmit(signIn)}>
        <FormControl mb={3}>
          <FormLabel>Email address</FormLabel>
          <Input type="text" placeholder="email..." {...register("email", 
            {   
                required: "Email is required",
                pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 
                message: "Invalid email address", 
            },
            })}/>
         <Text color="tomato">{ errors?.email && errors?.email?.message}</Text><br></br>
        </FormControl>
        <FormControl mb={3}>
          <FormLabel>Password</FormLabel>
          <Input placeholder="password" type="password"  {...register("password", 
            {   
                required: "Password is incorrect",
                minLength:{
                    value: 8,
                    message:"Password must be at least 8 characters"
                    }
            })} />
          {errors.password && <Box color="red">Password is required</Box>}
        </FormControl>
        <Button colorScheme="green" type="submit">
          Login
        </Button>
      </form>
    </Box>
  );
};
