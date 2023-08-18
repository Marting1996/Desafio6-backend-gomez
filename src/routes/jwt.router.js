import { Router } from "express";
import { generateToken, authToken } from "../utils.js";

const userDB = []
const jwtRouter = Router()

jwtRouter.post ("/register", (req, res) => {
    const user = req.body

    if( userDB.find(u => u.email === user.email)) {
        return res.status(400).send("El usuario ya existe")
    }
    userDB.push(user)
    const access_token = generateToken(user)
    res.send({status: "success", access_token})
})

jwtRouter.get("/current", authToken, (req,res) => {
    res.send ({status: "success", payload: req.user })
})

export default jwtRouter
