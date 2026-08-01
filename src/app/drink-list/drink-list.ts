import { Component, computed, signal } from '@angular/core';
import { DrinkDetail } from '../drink-detail/drink-detail';
import { MOCK_DRINKS } from '../mock-drinks';
import { DrinkModel } from '../models';

@Component({
  selector: 'app-drink-list',
  imports: [DrinkDetail],
  templateUrl: './drink-list.html',
  styleUrl: './drink-list.css',
})

export class DrinkList {


  protected readonly danhSachTraSua = signal<DrinkModel[]>(MOCK_DRINKS);

  protected readonly selectedDrink = signal<DrinkModel>(this.danhSachTraSua()[0]);

  protected chonTraSua(drink: DrinkModel): void {
    this.selectedDrink.set(drink);
  }

  protected  readonly maxPrice = computed(() => 
    Math.max(...this.danhSachTraSua().map((drink) => drink.giaCoBan))
  );
    
}

