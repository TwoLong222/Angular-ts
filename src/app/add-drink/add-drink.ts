import { Component, inject, signal} from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormArray, FormGroup } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DrinkService } from '../drink-service';
import { DrinkModel, Topping } from '../models';
import { form, FormField, submit, required, minLength, min, max, email, requiredError, schema} from '@angular/forms/signals';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-add-drink',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, FormField, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './add-drink.html',
  styleUrl: './add-drink.css'
})
export class AddDrink {
  private readonly fb = inject(FormBuilder);
  private readonly drinkService = inject(DrinkService);
  private readonly snackBar = inject(MatSnackBar);
  private readonly router = inject(Router);

  protected readonly drinkModel = signal({
    id: 0,
    name:'',
    description:'',
    giaCoBan:0,
    imgUrl: '',
    authorEmail:'',
    isPopular: false,
    toppings: []
  })

  protected async save(event: Event): Promise<void> {
    event.preventDefault(); 
    const ok = await submit(this.drinkForm, async () =>{
      const formData = this.drinkModel(); 
    console.log('Dữ liệu chuẩn bị lưu:', formData);
    await this.drinkService.addDrink(formData);
    await new Promise(resolve => setTimeout(resolve, 1000));
    });

    if(ok){
      this.drinkForm().reset();
      this.drinkModel.set({
        id: 0,
        name:'',
        description:'',
        giaCoBan:0,
        imgUrl: '',
        authorEmail:'',
        isPopular: false,
        toppings: []
      })
      this.snackBar.open('Đã thêm món', ' Đóng',{
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
    }
  }
  protected readonly drinkForm = form(this.drinkModel, (schemaPath) =>{
    required(schemaPath.name, {message: ' Vui lòng nhập tên món'});
    minLength(schemaPath.name, 3, {message: ' Tên món phải có tối thiểu 3 ký tự '});

    required(schemaPath.description, {message: 'Vui lòng nhập mô tả cho món nước'});
    min(schemaPath.giaCoBan, 1000, {message: 'Giá tối thiểu phải từ 1.000đ'});
    max(schemaPath.giaCoBan, 200000, {message: 'Giá tối đa không vượt qua 200.000đ'});

    required(schemaPath.authorEmail, {message: ' Vui lòng nhập Email người tạo'});
    email(schemaPath.authorEmail, { message: ' Email khong đúng định dạng (ví dụ: abc@gmail.com'});
    
  });

}