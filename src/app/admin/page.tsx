"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Calendar,
  Building2,
  MessageSquare,
  Plus,
  ArrowRight,
} from "lucide-react";

const stats = [
  { label: "Новости", value: "24", icon: FileText, color: "from-blue-500 to-blue-600" },
  { label: "Мероприятия", value: "8", icon: Calendar, color: "from-purple-500 to-purple-600" },
  { label: "Партнёры", value: "32", icon: Building2, color: "from-emerald-500 to-emerald-600" },
  { label: "Новые заявки", value: "5", icon: MessageSquare, color: "from-orange-500 to-orange-600" },
];

const recentLeads = [
  { id: 1, name: "Алексей Петров", email: "alex@example.com", formType: "contact", date: "Сегодня", isRead: false },
  { id: 2, name: "Мария Иванова", email: "maria@example.com", formType: "partnership", date: "Вчера", isRead: true },
  { id: 3, name: "Дмитрий Сидоров", email: "dmitry@example.com", formType: "contact", date: "2 дня назад", isRead: false },
  { id: 4, name: "Елена Козлова", email: "elena@example.com", formType: "event", date: "3 дня назад", isRead: false },
  { id: 5, name: "Руслан Абдуллаев", email: "ruslan@example.com", formType: "membership", date: "4 дня назад", isRead: true },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Greeting */}
      <div>
        <h2 className="text-2xl font-bold text-[#333333]">
          Добро пожаловать в панель управления UFA
        </h2>
        <p className="text-gray-500 mt-1">
          Управляйте контентом и заявками вашего сайта
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                    <p className="text-3xl font-bold text-[#333333] mt-1">
                      {stat.value}
                    </p>
                  </div>
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick actions */}
      <div className="flex flex-wrap gap-3">
        <Link href="/admin/news">
          <Button>
            <Plus className="h-4 w-4" />
            Добавить новость
          </Button>
        </Link>
        <Link href="/admin/events">
          <Button variant="outline">
            <Plus className="h-4 w-4" />
            Добавить мероприятие
          </Button>
        </Link>
      </div>

      {/* Recent leads */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Последние заявки</CardTitle>
          <Link href="/admin/leads">
            <Button variant="ghost" size="sm">
              Все заявки
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Имя</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Тип</TableHead>
                <TableHead>Дата</TableHead>
                <TableHead>Статус</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentLeads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell className="font-medium">{lead.name}</TableCell>
                  <TableCell>{lead.email}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{lead.formType}</Badge>
                  </TableCell>
                  <TableCell className="text-gray-500">{lead.date}</TableCell>
                  <TableCell>
                    {lead.isRead ? (
                      <Badge variant="outline">Прочитано</Badge>
                    ) : (
                      <Badge>Новая</Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
