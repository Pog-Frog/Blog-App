import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const Footer = () => {

    return (
        <footer className="footer" style={{marginTop:100, marginBottom:50}}>
            <Typography variant="body2" color="text.secondary" align="center">
                {'Copyright © '}
                <Link color="inherit" href="#">
                    PogFrog
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        </footer>
    )
}

export default Footer