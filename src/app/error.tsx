"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="text-center max-w-lg">
        <div className="mx-auto w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-6">
          <svg
            className="w-8 h-8 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
            />
          </svg>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1A2332] font-heading">
          Произошла ошибка
        </h1>
        <p className="mt-3 text-base text-gray-500 font-body">
          Что-то пошло не так при загрузке страницы. Попробуйте обновить или
          вернитесь на главную.
        </p>
        {error?.message && (
          <div className="mt-4 rounded-lg bg-gray-50 border border-gray-200 px-4 py-3">
            <p className="text-sm text-gray-600 font-mono break-words">
              {error.message}
            </p>
          </div>
        )}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button size="lg" onClick={reset}>
            Попробовать снова
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/">На главную</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
