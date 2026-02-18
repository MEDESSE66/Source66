
export enum CategoryType {
  SURNAME = 'Noms de famille',
  PROVERB = 'Proverbes & Adages',
  HISTORY = 'Histoire & Lieux',
  TRADITION = 'Traditions & Rites',
  URBAN = 'Vie Urbaine & Codes',
  BUSINESS = 'Opportunités Locales',
  ENTERTAINMENT = 'Humour & Contes',
  LINGUISTIC = 'Langues & Ethnies',
  ART = 'Artisanat & Textile',
  GEOGRAPHY = 'Géographie Urbaine'
}

export interface CultureItem {
  id: string;
  title: string;
  category: CategoryType;
  description: string;
  meaning?: string;
  origin?: string;
  tags: string[];
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
