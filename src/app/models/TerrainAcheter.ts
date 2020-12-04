import {Terrains} from './Terrains';
import {Personne} from './Personne';

export class TerrainAcheter {
  constructor(public id?: number,
              public version?: number,
              public terrains?: Terrains,
              public personne?: Personne) {
  }
}
