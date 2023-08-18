const mongoose = require("mongoose")
const bcrypt = require("bcrypt");
const { isEmail, contains } = require("validator");
const filter = require("../util/filterBad");


const userSchema = new mongoose.Schema( {
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: [6, "Must be at least 6 characters long"],
    maxlength: [30, "Must be no more than 30 characters long"],
    validate: {
      validator: (val) => !contains(val, " "),
      message: "Must contain no spaces",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [isEmail, "Must be valid email address"],
  },
  password: {
    type: String,
    required: true,
    minLength: [8, "Must be at least 8 characters long"],
  },
  image : {
    type : String
  },
  biography: {
    type: String,
    default: "",
    maxLength: [250, "Must be at most 250 characters long"],
  },

},
{ timestamps: true });
  
  userSchema.pre("save", async function (next) {
    if (filter.isProfane(this.username)) {
      throw new Error("Username cannot contain profanity");
    }

    this.password = await bcrypt.hash(this.password, 12);
    next();
  });
  
  module.exports = mongoose.model("User", userSchema);