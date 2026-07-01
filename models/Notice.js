const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema({

  title: String,

  date: String,

  link: {
    type: String,
    unique: true
  },

  publishedBy: String,

  content: String,

  summary: String,

  category: String,

  priority: String,

  actionItems: [String],

  importantDates: [
    {
      date: String,
      description: String
    }
  ],

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports =
  mongoose.model(
    "Notice",
    noticeSchema
  );