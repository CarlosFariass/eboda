'use client';

import LegalLayout from '@/components/LegalLayout';

const content = `# Política de Privacidade

**Última Atualização:** 23 de Novembro de 2025

A **EBODA** ("nós", "nosso", ou "a Empresa") opera o website [Seu Domínio Aqui] e suas ferramentas de paleta de cores (o "Serviço").

Esta página informa sobre nossas políticas relativas à coleta, uso e divulgação de Dados Pessoais quando você usa nosso Serviço.

Ao usar o Serviço, você concorda com a coleta e uso de informações de acordo com esta política.

## 1. Coleta e Uso de Informações

Coletamos diversos tipos de informações para fornecer e melhorar nosso Serviço para você.

### Dados Pessoais

Ao usar nosso Serviço, podemos solicitar que você nos forneça certas informações de identificação pessoal que podem ser usadas para contatá-lo ou identificá-lo ("Dados Pessoais"). As informações de identificação pessoal podem incluir, mas não se limitam a:

*   Endereço de e-mail (para criação de conta e comunicação)
*   Nome e Sobrenome (opcional, para personalização)
*   Dados de Uso (informações sobre como o Serviço é acessado e usado)

### Dados de Uso

Também podemos coletar informações sobre como o Serviço é acessado e usado ("Dados de Uso"). Esses Dados de Uso podem incluir informações como o endereço de Protocolo de Internet do seu computador (por exemplo, endereço IP), tipo de navegador, versão do navegador, as páginas do nosso Serviço que você visita, a hora e a data da sua visita, o tempo gasto nessas páginas, identificadores exclusivos de dispositivos e outros dados de diagnóstico.

### Dados de Rastreamento e Cookies

Usamos cookies e tecnologias de rastreamento semelhantes para rastrear a atividade em nosso Serviço e manter certas informações.

*   **Cookies**: Pequenos arquivos de dados armazenados no seu dispositivo.
*   **Google AdSense**: Usamos o Google AdSense para exibir anúncios. O Google, como fornecedor terceirizado, usa cookies para veicular anúncios em nosso Serviço. O uso do cookie DART pelo Google permite que ele veicule anúncios para nossos usuários com base em sua visita ao nosso Serviço e a outros sites na Internet. Você pode optar por não usar o cookie DART visitando a política de privacidade da rede de conteúdo e anúncios do Google.

## 2. Uso dos Dados

A **EBODA** usa os dados coletados para diversas finalidades:

*   Para fornecer e manter o Serviço.
*   Para notificar você sobre alterações em nosso Serviço.
*   Para permitir que você participe de recursos interativos do nosso Serviço quando você optar por fazê-lo.
*   Para fornecer suporte ao cliente.
*   Para monitorar o uso do Serviço.
*   Para detectar, prevenir e resolver problemas técnicos.

## 3. Transferência de Dados

Suas informações, incluindo Dados Pessoais, podem ser transferidas para — e mantidas em — computadores localizados fora do seu estado, província, país ou outra jurisdição governamental onde as leis de proteção de dados podem ser diferentes das de sua jurisdição.

Se você estiver localizado fora do Brasil e optar por nos fornecer informações, observe que transferimos os dados, incluindo Dados Pessoais, para o Brasil e os processamos lá.

## 4. Divulgação de Dados

Podemos divulgar seus Dados Pessoais de boa-fé, quando tal ação for necessária para:

*   Cumprir uma obrigação legal.
*   Proteger e defender os direitos ou propriedade da **EBODA**.
*   Prevenir ou investigar possíveis irregularidades relacionadas ao Serviço.
*   Proteger a segurança pessoal dos usuários do Serviço ou do público.
*   Proteger contra responsabilidade legal.

## 5. Segurança dos Dados

A segurança dos seus dados é importante para nós, mas lembre-se de que nenhum método de transmissão pela Internet ou método de armazenamento eletrônico é 100% seguro. Embora nos esforcemos para usar meios comercialmente aceitáveis para proteger seus Dados Pessoais, não podemos garantir sua segurança absoluta.

## 6. Links para Outros Sites

Nosso Serviço pode conter links para outros sites que não são operados por nós. Se você clicar em um link de terceiros, você será direcionado para o site desse terceiro. Aconselhamos vivamente que você revise a Política de Privacidade de todos os sites que visitar.

## 7. Privacidade de Crianças

Nosso Serviço não se destina a menores de 18 anos ("Crianças"). Não coletamos intencionalmente informações de identificação pessoal de menores de 18 anos.

## 8. Alterações a Esta Política de Privacidade

Podemos atualizar nossa Política de Privacidade de tempos em tempos. Notificaremos você sobre quaisquer alterações publicando a nova Política de Privacidade nesta página.

## 9. Contato

Se você tiver alguma dúvida sobre esta Política de Privacidade, entre em contato conosco:

*   Por e-mail: ebodapalette@gmail.com
`;

export default function PoliticaPrivacidadePage() {
  return (
    <LegalLayout
      title="Política de Privacidade"
      content={content}
      breadcrumb={[{ label: 'Política de Privacidade' }]}
    />
  );
}