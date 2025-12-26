import React from 'react';
import { Box, Container, Grid, Link, Typography } from '@mui/material';
import './Footer.css';

function Footer() {
    return (
        <Box className="footer" sx={{ bgcolor: '#d32f2f', py: 4, color: '#ffffff'}}>
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Box className="footer-logo" sx={{ width: 60, height: 60, bgcolor: '#f44336', borderRadius: '50%', mr: 2 }} />
                        </Box>
                        <Typography variant="body2">© 2025 Ваша Компания. Все права защищены.</Typography>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Typography variant="subtitle1" gutterBottom>тех.поддержка</Typography>
                        <Link href="#" color="inherit" underline="hover">пользовательское соглашение</Link>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Typography variant="subtitle1" gutterBottom>контакты</Typography>
                        <Link href="#" color="inherit" underline="hover">соцсети</Link>
                        <br />
                        <Link href="#" color="inherit" underline="hover">соцсети</Link>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default Footer;