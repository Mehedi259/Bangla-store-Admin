'use client';

import React, { useEffect, useState, Suspense } from 'react';
import imageCompression from 'browser-image-compression';
import { useSearchParams } from 'next/navigation';
import { Plus, Edit2, Trash2, Search, X, Package } from 'lucide-react';

const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://167.233.34.127:8000/api') + '/products';

const emptyForm = { id: '', name: '', price: '', weight: '', image: '', category: '', isBestSeller: false, stock: 100, status: 'Active' };

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<any>(null);

  const fetchProductsAndCategories = async () => {
    setLoading(true);
    try {
      const [resProducts, resCategories] = await Promise.all([
        fetch(`${API_URL}/`),
        fetch(`${API_URL}/categories/`)
      ]);
      const dataProducts = await resProducts.json();
      const dataCategories = await resCategories.json();
      setProducts(dataProducts);
      setFiltered(dataProducts);
      setCategories(dataCategories);
      if (dataCategories.length > 0) {
        emptyForm.category = dataCategories[0].name;
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProductsAndCategories(); }, []);

  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
      const matchesCategory = selectedCategory ? p.category === selectedCategory : true;
      return matchesSearch && matchesCategory;
    }));
  }, [search, selectedCategory, products]);

  const openAdd = () => {
    setEditingProduct(null);
    setForm({ ...emptyForm });
    setShowModal(true);
  };

  const openEdit = (product: any) => {
    setEditingProduct(product);
    setForm({ ...product, price: String(product.price) });
    setShowModal(true);
  };

  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setUploading(true);
    
    try {
      const options = {
        maxSizeMB: 0.3, // compress to max 300KB
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
      
      const compressedFile = await imageCompression(file, options);
      const fileToUpload = new File([compressedFile], file.name, { type: file.type });
      
      const formData = new FormData();
      formData.append('image', fileToUpload);

      const res = await fetch(`${API_URL}/upload/`, {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        const data = await res.json();
        const baseUrl = new URL(process.env.NEXT_PUBLIC_API_URL || 'http://167.233.34.127:8000/api').origin;
        const imageUrl = `${baseUrl}${data.url}`;
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
    if (!form.name || !form.price || !form.category) return alert('নাম, দাম ও ক্যাটাগরি দিতে হবে!');
    if (!form.image) return alert('অনুগ্রহ করে একটি ছবি আপলোড করুন!');
    setSaving(true);
    try {
      const payload = { ...form, price: parseFloat(form.price) };
      let res;
      if (editingProduct) {
        res = await fetch(`${API_URL}/${editingProduct.id}/`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        const newId = `p${Date.now()}`;
        res = await fetch(`${API_URL}/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...payload, id: newId }),
        });
      }
      if (res.ok) { setShowModal(false); fetchProductsAndCategories(); }
      else { alert('সেভ করা যায়নি: ' + await res.text()); }
    } catch (e) { alert('Error: ' + e); }
    finally { setSaving(false); }
  };

  const handleDelete = async (product: any) => {
    try {
      const res = await fetch(`${API_URL}/${product.id}/`, { method: 'DELETE' });
      if (res.ok || res.status === 204) { setDeleteConfirm(null); fetchProductsAndCategories(); }
      else alert('ডিলিট করা যায়নি!');
    } catch (e) { alert('Error: ' + e); }
  };

  const statusColor = (s: string) => {
    if (s === 'Active') return 'bg-emerald-100 text-emerald-700';
    if (s === 'Low Stock') return 'bg-amber-100 text-amber-700';
    return 'bg-red-100 text-red-700';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your store's inventory. Total: {products.length} products.</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-[#4F46E5] hover:bg-[#4338CA] text-white px-5 py-2.5 rounded-xl font-medium text-sm shadow-lg shadow-indigo-500/30 transition-all"
        >
          <Plus size={18} /> Add Product
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4">
          <div className="relative w-full sm:max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5]"
            />
          </div>
          <select 
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="w-full sm:w-auto px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] bg-white"
          >
            <option value="">All Categories</option>
            {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left min-w-[800px]">
            <thead className="bg-gray-50/50 text-xs text-gray-500 uppercase font-semibold border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Weight</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan={7} className="px-6 py-16 text-center text-gray-400">Loading...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={7} className="px-6 py-16 text-center text-gray-400">
                  <Package size={40} className="mx-auto mb-3 text-gray-200" />
                  No products found.
                </td></tr>
              ) : filtered.map((product, idx) => (
                <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {product.image ? (
                        <img 
                          src={
                            product.image.startsWith('/images/') 
                              ? `${process.env.NEXT_PUBLIC_API_URL ? 'https://banglastoreandtabac.com' : 'http://167.233.34.127:3000'}${product.image}` 
                              : product.image.startsWith('/media/')
                                ? `${new URL(process.env.NEXT_PUBLIC_API_URL || 'http://167.233.34.127:8000/api').origin}${product.image}`
                                : product.image
                          } 
                          className="w-10 h-10 rounded-lg object-cover border border-gray-100 bg-gray-50" 
                          alt={product.name} 
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center"><Package size={16} className="text-gray-300" /></div>
                      )}
                      <div>
                        <div className="font-medium text-gray-800 text-sm">{product.name}</div>
                        <div className="text-xs text-gray-400">ID: {product.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4"><span className="px-2.5 py-1 bg-gray-100 rounded-lg text-xs font-medium text-gray-600">{product.category}</span></td>
                  <td className="px-6 py-4 text-gray-500 text-xs">{product.weight || '—'}</td>
                  <td className="px-6 py-4 font-bold text-gray-800">€ {Number(product.price).toFixed(2)}</td>
                  <td className="px-6 py-4 text-gray-600">{product.stock ?? 100}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${statusColor(product.status || 'Active')}`}>
                      {product.status || 'Active'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEdit(product)} className="p-1.5 text-gray-400 hover:text-[#4F46E5] rounded-md hover:bg-indigo-50 transition-colors">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => setDeleteConfirm(product)} className="p-1.5 text-gray-400 hover:text-red-600 rounded-md hover:bg-red-50 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length > 0 && (
          <div className="p-4 border-t border-gray-100 text-sm text-gray-500">
            Showing {filtered.length} of {products.length} products
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-lg"><X size={18} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Product Name *</label>
                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5]" placeholder="e.g. Hilsa Fish (Frozen)" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Price (€) *</label>
                  <input type="number" step="0.01" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5]" placeholder="0.00" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Weight/Size</label>
                  <input value={form.weight} onChange={e => setForm({ ...form, weight: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5]" placeholder="(500g)" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Category *</label>
                <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5]">
                  {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Product Image *</label>
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Stock</label>
                  <input type="number" value={form.stock} onChange={e => setForm({ ...form, stock: parseInt(e.target.value) })} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5]" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Status</label>
                  <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5]">
                    <option>Active</option>
                    <option>Low Stock</option>
                    <option>Out of Stock</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="bestSeller" checked={form.isBestSeller} onChange={e => setForm({ ...form, isBestSeller: e.target.checked })} className="w-4 h-4 accent-[#4F46E5]" />
                <label htmlFor="bestSeller" className="text-sm font-medium text-gray-700">Mark as Best Seller</label>
              </div>
            </div>
            <div className="p-6 border-t border-gray-100 flex gap-3 justify-end">
              <button onClick={() => setShowModal(false)} className="px-5 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="px-5 py-2.5 bg-[#4F46E5] hover:bg-[#4338CA] text-white rounded-xl text-sm font-medium disabled:opacity-60 shadow-lg shadow-indigo-500/20 transition-all">
                {saving ? 'Saving...' : (editingProduct ? 'Save Changes' : 'Add Product')}
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
            <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Product?</h3>
            <p className="text-sm text-gray-500 mb-6">
              <strong>"{deleteConfirm.name}"</strong> মুছে ফেলা হবে। এই কাজটি undo করা যাবে না।
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

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-gray-500">Loading...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
