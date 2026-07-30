import { Component, signal, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MOCK_DRINKS } from './mock-drinks';
import { DrinkModel } from './models';
import { CommonModule, JsonPipe, DecimalPipe } from '@angular/common';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, JsonPipe, DecimalPipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  protected readonly title = signal('bai-tap-tra-sua');
  protected readonly shopname = signal('quan tra sua Angular');
  protected readonly danhSachTraSua = MOCK_DRINKS;

  protected readonly soLy = signal<number>(1);
  protected readonly selectedDrink = signal<DrinkModel>(this.danhSachTraSua[0]);
  protected chonTraSua(drink: DrinkModel): void {
    this.selectedDrink.set(drink);
    this.soLy.set(1);
  }
  
  protected tangSoLy(): void{
    this.soLy.update((n) => n + 1);
  }

  protected giamSoLy(): void{
    if(this.soLy() > 1){
      this.soLy.update((n) => n - 1);
    }
  }

  protected readonly tongTien = computed(() =>
  this.selectedDrink().giaCoBan * this.soLy());
  protected readonly toppingCanDung = computed(() => {
    return this.selectedDrink().toppings.map((topping)=>
    ({name: topping.name,
      quantity: topping.quantity * this.soLy(),
      unit: topping.unit
  }));
});

  protected readonly tongTienSauGiamGia = computed(() =>{
    const tienGoc = this.tongTien();

    if( this.soLy() >= 5){
      return tienGoc * 0.9;
    }
    return tienGoc;
  });

  protected readonly tongSoTopping = computed(() => {
    return this.toppingCanDung().reduce((tong, hienTai) => tong + hienTai.quantity, 0);
  });

}
