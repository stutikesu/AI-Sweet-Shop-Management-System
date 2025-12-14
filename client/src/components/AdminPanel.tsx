import { useState } from 'react';
import { useSweets, useCreateSweet, useRestockSweet } from '../hooks/useSweets';
import { AddSweetForm } from './AddSweetForm';
import { Sweet } from '../hooks/useSweets';
import { sweetsApi } from '../lib/api';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../hooks/useToast';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { getSweetEmoji, getCategoryColor } from '../utils/sweetImages';

export const AdminPanel = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingSweet, setEditingSweet] = useState<Sweet | null>(null);
  const [restockingSweet, setRestockingSweet] = useState<Sweet | null>(null);
  const { data: sweets = [] } = useSweets();
  const createMutation = useCreateSweet();
  const restockMutation = useRestockSweet();
  const { token } = useAuth();
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  const handleAdd = async (data: { name: string; category: string; price: number; quantity: number }) => {
    if (!token) {
      showToast('You must be logged in', 'error');
      return;
    }

    try {
      await createMutation.mutateAsync({ data, token });
      showToast('Sweet added successfully!', 'success');
      setShowAddForm(false);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to add sweet';
      showToast(errorMessage, 'error');
    }
  };

  const handleUpdate = async (id: string, data: Partial<{ name: string; category: string; price: number; quantity: number }>) => {
    if (!token) {
      showToast('You must be logged in', 'error');
      return;
    }

    try {
      await sweetsApi.update(id, data, token);
      queryClient.invalidateQueries({ queryKey: ['sweets'] });
      showToast('Sweet updated successfully!', 'success');
      setEditingSweet(null);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update sweet';
      showToast(errorMessage, 'error');
    }
  };

  const handleDelete = async (id: string) => {
    if (!token) {
      showToast('You must be logged in', 'error');
      return;
    }

    if (!confirm('Are you sure you want to delete this sweet?')) {
      return;
    }

    try {
      await sweetsApi.delete(id, token);
      queryClient.invalidateQueries({ queryKey: ['sweets'] });
      showToast('Sweet deleted successfully!', 'success');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete sweet';
      showToast(errorMessage, 'error');
    }
  };

  const handleRestock = async (id: string, quantity: number) => {
    if (!token) {
      showToast('You must be logged in', 'error');
      return;
    }

    try {
      await restockMutation.mutateAsync({ id, quantity });
      showToast(`Successfully restocked ${quantity} items!`, 'success');
      setRestockingSweet(null);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to restock sweet';
      showToast(errorMessage, 'error');
    }
  };

  if (showAddForm) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-white">Add New Sweet</h2>
          <Button
            onClick={() => setShowAddForm(false)}
            variant="outline"
            className="bg-white/20 text-white border-white/30 hover:bg-white/30"
          >
            Cancel
          </Button>
        </div>
        <AddSweetForm
          onSubmit={handleAdd}
          onCancel={() => setShowAddForm(false)}
          isLoading={createMutation.isPending}
        />
      </div>
    );
  }

  if (editingSweet) {
    return (
      <EditSweetForm
        sweet={editingSweet}
        onSave={(data) => handleUpdate(editingSweet.id, data)}
        onCancel={() => setEditingSweet(null)}
      />
    );
  }

  if (restockingSweet) {
    return (
      <RestockForm
        sweet={restockingSweet}
        onRestock={(quantity) => handleRestock(restockingSweet.id, quantity)}
        onCancel={() => setRestockingSweet(null)}
        isLoading={restockMutation.isPending}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">Admin Panel 🛠️</h2>
        <Button
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
        >
          ➕ Add New Sweet
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sweets.map((sweet) => {
          const emoji = getSweetEmoji(sweet.category, sweet.name);
          const gradientColor = getCategoryColor(sweet.category);
          
          return (
            <Card key={sweet.id} className="bg-white/95 backdrop-blur-sm">
              <CardHeader className={`bg-gradient-to-br ${gradientColor} p-4 rounded-t-lg`}>
                <div className="flex items-center justify-center h-20">
                  <span className="text-6xl">{emoji}</span>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <h3 className="text-xl font-bold mb-2">{sweet.name}</h3>
                <p className="text-sm text-gray-600 mb-4 capitalize">{sweet.category}</p>
                <div className="space-y-2 mb-4">
                  <p className="text-2xl font-bold text-purple-600">${sweet.price.toFixed(2)}</p>
                  <p className="text-sm text-gray-600">Stock: <span className="font-semibold">{sweet.quantity}</span></p>
                </div>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setEditingSweet(sweet)}
                      variant="outline"
                      className="flex-1"
                    >
                      ✏️ Edit
                    </Button>
                    <Button
                      onClick={() => setRestockingSweet(sweet)}
                      variant="outline"
                      className="flex-1 text-green-600 hover:text-green-700 hover:bg-green-50"
                    >
                      📦 Restock
                    </Button>
                  </div>
                  <Button
                    onClick={() => handleDelete(sweet.id)}
                    variant="outline"
                    className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    🗑️ Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

const RestockForm = ({ sweet, onRestock, onCancel, isLoading }: { sweet: Sweet; onRestock: (quantity: number) => void; onCancel: () => void; isLoading: boolean }) => {
  const [quantity, setQuantity] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const qty = parseInt(quantity);
    
    if (!quantity || isNaN(qty) || qty <= 0) {
      setError('Quantity must be greater than 0');
      return;
    }

    onRestock(qty);
  };

  return (
    <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Restock {sweet.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <p className="text-sm text-gray-600 mb-2">Current Stock: <span className="font-semibold">{sweet.quantity}</span></p>
            <label className="block text-sm font-medium mb-1">Quantity to Add *</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
                setError('');
              }}
              className={`w-full px-3 py-2 border rounded-md ${error ? 'border-red-500' : ''}`}
              placeholder="Enter quantity"
            />
            {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
          </div>
          <div className="flex gap-2">
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading ? 'Restocking...' : 'Restock'}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel} className="flex-1" disabled={isLoading}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

const EditSweetForm = ({ sweet, onSave, onCancel }: { sweet: Sweet; onSave: (data: any) => void; onCancel: () => void }) => {
  const [formData, setFormData] = useState({
    name: sweet.name,
    category: sweet.category,
    price: sweet.price.toString(),
    quantity: sweet.quantity.toString(),
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    }
    const price = parseFloat(formData.price);
    if (!formData.price || isNaN(price) || price <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }
    const quantity = parseInt(formData.quantity);
    if (!formData.quantity || isNaN(quantity) || quantity < 0) {
      newErrors.quantity = 'Quantity must be 0 or greater';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onSave({
      name: formData.name.trim(),
      category: formData.category.trim(),
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity),
    });
  };

  return (
    <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Edit Sweet</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full px-3 py-2 border rounded-md ${errors.name ? 'border-red-500' : ''}`}
            />
            {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Category *</label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className={`w-full px-3 py-2 border rounded-md ${errors.category ? 'border-red-500' : ''}`}
            />
            {errors.category && <p className="text-sm text-red-600">{errors.category}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Price *</label>
            <input
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className={`w-full px-3 py-2 border rounded-md ${errors.price ? 'border-red-500' : ''}`}
            />
            {errors.price && <p className="text-sm text-red-600">{errors.price}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Quantity *</label>
            <input
              type="number"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              className={`w-full px-3 py-2 border rounded-md ${errors.quantity ? 'border-red-500' : ''}`}
            />
            {errors.quantity && <p className="text-sm text-red-600">{errors.quantity}</p>}
          </div>
          <div className="flex gap-2">
            <Button type="submit" className="flex-1">Save</Button>
            <Button type="button" variant="outline" onClick={onCancel} className="flex-1">Cancel</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

