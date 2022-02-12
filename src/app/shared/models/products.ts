export class Products{
  id!: string;
  name!: string;
  price!: number;
  tags?: string;
  favorite: boolean = false;
  stars: number = 0;
  imageUrl!: string;
  origins!: string;
  cookTime!: string;
  description!: string;
}
