import { MenuCliente } from "../../../components/MenuCliente";

import "./index.css";

export function TemplateCliente({ children }) {
  return (
    <div>
      <MenuCliente />
      <div className="template__container">
        <div className="template__conteudo">{children}</div>
      </div>
    </div>
  );
}
