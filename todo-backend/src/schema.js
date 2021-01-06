const { Schema } = require('mongoose');

const todo = new Schema({
    task: Schema.Types.String,
    done:Boolean,
    creationDate:Schema.Types.Date
});

exports.todo = todo;

