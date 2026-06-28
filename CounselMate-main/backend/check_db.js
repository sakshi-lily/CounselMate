const mongoose = require("mongoose");
const User = require("./models/user.js");
require("dotenv").config();

async function checkUsers() {
  await mongoose.connect(process.env.ATLAS_URI);
  const users = await User.find({});
  console.log(`Found ${users.length} users in the database.`);
  for (const user of users) {
    console.log(`User: ${user.email}, Password Hash: ${user.password}`);
  }
  process.exit(0);
}

checkUsers();
