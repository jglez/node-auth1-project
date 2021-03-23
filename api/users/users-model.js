// Connect our model with the physical database
const db = require('../../data/db-config.js')

/**
  resolves to an ARRAY with all users, each user having { user_id, username }
 */
function find() {
  return db.select('user_id', 'username').from('users')
}

/**
  resolves to an ARRAY with all users that match the userId condition
 */
function findBy(userId) {
  return db.select('user_id', 'username').from('users').where('user_id', userId)
}

/**
  resolves to the user { user_id, username } with the given user_id
 */
function findById(user_id) {
  return db.select('user_id', 'username').from('users')
    .where('user_id', user_id)
}

/**
  resolves to the newly inserted user { user_id, username }
 */
async function add(user) {
  // Successfully inserts but returns just the id
  // return db('users').insert(user)

  // Instead of returning just the id, we destructure that id and save it to a variable
  const [id] = await db('users').insert(user)

  // We await the creation of this user and we call our findById function, passing in the id
  return findById(id)
}

// Don't forget to add these to the `exports` object so they can be required in other modules
module.exports = {
  find,
  findBy,
  findById,
  add
}