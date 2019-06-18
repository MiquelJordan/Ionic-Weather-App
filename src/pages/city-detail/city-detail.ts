import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { City } from "../../models/City";
import { ApiMeteoProvider } from "../../providers/api-meteo";
import { Storage } from "@ionic/storage";
import { HomePage } from "../home/home";

@Component({
  selector: "page-city-detail",
  templateUrl: "city-detail.html"
})
export class CityDetailPage {
  city: City;
  cityId: number;
  name: string;
  forecast: any;
  tomorrow: Date;
  isFavorite = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: ApiMeteoProvider,
    public storage: Storage
  ) {
    this.cityId = navParams.get("cityId");
    this.name = navParams.get("name");

    this.city = navParams.get("city");

    var q = new Date();
    var m = q.getMonth();
    var d = q.getDate() + 1;
    var y = q.getFullYear();

    this.tomorrow = new Date(y, m, d);
  }

  ionViewDidLoad() {
    if (!this.city) {
      this.api.getCityWeather(this.cityId).subscribe(data => {
        this.city = data;
        this.name = data.name;
      });
    } else {
      this.cityId = this.city.id;
      this.name = this.city.name;
    }

    this.api.getCityForecast(this.cityId).subscribe(data => {
      this.forecast = data;
    });

    this.storage.get("favorites").then(data => {
      this.isFavorite = data.indexOf(this.cityId) > -1;
    });
  }

  filteredResults() {
    return this.forecast.list.filter(data => {
      const date = new Date(data.dt_txt);

      return data.dt_txt.indexOf("12:00:00") > -1 && date >= this.tomorrow;
    });
  }

  delete() {
    this.storage.get("favorites").then(data => {
      data.splice(data.indexOf(this.cityId), 1);
      this.storage.set("favorites", data).then(data => {
        this.isFavorite = false;
      });
    });
    this.navCtrl.push(HomePage);
  }

  add() {
    this.storage.get("favorites").then((data: number[]) => {
      if (!data) {
        data = [];
      }

      if (data.indexOf(this.cityId) == -1) {
        data.push(this.cityId);
        this.storage.set("favorites", data).then(data => {
          this.isFavorite = true;
        });
      }
    });
    this.navCtrl.push(HomePage);
  }
}
