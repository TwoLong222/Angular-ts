export interface Topping {
    name: string;
    quantity: number;
    unit: string;
}

export interface DrinkModel{
    id: string;
    name: string;
    description: string;
    giaCoBan: number;
    imgUrl: string;
    isPopular: boolean;
    toppings: Topping[];
    authorEmail: string;
}