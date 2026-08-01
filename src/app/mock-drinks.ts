import { DrinkModel } from "./models";

export const MOCK_DRINKS: DrinkModel[] = [
    {
        id: 1,
        name: 'Trà sữa trân châu đường đen',
        description: 'Trà sữa đậm vị, trân châu dai ngon',
        giaCoBan: 35000,
        imgUrl:'https://images.unsplash.com/photo-1558857563-b371033873b8?w=600',
        isPopular: true,
        toppings: [
            {name: 'Tran chau duong den',quantity: 2, unit: 'vá'},
            {name: 'Kem chese', quantity: 1, unit: 'lớp'}
        ]
    }, 

    {
        id: 2,
        name: 'Trà sữa Matcha',
        description: 'Hương vị Matcha Nhật Bản',
        giaCoBan: 50000,
        imgUrl:'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=600',
        isPopular: true,
        toppings: [
            {name: 'Trân châu trắng', quantity: 2, unit: 'vá'},
            {name: 'Pudding trứng', quantity: 2, unit: 'cái'}
        ]
    }, 

    {
        id: 3,
        name: 'Hồng trà sữa',
        description: ' Trà đen truyền thống',
        giaCoBan: 35000,
        imgUrl: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=600',
        isPopular: false,
        toppings: [
            {name: 'Thạch trà sữa', quantity: 1, unit: 'vá'},
            {name: 'Thạch dừa', quantity: 1, unit: 'vá'}
        ]
    }
];