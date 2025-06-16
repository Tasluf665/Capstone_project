const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: true,
        trim: true,
    },
    jiraProject: {
        id: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        key: {
            type: String,
            required: true,
        },
    },
    // userId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User', // Assuming you have a User model for authentication
    //     required: true,
    // },
    sustainabilityBacklog: {
        type: [
            {
                id: {
                    type: String,
                    required: true,
                },
                key: {
                    type: String,
                    required: true,
                },
                self: {
                    type: String,
                    default: "",
                },
                fields: {
                    type: Object,
                    default: {},
                },
            },
        ],
        default: [],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Project', projectSchema);
