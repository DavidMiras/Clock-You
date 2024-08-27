import bcrypt from 'bcrypt';
import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';
import selectUserByEmailService from './selectUserByEmailService.js';

const updateUserPasswordService = async (
    email,
    recoverPasswordCode,
    newPassword
) => {
    const pool = await getPool();

    const user = await selectUserByEmailService(email);

    if (!user || user.recoverPasswordCode !== recoverPasswordCode)
        generateErrorUtil('Email o código de recuperación incorrecto', 409);

    const hashPassword = await bcrypt.hash(newPassword, 10);

    await pool.query(
        `
        UPDATE users
        SET password=?, recoverPasswordCode=null
        WHERE recoverPasswordCode=?
        `,
        [hashPassword, recoverPasswordCode]
    );
};

export default updateUserPasswordService;
