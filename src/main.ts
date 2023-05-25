import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCD5uGEv5pS3ppXVJj084-yioMC8Lx806k",
  authDomain: "celeborn-44c7b.firebaseapp.com",
  projectId: "celeborn-44c7b",
  storageBucket: "celeborn-44c7b.appspot.com",
  messagingSenderId: "968990070289",
  appId: "1:968990070289:web:a58e2597f30681f47bc3b0",
  measurementId: "G-S5V6GNS6QW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
