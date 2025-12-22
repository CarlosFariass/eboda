'use client';

import LegalLayout from '@/components/LegalLayout';
import { useTranslations } from 'next-intl';

export default function SobreNosPage() {
  const t = useTranslations('about');

  const content = `# ${t('title')}

## ${t('mission')}

**EBODA** ${t('missionText')}

${t('beliefText')}

## ${t('whatWeOffer')}

${t('offerIntro')}

*   **${t('imageColorPicker')}**: ${t('imageColorPickerDesc')}
*   **${t('colorWheelInteractive')}**: ${t('colorWheelInteractiveDesc')}
*   **${t('colorLibrary')}**: ${t('colorLibraryDesc')}

## ${t('technology')}

${t('technologyText')}

## ${t('contact')}

${t('contactText')}

*   **${t('email')}**: ebodapalette@gmail.com
`;

  return (
    <LegalLayout
      title={t('title')}
      content={content}
      breadcrumb={[{ label: t('title') }]}
    />
  );
}