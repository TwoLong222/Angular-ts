import { Component, computed, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { DrinkService } from '../drink-service';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-delete-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>Xác nhận xóa</h2>
    <mat-dialog-content>
      Bạn có chắc chắn muốn xóa món này không?
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Hủy</button>
      <button mat-flat-button color="warn" [mat-dialog-close]="true">Xóa</button>
    </mat-dialog-actions>
  `,
})
export class ConfirmDeleteDialogComponent {}

@Component({
  selector: 'app-drink-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule, MatIconModule, MatListModule, MatDialogModule],
  templateUrl: './drink-detail.html',
  styleUrl: './drink-detail.css',
})
export class DrinkDetail {

  private readonly drinkService = inject(DrinkService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);
  private readonly params = toSignal(this.route.paramMap);

  // Dữ liệu tới từ HTTP (bất đồng bộ) -> selectedDrink có thể chưa sẵn sàng
  // ngay khi component khởi tạo, khác với lúc còn đọc mock đồng bộ.
  protected readonly selectedDrink = computed(() =>{
    const id = this.params()?.get('id');
    return id ? this.drinkService.getDrinkById(id) : undefined;
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
  
  protected deleteItem(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '400px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.drinkService.deleteDrink(id);
        this.router.navigate(['/drinks']);
      }
    });
  }

 
  protected toggleFav(id: string): void {
    this.drinkService.toggleFavorite(id);
  }
}

