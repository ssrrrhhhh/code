import React from 'react';
import { Box, Container, Typography } from '@mui/material';

function AboutUs() {
  const items = [
    { title: "Очень важный текст", desc: "Очень важный текст очень важный текст очень важный текст" },
    { title: "Очень важный текст", desc: "Очень важный текст очень важный текст очень важный текст" },
    { title: "Очень важный текст", desc: "Очень важный текст очень важный текст очень важный текст" },
  ];

  return (
    <Box className="about-us" sx={{ bgcolor: '#ffcdd2', py: 8 }}>
      <Container maxWidth="xl"> {/* Увеличена ширина контейнера */}
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{
            color: '#d32f2f',
            fontWeight: 'bold',
            textAlign: 'center',
            mb: 5,
          }}
        >
          О НАС
        </Typography>

        {/* Гибкий ряд без переноса, карточки не сжимаются */}
        <Box
          sx={{
            display: 'flex',
            gap: 3, // чуть больше пространства между карточками
            width: '100%',
            alignItems: 'stretch',
          }}
        >
          {items.map((item, index) => (
            <Box
              key={index}
              className="card"
              sx={{
                flex: '1 1 300px', // не сжимается меньше 300px, растягивается равномерно
                minWidth: 300,     // фиксируем минимальную ширину
                minHeight: 280,    // фиксируем минимальную высоту — карточки не сжимаются
                bgcolor: '#ff8a80',
                p: 2.5,
                borderRadius: 2,
                textAlign: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              {/* Изображение с фиксированной высотой и пропорциональным покрытием */}
              <Box
                component="img"
                src="https://i.pinimg.com/1200x/4f/0b/53/4f0b53bb99f8563ebb3bf70dea8bcd72.jpg"
                alt="Изображение"
                sx={{
                  width: '100%',
                  height: 90, // фиксированная высота картинки
                  objectFit: 'cover',
                  borderRadius: 1,
                  mb: 2,
                }}
              />

              <Typography
                variant="h6"
                sx={{
                  color: '#d32f2f',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  lineHeight: 1.3,
                  mb: 1,
                }}
              >
                {item.title}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: '#d32f2f',
                  fontSize: '0.9rem',
                  lineHeight: 1.5,
                }}
              >
                {item.desc}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default AboutUs;