import { AuthContext } from '../../context/AuthContext';
import { useEffect, useState, useContext } from 'react';
import { fetchEmployeeAllServicesServices } from '../../services/serviceServices';
import { FaStar } from 'react-icons/fa';
import ShiftModal from './ShiftRecordComponent.jsx';
import toast from 'react-hot-toast';

const MyServices = () => {
    const { authToken } = useContext(AuthContext);

    const [data, setData] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedShiftRecordId, setSelectedShiftRecordId] = useState(null);

    useEffect(() => {
        const getServices = async () => {
            try {
                const data = await fetchEmployeeAllServicesServices(authToken);

                setData(data);
            } catch (error) {
                toast.error(error.message, {
                    id: 'error',
                });
            }
        };

        getServices();
    }, [authToken]);

    const openModal = (shiftRecordId) => {
        setSelectedShiftRecordId(shiftRecordId);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedShiftRecordId(null);
    };

    return (
        <>
            {
                <ul className='cards'>
                    {data?.map((item) => {
                        const clockIn = item.clockIn
                            ? new Date(item.clockIn).toLocaleString()
                            : null;
                        const clockOut = item.clockOut
                            ? new Date(item.clockOut).toLocaleString()
                            : null;
                        const date = new Date(
                            item.dateTime
                        ).toLocaleDateString();
                        const time = new Date(item.dateTime).toLocaleTimeString(
                            [],
                            {
                                hour: '2-digit',
                                minute: '2-digit',
                            }
                        );

                        return (
                            <li id={item.id} key={item.id}>
                                <h3>
                                    El {date} a las {time}
                                </h3>
                                <p>{item.comments}</p>
                                <p>
                                    {item.firstName} {item.lastName} (
                                    {item.phone})
                                </p>
                                <p className='font-extrabold'>
                                    En {item.address}, {item.city},{' '}
                                    {item.postCode}
                                </p>
                                <p>Horas: {item.hours}</p>
                                <p className='font-extrabold'>
                                    Precio: {item.totalPrice}€
                                </p>

                                {clockIn && <p>Entrada: {clockIn}</p>}
                                {clockOut && <p>Salida: {clockOut}</p>}
                                {(item.hoursWorked ||
                                    item.minutesWorked !== null) && (
                                    <p className='font-extrabold'>
                                        Total: {item.hoursWorked} Horas{' '}
                                        {item.minutesWorked} Minutos
                                    </p>
                                )}
                                {item.rating !== null ? (
                                    <div className='flex mt-2 mb-6'>
                                        {[...Array(5)].map((_, index) => (
                                            <FaStar
                                                key={index}
                                                size={30}
                                                color={
                                                    index + 1 <= item.rating
                                                        ? '#ffc107'
                                                        : '#e4e5e9'
                                                }
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    item.status === 'confirmed' && (
                                        <button
                                            onClick={() =>
                                                openModal(item.shiftRecordId)
                                            }
                                        >
                                            Fichar
                                        </button>
                                    )
                                )}
                            </li>
                        );
                    })}
                </ul>
            }
            <ShiftModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                shiftRecordId={selectedShiftRecordId}
            />
        </>
    );
};

export default MyServices;
