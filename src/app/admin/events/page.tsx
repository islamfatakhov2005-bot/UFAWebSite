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
import { Plus, Pencil, Trash2, MapPin } from "lucide-react";

interface EventItem {
  id: number;
  title: string;
  slug: string;
  description: string;
  image: string;
  location: string;
  startDate: string;
  endDate: string;
  registrationUrl: string;
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

const initialEvents: EventItem[] = [
  {
    id: 1,
    title: "Franchise Expo Uzbekistan 2026",
    slug: "franchise-expo-2026",
    description: "Главная международная выставка франшиз",
    image: "/events/expo.jpg",
    location: "Ташкент, Uzexpocentre",
    startDate: "2026-09-15",
    endDate: "2026-09-17",
    registrationUrl: "https://expo.ufa.uz",
    isPublished: true,
    createdAt: "2026-03-01T10:00:00Z",
  },
  {
    id: 2,
    title: "Мастер-класс: Как запустить франшизу",
    slug: "masterclass-franchise-launch",
    description: "Практический семинар для предпринимателей",
    image: "/events/masterclass.jpg",
    location: "Ташкент, Hilton Hotel",
    startDate: "2026-05-20",
    endDate: "",
    registrationUrl: "",
    isPublished: true,
    createdAt: "2026-04-01T10:00:00Z",
  },
  {
    id: 3,
    title: "Годовое собрание членов UFA",
    slug: "annual-meeting-2026",
    description: "Ежегодное собрание членов ассоциации",
    image: "",
    location: "Ташкент",
    startDate: "2026-12-10",
    endDate: "2026-12-10",
    registrationUrl: "",
    isPublished: false,
    createdAt: "2026-04-02T10:00:00Z",
  },
];

const emptyForm = {
  title: "",
  slug: "",
  description: "",
  image: "",
  location: "",
  startDate: "",
  endDate: "",
  registrationUrl: "",
  isPublished: false,
};

export default function AdminEventsPage() {
  const [events, setEvents] = useState<EventItem[]>(initialEvents);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<EventItem | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function openCreate() {
    setEditing(null);
    setForm(emptyForm);
    setError("");
    setDialogOpen(true);
  }

  function openEdit(item: EventItem) {
    setEditing(item);
    setForm({
      title: item.title,
      slug: item.slug,
      description: item.description,
      image: item.image,
      location: item.location,
      startDate: item.startDate,
      endDate: item.endDate,
      registrationUrl: item.registrationUrl,
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
    if (!form.startDate) {
      setError("Дата начала обязательна");
      return;
    }
    setLoading(true);
    setError("");

    try {
      if (editing) {
        try {
          const res = await fetch(`/api/admin/events/${editing.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
          });
          if (res.ok) {
            const updated = await res.json();
            setEvents((prev) => prev.map((e) => (e.id === editing.id ? updated : e)));
          } else {
            throw new Error("API error");
          }
        } catch {
          setEvents((prev) =>
            prev.map((e) => (e.id === editing.id ? { ...e, ...form } : e))
          );
        }
      } else {
        try {
          const res = await fetch("/api/admin/events", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
          });
          if (res.ok) {
            const created = await res.json();
            setEvents((prev) => [...prev, created]);
          } else {
            throw new Error("API error");
          }
        } catch {
          const newItem: EventItem = {
            ...form,
            id: Math.max(0, ...events.map((e) => e.id)) + 1,
            createdAt: new Date().toISOString(),
          };
          setEvents((prev) => [...prev, newItem]);
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
    if (!confirm("Удалить это мероприятие?")) return;
    try {
      await fetch(`/api/admin/events/${id}`, { method: "DELETE" });
    } catch {
      // Continue
    }
    setEvents((prev) => prev.filter((e) => e.id !== id));
  }

  function formatDate(dateStr: string) {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  function getEventStatus(event: EventItem) {
    const now = new Date();
    const start = new Date(event.startDate);
    const end = event.endDate ? new Date(event.endDate) : start;

    if (!event.isPublished) return { label: "Черновик", variant: "secondary" as const };
    if (now < start) return { label: "Предстоит", variant: "default" as const };
    if (now >= start && now <= end) return { label: "Идёт", variant: "default" as const };
    return { label: "Завершено", variant: "outline" as const };
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#333333]">Мероприятия</h2>
          <p className="text-gray-500 mt-1">Управление мероприятиями и событиями</p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="h-4 w-4" />
          Добавить мероприятие
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Название</TableHead>
                <TableHead>Место</TableHead>
                <TableHead>Даты</TableHead>
                <TableHead className="w-28">Статус</TableHead>
                <TableHead className="w-28">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-gray-400">
                    Нет мероприятий
                  </TableCell>
                </TableRow>
              ) : (
                events.map((event) => {
                  const status = getEventStatus(event);
                  return (
                    <TableRow key={event.id}>
                      <TableCell>
                        <p className="font-medium">{event.title}</p>
                        <p className="text-xs text-gray-400">/{event.slug}</p>
                      </TableCell>
                      <TableCell>
                        {event.location && (
                          <div className="flex items-center gap-1 text-gray-500 text-sm">
                            <MapPin className="h-3.5 w-3.5" />
                            {event.location}
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="text-gray-500 text-sm">
                        {formatDate(event.startDate)}
                        {event.endDate && event.endDate !== event.startDate && (
                          <> — {formatDate(event.endDate)}</>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant={status.variant}>{status.label}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm" onClick={() => openEdit(event)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(event.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editing ? "Редактировать мероприятие" : "Добавить мероприятие"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4 max-h-[60vh] overflow-y-auto">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="event-title">Название *</Label>
              <Input
                id="event-title"
                value={form.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Название мероприятия"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="event-slug">Slug</Label>
              <Input
                id="event-slug"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                placeholder="event-slug"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="event-desc">Описание</Label>
              <Textarea
                id="event-desc"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Описание мероприятия..."
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="event-image">Изображение (URL)</Label>
              <Input
                id="event-image"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                placeholder="/events/image.jpg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="event-location">Место проведения</Label>
              <Input
                id="event-location"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder="Ташкент, Узбекистан"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="event-start">Дата начала *</Label>
                <Input
                  id="event-start"
                  type="date"
                  value={form.startDate}
                  onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="event-end">Дата окончания</Label>
                <Input
                  id="event-end"
                  type="date"
                  value={form.endDate}
                  onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="event-reg">URL регистрации</Label>
              <Input
                id="event-reg"
                value={form.registrationUrl}
                onChange={(e) => setForm({ ...form, registrationUrl: e.target.value })}
                placeholder="https://..."
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="event-published"
                checked={form.isPublished}
                onChange={(e) => setForm({ ...form, isPublished: e.target.checked })}
                className="rounded border-gray-300"
              />
              <Label htmlFor="event-published">Опубликовать</Label>
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
