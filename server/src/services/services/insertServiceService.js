import getPool from '../../db/getPool.js';
import { v4 as uuid } from 'uuid';

const insertServiceService = async (
    clientId,
    typeOfServiceId,
    startTime,
    endTime,
    startDate,
    endDate,
    description,
    serviceAddress,
    numberOfEmployee,
    city,
    postCode
) => {
    const pool = await getPool();

    await pool.query(
        `
        INSERT INTO addresses(id, serviceAddress, city, postCode) VALUES (?,?,?,?)
        `,
        [uuid(), serviceAddress, city, postCode]
    );

    const [addressId] = await pool.query(
        `
        SELECT id FROM addresses WHERE address = ?
        `,
        [serviceAddress]
    );

    const id = uuid();

    await pool.query(
        `
        INSERT INTO services(id, startDate, endDate, startTime, endTime, description, numberOfEmployee, clientId, addressId, typeOfServicesId) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
            id,
            startDate,
            endDate,
            startTime,
            endTime,
            description,
            numberOfEmployee,
            clientId,
            addressId[0].id,
            typeOfServiceId,
        ]
    );

    const [data] = await pool.query(
        `
        SELECT t.*, s.*
        FROM typeOfServices t
        INNER JOIN services s
        ON t.id = s.typeOfServicesId
        WHERE s.id = ?
        `,
        [id]
    );

    return data;
};

export default insertServiceService;
