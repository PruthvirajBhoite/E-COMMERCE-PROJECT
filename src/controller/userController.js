const getUserProfileByJwt = async (req, res) => {
    try {
        const user = req.user; // no need await
        return res.status(200).json(user);
    } catch (err) {
        handleError(err, res); // fixed name
    }
};

const handleError = (err, res) => {
    if (err instanceof Error) {
        return res.status(404).json({ message: err.message });
    }
    return res.status(500).json({ message: "Internal Server Error" });
};

export default getUserProfileByJwt; // default export