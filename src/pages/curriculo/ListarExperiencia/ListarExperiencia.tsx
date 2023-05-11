import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Column } from "../../../components/common/Table";
import {
  Experiencia,
  getExperiencias,
  deleteExperiencia,
} from "../../../services/experienciaService";

const ListarExperiencia: React.FC = () => {
  const navigate = useNavigate();

  const [experiencias, setExperiencias] = React.useState<Experiencia[]>([]);

  const fetchExperiencias = async () => {
    try {
      const experiencias = await getExperiencias();
      setExperiencias(experiencias);
    } catch (error) {
      console.error("Erro ao buscar experiências:", error);
    }
  };

  useEffect(() => {
    fetchExperiencias();
  }, []);

  const handleEdit = async (experiencia: Experiencia) => {
    navigate("/curriculo/experiencia/cadastro", { state: experiencia });
  };

  const handleDelete = async (experiencia: Experiencia) => {
    try {
      await deleteExperiencia(experiencia.id);
      fetchExperiencias();
      alert("Experiência excluída com sucesso!");
    } catch (error) {
      console.log("Erro ao excluir experiências:", error);
      alert("Ocorreu um erro ao excluir experiência");
    }
  };

  const columns: Column<Experiencia>[] = [
    { header: "Título", accessor: "titulo" },
    { header: "Descrição", accessor: "descricao" },
    { header: "Tipo", accessor: "tipo" },
    { header: "Ano Início", accessor: "anoInicio" },
    { header: "Ano Fim", accessor: "anoFim" },
  ];

  return (
    <Table
      columns={columns}
      data={experiencias}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default ListarExperiencia;
