import User from "../models/user.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export async function createUser(req, res) {

    try {

        const passwordHash = bcrypt.hashSync(req.body.password, 10)

        const newUser = new User({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: passwordHash
        })

        await newUser.save()

        res.json({
            message: "User Created Successfully"
        })
    } catch (err) {
        res.json({
            message: "Error creating user"
        })
    }
}

export async function loginUser(req, res) {

    try {
        const user = await User.findOne({
            email: req.body.email
        })

        console.log(user)

        if (user == null) {
            res.status(404).json({
                message: "User not found"
            })
        } else {
            const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password)

            if (isPasswordCorrect) {

                const payLoad = {
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    isAdmin: user.isAdmin,
                    isBlocked: user.isBlocked,
                    isEmailVerified: user.isEmailVerified,
                    image: user.image
                }

                const token = jwt.sign(payLoad, "I-computerS10Batch", { expiresIn: "48h" })
                // console.log("Token : "+token)
                res.json({
                    "Token": token
                })


            } else {
                res.status(401).json({
                    message: "Invalid password"
                })
            }

        }

    } catch (err) {
        res.status(500).json({
            message: err
        })
    }

}

export function isAdmin(req) {
    if (req.user == null) {
        return false
    }

    if(req.user.isAdmin){
        return true
    }else{
        return false
    }
}