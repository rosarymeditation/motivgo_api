
const mongoose = require("mongoose");

const MotivationContentSchema = new mongoose.Schema({
    pillar: { type: String, index: true },
    style: { type: String, enum: ["gentle", "firm", "affirmations", "reflective", "faith"], index: true },
    faithOnly: { type: Boolean, default: false },

    text: String,
    audioUrl: String,

    active: { type: Boolean, default: true },
}, { timestamps: true });

MotivationContentSchema.index({ pillar: 1, style: 1, active: 1 });

const MotivationContent = mongoose.model("MotivationContent", MotivationContentSchema);

module.exports = MotivationContent;