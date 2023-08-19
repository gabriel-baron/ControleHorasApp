import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimeService {
  private apiURL;
  private apiKEY;
  private apiRESPONSE: any;

  constructor(
    private http : HttpClient,
  ) {
    this.apiURL = 'https://mypersonaltime-3008d-default-rtdb.firebaseio.com';
    this.apiKEY = 'AIzaSyC4VnLyLh9_P5WZ5CF9Z5mrrLjgX5jkQgw';
  }

  getAllTime(): Promise<Object | undefined> {
    return this.http.get(`${this.apiURL}/.json`
    ).toPromise().catch(error => error);
  }

  postAddProducts(bodyDTO: any): Promise<Object | undefined> {
    return this.http.post(`${this.apiURL}/times/.json`, bodyDTO
    ).toPromise().catch(error => error);
  }

  // patchEditProducts(bodyDTO: any): Promise<Object | undefined> {
  //   return this.http.patch(`${this.apiURL}/Produtos/.json`, bodyDTO
  //   ).toPromise().catch(error => error);
  // }

  // deleteProduct(bodyDTO: any): Promise<Object | undefined> {
  //   return this.http.delete(`${this.apiURL}/Produtos/${bodyDTO}.json`,
  //   ).toPromise().catch(error => error);
  // }

  // handleError(error: HttpErrorResponse) {
  //   let errorMessage = '';
  //   if (error.error instanceof ErrorEvent) {
  //     // Error ocurred on the client side
  //     errorMessage = error.error.message;
  //   } else {
  //     // Error ocurred on the server side
  //     errorMessage = error.error.error['message'];
  //   }
  //   return throwError(errorMessage);
  // };

  // getProductId(data: any, code: number): any {
  //   let dataProductsArray: any[] = data;
  //   let elementId: any = null;

  //   dataProductsArray.forEach(item => {
  //     let objEntries = Object.entries(item);
  //     objEntries.forEach(element => {
  //       let arrayItem: any = element[1];
  //       if (arrayItem.code === code) {
  //         elementId = element[0];
  //       }
  //     });
  //   });

  //   return elementId;
  // }
}
