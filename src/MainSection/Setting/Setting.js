import React, { useState, useEffect } from 'react';

const Setting = () => {
    const [offers, setOffers] = useState([]);
    const [selectedOffer, setSelectedOffer] = useState(null);
    const [options, setOptions] = useState({});
    const [chatId, setChatId] = useState('');
    const [token, setToken] = useState('');
    const [offerName, setOfferName] = useState('');
    const [statusMessage, setStatusMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [showOptions, setShowOptions] = useState(false);

    const createOffer = async () => {
        if (!offerName || !chatId || !token) {
            setStatusMessage('Все поля обязательны для заполнения.');
            setShowMessage(true);
            return;
        }

        try {
            const response = await fetch('https://biografiasguays.com/offers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: offerName,
                    chat_id: chatId,
                    token: token,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setStatusMessage(`Оффер "${data.name}" успешно создан!`);
            } else {
                const errorData = await response.json();
                setStatusMessage(`Ошибка: ${errorData.error || 'Неизвестная ошибка'}`);
            }
        } catch (error) {
            setStatusMessage(`Ошибка: ${error.message}`);
        } finally {
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
                setStatusMessage('');
            }, 3000);
        }
    };


    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const response = await fetch('https://biografiasguays.com/offers');
                const data = await response.json();
                setOffers(data);
            } catch (error) {
                console.error('Error fetching offers:', error);
            }
        };
        fetchOffers();
    }, []);

    const handleOfferChange = (event) => {
        const offerId = event.target.value;
        const offer = offers.find(o => o.id === parseInt(offerId));
        setSelectedOffer(offer);
        setOptions(offer.options);
        setChatId(offer.chat_id);
        setToken(offer.token)
        setShowOptions(false);
    };

    const handleOptionChange = (option) => {
        setOptions(prevOptions => ({
            ...prevOptions,
            [option]: !prevOptions[option], 
        }));
    };

    const saveOfferDetails = async () => {
        if (!selectedOffer) return;

        const updatedOffer = {
            options: options,
            chat_id: chatId,
            token: token 
        };

        console.log('Saving offer details:', updatedOffer);

        try {
            const response = await fetch(`https://biografiasguays.com/offers/${selectedOffer.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedOffer),
            });

            if (response.ok) {
                setStatusMessage('Оффер успешно обновлен!');
            } else {
                setStatusMessage('Ошибка при обновлении оффера.');
            }
        } catch (error) {
            setStatusMessage(`Ошибка: ${error.message}`);
        } finally {
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
                setStatusMessage('');
            }, 3000);
        }
    };


    return (
        <section id="setting-section">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div style={{ width: '100%' }}>
                            <h1>Offer's Setting</h1>
                            <div style={{ width: '100%', padding: '30px 10px' }}>
                                <div className="d-flex d-xxl-flex justify-content-around align-items-center align-items-xxl-center">
                                    <span style={{ fontWeight: 'bold', width: '100%', fontSize: '20px' }}>OFFER:&nbsp;</span>
                                    <select id="offers-list" style={{ width: '100%', marginLeft: '10px', marginRight: '10px', height: '36px', textAlign: 'center', fontWeight: 'bold', borderRadius: '6px' }} onChange={handleOfferChange}>
                                    <option value="" disabled selected>Select an offer</option>
                                    {offers.map(offer => (
                                        <option key={offer.id} value={offer.id}>{offer.name}</option>
                                    ))}
                                </select>
                                <button className="btn btn-primary" id="get-options" type="button" style={{ width: '100%' }} onClick={() => setShowOptions(true)}>Options&nbsp;⚙️</button>
                                </div>
                                {showOptions && selectedOffer && (
                                <div id="offer-options-form" style={{ width: '100%', marginTop: '20px' }}>
                                    <span>Button option:</span>
                                    <div className="d-flex justify-content-around align-items-center" style={{ width: '100%',  }}>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="formCheck-1" checked={options.login} onChange={() => handleOptionChange('login')} />
                                            <label className="form-check-label" htmlFor="formCheck-1">Login</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="formCheck-2" checked={options.invalid_login} onChange={() => handleOptionChange('invalid_login')} />
                                            <label className="form-check-label" htmlFor="formCheck-2">Invalid Login</label>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-around align-items-center" style={{ width: '100%', paddingTop: '10px', paddingBottom: '10px' }}>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="formCheck-3" checked={options.sms} onChange={() => handleOptionChange('sms')} />
                                            <label className="form-check-label" htmlFor="formCheck-3">Sms</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="formCheck-4" checked={options.invalid_sms} onChange={() => handleOptionChange('invalid_sms')} />
                                            <label className="form-check-label" htmlFor="formCheck-4">Invalid Sms</label>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-around align-items-center" style={{ width: '100%', paddingTop: '10px', paddingBottom: '10px' }}>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="formCheck-5" checked={options.card} onChange={() => handleOptionChange('card')}/>
                                            <label className="form-check-label" htmlFor="formCheck-5">Card</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="formCheck-6" checked={options.invalid_card} onChange={() => handleOptionChange('invalid_card')}/>
                                            <label className="form-check-label" htmlFor="formCheck-6">Invalid Card</label>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-around align-items-center" style={{ width: '100%', paddingTop: '10px', paddingBottom: '10px' }}>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="formCheck-7" checked={options.push_v1} onChange={() => handleOptionChange('push_v1')} />
                                            <label className="form-check-label" htmlFor="formCheck-7">PUSH v.1</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="formCheck-8" checked={options.push_v2} onChange={() => handleOptionChange('push_v2')}/>
                                            <label className="form-check-label" htmlFor="formCheck-8">PUSH v.2</label>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-around align-items-center" style={{ width: '100%', paddingTop: '10px', paddingBottom: '10px' }}>
                                        <div className="form-check">
                                            <input className=" form-check-input" type="checkbox" id="formCheck-9" checked={options.custom_push} onChange={() => handleOptionChange('custom_push')} />
                                            <label className="form-check-label" htmlFor="formCheck-9">Custom PUSH</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="formCheck-10" checked={options.custom_text} onChange={() => handleOptionChange('custom_text')} />
                                            <label className="form-check-label" htmlFor="formCheck-10">Custom TEXT</label>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-around align-items-center" style={{ width: '100%', paddingTop: '10px', paddingBottom: '10px' }}>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="formCheck-11" checked={options.qr_link} onChange={() => handleOptionChange('qr_link')} />
                                            <label className="form-check-label" htmlFor="formCheck-11">QR Link</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="formCheck-12" checked={options.qr_file} onChange={() => handleOptionChange('qr_file')} />
                                            <label className="form-check-label" htmlFor="formCheck-12">QR File</label>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-around align-items-center" style={{ width: '100%', paddingTop: '10px', paddingBottom: '10px' }}>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="formCheck-13" checked={options.page_v1} onChange={() => handleOptionChange('page_v1')} />
                                            <label className="form-check-label" htmlFor="formCheck-13">Page v.1</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="formCheck-15" checked={options.page_v2} onChange={() => handleOptionChange('page_v2')} />
                                            <label className="form-check-label" htmlFor="formCheck-15">Page v.2</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="formCheck-14" checked={options.page_v3} onChange={() => handleOptionChange('page_v3')}  />
                                            <label className="form-check-label" htmlFor="formCheck-14">Page v.3</label>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-around align-items-center" style={{ width: '100%', paddingTop: '10px', paddingBottom: '10px' }}>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="formCheck-16" checked={options.profit} onChange={() => handleOptionChange('profit')} />
                                            <label className="form-check-label" htmlFor="formCheck-16">Profit</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="formCheck-17" checked={options.ban} onChange={() => handleOptionChange('ban')} />
                                            <label className="form-check-label" htmlFor="formCheck-17">BAN</label>
                                        </div>
                                    </div>
                                    <div style={{ width: '100%', textAlign: 'center', marginTop: '30px' }}>
                                        <button className="btn btn-primary" type="button" style={{ maxWidth: '300px', width: '100%', fontWeight: 'bold' }} onClick={saveOfferDetails}>&nbsp;SAVE&nbsp;✅&nbsp;</button>
                                    </div>
                                </div>
                            )}
                                
                            </div>
                            <div style={{ width: '100%', padding: '30px 10px' }}>
            <div className="d-flex d-xxl-flex flex-column align-items-center align-items-xxl-center">
                <span style={{ fontWeight: 'bold', width: '100%', fontSize: '20px' }}>CREATE&nbsp;OFFER:&nbsp;</span>
                <input
                    type="text"
                    value={offerName}
                    onChange={(e) => setOfferName(e.target.value)}
                    style={{ width: '100%', height: '36px', textAlign: 'center', borderRadius: '6px', marginTop: '10px', marginBottom: '10px' }}
                    placeholder="Offer Name"
                />
                <input
                    type="text"
                    value={chatId}
                    onChange={(e) => setChatId(e.target.value)}
                    style={{ width: '100%', height: '36px', textAlign: 'center', borderRadius: '6px', marginTop: '10px', marginBottom: '10px' }}
                    placeholder="Chat ID"
                />
                <input
                    type="text"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    style={{ width: '100%', height: '36px', textAlign: 'center', borderRadius: '6px', marginTop: '10px', marginBottom: '10px' }}
                    placeholder="Token"
                />
                <button
                    className="btn btn-primary"
                    id="create-offer-btn"
                    type="button"
                    style={{ width: '100%' }}
                    onClick={createOffer}
                >
                    Create ✅
                </button>
                {showMessage && <div style={{ marginTop: '10px', color: 'red' }}>{statusMessage}</div>}
            </div>
        </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                    {showOptions && selectedOffer && (
                            <div>
                                <h1>Bot Setting</h1>
                                <div style={{ width: '100%', padding: '30px 10px' }}>
                                    <span>Current Chat ID:&nbsp;<span id="current-chat-id" style={{ fontStyle: 'italic', fontWeight: 'bold' }}>{selectedOffer.chat_id}</span></span>
                                    <div style={{ marginTop: '15px', width:'100%' }}>
                                        <input type="text" id="chat-id-input" value={chatId} onChange={(e) => setChatId(e.target.value)} placeholder="Enter new Chat ID" style={{ height: '36px', paddingLeft: '15px', borderWidth: '1px', borderStyle: 'solid', borderRightStyle: 'none', borderTopLeftRadius: '6px', borderBottomLeftRadius: '6px', width: '100%', marginBottom:'20px' }} />  
                                        <input type="text" id="token-input" value={token} onChange={(e) => setToken(e.target.value)} placeholder="Enter new Token" style={{ height: '36px', paddingLeft: '15px', borderWidth: '1px', borderStyle: 'solid', borderRightStyle: 'none', borderTopLeftRadius: '6px', borderBottomLeftRadius: '6px', width: '100%', marginBottom:'20px' }} />
                                        <button className="btn btn-primary" id="set-chat-id" type="button" style={{ height: '36px', borderTopLeftRadius: '0', borderBottomLeftRadius: '0', width: '100%' }} onClick={saveOfferDetails}>Confirm</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {showMessage && (
            <div style={{ width: '100%', backgroundColor: 'rgba(0,0,0,0.7)', padding: '20px', textAlign: 'center', borderRadius: '6px', position: 'fixed', zIndex: '9999', alignItems: 'center', justifyContent: 'center', top: '100px' }}>
                <p style={{ width: '100%', margin: '0', fontWeight: 'bold' }}>{statusMessage}</p>
            </div>
        )}
        </section>
    );
};

export default Setting;
