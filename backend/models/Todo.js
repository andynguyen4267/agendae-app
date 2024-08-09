const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    userId: String,
    task: String,
    completed: Boolean
});

const TodoModel = mongoose.model("todos", TodoSchema);
module.exports = TodoModel;

