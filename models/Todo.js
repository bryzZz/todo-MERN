const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
    list: {type: Types.ObjectId, ref: 'TodoList'},
    text: {type: String, required: true}
});

module.exports = model('Todo', schema);