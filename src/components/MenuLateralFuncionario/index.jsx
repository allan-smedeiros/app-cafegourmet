import { useNavigate } from "react-router-dom";

import { UilApps, UilReceipt, UilSignout } from "@iconscout/react-unicons";

import "react-modern-drawer/dist/index.css";
import Drawer from "react-modern-drawer";

import "./index.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export function MenuLateralFuncionario({ isOpen, fecharMenu }) {
  const navigate = useNavigate();
  const { dispatch } = useAuth();

  function sair(e) {
    e.preventDefault();
    dispatch({ type: "LOGOUT " });
    navigate("/");
  }

  return (
    <Drawer open={isOpen} onClose={fecharMenu} direction="left">
      <ul className="menu__cliente">
        <li>
          <Link to="/adm/vitrine">
            <UilApps />
            Gerenciar Vitrine
          </Link>
        </li>
        <li>
          <Link to="/adm/pedidos">
            <UilReceipt />
            Pedidos
          </Link>
        </li>
        <li>
          <Link onClick={sair}>
            <UilSignout />
            Sair
          </Link>
        </li>
      </ul>
    </Drawer>
  );
}
