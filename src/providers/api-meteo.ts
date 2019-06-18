import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { City } from "../models/City";
import { Storage } from "@ionic/storage";
import { Geolocation } from "@ionic-native/geolocation";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/fromPromise";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/map";
import "rxjs/add/observable/forkJoin";

@Injectable()
export class ApiMeteoProvider {
  apiUrl = "http://api.openweathermap.org/data/2.5/";
  key = "&APPID=366542be1f5cc39d6c8791db0730e3af";

  constructor(
    public http: HttpClient,
    public storage: Storage,
    public geolocation: Geolocation
  ) {}

  getCityFromPosition(): Observable<City> {
    return Observable.fromPromise(
      this.geolocation.getCurrentPosition()
    ).mergeMap(resp => {
      return this.http
        .get<City>(
          this.apiUrl +
            "weather?lat=" +
            resp.coords.latitude +
            "&lon=" +
            resp.coords.longitude +
            this.key
        )
        .map(data => new City(data));
    });
  }

  getCityWeather(cityId): Observable<City> {
    return this.http
      .get<City>(this.apiUrl + "weather?id=" + cityId + this.key)
      .map(data => new City(data));
  }

  getFavoritesMeteo(): Observable<City[]> {
    return Observable.fromPromise(this.storage.get("favorites")).mergeMap(
      resp => {
        const observables = [];

        if (resp) {
          for (let i = 0; i < resp.length; i++) {
            observables.push(this.getCityWeather(resp[i]));
          }
        }

        return Observable.forkJoin(observables);
      }
    );
  }

  getCityForecast(cityId): Observable<any> {
    return this.http.get(this.apiUrl + "forecast?id=" + cityId + this.key);
  }
}
