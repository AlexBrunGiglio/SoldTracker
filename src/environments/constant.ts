import { CategoryDto } from '../core/database/categories/category-dto';

export const accessToken = 'acces_token';

export enum CategoriesType {
    restaurant = 'Restaurant_CategoriesType',
    loisirs = 'Loisirs_CategoriesType',
    jeux = 'Jeux_CategoriesType',
    courses = 'Courses_CategoriesType',
    shopping = 'Shopping_CategoriesType',
    voiture = 'Voiture_CategoriesType',
    essence = 'Essence_CategoriesType',
    remboursement = 'Remboursement_CategoriesType',
    retrait = 'Retrait_CategoriesType',
    epargne = 'Epargne_CategoriesType',
    bar = 'Bar_CategoriesType',
    avion = 'Avion_CategoriesType',
    bateau = 'Bateau_CategoriesType'
}

export const categoriesList: CategoryDto[] = [
    {
        label: 'Restaurant',
        icon: '🍔',
        code: CategoriesType.restaurant,
        backgroundColor: '#ffd200'
    },
    {
        label: 'Loisirs',
        icon: '🏛',
        code: CategoriesType.loisirs,
        backgroundColor: '#a99873'
    },
    {
        label: 'Jeux-Vidéos',
        icon: '🎮',
        code: CategoriesType.jeux,
        backgroundColor: '#ef8a8a'
    },
    {
        label: 'Courses',
        icon: '🛒',
        code: CategoriesType.courses,
        backgroundColor: '#d9d9d9'
    },
    {
        label: 'Shopping',
        icon: '🛍',
        code: CategoriesType.shopping,
        backgroundColor: '#E1CFFF'
    },
    {
        label: 'Voiture',
        icon: '🚘',
        code: CategoriesType.voiture,
        backgroundColor: '#ff4949'
    },
    {
        label: 'Essence',
        icon: '⛽️',
        code: CategoriesType.essence,
        backgroundColor: '#7e7a7a'
    },
    {
        label: 'Remboursement',
        icon: '💵',
        code: CategoriesType.remboursement,
        backgroundColor: '#B0DC94'
    },
    {
        label: 'Retrait DAB',
        icon: '🏧',
        code: CategoriesType.retrait,
        backgroundColor: '#5cc1f6'
    },
    {
        label: 'Epargne',
        icon: '🏦',
        code: CategoriesType.epargne,
        backgroundColor: '#6ec259'
    },
    {
        label: 'Bar',
        icon: '🍻',
        code: CategoriesType.bar,
        backgroundColor: '#cda7ff'
    },
    {
        label: 'Avion',
        icon: '🛩',
        code: CategoriesType.avion,
        backgroundColor: '#B4EDFF'
    },
    {
        label: 'Bateau',
        icon: '⛴',
        code: CategoriesType.bateau,
        backgroundColor: '#727cc3'
    },
];
