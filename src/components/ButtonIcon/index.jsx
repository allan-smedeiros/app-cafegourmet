import "./index.css";

export function ButtonIcon({ children, ...props }) {
  return (
    <button className="botao-icone" {...props}>
      {children}
    </button>
  );
}
