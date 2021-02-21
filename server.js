import express from 'express'
import bcrypt from 'bcrypt'
import cors from 'cors'
import knex from 'knex'
import handleRegister from './controllers/register.js'
import handleProfile from './controllers/profile.js'
import handleImage from './controllers/image.js'
import handleSignIn from './controllers/signin.js'

const app = express()
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(express.json())

const db = knex({
  client: 'pg',
  version: '7.2',
  connection: {
    host: 'localhost',
    user: 'postgres',
    password: 'changeme',
    database: 'smart-brain'
  }
})

app.get('/', (req, res) => {
  res.send(db.users)
})

// different way of doing it.
app.post('/signin', handleSignIn(db, bcrypt))

app.post('/register', (req, res) => {
  handleRegister(req, res, db, bcrypt)
})

app.get('/profile/:id', (req, res) => {
  handleProfile(req, res, db)
})

app.put('/image', (req, res) => {
  handleImage(req, res, db)
})

app.listen('3001', () => {
  console.log('App running on port 3001.....')
})

// /sigin --> POST =  success/fail
// /register --> POST = return new user created
// /profile/:userid --> Get = get user
// /image --> PUT --> update on user profile, return count /read
