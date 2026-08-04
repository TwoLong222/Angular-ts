import { Component, computed, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DrinkService } from '../drink-service'; 

@Component({
  selector: 'app-drink-list',
  imports: [FormsModule, RouterLink],
  templateUrl: './drink-list.html',
  styleUrl: './drink-list.css',
})
export class DrinkList {
  private readonly drinkService = inject(DrinkService);

  protected readonly keyword = signal<string>('');
  

  protected readonly sortOrder = signal<'asc' | 'desc' | 'none'>('none');

  protected readonly filteredDrinks = computed(() => {
    const key = this.keyword().toLowerCase().trim();
    let result = this.drinkService.drinks();

    if (key !== '') {
      
      result = result.filter(drink => 
        drink.name.toLowerCase().includes(key) || 
        (drink.description && drink.description.toLowerCase().includes(key))
      );
    }

    const order = this.sortOrder();
    if (order !== 'none') {
      
      result = [...result].sort((a, b) => 
        order === 'asc' ? a.giaCoBan - b.giaCoBan : b.giaCoBan - a.giaCoBan
      );
    }

    return result;
  });


  protected readonly resultCount = computed(() => this.filteredDrinks().length);
}