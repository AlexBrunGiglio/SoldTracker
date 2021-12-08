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
    },
    {
        label: 'Loisirs',
        icon: '🏛',
        code: CategoriesType.loisirs,
    },
    {
        label: 'Jeux-Vidéos',
        icon: '🎮',
        code: CategoriesType.jeux,
    },
    {
        label: 'Courses',
        icon: '🛒',
        code: CategoriesType.courses,
    },
    {
        label: 'Shopping',
        icon: '🛍',
        code: CategoriesType.shopping,
    },
    {
        label: 'Voiture',
        icon: '🚘',
        code: CategoriesType.voiture,
    },
    {
        label: 'Essence',
        icon: '⛽️',
        code: CategoriesType.essence,
    },
    {
        label: 'Remboursement',
        icon: '💵',
        code: CategoriesType.remboursement,
    },
    {
        label: 'Retrait DAB',
        icon: '🏧',
        code: CategoriesType.retrait,
    },
    {
        label: 'Epargne',
        icon: '🏦',
        code: CategoriesType.epargne,
    },
    {
        label: 'Bar',
        icon: '🍻',
        code: CategoriesType.bar,
    },
    {
        label: 'Avion',
        icon: '🛩',
        code: CategoriesType.avion,
    },
    {
        label: 'Bateau',
        icon: '⛴',
        code: CategoriesType.bateau,
    },
];
