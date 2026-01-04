import { TextField, Button, Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "./schema";
import { AUTH_API_END_POINT } from '../config/constants.js';
import axios from 'axios';

function RegistrationPage() {

  const onRegister = async (data) => {
    console.log("Form Data:", data);

    try {
      const response = await axios.post(
        AUTH_API_END_POINT + "/register",
        data
      );

      console.log(`Registration successful! Welcome, ${response.data.name}`);
    } catch (error) {
      console.log(
        `Registration failed: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(registerSchema)
  });

  return (
    <Box component="form" onSubmit={handleSubmit(onRegister)} 
      display="flex" flexDirection="column" alignItems="center" p={4}>
      <h1>Create New Account</h1>
      <TextField
        label="Choose Your Username"
        fullWidth
        variant="outlined"
        sx={{width: 360}}
        margin="normal"
        error={!!errors.username}
        helperText={errors.username?.message}
        {...register("username")}
      />
      <TextField
        label="Email"
        fullWidth
        variant="outlined"
        sx={{width: 360}}
        margin="normal"
        error={!!errors.email}
        helperText={errors.email?.message}
        {...register("email")}
      />
      
       <TextField
        label="Enter Your Full Name"
        fullWidth
        variant="outlined"
        sx={{width: 360}}
        margin="normal"
        error={!!errors.fullname}
        helperText={errors.fullname?.message}
        {...register("fullname")}
      />     
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        sx={{width: 360}}
        margin="normal"
        error={!!errors.password}
        helperText={errors.password?.message}
        {...register("password")}
      />

      <TextField
        label="Confirm Password"
        type="password"
        variant="outlined"
        sx={{width: 360}}
        margin="normal"
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />
      <Button type="submit" color="primary" variant="contained" sx={{ mt: 3 }}>
        Register
      </Button>
    </Box>
  );
}

export default RegistrationPage;
