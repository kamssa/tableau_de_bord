import { Component, OnInit } from '@angular/core';
declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Tableau de bord',  icon: 'dashboard', class: '' },
  { path: '/demande', title: 'Demande',  icon: 'dashboard', class: '' },
  { path: '/categorie', title: 'Catégories',  icon: 'person', class: '' },
  { path: '/ville', title: 'Villes',  icon: 'person', class: '' },
  { path: '/terrain', title: 'Terrains',  icon: 'dashboard', class: '' },
  { path: '/flashTerrain', title: 'Vente flash',  icon: 'dashboard', class: '' },
  { path: '/topterrain', title: 'Top vente',  icon: 'dashboard', class: '' },
  { path: '/blog', title: 'Blog',  icon: 'dashboard', class: '' },
  { path: '/terrainAcheter', title: 'Produit vendus',  icon: 'dashboard', class: '' },
  { path: '/terrainG', title: 'Produit à Géo',  icon: 'dashboard', class: '' },
  { path: '/departement', title: 'Departements',  icon: 'dashboard', class: '' },
  { path: '/employe', title: 'Employés',  icon: 'person', class: '' },
  { path: '/prospect', title: 'Prospects',  icon: 'person', class: '' },
  { path: '/membre', title: 'Membres',  icon: 'person', class: '' },
  { path: '/client', title: 'clients',  icon: 'person', class: '' },
  { path: '/map', title: 'Map',  icon: 'person', class: '' },
  { path: '/notiication', title: 'Notiication',  icon: 'person', class: '' }

];
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };

}
