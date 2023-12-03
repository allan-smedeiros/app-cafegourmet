import "./index.css";

export function Button({ children, ...props }) {
  return (
    <button className="botao" {...props}>
      {children}
    </button>
  );
}
