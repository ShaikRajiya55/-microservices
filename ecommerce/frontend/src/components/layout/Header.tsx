import React from 'react';
import { useCartStore } from '../../store/useCartStore';
import { useAuthStore } from '../../store/useAuthStore';

export const Header: React.FC = () => {
  const { cart, toggleCart } = useCartStore();
  const { user, isAuthenticated, logout } = useAuthStore();
  const itemCount = cart?.items.reduce((acc, item) => acc + item.quantity, 0) || 0;

  return (
    <header className="glass-panel" style={{ padding: '16px 32px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <h1 style={{ margin: 0, fontSize: '24px', background: 'linear-gradient(135deg, #2563eb, #db2777)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          NexusCart
        </h1>
        <span className="badge-tag">Enterprise 50k LOC</span>
      </div>

      <nav style={{ display: 'flex', gap: '24px', fontWeight: 500 }}>
        <a href="#catalog" style={{ textDecoration: 'none', color: 'inherit' }}>Catalog</a>
        <a href="#categories" style={{ textDecoration: 'none', color: 'inherit' }}>Categories</a>
        <a href="#admin" style={{ textDecoration: 'none', color: 'inherit' }}>Admin Console</a>
      </nav>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button onClick={toggleCart} className="btn-primary" style={{ position: 'relative' }}>
          Cart ({itemCount})
        </button>

        {isAuthenticated ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>Hello, {user?.firstName}</span>
            <button onClick={logout} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#ef4444' }}>Logout</button>
          </div>
        ) : (
          <button className="btn-primary" style={{ background: '#475569' }}>Sign In</button>
        )}
      </div>
    </header>
  );
};
