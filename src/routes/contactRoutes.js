const express = require('express');

const usersController = require('../controllers/usersController');
const crmController = require('../controllers/contactsController');

const router = express.Router();

// GET all contacts
router.get('/contacts', usersController.loginRequired, crmController.getContacts);

// POST (Insert a new contact)
router.post('/contacts', usersController.loginRequired, crmController.addNewContact);

router.route('/contact/:contactId')
    // GET a specific contact
    .get(usersController.loginRequired, crmController.getContactWithID)

    // PUT (Update a specific contact)
    .put(usersController.loginRequired, crmController.updateContact)

    // DELETE (Delete a specific contact))
    .delete(usersController.loginRequired, crmController.deleteContact);

// Register a new user
router.post('/auth/register', usersController.register);
// Login with a user (Need to use the Authorization Header with the JWT hash token)
router.post('/login', usersController.login);

module.exports = router;