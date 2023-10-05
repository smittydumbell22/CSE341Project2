const router = require('express').Router();
const { auth, requiresAuth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: 'http://localhost:3000',
  clientID: '8dw9813ljTxxnxUnb0RwyFLn0PnsCSkL',
  issuerBaseURL: 'https://dev-j6lc6w66nyepoisq.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
router.use(auth(config));

// req.isAuthenticated is provided from the auth router
router.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});


router.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});


router.use('/', require('./swagger'));
router.use("/zoo_animals", requiresAuth(), require("./zoo_animals"));
router.use("/zoo_patrons", require("./zoo_patrons"));
router.use("/zoo_employees", require("./zoo_employees"));
router.use("/zoo_shops", require("./zoo_shops"));




// router.get('/', (req, res) => {
//     //#swagger.tags=['Cassie Smith']
//     res.send('Cassie Smith');
// });

router.use('/zoo_animals', require('./zoo_animals'));
router.use('/zoo_patrons', require('./zoo_patrons'));
router.use('/zoo_employees', require('./zoo_employees'));
router.use('/zoo_shops', require('./zoo_shops'))

module.exports = router;