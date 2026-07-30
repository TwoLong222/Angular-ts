import { DrinkModel } from "./models";

export const MOCK_DRINKS: DrinkModel[] = [
    {
        id: 1,
        name: 'Tra sua tran chau duong den',
        description: 'Tra sua dam vi',
        giaCoBan: 35000,
        toppings: [
            {name: 'Tran chau duong den',quantity: 2, unit: 'va'},
            {name: 'Kem chese', quantity: 1, unit: 'lop'}
        ]
    }, 

    {
        id: 2,
        name: 'Tra sua Matcha',
        description: 'Huong vi Matcha Nhat Ban',
        giaCoBan: 50000,
        toppings: [
            {name: ' Tran chau trang', quantity: 2, unit: 'va'},
            {name: 'Pudding trung', quantity: 2, unit: 'cai'}
        ]
    }, 

    {
        id: 3,
        name: 'Hong tra sua',
        description: ' Tra den truyen thong',
        giaCoBan: 35000,
        toppings: [
            {name: ' Thach trai cay', quantity: 1, unit: 'va'},
            {name: 'Thach dua', quantity: 1, unit: 'va'}
        ]
    }
];