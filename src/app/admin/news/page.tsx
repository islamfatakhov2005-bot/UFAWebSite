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
import { Plus, Pencil, Trash2, Eye, Image as ImageIcon } from "lucide-react";

interface NewsItem {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  isPublished: boolean;
  publishedAt: string | null;
  views: number;
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

const initialNews: NewsItem[] = [
  {
    id: 1,
    title: "UFA провела ежегодную конференцию",
    slug: "ufa-annual-conference",
    excerpt: "Более 200 участников приняли участие в конференции",
    content: "Полный текст статьи...",
    image: "/news/conf.jpg",
    isPublished: true,
    publishedAt: "2026-03-15T10:00:00Z",
    views: 342,
    createdAt: "2026-03-14T08:00:00Z",
  },
  {
    id: 2,
    title: "Новые члены ассоциации",
    slug: "new-members-2026",
    excerpt: "5 новых компаний присоединились к UFA",
    content: "Полный текст статьи...",
    image: "/news/members.jpg",
    isPublished: true,
    publishedAt: "2026-03-10T10:00:00Z",
    views: 128,
    createdAt: "2026-03-09T12:00:00Z",
  },
  {
    id: 3,
    title: "Анонс Franchise Expo 2026",
    slug: "franchise-expo-2026-announcement",
    excerpt: "Главное событие года в мире франчайзинга",
    content: "Черновик...",
    image: "",
    isPublished: false,
    publishedAt: null,
    views: 0,
    createdAt: "2026-04-01T09:00:00Z",
  },
];

const emptyForm = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  image: "",
  isPublished: false,
};

export default function AdminNewsPage() {
  const [news, setNews] = useState<NewsItem[]>(initialNews);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<NewsItem | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function openCreate() {
    setEditing(null);
    setForm(emptyForm);
    setError("");
    setDialogOpen(true);
  }

  function openEdit(item: NewsItem) {
    setEditing(item);
    setForm({
      title: item.title,
      slug: item.slug,
      excerpt: item.excerpt,
      content: item.content,
      image: item.image,
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
          const res = await fetch(`/api/admin/news/${editing.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
          });
          if (res.ok) {
            const updated = await res.json();
            setNews((prev) => prev.map((n) => (n.id === editing.id ? updated : n)));
          } else {
            throw new Error("API error");
          }
        } catch {
          setNews((prev) =>
            prev.map((n) =>
              n.id === editing.id
                ? { ...n, ...form, publishedAt: form.isPublished && !n.publishedAt ? new Date().toISOString() : n.publishedAt }
                : n
            )
          );
        }
      } else {
        try {
          const res = await fetch("/api/admin/news", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
          });
          if (res.ok) {
            const created = await res.json();
            setNews((prev) => [...prev, created]);
          } else {
            throw new Error("API error");
          }
        } catch {
          const newItem: NewsItem = {
            ...form,
            id: Math.max(0, ...news.map((n) => n.id)) + 1,
            publishedAt: form.isPublished ? new Date().toISOString() : null,
            views: 0,
            createdAt: new Date().toISOString(),
          };
          setNews((prev) => [...prev, newItem]);
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
    if (!confirm("Удалить эту новость?")) return;
    try {
      await fetch(`/api/admin/news/${id}`, { method: "DELETE" });
    } catch {
      // Continue with local deletion
    }
    setNews((prev) => prev.filter((n) => n.id !== id));
  }

  function formatDate(dateStr: string | null) {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#333333]">Новости</h2>
          <p className="text-gray-500 mt-1">Управление новостными статьями</p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="h-4 w-4" />
          Добавить новость
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Фото</TableHead>
                <TableHead>Название</TableHead>
                <TableHead className="w-28">Статус</TableHead>
                <TableHead className="w-32">Дата</TableHead>
                <TableHead className="w-24">Просмотры</TableHead>
                <TableHead className="w-28">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {news.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-400">
                    Нет новостей
                  </TableCell>
                </TableRow>
              ) : (
                news.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <ImageIcon className="h-4 w-4 text-gray-400" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-xs text-gray-400">/{item.slug}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={item.isPublished ? "default" : "secondary"}
                      >
                        {item.isPublished ? "Опубликовано" : "Черновик"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-500">
                      {formatDate(item.publishedAt || item.createdAt)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-gray-500">
                        <Eye className="h-3.5 w-3.5" />
                        {item.views}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEdit(item)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(item.id)}
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
              {editing ? "Редактировать новость" : "Добавить новость"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4 max-h-[60vh] overflow-y-auto">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="news-title">Название *</Label>
              <Input
                id="news-title"
                value={form.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Название новости"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="news-slug">Slug *</Label>
              <Input
                id="news-slug"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                placeholder="news-slug"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="news-excerpt">Краткое описание</Label>
              <Input
                id="news-excerpt"
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                placeholder="Краткое описание для превью"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="news-content">Содержание</Label>
              <Textarea
                id="news-content"
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                placeholder="Полный текст новости..."
                rows={6}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="news-image">Изображение (URL)</Label>
              <Input
                id="news-image"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                placeholder="/news/image.jpg"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="news-published"
                checked={form.isPublished}
                onChange={(e) =>
                  setForm({ ...form, isPublished: e.target.checked })
                }
                className="rounded border-gray-300"
              />
              <Label htmlFor="news-published">Опубликовать</Label>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setDialogOpen(false)}
              disabled={loading}
            >
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
