import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
/* import './Advantages.css'; */

function Advantages() {
  const advantages = [
    { title: "преимущество", image: "https://img.icons8.com/?size=100&id=53372&format=png&color=FA5252" }, // ← сюда вставь путь к изображению
    { title: "преимущество", image: "https://img.icons8.com/?size=100&id=GFej7GKIrLRV&format=png&color=FA5252" },
    { title: "преимущество", image: "https://img.icons8.com/?size=100&id=15975&format=png&color=FA5252" },
  ];

  return (
    <Box className="advantages" sx={{ bgcolor: '#ffcdd2', py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h2" gutterBottom sx={{ color: '#d32f2f', fontWeight: 'bold', textAlign: 'center' }}>
          ПРЕИМУЩЕСТВА
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {advantages.map((adv, index) => (
            <Grid item key={index}>
              <Box
                className="advantage-item"
                sx={{
                  width: 150,
                  height: 150,

                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 2,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  overflow: 'hidden', // чтобы изображение не выходило за круг
                  bgcolor: '#ffa198ff', // фон на случай, если изображение не загрузится или прозрачное
                }}
              >
                {/* Вставь сюда тег <img> с src из adv.image */}
                <img
                  src={adv.image}
                  alt={adv.title}
                  style={{
                    width: '80%',
                    height: '80%',
                    objectFit: 'contain', // сохраняет пропорции и не обрезает
                  }}
                />
              </Box>
              <Typography variant="body1" align="center" sx={{ color: '#d32f2f', fontWeight: 'medium' }}>
                {adv.title}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Advantages;