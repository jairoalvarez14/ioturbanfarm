import mongoose from "mongoose";

const tempSchema = new mongoose.Schema({
    temperature: {
        type: Number,
        required: true
    },
    humidity: {
        type: Number,
        required: true
    },
    feelsLike: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

export const TempData = mongoose.model('TempData', tempSchema);
