import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { RatingModule } from 'ng-starrating';
import { RatingComponent } from 'ng-starrating/lib/rating.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagsComponent } from './tags/tags.component';
import { FoodPageComponent } from './food-page/food-page.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { Food } from './shared/models/Food';
import { initializeApp } from "firebase/app";
import {
    collection,
    getDocs,
    onSnapshot,
    getFirestore
} from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyB9WasKBeYw1HhsFoIm7dO8X-J9AkPyqFc",
  authDomain: "fastfood-25987.firebaseapp.com",
  projectId: "fastfood-25987",
  storageBucket: "fastfood-25987.appspot.com",
  messagingSenderId: "242367677856",
  appId: "1:242367677856:web:0dd018df9fa360c50510c5"
};

initializeApp(firebaseConfig);
const db = getFirestore();
const colRef =collection(db,'foods');
export function fetchFoods(): Promise<Food[]> {
  return new Promise<Food[]>((resolve, reject) => {
    const unsubscribe = onSnapshot(colRef, (snapshot) => {
      const allFoods: Food[] = [];
      allFoods.length = 0;
      snapshot.forEach((doc) => {
        const food: Food = {
          id: doc.data()['id'],
          name: doc.data()['name'],
          price: doc.data()['price'],
          tags: doc.data()['tags'],
          favorite: doc.data()['favorite'],
          stars: doc.data()['stars'],
          imageUrl: doc.data()['imageUrl'],
          origins: doc.data()['origins'],
          cookTime: doc.data()['cook-time'],
        };
        allFoods.push(food);
        
      });
      
      resolve(allFoods);
      
    }, reject);

    // Returning the unsubscribe function
    return unsubscribe;
  });
}



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SearchComponent,
    TagsComponent,
    FoodPageComponent,
    CartPageComponent,
    NotFoundComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
    // RatingModule     
    
    
  ],
  providers: [],
  exports: [
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
