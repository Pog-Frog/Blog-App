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
import {useDispatch, useSelector} from 'react-redux';
import {selectErrorState, showError} from '@/redux/reducers/ErrorReducer';
import axios from 'axios';
import {Select} from '@mui/material';



const SignUp = () =>{
    const dispatch = useDispatch();

    interface Country {
        index: number;
        country: string;
        cities: string[];
    }

    const [countries, setCountries] = React.useState<Country[]>([]);
    const [selectedCountry, setSelectedCountry] = React.useState<Country | null>(null);
    const [selectedCountryIndex, setSelectedCountryIndex] = React.useState<number>(0);
    const [selectedCountryCities, setSelectedCountryCities] = React.useState<string[]>([]);
    const [selectedCity, setSelectedCity] = React.useState('');
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        axios
            .get("https://countriesnow.space/api/v0.1/countries")
            .then((response) => {
                setCountries(response.data.data);
                setSelectedCountryCities(response.data.data[0].cities);
                setSelectedCountry(response.data.data[0].country);
                setSelectedCity(response.data.data[0].cities[0]);
                setLoading(false);
            })
            .catch((error) => {
                dispatch(showError(error.message));
            });
    }, [dispatch]);

    const verify_name = (firstname: string, lastname: string) => {
        if (firstname.length < 2 || lastname.length < 2) {
            dispatch(showError('First and last name must be at least 2 characters long'));
            return false;
        }
        if (!/^[a-zA-Z]+$/.test(firstname) || !/^[a-zA-Z]+$/.test(lastname)) {
            dispatch(showError('First and last name must contain only letters'));
            return false;
        }
        return true;
    }

    const verify_email = (email: string) => {
        if (email.length < 5) {
            dispatch(showError('Email must be at least 5 characters long'));
            return false;
        }
        //verify the email is valid
        if (!email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            dispatch(showError('Email is not valid'));
            return false;
        }
        return true;
    }

    const verify_password = (password: string, confirm_password: string) => {
        if (password.length < 8) {
            dispatch(showError('Password must be at least 8 characters long'));
            return false;
        }
        if (password !== confirm_password) {
            dispatch(showError('Passwords do not match'));
            return false;
        }
        if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
            dispatch(showError('Password must contain at least one number, one letter, and one special character'));
            return false;
        }
        return true;
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if (!verify_name(data.get('firstName') as string, data.get('lastName') as string)) {
            return;
        }
        if (!verify_email(data.get('email') as string)) {
            return;
        }
        if (!verify_password(data.get('password') as string, data.get('confirm_password') as string)) {
            return;
        }
        if (!verify_phone(data.get('phone') as string)) {
            return;
        }
        console.log({
            firstName: data.get('firstName'),
            lastName: data.get('lastName'),
            email: data.get('email'),
            password: data.get('password'),
            phone: data.get('phone'),
            country: selectedCountry,
            city: selectedCity,
        });
    }

    const verify_phone = (phone: string) => {
        if (phone.length < 10) {
            dispatch(showError('Phone number must be at least 10 characters long'));
            return false;
        }
        if (!phone.match(/^[0-9]+$/)) {
            dispatch(showError('Phone number must contain only numbers'));
            return false;
        }
        return true;
    }

    React.useEffect(() => {
        setSelectedCountryIndex(
            countries.findIndex((country: any) => country.country === selectedCountry)
        );
    }, [selectedCountry, countries]);

    React.useEffect(() => {
        setSelectedCountryCities(countries[selectedCountryIndex]?.cities || []);
    }, [selectedCountryIndex, countries]);

    const Countries = () => {
        return (
            <div>
                <Select
                    native
                    fullWidth
                    value={selectedCountry}
                    onChange={(event) => {
                        // @ts-ignore
                        setSelectedCountry(event.target.value.toString());
                    }}
                    inputProps={{
                        name: 'country',
                        id: 'country-native-simple',
                    }}
                >
                    {countries.map((country: any, index: number) => (
                        <option key={index} value={country.country}>{country.country}</option>
                    ))}
                </Select>
                <Select sx={{marginTop: 2}}
                        native
                        fullWidth
                        value={selectedCity}
                        onChange={(event) => {
                            setSelectedCity(event.target.value.toString());
                        }}
                        inputProps={{
                            name: 'city',
                            id: 'city-native-simple',
                        }}
                >
                    {selectedCountryCities.map((city: any, index: number) => (
                        <option key={index} value={city}>{city}</option>
                    ))}
                </Select>
            </div>
        );
    }

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
                    Sign up
                </Typography>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Countries/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="confirm_password"
                                    label="Confirm Password"
                                    type="password"
                                    id="confirm_password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="phone"
                                    label="Phone"
                                    type="phone"
                                    id="phone"
                                    autoComplete="phone"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                )}
            </Box>
        </Container>
    );
}

export default SignUp;