const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  titleHindi: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  descriptionHindi: {
    type: String,
    required: true
  },
  lessons: [{
    title: String,
    titleHindi: String,
    content: String,
    contentHindi: String,
    videoUrl: String,
    duration: Number
  }],
  category: {
    type: String,
    enum: ['fundamental-rights', 'dpsp', 'women-safety', 'anti-corruption'],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Course', CourseSchema);
