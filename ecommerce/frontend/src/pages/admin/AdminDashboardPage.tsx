import React from 'react';

export const AdminDashboardPage: React.FC = () => {
  return (
    <div style={{ padding: '32px' }}>
      <h2 style={{ fontSize: '28px', marginBottom: '24px' }}>Store Administration Analytics</h2>

      {/* KPI Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '32px' }}>
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ color: '#64748b', fontSize: '14px' }}>Total Revenue</div>
          <div style={{ fontSize: '28px', fontWeight: 700, color: '#2563eb', marginTop: '8px' }}>$148,920.50</div>
          <div style={{ color: '#16a34a', fontSize: '12px', marginTop: '4px' }}>+12.4% vs last month</div>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ color: '#64748b', fontSize: '14px' }}>Total Orders</div>
          <div style={{ fontSize: '28px', fontWeight: 700, marginTop: '8px' }}>342</div>
          <div style={{ color: '#16a34a', fontSize: '12px', marginTop: '4px' }}>+8.1% vs last month</div>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ color: '#64748b', fontSize: '14px' }}>Average Order Value</div>
          <div style={{ fontSize: '28px', fontWeight: 700, marginTop: '8px' }}>$435.44</div>
          <div style={{ color: '#64748b', fontSize: '12px', marginTop: '4px' }}>Stable</div>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ color: '#64748b', fontSize: '14px' }}>Conversion Rate</div>
          <div style={{ fontSize: '28px', fontWeight: 700, color: '#ec4899', marginTop: '8px' }}>3.42%</div>
          <div style={{ color: '#16a34a', fontSize: '12px', marginTop: '4px' }}>+0.5% optimization</div>
        </div>
      </div>

      {/* Recent Orders Management Table */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <h3 style={{ marginTop: 0, marginBottom: '16px' }}>Recent Customer Orders</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e2e8f0', color: '#64748b' }}>
              <th style={{ padding: '12px' }}>Order ID</th>
              <th style={{ padding: '12px' }}>Customer</th>
              <th style={{ padding: '12px' }}>Status</th>
              <th style={{ padding: '12px' }}>Total</th>
              <th style={{ padding: '12px' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
              <td style={{ padding: '12px', fontWeight: 600 }}>ORD-20260827-8492</td>
              <td style={{ padding: '12px' }}>Jane Doe (customer@nexuscart.com)</td>
              <td style={{ padding: '12px' }}><span className="badge-tag" style={{ background: '#fef3c7', color: '#b45309' }}>PROCESSING</span></td>
              <td style={{ padding: '12px', fontWeight: 600 }}>$2,076.49</td>
              <td style={{ padding: '12px' }}>
                <button className="btn-primary" style={{ padding: '6px 12px', fontSize: '12px' }}>Fulfill Order</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
