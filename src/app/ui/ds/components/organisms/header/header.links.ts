import { Language } from '@/ui/types/language.types';

export const headerLinks: {
  title: string;
  to: string;
  fragment?: string;
}[] = [
  { title: 'Iniciar', to: '', fragment: 'start' },
  { title: 'Instalar', to: '', fragment: 'install' },
  { title: 'Testimonios', to: '', fragment: 'testimonial' },
];

export const headerLaguageLinks: { id: Language; title: string }[] = [
  { id: Language.EN, title: 'EN' },
  { id: Language.ES, title: 'ES' },
];
