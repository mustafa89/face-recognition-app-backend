import Clarifai from 'clarifai'

const app = new Clarifai.App({
  apiKey: '1a674a68cfb243e99477f0459092a003'
})

export const handleClarifaiApi = (req, res) => {
  app.models
    .predict({ id: 'd02b4508df58432fbb84e800597b8959' }, req.body.input)
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      res.status(400).json('unable to work with the API')
    })
}

export const handleImage = (req, res, db) => {
  const id = Number(req.body.id)

  db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.status(200).json(entries[0])
    })
    .catch(err => {
      res.status(400).json('No user found')
    })
}

//export default { handleImage, handleClarifaiApi }
