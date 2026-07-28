import { redirect } from "next/navigation";

// Rota curinga: qualquer caminho desconhecido volta para a página principal
// em vez de cair no 404 padrão do Next.
export default function CatchAllPage(): never {
  redirect("/");
}
