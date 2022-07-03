import { Router } from 'express'
import User from '../models/User'
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/v1/forgetPassword', async (req, res) => {

    const { email } = req.body
    const user = await User.findOne({ email })
    console.log(email)
    if (!user) {
        res.send({'Respuesta': false, 'message': "Su correo es incorrecto o aun no existe", 'type': "email"});
    } else {
        res.send({'Respuesta': true, 'message': "Cambiando contraseña"});
    }
});

export default router;