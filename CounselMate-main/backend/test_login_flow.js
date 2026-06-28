const mongoose = require("mongoose");
const User = require("./models/user.js");
const { signup, login } = require("./controllers/authcontrollers.js");
require("dotenv").config();

async function testFlow() {
  await mongoose.connect(process.env.ATLAS_URI);
  
  
  const reqSignup = { body: { username: "testuser", email: "test@example.com", password: "testpassword" } };
  const resSignup = {
    status: (code) => { console.log("Signup Status:", code); return resSignup; },
    json: (data) => console.log("Signup Response:", data)
  };
  
  
  await User.deleteOne({ email: "test@example.com" });
  
  console.log("--- Testing Signup ---");
  await signup(reqSignup, resSignup);
  
  const reqLogin = { body: { email: "test@example.com", password: "testpassword" } };
  const resLogin = {
    status: (code) => { console.log("Login Status:", code); return resLogin; },
    json: (data) => console.log("Login Response:", data),
    cookie: (name, value, options) => console.log(`Set Cookie: ${name}`)
  };
  
  console.log("--- Testing Login ---");
  await login(reqLogin, resLogin);
  
  process.exit(0);
}

testFlow();
