import { Component, computed, input, signal } from '@angular/core';
import { DrinkModel, Topping } from '../models';

@Component({
  selector: 'app-drink-detail',
  standalone: true,
  imports: [],
  templateUrl: './drink-detail.html',
  styleUrl: './drink-detail.css',
})
export class DrinkDetail {
  readonly drink = input.required<DrinkModel>();
  protected readonly soLy = signal<number>(1);

  protected readonly tongTien = computed(() => this.drink().giaCoBan * this.soLy());

  protected readonly tongTienSauGiamGia = computed(() => {
    const tienGoc = this.tongTien();
    if (this.soLy() >= 5) {
      return tienGoc * 0.9;
    }
    return tienGoc;
  });

  protected readonly toppingCanDung = computed(() =>
    this.drink().toppings.map((topping) => ({
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
}

