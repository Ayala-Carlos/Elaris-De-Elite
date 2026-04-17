export default function TarjetaEstadistica({ label, value, icon, bgVariant }) {
  return (
    <div className="bg-white rounded-2xl border border-[#ede8e0] p-6 flex flex-col items-center gap-3 shadow-sm flex-1">
      {icon && (
        <div className={`${bgVariant} w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg`}>
          {icon}
        </div>
      )}
      <div className="text-center">
        <p className="text-xs text-[#7a6a6a] mb-1">{label}</p>
        <p className="text-xl font-bold text-[#3b2a2a]">{value}</p>
      </div>
    </div>
  );
}