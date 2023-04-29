import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { 
  Box, 
  FormControl, 
  FormLabel, 
  Input, 
  Button, 
  Alert, 
  AlertIcon 
} from '@chakra-ui/react';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showError, setShowError] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
  }

  return (
    <Box maxWidth={400} mx="auto" mt={10} p={5} boxShadow="md" rounded="md">
      {showError && (
        <Alert status="error" mb={5}>
          <AlertIcon />
          Invalid email or password.
        </Alert>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl mb={3}>
          <FormLabel>Email address</FormLabel>
          <Input type="email" {...register("email", { required: true })} />
          {errors.email && <Box color="red">Email is required</Box>}
        </FormControl>
        <FormControl mb={3}>
          <FormLabel>Password</FormLabel>
          <Input type="password" {...register("password", { required: true })} />
          {errors.password && <Box color="red">Password is required</Box>}
        </FormControl>
        <Button colorScheme="blue" type="submit">Login</Button>
      </form>
    </Box>
  );
};

export default Login;
