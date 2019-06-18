import { Component } from "@angular/core";
import { NavController, ModalController } from "ionic-angular";
import { City } from "../../models/City";
import { ApiMeteoProvider } from "../../providers/api-meteo";
import { Storage } from "@ionic/storage";
import { AddFavoritePage } from "../add-favorite/add-favorite";
import { CityDetailPage } from "../city-detail/city-detail";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  locationMeteo: City;
  favoritesMeteo: City[];

  constructor(
    public navCtrl: NavController,
    public apiMeteo: ApiMeteoProvider,
    public modalCtrl: ModalController,
    public storage: Storage
  ) {
    this.favoritesMeteo = [];
  }

  ionViewDidLoad() {
    this.getLocalMeteo();
  }

  ionViewDidEnter() {
    this.getFavoritesMeteo();
  }

  getLocalMeteo() {
    this.apiMeteo.getCityFromPosition().subscribe((data: City) => {
      this.locationMeteo = data;
      console.log(this.locationMeteo);
    });
  }
  getFavoritesMeteo() {
    this.favoritesMeteo = [];
    this.apiMeteo.getFavoritesMeteo().subscribe((data: City[]) => {
      this.favoritesMeteo = data;
    });
  }
  onCityDetail(cityId: number, name: string) {
    this.navCtrl.push(CityDetailPage, { cityId: cityId, name: name });
  }
  addFavorite() {
    this.navCtrl.push(AddFavoritePage);
  }
}
