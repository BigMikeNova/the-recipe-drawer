const { User } = require('../models');
const bcrypt = require('bcrypt');

const userSeeds = [
  {
    username: 'johnsmith',
    email: 'john@example.com',
    password: bcrypt.hashSync('password123', 10),
  },
  {
    username: 'janedoe',
    email: 'jane@example.com',
    password: bcrypt.hashSync('securepassword', 10),
  },
  {
    username: 'mikejones',
    email: 'mike@example.com',
    password: bcrypt.hashSync('mysecretpass', 10),
  },
  {
    username: 'emilywilson',
    email: 'emily@example.com',
    password: bcrypt.hashSync('strongpassword', 10),
  },
  {
    username: 'davidbrown',
    email: 'david@example.com',
    password: bcrypt.hashSync('pass1234', 10),
  },
];

const seedUsers = () => User.bulkCreate(userSeeds);

module.exports = seedUsers;
