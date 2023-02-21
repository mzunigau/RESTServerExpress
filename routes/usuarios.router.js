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
const {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
} = require('../helpers/db-validators');

const router = Router();

router.get('/', usuariosGet);

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPut);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo', 'El correo no es valido').custom(emailExiste),
    check('password', 'Es obligatorio y mas de 6 letras').isLength({
        min: 6
    }),
    check('rol').custom(esRoleValido),
    // check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    validarCampos
], usuariosPost);

router.delete('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete);


module.exports = router;