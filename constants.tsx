
import { CategoryType, CultureItem } from './types';

export const MOCK_DATA: CultureItem[] = [
  {
    id: '1',
    title: 'SOGLO',
    category: CategoryType.SURNAME,
    description: "Nom de famille d'origine Fon, très répandu au sud du Bénin.",
    meaning: "Signifie littéralement 'Le léopard s'est accroupi'. Il évoque la force tranquille et la patience stratégique.",
    origin: "Royaume de Danxomè",
    tags: ['Fon', 'Sud', 'Noblesse']
  },
  {
    id: '2',
    title: 'ADJAVON',
    category: CategoryType.SURNAME,
    description: "Nom porté principalement par les populations Xwla et Adja.",
    meaning: "Lié à la lignée des Adja, souvent associé au commerce et à la diplomatie.",
    origin: "Mono / Grand-Popo",
    tags: ['Adja', 'Xwla', 'Côtier']
  },
  {
    id: '3',
    title: 'N’kpè foun dé jè gbé on, é gnon a',
    category: CategoryType.PROVERB,
    description: "Adage Fon sur la prudence.",
    meaning: "Quand la panthère sort ses griffes, il n'est plus temps de discuter. Signifie qu'il faut prévenir le danger avant qu'il ne soit trop tard.",
    origin: "Sagesse Fon",
    tags: ['Prudence', 'Conseil', 'Fon']
  },
  {
    id: '4',
    title: 'Ganvié',
    category: CategoryType.HISTORY,
    description: "La Venise de l'Afrique, cité lacustre sur le lac Nokoué.",
    meaning: "Gan (collectivité) + Vié (sauvée). Littéralement 'la collectivité est sauvée'.",
    origin: "Fondée par les Toffinou fuyant l'esclavage.",
    tags: ['Patrimoine', 'Tourisme', 'Lacustre']
  },
  {
    id: '5',
    title: 'BIO GUERRA',
    category: CategoryType.HISTORY,
    description: "Prince Wasangari et héros de la résistance nationale.",
    meaning: "Symbole de la résistance contre l'occupation coloniale dans le Nord-Bénin.",
    origin: "Borgou / Nikki",
    tags: ['Héros', 'Nord', 'Résistance']
  },
  {
    id: '6',
    title: 'Le Feu Rouge de Porto-Novo',
    category: CategoryType.URBAN,
    description: "Phénomène sociologique de l'anticipation temporelle.",
    meaning: "À Porto-Novo, le démarrage se fait 5 secondes avant le vert. C'est un code social implicite : celui qui attend le vrai vert se fait klaxonner.",
    origin: "Porto-Novo",
    tags: ['Société', 'Route', 'Insolite']
  },
  {
    id: '7',
    title: 'Si tu prends Zem',
    category: CategoryType.URBAN,
    description: "Règle non écrite de la tarification au faciès et à la météo.",
    meaning: "Le prix double s'il pleut. Ne jamais accepter le premier prix annoncé par un 'kéké-no'. La négociation est un rituel de respect mutuel, pas une offense.",
    origin: "Cotonou / Calavi",
    tags: ['Transport', 'Astuce', 'Économie']
  },
  {
    id: '8',
    title: 'Transformation de la Noix de Cajou',
    category: CategoryType.BUSINESS,
    description: "Idée : Création d'une unité artisanale de torréfaction et d'assaisonnement local (piment, gingembre) pour le marché urbain.",
    meaning: "Le Bénin est un grand producteur, mais exporte beaucoup brut. La valeur ajoutée locale est un créneau porteur avec un investissement modéré.",
    origin: "Collines / Borgou",
    tags: ['Agro-industrie', 'PME', 'Investissement']
  },
  {
    id: '9',
    title: 'Élevage d\'Aulacodes (Aulacodiculture)',
    category: CategoryType.BUSINESS,
    description: "Idée : Élevage domestique d'agoutis pour répondre à la forte demande en viande de brousse 'contrôlée'.",
    meaning: "L'agouti est très prisé lors des fêtes. L'élevage permet de préserver la faune sauvage tout en générant des revenus réguliers.",
    origin: "Rural / Péri-urbain",
    tags: ['Élevage', 'Rentable', 'Gastronomie']
  },
  {
    id: '10',
    title: 'Le Kanvo (Pagne Tissé)',
    category: CategoryType.ART,
    description: "Le textile emblématique du Bénin, tissé à la main.",
    meaning: "Symbole de prestige, le Kanvo est aujourd'hui modernisé. Il raconte l'histoire à travers ses motifs et ses couleurs.",
    origin: "Abomey / Nord-Bénin",
    tags: ['Mode', 'Artisanat', 'Luxe']
  },
  {
    id: '11',
    title: 'Langue Fon (Fongbé)',
    category: CategoryType.LINGUISTIC,
    description: "Langue véhiculaire majoritaire dans le sud du Bénin.",
    meaning: "Langue Kwa, elle est tonale. Le mot 'Do' peut signifier 'dire', 'dormir', 'pousser' ou 'mur' selon l'intonation.",
    origin: "Plateau d'Abomey",
    tags: ['Langue', 'Culture', 'Sud']
  },
  {
    id: '12',
    title: 'Pourquoi l\'hyène a les pattes arrière courtes ?',
    category: CategoryType.ENTERTAINMENT,
    description: "Conte populaire expliquant la morphologie de l'animal.",
    meaning: "Dans ce conte, l'hyène, par avidité, a voulu assister à deux fêtes en même temps et s'est fait tirer par des cordes jusqu'à déformer ses pattes. Morale : Qui trop embrasse mal étreint.",
    origin: "Tradition Orale",
    tags: ['Conte', 'Enfant', 'Morale']
  },
  {
    id: '13',
    title: 'Blague : Le retour de France',
    category: CategoryType.ENTERTAINMENT,
    description: "Humour sur le 'Binguiste' qui a oublié ses racines.",
    meaning: "Koffi revient de Paris en plein mois d'août avec une écharpe et demande 'C'est quoi ce truc jaune qu'on mange ?' Sa mère répond : 'C'est du maïs, et enlève ton écharpe, il fait 30 degrés !'",
    origin: "Humour Urbain",
    tags: ['Rire', 'Diaspora', 'Quotidien']
  }
];
