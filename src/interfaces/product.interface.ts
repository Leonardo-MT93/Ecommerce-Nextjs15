export interface Product {
    id: string;
    description: string | null; //Igual que en prisma
    images: string[];
    inStock: number;
    price: number;
    sizes: Size[];
    slug: string;
    tags: string[];
    title: string;
    // type: Type;
    gender: Gender
}

export interface CartProduct {
    id: string;
    slug: string;
    title: string;
    size: Size;
    quantity: number;
    image: string;
    price: number;
}

export interface ProductImage {
    id: number;
    url: string;
    productId: string;
}
export type Gender = 'men'|'women'|'kid'|'unisex';
export type Size = 'XS'|'S'|'M'|'L'|'XL'|'XXL'|'XXXL';
export type Type = 'shirts'|'pants'|'hoodies'|'hats';