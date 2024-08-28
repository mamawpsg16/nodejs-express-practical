import express from 'express';
const router =  express.Router();
import { getContacts, createContact, showContact, updateContact, deleteContact } from '../controllers/contactController.js';
import validateToken from '../middleware/validateToken.js';
/** CONTACTS ROUTE GROUP */
// router.use(validateToken)
router.route('/').get(getContacts).post(createContact);
router.route('/:id').get(showContact).put(updateContact).delete(deleteContact);

export default router;