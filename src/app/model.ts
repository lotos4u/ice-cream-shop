export interface IMenuItem {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  options: string[];
}

export interface IMenuOption {
  id: string;
  name: string;
  price: 0.5;
}

export interface ISelectedItem {
  id: string;
  menuItemId: string;
  options: string[];
}
