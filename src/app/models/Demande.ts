import {Produit} from './Produit';
import {Personne} from './Personne';

export class Demande {
  constructor(public id?: number,
              public version?: number,
              public terrains?: Produit,
              public personne?: Personne) {
  }
}
