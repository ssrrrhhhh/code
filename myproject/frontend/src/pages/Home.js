import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import AboutUs from '../components/sections/AboutUs';
import Advantages from '../components/sections/Advantages';
import HowToUse from '../components/sections/HowToUse';
import { Link } from 'react-router-dom'; // добавьте этот импорт, если ещё не импортирован
import './Home.css';
import heroBg from '../assets/1.jpg';
function Home() {
  return (
    <div>
      <Header />
      
 {/* Hero Section */}
<Box 
  className="hero" 
  sx={{ 
    backgroundImage: `url(${heroBg})`, // замените на ваш путь
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '95vh', // почти полный экран по высоте
    display: 'flex',
    alignItems: 'center', // вертикальное центрирование контента
    justifyContent: 'center', // горизонтальное центрирование (опционально, Container и так по центру)
    position: 'relative',
    overflow: 'hidden',
    color: '#ffffff',
  }}
>
  {/* Звёздочки */}
  <div className="star" style={{ top: '10%', left: '5%' }}>★</div>
  <div className="star" style={{ top: '20%', right: '10%' }}>★</div>
  <div className="star" style={{ bottom: '10%', left: '20%' }}>★</div>
  <div className="star" style={{ bottom: '20%', right: '5%' }}>★</div>
  <div className="star" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>★</div>

  {/* Контент по центру */}
  <Container 
    maxWidth="lg" 
    sx={{ 
      textAlign: 'center', 
      position: 'relative', 
      zIndex: 1,
      py: 0, // убираем отступы, если они мешают центрированию
    }}
  >
    <Typography 
      variant="h1" 
      component="h1" 
      gutterBottom 
      sx={{ 
        color: '#ffffff',
        fontWeight: 'bold', 
        fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
        textShadow: '0 2px 4px rgba(0,0,0,0.5)', // улучшает читаемость на фоне
      }}
    >
      Начни совместную разработку прямо сейчас
    </Typography>
<Link to="/editor" style={{ textDecoration: 'none' }}>
  <Button
    variant="contained"
    size="large"
    sx={{
      bgcolor: '#f44336',
      color: '#ffffff',
      fontWeight: 'bold',
      px: 6,
      py: 2,
      borderRadius: 3,
      '&:hover': { bgcolor: '#d32f2f' }
    }}
  >
    НАЧАТЬ РАБОТУ
  </Button>
</Link>
  </Container>
</Box>
      {/* Секции */}
      <AboutUs />
      <Advantages />
      <HowToUse />

      <Footer />
    </div>
  );
}

export default Home;