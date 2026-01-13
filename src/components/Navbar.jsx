import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Send, History, LogOut, User } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // Mock logout - in real app, clear context
  const handleLogout = () => {
    navigate('/login');
  };

  // Don't show navbar on login/register
  if (['/login', '/register'].includes(location.pathname)) {
    return null;
  }

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/transfer', label: 'Transfer', icon: Send },
    { path: '/history', label: 'History', icon: History },
  ];

  return (
    <nav className="glass-panel" style={{ 
      margin: '0 0 24px 0', 
      padding: '16px 24px', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      position: 'sticky',
      top: 24,
      zIndex: 50
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontWeight: 'bold', fontSize: '1.25rem' }}>
        <div style={{ background: 'var(--primary)', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          J
        </div>
        <span>J-V Money</span>
      </div>

      <div style={{ display: 'flex', gap: '8px' }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '10px',
                background: isActive ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
                color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                fontWeight: isActive ? 600 : 400,
                transition: 'all 0.2s'
              }}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>User</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--success)' }}>1,250 Points</span>
        </div>
        <button 
          onClick={handleLogout}
          style={{ 
            background: 'rgba(239, 68, 68, 0.1)', 
            color: 'var(--error)', 
            padding: '8px', 
            borderRadius: '8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}
        >
          <LogOut size={20} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
