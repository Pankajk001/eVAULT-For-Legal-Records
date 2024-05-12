// Document Model Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const documentSchema = new Schema({
    documentId: {
        type: String,
        required: true,
        unique: true
    },
    tokenId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    viewPermissions: {
        type: [String],
        required: true
    },
    modifypermissions: {
        type: [String],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Document = mongoose.models.documents || mongoose.model('documents', documentSchema);
export default Document;
