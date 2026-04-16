"use client";

import { useState } from "react";

interface ApplyData {
  firstName: string;
  lastName: string;
  title: string;
  company: string;
  website: string;
  phone: string;
  email: string;
  membershipType: string;
}

const membershipTypes = [
  { value: "", label: "Выберите тип членства" },
  { value: "franchisor", label: "Франчайзер (владелец бренда)" },
  { value: "franchisee", label: "Франчайзи (владелец точки)" },
  { value: "supplier", label: "Поставщик услуг" },
];

function validate(data: ApplyData): Partial<Record<keyof ApplyData, string>> {
  const errors: Partial<Record<keyof ApplyData, string>> = {};
  if (!data.firstName.trim()) errors.firstName = "Введите имя";
  if (!data.lastName.trim()) errors.lastName = "Введите фамилию";
  if (!data.title.trim()) errors.title = "Введите должность";
  if (!data.company.trim()) errors.company = "Введите название компании";
  if (!data.phone.trim()) errors.phone = "Введите телефон";
  if (!data.email.trim()) {
    errors.email = "Введите email";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Некорректный email";
  }
  if (!data.membershipType) errors.membershipType = "Выберите тип членства";
  return errors;
}

export default function ApplyForm() {
  const [form, setForm] = useState<ApplyData>({
    firstName: "",
    lastName: "",
    title: "",
    company: "",
    website: "",
    phone: "",
    email: "",
    membershipType: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ApplyData, string>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setStatus("loading");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${form.firstName} ${form.lastName}`,
          email: form.email,
          phone: form.phone,
          company: form.company,
          subject: "membership",
          message: `Должность: ${form.title}\nСайт: ${form.website || "—"}\nТип членства: ${form.membershipType}`,
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({
        firstName: "",
        lastName: "",
        title: "",
        company: "",
        website: "",
        phone: "",
        email: "",
        membershipType: "",
      });
    } catch {
      setStatus("error");
    }
  };

  const input = (field: keyof ApplyData) =>
    `w-full px-4 py-3 rounded border ${
      errors[field] ? "border-red-400 bg-red-50" : "border-gray-200 bg-white"
    } focus:outline-none focus:ring-2 focus:ring-[#3ECF8E]/40 focus:border-[#3ECF8E] transition-colors text-sm`;

  const label = "block text-xs font-semibold uppercase tracking-[0.08em] text-[#1A2332] mb-2";

  if (status === "success") {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-[#3ECF8E] rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="section-heading green-underline-center mb-8">
          Заявка принята
        </h3>
        <p className="text-[#020409] text-sm leading-[1.8] mt-8">
          Спасибо! Менеджер команды членства UFA свяжется с вами в течение
          рабочего дня, чтобы подобрать оптимальный тариф и ответить на вопросы.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {status === "error" && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded p-4 text-sm">
          Не удалось отправить заявку. Попробуйте позже или позвоните: +998 71 234 56 79
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className={label}>
            Имя <span className="text-[#3ECF8E]">*</span>
          </label>
          <input
            type="text"
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            className={input("firstName")}
            placeholder="Дилшод"
          />
          {errors.firstName && (
            <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>
          )}
        </div>
        <div>
          <label className={label}>
            Фамилия <span className="text-[#3ECF8E]">*</span>
          </label>
          <input
            type="text"
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            className={input("lastName")}
            placeholder="Каримов"
          />
          {errors.lastName && (
            <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>
          )}
        </div>
      </div>

      <div>
        <label className={label}>
          Должность <span className="text-[#3ECF8E]">*</span>
        </label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className={input("title")}
          placeholder="Генеральный директор"
        />
        {errors.title && (
          <p className="mt-1 text-xs text-red-500">{errors.title}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className={label}>
            Компания <span className="text-[#3ECF8E]">*</span>
          </label>
          <input
            type="text"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            className={input("company")}
            placeholder="ООО «Ваша компания»"
          />
          {errors.company && (
            <p className="mt-1 text-xs text-red-500">{errors.company}</p>
          )}
        </div>
        <div>
          <label className={label}>Сайт компании</label>
          <input
            type="url"
            value={form.website}
            onChange={(e) => setForm({ ...form, website: e.target.value })}
            className={input("website")}
            placeholder="https://company.uz"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className={label}>
            Телефон <span className="text-[#3ECF8E]">*</span>
          </label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className={input("phone")}
            placeholder="+998 90 123 45 67"
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
          )}
        </div>
        <div>
          <label className={label}>
            Email <span className="text-[#3ECF8E]">*</span>
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={input("email")}
            placeholder="name@company.uz"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email}</p>
          )}
        </div>
      </div>

      <div>
        <label className={label}>
          Тип членства <span className="text-[#3ECF8E]">*</span>
        </label>
        <select
          value={form.membershipType}
          onChange={(e) => setForm({ ...form, membershipType: e.target.value })}
          className={input("membershipType")}
        >
          {membershipTypes.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
        {errors.membershipType && (
          <p className="mt-1 text-xs text-red-500">{errors.membershipType}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-[#3ECF8E] hover:bg-[#35B67A] disabled:opacity-50 text-white py-4 rounded font-bold text-sm uppercase tracking-[0.08em] transition-colors"
      >
        {status === "loading" ? "Отправляем…" : "Отправить заявку"}
      </button>
    </form>
  );
}
