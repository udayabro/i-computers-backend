import jwt from "jsonwebtoken"

export default function authenticateUser(req, res, next) {
    const header = req.header("Authorization")
    if (header != null) {

        const token = header.replace("Bearer ", "")
        // console.log(token)
        jwt.verify(token, "I-computerS10Batch", (error, decoded) => {
            if (decoded == null) {
                res.json({ "message": "Invalid token, please loging again" })
            } else {
                req.user = decoded
                next()
            }
        })

    } else {

        next()

    }

}