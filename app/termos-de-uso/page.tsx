import type { Metadata } from "next";
import LegalPage from "../_components/LegalPage";
import { EMAIL, SITE_NAME } from "../site-config";

export const metadata: Metadata = {
  title: "Termos de uso",
  description: `Condições de uso do site da ${SITE_NAME}.`,
  alternates: { canonical: "/termos-de-uso" },
};

export default function TermosDeUso() {
  return (
    <LegalPage title="Termos de uso" updatedAt="27 de julho de 2026">
      <p>
        Ao navegar neste site, você concorda com as condições descritas abaixo.
        Se não concordar com algum ponto, pedimos que não utilize o site.
      </p>

      <section>
        <h2>Finalidade do site</h2>
        <p>
          Este site é um canal institucional da {SITE_NAME}, destinado a
          apresentar nossos serviços e receber pedidos de contato e orçamento.
          Nenhuma informação aqui publicada constitui, por si só, proposta
          comercial vinculante.
        </p>
      </section>

      <section>
        <h2>Uso do formulário de contato</h2>
        <p>
          Ao enviar uma mensagem, você se compromete a fornecer informações
          verdadeiras e a não utilizar o formulário para conteúdo ilícito,
          ofensivo ou não solicitado. O tratamento dos dados enviados está
          descrito na nossa{" "}
          <a href="/politica-de-privacidade">política de privacidade</a>.
        </p>
      </section>

      <section>
        <h2>Propriedade intelectual</h2>
        <p>
          A marca, o layout, os textos, as imagens e o código deste site
          pertencem à {SITE_NAME}. É vedada a reprodução, total ou parcial, sem
          autorização prévia por escrito.
        </p>
      </section>

      <section>
        <h2>Orçamentos e contratações</h2>
        <p>
          Prazos, escopo, valores e condições de suporte de cada projeto são
          definidos em proposta e contrato específicos, firmados separadamente.
          Em caso de divergência, prevalece o que estiver no contrato.
        </p>
      </section>

      <section>
        <h2>Limitação de responsabilidade</h2>
        <p>
          Empenhamo-nos em manter o site disponível e as informações
          atualizadas, mas não garantimos funcionamento ininterrupto nem
          ausência de erros. A {SITE_NAME} não responde por danos decorrentes da
          indisponibilidade temporária do site ou do uso de conteúdo de sites de
          terceiros eventualmente referenciados.
        </p>
      </section>

      <section>
        <h2>Alterações</h2>
        <p>
          Estes termos podem ser atualizados a qualquer momento. A versão
          vigente é sempre a publicada nesta página, com a data de atualização
          indicada no topo.
        </p>
      </section>

      <section>
        <h2>Foro e contato</h2>
        <p>
          Aplica-se a legislação brasileira. Dúvidas sobre estes termos podem
          ser enviadas para <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
        </p>
      </section>
    </LegalPage>
  );
}
