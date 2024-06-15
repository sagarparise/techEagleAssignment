
const mongoose = require('mongoose')

// const contentSchema = new mongoose.Schema({
//   text:{
//     type: String,
//     required: true,
//   }
// })

const todoSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
 todos:[
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Text',
    required: true,
  }
 ]
})
const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;