import jwt from "jsonwebtoken";

const secretKey = "adfjuehbdjdkushdgsghueytiomsndhbdbgcbcgbgdgvd";

class JwtProvider {
    constructor(secretKey) {
        this.secretKey = secretKey;
    }

    createJwt(payload) {
        return jwt.sign(payload, this.secretKey, { expiresIn: "24h" });
    }

    getEmailFromJwt(token) {
        try {
            const decodedToken = jwt.verify(token, this.secretKey);
            return decodedToken.email;
        } catch (error) {
            throw new Error("Invalid token"); 
        }
    }

    verifyJwt(token) {
        try {
            return jwt.verify(token, this.secretKey);
        } catch (error) {
            throw new Error("Invalid token");
        }
    }
}


const jwtProvider = new JwtProvider(secretKey);

export default jwtProvider;