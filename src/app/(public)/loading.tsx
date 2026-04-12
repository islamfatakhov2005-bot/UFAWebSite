export default function PublicLoading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <div className="h-10 w-10 rounded-full border-[3px] border-gray-200 border-t-[#3ECF8E] animate-spin" />
      <p className="mt-4 text-sm text-gray-400 font-body">Загрузка...</p>
    </div>
  );
}
