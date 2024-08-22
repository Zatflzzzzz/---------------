import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/pages/home/home.component';
import { FoodPageComponent } from './component/pages/food-page/food-page.component';
import { CartPageComponent } from './component/pages/cart-page/cart-page.component';
import { LoginPageComponent } from './component/pages/login-page/login-page.component';
import { RegisterPageComponent } from './component/pages/register-page/register-page.component';
import {CheckoutPageComponent} from "./component/pages/checkout-page/checkout-page.component"
import { AuthGuard } from './auth/guards/auth.guard';
import { PaymentPageComponent } from './component/pages/payment-page/payment-page.component';
import { AdminAddFoodToListComponent } from './component/pages/admin/admin-add-food-to-list/admin-add-food-to-list.component';
import { AdminChangeFoodListComponent } from './component/pages/admin/admin-change-food-list/admin-change-food-list.component';
import { AdminChangeUserListComponent } from './component/pages/admin/admin-change-user-list/admin-change-user-list.component';
import { AdminGiveAdminRulesComponent } from './component/pages/admin/admin-give-admin-rules/admin-give-admin-rules.component';
import { UserPageEditComponent } from './component/pages/user-page-edit/user-page-edit.component';
import { FoodDeletePageComponent } from './component/pages/food-delete-page/food-delete-page.component';
import { FoodEditPageComponent } from './component/pages/food-edit-page/food-edit-page.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'search/:searchTerm', component:HomeComponent},
  {path:'tag/:tag', component:HomeComponent},
  {path:'food/:id', component:FoodPageComponent},
  {path:'cart-page', component:CartPageComponent, canActivate:[AuthGuard]},
  {path:'login', component:LoginPageComponent},
  {path:'register', component:RegisterPageComponent},
  {path:'checkout', component:CheckoutPageComponent, canActivate:[AuthGuard]},
  {path:'payment', component:PaymentPageComponent, canActivate:[AuthGuard]},
  {path:'admin/changeFoodList', component:AdminChangeFoodListComponent, canActivate:[AuthGuard]},
  {path:'admin/changeUserList', component:AdminChangeUserListComponent, canActivate:[AuthGuard]},
  {path:'admin/changeUserData/:id', component:UserPageEditComponent, canActivate:[AuthGuard]},
  {path:'admin/addFoodList', component:AdminAddFoodToListComponent, canActivate:[AuthGuard]},
  {path:'admin/giveAdminRules', component:AdminGiveAdminRulesComponent, canActivate:[AuthGuard]},
  {path:'editFoodData/:id', component:FoodEditPageComponent, canActivate:[AuthGuard]},
  {path:'deleteFoodData/:id', component:FoodDeletePageComponent, canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
