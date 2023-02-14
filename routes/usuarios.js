const {
    Router
} = require('express');

const {
    check
} = require('express-validator');

const {
    validarCampos
} = require('../middlewares/validar-campos');


const {
    usuariosGet,
    usuariosPut,
    usuariosDelete,
    usuariosPost
} = require('../controllers/usuarios.controller');

const router = Router();

router.get('/', usuariosGet);

router.put('/:id', usuariosPut);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('correo', 'El correo no es valido').isEmail(),
    check('password', 'Es obligatorio y mas de 6 letras').isLength({
        min: 6
    }),
    check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    validarCampos
], usuariosPost);

router.delete('/', usuariosDelete);


module.exports = router;