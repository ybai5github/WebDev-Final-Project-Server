const handleRegister = (req, res, db, bcrypt) => {
    const { email, name, password, address} = req.body;
    if (!email || !name || !password){
        return res.status(400).json('incorrect form submission)');
    }
    const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email,
        })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                    .returning('*')
                    .insert({
                        email: loginEmail[0].email,
                        name: name,
                        address: address,
                        joined: new Date()
                    })
                    .then(user => {
                        res.json(user);
                    })
            })
            .then(trx.commit)
            .catch(trx.rollback)
    })
        .catch(err => res.status(400).json('unable to register'))

}

export default handleRegister;