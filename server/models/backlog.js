const mongoose = require('mongoose');

const issueTypeSchema = new mongoose.Schema({
  self: String,
  id: String,
  description: String,
  iconUrl: String,
  name: String,
  subtask: Boolean,
  avatarId: Number,
  entityId: String,
  hierarchyLevel: Number,
}, { _id: false });

const prioritySchema = new mongoose.Schema({
  self: String,
  iconUrl: String,
  name: String,
  id: String,
}, { _id: false });

const fieldsSchema = new mongoose.Schema({
  summary: { type: String, required: true },
  customfield_10016: { type: mongoose.Schema.Types.Mixed, default: null }, // Puede ser null o cualquier valor
  issuetype: { type: issueTypeSchema, required: true },
  description: { type: String, default: null },
  priority: { type: prioritySchema, required: true },
  updated: { type: String, required: true },
  labels: { type: [String], default: [] }
}, { _id: false });

const taskSchema = new mongoose.Schema({
  expand: String,
  id: { type: String, required: true },
  self: String,
  key: String,
  fields: { type: fieldsSchema, required: true }
}, { _id: false });

const backlogSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  uid: { type: String, required: true },
  tasks: { type: [taskSchema], default: [] }
});

const Backlog = mongoose.model('backlogs', backlogSchema);
module.exports = Backlog;