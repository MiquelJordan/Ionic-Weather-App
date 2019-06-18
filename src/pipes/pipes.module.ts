import { NgModule } from "@angular/core";
import { WeatherPipe } from "./weather/weather";
import { CelsiusPipe } from "./celsius/celsius";

@NgModule({
  declarations: [WeatherPipe, CelsiusPipe],
  imports: [],
  exports: [WeatherPipe, CelsiusPipe]
})
export class PipesModule {}
