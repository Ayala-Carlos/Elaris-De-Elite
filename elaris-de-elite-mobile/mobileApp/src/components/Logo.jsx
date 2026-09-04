import { Image } from "react-native";

const imagenLogo = require("../../assets/logoElarisElite.png");

// Logo circular de Élaris de Élite, reutilizado en bienvenida,
// inicio de sesión y registro.
export const Logo = ({ tamano = 140, estilo }) => (
  <Image
    source={imagenLogo}
    resizeMode="contain"
    style={[{ width: tamano, height: tamano }, estilo]}
  />
);

export default Logo;
