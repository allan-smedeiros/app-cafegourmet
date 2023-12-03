import { useState } from "react";

import { UilBars } from "@iconscout/react-unicons";
import "./index.css";

import logo from "../../assets/logo-branco.png";
import { ButtonIcon } from "../ButtonIcon";
import { MenuLateralFuncionario } from "../MenuLateralFuncionario";

export function MenuFuncionario() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function abrirMenuLateral() {
    setIsMenuOpen(true);
  }

  function fecharMenuLateral() {
    setIsMenuOpen(false);
  }

  return (
    <div className="menu__container">
      <div className="menu__conteudo">
        <ButtonIcon
          title="Menu"
          onClick={isMenuOpen ? fecharMenuLateral : abrirMenuLateral}
        >
          <UilBars />
        </ButtonIcon>
        <img src={logo} alt="Café Gourmet" />
        <div></div>
      </div>
      <MenuLateralFuncionario
        isOpen={isMenuOpen}
        fecharMenu={fecharMenuLateral}
      />
    </div>
  );
}
