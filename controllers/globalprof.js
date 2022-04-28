const globalhandleProfile = (req, res, db) => {
  const { id } = req.params;
  console.log('id', id);
  db.select('*').from('users').where({
    id: id
  }).then(user => {
    console.log(user)
    if (user.length) {
      res.json(user[1])
    } else {
      res.status(400).json('Not found')
    }
  })
  .catch(err => res.status(400).json(err))
}

export default globalhandleProfile;