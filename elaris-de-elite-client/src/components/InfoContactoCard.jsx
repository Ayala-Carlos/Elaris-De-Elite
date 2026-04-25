import React from "react";

const InfoContactoCard = ({ icon, titulo, lineas }) => {
  return (
    <div
      className="flex items-center gap-4 p-5 rounded-2xl"
      style={{ backgroundColor: "#F5EDE6", border: "1px solid #E8D5CA" }}
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: "#FDECEA" }}
      >
        {icon}
      </div>

      <div>
        <p className="font-semibold text-[#6B5B4E] text-sm">{titulo}</p>
        {lineas.map((l, i) => (
          <p key={i} className="text-[#9C8275] text-sm">
            {l}
          </p>
        ))}
      </div>
    </div>
  );
};

export default InfoContactoCard;