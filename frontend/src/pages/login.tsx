import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {selectAuthState, setToken} from "@/redux/reducers/auth.reducer";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import {AuthService} from "@/pages/api/services/auth.service";
import {showError} from "@/redux/reducers/error.reducer";
import {User} from "@/pages/api/interfaces/user.interface";
import {showSuccess} from "@/redux/reducers/success.reducer";


export default function SignIn() {
    const router = useRouter();
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        //@ts-ignore
        const user: User = {
            email: data.get('email') as string,
            password: data.get('password') as string
        }
        await AuthService.login(user)
            .then((response) => {
                dispatch(showSuccess('You have successfully logged in!'))
                dispatch(setToken(response.token));
                router.push({
                    pathname: '/home',
                })
            })
            .catch((error) => {
                console.log(error);
                dispatch(showError(error.message));
            }
        )
    };

    const dispatch = useDispatch();

    return (
        <Container maxWidth="xs" style={{marginTop: 100}}>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={router.query.value}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Grid container style={{marginTop: 5}}>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/registration" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Sign In
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}