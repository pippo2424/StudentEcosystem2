const mongoose = require("mongoose");
const reviewSchema = mongoose.Schema(
    {
   
      rating: { type: Number, required: true },
      comment: { type: String, required: true },
      user: {
       type: mongoose.Schema.Types.ObjectId,
       required: true,
       ref: 'User',
             },
      ufname: { type: String },
     },
    {
      timestamps: true,
    }
  )

const teacherSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    hash_password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: "teacher",
    },
    phoneNo: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
    },
    subject: {
      type: String,
    },
    teacherId: {
      type: String,
      required: true,
    },
    attendance: {
      type: Number,
      required: true,
      default: 0,
    },
    bio: {
        type: String,
        required: true,
    },
    reviews: [reviewSchema],
  },
  { timestamps: true }
);

teacherSchema.methods = {
  authenticate: async function (password) {
    return await bcrypt.compare(password, this.hash_password);
  },
};

module.exports = mongoose.model("Teacher", teacherSchema);