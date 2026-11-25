import type { Metadata } from "next";
import LegalPage from "../_components/LegalPage";
import { EMAIL, LOCATION_DISPLAY, SITE_NAME } from "../site-config";

export const metadata: Metadata = {
  title: "Política de privacidade",
  description: `Como a ${SITE_NAME} coleta, usa e protege os dados pessoais enviados pelo site, em conformidade com a LGPD.`,
  alternates: { canonical: "/politica-de-privacidade" },
};

export default function PoliticaDePrivacidade() {
  return (
    <LegalPage title="Política de privacidade" updatedAt="25 de novembro de 2026">
      <p>
        Esta política descreve como a {SITE_NAME} trata os dados pessoais
        recebidos por meio deste site, em conformidade com a Lei Geral de
        Proteção de Dados (Lei nº 13.709/2018).
      </p>

      <section>
        <h2>Quais dados coletamos</h2>
        <p>
          Coletamos apenas os dados que você mesmo informa no formulário de
          contato:
        </p>
        <ul>
          <li>Nome</li>
          <li>E-mail</li>
          <li>Telefone</li>
          <li>A mensagem que você escreve no campo de assunto</li>
        </ul>
        <p>
          Não coletamos dados sensíveis e não vendemos nem cruzamos dados de
          navegação para fins publicitários.
        </p>
      </section>

      <section>
        <h2>Cookies e estatísticas de uso</h2>
        <p>
          Usamos o Google Analytics para entender, de forma agregada, como o
          site é usado: páginas visitadas, origem do acesso, tipo de
          dispositivo e cliques em botões como WhatsApp e envio do formulário.
          Para isso, o Google Analytics grava cookies no seu navegador e
          processa dados técnicos, como endereço IP e identificadores do
          navegador, nos servidores do Google.
        </p>
        <p>
          Não enviamos ao Google Analytics o seu nome, e-mail, telefone nem o
          conteúdo das mensagens. Você pode bloquear ou apagar os cookies nas
          configurações do navegador ou instalar o{" "}
          <a
            href="https://tools.google.com/dlpage/gaoptout"
            target="_blank"
            rel="noopener noreferrer"
          >
            complemento de desativação do Google Analytics
          </a>
          .
        </p>
      </section>

      <section>
        <h2>Para que usamos esses dados</h2>
        <p>
          Exclusivamente para responder ao seu contato, elaborar orçamentos e
          dar andamento a uma eventual proposta comercial. Não usamos seus dados
          para envio de comunicações não solicitadas.
        </p>
      </section>

      <section>
        <h2>Com quem compartilhamos</h2>
        <p>
          Não vendemos nem cedemos seus dados. O envio do formulário é
          processado pelo serviço Web3Forms, que encaminha a mensagem para o
          nosso e-mail; nesse processo, os dados informados trafegam pela
          infraestrutura desse fornecedor. Fora isso, o acesso é restrito à
          equipe da {SITE_NAME}. As estatísticas de uso do site são
          processadas pelo Google, conforme descrito na seção sobre cookies.
        </p>
      </section>

      <section>
        <h2>Por quanto tempo guardamos</h2>
        <p>
          Mantemos as mensagens de contato pelo tempo necessário ao atendimento
          e, no caso de contratos firmados, pelo prazo exigido pela legislação
          aplicável. Depois disso, os dados são eliminados.
        </p>
      </section>

      <section>
        <h2>Seus direitos</h2>
        <p>
          A qualquer momento você pode solicitar a confirmação da existência de
          tratamento, o acesso, a correção, a anonimização, a portabilidade ou a
          exclusão dos seus dados, além de revogar o consentimento. Basta enviar
          um pedido para <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
        </p>
      </section>

      <section>
        <h2>Segurança</h2>
        <p>
          Adotamos medidas técnicas e administrativas razoáveis para proteger os
          dados contra acesso não autorizado, perda ou divulgação indevida.
        </p>
      </section>

      <section>
        <h2>Contato do controlador</h2>
        <p>
          {SITE_NAME} — {LOCATION_DISPLAY} —{" "}
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </p>
      </section>
    </LegalPage>
  );
}
