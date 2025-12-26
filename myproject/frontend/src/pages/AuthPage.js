// src/pages/AuthPage.js

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Button,
  TextField,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import api from '../services/api';
import './AuthPage.css';

function AuthPage() {
  const [tabValue, setTabValue] = useState(0); // 0 = login, 1 = register
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
    setError(''); // сброс ошибки при смене вкладки
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // ← критически важно!
    setError('');
    setLoading(true);

    try {
      let response;
      if (tabValue === 0) {
        // Вход
        response = await api.post('/register/', {
          username: formData.username,
          password: formData.password,
        });
      } else {
        // Регистрация
        if (formData.password !== formData.password2) {
          setError('Пароли не совпадают');
          setLoading(false);
          return;
        }
        response = await api.post('/register/', {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        });
      }

      // Сохраняем токен и пользователя
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/editor');
    } catch (err) {
      console.error('Ошибка API:', err);
      const errorMsg = err.response?.data?.error || 'Ошибка авторизации';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />

      <Box
        sx={{
          width: '90%',
          maxWidth: '1200px',
          margin: '0 auto',
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'row',
          borderRadius: 2,
          overflow: 'hidden',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        }}
      >
        {/* Левый блок — изображение */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            bgcolor: '#ffebee',
          }}
        >
          <img
            src="https://i.pinimg.com/736x/3b/60/49/3b6049de2bb445fcd106a15e231eabcf.jpg"
            alt="Authentication background"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </Box>

        {/* Правый блок — форма */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            p: 4,
            bgcolor: '#ffffff',
          }}
        >
          <Tabs value={tabValue} onChange={handleChange} centered sx={{ mb: 3 }}>
            <Tab
              label="ВХОД"
              sx={{
                color: tabValue === 0 ? '#ffffff' : '#d32f2f',
                bgcolor: tabValue === 0 ? '#f44336' : '#ffcdd2',
                fontWeight: 'bold',
              }}
            />
            <Tab
              label="РЕГИСТРАЦИЯ"
              sx={{
                color: tabValue === 1 ? '#ffffff' : '#d32f2f',
                bgcolor: tabValue === 1 ? '#f44336' : '#ffcdd2',
                fontWeight: 'bold',
              }}
            />
          </Tabs>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {tabValue === 0 && (
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
              <TextField
                fullWidth
                margin="normal"
                label="Логин"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
                autoComplete="username"
              />
              <TextField
                fullWidth
                margin="normal"
                label="Пароль"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                autoComplete="current-password"
              />
              <Button
                fullWidth
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{
                  mt: 3,
                  bgcolor: '#f44336',
                  '&:hover': { bgcolor: '#d32f2f' },
                }}
              >
                {loading ? 'Загрузка...' : 'Войти'}
              </Button>
            </Box>
          )}

          {tabValue === 1 && (
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
              <TextField
                fullWidth
                margin="normal"
                label="Имя пользователя"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
                autoComplete="username"
              />
              <TextField
                fullWidth
                margin="normal"
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                autoComplete="email"
              />
              <TextField
                fullWidth
                margin="normal"
                label="Пароль"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                autoComplete="new-password"
              />
              <TextField
                fullWidth
                margin="normal"
                label="Подтверждение пароля"
                type="password"
                name="password2"
                value={formData.password2}
                onChange={handleInputChange}
                required
                autoComplete="new-password"
              />
              <Button
                fullWidth
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{
                  mt: 3,
                  bgcolor: '#f44336',
                  '&:hover': { bgcolor: '#d32f2f' },
                }}
              >
                {loading ? 'Загрузка...' : 'Зарегистрироваться'}
              </Button>
            </Box>
          )}
        </Box>
      </Box>

      <Footer />
    </div>
  );
}

export default AuthPage;