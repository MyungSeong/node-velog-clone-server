import JWT from 'jsonwebtoken';

import sessConfig from '../config/SessionConfig';

const JSONWebTokenAuthorization = {
    createToken: (payload, expiresIn) => {
        return JWT.sign(payload, sessConfig.SESS_SECRET, { expiresIn });
    },
    verifyToken: (token) => {
        const decoded = JWT.verify(token, sessConfig.SESS_SECRET);

        if (decoded) return true;
        else return false;
    },
    decodeToken: (token) => {
        return JWT.verify(token, sessConfig.SESS_SECRET);
    },
};

export default JSONWebTokenAuthorization;
