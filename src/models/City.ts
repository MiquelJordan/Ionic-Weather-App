export class City {
  id: number;
  name: string;
  weather: any[];
  main: any;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
