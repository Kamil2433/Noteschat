const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes");
const fetchuser = require("../middleware/fetchuser");
const Group =require("../models/Group");
const User= require("../models/User");

router.get("/getnotes", fetchuser, async (req, res) => {

  // const gr = await user.findOne({ id: req.user.id  });
  // console.l/og(gr)
  // if (!gr) {
  //   return res.status(404).json({ error: 'user not found' });
  // }



  try {
    let allnote = await Group.find({ User: req.user.id });

    res.json(allnote);
  } catch (error) {
    console.log(error);
  }
});

router.post("/addgroup", fetchuser, async (req, res) => {
//   console.log(req.user.id);


//   const gr = await User.findOne({ id: req.user.id });
//   console.log(gr)
//   if (!gr) {
//     return res.status(404).json({ error: 'user not found' });
//   }




  try {
    const { name, color } = req.body;

    const Gro = new Group({
    name,
    color,
    User:req.user.id
    });

    const saved = await Gro.save();

    res.json(saved);

    console.log("gorup craeted", saved)

  } catch (error) {
    console.log(error);
  }
});


router.post("/addnote", fetchuser, async (req, res) => {
  console.log(req.user.id);



  
  try {
    const { description,  group } = req.body;


    // Find the group by name
    const gr = await Group.findOne({ name: group });
    if (!gr) {
      return res.status(404).json({ error: 'Group not found' });
    }

    // Create a new note object with description and current date
    const newNote = {
      description,
      date: new Date() // Current date
    };

    // Push the new note into the group's notes array
    gr.notes.push(newNote);

    // Save the group with the updated notes array
    await gr.save();

    // Return the saved group
    res.json(gr);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
});


router.put("/update/:id", fetchuser, async (req, res) => {
  try {
    // const //{reqtitle,reqdescription,reqwimage}=req.body;

    //   const newnote=new Notes({
    // title,description,image,user:req.user.id
    //   })

    const note = await Notes.findById(req.params.id);

    if (!note) {
      return res.status(404).send("Note not found");
    }

    console.log(note.User.toString());

    console.log(req.user.id.toString());

    if (note.User.toString() !== req.user.id) {
      return res.status(401).send("Cannot update this note");
    }

    const options = { upsert: true };

    const updateDoc = {
      $set: {
        title: req.body.title,
        description: req.body.description,
        image: req.body.image,
      },
    };

    const up = await Notes.findByIdAndUpdate(req.params.id, updateDoc, options);

    res.json(up);
  } catch (error) {
    console.log(error);
  }
});


//delete
router.delete("/delete/:id", fetchuser, async (req, res) => {
  try {
    // const //{reqtitle,reqdescription,reqwimage}=req.body;

    //   const newnote=new Notes({
    // title,description,image,user:req.user.id
    //   })

    const note = await Notes.findById(req.params.id);

    if (!note) {
      return res.status(404).send("Note not found");
    }

    // console.log(note.User.toString());

    // console.log(req.user.id.toString());

    if (note.User.toString() !== req.user.id) {
      return res.status(401).send("Cannot update this note");
    }

    // const options = { upsert: true };

    // const updateDoc = {
    //   $set: {
    //     title: req.body.title,
    //     description: req.body.description,
    //     image: req.body.image,
    //   },
    // };

    const up = await Notes.findByIdAndDelete(req.params.id);

    res.json(up);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
