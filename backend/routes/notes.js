const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

const JWT_SECRET = 'Gauravis$agoodBuy';

//ROUTE 1: get all notes using GET "/api/notes/fetchallnotes". login required

router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server Error')
    }
})

//ROUTE 2: Add a new note using POST "/api/notes/addnote". login required

router.post('/addnote', fetchuser, [
    body('title', 'enter valid title').isLength({ min: 3 }),
    body('description', 'description must be at least 5 characters.').isLength({ min: 8 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        // if errors return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = await Notes.create({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()

        res.json(savedNote)
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server Error')
    }
})

//ROUTE 3: Update an existing note using PUT "/api/notes/updatenote". login required
router.put('/updatenote/:id', fetchuser, [
    body('title', 'enter valid title').isLength({ min: 3 }),
    body('description', 'description must be at least 5 characters.').isLength({ min: 8 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        // if errors return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Create a newNote object
        const newNote = {}
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }

        // Find the note to be updated and update it
        let note = await Notes.findById(req.params.id)
        if (!note) { return res.status(404).send("Not Found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed!")
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json(note)

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server Error')
    }
})

//ROUTE 4: Delete an existing note using DELETE "/api/notes/deletenote". login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // find the note to be deleted, authorise the correct user and delete the note
        let note = await Notes.findById(req.params.id)
        if (!note) { return res.status(404).send("Not Found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Authorised!")
        }

        // delete the note
        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({'success':'Note given below is deleted.', note:note})
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server Error')
    }
})


module.exports = router