import { MenuFuncionario } from "../../../components/MenuFuncionario";

import "./index.css";

export function TemplateFuncionario({ children }) {
  return (
    <div>
      <MenuFuncionario />
      <div className="template__container">
        <div className="template__conteudo">{children}</div>
      </div>
    </div>
  );
}
