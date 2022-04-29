import usersDao from '../database/users/users-dao.js';

const handleRegister = async (req, res, db, bcrypt) => {
    const newUser = req.body;
    console.log('new user email', newUser.email);
    if (!newUser.email || !newUser.name || !newUser.address || !newUser.password) {
        return res.status(400).json('incorrect form submission - message from the server');
    }
    const hash = bcrypt.hashSync(newUser.password);
    var doc = { hash: hash, email: newUser.email };
    db.collection('login').insertOne(doc, function (error, response) {
        if (error) {
            console.log('Error occurred while inserting');
            return;
        } else {
            console.log('inserted record');
        }
    });

    console.log('new user email', newUser.email);
    console.log('new user', newUser);
    const insertedUser = await usersDao.register(newUser).catch(err => {
        console.log('error', err);

        res.status(400).json('user or login duplicates not allowed');
    });
    console.log(insertedUser);
    res.json(insertedUser);

}

export default handleRegister;