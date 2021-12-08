import { CategoriesType } from '../../../environments/constant';

export class CategoryDto {
    label: string;
    icon: string;
    code: CategoriesType;
    backgroundColor?: string;
}
