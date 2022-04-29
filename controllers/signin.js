const handleSignIn = (req, res, db, bcrypt) => {
    const login = req.body;
    console.log(login);
    if (!login.email || !login.password) {
        return res.status(400).json('incorrect form submission');
    }

    var query = { email: login.email }
    db.collection('login').find(query).toArray(function (err, result) {
        if (err) throw error;
        if (result.length == 0) {
            res.status(400).json('wrong credentials');
        } else {
            console.log(result);
            console.log(result[0].hash);
            const isValid = bcrypt.compareSync(req.body.password, result[0].hash);
            console.log(isValid);
            if (isValid) {
                var query = { email: login.email }
                db.collection('users').find(query).toArray(function (err, result) {
                    if (err) throw err;
                    console.log('result', result);
                    console.log('result [0]', result[0]);
                    res.json(result[0])
                })
            } else {
                res.status(400).json('wrong credentials')
            }
        }
    })
}

export default handleSignIn;