const express = require('express');
const { exec } = require('child_process');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/ping', (req, res) => {
  const domain = req.body.domain;

  console.log('Probing domain: ', domain);

  exec(`ping -c 4 ${domain}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }

    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }

    const output = stdout;
    console.log(output);
    res.send(output);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

