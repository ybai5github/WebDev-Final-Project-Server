const handleAdmin = (req, res, db) => {
    db.collection('users').find({}, { cartItems: 1 }).toArray(function (err, result) {
        if (err) throw err;
        console.log('result', result.length);

        const combined = [];
        for (var i = 0; i < result.length; i++) {
            var merged = [].concat.apply([], result[i].cartItems);

            combined.push(merged);
            console.log('merged array', merged.length);
            console.log('combined', combined)
        }
        console.log([].concat.apply([], combined));
        res.json([].concat.apply([], combined));
    })
}

export default handleAdmin;