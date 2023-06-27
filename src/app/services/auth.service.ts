import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthResponse } from "../shared/auth-response.model";
import { catchError, tap } from "rxjs/operators";
import { throwError, BehaviorSubject } from "rxjs";
import { User } from "../shared/user.model";
import { Router } from "@angular/router";

@Injectable(
    { providedIn: 'root' }
)
export class AuthService {

    constructor(private http: HttpClient,private router:Router) { }

    userData = new BehaviorSubject<User>(null);

    signup(email: string, password: string) {
        return this.http.post<AuthResponse>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBRZWG_ekZAiYwnV1efmXHrlTYFpO6I_9s',
            {
                email: email,
                password: password,
                returnSecureToken: true
            })
            .pipe(tap(
                (resData: AuthResponse) => {
                    this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
                }
            ),
                catchError(
                    this.handleError
                )
            )
    }

    signin(email: string, password: string) {
        return this.http.post<AuthResponse>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBRZWG_ekZAiYwnV1efmXHrlTYFpO6I_9s',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(
            tap(
                (resData: AuthResponse) => {
                    this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
                }
            ),
            catchError(
                this.handleError
            )
        )
    }

    handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(
            email, userId, token, expirationDate
        );
        this.userData.next(user);
    }

    private handleError(errorResponse: HttpErrorResponse) {
        let errorMessage = 'Unknown error occured';
        if (!errorResponse.error || !errorResponse.error.error) {
            return throwError(errorMessage);
        }
        switch (errorResponse.error.error.message) {
            case 'EMAIL_NOT_FOUND':
                return throwError('This email not found');
            case 'INVALID_PASSWORD':
                return throwError('This password is invalid');
            case 'USER_DISABLED':
                return throwError('This user is disabled');
            case 'EMAIL_EXISTS':
                return throwError('This email exists already');
            case 'OPERATION_NOT_ALLOWED':
                return throwError('Password not allowed');
            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                return throwError('Request blocked, try later');
        }
    }

    logout() {
        this.userData.next(null);
        localStorage.clear();
        this.router.navigate(['auth']);
    }

    autoLogin(){

    }
}