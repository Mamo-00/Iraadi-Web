import Motors from '../assets/categoryIcons/picture/white-car-in-orange-background.jpg';
import Electronics from '../assets/categoryIcons/picture/electronics-in grey-background.jpg';
import Furniture from '../assets/categoryIcons/picture/furniture-on-brown-background.jpg';


export const categories = [
  {
    name: 'Motors',
    image: Motors,
    subcategories: [
      {
        name: 'Cars',
        subcategories: [
          {
            name: 'Sedan',
            subcategories: []
          },
          {
            name: 'SUV',
            subcategories: [] // Sub-sub-subcategories, if any
          },
          {
            name: 'Truck',
            subcategories: [] // Sub-sub-subcategories, if any
          }
        ]
      },
      {
        name: 'Motorcycles',
        subcategories: [] // Sub-subcategories, if any
      },
      {
        name: 'Tuktuk',
        subcategories: [] // Sub-subcategories, if any
      },
      {
        name: 'Boats',
        subcategories: [] // Sub-subcategories, if any
      }
    ]
  },
  {
    name: 'Electronics',
    image: Electronics,
    subcategories: [
      {
        name: 'Computers',
        subcategories: [
          {
            name: 'Desktop',
            subcategories: []
          },
          {
            name: 'Laptop',
            subcategories: [] // Sub-sub-subcategories, if any
          },
        ]
      },
      {
        name: 'Home Appliance',
        subcategories: [
          {
            name: 'White Goods',
            subcategories: []
          },
          {
            name: 'Outdoor',
            subcategories: [] // Sub-sub-subcategories, if any
          },
          {
            name: 'Bathroom',
            subcategories: [] // Sub-sub-subcategories, if any
          },
        ] // Sub-subcategories, if any
      },
      {
        name: 'Photo and Video',
        subcategories: [
          {
            name: 'Drones',
            subcategories: [] // Sub-sub-subcategories, if any
          },
        ] // Sub-subcategories, if any
      },
      {
        name: 'Gaming',
        subcategories: [
          {
            name: 'Accessories',
            subcategories: [] // Sub-sub-subcategories, if any
          },
          {
            name: 'Console',
            subcategories: [] // Sub-sub-subcategories, if any
          },
        ] // Sub-subcategories, if any
      },
      {
        name: 'Televisions',
        subcategories: [
          {
            name: 'TV',
            subcategories: [] // Sub-sub-subcategories, if any
          },
          {
            name: 'DVD player',
            subcategories: [] // Sub-sub-subcategories, if any
          },
          {
            name: 'Cable TV',
            subcategories: [] // Sub-sub-subcategories, if any
          },
          {
            name: 'Satellite',
            subcategories: [] // Sub-sub-subcategories, if any
          },
        ] // Sub-subcategories, if any
      },
      {
        name: 'Audio',
        subcategories: [
          {
            name: 'Speakers',
            subcategories: [] // Sub-sub-subcategories, if any
          },
          {
            name: 'Headphones',
            subcategories: [] // Sub-sub-subcategories, if any
          },
        ] // Sub-subcategories, if any
      }
    ]
  },
  {
    name: 'Furniture & Interior',
    image: Furniture,
    subcategories: [
      {
        name: 'Bathroom',
        subcategories: []
      },
      {
        name: 'Kitchen',
        subcategories: [] // Sub-subcategories, if any
      },
      {
        name: 'Bedroom',
        subcategories: [] // Sub-subcategories, if any
      },
      {
        name: 'Living Room',
        subcategories: [] // Sub-subcategories, if any
      }
    ]
  },
  // More categories...
];