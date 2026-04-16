"use client";

import { useState } from "react";
import { Check } from "lucide-react";

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
          formType: "membership_apply",
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

  if (status === "success") {
    return (
      <div className="text-center py-12">
        <div className="w-14 h-14 bg-[#3ECF8E] flex items-center justify-center mx-auto mb-6 rounded-[3px]">
          <Check className="w-7 h-7 text-white" strokeWidth={3} />
        </div>
        <h3 className="text-lg font-bold text-[#0B2645] mb-3">Заявка принята</h3>
        <p className="text-sm text-[#4A5568] leading-[1.7] max-w-sm mx-auto">
          Спасибо! Менеджер команды членства UFA свяжется с вами в течение
          рабочего дня, чтобы подобрать оптимальный тариф и ответить на вопросы.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {status === "error" && (
        <div className="bg-red-50 border border-red-300 text-red-700 p-4 text-sm rounded-[3px]">
          Не удалось отправить заявку. Попробуйте позже или позвоните:{" "}
          <a href="tel:+998712345679" className="font-bold underline">
            +998 71 234 56 79
          </a>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="label" htmlFor="ap-first">
            Имя<span className="required">*</span>
          </label>
          <input
            id="ap-first"
            type="text"
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            className={`input ${errors.firstName ? "is-invalid" : ""}`}
            placeholder="Дилшод"
          />
          {errors.firstName && <p className="mt-1.5 text-xs text-red-600">{errors.firstName}</p>}
        </div>
        <div>
          <label className="label" htmlFor="ap-last">
            Фамилия<span className="required">*</span>
          </label>
          <input
            id="ap-last"
            type="text"
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            className={`input ${errors.lastName ? "is-invalid" : ""}`}
            placeholder="Каримов"
          />
          {errors.lastName && <p className="mt-1.5 text-xs text-red-600">{errors.lastName}</p>}
        </div>
      </div>

      <div>
        <label className="label" htmlFor="ap-title">
          Должность<span className="required">*</span>
        </label>
        <input
          id="ap-title"
          type="text"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className={`input ${errors.title ? "is-invalid" : ""}`}
          placeholder="Генеральный директор"
        />
        {errors.title && <p className="mt-1.5 text-xs text-red-600">{errors.title}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="label" htmlFor="ap-company">
            Компания<span className="required">*</span>
          </label>
          <input
            id="ap-company"
            type="text"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            className={`input ${errors.company ? "is-invalid" : ""}`}
            placeholder="ООО «Ваша компания»"
          />
          {errors.company && <p className="mt-1.5 text-xs text-red-600">{errors.company}</p>}
        </div>
        <div>
          <label className="label" htmlFor="ap-website">Сайт компании</label>
          <input
            id="ap-website"
            type="url"
            value={form.website}
            onChange={(e) => setForm({ ...form, website: e.target.value })}
            className="input"
            placeholder="https://company.uz"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="label" htmlFor="ap-phone">
            Телефон<span className="required">*</span>
          </label>
          <input
            id="ap-phone"
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className={`input ${errors.phone ? "is-invalid" : ""}`}
            placeholder="+998 90 123 45 67"
          />
          {errors.phone && <p className="mt-1.5 text-xs text-red-600">{errors.phone}</p>}
        </div>
        <div>
          <label className="label" htmlFor="ap-email">
            Email<span className="required">*</span>
          </label>
          <input
            id="ap-email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={`input ${errors.email ? "is-invalid" : ""}`}
            placeholder="name@company.uz"
          />
          {errors.email && <p className="mt-1.5 text-xs text-red-600">{errors.email}</p>}
        </div>
      </div>

      <div>
        <label className="label" htmlFor="ap-type">
          Тип членства<span className="required">*</span>
        </label>
        <select
          id="ap-type"
          value={form.membershipType}
          onChange={(e) => setForm({ ...form, membershipType: e.target.value })}
          className={`input ${errors.membershipType ? "is-invalid" : ""}`}
        >
          {membershipTypes.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
        {errors.membershipType && (
          <p className="mt-1.5 text-xs text-red-600">{errors.membershipType}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn btn-primary w-full py-3.5 disabled:opacity-50"
      >
        {status === "loading" ? "Отправляем…" : "Отправить заявку"}
      </button>
    </form>
  );
}
