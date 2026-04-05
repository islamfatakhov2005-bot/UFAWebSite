"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { Plus, Pencil, Trash2 } from "lucide-react";

interface PageItem {
  id: number;
  title: string;
  slug: string;
  content: string;
  metaDescription: string;
  isPublished: boolean;
  createdAt: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .substring(0, 200);
}

const initialPages: PageItem[] = [
  {
    id: 1,
    title: "О нас",
    slug: "about",
    content: "Узбекистанская Ассоциация Франчайзинга (UFA) — ведущая организация...",
    metaDescription: "О компании UFA — Узбекистанская Ассоциация Франчайзинга",
    isPublished: true,
    createdAt: "2026-01-15T10:00:00Z",
  },
  {
    id: 2,
    title: "Контакты",
    slug: "contacts",
    content: "Свяжитесь с нами: info@ufa.uz, +998 71 123 45 67...",
    metaDescription: "Контакты UFA — свяжитесь с нами",
    isPublished: true,
    createdAt: "2026-01-15T10:00:00Z",
  },
  {
    id: 3,
    title: "Членство",
    slug: "membership",
    content: "Станьте членом UFA и получите доступ к эксклюзивным преимуществам...",
    metaDescription: "Членство в UFA — преимущества и условия",
    isPublished: false,
    createdAt: "2026-03-20T10:00:00Z",
  },
];

const emptyForm = {
  title: "",
  slug: "",
  content: "",
  metaDescription: "",
  isPublished: false,
};

export default function AdminPagesPage() {
  const [pages, setPages] = useState<PageItem[]>(initialPages);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<PageItem | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function openCreate() {
    setEditing(null);
    setForm(emptyForm);
    setError("");
    setDialogOpen(true);
  }

  function openEdit(item: PageItem) {
    setEditing(item);
    setForm({
      title: item.title,
      slug: item.slug,
      content: item.content,
      metaDescription: item.metaDescription,
      isPublished: item.isPublished,
    });
    setError("");
    setDialogOpen(true);
  }

  function handleTitleChange(title: string) {
    setForm((prev) => ({
      ...prev,
      title,
      slug: editing ? prev.slug : slugify(title),
    }));
  }

  async function handleSave() {
    if (!form.title.trim()) {
      setError("Название обязательно");
      return;
    }
    if (!form.slug.trim()) {
      setError("Slug обязателен");
      return;
    }
    setLoading(true);
    setError("");

    try {
      if (editing) {
        try {
          const res = await fetch(`/api/admin/pages/${editing.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
          });
          if (res.ok) {
            const updated = await res.json();
            setPages((prev) => prev.map((p) => (p.id === editing.id ? updated : p)));
          } else {
            throw new Error("API error");
          }
        } catch {
          setPages((prev) =>
            prev.map((p) => (p.id === editing.id ? { ...p, ...form } : p))
          );
        }
      } else {
        try {
          const res = await fetch("/api/admin/pages", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
          });
          if (res.ok) {
            const created = await res.json();
            setPages((prev) => [...prev, created]);
          } else {
            throw new Error("API error");
          }
        } catch {
          const newItem: PageItem = {
            ...form,
            id: Math.max(0, ...pages.map((p) => p.id)) + 1,
            createdAt: new Date().toISOString(),
          };
          setPages((prev) => [...prev, newItem]);
        }
      }
      setDialogOpen(false);
    } catch {
      setError("Ошибка при сохранении");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Удалить эту страницу?")) return;
    try {
      await fetch(`/api/admin/pages/${id}`, { method: "DELETE" });
    } catch {
      // Continue
    }
    setPages((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#333333]">Страницы</h2>
          <p className="text-gray-500 mt-1">Управление статическими страницами</p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="h-4 w-4" />
          Добавить страницу
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Название</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead className="w-28">Статус</TableHead>
                <TableHead className="w-28">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pages.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-gray-400">
                    Нет страниц
                  </TableCell>
                </TableRow>
              ) : (
                pages.map((page) => (
                  <TableRow key={page.id}>
                    <TableCell className="font-medium">{page.title}</TableCell>
                    <TableCell className="text-gray-500">/{page.slug}</TableCell>
                    <TableCell>
                      <Badge variant={page.isPublished ? "default" : "secondary"}>
                        {page.isPublished ? "Опубликовано" : "Черновик"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm" onClick={() => openEdit(page)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(page.id)}
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
              {editing ? "Редактировать страницу" : "Добавить страницу"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4 max-h-[60vh] overflow-y-auto">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="page-title">Название *</Label>
              <Input
                id="page-title"
                value={form.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Название страницы"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="page-slug">Slug *</Label>
              <Input
                id="page-slug"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                placeholder="page-slug"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="page-content">Содержание</Label>
              <Textarea
                id="page-content"
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                placeholder="Содержание страницы..."
                rows={8}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="page-meta">Мета-описание</Label>
              <Input
                id="page-meta"
                value={form.metaDescription}
                onChange={(e) =>
                  setForm({ ...form, metaDescription: e.target.value })
                }
                placeholder="SEO описание страницы"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="page-published"
                checked={form.isPublished}
                onChange={(e) =>
                  setForm({ ...form, isPublished: e.target.checked })
                }
                className="rounded border-gray-300"
              />
              <Label htmlFor="page-published">Опубликовать</Label>
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
