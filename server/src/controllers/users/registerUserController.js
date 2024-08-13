import randomstring from 'randomstring';

import generateErrorUtil from '../../utils/generateErrorUtil.js';
import insertUserService from '../../services/users/insertUserService.js';

const registerUserController = async (req, res, next) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      generateErrorUtil('Ni email, ni password, ni username pueden estar vacíos',400);
    }

    const registrationCode = randomstring.generate(30);

    await insertUserService(email, password, username, registrationCode);

    res.send({
      status: 'ok',
      message:
        'Usuario registrado correctamente. Revise su email para validar la cuenta',
    });
  } catch (error) {
    next(error);
  }
};

export default registerUserController;
