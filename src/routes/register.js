import { Router } from 'express'
import User from '../models/User'
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/v1/signup', async (req, res) => {

    const { name, email, password1, password2, checkbox } = req.body
    const emailUser = await User.findOne({ email: email })

    if (emailUser) {
        res.send({ 'Respuesta': false, 'message': "El usuario ya existe" });
    }
    else if (name.match(/<script>/gi) || email.match(/<script>/gi) || password1.match(/<script>/gi) || password2.match(/<script>/gi)) {
        res.send({ 'Respuesta': false, 'message': "Error de consulta" });
    }
    else if (name.search(/^[a-zA-Z\s]+$/)) {
        res.send({ 'Respuesta': false, 'message': "Su nombre no debe contener numeros o caracteres especiales, solo se permiten letras (a-z)", 'type': "name" });
    }
    else if (email.search(/^[a-zA-Z0-9_.+-\ñ]+@[a-zA-Z]+\.[a-zA-Z.]+$/)) {
        res.send({ 'Respuesta': false, 'message': "Es necesario que su correo contenda un '@' y no cuente con caracteres especiales", 'type': "email" });
    }
    else if (password1.search(/^.{8,12}$/)) {
        res.send({ 'Respuesta': false, 'message': "La contraseña deber tener minimo 8 caracteres y maximo 12, prueba con una combinación de letras y números", 'type': "password1" });
    }
    else if (password1 !== password2) {
        res.send({ 'Respuesta': false, 'message': "Alguna de sus contraseñas no coinciden", 'type': "password2" });
    }
    else if (checkbox !== true) {
        res.send({ 'Respuesta': false, 'message': "Acepta los terminos y condiciones", 'type': "flexSwitch" });
    }
    else if (password1 === password2) {
        try {
            const newUser = new User({ name, email, password: password1, checkbox});
            newUser.password = await newUser.encrytPassword(password1)  
            await newUser.save()

            const dataToken = { email: `${email}` }
            const token = jwt.sign(dataToken, process.env.KEY_TOKEN_AUTH, { expiresIn: "120ms" })

            res.send({ 'Respuesta': true, 'message': "Datos correctos", 'token': token });

        } catch (error) {

            res.send({ 'Respuesta': false, 'message': "Hay un error en la solicitud"});

        }
    }

});


export default router;