"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Pencil,
  Trash2,
  ExternalLink,
  Building2,
} from "lucide-react";

interface Partner {
  id: number;
  name: string;
  logo: string;
  website: string;
  description: string;
  category: string;
  sortOrder: number;
  isActive: boolean;
}

const emptyForm = {
  name: "",
  logo: "",
  website: "",
  description: "",
  category: "",
  sortOrder: 0,
  isActive: true,
};

const categories = [
  "Франчайзинг",
  "Инвестиции",
  "Технологии",
  "Юриспруденция",
  "Консалтинг",
  "Образование",
  "Другое",
];

export default function AdminPartnersPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    fetch("/api/admin/partners")
      .then((res) => res.json())
      .then((data) => setPartners(data))
      .catch(() => {});
  }, []);
  const [editing, setEditing] = useState<Partner | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function openCreate() {
    setEditing(null);
    setForm(emptyForm);
    setError("");
    setDialogOpen(true);
  }

  function openEdit(item: Partner) {
    setEditing(item);
    setForm({
      name: item.name,
      logo: item.logo,
      website: item.website,
      description: item.description,
      category: item.category,
      sortOrder: item.sortOrder,
      isActive: item.isActive,
    });
    setError("");
    setDialogOpen(true);
  }

  async function handleSave() {
    if (!form.name.trim()) {
      setError("Название обязательно");
      return;
    }
    setLoading(true);
    setError("");

    try {
      if (editing) {
        const res = await fetch(`/api/admin/partners/${editing.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error("API error");
        const updated = await res.json();
        setPartners((prev) => prev.map((p) => (p.id === editing.id ? updated : p)));
      } else {
        const res = await fetch("/api/admin/partners", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error("API error");
        const created = await res.json();
        setPartners((prev) => [...prev, created]);
      }
      setDialogOpen(false);
    } catch {
      setError("Ошибка при сохранении");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Удалить этого партнёра?")) return;
    try {
      const res = await fetch(`/api/admin/partners/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("API error");
      setPartners((prev) => prev.filter((p) => p.id !== id));
    } catch {
      setError("Ошибка при удалении");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#333333]">Партнёры</h2>
          <p className="text-gray-500 mt-1">Управление партнёрскими организациями</p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="h-4 w-4" />
          Добавить партнёра
        </Button>
      </div>

      {/* Partners grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {partners.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-400">
            Нет партнёров
          </div>
        ) : (
          partners.map((partner) => (
            <Card key={partner.id} className={!partner.isActive ? "opacity-60" : ""}>
              <CardContent className="p-5">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="w-20 h-20 bg-gray-50 rounded-xl flex items-center justify-center overflow-hidden">
                    {partner.logo ? (
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="w-full h-full object-contain p-2"
                      />
                    ) : (
                      <Building2 className="h-8 w-8 text-gray-300" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-[#333333]">{partner.name}</p>
                    {partner.category && (
                      <Badge variant="secondary" className="mt-1">
                        {partner.category}
                      </Badge>
                    )}
                  </div>
                  {partner.website && (
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#3ECF8E] flex items-center gap-1 hover:underline"
                    >
                      <ExternalLink className="h-3 w-3" />
                      Сайт
                    </a>
                  )}
                  <div className="flex items-center gap-1 pt-2 border-t border-gray-100 w-full justify-center">
                    <Button variant="ghost" size="sm" onClick={() => openEdit(partner)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(partner.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editing ? "Редактировать партнёра" : "Добавить партнёра"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4 max-h-[60vh] overflow-y-auto">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="partner-name">Название *</Label>
              <Input
                id="partner-name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Название компании"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="partner-logo">Логотип (URL)</Label>
              <Input
                id="partner-logo"
                value={form.logo}
                onChange={(e) => setForm({ ...form, logo: e.target.value })}
                placeholder="/partners/logo.png"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="partner-website">Веб-сайт</Label>
              <Input
                id="partner-website"
                value={form.website}
                onChange={(e) => setForm({ ...form, website: e.target.value })}
                placeholder="https://..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="partner-desc">Описание</Label>
              <Textarea
                id="partner-desc"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Краткое описание партнёра..."
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="partner-category">Категория</Label>
                <Select
                  id="partner-category"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                >
                  <option value="">Выберите категорию</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="partner-order">Порядок</Label>
                <Input
                  id="partner-order"
                  type="number"
                  value={form.sortOrder}
                  onChange={(e) =>
                    setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })
                  }
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="partner-active"
                checked={form.isActive}
                onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                className="rounded border-gray-300"
              />
              <Label htmlFor="partner-active">Активен</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setDialogOpen(false)} disabled={loading}>
              Отмена
            </Button>
            <Button onClick={handleSave} disabled={loading}>
              {loading ? "Сохранение..." : "Сохранить"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
