import { useEffect, useState } from "react";
import ImageUploading from "react-images-uploading";
import { useForm, Controller } from "react-hook-form";
import { UilShoppingCart } from "@iconscout/react-unicons";
import { NumericFormat } from "react-number-format";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

import { Titulo } from "../../../components/Titulo";
import { Button } from "../../../components/Button";

import { TemplateCliente } from "../../template/TemplateCliente";

import "./index.css";
import {
  apiAtualizarProduto,
  apiCadastrarProduto,
  apiListarProdutos,
} from "../../../services/requests";
import { useAuth } from "../../../context/AuthContext";

const InputValor = (props) => {
  return <input {...props} type="text" />;
};

export function FormProduto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { verificarLogin } = useAuth();

  const [imagem, setImagem] = useState([]);

  const onChangeImagem = (imageList) => {
    setImagem(imageList);
  };

  const { register, handleSubmit, control, setValue } = useForm({
    defaultValues: {
      nome: "",
      ingredientes: "",
      valor: 0,
    },
  });

  async function criar(data) {
    try {
      await apiCadastrarProduto(data);
      toast.success("Sucesso!");
      navigate("/adm/vitrine");
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.erro);
    }
  }

  async function editar(data) {
    try {
      await apiAtualizarProduto(id, data);
      toast.success("Sucesso!");
      navigate("/adm/vitrine");
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.erro);
    }
  }

  async function carregarProduto() {
    try {
      const res = await apiListarProdutos();
      const produto = res.data.produtos.find((produto) => produto.id === +id);

      setValue("nome", produto.nome);
      setValue("valor", produto.valor);
      setValue("ingredientes", produto.ingredientes);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.erro);
      navigate("/adm/vitrine");
    }
  }

  function submit(data) {
    for (const key of Object.keys(data)) {
      if (!data[key] === "") {
        toast.warn("Preencha todos os campos");
        return;
      }
    }

    if (imagem?.length === 0 && !id) {
      toast.warn("Selecione uma imagem");
      return;
    }

    const formData = new FormData();

    if (!id) {
      formData.append("mostrar_vitrine", true);
    }

    formData.append("nome", data.nome);
    formData.append("valor", data.valor);

    formData.append("ingredientes", data.ingredientes);
    formData.append("imagem", id ? "" : imagem[0]?.file);

    if (id) return editar(data);
    criar(formData);
  }

  async function iniciar() {
    await verificarLogin("Funcionário");
    if (id) {
      carregarProduto();
    }
  }

  useEffect(() => {
    iniciar();
  }, []);

  return (
    <TemplateCliente>
      <Titulo>
        <UilShoppingCart />
        {id ? "Editar" : "Novo"} Produto
      </Titulo>

      <form className="produto__form" onSubmit={handleSubmit(submit)}>
        {!id && (
          <fieldset>
            <ImageUploading
              multiple
              value={imagem}
              onChange={onChangeImagem}
              maxNumber={1}
              dataURLKey="data_url"
            >
              {({
                imageList,
                onImageUpload,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps,
              }) => (
                // write your building UI
                <div className="upload__image-wrapper">
                  <a
                    style={isDragging ? { color: "red" } : undefined}
                    onClick={(e) => {
                      e.preventDefault;
                      onImageUpload(e);
                    }}
                    {...dragProps}
                  >
                    Selecionar Imagem
                  </a>

                  {imageList.map((image, index) => (
                    <div key={index} className="image-item">
                      <img src={image["data_url"]} alt="" width="200" />
                      <div className="image-item__btn-wrapper">
                        <Button onClick={() => onImageUpdate(index)}>
                          Trocar
                        </Button>
                        <Button onClick={() => onImageRemove(index)}>
                          Remover{" "}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ImageUploading>
          </fieldset>
        )}
        <fieldset>
          <label htmlFor="nome">Nome:</label>
          <input
            id="nome"
            style={{ width: "60%" }}
            type="text"
            {...register("nome")}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="valor">Preço:</label>
          <Controller
            name="valor"
            control={control}
            render={({ field }) => (
              <NumericFormat
                id="valor"
                style={{ width: "60%" }}
                prefix={"R$ "}
                decimalSeparator={","}
                thousandSeparator={"."}
                decimalScale={2}
                defaultValue={0}
                fixedDecimalScale={true}
                allowLeadingZeros={false}
                {...field}
                onChange={undefined}
                onValueChange={(v) => {
                  setValue("valor", v.floatValue);
                }}
                customInput={InputValor}
              />
            )}
          />
        </fieldset>
        <fieldset className="endereco">
          <label>Ingredientes:</label>
          <textarea
            style={{ width: "100%", height: "100px" }}
            rows={3}
            {...register("ingredientes")}
          ></textarea>
        </fieldset>

        <div className="meu-perfil__botao-salvar">
          <Button>Salvar</Button>
        </div>
      </form>
    </TemplateCliente>
  );
}
