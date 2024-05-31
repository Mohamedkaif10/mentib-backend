
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        console.log(token);
        const verifyUrl = `https://oauth2.googleapis.com/tokeninfo?access_token=${token}`;
        fetch(verifyUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            return response.json();
        }).then(data => {
            console.log(data);
            const isVerified = data.email_verified;
            console.log("isVerified", isVerified);
            data.email_verified === 'true' ? next() : res.status(401).json({
                message: "unauthorized user"
            });
        })
    } catch (error) {
        return res.status(401).json({
            message: "Auth failed"
        });
    }
}