import { type FC } from "react";
interface MaterialIconProps {
  icon: string;
}
const MaterialIcon: FC<MaterialIconProps> = ({ icon }) => {
  return <span className="material-symbols-outlined">{icon}</span>;
};

export default MaterialIcon;
