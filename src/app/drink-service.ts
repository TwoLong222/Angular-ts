import { Injectable, computed, inject } from '@angular/core';
import { HttpClient, httpResource } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { DrinkModel } from './models';

const API_URL = 'http://localhost:3001/drinks';

@Injectable({
  providedIn: 'root',
})
export class DrinkService {
  private readonly http = inject(HttpClient);

  private readonly drinksResource = httpResource<DrinkModel[]>(() => API_URL, {
    defaultValue: [],
  });

  readonly drinks = computed(() => this.drinksResource.value() ?? []);
  readonly loading = this.drinksResource.isLoading;

  getDrinkById(id: string): DrinkModel | undefined {
    return this.drinks().find((d) => d.id === id);
  }

  async addDrink(newDrink: Omit<DrinkModel, 'id'>): Promise<void> {
    await firstValueFrom(this.http.post<DrinkModel>(API_URL, newDrink));
    this.drinksResource.reload();
  }

  async deleteDrink(id: string): Promise<void> {
    await firstValueFrom(this.http.delete<void>(`${API_URL}/${id}`));
    this.drinksResource.reload();
  }

  async toggleFavorite(id: string): Promise<void> {
    const drink = this.getDrinkById(id);
    if (!drink) return;
    await firstValueFrom(
      this.http.patch<DrinkModel>(`${API_URL}/${id}`, { isPopular: !drink.isPopular }),
    );
    this.drinksResource.reload();
  }
}
