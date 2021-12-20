import { Injectable } from '@angular/core';
//model
import { Contact } from 'src/app/models/contact';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private list: Contact[] = [];
  private currentListSubject: BehaviorSubject<Contact[]>;
  public currentList: Observable<Contact[]>;
  data: Contact[];

  constructor(private httpClient: HttpClient) {
    this.currentListSubject = new BehaviorSubject<Contact[]>(this.list);
    this.currentList = this.currentListSubject.asObservable();
  }
  public get(): Promise<any> {
    return new Promise((resolve, rejects) => {
      this.httpClient
        .get('Http://localhost:3000/contact')
        .toPromise()
        .then((list) => {
          this.set(list);
        });
    });
  }

  public async deleteContact(contactId: number): Promise<any> {
    console.log('ContactService.deleteContact');
    return new Promise((resolve, reject) => {
      console.log(typeof contactId);
      this.httpClient
        .get('http://localhost:3000/contact/delete/' + contactId)
        .toPromise()
        .then(
          (list) => {
            resolve({ status: 200 });
            this.set(list);
          },
          (msg) => {
            resolve(msg);
          }
        )
        .catch((err) => {
          reject(err);
        });
    });
  }

  public async insertContact(contact: Contact): Promise<any> {
    console.log('ContactService.inssertContact');
    return new Promise((resolve, rejects) => {
      this.httpClient
        .post<any>('Http://localhost:3000/contact/insert', contact)
        .toPromise()
        .then((list) => {
          console.log(list);
          resolve({ status: 200 });
          this.set(list);
        });
    });
  }
  public set(list: any): void {
    this.currentListSubject.next(list);
  }

  public async updateContact(params: Contact): Promise<any> {
    console.log('ContactService.updateContact');
    return new Promise((resolve, rejects) => {
      this.httpClient
        .post<any>('http://localhost:3000/contact/update', params)
        .toPromise()
        .then((list) => {
          console.log(list);
          resolve({ status: 200 });
          this.set(list);
        });
    });
  }
}
