import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Sidebar from "../components/BarraLateral.jsx";
import TopNavbar from "../components/BarraNavegacion.jsx";
 
const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000/api";
 
async function apiRequest(path, options = {}) {
  const isFormData = options.body instanceof FormData;
  
  const headers = { ...(options.headers || {}) };
  
  if (options.body && !isFormData) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(`${API_URL}${path}`, {
    credentials: "include",
    ...options,
    headers: headers,
    body: options.body && !isFormData ? JSON.stringify(options.body) : options.body,
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Error en la solicitud");
  return data;
}
 
async function resolveIdByName(path, name) {
  const records = await apiRequest(path);
  const normalizedName = String(name ?? "").trim().toLowerCase();
  const match = Array.isArray(records)
    ? records.find(
        (item) =>
          String(item.name ?? item.nombre ?? "")
            .trim()
            .toLowerCase() === normalizedName
      )
    : null;
  return match?._id ?? null;
}
 
const initialForm = {
  nombre: "",
  categoria: "",
  precio: "",
  marca: "",
  cantidad: "",
  size: "",
  color: "",
  descripcion: "",
  imagen: null,
};
 
export default function AgregarProducto() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const { id } = useParams();
  const isEdit = Boolean(id);
 
  const [form, setForm] = useState(initialForm);
  const [preview, setPreview] = useState(null);
  const [caracteristicasList, setCaracteristicasList] = useState([]);
  const [inputCaracteristica, setInputCaracteristica] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
 
  useEffect(() => {
    if (isEdit) {
      const cargarProductoAEditar = async () => {
        try {
          setLoading(true);
          const prod = await apiRequest(`/products/${id}`);
         
          // Poblamos el formulario mapeando los nombres desde los objetos populados del backend
          setForm({
            nombre: prod.name || "",
            categoria: prod.idCategory?.name || "",
            precio: prod.price != null ? String(prod.price) : "",
            marca: prod.idBrand?.name || "",
            cantidad: prod.stock != null ? String(prod.stock) : "",
            size: prod.size || "",
            color: prod.color || "",
            descripcion: prod.description || "",  
            imagen: null,
          });
 
          if (prod.images?.[0]?.image) {
            setPreview(prod.images[0].image);
          }
          if (Array.isArray(prod.mainFeatures)) {
            setCaracteristicasList(
              prod.mainFeatures.map(item =>
                typeof item === "object" ? item.feature : item
              )
            );
          }
        } catch (err) {
          setApiError("No se pudieron cargar los datos del producto.");
        } finally {
          setLoading(false);
        }
      };
 
      cargarProductoAEditar();
    }
  }, [id, isEdit]);
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };
 
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setForm((prev) => ({ ...prev, imagen: file }));
    setPreview(URL.createObjectURL(file));
  };
 
  const handleAddCaracteristica = () => {
    const trimmed = inputCaracteristica.trim();
    if (trimmed && !caracteristicasList.includes(trimmed)) {
      setCaracteristicasList((prev) => [...prev, trimmed]);
      setInputCaracteristica("");
    }
  };
 
  const handleRemoveCaracteristica = (index) => {
    setCaracteristicasList((prev) => prev.filter((_, i) => i !== index));
  };
 
  const validate = () => {
    const newErrors = {};
    if (!form.nombre.trim()) newErrors.nombre = "El nombre es requerido";
    if (!form.categoria.trim()) newErrors.categoria = "La categoría es requerida";
    if (!form.precio.trim()) newErrors.precio = "El precio es requerido";
    if (!form.marca.trim()) newErrors.marca = "La marca es requerida";
    if (!form.cantidad.trim()) newErrors.cantidad = "La cantidad es requerida";
    if (!form.size.trim()) newErrors.size = "El tamaño es requerido";
    if (!form.color.trim()) newErrors.color = "El color es requerido";
    if (caracteristicasList.length === 0)
      newErrors.caracteristicas = "Agrega al menos una característica";
    return newErrors;
  };
 
  const handleSubmit = async () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
 
    setLoading(true);
    setApiError("");
 
    try {
      const categoryId = await resolveIdByName("/categories", form.categoria);
      const brandId = await resolveIdByName("/brands", form.marca);
 
      if (!categoryId) throw new Error(`No se encontró la categoría "${form.categoria}". Verifica que exista.`);
      if (!brandId) throw new Error(`No se encontró la marca "${form.marca}". Verifica que exista.`);
 
      const formData = new FormData();
      formData.append("name", form.nombre.trim());
      formData.append("idCategory", categoryId);
      formData.append("idBrand", brandId);
      formData.append("price", form.precio);
      formData.append("stock", form.cantidad);
      formData.append("size", form.size.trim());
      formData.append("color", form.color.trim());
      formData.append("description", form.descripcion.trim());
      formData.append("mainFeatures", JSON.stringify(caracteristicasList));
 
      if (form.imagen) {
        formData.append("images", form.imagen);
      }
 
      const path = isEdit ? `/products/${id}` : "/products";
      const method = isEdit ? "PUT" : "POST";
 
      await apiRequest(path, {
        method: method,
        body: formData,
      });
 
      Swal.fire({
        title: isEdit ? "Producto Actualizado" : "Producto Agregado",
        text: isEdit ? "Los cambios se guardaron con éxito." : "El producto ha sido registrado con éxito.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
 
      setTimeout(() => navigate("/productos"), 1500);
    } catch (err) {
      setApiError(err.message || "Error al guardar el producto.");
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <div className="min-h-screen bg-[#f5f0eb]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <TopNavbar />
      <div className="flex gap-0 px-4 pb-6">
        <Sidebar />
        <div className="flex-1 flex flex-col gap-6">
          <div>
            <button
              onClick={() => navigate("/productos")}
              className="flex items-center gap-2 text-[#7a6a6a] hover:text-[#3b2a2a] text-sm font-semibold mb-1 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/>
              </svg>
              Volver
            </button>
            <h1 className="text-2xl font-bold text-[#3b2a2a]">
              {isEdit ? "Editar producto" : "Agregar producto"}
            </h1>
            <p className="text-sm text-[#7a6a6a] mt-0.5">
              {isEdit ? "Modifique los datos requeridos del producto" : "Complete los datos para agregar un producto"}
            </p>
          </div>
 
          {apiError && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
              {apiError}
            </div>
          )}
 
          <div className="bg-white rounded-2xl shadow-sm border border-[#ece6df] p-8">
            <div className="flex gap-8">
              <div className="flex-1 flex flex-col gap-5">
                {/* Nombre */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#5a4a4a]">
                    Nombre del producto <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text" name="nombre" value={form.nombre}
                    onChange={handleChange} placeholder="Ej: Base premium pink fly"
                    className={`w-full border rounded-xl px-4 py-2.5 text-sm text-[#3b2a2a] outline-none transition-all placeholder:text-[#bbb] ${
                      errors.nombre ? "border-red-300 bg-red-50" : "border-[#e0d8d0] bg-[#faf8f6] focus:border-[#c8a87a] focus:bg-white"
                    }`}
                  />
                  {errors.nombre && <span className="text-xs text-red-400">{errors.nombre}</span>}
                </div>
 
                {/* Categoría + Precio */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    ["categoria", "Categoría del producto", "Ej: Rostro"],
                    ["precio", "Precio del producto", "Ej: 75.00"],
                  ].map(([name, label, ph]) => (
                    <div key={name} className="flex flex-col gap-1.5">
                      <label className="text-sm font-semibold text-[#5a4a4a]">
                        {label} <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text" name={name} value={form[name]}
                        onChange={handleChange} placeholder={ph}
                        className={`w-full border rounded-xl px-4 py-2.5 text-sm text-[#3b2a2a] outline-none transition-all placeholder:text-[#bbb] ${
                          errors[name] ? "border-red-300 bg-red-50" : "border-[#e0d8d0] bg-[#faf8f6] focus:border-[#c8a87a] focus:bg-white"
                        }`}
                      />
                      {errors[name] && <span className="text-xs text-red-400">{errors[name]}</span>}
                    </div>
                  ))}
                </div>
 
                {/* Tamaño + Color */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    ["size", "Tamaño", "Ej: 30 ml"],
                    ["color", "Color", "Ej: Nude"],
                  ].map(([name, label, ph]) => (
                    <div key={name} className="flex flex-col gap-1.5">
                      <label className="text-sm font-semibold text-[#5a4a4a]">
                        {label} <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text" name={name} value={form[name]}
                        onChange={handleChange} placeholder={ph}
                        className={`w-full border rounded-xl px-4 py-2.5 text-sm text-[#3b2a2a] outline-none transition-all placeholder:text-[#bbb] ${
                          errors[name] ? "border-red-300 bg-red-50" : "border-[#e0d8d0] bg-[#faf8f6] focus:border-[#c8a87a] focus:bg-white"
                        }`}
                      />
                      {errors[name] && <span className="text-xs text-red-400">{errors[name]}</span>}
                    </div>
                  ))}
                </div>
 
                {/* Marca + Cantidad */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    ["marca", "Marca", "Ej: L'Oréal"],
                    ["cantidad", "Cantidad", "Ej: 50"],
                  ].map(([name, label, ph]) => (
                    <div key={name} className="flex flex-col gap-1.5">
                      <label className="text-sm font-semibold text-[#5a4a4a]">
                        {label} <span className="text-red-400">*</span>
                      </label>
                      <input
                        type={name === "cantidad" ? "number" : "text"}
                        name={name} value={form[name]}
                        onChange={handleChange} placeholder={ph}
                        min={name === "cantidad" ? "0" : undefined}
                        className={`w-full border rounded-xl px-4 py-2.5 text-sm text-[#3b2a2a] outline-none transition-all placeholder:text-[#bbb] ${
                          errors[name] ? "border-red-300 bg-red-50" : "border-[#e0d8d0] bg-[#faf8f6] focus:border-[#c8a87a] focus:bg-white"
                        }`}
                      />
                      {errors[name] && <span className="text-xs text-red-400">{errors[name]}</span>}
                    </div>
                  ))}
                </div>
 
                {/* Descripción */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#5a4a4a]">Descripción</label>
                  <textarea
                    name="descripcion" value={form.descripcion}
                    onChange={handleChange}
                    placeholder="Describe las características generales del producto..."
                    rows={4}
                    className="w-full border border-[#e0d8d0] bg-[#faf8f6] rounded-xl px-4 py-2.5 text-sm text-[#3b2a2a] outline-none transition-all focus:border-[#c8a87a] focus:bg-white resize-none placeholder:text-[#bbb]"
                  />
                </div>
 
                {/* Características */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#5a4a4a]">Características principales</label>
                  <div className="flex gap-2">
                    <input
                      type="text" value={inputCaracteristica}
                      onChange={(e) => setInputCaracteristica(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleAddCaracteristica()}
                      placeholder="Ej: SPF 30, resistente al agua..."
                      className="flex-1 border border-[#e0d8d0] bg-[#faf8f6] rounded-xl px-4 py-2.5 text-sm text-[#3b2a2a] outline-none transition-all focus:border-[#c8a87a] focus:bg-white placeholder:text-[#bbb]"
                    />
                    <button
                      onClick={handleAddCaracteristica}
                      className="w-10 h-10 rounded-full bg-[#f0e8df] hover:bg-[#e8ddd4] text-[#c8a87a] flex items-center justify-center transition-colors flex-shrink-0"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 5v14"/><path d="M5 12h14"/>
                      </svg>
                    </button>
                  </div>
                  {caracteristicasList.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-1">
                      {caracteristicasList.map((car, index) => (
                        <span key={index} className="flex items-center gap-1.5 bg-[#f0e8df] text-[#7a5a3a] text-xs font-semibold px-3 py-1.5 rounded-full">
                          {car}
                          <button onClick={() => handleRemoveCaracteristica(index)} className="text-[#c8a87a] hover:text-[#a07050]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
                            </svg>
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                  {errors.caracteristicas && <span className="text-xs text-red-400">{errors.caracteristicas}</span>}
                </div>
              </div>
 
              {/* Imagen + Submit */}
              <div className="w-72 flex flex-col gap-4">
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full aspect-square rounded-2xl border-2 border-dashed border-[#e0d8d0] bg-[#faf8f6] flex items-center justify-center overflow-hidden cursor-pointer hover:border-[#c8a87a] hover:bg-[#fdf9f6] transition-all group"
                >
                  {preview ? (
                    <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-2xl" />
                  ) : (
                    <div className="flex flex-col items-center gap-3 text-[#c0b0a0]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-[#c8a87a] transition-colors">
                        <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
                      </svg>
                      <span className="text-xs text-center font-medium px-4 group-hover:text-[#c8a87a] transition-colors">
                        Haz clic para subir una imagen
                      </span>
                    </div>
                  )}
                </div>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full bg-[#c8a87a] hover:bg-[#b8986a] text-white font-bold py-3 rounded-xl text-sm transition-colors shadow-sm"
                >
                  Subir nueva imagen
                </button>
                <button
                  onClick={handleSubmit} disabled={loading}
                  className={`w-full font-bold py-3 rounded-xl text-sm transition-all shadow-sm mt-auto ${
                    loading ? "bg-[#e8c898] text-white cursor-wait" : "bg-[#e8a0a0] hover:bg-[#d89090] text-white"
                  }`}
                >
                  {loading ? "Guardando..." : isEdit ? "Guardar cambios" : "Agregar producto"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}