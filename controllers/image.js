const handleImage = (req, res, db) => {
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

export default handleImage
