import { Pipe, PipeTransform } from "@angular/core";
/**
 * Generated class for the WeatherIconPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: "weatherIcon"
})
export class WeatherPipe implements PipeTransform {
  /**
   * Takes an icon value, return the url
   */
  transform(value: string, ...args) {
    return "http://openweathermap.org/img/w/" + value + ".png";
  }
}
