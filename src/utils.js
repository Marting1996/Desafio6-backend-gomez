import { fileURLToPath } from "url"
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

import bcrypt from "bcrypt"
import  Jwt  from "jsonwebtoken"

const PRIVATE_KEY = "CoderKey"

export const createHash = (password => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
})

export const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password)
}
//generamos el token
export const generateToken = (user) => {
    const token = Jwt.sign( {user}, PRIVATE_KEY, {expiresIn: "24hs"})
    return token
}
//extraemos el token
export const authToken = (req, res, next) => {
    const authToken = req.headers.auth
    if(!authToken) {
        return res.status(401).send({
            error: "No estas autorizado"
        })
    }

    const token = authToken
    Jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
        if(error) return res.status(403).send({error: "No estas autorizado"})
        req.user = credentials.user
        next()
    })
}

export default __dirname


