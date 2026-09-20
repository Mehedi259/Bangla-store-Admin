'use client';

import React, { useEffect, useState } from 'react';
import { X, Trash2 } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import DataTable from '@/components/DataTable';

const API_URL = 'http://167.233.34.127:8000/api/orders';

const columns = [
  { key: 'id', label: 'Order ID', render: (val: string) => <span className="font-medium text-[#4F46E5]">{val}</span> },
  { key: 'created_at', label: 'Date', render: (val: string) => <span className="text-gray-600">{new Date(val).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute:'2-digit' })}</span> },
  { key: 'customer_name', label: 'Customer', render: (val: string) => <span className="font-medium text-gray-800">{val}</span> },
  { key: 'amount', label: 'Total', render: (val: string) => <span className="font-medium text-gray-800">৳ {val}</span> },
  { key: 'payment_method', label: 'Payment', render: (val: string) => <span className="text-gray-600">{val}</span> },
  { 
    key: 'status', 
    label: 'Status', 
    render: (val: string) => {
      let color = 'bg-gray-100 text-gray-700';
      if(val === 'Delivered') color = 'bg-emerald-100 text-emerald-700';
      else if(val === 'Processing') color = 'bg-amber-100 text-amber-700';
      else if(val === 'Shipped') color = 'bg-blue-100 text-blue-700';
      else if(val === 'Cancelled') color = 'bg-red-100 text-red-700';
      else if(val === 'Pending') color = 'bg-purple-100 text-purple-700';
      return <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${color}`}>{val}</span>;
    } 
  },
];

const emptyForm = { id: '', customer_name: '', amount: '', payment_method: 'Cash on Delivery', status: 'Pending' };

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingOrder, setEditingOrder] = useState<any>(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<any>(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/`);
      const data = await res.json();
      setOrders(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  const openAdd = () => {
    setEditingOrder(null);
    setForm({ ...emptyForm, id: `#BS-${Math.floor(Math.random() * 1000000)}` });
    setShowModal(true);
  };

  const openEdit = (order: any) => {
    setEditingOrder(order);
    setForm({ ...order, amount: String(order.amount) });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.customer_name || !form.amount) return alert('Customer Name and Amount are required!');
    setSaving(true);
    try {
      const payload = { ...form, amount: parseFloat(form.amount) };
      let res;
      if (editingOrder) {
        res = await fetch(`${API_URL}/${encodeURIComponent(editingOrder.id)}/`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(`${API_URL}/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }
      if (res.ok) { setShowModal(false); fetchOrders(); }
      else { alert('Failed to save order'); }
    } catch (e) { alert('Error: ' + e); }
    finally { setSaving(false); }
  };

  const handleDelete = async (order: any) => {
    try {
      const res = await fetch(`${API_URL}/${encodeURIComponent(order.id)}/`, { method: 'DELETE' });
      if (res.ok || res.status === 204) { setDeleteConfirm(null); fetchOrders(); }
      else alert('Failed to delete order!');
    } catch (e) { alert('Error: ' + e); }
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Orders" 
        description={`Manage and track all customer orders. Total: ${orders.length} orders.`} 
        onAdd={openAdd} 
        addLabel="Create Order" 
      />
      
      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading orders...</div>
      ) : (
        <DataTable 
          columns={columns} 
          data={orders} 
          searchPlaceholder="Search by Order ID or Customer..." 
          onEdit={openEdit} 
          onDelete={setDeleteConfirm} 
        />
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">{editingOrder ? 'Edit Order' : 'Create Order'}</h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-lg"><X size={18} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Order ID</label>
                <input value={form.id} disabled className="w-full border border-gray-200 bg-gray-50 rounded-lg px-3 py-2.5 text-sm text-gray-500" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Customer Name *</label>
                <input value={form.customer_name} onChange={e => setForm({ ...form, customer_name: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5]" placeholder="e.g. Mahmudul Hasan" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Total Amount (৳) *</label>
                <input type="number" step="0.01" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5]" placeholder="0.00" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Payment Method</label>
                  <select value={form.payment_method} onChange={e => setForm({ ...form, payment_method: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5]">
                    <option>Cash on Delivery</option>
                    <option>bKash</option>
                    <option>Nagad</option>
                    <option>Credit Card</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Status</label>
                  <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5]">
                    <option>Pending</option>
                    <option>Processing</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-100 flex gap-3 justify-end">
              <button onClick={() => setShowModal(false)} className="px-5 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="px-5 py-2.5 bg-[#4F46E5] hover:bg-[#4338CA] text-white rounded-xl text-sm font-medium disabled:opacity-60 shadow-lg shadow-indigo-500/20 transition-all">
                {saving ? 'Saving...' : (editingOrder ? 'Update Order' : 'Create Order')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 size={24} className="text-red-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Order?</h3>
            <p className="text-sm text-gray-500 mb-6">
              Order <strong>{deleteConfirm.id}</strong> will be deleted permanently.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 border border-gray-200 rounded-xl py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-xl py-2.5 text-sm font-medium transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
