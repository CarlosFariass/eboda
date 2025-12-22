'use client';

import LegalLayout from '@/components/LegalLayout';
import { useTranslations } from 'next-intl';

export default function TermosServicoPage() {
  const t = useTranslations('terms');

  const content = `# ${t('title')}

**${t('lastUpdate')}:** ${t('lastUpdateDate')}

${t('intro')}

${t('acceptTerms')}

## ${t('section1Title')}

${t('section1Text')}

### ${t('toolsTitle')}

${t('toolsText')}

*   **${t('userContent')}**: ${t('userContentText')}

## ${t('section2Title')}

${t('section2Text')}

${t('section2Text2')}

## ${t('section3Title')}

${t('section3Text')}

## ${t('section4Title')}

${t('section4Text')}

${t('section4Text2')}

## ${t('section5Title')}

${t('section5Text')}

## ${t('section6Title')}

${t('section6Text')}

*   ${t('section6Item1')}
*   ${t('section6Item2')}
*   ${t('section6Item3')}

## ${t('section7Title')}

${t('section7Text')}

## ${t('section8Title')}

${t('section8Text')}

## ${t('section9Title')}

${t('section9Text')}

## ${t('section10Title')}

${t('section10Text')}

*   ${t('emailLabel')}: ebodapalette@gmail.com
`;

  return (
    <LegalLayout
      title={t('title')}
      content={content}
      breadcrumb={[{ label: t('title') }]}
    />
  );
}