import React, { useState } from 'react';
import { ArrowDown, DollarSign, CreditCard, Send as SendIcon, Globe, MapPin } from 'lucide-react';

const Transfer = () => {
    const [transferType, setTransferType] = useState('international'); // 'domestic' or 'international'
    const [amount, setAmount] = useState('');
    // const [recipient, setRecipient] = useState({ name: '', bank: '', account: '' });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    // Mock exchange rate
    const RATE = 165.5; // 1 JPY = 165.5 VND

    const handleTransfer = (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
            // Reset after 3s
            setTimeout(() => setSuccess(false), 3000);
        }, 2000);
    };

    if (success) {
        return (
            <div className="page-container" style={{ alignItems: 'center', justifyContent: 'center' }}>
                <div className="glass-panel" style={{ padding: '60px', textAlign: 'center', maxWidth: '500px' }}>
                    <div style={{
                        width: '80px', height: '80px', background: 'rgba(16, 185, 129, 0.2)',
                        color: 'var(--success)', borderRadius: '50%', margin: '0 auto 24px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <SendIcon size={40} />
                    </div>
                    <h2 style={{ fontSize: '28px', marginBottom: '16px' }}>Transfer Successful!</h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>
                        Your money is on its way. You earned <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>50 Points</span>!
                    </p>
                    <button onClick={() => setSuccess(false)} className="primary-btn">
                        Make Another Transfer
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="page-container">
            <h1 style={{ fontSize: '28px', marginBottom: '24px' }}>Send Money</h1>

            {/* Tab Navigation */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                <button
                    onClick={() => setTransferType('international')}
                    className="glass-panel"
                    style={{
                        flex: 1,
                        padding: '16px 24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '12px',
                        background: transferType === 'international'
                            ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(236, 72, 153, 0.3))'
                            : 'rgba(30, 41, 59, 0.4)',
                        border: transferType === 'international' ? '2px solid var(--primary)' : '1px solid var(--glass-border)',
                        fontWeight: transferType === 'international' ? '600' : '400',
                        transition: 'all 0.3s'
                    }}
                >
                    <Globe size={20} />
                    <span>Chuyển tiền quốc tế</span>
                </button>

                <button
                    onClick={() => setTransferType('domestic')}
                    className="glass-panel"
                    style={{
                        flex: 1,
                        padding: '16px 24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '12px',
                        background: transferType === 'domestic'
                            ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(236, 72, 153, 0.3))'
                            : 'rgba(30, 41, 59, 0.4)',
                        border: transferType === 'domestic' ? '2px solid var(--primary)' : '1px solid var(--glass-border)',
                        fontWeight: transferType === 'domestic' ? '600' : '400',
                        transition: 'all 0.3s'
                    }}
                >
                    <MapPin size={20} />
                    <span>Chuyển nội địa</span>
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>

                {/* Form Section */}
                <div className="glass-panel" style={{ padding: '32px' }}>
                    <form onSubmit={handleTransfer} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                        {/* Amount Input - Changes based on transfer type */}
                        <div>
                            <label style={{ display: 'block', marginBottom: '12px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                {transferType === 'international' ? 'Amount to send (JPY)' : 'Số tiền gửi (VND)'}
                            </label>
                            <div style={{ position: 'relative' }}>
                                <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', fontWeight: 'bold' }}>
                                    {transferType === 'international' ? '¥' : '₫'}
                                </span>
                                <input
                                    type="number"
                                    className="input-field"
                                    style={{ paddingLeft: '32px', fontSize: '1.5rem', fontWeight: 'bold' }}
                                    placeholder="0"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Conversion Display - Only for international */}
                        {transferType === 'international' && (
                            <>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <div style={{
                                        background: 'rgba(255, 255, 255, 0.05)', borderRadius: '50%', width: '40px', height: '40px',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)'
                                    }}>
                                        <ArrowDown size={20} />
                                    </div>
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '12px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Recipient gets (VND)</label>
                                    <div className="input-field" style={{ background: 'rgba(255, 255, 255, 0.03)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--success)' }}>
                                            {amount ? (amount * RATE).toLocaleString() : '0'}
                                        </span>
                                        <span style={{ color: 'var(--text-muted)' }}>VND</span>
                                    </div>
                                    <div style={{ textAlign: 'right', marginTop: '8px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                        Rate: 1 JPY = {RATE} VND
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Recipient Details */}
                        <h3 style={{ fontSize: '1.1rem', marginTop: '16px', borderBottom: '1px solid var(--glass-border)', paddingBottom: '12px' }}>
                            {transferType === 'international' ? 'Recipient Details (Vietnam)' : 'Thông tin người nhận'}
                        </h3>

                        <div style={{ display: 'grid', gap: '16px' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                    {transferType === 'international' ? 'Bank Name' : 'Ngân hàng'}
                                </label>
                                <select className="input-field" required>
                                    <option value="">Select Bank</option>
                                    <option value="vcb">Vietcombank</option>
                                    <option value="tpb">TPBank</option>
                                    <option value="mb">MB Bank</option>
                                    <option value="acb">ACB</option>
                                    <option value="techcombank">Techcombank</option>
                                </select>
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                    {transferType === 'international' ? 'Account Number' : 'Số tài khoản'}
                                </label>
                                <input type="text" className="input-field" placeholder="1234567890" required />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                    {transferType === 'international' ? 'Recipient Name' : 'Tên người nhận'}
                                </label>
                                <input type="text" className="input-field" placeholder="NGUYEN VAN A" style={{ textTransform: 'uppercase' }} required />
                            </div>

                            {/* Extra field for domestic - message/note */}
                            {transferType === 'domestic' && (
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                        Nội dung chuyển tiền (Optional)
                                    </label>
                                    <input type="text" className="input-field" placeholder="Chuyển tiền..." />
                                </div>
                            )}
                        </div>

                        <button type="submit" className="primary-btn" style={{ marginTop: '16px', height: '56px', fontSize: '1.1rem' }}>
                            {loading ? 'Processing...' : (transferType === 'international' ? 'Send Money Now' : 'Chuyển tiền')}
                        </button>

                    </form>
                </div>

                {/* Info/Summary Section */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div className="glass-panel" style={{ padding: '24px' }}>
                        <h3 style={{ marginBottom: '16px' }}>Transaction Summary</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                                <span>Transfer Amount</span>
                                <span>
                                    {transferType === 'international' ? '¥' : '₫'}{Number(amount || 0).toLocaleString()}
                                </span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                                <span>Fee</span>
                                <span>
                                    {transferType === 'international' ? '¥0 (Free)' : '₫0 (Miễn phí)'}
                                </span>
                            </div>
                            <div style={{ height: '1px', background: 'var(--glass-border)', margin: '8px 0' }} />
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.1rem' }}>
                                <span>Total Pay</span>
                                <span>
                                    {transferType === 'international' ? '¥' : '₫'}{Number(amount || 0).toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="glass-panel" style={{ padding: '24px', background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(99, 102, 241, 0.2))' }}>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                            <span style={{ fontSize: '1.2rem' }}>🎁</span> Rewards
                        </h3>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                            You will earn <span style={{ color: 'white', fontWeight: 'bold' }}>
                                {transferType === 'international' ? '50 points' : '20 points'}
                            </span> for this transaction!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Transfer;
