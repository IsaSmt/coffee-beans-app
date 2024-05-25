import { Roastery, Coffee } from './types';

export class HomePage {
  dummyRoasteries: Roastery[];
  dummyOriginCountries: string[];
  dummyCoffeeBeans: string[];
  dummyCoffees: Coffee[];

  constructor() {
    this.dummyRoasteries = [
      { id: '1', name: 'Roastery One', address: '123 Coffee St', logoUrl: 'https://via.placeholder.com/150' },
      { id: '2', name: 'Roastery Two', address: '456 Java Ave', logoUrl: 'https://via.placeholder.com/150' },
    ];

    this.dummyOriginCountries = ['Brazil', 'Colombia', 'Ethiopia'];

    this.dummyCoffeeBeans = [
      'https://via.placeholder.com/150', 'https://via.placeholder.com/150', 'https://via.placeholder.com/150'
    ];

    this.dummyCoffees = [
      { id: '1', name: 'Espresso', imageUrl: 'https://via.placeholder.com/150' },
      { id: '2', name: 'Latte', imageUrl: 'https://via.placeholder.com/150' },
    ];
  }

  handleClick(item: any): void {
    console.log('Item clicked:', item);
  }
}

const homePage = new HomePage();
export default homePage;
