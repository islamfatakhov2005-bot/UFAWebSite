export default function AdminLoading() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="h-8 w-8 rounded-full border-[3px] border-gray-200 border-t-[#3ECF8E] animate-spin" />
      <p className="mt-3 text-sm text-gray-400">Загрузка...</p>
    </div>
  );
}
