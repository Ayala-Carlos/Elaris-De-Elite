import Sidebar from "../components/BarraLateral.jsx";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import TopNavbar from "../components/BarraNavegacion.jsx";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000/api";

async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    credentials: "include",
    headers:
      options.body instanceof FormData
        ? options.headers
        : { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
    body:
      options.body && !(options.body instanceof FormData)
        ? JSON.stringify(options.body)
        : options.body,
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Error en la solicitud");
  return data;
}

const initialForm = {
  nombre: "",
  plataforma: "",
  presupuesto: "",
  fechaInicio: "",
  fechaFinal: "",
  descripcion: "",
};

export default function AgregarCampana() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState("");
  const [campaignStatus, setCampaignStatus] = useState("active");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  useEffect(() => {
    if (!id) return;

    const loadCampaign = async () => {
      try {
        const campaign = await apiRequest(`/marketingCampaings/${id}`);

        setForm({
          nombre: campaign.campaignName || "",
          plataforma: campaign.platform || "",
          presupuesto:
            campaign.assignedBudget != null ? String(campaign.assignedBudget) : "",
          fechaInicio: campaign.startDate
            ? campaign.startDate.split("T")[0]
            : "",
          fechaFinal: campaign.endDate ? campaign.endDate.split("T")[0] : "",
          descripcion: campaign.description || "",
        });
        setCampaignStatus(campaign.status || "active");
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo cargar la campaña",
        });
      }
    };

    loadCampaign();
  }, [id]);

  const validate = () => {
    const newErrors = {};
    if (!form.nombre.trim()) newErrors.nombre = "El nombre es requerido";
    if (!form.plataforma.trim())
      newErrors.plataforma = "La plataforma es requerida";
    if (!form.presupuesto.trim())
      newErrors.presupuesto = "El presupuesto es requerido";
    if (!form.fechaInicio)
      newErrors.fechaInicio = "La fecha de inicio es requerida";
    if (!form.fechaFinal) newErrors.fechaFinal = "La fecha final es requerida";
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
      const payload = {
        campaignName: form.nombre,
        platform: form.plataforma,
        assignedBudget:
          Number(String(form.presupuesto).replace(/[^0-9.]/g, "")) || 0,
        startDate: form.fechaInicio,
        endDate: form.fechaFinal,
        description: form.descripcion,
        status: campaignStatus,
      };

      if (isEdit) {
        await apiRequest(`/marketingCampaings/${id}`, {
          method: "PUT",
          body: payload,
        });

        await Swal.fire({
          icon: "success",
          title: "Campaña actualizada",
          text: "Los cambios fueron guardados correctamente",
          confirmButtonColor: "#c8a87a",
        });
      } else {
        await apiRequest("/marketingCampaings", {
          method: "POST",
          body: payload,
        });

        await Swal.fire({
          icon: "success",
          title: "Campaña creada",
          text: "La campaña fue registrada correctamente",
          confirmButtonColor: "#c8a87a",
        });
      }

      navigate("/marketing");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message || "No se pudo guardar la campaña",
      });
    } finally {
      setLoading(false);
    }
  };

  const fieldClass = (name) =>
    `w-full border rounded-xl px-4 py-2.5 text-sm text-[#3b2a2a] outline-none transition-all placeholder:text-[#bbb] ${
      errors[name]
        ? "border-red-300 bg-red-50"
        : "border-[#e0d8d0] bg-[#faf8f6] focus:border-[#c8a87a] focus:bg-white"
    }`;

  return (
    <div
      className="min-h-screen bg-[#f5f0eb]"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      <TopNavbar />
      <div className="flex gap-0 px-4 pb-6">
        <Sidebar />
        <div className="flex-1 flex flex-col gap-6">
          <div>
            <button
              onClick={() => navigate("/marketing")}
              className="flex items-center gap-2 text-[#7a6a6a] hover:text-[#3b2a2a] text-sm font-semibold mb-1 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5" />
                <path d="M12 19l-7-7 7-7" />
              </svg>
              Volver
            </button>
            <h1 className="text-2xl font-bold text-[#3b2a2a]">
              {isEdit
                ? "Editar campaña de marketing"
                : "Agregar campaña de marketing"}
            </h1>
            <p className="text-sm text-[#7a6a6a] mt-0.5">
              Complete los datos para gestionar la campaña
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
                {[
                  [
                    "nombre",
                    "Nombre de la campaña",
                    "text",
                    "Ej: Campaña primavera 2025",
                  ],
                  [
                    "plataforma",
                    "Plataforma",
                    "text",
                    "Ej: Instagram, Facebook, TikTok...",
                  ],
                  ["presupuesto", "Presupuesto", "text", "Ej: $500.00"],
                ].map(([name, label, type, ph]) => (
                  <div key={name} className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-[#5a4a4a]">
                      {label} <span className="text-red-400">*</span>
                    </label>
                    <input
                      type={type}
                      name={name}
                      value={form[name]}
                      onChange={handleChange}
                      placeholder={ph}
                      className={fieldClass(name)}
                    />
                    {errors[name] && (
                      <span className="text-xs text-red-400">
                        {errors[name]}
                      </span>
                    )}
                  </div>
                ))}

                <div className="grid grid-cols-2 gap-4">
                  {[
                    ["fechaInicio", "Fecha de inicio"],
                    ["fechaFinal", "Fecha final"],
                  ].map(([name, label]) => (
                    <div key={name} className="flex flex-col gap-1.5">
                      <label className="text-sm font-semibold text-[#5a4a4a]">
                        {label} <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="date"
                        name={name}
                        value={form[name]}
                        onChange={handleChange}
                        className={fieldClass(name)}
                      />
                      {errors[name] && (
                        <span className="text-xs text-red-400">
                          {errors[name]}
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#5a4a4a]">
                    Descripción
                  </label>
                  <textarea
                    name="descripcion"
                    value={form.descripcion}
                    onChange={handleChange}
                    placeholder="Describe el objetivo o enfoque de la campaña..."
                    rows={4}
                    className="w-full border border-[#e0d8d0] bg-[#faf8f6] rounded-xl px-4 py-2.5 text-sm text-[#3b2a2a] outline-none transition-all focus:border-[#c8a87a] focus:bg-white resize-none placeholder:text-[#bbb]"
                  />
                </div>
              </div>

              <div className="w-72 flex flex-col justify-end gap-4">
                <button
                  onClick={handleSubmit}
                  disabled={loading || success}
                  className={`w-full font-bold py-3 rounded-xl text-sm transition-all shadow-sm ${
                    success
                      ? "bg-green-400 text-white cursor-default"
                      : loading
                      ? "bg-[#e8c898] text-white cursor-wait"
                      : "bg-[#e8a0a0] hover:bg-[#d89090] text-white"
                  }`}
                >
                  {loading ? "Guardando..." : isEdit ? "Actualizar campaña" : "Agregar campaña"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}