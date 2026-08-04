import { Injectable,signal } from '@angular/core';
import { MOCK_DRINKS } from './mock-drinks';
import { DrinkModel } from './models';

@Injectable({
  providedIn: 'root',
})

export class DrinkService {
  private readonly drinkState = signal<DrinkModel[]>(MOCK_DRINKS);

  readonly drinks = this.drinkState.asReadonly();
  getDrinkById(id: number): DrinkModel | undefined {
    return this.drinkState().find((d) => d.id === id);
  }
  addDrink(newDrink: DrinkModel): void{
    this.drinkState.update(current => [...current, newDrink]);
  }

 
  deleteDrink(id: number): void {
    this.drinkState.update(current => current.filter(d => d.id !== id));
  }

  toggleFavorite(id: number): void {
    this.drinkState.update(current => 
      current.map(d => d.id === id ? { ...d, isPopular: !d.isPopular } : d)
    );
  }
}
