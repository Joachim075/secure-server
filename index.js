import express from 'express';
import morgan from 'morgan';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFile } from 'fs';

// getting directory name of current module
const __dirname = dirname(fileURLToPath(import.meta.url));
const server = express();

//server static files from the public folder
server.use(morgan('dev'));
server.use(express.static(path.join(__dirname, 'public')));
server.use(express.urlencoded({ extended: true }));

// route for login page
server.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});
 
//route for handling login submission
server.post('/login', (req, res) => {
  const { password } = req.body;
  if (password === '1234') {
    res.redirect('/course');
  } else {
    res.redirect('/login?error=1');
  }
});

//route for course page
server.get('/course', (req, res) => {
  readFile(path.join(__dirname, 'public', 'node-course.html'), 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('error occurred');
    } else {
      res.send(data);
    }
  });
});

server.listen(4000, () => {
  console.log('Server is running on port 4000.');
});
