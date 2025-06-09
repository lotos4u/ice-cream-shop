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
  price: number;
}

export interface ISelectedItem {
  amount: number;
  menuItemId: string;
  options: string[];
}
