// server.js
const jsonServer = require('json-server');
const auth = require('json-server-auth');
const cors = require('cors');

const server = jsonServer.create();
const router = jsonServer.router('db.json');

// Authorization rules
const rules = auth.rewriter({
  // "resource": permission
  users: 600, // only owner can access
  "user/profile": 660, // only authenticated users
  "user/*": 660,
  workouts: 444,  // public read
  nutrition: 444,
  products: 444
});

server.db = router.db; // bind the router DB to the server

server.use(cors());
server.use(rules);
server.use(auth);      // auth must come before the router
server.use('/api', router); // your existing route prefix

server.listen(process.env.PORT || 6001, () => {
  console.log('✅ JSON Server + Auth is running');
});
