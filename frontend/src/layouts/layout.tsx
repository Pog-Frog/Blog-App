import Navbar from '../components/navbar'
import Footer from '../components/footer'
import ToastMessage from '@/hooks/Toast'
import React from "react";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from '@mui/material/CssBaseline'
import {useMediaQuery} from "@mui/material";


// @ts-ignore
export default function Layout({children}) {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode: prefersDarkMode ? 'dark' : 'light',
                },
            }),
        [prefersDarkMode],
    );
    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Navbar/>
                <ToastMessage/>
                <main>
                    <section>{children}</section>
                </main>
                <Footer/>
            </ThemeProvider>
        </>
    );
}
