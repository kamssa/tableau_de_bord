import {Terrain} from './Terrain';
import {Categorie} from './Categorie';
import {Terrains} from './Terrains';
import {Ville} from './Ville';
import {Personne} from './Personne';

export class FlashTerrain extends Terrains{
  constructor(public id ?: number,
              public version?: number,
              public libelle?: string,
              public description ?: string,
              public prix?: number,
              public path?: string,
              public latitude?: number,
              public longitude?: number,
              public numero?: string,
              public categorie?: Categorie,
              public ville?: Ville,
              public personne?: Personne,
              public paye?: boolean,
              public abonneGeo?: boolean,
              public unite?: string,
              public note?: string,
              public type?: string
  ) {
    super(id, version, libelle, description, prix, path, latitude, longitude, numero, categorie, ville, personne, paye, abonneGeo, unite, note,  type );
  }

}
