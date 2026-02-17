const jwt = require("jsonwebtoken");

/**
 * Verifies JWT from Authorization header:
 * Authorization: Bearer <token>
 *
 * On success:
 *   req.user = decoded payload (e.g. { sub: userId, tier: "free", iat, exp })
 */
function authMiddleware(req, res, next) {
    try {
        console.log(req.headers)
        const header = req.headers.authorization;

        if (!header || !header.startsWith("Bearer ")) {
            return res.status(401).json({
                code: "NO_TOKEN",
                message: "Missing Authorization header (Bearer token).",
            });
        }
       console.log("passed")
        const token = header.split(" ")[1];
        const secret = process.env.JWT_SECRET || "dev_secret_change_me";

        const decoded = jwt.verify(token, secret);

        // Attach user info to request
        req.user = decoded;

        return next();
    } catch (err) {
        console.log(err)
        return res.status(401).json({
            code: "INVALID_TOKEN",
            message: "Invalid or expired token.",
        });
    }
}

module.exports = authMiddleware;
