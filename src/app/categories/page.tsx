'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Layers, X } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import DataTable from '@/components/DataTable';

const API_URL = 'http://167.233.34.127:8000/api/products/categories';

const columns = [
  { 
    key: 'image', 
    label: 'Image', 
    render: (val: string, item: any) => {
      const getImageUrl = (url: string) => {
        if (!url) return '';
        if (url.startsWith('/images/')) return `http://167.233.34.127:3000${url}`;
        if (url.startsWith('/media/')) return `http://167.233.34.127:8000${url}`;
        return url;
      };
      return (
        <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden">
          {val ? (
            <img src={getImageUrl(val)} alt={item.name} className="w-full h-full object-cover" />
          ) : (
            <Layers size={20} className="text-gray-400" />
          )}
        </div>
      );
    }
  },
  { key: 'name', label: 'Category Name', render: (val: string) => <span className="font-bold text-gray-900">{val}</span> },
  { key: 'icon', label: 'Icon (lucide)', render: (val: string) => <span className="text-gray-500 font-medium bg-gray-50 px-2 py-1 rounded">{val}</span> },
  { key: 'id', label: 'ID', render: (val: string) => <span className="text-gray-400 text-xs">{val}</span> },
];

const emptyForm = { id: '', name: '', icon: 'Package', image: '' };

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<any>(null);
  const [uploading, setUploading] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/`);
      const data = await res.json();
      setCategories(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCategories(); }, []);

  const openAdd = () => {
    setEditingCategory(null);
    setForm({ ...emptyForm, id: `cat_${Date.now()}` });
    setShowModal(true);
  };

  const openEdit = (category: any) => {
    setEditingCategory(category);
    setForm({ ...category });
    setShowModal(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      // Use the products upload endpoint
      const res = await fetch(`http://167.233.34.127:8000/api/products/upload/`, {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        const data = await res.json();
        const imageUrl = `http://167.233.34.127:8000${data.url}`;
        setForm({ ...form, image: imageUrl });
      } else {
        alert('Image upload failed');
      }
    } catch (err) {
      alert('Error uploading image');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!form.name || !form.icon) return alert('Name and Icon are required!');
    setSaving(true);
    try {
      let res;
      if (editingCategory) {
        res = await fetch(`${API_URL}/${encodeURIComponent(editingCategory.id)}/`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
      } else {
        res = await fetch(`${API_URL}/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
      }
      if (res.ok) { setShowModal(false); fetchCategories(); }
      else { alert('Failed to save category'); }
    } catch (e) { alert('Error: ' + e); }
    finally { setSaving(false); }
  };

  const handleDelete = async (category: any) => {
    try {
      const res = await fetch(`${API_URL}/${encodeURIComponent(category.id)}/`, { method: 'DELETE' });
      if (res.ok || res.status === 204) { setDeleteConfirm(null); fetchCategories(); }
      else alert('Failed to delete category!');
    } catch (e) { alert('Error: ' + e); }
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Categories" 
        description={`Manage your product categories. Total: ${categories.length} categories.`} 
        onAdd={openAdd} 
        addLabel="Add Category" 
      />
      
      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading categories...</div>
      ) : (
        <DataTable 
          columns={columns} 
          data={categories} 
          searchPlaceholder="Search categories..." 
          onEdit={openEdit} 
          onDelete={setDeleteConfirm} 
        />
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">{editingCategory ? 'Edit Category' : 'Add Category'}</h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-lg"><X size={18} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Category ID</label>
                <input value={form.id} disabled className="w-full border border-gray-200 bg-gray-50 rounded-lg px-3 py-2.5 text-sm text-gray-500" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Category Name *</label>
                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5]" placeholder="e.g. Fresh Vegetables" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Icon (Lucide name) *</label>
                <input value={form.icon} onChange={e => setForm({ ...form, icon: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5]" placeholder="e.g. Package, Leaf, Fish" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Category Image</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleFileUpload} 
                  disabled={uploading}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" 
                />
                {uploading && <p className="text-xs text-indigo-600 mt-1">Uploading...</p>}
                {form.image && !uploading && (
                  <div className="mt-2">
                    <img src={form.image} alt="Preview" className="h-16 w-16 object-cover rounded-lg border border-gray-200" />
                  </div>
                )}
              </div>
            </div>
            <div className="p-6 border-t border-gray-100 flex gap-3 justify-end">
              <button onClick={() => setShowModal(false)} className="px-5 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="px-5 py-2.5 bg-[#4F46E5] hover:bg-[#4338CA] text-white rounded-xl text-sm font-medium disabled:opacity-60 shadow-lg shadow-indigo-500/20 transition-all">
                {saving ? 'Saving...' : (editingCategory ? 'Update Category' : 'Create Category')}
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
            <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Category?</h3>
            <p className="text-sm text-gray-500 mb-6">
              Are you sure you want to delete <strong>{deleteConfirm.name}</strong>?
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
