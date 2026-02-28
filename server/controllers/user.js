const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { z } = require("zod");

const User = require("../models/user");
const Goal = require("../models/goal");
const { Pillars } = require("../models/user");

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_me";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

const RegisterSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    timezone: z.string().min(1).optional(), // expect IANA like "Africa/Lagos"
    focusPillars: z.array(z.enum(Pillars)).optional(),
});

const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
});

function signToken(user) {
    return jwt.sign(
        { sub: user._id },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
    );
}

module.exports = {
    register: async (req, res) => {
        console.log(req.body)
        try {
            const { firstName, email, password } = req.body;

            if (!firstName || !email || !password) {
                return res.status(400).json({ message: "Missing required fields." });
            }

            const existing = await User.findOne({ email });
            if (existing) {
                return res.status(409).json({ message: "Email already registered." });
            }

            const passwordHash = await bcrypt.hash(password, 12);

            const user = await User.create({
                firstName,
                email,
                passwordHash,
            });

            const token = signToken(user);

            res.status(200).json({
                token,
                user: {
                    id: user._id,
                    firstName: user.firstName,
                    email: user.email,
                    tier: user.tier,
                },
            });
        } catch (err) {
            res.status(500).json({ message: "Server error" });
        }
    },
    login: async (req, res) => {
        try {
            // 1️⃣ Validate input
            const parsed = LoginSchema.safeParse(req.body);
            if (!parsed.success) {
                return res.status(400).json({ message: "Invalid email or password format." });
            }

            const { email, password } = parsed.data;

            // 2️⃣ Find user
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(401).json({ message: "Invalid credentials." });
            }

            // 3️⃣ Compare password
            const isMatch = await bcrypt.compare(password, user.passwordHash);
            if (!isMatch) {
                return res.status(401).json({ message: "Invalid credentials." });
            }

            // 4️⃣ Sign JWT
            const token = signToken(user);

            // 5️⃣ Return response (match register format)
            res.status(200).json({
                token,
                user: {
                    id: user._id,
                    firstName: user.firstName,
                    email: user.email,
                    tier: user.tier,
                    timezone: user.timezone,
                    focusPillars: user.focusPillars,
                },
            });

        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Server error" });
        }
    },
    updateUser: async (req, res) => {
        try {
            console.log(req.body);
            const userId = req.user.sub;

            // 1️⃣ Prepare user updates
            const userUpdates = {};
            if (req.body.timezone) userUpdates.timezone = req.body.timezone;
            if (req.body.focusPillars) {
                userUpdates.focusPillars = req.body.focusPillars; // enforce free tier limit
            }

            // 2️⃣ Update the user
            const user = await User.findByIdAndUpdate(userId, userUpdates, { new: true });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            let goal;
            if (req.body.goal) {
                // 3️⃣ Save or update goal
                const goalData = {
                    ...req.body.goal,
                    userId: user._id,
                };

                if (req.body.goal.id) {
                    // Update existing goal
                    goal = await Goal.findByIdAndUpdate(req.body.goal.id, goalData, { new: true });
                } else {
                    // Create new goal
                    goal = await Goal.create(goalData);
                }
            }

            // 4️⃣ Return user + goal (updated to match Flutter model)
            res.json({
                user: {
                    id: user._id,
                    firstName: user.firstName,
                    email: user.email,
                    tier: user.tier,
                    timezone: user.timezone,
                    focusPillars: req.body.focusPillars,
                },
                goal: goal
                    ? {
                        id: goal._id,
                        title: goal.title,
                        pillar: goal.pillar,
                        alarmId: goal.alarmId,
                        repeatType: goal.repeatType,
                        hour: goal.hour,
                        minute: goal.minute,
                        scheduledAt: goal.scheduledAt,
                        weekdays: goal.weekdays,
                        dayOfMonth: goal.dayOfMonth,
                        motivationStyle: goal.motivationStyle,
                        format: goal.format,
                        faithToggle: goal.faithToggle,
                        active: goal.active,
                        currentStreak: goal.currentStreak,
                        bestStreak: goal.bestStreak,
                        lastCompletedDateKey: goal.lastCompletedDateKey,
                        createdAt: goal.createdAt,
                        updatedAt: goal.updatedAt,
                    }
                    : null,
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Server error" });
        }
    }



};