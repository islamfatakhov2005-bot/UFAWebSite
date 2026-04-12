"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, ArrowUp, ArrowDown } from "lucide-react";

interface StatItem {
  id: number;
  value: string;
  label: string;
  sortOrder: number;
  isActive: boolean;
}

const emptyForm = {
  value: "",
  label: "",
  sortOrder: 0,
  isActive: true,
};

export default function AdminStatisticsPage() {
  const [stats, setStats] = useState<StatItem[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    fetch("/api/admin/statistics")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch(() => {});
  }, []);
  const [editing, setEditing] = useState<StatItem | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function openCreate() {
    setEditing(null);
    setForm({ ...emptyForm, sortOrder: stats.length + 1 });
    setError("");
    setDialogOpen(true);
  }

  function openEdit(item: StatItem) {
    setEditing(item);
    setForm({
      value: item.value,
      label: item.label,
      sortOrder: item.sortOrder,
      isActive: item.isActive,
    });
    setError("");
    setDialogOpen(true);
  }

  async function handleSave() {
    if (!form.value.trim() || !form.label.trim()) {
      setError("Значение и подпись обязательны");
      return;
    }
    setLoading(true);
    setError("");

    try {
      if (editing) {
        const res = await fetch(`/api/admin/statistics/${editing.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error("API error");
        const updated = await res.json();
        setStats((prev) => prev.map((s) => (s.id === editing.id ? updated : s)));
      } else {
        const res = await fetch("/api/admin/statistics", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error("API error");
        const created = await res.json();
        setStats((prev) => [...prev, created]);
      }
      setDialogOpen(false);
    } catch {
      setError("Ошибка при сохранении");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Удалить этот показатель?")) return;
    try {
      const res = await fetch(`/api/admin/statistics/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("API error");
      setStats((prev) => prev.filter((s) => s.id !== id));
    } catch {
      setError("Ошибка при удалении");
    }
  }

  function moveItem(id: number, direction: "up" | "down") {
    setStats((prev) => {
      const sorted = [...prev].sort((a, b) => a.sortOrder - b.sortOrder);
      const idx = sorted.findIndex((s) => s.id === id);
      if (
        (direction === "up" && idx === 0) ||
        (direction === "down" && idx === sorted.length - 1)
      ) {
        return prev;
      }
      const swapIdx = direction === "up" ? idx - 1 : idx + 1;
      const tempOrder = sorted[idx].sortOrder;
      sorted[idx] = { ...sorted[idx], sortOrder: sorted[swapIdx].sortOrder };
      sorted[swapIdx] = { ...sorted[swapIdx], sortOrder: tempOrder };
      return sorted;
    });
  }

  const sortedStats = [...stats].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#333333]">Статистика</h2>
          <p className="text-gray-500 mt-1">Показатели на главной странице</p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="h-4 w-4" />
          Добавить показатель
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-32">Значение</TableHead>
                <TableHead>Подпись</TableHead>
                <TableHead className="w-24">Порядок</TableHead>
                <TableHead className="w-24">Статус</TableHead>
                <TableHead className="w-36">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedStats.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-gray-400">
                    Нет показателей
                  </TableCell>
                </TableRow>
              ) : (
                sortedStats.map((stat) => (
                  <TableRow key={stat.id}>
                    <TableCell>
                      <span className="text-xl font-bold text-[#3ECF8E]">
                        {stat.value}
                      </span>
                    </TableCell>
                    <TableCell className="font-medium">{stat.label}</TableCell>
                    <TableCell>{stat.sortOrder}</TableCell>
                    <TableCell>
                      <Badge variant={stat.isActive ? "default" : "secondary"}>
                        {stat.isActive ? "Активен" : "Скрыт"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => moveItem(stat.id, "up")}
                        >
                          <ArrowUp className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => moveItem(stat.id, "down")}
                        >
                          <ArrowDown className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => openEdit(stat)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(stat.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editing ? "Редактировать показатель" : "Добавить показатель"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="stat-value">Значение *</Label>
              <Input
                id="stat-value"
                value={form.value}
                onChange={(e) => setForm({ ...form, value: e.target.value })}
                placeholder="150+"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stat-label">Подпись *</Label>
              <Input
                id="stat-label"
                value={form.label}
                onChange={(e) => setForm({ ...form, label: e.target.value })}
                placeholder="Членов ассоциации"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="stat-order">Порядок сортировки</Label>
                <Input
                  id="stat-order"
                  type="number"
                  value={form.sortOrder}
                  onChange={(e) =>
                    setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Статус</Label>
                <div className="flex items-center h-10">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.isActive}
                      onChange={(e) =>
                        setForm({ ...form, isActive: e.target.checked })
                      }
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm">Активен</span>
                  </label>
                </div>
              </div>
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
