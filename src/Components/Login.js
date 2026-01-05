import axios from 'axios';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../validation/loginSchema.js';
import { AUTH_API_END_POINT } from '../config/constants.js';

function Login({ open, onClose, onLoginSuccess }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    const payload = {
      username: data.identifier.trim(),
      password: data.password,
    };

    try {
      const response = await axios.post(
        `${AUTH_API_END_POINT}/login`,
        payload
      );

      const { user, accessToken, refreshToken } = response.data;

      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      onLoginSuccess(user);
      reset();
      onClose();
    } catch (error) {
      console.error(
        'Login failed:',
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <DialogTitle>Login</DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Email or Username"
            fullWidth
            variant="outlined"
            error={!!errors.identifier}
            helperText={errors.identifier?.message}
            {...register('identifier')}
          />

          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            error={!!errors.password}
            helperText={errors.password?.message}
            {...register('password')}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            type="submit"
            color="primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Logging in…' : 'Submit'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default Login;

