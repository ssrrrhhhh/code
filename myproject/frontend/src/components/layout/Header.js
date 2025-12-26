import React from 'react';
import { Box, Container, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom'; // ← импортируем Link из роутера
import './Header.css';

function Header() {
  return (
    <Box className="header" sx={{ bgcolor: '#ff8a80', py: 2, borderBottom: '2px solid #d32f2f' }}>
      <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box className="logo-circle" sx={{ width: 50, height: 50, bgcolor: '#f44336', borderRadius: '50%', mr: 2 }} />
        </Box>
        <Box sx={{ display: 'flex', gap: 4 }}>
          {/* ← Навигационная ссылка на редактор */}
          <RouterLink to="/editor" className="nav-link">РЕДАКТОР КОДА</RouterLink>
          <RouterLink to="/#about" className="nav-link">О НАС</RouterLink>
          <RouterLink to="/#faq" className="nav-link">ВОПРОС-ОТВЕТ</RouterLink>
          <RouterLink to="/auth" className="nav-link">ВХОД/РЕГИСТРАЦИЯ</RouterLink>
        </Box>
      </Container>
    </Box>
  );
}

export default Header;