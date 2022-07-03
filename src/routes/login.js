import { Router } from 'express'
import User from '../models/User'
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/v1/signin', async (req, res) => {

    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (!user) {
        res.send({'Respuesta': false, 'message': "Su correo es incorrecto o aun no existe"});
    } else {
        const match = await user.matchPassword(password);
        if (match) {
            const dataToken = { email: `${email}` }
            const token = jwt.sign(dataToken, process.env.KEY_TOKEN_AUTH, { expiresIn: '5m' })
            res.send({'Respuesta': true, 'message': "Inicio exitoso", "token": token});
        } else {
            res.send({'Respuesta': false, 'message': "Puede que su contraseña sea incorrecta"});
        }
    }

});

export default router;