import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormArray, FormGroup } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DrinkService } from '../drink-service';
import { DrinkModel, Topping } from '../models';

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

  protected readonly drinkForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    giaCoBan: [0, Validators.required],
    imgUrl: ['', Validators.required],
    toppings: this.fb.array<FormGroup>([]),
  });

  protected get toppings(): FormArray {
    return this.drinkForm.get('toppings') as FormArray;
  }

  protected addTopping(): void {
    this.toppings.push(
      this.fb.group({
        name: ['', Validators.required],
        quantity: [1, [Validators.required, Validators.min(1)]],
        unit: ['', Validators.required],
      })
    );
  }

  protected removeTopping(index: number): void {
    this.toppings.removeAt(index);
  }

  protected save(): void {
    if (this.drinkForm.invalid) {
      this.drinkForm.markAllAsTouched();
      return;
    }

    const { name, description, giaCoBan, imgUrl } = this.drinkForm.getRawValue();
    const currentDrinks = this.drinkService.drinks();
    const newId = currentDrinks.length > 0 ? Math.max(...currentDrinks.map((d) => d.id)) + 1 : 1;

    const toppingsValue = this.toppings.controls.map((control) => control.getRawValue() as Topping);

    const newDrink: DrinkModel = {
      id: newId,
      name,
      description,
      giaCoBan,
      imgUrl,
      isPopular: false,
      toppings: toppingsValue,
    };

    this.drinkService.addDrink(newDrink);
    this.router.navigate(['/drinks']);
  }
}