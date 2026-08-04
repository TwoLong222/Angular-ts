import { Component, computed,signal, inject} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { DrinkService } from '../drink-service';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-drink-detail',
  imports: [RouterLink],
  templateUrl: './drink-detail.html',
  styleUrl: './drink-detail.css',
})
export class DrinkDetail {
  private readonly drinkService = inject(DrinkService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly params = toSignal(this.route.paramMap);

  protected readonly selectedDrink = computed(() =>{
    const id = Number(this.params()?.get('id'));
    return this.drinkService.getDrinkById(id);
  });
    
  protected readonly soLy = signal<number>(1);
  protected readonly tongTien = computed(() => (this.selectedDrink()?.giaCoBan || 0) * this.soLy());

  protected readonly tongTienSauGiamGia = computed(() => {
    const tienGoc = this.tongTien();
    if (this.soLy() >= 5) {
      return tienGoc * 0.9;
    }
    return tienGoc;
  });

  protected readonly toppingCanDung = computed(() =>
  (this.selectedDrink()?.toppings || []).map((topping) => ({
    name: topping.name,
    quantity: topping.quantity * this.soLy(),
    unit: topping.unit,
  }))
);

  protected readonly tongSoTopping = computed(() =>
    this.toppingCanDung().reduce((tong, hienTai) => tong + hienTai.quantity, 0)
  );

  protected tangSoLy(): void {
    this.soLy.update((n) => n + 1);
  }

  protected giamSoLy(): void {
    if (this.soLy() > 1) {
      this.soLy.update((n) => n - 1);
    }
  }

  protected adjustIngredients() {
    return this.toppingCanDung();
  }

  protected ingredientIcon(name: string): string {
    const iconMap: Record<string, string> = {
      'tran chau': '🧋',
      'kem': '🍦',
      'pudding': '🍮',
      'thach': '🍮',
      'matcha': '🍵',
      'tra': '🍵',
    };

    const lowerName = name.toLowerCase();
    for (const key of Object.keys(iconMap)) {
      if (lowerName.includes(key)) {
        return iconMap[key];
      }
    }

    return '🧁';
  }
  
  protected deleteItem(id: number): void {
    this.drinkService.deleteDrink(id);
    this.router.navigate(['/drinks']); 
  }

 
  protected toggleFav(id: number): void {
    this.drinkService.toggleFavorite(id);
  }
}

