const mongoose = require("mongoose");

const Pillars = [
    "personalGrowth",
    "healthFitness",
    "learningCareer",
    "spiritualGrowth",
    "dailyLife",
    "businessMoney",
    "emotionalWellness",
];

const userSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true, trim: true },

        email: { type: String, required: true, unique: true, lowercase: true, trim: true },

        passwordHash: { type: String, required: true },

        tier: { type: String, enum: ["free", "premium"], default: "free" },

        timezone: { type: String, default: null }, // update later

        focusPillars: [{ type: String, enum: Pillars }], // update later

        onboardingCompleted: { type: Boolean, default: false },

        createdAt: { type: Date, default: Date.now },
    },
    { versionKey: false }
);

module.exports = mongoose.model("User", userSchema);
module.exports.Pillars = Pillars;