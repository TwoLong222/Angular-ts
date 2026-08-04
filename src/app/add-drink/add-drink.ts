import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DrinkService } from '../drink-service';
import { DrinkModel } from '../models';

@Component({
  selector: 'app-add-drink',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './add-drink.html',
  styleUrl: './add-drink.css'
})
export class AddDrink {
  private readonly fb = inject(FormBuilder);
  private readonly drinkService = inject(DrinkService);
  private readonly router = inject(Router);

  // Đổi 'price' thành 'giaCoBan' cho khớp với Model[cite: 1]
  protected readonly drinkForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    giaCoBan: [0, Validators.required],
  });

  protected save(): void {
    if (this.drinkForm.invalid) {
      this.drinkForm.markAllAsTouched();
      return;
    }

    
    const { name, description, giaCoBan } = this.drinkForm.getRawValue();
    const currentDrinks = this.drinkService.drinks();

    const newId = currentDrinks.length > 0 ? Math.max(...currentDrinks.map(d => d.id)) + 1 : 1;
    
    
    const newDrink: DrinkModel = {
      id: newId,
      name,
      description,
      giaCoBan,
      imgUrl: 'https://via.placeholder.com/150', 
      isPopular: false,
      toppings: [] 
    };
    
    this.drinkService.addDrink(newDrink);
    this.router.navigate(['/drinks']);
  }
}