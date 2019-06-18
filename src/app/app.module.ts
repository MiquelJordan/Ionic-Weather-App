import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";

import { MyApp } from "./app.component";
import { HomePage } from "../pages/home/home";
import { Geolocation } from "@ionic-native/geolocation";
import { ApiMeteoProvider } from "../providers/api-meteo";
import { PipesModule } from "../pipes/pipes.module";
import { HttpClientModule } from "@angular/common/http";
import { IonicStorageModule } from "@ionic/storage";
import { AddFavoritePage } from "../pages/add-favorite/add-favorite";
import { CityDetailPage } from "../pages/city-detail/city-detail";

@NgModule({
  declarations: [MyApp, HomePage, AddFavoritePage, CityDetailPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    PipesModule,
    IonicStorageModule.forRoot(),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, HomePage, AddFavoritePage, CityDetailPage],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ApiMeteoProvider
  ]
})
export class AppModule {}
