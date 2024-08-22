import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../../shared/models/User';
import { IUserLogin } from '../../shared/interfaces/IUserLogin';
import { HttpClient } from '@angular/common/http';
import { ADMIN_USER_EDIT_DATA, USER_BY_ID_URL, USER_GET_ALL_URL, USER_LOGIN_URL, USER_REGISTER_URL } from '../../shared/constants/url';
import { ToastrService } from 'ngx-toastr';
import { IUserRegister } from '../../shared/interfaces/IUserRegister';

const USER_KEY = 'User';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable = new Observable<User>;
  
  constructor(private http: HttpClient, private toastrService:ToastrService) {
    this.userObservable = this.userSubject;
   }

  public get currentUser():User{
    return this.userSubject.value;
  }

  login(userLogin:IUserLogin){
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next:(user)=>{
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(`Welcome to FoodMine!`,
            "Login Successfull"
          )
        },
        error:(errorResponse)=>{
          this.toastrService.error(errorResponse.error, 'Login Failed')
        }
      })
    )
  }

  register(userRegiser:IUserRegister): Observable<User>{
    return this.http.post<User>(USER_REGISTER_URL, userRegiser).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Welcome to the Foodmine ${user.name}`,
            'Register Successful'
          )
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error,
            'Register Failed')
        }
      })
    )
  }

  logout(){
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }

  updateUserData(userId:string,updatedUser:User){
    return this.http.put<User>(ADMIN_USER_EDIT_DATA + userId, updatedUser).pipe(tap({
      next:()=>{
        this.toastrService.success(`You successfully change data for user`);
      },  
      error:(errorResponse)=>{
        this.toastrService.error(errorResponse.error, "User information could not be changed")
      }
    }))
  }

  getAll():Observable<User[]>{
    return this.http.get<User[]>(USER_GET_ALL_URL);
  }

  getUserById(userId:string):Observable<User>{
    return this.http.get<User>(USER_BY_ID_URL + userId);
  }

  private setUserToLocalStorage(user:User){
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private getUserFromLocalStorage():User{
    const userJson = localStorage.getItem(USER_KEY);
    if(userJson) return JSON.parse(userJson) as User;
    
    return new User();
  }
}
