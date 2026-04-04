import jwtProvider from "../util/jwtProvider.js";
import userService from "../service/authService.js";

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer")) {
            return res.status(401).json({
                message: "Invalid token, authorization failed."
            });
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "Invalid token, authorization failed."
            });
        }

        const email = jwtProvider.getEmailFromJwt(token);

        const user = await userService.findUserByEmail(email); // ✅ fixed

        req.user = user;

        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default authMiddleware;