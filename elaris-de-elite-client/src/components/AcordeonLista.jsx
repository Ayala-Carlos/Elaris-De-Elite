import React, { useState } from "react";
import TarjetaAcordeon from "../components/TarjetaAcordeon.jsx";

const AcordeonLista = ({ secciones }) => {
  const [abierto, setAbierto] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      {secciones.map((s, i) => (
        <TarjetaAcordeon
          key={i}
          data={s}
          abierto={abierto === i}
          onToggle={() => setAbierto(abierto === i ? null : i)}
        />
      ))}
    </div>
  );
};

export default AcordeonLista;