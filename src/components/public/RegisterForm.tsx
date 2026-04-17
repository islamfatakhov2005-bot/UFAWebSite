"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";

interface RegisterData {
  email: string;
  firstName: string;
  lastName: string;
  companyName: string;
  username: string;
  password: string;
}

interface PasswordChecks {
  length: boolean;
  upper: boolean;
  digit: boolean;
}

function checkPassword(pwd: string): PasswordChecks {
  return {
    length: pwd.length >= 8,
    upper: /[A-Z]/.test(pwd),
    digit: /\d/.test(pwd),
  };
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
  } else if (!/^[a-zA-Z0-9_.]+$/.test(data.username)) {
    errors.username = "Только латиница, цифры, _ и .";
  }
  if (!data.password) {
    errors.password = "Введите пароль";
  } else {
    const checks = checkPassword(data.password);
    if (!checks.length || !checks.upper || !checks.digit) {
      errors.password = "Пароль не соответствует требованиям";
    }
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
  const [showPwdHint, setShowPwdHint] = useState(false);

  const pwdChecks = checkPassword(form.password);

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
          formType: "register",
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="py-8 text-center">
        <div className="w-14 h-14 bg-[#3ECF8E] flex items-center justify-center mx-auto mb-6 rounded-[3px]">
          <Check className="w-7 h-7 text-white" strokeWidth={3} />
        </div>
        <h3 className="text-lg font-bold text-[#0B2645] mb-3">
          Аккаунт создан
        </h3>
        <p className="text-sm text-[#4A5568] leading-[1.7] max-w-sm mx-auto">
          На ваш email отправлена ссылка подтверждения. После её активации вы
          получите доступ к порталу и базовым сервисам UFA.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {status === "error" && (
        <div className="bg-red-50 border border-red-300 text-red-700 p-4 text-sm rounded-[3px]">
          Не удалось создать аккаунт. Попробуйте позже или напишите на{" "}
          <a href="mailto:info@uzfranchise.uz" className="underline font-bold">
            info@uzfranchise.uz
          </a>
          {" "}/{" "}
          <a href="tel:+998992008272" className="underline font-bold">
            +998 99 200 8272
          </a>
          .
        </div>
      )}

      <div>
        <label className="label" htmlFor="reg-email">
          Email<span className="required">*</span>
        </label>
        <input
          id="reg-email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className={`input ${errors.email ? "is-invalid" : ""}`}
          placeholder="name@company.uz"
          autoComplete="email"
        />
        {errors.email && <p className="mt-1.5 text-xs text-red-600">{errors.email}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="label" htmlFor="reg-first">
            Имя<span className="required">*</span>
          </label>
          <input
            id="reg-first"
            type="text"
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            className={`input ${errors.firstName ? "is-invalid" : ""}`}
            placeholder="Ваше имя"
            autoComplete="given-name"
          />
          {errors.firstName && <p className="mt-1.5 text-xs text-red-600">{errors.firstName}</p>}
        </div>
        <div>
          <label className="label" htmlFor="reg-last">
            Фамилия<span className="required">*</span>
          </label>
          <input
            id="reg-last"
            type="text"
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            className={`input ${errors.lastName ? "is-invalid" : ""}`}
            placeholder="Ваша фамилия"
            autoComplete="family-name"
          />
          {errors.lastName && <p className="mt-1.5 text-xs text-red-600">{errors.lastName}</p>}
        </div>
      </div>

      <div>
        <label className="label" htmlFor="reg-company">
          Название компании<span className="required">*</span>
        </label>
        <input
          id="reg-company"
          type="text"
          value={form.companyName}
          onChange={(e) => setForm({ ...form, companyName: e.target.value })}
          className={`input ${errors.companyName ? "is-invalid" : ""}`}
          placeholder="ООО «Ваша компания»"
          autoComplete="organization"
        />
        {errors.companyName && <p className="mt-1.5 text-xs text-red-600">{errors.companyName}</p>}
      </div>

      <div>
        <label className="label" htmlFor="reg-username">
          Логин (username)<span className="required">*</span>
        </label>
        <input
          id="reg-username"
          type="text"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          className={`input ${errors.username ? "is-invalid" : ""}`}
          placeholder="dilshod.karimov"
          autoComplete="username"
        />
        <p className="mt-1.5 text-xs text-[#4A5568]">
          4+ символов, латиница, цифры, точка и подчёркивание.
        </p>
        {errors.username && <p className="mt-1.5 text-xs text-red-600">{errors.username}</p>}
      </div>

      <div>
        <label className="label" htmlFor="reg-password">
          Пароль<span className="required">*</span>
        </label>
        <input
          id="reg-password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          onFocus={() => setShowPwdHint(true)}
          className={`input ${errors.password ? "is-invalid" : ""}`}
          placeholder="Минимум 8 символов"
          autoComplete="new-password"
        />
        {(showPwdHint || form.password) && (
          <ul className="mt-3 space-y-1.5 text-xs">
            {[
              { ok: pwdChecks.length, text: "Минимум 8 символов" },
              { ok: pwdChecks.upper, text: "Одна заглавная буква (латиница)" },
              { ok: pwdChecks.digit, text: "Одна цифра" },
            ].map((item) => (
              <li key={item.text} className="flex items-center gap-2">
                {item.ok ? (
                  <Check className="w-3.5 h-3.5 text-[#3ECF8E]" strokeWidth={3} />
                ) : (
                  <X className="w-3.5 h-3.5 text-[#D5DCE5]" strokeWidth={3} />
                )}
                <span className={item.ok ? "text-[#0B2645]" : "text-[#4A5568]"}>{item.text}</span>
              </li>
            ))}
          </ul>
        )}
        {errors.password && <p className="mt-1.5 text-xs text-red-600">{errors.password}</p>}
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn btn-primary w-full py-3.5 mt-2 disabled:opacity-50"
      >
        {status === "loading" ? "Создаём аккаунт…" : "Создать аккаунт"}
      </button>
    </form>
  );
}
