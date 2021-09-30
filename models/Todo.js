const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
    list: {type: Types.ObjectId, ref: 'TodoList'},
    text: {type: String, required: true},
    starred: { type: Boolean, default: false },
    complited: { type: Boolean, default: false }
});

module.exports = model('Todo', schema);