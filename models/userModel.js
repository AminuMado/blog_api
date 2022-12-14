const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Static Signup Method
userSchema.statics.signup = async function (username, email, password) {
  // validation
  if (!username || !email || !password) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error(
      "Your password must be at least 8 characters long, contain at least one number and have a mixture of uppercase and lowercase letters."
    );
  }

  const emailExists = await this.findOne({ email });

  if (emailExists) {
    throw Error("Email already in use");
  }

  // Generate a salt and hash the password
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);

  // Create the user with the username email and hashed password
  const user = await this.create({ username, email, password: hash });
  return user;
};
// static Login Method
userSchema.statics.login = async function (email, password) {
  // Check if email or password fields are empty
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  // Find the user associated with email in the db
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect Email");
  }

  // Compare entered password with password in the db
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect Password");
  }

  return user;
};
// Create a model
const User = mongoose.model("User", userSchema);

// Export model
module.exports = User;
