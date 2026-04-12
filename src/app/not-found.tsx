import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="text-center max-w-md">
        <p className="text-[8rem] sm:text-[10rem] font-extrabold leading-none bg-gradient-to-r from-[#3ECF8E] to-[#4AADAD] bg-clip-text text-transparent font-heading select-none">
          404
        </p>
        <h1 className="mt-4 text-2xl sm:text-3xl font-bold text-[#1A2332] font-heading">
          Страница не найдена
        </h1>
        <p className="mt-3 text-base text-gray-500 font-body">
          Запрашиваемая страница не существует или была перемещена. Проверьте
          правильность адреса или вернитесь на главную.
        </p>
        <div className="mt-8">
          <Button asChild size="lg">
            <Link href="/">На главную</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
