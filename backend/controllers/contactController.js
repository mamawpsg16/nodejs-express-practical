import asyncHandler from 'express-async-handler';
import Contact from '../models/contactModel.js';

// @desc Get all contacts
// @route GET /api/contacts
// @access private
const getContacts = asyncHandler(async (req, res) => {
    // const user = req.user;
    // if (!user || user.id) {
    //     res.status(401);
    //     throw new Error("Unauthorized");
    // }

    /** GET ALL CONTACTS OF AUTHENTICATED USER */
    // const contacts = await Contact.find({user_id: req.user.id});
    /** GET ALL CONTACTS */
    const contacts = await Contact.find({});
    // const contact = await Contact.findOne({name:"kevin", age:20}).exec();
    res.status(200).json(contacts);
})

// @desc Create new contact
// @route POST /api/contacts
// @access private
const createContact = asyncHandler(async (req, res) => {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields required");
    }

    // Corrected this line to pass an object to Contact.create
    const contact = await Contact.create({ name, email, phone, user_id: req.user.id });

    res.status(201).json(contact);
});


// @desc Get contact
// @route GET /api/contacts/:id
// @access private
const showContact = asyncHandler(async(req, res) => {
    // Corrected this line to pass an object to Contact.create
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
})

// @desc Update contact
// @route PUT /api/contacts/:id
// @access private
const updateContact = asyncHandler(async(req, res) => {
    const id = req.params.id;
    const contact = await Contact.findById(id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(401);
        throw new Error("Unauthorized");
        
    }

    const updateContact = await Contact.findByIdAndUpdate(
        id,
        req.body,
        { new:true }
    )
    res.status(200).json(updateContact);
})

// @desc Delete contact
// @route DELETE /api/contacts/:id
// @access public
const deleteContact = asyncHandler(async (req, res) => {
    const id = req.params.id;
    
    // Find the contact first
    const contact = await Contact.findById(id);

    if (!contact) {
        return res.status(404).json({ message: "Contact not found" });
    }

    // Check if the user owns this contact
    if (contact.user_id.toString() !== req.user.id) {
        return res.status(403).json({ message: "Not authorized to delete this contact" });
    }

    // Delete the contact
    const deletedContact = await Contact.deleteOne({ _id:id });

    // Respond with a confirmation message
    res.status(200).json({ message: `Deleted contact with id ${id}`, deletedContact });
});

export { 
    getContacts, 
    createContact,
    showContact,
    updateContact,
    deleteContact
}