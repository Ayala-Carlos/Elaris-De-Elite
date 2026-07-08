const CajaTexto = ({
  label,
  type = "text",
  placeholder = "",
  value,
  onChange,
  className = "",
  error,
  ...props
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-semibold text-[#5c4d42] mb-2">
          {label}
        </label>
      )}

      <input
        type={type}
        placeholder={placeholder}
        value={value || ""}
        onChange={onChange}
        {...props}
        className={`w-full px-4 py-3 rounded-2xl bg-[#f9f4ef] border outline-none transition-all ${
          error ? "border-red-400 focus:ring-2 focus:ring-red-300" : "border-transparent focus:ring-2 focus:ring-[#d4ac80]"
        }`}
      />

      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default CajaTexto;