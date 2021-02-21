const handleSignIn = (db, bcrypt) => (req, res) => {
    const { email, password } = req.body
    if ( !email || !password) {
        return res.status(400).json('incorrect for submission')
    }
  db.select('email', 'hash')
    .from('login')
    .where('email', '=', email)
    .then(data => {
      if (bcrypt.compareSync(password, data[0].hash)) {
        return db
          .select('*')
          .from('users')
          .where('email', '=', email)
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
