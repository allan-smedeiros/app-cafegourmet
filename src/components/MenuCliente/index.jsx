import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { UilBars, UilShoppingCart } from "@iconscout/react-unicons";
import "./index.css";

import logo from "../../assets/logo-branco.png";
import { ButtonIcon } from "../ButtonIcon";
import { MenuLateralCliente } from "../MenuLateralCliente";

export function MenuCliente() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

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
        <ButtonIcon
          title="Carrinho"
          onClick={() => navigate("/cliente/carrinho")}
        >
          <UilShoppingCart />
        </ButtonIcon>
      </div>
      <MenuLateralCliente isOpen={isMenuOpen} fecharMenu={fecharMenuLateral} />
    </div>
  );
}
