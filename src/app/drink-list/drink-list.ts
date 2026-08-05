import { Component, computed, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DrinkService } from '../drink-service'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>Xác nhận xóa</h2>
    <mat-dialog-content>
      Bạn có chắc chắn muốn xóa món nước này không? Hành động này không thể hoàn tác.
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Hủy</button>
      <button mat-flat-button color="warn" [mat-dialog-close]="true">Xóa</button>
    </mat-dialog-actions>
  `
})
export class ConfirmDialogComponent {}


@Component({
  selector: 'app-drink-list',
  standalone: true,
  imports: [
    CommonModule, FormsModule, MatCardModule, MatDialogModule, RouterLink, MatButtonModule, 
    MatIconModule, MatInputModule, MatFormFieldModule, 
    MatListModule, MatChipsModule,
    MatSelectModule 
  ],
  templateUrl: './drink-list.html' 
})
export class DrinkList {
  
  protected readonly filter = signal<'all' | 'popular'>('all');
  
  private readonly drinkService = inject(DrinkService);
  private readonly dialog = inject(MatDialog); 

  protected readonly keyword = signal<string>('');
  protected readonly sortOrder = signal<'asc' | 'desc' | 'none'>('none');
  
  readonly drinks = this.drinkService.drinks;

  protected readonly filteredDrinks = computed(() => {
    const key = this.keyword().toLowerCase().trim();
    let result = this.drinkService.drinks(); 
    
    if (key !== '') {
      result = result.filter(drink => 
        drink.name.toLowerCase().includes(key) || 
        (drink.description && drink.description.toLowerCase().includes(key))
      );
    }

    if (this.filter() === 'popular') {
      result = result.filter(d => d.isPopular);
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
  
  protected deleteDrink(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.drinkService.deleteDrink(id); 
      }
    });
  }
}