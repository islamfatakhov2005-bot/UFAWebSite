"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Plus, Pencil, Trash2, Image as ImageIcon } from "lucide-react";

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  buttonText: string;
  buttonUrl: string;
  sortOrder: number;
  isActive: boolean;
}

const initialSlides: Slide[] = [
  {
    id: 1,
    title: "Uzbekistan Franchising Association",
    subtitle: "Развиваем франчайзинг в Узбекистане",
    image: "/slides/hero-1.jpg",
    buttonText: "Подробнее",
    buttonUrl: "/about",
    sortOrder: 1,
    isActive: true,
  },
  {
    id: 2,
    title: "Franchise Expo 2026",
    subtitle: "Главная выставка франшиз Центральной Азии",
    image: "/slides/hero-2.jpg",
    buttonText: "Регистрация",
    buttonUrl: "/events",
    sortOrder: 2,
    isActive: true,
  },
  {
    id: 3,
    title: "Стань частью сообщества",
    subtitle: "Присоединяйтесь к ведущим франчайзинговым компаниям",
    image: "/slides/hero-3.jpg",
    buttonText: "Вступить",
    buttonUrl: "/membership",
    sortOrder: 3,
    isActive: false,
  },
];

const emptySlide: Omit<Slide, "id"> = {
  title: "",
  subtitle: "",
  image: "",
  buttonText: "",
  buttonUrl: "",
  sortOrder: 0,
  isActive: true,
};

export default function AdminSlidesPage() {
  const [slides, setSlides] = useState<Slide[]>(initialSlides);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState<Slide | null>(null);
  const [form, setForm] = useState<Omit<Slide, "id">>(emptySlide);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function openCreate() {
    setEditingSlide(null);
    setForm(emptySlide);
    setError("");
    setDialogOpen(true);
  }

  function openEdit(slide: Slide) {
    setEditingSlide(slide);
    setForm({
      title: slide.title,
      subtitle: slide.subtitle,
      image: slide.image,
      buttonText: slide.buttonText,
      buttonUrl: slide.buttonUrl,
      sortOrder: slide.sortOrder,
      isActive: slide.isActive,
    });
    setError("");
    setDialogOpen(true);
  }

  async function handleSave() {
    if (!form.title.trim()) {
      setError("Название обязательно");
      return;
    }
    setLoading(true);
    setError("");

    try {
      if (editingSlide) {
        // Update
        try {
          const res = await fetch(`/api/admin/slides/${editingSlide.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
          });
          if (res.ok) {
            const updated = await res.json();
            setSlides((prev) =>
              prev.map((s) => (s.id === editingSlide.id ? updated : s))
            );
          } else {
            throw new Error("API error");
          }
        } catch {
          // Fallback: update locally
          setSlides((prev) =>
            prev.map((s) =>
              s.id === editingSlide.id ? { ...s, ...form } : s
            )
          );
        }
      } else {
        // Create
        try {
          const res = await fetch("/api/admin/slides", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
          });
          if (res.ok) {
            const created = await res.json();
            setSlides((prev) => [...prev, created]);
          } else {
            throw new Error("API error");
          }
        } catch {
          // Fallback: create locally
          const newSlide: Slide = {
            ...form,
            id: Math.max(0, ...slides.map((s) => s.id)) + 1,
          };
          setSlides((prev) => [...prev, newSlide]);
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
    if (!confirm("Удалить этот слайд?")) return;

    try {
      await fetch(`/api/admin/slides/${id}`, { method: "DELETE" });
    } catch {
      // Continue with local deletion
    }
    setSlides((prev) => prev.filter((s) => s.id !== id));
  }

  function toggleActive(slide: Slide) {
    setSlides((prev) =>
      prev.map((s) =>
        s.id === slide.id ? { ...s, isActive: !s.isActive } : s
      )
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#333333]">Слайды</h2>
          <p className="text-gray-500 mt-1">
            Управление слайдами главного баннера
          </p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="h-4 w-4" />
          Добавить слайд
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Фото</TableHead>
                <TableHead>Название</TableHead>
                <TableHead>Подзаголовок</TableHead>
                <TableHead className="w-24">Порядок</TableHead>
                <TableHead className="w-24">Статус</TableHead>
                <TableHead className="w-28">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {slides.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-400">
                    Нет слайдов
                  </TableCell>
                </TableRow>
              ) : (
                slides.map((slide) => (
                  <TableRow key={slide.id}>
                    <TableCell>
                      <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                        {slide.image ? (
                          <img
                            src={slide.image}
                            alt={slide.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <ImageIcon className="h-4 w-4 text-gray-400" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{slide.title}</TableCell>
                    <TableCell className="text-gray-500 max-w-xs truncate">
                      {slide.subtitle}
                    </TableCell>
                    <TableCell>{slide.sortOrder}</TableCell>
                    <TableCell>
                      <button onClick={() => toggleActive(slide)}>
                        <Badge variant={slide.isActive ? "default" : "secondary"}>
                          {slide.isActive ? "Активен" : "Скрыт"}
                        </Badge>
                      </button>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEdit(slide)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(slide.id)}
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

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingSlide ? "Редактировать слайд" : "Добавить слайд"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="title">Название *</Label>
              <Input
                id="title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Название слайда"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subtitle">Подзаголовок</Label>
              <Input
                id="subtitle"
                value={form.subtitle}
                onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                placeholder="Описание слайда"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Изображение (URL)</Label>
              <Input
                id="image"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                placeholder="/slides/image.jpg"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="buttonText">Текст кнопки</Label>
                <Input
                  id="buttonText"
                  value={form.buttonText}
                  onChange={(e) =>
                    setForm({ ...form, buttonText: e.target.value })
                  }
                  placeholder="Подробнее"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="buttonUrl">URL кнопки</Label>
                <Input
                  id="buttonUrl"
                  value={form.buttonUrl}
                  onChange={(e) =>
                    setForm({ ...form, buttonUrl: e.target.value })
                  }
                  placeholder="/about"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sortOrder">Порядок сортировки</Label>
                <Input
                  id="sortOrder"
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
