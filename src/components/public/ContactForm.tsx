"use client";

import { useState, useCallback } from "react";
import { Send } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
}

const subjects = [
  { value: "", label: "Выберите тему" },
  { value: "general", label: "Общий вопрос" },
  { value: "membership", label: "Членство" },
  { value: "partnership", label: "Партнёрство" },
  { value: "events", label: "Мероприятия" },
];

function validateField(field: keyof FormData, value: string): string | null {
  switch (field) {
    case "name":
      return value.trim() ? null : "Введите ваше имя";
    case "email":
      if (!value.trim()) return "Введите email";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        return "Проверьте email — кажется, пропущен символ @";
      return null;
    case "subject":
      return value ? null : "Выберите тему обращения";
    case "message":
      return value.trim() ? null : "Напишите ваше сообщение";
    default:
      return null;
  }
}

export default function ContactForm() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    for (const field of ["name", "email", "subject", "message"] as (keyof FormData)[]) {
      const error = validateField(field, form[field]);
      if (error) newErrors[field] = error;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Ошибка отправки");

      setStatus("success");
      setForm({ name: "", email: "", phone: "", company: "", subject: "", message: "" });
      setTouched({});
      setErrors({});
    } catch {
      setStatus("error");
    }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    // Clear error on change if field was touched
    if (touched[field] && errors[field]) {
      const error = validateField(field, value);
      setErrors((prev) => {
        const next = { ...prev };
        if (error) {
          next[field] = error;
        } else {
          delete next[field];
        }
        return next;
      });
    }
  };

  const handleBlur = useCallback(
    (field: keyof FormData) => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      const error = validateField(field, form[field]);
      if (error) {
        setErrors((prev) => ({ ...prev, [field]: error }));
      } else {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[field];
          return next;
        });
      }
    },
    [form]
  );

  const inputClass = (field: keyof FormData) =>
    `w-full px-4 py-3 rounded-lg border ${
      errors[field] ? "border-red-400 bg-red-50" : "border-gray-200 bg-white"
    } focus:outline-none focus:ring-2 focus:ring-[#3ECF8E]/50 focus:border-[#3ECF8E] transition-colors text-sm`;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {status === "success" && (
        <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-4 text-sm">
          Заявка отправлена! Наш менеджер свяжется с вами в течение 1 рабочего дня.
        </div>
      )}
      {status === "error" && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 text-sm">
          Не удалось отправить сообщение. Попробуйте позже или позвоните нам: +998 71 234 56 78
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Имя <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            onBlur={() => handleBlur("name")}
            className={inputClass("name")}
            placeholder="Ваше имя"
          />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Email <span className="text-red-400">*</span>
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            onBlur={() => handleBlur("email")}
            className={inputClass("email")}
            placeholder="name@company.uz"
          />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Телефон <span className="text-gray-400 font-normal">(необязательно)</span>
          </label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            className={inputClass("phone")}
            placeholder="+998 90 123 45 67"
          />
          <p className="mt-1 text-xs text-gray-400">Для связи по вашему вопросу</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Компания <span className="text-gray-400 font-normal">(необязательно)</span>
          </label>
          <input
            type="text"
            value={form.company}
            onChange={(e) => handleChange("company", e.target.value)}
            className={inputClass("company")}
            placeholder="Название компании"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Тема <span className="text-red-400">*</span>
        </label>
        <select
          value={form.subject}
          onChange={(e) => handleChange("subject", e.target.value)}
          onBlur={() => handleBlur("subject")}
          className={inputClass("subject")}
        >
          {subjects.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
        {errors.subject && <p className="mt-1 text-xs text-red-500">{errors.subject}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Сообщение <span className="text-red-400">*</span>
        </label>
        <textarea
          value={form.message}
          onChange={(e) => handleChange("message", e.target.value)}
          onBlur={() => handleBlur("message")}
          className={`${inputClass("message")} min-h-[140px] resize-y`}
          placeholder="Опишите ваш вопрос или запрос..."
          rows={5}
        />
        {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
      </div>

      <div>
        <button
          type="submit"
          disabled={status === "loading"}
          className="bg-gradient-to-r from-[#3ECF8E] to-[#4AADAD] hover:from-[#35B67A] hover:to-[#3E9999] text-white px-8 py-3.5 rounded-lg font-semibold text-sm transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-[#3ECF8E]/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {status === "loading" ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Отправляем заявку...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Отправить заявку
            </>
          )}
        </button>
        <p className="mt-3 text-xs text-gray-400">
          Мы не передаём ваши данные третьим лицам. Ответим в течение 24 часов.
        </p>
      </div>
    </form>
  );
}
