const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const basicAuth = require('basic-auth');
app.use(express.json());


const dummyUser = { username: 'umar', password: 'pass' };
function authenticateUser(req, res, next) {
  const credentials = basicAuth(req);

  if (!credentials || credentials.name !== dummyUser.
    username || credentials.pass !== dummyUser.password) {
    res.set('WWW-Authenticate', 'Basic realm="Authentication required"');
    return res.status(401).json({ error: 'Authentication failed' });
  }

  next();
}

app.use(authenticateUser); //to check whether is user is authenticated or not

const apiRoutes = require('./routes/api'); // Import routes


app.use('/api', apiRoutes);  // Use routes

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
