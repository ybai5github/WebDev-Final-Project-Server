const handleProfile = (req, res, db) => {
    const { id } = req.params;
    console.log('id', id);
    db.select('*').from('users').where({
        id: id
    }).then(user => {
        console.log(user)
        if (user.length) {
            res.json(user[0])
        } else {
            res.status(400).json('Not found')
        }
    })
        .catch(err => res.status(400).json(err))
    /*  database.users.forEach(user => {
         if (user.id === id) {
             found = true;
             return res.json(user);
         }
     }) */
    /* if (!found) {
        res.status(404).json("not found");
    } */
}

export default handleProfile;