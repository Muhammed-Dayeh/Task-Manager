'use client';

import { Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Language } from '@/lib/i18n';

interface LanguageSwitcherProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

export function LanguageSwitcher({ currentLanguage, onLanguageChange }: LanguageSwitcherProps) {
  const languages = [
    { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
    { code: 'ar' as Language, name: 'العربية', flag: '🇸🇦' },
    { code: 'tr' as Language, name: 'Türkçe', flag: '🇹🇷' },
  ];

  const currentLang = languages.find(lang => lang.code === currentLanguage);

  return (
    <Select value={currentLanguage} onValueChange={(value: Language) => onLanguageChange(value)}>
      <SelectTrigger className="w-[140px]">
        <div className="flex items-center space-x-2">
          <Languages className="h-4 w-4" />
          <span className="flex items-center space-x-1">
            <span>{currentLang?.flag}</span>
            <span className="hidden sm:inline">{currentLang?.name}</span>
          </span>
        </div>
      </SelectTrigger>
      <SelectContent>
        {languages.map((language) => (
          <SelectItem key={language.code} value={language.code}>
            <div className="flex items-center space-x-2">
              <span>{language.flag}</span>
              <span>{language.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}