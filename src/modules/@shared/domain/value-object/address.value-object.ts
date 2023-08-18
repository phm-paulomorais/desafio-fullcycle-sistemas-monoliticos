import ValueObject from "./value-object.interface";

export default class Address implements ValueObject {
  _street: string = "";
  _number: number = 0;
  _zip: string = "";
  _city: string = "";
  _state: string = "";
  _complement: string = "";

  constructor(street: string, number: number, zip: string, city: string, state: string, complement: string) {
    this._street = street;
    this._number = number;
    this._zip = zip;
    this._city = city;
    this._state = state;
    this._complement = complement;
  }

  get street(): string {
    return this._street;
  }

  get number(): number {
    return this._number;
  }

  get zip(): string {
    return this._zip;
  }

  get city(): string {
    return this._city;
  }

  get state(): string {
    return this._state;
  }

  get complement(): string {
    return this._complement;
  }
  

  toString() {
    return `${this._street}, ${this._number}, ${this._zip} ${this._city}`;
  }
}
