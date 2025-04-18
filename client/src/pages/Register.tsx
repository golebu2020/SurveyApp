import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Select,
  Link,
  Box,
  Heading,
  Text,
} from '@chakra-ui/react';
import { useRegister } from '../api/hooks';
import { useForm } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';

interface RegisterFormData {
  email: string;
  password: string;
  role: 'user' | 'manager' | 'admin';
}

export function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();
  const { mutate: registerUser, isPending } = useRegister();

  const onSubmit = (data: RegisterFormData) => {
    registerUser(data);
  };

  return (
    <Box maxW="md" mx="auto" mt={10}>
      <Heading mb={6} textAlign="center">
        Create an Account
      </Heading>
      <VStack
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        spacing={4}
        p={8}
        boxShadow="md"
        borderRadius="md"
        bg="white"
      >
        <FormControl isInvalid={!!errors.email}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            {...register('email', { required: 'Email is required' })}
          />
          {errors.email && <Text color="red.500">{errors.email.message}</Text>}
        </FormControl>

        <FormControl isInvalid={!!errors.password}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters',
              },
            })}
          />
          {errors.password && (
            <Text color="red.500">{errors.password.message}</Text>
          )}
        </FormControl>

        <FormControl isInvalid={!!errors.role}>
          <FormLabel>Role</FormLabel>
          <Select
            placeholder="Select role"
            {...register('role', { required: 'Role is required' })}
          >
            <option value="user">User</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </Select>
          {errors.role && <Text color="red.500">{errors.role.message}</Text>}
        </FormControl>

        <Button
          type="submit"
          colorScheme="blue"
          width="full"
          isLoading={isPending}
          mt={4}
        >
          Register
        </Button>

        <Text mt={4}>
          Already have an account?{' '}
          <Link as={RouterLink} to="/login" color="blue.500">
            Sign in
          </Link>
        </Text>
      </VStack>
    </Box>
  );
}
