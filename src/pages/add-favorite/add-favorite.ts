import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController,
  App
} from "ionic-angular";
import { HttpClient } from "@angular/common/http";
import { CityDetailPage } from "../city-detail/city-detail";

@Component({
  selector: "page-add-favorite",
  templateUrl: "add-favorite.html"
})
export class AddFavoritePage {
  matches: any[];
  filePath = "assets/city-list/current.city.list.json";
  cities: any;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private viewCtrl: ViewController,
    private http: HttpClient
  ) {
    this.cities = [];
    this.loadCities();
    this.matches = [];
  }

  updateList(str: string) {
    if (str.length > 1) {
      this.matches = this.search(str);
    }
  }

  loadCities() {
    this.http.get(this.filePath).subscribe(data => {
      this.cities = data;
    });
  }
  onCityDetail(cityId: number, name: string) {
    this.navCtrl.push(CityDetailPage, { cityId: cityId, name: name });
  }
  search(term: string) {
    let res = [];

    for (let i = 0; i < this.cities.length; i++) {
      if (
        this.cities[i].name.toLowerCase().indexOf(term.toLowerCase()) !== -1
      ) {
        res.push(this.cities[i]);
      }
    }

    return res;
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }
}
