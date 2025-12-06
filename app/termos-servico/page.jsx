'use client';

import LegalLayout from '@/components/LegalLayout';

const content = `# Termos de Serviço

**Última Atualização:** 23 de Novembro de 2025

Por favor, leia estes Termos de Serviço ("Termos", "Termos de Serviço") cuidadosamente antes de usar o website [Seu Domínio Aqui] (o "Serviço") operado pela **EBODA** ("nós", "nosso", ou "a Empresa").

Seu acesso e uso do Serviço estão condicionados à sua aceitação e conformidade com estes Termos. Estes Termos se aplicam a todos os visitantes, usuários e outros que acessam ou usam o Serviço.

## 1. Uso do Serviço

O Serviço e seu conteúdo original, recursos e funcionalidades são e continuarão sendo propriedade exclusiva da **EBODA** e de seus licenciadores. O Serviço é protegido por direitos autorais, marcas registradas e outras leis do Brasil e de países estrangeiros.

### Ferramentas de Paleta de Cores

Nossas ferramentas (Color Wheel, Image Color Picker) são fornecidas para auxiliar no seu processo criativo. Você pode usar as paletas geradas para fins comerciais e pessoais.

*   **Conteúdo do Usuário**: Você é responsável por qualquer conteúdo que carregar, incluindo imagens para o Image Color Picker. Você garante que possui os direitos de uso de qualquer imagem carregada.

## 2. Contas

Ao criar uma conta conosco, você garante que tem mais de 18 anos e que as informações que nos fornece são precisas, completas e atuais em todos os momentos. O não cumprimento desta condição constitui uma violação dos Termos, o que pode resultar no encerramento imediato da sua conta em nosso Serviço.

Você é responsável por salvaguardar a senha que usa para acessar o Serviço e por quaisquer atividades ou ações sob sua senha.

## 3. Propriedade Intelectual

O Serviço e seu conteúdo original (excluindo o Conteúdo fornecido pelos usuários), recursos e funcionalidades são e continuarão sendo propriedade exclusiva da **EBODA**.

## 4. Links para Outros Sites

Nosso Serviço pode conter links para sites ou serviços de terceiros que não são de propriedade ou controlados pela **EBODA**.

A **EBODA** não tem controle e não assume responsabilidade pelo conteúdo, políticas de privacidade ou práticas de quaisquer sites ou serviços de terceiros.

## 5. Rescisão

Podemos rescindir ou suspender o acesso ao nosso Serviço imediatamente, sem aviso prévio ou responsabilidade, por qualquer motivo, incluindo, sem limitação, se você violar os Termos.

## 6. Limitação de Responsabilidade

Em nenhuma circunstância a **EBODA**, nem seus diretores, funcionários, parceiros, agentes, fornecedores ou afiliados, serão responsáveis por quaisquer danos indiretos, incidentais, especiais, consequenciais ou punitivos, incluindo, sem limitação, perda de lucros, dados, uso, fundo de comércio ou outras perdas intangíveis, resultantes de:

*   Seu acesso ou uso ou incapacidade de acessar ou usar o Serviço.
*   Qualquer conduta ou conteúdo de terceiros no Serviço.
*   Qualquer conteúdo obtido do Serviço.

## 7. Isenção de Responsabilidade

O uso do Serviço é por sua conta e risco. O Serviço é fornecido "COMO ESTÁ" e "CONFORME DISPONÍVEL". O Serviço é fornecido sem garantias de qualquer tipo, expressas ou implícitas, incluindo, mas não se limitando a, garantias implícitas de comercialização, adequação a uma finalidade específica, não violação ou curso de desempenho.

## 8. Lei Aplicável

Estes Termos serão regidos e interpretados de acordo com as leis do Brasil, sem levar em conta suas disposições sobre conflitos de leis.

## 9. Alterações nos Termos

Reservamo-nos o direito, a nosso exclusivo critério, de modificar ou substituir estes Termos a qualquer momento. Se uma revisão for material, tentaremos fornecer um aviso de pelo menos 30 dias antes que quaisquer novos termos entrem em vigor.

## 10. Contato

Se você tiver alguma dúvida sobre estes Termos, entre em contato conosco:

*   Por e-mail: ebodapalette@gmail.com
`;

export default function TermosServicoPage() {
  return (
    <LegalLayout
      title="Termos de Serviço"
      content={content}
      breadcrumb={[{ label: 'Termos de Serviço' }]}
    />
  );
}