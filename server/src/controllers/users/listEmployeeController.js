import generateErrorUtil from '../../utils/generateErrorUtil.js';
import selectEmployeeService from '../../services/users/selectEmployeeService.js';

const listEmployeeController = async (req, res, next) => {
    try {
        const isAdmin = req.userLogged.role;

        if (isAdmin !== 'admin') {
            generateErrorUtil(
                'Acceso denegado: Se requiere rol de Administrador',
                401
            );
        }

        const { job, active, city } = req.query;

        const users = await selectEmployeeService(job, active, city);

        if (!users.length) {
            generateErrorUtil(
                'No se ha encontrado resultados en la búsqueda',
                401
            );
        }
        res.send({
            status: 'ok',
            data: {
                users,
            },
        });
    } catch (error) {
        next(error);
    }
};

export default listEmployeeController;
