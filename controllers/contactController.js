const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

// @desc Get all contacts
// @route GET /api/contacts
// @access private
const getAllContacts = asyncHandler(async (req, res) => {

    const contacts = await Contact.find({ user_id: req.user._id });
    res.status(200).json(contacts);
});

// @desc Create contacts
// @route POST /api/contacts
// @access private
const createContacts = asyncHandler(async (req, res) => {
    console.log("The request body is", req.body);
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All the fields are mandatary");
    }

    try {
        const contact = await Contact.create({
            name,
            email,
            phone,
            user_id: req.user._id
        })

        console.log(contact);
        res.status(201).json(contact);
    } catch (err) {
        console.log(err)
    }
});

// @desc Get contact
// @route GET /api/contacts
// @access private
const getContact = asyncHandler(async (req, res) => {

    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    res.status(200).json(contact);
});

// @desc Update contacts
// @route PUT /api/contacts/:id
// @access private
const updateContact = asyncHandler(async (req, res) => {

    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    if (contact.user_id.toString() !== req.user._id) {
        res.status(403);
        throw new Error("User don't have authorization to update the contact!")
    }
    const updatedcontact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.status(200).json(updatedcontact);
});

// @desc delete contacts
// @route DELETE /api/contacts/:id
// @access private
const deleteContact = asyncHandler(async (req, res) => {

    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    if (contact.user_id.toString() !== req.user._id) {
        res.status(403);
        throw new Error("User don't have authorization to update the contact!")
    }
    await Contact.deleteOne({ _id: req.params.id });

    res.status(200).json(contact);

});

module.exports = { getAllContacts, createContacts, getContact, updateContact, deleteContact };

