const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const UserSchema = new mongoose.Schema({
    firstName: {
      type: String,
      required: [true, "First name is required"],
      minlength: [2, "First name must be greater than 2 characters"],
      trim:true,

    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      minlength: [2, "Last name must be greater than 2 characters"],
      trim:true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique:[true, "email must be unique"],
      validate: {

        //val is what is comming from the email field(user submitted value)
        validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
        message: "Please enter a valid email"

      }
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be 8 characters or longer"]
    },

    role:{
        type:Number,
        default:0
    },

    cart:{
        type:Array,
        default:[]
    }

  }, {timestamps: true});

  // create a "virtual" field that can be compared /validated, but it does not get added 
  // to the database when it is saved. 
  //this will create a getter and setter methods for the confirmPassword field

  UserSchema.virtual("confirmPassword")
  .get(()=> this._confirmPassword ) // is used during the comparing process
  .set( value =>this._confirmPassword = value)

  UserSchema.pre("validate", function(next){
    if(this.password !== this.confirmPassword){
      this.invalidate("confirmPassword", "Password must match confirm password")
    }
    next(); // successfully compared - move on to the next step in the validation process
  });





  // We must hash/encrypth the password prior to saving it to the database
  // we replace the original password value with the hashed/ encrypted password

  UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
      .then(hash => {
        this.password = hash;
        next();
      });
  });



  //this will create a new collection in our DB called "users"
  // it will lowecase our string and make it plural "automatically" for us.
const User = mongoose.model('User', UserSchema);
module.exports = User;