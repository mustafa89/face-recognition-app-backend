const handleSignIn = (db, bcrypt) => (req, res) => {
  db.select('email', 'hash')
    .from('login')
    .where('email', '=', req.body.email)
    .then(data => {
      if (bcrypt.compareSync(req.body.password, data[0].hash)) {
        return db
          .select('*')
          .from('users')
          .where('email', '=', req.body.email)
          .then(user => {
            res.status(200).json(user[0])
          })
      } else {
        res.status(400).json('Email/Password incorrect')
      }
    })
    .catch(err => res.status(400).json('Email/Password incorrect'))
}

export default handleSignIn
