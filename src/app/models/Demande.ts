import {Terrains} from './Terrains';
import {Personne} from './Personne';

export class Demande {
  constructor(public id?: number,
              public version?: number,
              public terrains?: Terrains,
              public personne?: Personne) {
  }
}
