import React from 'react';
import { useCartStore } from '../../store/useCartStore';

export const CartDrawer: React.FC = () => {
  const { cart, isOpen, toggleCart, removeItem } = useCartStore();

  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: 0, right: 0, width: '400px', height: '100vh', background: 'white', boxShadow: '-4px 0 24px rgba(0,0,0,0.15)', zIndex: 1000, padding: '24px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ margin: 0 }}>Your Shopping Cart</h2>
        <button onClick={toggleCart} style={{ border: 'none', background: 'none', fontSize: '24px', cursor: 'pointer' }}>&times;</button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {(!cart || cart.items.length === 0) ? (
          <p style={{ color: '#64748b', textAlign: 'center', marginTop: '48px' }}>Your cart is empty.</p>
        ) : (
          cart.items.map((item) => (
            <div key={item.variantId} style={{ display: 'flex', gap: '12px', marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid #f1f5f9' }}>
              <img src={item.imageUrl} alt={item.productName} style={{ width: '60px', height: '60px', borderRadius: '6px', objectFit: 'cover' }} />
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: '0 0 4px 0', fontSize: '14px' }}>{item.productName}</h4>
                <div style={{ fontSize: '12px', color: '#64748b' }}>Qty: {item.quantity} &times; ${item.unitPrice.toFixed(2)}</div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#2563eb', marginTop: '4px' }}>${item.itemSubtotal.toFixed(2)}</div>
              </div>
              <button onClick={() => removeItem(item.variantId)} style={{ border: 'none', background: 'none', color: '#ef4444', cursor: 'pointer' }}>Remove</button>
            </div>
          ))
        )}
      </div>

      {cart && cart.items.length > 0 && (
        <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span>Subtotal:</span>
            <span>${cart.subtotal.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '18px', fontWeight: 700 }}>
            <span>Grand Total:</span>
            <span style={{ color: '#2563eb' }}>${cart.grandTotal.toFixed(2)}</span>
          </div>
          <button className="btn-primary" style={{ width: '100%', padding: '14px' }}>Proceed to Checkout</button>
        </div>
      )}
    </div>
  );
};
