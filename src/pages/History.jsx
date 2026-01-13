import React from 'react';
import { ArrowUpRight, ArrowDownLeft, Calendar, Search, Filter } from 'lucide-react';

const History = () => {
    // Mock data
    const transactions = [
        { id: 1, type: 'sent', name: 'NGUYEN VAN A', amount: '50,000', currency: 'JPY', date: '2023-10-15', status: 'Completed', points: '+50' },
        { id: 2, type: 'sent', name: 'PHAM THI B', amount: '100,000', currency: 'JPY', date: '2023-10-12', status: 'Completed', points: '+100' },
        { id: 3, type: 'received', name: 'Salary', amount: '350,000', currency: 'JPY', date: '2023-10-01', status: 'Completed', points: '0' },
        { id: 4, type: 'sent', name: 'NGUYEN VAN A', amount: '20,000', currency: 'JPY', date: '2023-09-28', status: 'Failed', points: '0' },
        { id: 5, type: 'sent', name: 'LE VAN C', amount: '15,000', currency: 'JPY', date: '2023-09-25', status: 'Processing', points: '0' },
    ];

    return (
        <div className="page-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h1 style={{ fontSize: '28px' }}>Transaction History</h1>
            </div>

            <div className="glass-panel" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', background: 'rgba(0,0,0,0.2)', padding: '12px', borderRadius: '12px' }}>
                    <Search size={20} color="var(--text-muted)" />
                    <input
                        type="text"
                        placeholder="Search transactions..."
                        style={{ background: 'transparent', border: 'none', color: 'var(--text-main)', fontSize: '1rem', width: '100%', outline: 'none' }}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {transactions.map((tx) => (
                        <div key={tx.id} style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            padding: '16px', borderRadius: '12px',
                            background: 'rgba(255, 255, 255, 0.03)',
                            transition: 'transform 0.2s'
                        }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.01)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <div style={{
                                    width: '48px', height: '48px', borderRadius: '50%',
                                    background: tx.type === 'sent' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: tx.type === 'sent' ? 'var(--error)' : 'var(--success)'
                                }}>
                                    {tx.type === 'sent' ? <ArrowUpRight size={24} /> : <ArrowDownLeft size={24} />}
                                </div>
                                <div>
                                    <h4 style={{ fontSize: '1rem', marginBottom: '4px' }}>{tx.name}</h4>
                                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{tx.date} • {tx.status}</span>
                                </div>
                            </div>

                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontWeight: 'bold', fontSize: '1rem', marginBottom: '4px', color: tx.type === 'sent' ? 'var(--text-main)' : 'var(--success)' }}>
                                    {tx.type === 'sent' ? '-' : '+'}{tx.amount} {tx.currency}
                                </div>
                                {tx.points !== '0' && (
                                    <span style={{ fontSize: '0.8rem', color: 'var(--secondary)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                        🎁 {tx.points} pts
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default History;
