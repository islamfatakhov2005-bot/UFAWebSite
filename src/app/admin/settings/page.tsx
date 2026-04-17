"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Save, Globe, Phone, Mail, MapPin } from "lucide-react";

interface SettingsForm {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  telegramUrl: string;
  instagramUrl: string;
  facebookUrl: string;
  linkedinUrl: string;
  youtubeUrl: string;
}

const defaultSettings: SettingsForm = {
  siteName: "Uzbekistan Franchising Association",
  siteDescription: "Развиваем франчайзинг в Узбекистане",
  contactEmail: "info@uzfranchise.uz",
  contactPhone: "+998 71 123 45 67",
  address: "Ташкент, Узбекистан",
  telegramUrl: "https://t.me/ufa_uz",
  instagramUrl: "https://instagram.com/ufa_uz",
  facebookUrl: "https://facebook.com/ufauz",
  linkedinUrl: "https://linkedin.com/company/ufa-uz",
  youtubeUrl: "",
};

export default function AdminSettingsPage() {
  const [form, setForm] = useState<SettingsForm>(defaultSettings);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(
    null
  );

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/settings");
      if (res.ok) {
        const data = await res.json();
        setForm((prev) => ({ ...prev, ...data }));
      }
    } catch {
      // Use default settings
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setMessage({ type: "success", text: "Настройки сохранены успешно" });
      } else {
        throw new Error("Save failed");
      }
    } catch {
      setMessage({
        type: "error",
        text: "Ошибка при сохранении настроек",
      });
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(null), 3000);
    }
  }

  function updateField(key: keyof SettingsForm, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12 text-gray-400">
        Загрузка настроек...
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h2 className="text-2xl font-bold text-[#333333]">Настройки</h2>
        <p className="text-gray-500 mt-1">Общие настройки сайта</p>
      </div>

      {message && (
        <div
          className={`rounded-lg p-3 text-sm ${
            message.type === "success"
              ? "bg-green-50 border border-green-200 text-green-700"
              : "bg-red-50 border border-red-200 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* General */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Основные
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="siteName">Название сайта</Label>
              <Input
                id="siteName"
                value={form.siteName}
                onChange={(e) => updateField("siteName", e.target.value)}
                placeholder="Uzbekistan Franchising Association"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="siteDescription">Описание сайта</Label>
              <Textarea
                id="siteDescription"
                value={form.siteDescription}
                onChange={(e) => updateField("siteDescription", e.target.value)}
                placeholder="Краткое описание сайта"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Контактные данные
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contactEmail">
                  <Mail className="h-3.5 w-3.5 inline mr-1" />
                  Email
                </Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={form.contactEmail}
                  onChange={(e) => updateField("contactEmail", e.target.value)}
                  placeholder="info@uzfranchise.uz"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactPhone">
                  <Phone className="h-3.5 w-3.5 inline mr-1" />
                  Телефон
                </Label>
                <Input
                  id="contactPhone"
                  value={form.contactPhone}
                  onChange={(e) => updateField("contactPhone", e.target.value)}
                  placeholder="+998 71 123 45 67"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">
                <MapPin className="h-3.5 w-3.5 inline mr-1" />
                Адрес
              </Label>
              <Input
                id="address"
                value={form.address}
                onChange={(e) => updateField("address", e.target.value)}
                placeholder="Ташкент, Узбекистан"
              />
            </div>
          </CardContent>
        </Card>

        {/* Social */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Социальные сети</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="telegramUrl">Telegram</Label>
                <Input
                  id="telegramUrl"
                  value={form.telegramUrl}
                  onChange={(e) => updateField("telegramUrl", e.target.value)}
                  placeholder="https://t.me/..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instagramUrl">Instagram</Label>
                <Input
                  id="instagramUrl"
                  value={form.instagramUrl}
                  onChange={(e) => updateField("instagramUrl", e.target.value)}
                  placeholder="https://instagram.com/..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="facebookUrl">Facebook</Label>
                <Input
                  id="facebookUrl"
                  value={form.facebookUrl}
                  onChange={(e) => updateField("facebookUrl", e.target.value)}
                  placeholder="https://facebook.com/..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedinUrl">LinkedIn</Label>
                <Input
                  id="linkedinUrl"
                  value={form.linkedinUrl}
                  onChange={(e) => updateField("linkedinUrl", e.target.value)}
                  placeholder="https://linkedin.com/..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="youtubeUrl">YouTube</Label>
                <Input
                  id="youtubeUrl"
                  value={form.youtubeUrl}
                  onChange={(e) => updateField("youtubeUrl", e.target.value)}
                  placeholder="https://youtube.com/..."
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={saving}>
            <Save className="h-4 w-4" />
            {saving ? "Сохранение..." : "Сохранить настройки"}
          </Button>
        </div>
      </form>
    </div>
  );
}
