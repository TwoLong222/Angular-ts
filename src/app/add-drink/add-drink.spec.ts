import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AddDrink } from './add-drink';
import { DrinkService } from '../drink-service';

describe('AddDrink', () => {
  let component: AddDrink;
  let fixture: ComponentFixture<AddDrink>;
  let drinkService: DrinkService;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    router = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [AddDrink],
      providers: [{ provide: Router, useValue: router }],
    }).compileComponents();

    fixture = TestBed.createComponent(AddDrink);
    component = fixture.componentInstance;
    drinkService = TestBed.inject(DrinkService);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save a drink with multiple toppings', () => {
    component.drinkForm.patchValue({
      name: 'Trà sữa dâu',
      description: 'Mới thêm',
      giaCoBan: 42000,
      imgUrl: 'https://example.com/dau.jpg',
    });

    component.addTopping();
    component.addTopping();

    const toppings = component['toppings'].controls as Array<any>;
    toppings[0].patchValue({ name: 'Trân châu', quantity: 2, unit: 'vá' });
    toppings[1].patchValue({ name: 'Pudding', quantity: 1, unit: 'cái' });

    component.save();

    const createdDrink = drinkService.drinks().find((drink) => drink.name === 'Trà sữa dâu');

    expect(createdDrink).toBeDefined();
    expect(createdDrink?.toppings).toEqual([
      { name: 'Trân châu', quantity: 2, unit: 'vá' },
      { name: 'Pudding', quantity: 1, unit: 'cái' },
    ]);
    expect(router.navigate).toHaveBeenCalledWith(['/drinks']);
  });
});
