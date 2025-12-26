// src/pages/Editor.js

import React, { useState } from 'react';
import { Box, Container, Typography, Grid, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, List, ListItem, ListItemText, IconButton, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import './Editor.css';
import MonacoEditor from 'react-monaco-editor';

function Editor() {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]); // список загруженных файлов
  const [currentFile, setCurrentFile] = useState(null); // текущий открытый файл
  const [openRoomDialog, setOpenRoomDialog] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [language, setLanguage] = useState('javascript'); // язык по умолчанию

  // Обработчик загрузки файлов
const handleFileUpload = (event) => {
  const uploadedFiles = Array.from(event.target.files);

  // Обрабатываем каждый файл асинхронно
  const fileReaders = uploadedFiles.map(file => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve({
          id: Date.now() + Math.random(),
          name: file.name,
          content: e.target.result, // содержимое файла как строка
          language: guessLanguage(file.name),
          lastModified: file.lastModified
        });
      };
      reader.onerror = () => {
        resolve({
          id: Date.now() + Math.random(),
          name: file.name,
          content: '', // или "Ошибка чтения файла"
          language: guessLanguage(file.name),
          lastModified: file.lastModified
        });
      };
      reader.readAsText(file); // читаем как текст (подходит для кода)
    });
  });

  // Дожидаемся чтения всех файлов
  Promise.all(fileReaders).then(newFiles => {
    setFiles(prev => [...prev, ...newFiles]);
    if (!currentFile && newFiles.length > 0) {
      setCurrentFile(newFiles[0]);
    }
  });

  // Сбрасываем input, чтобы можно было загрузить тот же файл повторно
  event.target.value = null;
};

  // Определение языка по расширению файла
  const guessLanguage = (filename) => {
    const ext = filename.split('.').pop().toLowerCase();
    const langMap = {
      js: 'javascript',
      ts: 'typescript',
      py: 'python',
      java: 'java',
      cpp: 'cpp',
      c: 'c',
      html: 'html',
      css: 'css',
      json: 'json',
      md: 'markdown',
      txt: 'plaintext'
    };
    return langMap[ext] || 'plaintext';
  };

  // Обработчик клика по файлу в списке
  const handleFileClick = (file) => {
    setCurrentFile(file);
  };

  // Обработчик изменения кода
  const handleEditorChange = (value) => {
    if (currentFile) {
      const updatedFiles = files.map(f => 
        f.id === currentFile.id ? { ...f, content: value } : f
      );
      setFiles(updatedFiles);
    }
  };

  // Открыть диалог создания комнаты
  const handleOpenRoomDialog = () => {
    setOpenRoomDialog(true);
  };

  // Закрыть диалог
  const handleCloseRoomDialog = () => {
    setOpenRoomDialog(false);
    setInviteEmail('');
  };

  // Отправить приглашение (заглушка)
  const handleSendInvite = () => {
    alert(`Приглашение отправлено на ${inviteEmail}`);
    // Здесь можно вызвать API для отправки письма
    handleCloseRoomDialog();
  };

  // Обработчик выбора языка
  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
    if (currentFile) {
      const updatedFiles = files.map(f => 
        f.id === currentFile.id ? { ...f, language: event.target.value } : f
      );
      setFiles(updatedFiles);
    }
  };

  return (
    <div>
      <Header />
      
      <Box className="editor-page" sx={{ bgcolor: '#ffcdd2', py: 8, minHeight: '100vh' }}>
        <Container maxWidth="lg" sx={{ height: 'calc(100vh - 160px)' }}> {/* Вычитаем высоту header и footer */}
          <Grid container spacing={0} sx={{ height: '100%', width: '100%', margin: 0 }}>
  {/* Левая панель — 15% */}
  <Grid 
    item 
    sx={{ 
      width: '15%', 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column' 
    }}
  >
    <Box sx={{ 
      bgcolor: '#ff8a80', 
      p: 2, 
      borderRadius: 2, 
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}>
      <Typography variant="body2" sx={{ color: '#d32f2f', mb: 2 }}>
        Тут файлы и возможность создать комнату
      </Typography>

      <Button 
        variant="contained" 
        size="small" 
        onClick={handleOpenRoomDialog}
        sx={{ 
          bgcolor: '#d32f2f', 
          color: '#ffffff', 
          fontWeight: 'bold',
          mb: 2
        }}
      >
        Создать комнату
      </Button>

      <Box sx={{ flexGrow: 1, overflowY: 'auto', mt: 2 }}>
        <List>
          {files.map((file) => (
            <ListItem 
              key={file.id} 
              button 
              selected={currentFile?.id === file.id}
              onClick={() => handleFileClick(file)}
              sx={{
                bgcolor: currentFile?.id === file.id ? '#f44336' : 'transparent',
                '&:hover': { bgcolor: '#ff8a80' },
                borderRadius: 1,
                mb: 1
              }}
            >
              <ListItemText 
                primary={file.name} 
                secondary={`(${file.language})`} 
                primaryTypographyProps={{ color: '#d32f2f' }}
                secondaryTypographyProps={{ color: '#d32f2f' }}
              />
            </ListItem>
          ))}
        </List>
      </Box>

      <Box sx={{ mt: 2 }}>
        <input
          accept="*"
          style={{ display: 'none' }}
          id="upload-file"
          type="file"
          multiple
          onChange={handleFileUpload}
        />
        <label htmlFor="upload-file">
          <Button 
            component="span" 
            variant="outlined" 
            fullWidth
            sx={{ 
              borderColor: '#d32f2f', 
              color: '#d32f2f',
              '&:hover': { bgcolor: '#ff8a80' }
            }}
          >
            Загрузить файлы
          </Button>
        </label>
      </Box>
    </Box>
  </Grid>

  {/* Правая панель — 85% */}
  <Grid 
    item 
    sx={{ 
      width: '85%', 
      height: '100%', 
      pl: 2 // небольшой отступ слева для визуального разделения
    }}
  >
    {/* Вставьте сюда обновлённый контент редактора (из предыдущего ответа) */}
    <Box sx={{ 
      bgcolor: '#ffffff', 
      p: 2, 
      borderRadius: 2, 
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
    }}>
      {/* Выбор языка */}
      <Box sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="subtitle2" sx={{ color: '#d32f2f' }}>Язык:</Typography>
        <select 
          value={currentFile ? currentFile.language : language}
          onChange={handleLanguageChange}
          style={{
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #d32f2f',
            backgroundColor: '#ffcdd2',
            color: '#d32f2f',
            fontWeight: 'bold'
          }}
        >
          <option value="javascript">JavaScript</option>
          <option value="typescript">TypeScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
          <option value="c">C</option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
          <option value="json">JSON</option>
          <option value="markdown">Markdown</option>
          <option value="plaintext">Plain Text</option>
        </select>
      </Box>

      <Box sx={{ height: '90%', minHeight: 0, position: 'relative' }}>
        {currentFile ? (
          <MonacoEditor
            width="100%"
            height="100%"
            language={currentFile.language}
            theme="vs-light"
            value={currentFile.content}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: 'on',
              roundedSelection: false,
              scrollBeyondLastLine: false,
              readOnly: false,
              automaticLayout: true,
            }}
            onChange={handleEditorChange}
            editorDidMount={(editor) => {
              editor.focus();
            }}
          />
        ) : (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100%', 
            color: '#d32f2f', 
            fontSize: '1.5rem',
            textAlign: 'center'
          }}>
            Выберите файл из списка слева или загрузите новый.
          </Box>
        )}
      </Box>

      {currentFile && (
        <Box sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <Button 
            variant="outlined" 
            onClick={() => {
              const blob = new Blob([currentFile.content], { type: 'text/plain' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = currentFile.name;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              URL.revokeObjectURL(url);
            }}
            sx={{ 
              borderColor: '#d32f2f', 
              color: '#d32f2f',
              '&:hover': { bgcolor: '#ff8a80' }
            }}
          >
            Скачать файл
          </Button>
        </Box>
      )}
    </Box>
  </Grid>
</Grid>
        </Container>
      </Box>

      {/* Диалоговое окно "Создать комнату" */}
      <Dialog open={openRoomDialog} onClose={handleCloseRoomDialog}>
        <DialogTitle>Создать комнату</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Email получателя"
            type="email"
            fullWidth
            variant="outlined"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRoomDialog}>Отмена</Button>
          <Button onClick={handleSendInvite} variant="contained" color="primary">
            Отправить приглашение
          </Button>
        </DialogActions>
      </Dialog>

      <Footer />
    </div>
  );
}

export default Editor;