"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
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
import { Separator } from "@/components/ui/separator";
import {
  Mail,
  Phone,
  Building2,
  Calendar,
  CheckCheck,
  Eye,
} from "lucide-react";

interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
  formType: string;
  isRead: boolean;
  sentToCrm: boolean;
  createdAt: string;
}

const formTypeLabels: Record<string, string> = {
  contact: "Контакт",
  partnership: "Партнёрство",
  event: "Мероприятие",
  membership: "Членство",
};

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [filterType, setFilterType] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeads();
  }, []);

  async function fetchLeads() {
    setLoading(true);
    try {
      const res = await fetch("/api/leads");
      if (res.ok) {
        const data = await res.json();
        setLeads(data);
      }
    } catch {
      console.error("Failed to fetch leads");
    } finally {
      setLoading(false);
    }
  }

  function openDetail(lead: Lead) {
    setSelectedLead(lead);
    setDetailOpen(true);
    if (!lead.isRead) {
      markAsRead(lead.id);
    }
  }

  async function markAsRead(id: number) {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, isRead: true } : l))
    );
    try {
      await fetch(`/api/admin/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isRead: true }),
      });
    } catch {
      // Local state already updated
    }
  }

  const filteredLeads =
    filterType === "all"
      ? leads
      : leads.filter((l) => l.formType === filterType);

  const unreadCount = leads.filter((l) => !l.isRead).length;

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div>
            <h2 className="text-2xl font-bold text-[#333333]">Заявки</h2>
            <p className="text-gray-500 mt-1">Заявки с сайта</p>
          </div>
          {unreadCount > 0 && (
            <Badge className="text-sm">
              {unreadCount} новых
            </Badge>
          )}
        </div>
        <Select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="w-48"
        >
          <option value="all">Все типы</option>
          <option value="contact">Контакт</option>
          <option value="partnership">Партнёрство</option>
          <option value="event">Мероприятие</option>
          <option value="membership">Членство</option>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="text-center py-12 text-gray-400">Загрузка...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Имя</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Телефон</TableHead>
                  <TableHead>Компания</TableHead>
                  <TableHead>Тип</TableHead>
                  <TableHead>Дата</TableHead>
                  <TableHead className="w-24">Статус</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeads.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-400">
                      Нет заявок
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredLeads.map((lead) => (
                    <TableRow
                      key={lead.id}
                      className={`cursor-pointer ${!lead.isRead ? "bg-blue-50/50" : ""}`}
                      onClick={() => openDetail(lead)}
                    >
                      <TableCell className="font-medium">
                        {lead.name}
                      </TableCell>
                      <TableCell className="text-gray-500">{lead.email}</TableCell>
                      <TableCell className="text-gray-500">
                        {lead.phone || "—"}
                      </TableCell>
                      <TableCell className="text-gray-500">
                        {lead.company || "—"}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {formTypeLabels[lead.formType] || lead.formType}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-500 text-sm">
                        {formatDate(lead.createdAt)}
                      </TableCell>
                      <TableCell>
                        {lead.isRead ? (
                          <Badge variant="outline">
                            <CheckCheck className="h-3 w-3 mr-1" />
                            Прочитано
                          </Badge>
                        ) : (
                          <Badge>Новая</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Lead detail dialog */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent>
          {selectedLead && (
            <>
              <DialogHeader>
                <DialogTitle>Заявка от {selectedLead.name}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <a
                      href={`mailto:${selectedLead.email}`}
                      className="text-[#3ECF8E] hover:underline"
                    >
                      {selectedLead.email}
                    </a>
                  </div>
                  {selectedLead.phone && (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <a
                        href={`tel:${selectedLead.phone}`}
                        className="text-[#3ECF8E] hover:underline"
                      >
                        {selectedLead.phone}
                      </a>
                    </div>
                  )}
                  {selectedLead.company && (
                    <div className="flex items-center gap-2 text-sm">
                      <Building2 className="h-4 w-4 text-gray-400" />
                      <span>{selectedLead.company}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>{formatDate(selectedLead.createdAt)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="secondary">
                    {formTypeLabels[selectedLead.formType] || selectedLead.formType}
                  </Badge>
                  {selectedLead.sentToCrm && (
                    <Badge variant="outline">Отправлено в CRM</Badge>
                  )}
                </div>

                {selectedLead.subject && (
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Тема</p>
                    <p className="text-sm font-medium">{selectedLead.subject}</p>
                  </div>
                )}

                <Separator />

                <div>
                  <p className="text-xs text-gray-400 mb-2">Сообщение</p>
                  <div className="bg-gray-50 rounded-lg p-4 text-sm leading-relaxed whitespace-pre-wrap">
                    {selectedLead.message}
                  </div>
                </div>
              </div>
              <DialogFooter>
                {!selectedLead.isRead && (
                  <Button
                    variant="ghost"
                    onClick={() => {
                      markAsRead(selectedLead.id);
                      setSelectedLead({ ...selectedLead, isRead: true });
                    }}
                  >
                    <Eye className="h-4 w-4" />
                    Отметить как прочитанное
                  </Button>
                )}
                <Button onClick={() => setDetailOpen(false)}>Закрыть</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
