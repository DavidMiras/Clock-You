import selectServiceByEmployeeIdService from '../../services/services/selectServiceByEmployeeIdService.js';

const listEmployeeServiceController = async (req, res, next) => {
    try {
        const employeeId = req.userLogged.id;
        const { status } = req.query;

        const data = await selectServiceByEmployeeIdService(status, employeeId);

        res.send({
            status: 'ok',
            data,
        });
    } catch (error) {
        next(error);
    }
};

export default listEmployeeServiceController;
