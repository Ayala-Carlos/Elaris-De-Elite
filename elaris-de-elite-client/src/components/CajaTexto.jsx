const CajaTexto = ({
  label,
  type = "text",
  placeholder = "",
  value,
  onChange,
  className = "",
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
        className="w-full px-4 py-3 rounded-2xl bg-[#f9f4ef] border-none focus:ring-2 focus:ring-[#d4ac80] outline-none transition-all"
      />
    </div>
  );
};

export default CajaTexto;