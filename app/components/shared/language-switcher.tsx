import { useTranslation } from 'react-i18next'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const LANGUAGES = [
  {
    locale: 'vi',
    name: 'Tiếng Việt (vi)'
  },
  { locale: 'en', name: 'English (en)' }
]

type Locales = 'en' | 'vi'

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()

  const changeLanguage = (lng: Locales) => {
    i18n.changeLanguage(lng)
  }

  return (
    <Select defaultValue={i18n.language || 'en'} onValueChange={changeLanguage}>
      <SelectTrigger className='z-100 w-35'>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {LANGUAGES.map((item) => (
            <SelectItem key={item.locale} value={item.locale}>
              {item.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
