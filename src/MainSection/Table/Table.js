import React, { useEffect, useState } from 'react';
import Action from './Action'; // Импортируем компонент Action

const Table = () => {
    const [logs, setLogs] = useState([]);
    const [selectedLog, setSelectedLog] = useState(null);
    const [showAction, setShowAction] = useState(false); // Состояние для управления отображением Action

    const fetchLogs = async () => {
        try {
            const response = await fetch('http://localhost:3000/logs/logs');
            const data = await response.json();
            setLogs(data);
        } catch (error) {
            console.error('Error fetching logs:', error);
        }
    };

    useEffect(() => {
        // Получаем логи при первом монтировании компонента
        fetchLogs();

        // Устанавливаем интервал для обновления логов каждые 5 секунд
        const intervalId = setInterval(() => {
            fetchLogs();
        }, 5000);

        // Очистка интервала при размонтировании компонента
        return () => clearInterval(intervalId);
    }, []);

    const handleActionClick = (log) => {
        setSelectedLog(log);
        setShowAction(true); // Показываем компонент Action
    };

    const closeAction = () => {
        setShowAction(false);
        setSelectedLog(null); // Сбрасываем выбранный лог
    };

    return (
        <section id="table-section" style={{ width: '100%' }}>
            <div style={{ width: '100%', height: '500px', background: 'rgba(0,0,0,0.18)', boxShadow: 'inset 0px 0px 20px rgba(3,0,128,0.69)', borderRadius: '6px', padding: '10px' }}>
                <div style={{ height: '100%', overflowY: 'auto' }}>
                <div style={{ padding: '5px' }}>
                    {logs.map((log) => (
                        <div key={log.sessionId} style={{ width: '100%', marginBottom: '20px', padding: '15px', borderRadius: '6px', background: 'rgba(0,0,0,0.2)' }}>
                            <div style={{ width: '100%', marginBottom: '5px' }}>
                                <span>OFFER:&nbsp;<span style={{ fontWeight: 'bold' }}>{log.offerName}</span></span>
                            </div>
                            <div style={{ width: '100%', marginBottom: '5px' }}>
                                <span>ID:&nbsp;<span style={{ fontWeight: 'bold' }}>{log.sessionId}</span></span>
                            </div>
                            <div style={{ width: '100%', marginBottom: '5px' }}>
                                <span>IP:&nbsp;<span style={{ fontWeight: 'bold' }}>{log.ip}</span></span>
                            </div>
                            <div style={{ width: '100%', marginBottom: '5px' }}>
                                <span>GEO:&nbsp;<span style={{ fontWeight: 'bold' }}>{log.geo}</span></span>
                            </div>
                            <div style={{ width: '100%', marginBottom: '10px' }}>
                                <span>Status:&nbsp;<span style={{ fontWeight: 'bold' }}>{log.status.toUpperCase()}</span></span>
                            </div>
                            {/* Условие для отображения кнопки Action */}
                            {log.status !== 'canceled' && log.status !== 'confirmed' && (
                                <button className="btn btn-primary" type="button" style={{ width: '100%' }} onClick={() => handleActionClick(log)}>Action</button>
                            )}
                        </div>
                    ))}
                </div>
                </div>
            </div>

            {/* Отображаем компонент Action, если выбран лог */}
            {showAction && <Action log={selectedLog} onClose={closeAction} />}
        </section>
    );
};

export default Table;