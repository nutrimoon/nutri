const UserModel = require('../models/UserModel')
// Create and Save a new user
exports.create = async (req, res,) => {
    if (!req.body.email && !req.body.firstName && !req.body.lastName && !req.body.phone) {
        //res.status(400).send({ message: "Content can not be empty!" });
        res.status(400).render('results', {mydata: "Content can not be empty!"})
    }

    const user = new UserModel({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone
    });

    await user.save().then(data => {
        /*res.send({
            message:"User created successfully!!",
            user:data
        });*/
        res.render('results', {mydata: "user "+ data.firstName +" created succesfully!"})
    }).catch(err => {
        /*res.status(500).send({
            message: err.message || "Some error occurred while creating user"
        });*/
        res.render('results', {mydata: err.message || "Some error occurred while creating user"})
    });
};
// Retrieve all users from the database.
exports.findAll = async (req, res) => {
    try {
        const user = await UserModel.find();
        //res.status(200).json(user);
        res.status(200).render('results', {mydata: user})
    } catch(error) {
        res.status(404).render('results', {mydata: error.message})
        //res.status(404).json({message: error.message});
    }
};
// Find a single User with an id
exports.findOne = async (req, res) => {
    try {
        const user = await UserModel.findOne({email: req.query.email}).exec(); //change params to query
        //const user = await UserModel.findById(req.query.id); //change params to query
        //res.status(200).json(user);
        res.status(200).render('results', {mydata: "user :"+ user.firstName +" "
                + user.lastName +" "+ user.email +" "+ user.phone
        })
    } catch(error) {
        //res.status(404).json({ message: error.message});
        res.status(404).render('results', {mydata: error.message})
    }
};
// Update a user by the id in the request
exports.update = async (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    await UserModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `User not found.`
            });
        }else{
            res.send({ message: "User updated successfully." })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};
// Delete a user with the specified id in the request
exports.destroy = async (req, res) => {
    //await UserModel.findByIdAndRemove(req.params.id).then(data => {
    await UserModel.deleteOne({email: req.query.email}).then(data => {
    //await UserModel.findByIdAndRemove(req.query.id).then(data => {
        if (!data) {
            /*res.status(404).send({
                message: `User not found.`
            });*/
            res.status(404).render('results', {mydata: "User not found"})

        } else {
            /*res.send({
                message: "User deleted successfully!"
            });*/
            res.render('results', {mydata: "user "+data.firstName+" deleted succesfully!"})
        }
    }).catch(err => {
        /*res.status(500).send({
            message: err.message
        });*/
        res.status(500).render('results', {mydata: err.message})
    });
};