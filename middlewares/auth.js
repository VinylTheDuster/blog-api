export default function Auth(req, res, next) {
    const authHeader = req.headers["authorization"];
    const fruitHeader = req.headers["x-fruit"];

    if(!authHeader || !authHeader.startsWith("Basic ")) {
        return res.status(401).json({ error: "Missing authorization header for Auth" })
    }

    const [user, pass] = Buffer.from(
        authHeader.replace("Basic ", ""), 
        "base64"
    ).toString().split(":");

    if (
        user === process.env.API_INTERFACE_USERNAME &&
        pass === process.env.API_INTERFACE_PASSWORD &&
        fruitHeader === process.env.API_INTERFACE_FRUIT
    ) {
        return next();
    }

    return res.status(401).json({ error: "Access denied" });
}