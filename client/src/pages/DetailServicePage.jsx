import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { fetchDetailServiceServices } from '../services/serviceServices.js';
import ListEmployeeController from '../components/AdminDashboard/Services/ListEmployeeController.jsx';
import toast from 'react-hot-toast';

const DetailServicePage = () => {
    const { serviceId } = useParams();
    const { authToken } = useContext(AuthContext);

    const [data, setData] = useState([]);

    useEffect(() => {
        const DetailService = async () => {
            try {
                const data = await fetchDetailServiceServices(
                    serviceId,
                    authToken
                );

                setData(data.data);
            } catch (error) {
                toast.error(error.message);
            }
        };
        DetailService();
    }, [serviceId, authToken]);

    const time = new Date(data.dateTime).toLocaleTimeString();
    const date = new Date(data.dateTime).toLocaleDateString();

    return (
        <>
            <form className='form-filters mx-auto'>
                <fieldset>
                    <h2 className='mt-4'>
                        {data.type} en {data.province}
                    </h2>
                    <p className='font-extrabold'>Estado: {data.status}</p>
                    <p>{data.comments}</p>
                    <p>Horas Contratadas: {data.hours}</p>
                    <p>Total: {data.totalPrice}€</p>
                    <p className='font-extrabold'>
                        Solicitado el {date} a las {time}
                    </p>
                    <p>
                        En {data.address}, {data.postCode}, {data.city}
                    </p>
                    <p className='font-extrabold'>{data.email}</p>
                    <p>
                        {data.firstName} {data.lastName}
                    </p>
                    <p>{data.phone}</p>
                </fieldset>
            </form>
            <ListEmployeeController serviceId={serviceId} />
        </>
    );
};

export default DetailServicePage;
