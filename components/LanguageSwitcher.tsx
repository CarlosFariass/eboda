'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';

const LanguageSwitcher = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const languages = [
    {
      code: 'pt',
      name: 'PT',
      flag: '🇧🇷'
    },
    {
      code: 'en',
      name: 'EN',
      flag: '🇺🇸'
    }
  ];

  const handleLanguageChange = (newLocale: string) => {
    const currentPath = pathname.replace(`/${locale}`, '');
    router.push(`/${newLocale}${currentPath}`);
  };

  return (
    <div className="flex items-center gap-1">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleLanguageChange(lang.code)}
          className={`
            px-2 py-2 min-w-[40px] h-10 rounded-lg text-sm font-bold
            ${locale === lang.code 
              ? 'bg-gradient-to-r from-amber-500 to-amber-500 hover:from-amber-600 hover:to-amber-600 text-white' 
              : 'text-gray-700 dark:text-white/70 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10'
            }
            transition-all duration-200
          `}
          title={lang.code === 'pt' ? 'Português (Brasil)' : 'English (US)'}
        >
          {lang.name}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;