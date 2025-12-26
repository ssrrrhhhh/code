import React from 'react';
import { Box, Container, Typography } from '@mui/material';

function HowToUse() {
  const steps = [
    { title: "Создавай комнаты" },
    { title: "Выбирай нужный тебе язык" },
    { title: "Загружай и скачивай свои файлы" },
    { title: "Редактируй вместе со своей командой" },
  ];

  return (
    <Box className="how-to-use" sx={{ bgcolor: '#ffcdd2', py: 6 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{ color: '#d32f2f', fontWeight: 'bold', textAlign: 'center', mb: 4 }}
        >
          КАК ИСПОЛЬЗОВАТЬ?
        </Typography>

        {/* Группируем шаги попарно */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {Array.from({ length: Math.ceil(steps.length / 2) }).map((_, pairIndex) => {
            const first = steps[pairIndex * 2];
            const second = steps[pairIndex * 2 + 1];

            return (
              <Box
                key={pairIndex}
                sx={{
                  display: 'flex',
                  gap: 4,          // пространство между блоками
                  width: '100%',
                }}
              >
                {/* Первый блок */}
                <Box
                  sx={{
                    flex: 1,
                    bgcolor: '#ff8a80',
                    p: 3,
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  }}
                >
                  <Box
                    sx={{
                      bgcolor: '#f44336',
                      width: 80,
                      height: 80,
                      borderRadius: 1,
                      flexShrink: 0,
                      mr: 2,
                    }}
                  />
                  <Typography variant="h6" sx={{ color: '#d32f2f', fontWeight: 'bold' }}>
                    {first?.title}
                  </Typography>
                </Box>

                {/* Второй блок (если существует) */}
                {second ? (
                  <Box
                    sx={{
                      flex: 1,
                      bgcolor: '#ff8a80',
                      p: 3,
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    }}
                  >
                    <Box
                      sx={{
                        bgcolor: '#f44336',
                        width: 80,
                        height: 80,
                        borderRadius: 1,
                        flexShrink: 0,
                        mr: 2,
                      }}
                    />
                    <Typography variant="h6" sx={{ color: '#d32f2f', fontWeight: 'bold' }}>
                      {second.title}
                    </Typography>
                  </Box>
                ) : (
                  <Box sx={{ flex: 1 }} /> // пустой placeholder, чтобы сохранить выравнивание
                )}
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}

export default HowToUse;