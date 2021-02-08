import { count } from 'console'
import express from 'express'
import { readlink } from 'fs'
import bcrypt from 'bcrypt'

const app = express()
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const db = {
  users: [
    {
      id: 1,
      name: 'Keanu',
      email: 'keanu@reeves.com',
      password: 'thechosenone',
      entries: 0,
      joined: new Date()
    },
    {
      id: 2,
      name: 'Matt',
      email: 'matt@damon.com',
      password: 'jason',
      entries: 0,
      joined: new Date()
    }
  ]
}



const compare = (Password, hash) => {
    bcrypt.compare(Password, hash, (err, res) => {
        return res
})
}

const outer = (a, b) => {
    return function (a,b) {
        return a+b
    }(a, b);
}

app.get('/', (req, res) => {
  res.send(user)
})

app.post('/signin', (req, res) => {
    //const myPlaintextPassword = 's0/\/\P4$$w0rD';
    //const hash1 = bcrypt.hashSync(myPlaintextPassword, 10)
    //console.log(hash1)
    // console.log(bcrypt.compareSync(myPlaintextPassword, hash1))
    console.log(outer(4,9))
    const hash = hasher(req.body.password)
    console.log(hash)
    const result = compare(req.body.password, hash)
    console.log(result)
  if (
    req.body.email === db.users[1].email &&
    req.body.password === db.users[1].password
  ) {
    res.send('success')
  } else {
    res.status(400).json('Email/Password incorrect')
  }
})

app.post('/register', (req, res) => {
  const { name, email, password } = req.body
  db.users.push({
    id: 3,
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date()
  })
  res.json(db.users[db.users.length - 1]) // --> Grab last entry in array
})

app.get('/profile/:id', (req, res) => {
  const { id } = req.params
  const user = db.users.filter(item => {    
      return item.id === Number(id)
  })
  if (!user.length) {
      res.status(400).json("No user found")
  } else {
  res.status(200).json(user)
  }
})

app.put('/image', (req, res) => {
    const user = db.users.filter(item => {    
        return item.id === Number(req.body.id)
    })
    if (!user.length) {
        res.status(400).json("No user found")
    } else {
        user[0].entries++
        res.status(200).json(user)
    }
})

app.listen('3000', () => {
  console.log('App running on port 3000.....')
})

// /sigin --> POST =  success/fail
// /register --> POST = return new user created
// /profile/:userid --> Get = get user
// /image --> PUT --> update on user profile, return count /read
