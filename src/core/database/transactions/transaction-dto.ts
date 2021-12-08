import { CategoryDto } from '../categories/category-dto';

export class TransactionDto {
    id?: string;
    label: string;
    date: Date;
    value: number;
    categorie: CategoryDto;
}
