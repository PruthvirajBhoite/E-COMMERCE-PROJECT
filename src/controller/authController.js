import AuthService from "../service/authService.js";

export const sendLoginOtp = async (req, res) => {
    try {
        const email = req.body.email;
        await AuthService.sendLoginOtp(email);
        res.status(200).json({ message: "otp sent successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const createUser = async (req, res) => {
    try {
        const jwt = await AuthService.createUser(req.body);

        res.status(200).json({
            jwt,
            message: "User created successfully",
            role: "CUSTOMER"
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const signin = async (req, res) => {
    try {
        const jwt = await AuthService.signin(req.body);

        res.status(200).json({ jwt });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};