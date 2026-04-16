"use client";

import { useState } from "react";

interface RegisterData {
  email: string;
  firstName: string;
  lastName: string;
  companyName: string;
  username: string;
  password: string;
}

function validate(data: RegisterData): Partial<Record<keyof RegisterData, string>> {
  const errors: Partial<Record<keyof RegisterData, string>> = {};
  if (!data.email.trim()) {
    errors.email = "Введите email";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Некорректный email";
  }
  if (!data.firstName.trim()) errors.firstName = "Введите имя";
  if (!data.lastName.trim()) errors.lastName = "Введите фамилию";
  if (!data.companyName.trim()) errors.companyName = "Введите название компании";
  if (!data.username.trim()) {
    errors.username = "Введите логин";
  } else if (data.username.length < 4) {
    errors.username = "Минимум 4 символа";
  }
  if (!data.password) {
    errors.password = "Введите пароль";
  } else if (data.password.length < 8) {
    errors.password = "Минимум 8 символов";
  }
  return errors;
}

export default function RegisterForm() {
  const [form, setForm] = useState<RegisterData>({
    email: "",
    firstName: "",
    lastName: "",
    companyName: "",
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof RegisterData, string>>>({});
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
          phone: "",
          company: form.companyName,
          subject: "registration",
          message: `Логин: ${form.username}`,
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const input = (field: keyof RegisterData) =>
    `w-full px-4 py-3 rounded border ${
      errors[field] ? "border-red-400 bg-red-50" : "border-gray-200 bg-white"
    } focus:outline-none focus:ring-2 focus:ring-[#3ECF8E]/40 focus:border-[#3ECF8E] transition-colors text-sm`;

  const label = "block text-xs font-semibold uppercase tracking-[0.08em] text-[#1A2332] mb-2";

  if (status === "success") {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-[#3ECF8E] rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-base font-semibold uppercase tracking-[0.08em] text-[#1A2332] mb-4">
          Аккаунт создан
        </h3>
        <p className="text-[#020409] text-sm leading-[1.8]">
          Проверьте email — мы отправили ссылку для подтверждения аккаунта и
          первые шаги работы с порталом UFA.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {status === "error" && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded p-4 text-sm">
          Не удалось создать аккаунт. Попробуйте позже.
        </div>
      )}

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
          autoComplete="email"
        />
        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
      </div>

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
            autoComplete="given-name"
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
            autoComplete="family-name"
          />
          {errors.lastName && (
            <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>
          )}
        </div>
      </div>

      <div>
        <label className={label}>
          Компания <span className="text-[#3ECF8E]">*</span>
        </label>
        <input
          type="text"
          value={form.companyName}
          onChange={(e) => setForm({ ...form, companyName: e.target.value })}
          className={input("companyName")}
          placeholder="ООО «Ваша компания»"
          autoComplete="organization"
        />
        {errors.companyName && (
          <p className="mt-1 text-xs text-red-500">{errors.companyName}</p>
        )}
      </div>

      <div>
        <label className={label}>
          Логин <span className="text-[#3ECF8E]">*</span>
        </label>
        <input
          type="text"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          className={input("username")}
          placeholder="dilshod_karimov"
          autoComplete="username"
        />
        {errors.username && (
          <p className="mt-1 text-xs text-red-500">{errors.username}</p>
        )}
      </div>

      <div>
        <label className={label}>
          Пароль <span className="text-[#3ECF8E]">*</span>
        </label>
        <input
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className={input("password")}
          placeholder="Минимум 8 символов"
          autoComplete="new-password"
        />
        {errors.password && (
          <p className="mt-1 text-xs text-red-500">{errors.password}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-[#3ECF8E] hover:bg-[#35B67A] disabled:opacity-50 text-white py-4 rounded font-bold text-sm uppercase tracking-[0.08em] transition-colors"
      >
        {status === "loading" ? "Создаём аккаунт…" : "Создать аккаунт"}
      </button>
    </form>
  );
}
