import Motors from '../assets/categoryIcons/picture/white-car-in-orange-background.jpg';
import Electronics from '../assets/categoryIcons/picture/electronics-in grey-background.jpg';
import Furniture from '../assets/categoryIcons/picture/furniture-on-brown-background.jpg';
import PropertySale from '../assets/categoryIcons/picture/House-in-Africa.jpg';
import MobileDevices from '../assets/categoryIcons/picture/mobile-devices.jpg'


export const categories = [
  {
    name: 'Motors',
    image: Motors,
    subcategories: [
      {
        name: 'Cars',
        subcategories: []
      },
      {
        name: 'Motorcycles',
        subcategories: [
          {
            name: 'Sport Bike',
            subcategories: []
          },
          {
            name: 'Scooter',
            subcategories: [] // Sub-sub-subcategories, if any
          },
          {
            name: 'Moped',
            subcategories: [] // Sub-sub-subcategories, if any
          }
        ] // Sub-subcategories, if any
      },
      {
        name: 'Tuktuk',
        subcategories: [] // Sub-subcategories, if any
      },
      {
        name: 'Boats',
        subcategories: [
          
          {
            name: 'Sailboat',
            subcategories: []
          },
          {
            name: 'Motorboat',
            subcategories: [] // Sub-sub-subcategories, if any
          },
          {
            name: 'Kayak',
            subcategories: [] // Sub-sub-subcategories, if any
          },
          {
            name: 'Canoe',
            subcategories: []
          }
        ] // Sub-subcategories, if any
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
  {
    name: 'Property for Sale',
    image: PropertySale,
    subcategories: [
      {
        name: 'Land for Sale',
        subcategories: []
      },
      {
        name: 'Housing for Sale',
        subcategories: [
          {
            name: 'Apartment',
            subcategories: []
          },
          {
            name: 'Villa',
            subcategories: [] // Sub-sub-subcategories, if any
          },
          {
            name: 'Apartments',
            subcategories: [] // Sub-sub-subcategories, if any
          },
          {
            name: 'Terraced house',
            subcategories: []
          },
          
        ] // Sub-subcategories, if any
      },
      {
        name: 'Facilities',
        subcategories: [
          {
            name: 'Balcony',
            subcategories: []
          },
          {
            name: 'Garage',
            subcategories: [] // Sub-sub-subcategories, if any
          },
          {
            name: 'Security',
            subcategories: [] // Sub-sub-subcategories, if any
          },
          {
            name: 'Parking Lot',
            subcategories: []
          },
          {
            name: 'Garden/Outdoor',
            subcategories: [] // Sub-sub-subcategories, if any
          },
          {
            name: 'Built-in Toilet',
            subcategories: [] // Sub-sub-subcategories, if any
          },
        ] // Sub-subcategories, if any
      },
      
    ]
  },
  {
    name: 'Mobile Devices',
    image: MobileDevices,
    subcategories: [
      {
        name: 'Mobile Phones',
        subcategories: [
          {
            name: 'Apple',
            subcategories: []
          },
          {
            name: 'Samsung',
            subcategories: [] // Sub-sub-subcategories, if any
          },
          {
            name: 'Motorola',
            subcategories: [] // Sub-sub-subcategories, if any
          }
        ]
      },
      {
        name: 'Accessories',
        subcategories: [
          {
            name: 'Chargers',
            subcategories: []
          },
          {
            name: 'Phone cases',
            subcategories: [] // Sub-sub-subcategories, if any
          },
          {
            name: 'Stylus',
            subcategories: [] // Sub-sub-subcategories, if any
          },
          {
            name: 'Powerbank',
            subcategories: []
          },
          {
            name: 'Screen Protector',
            subcategories: [] // Sub-sub-subcategories, if any
          },
        ] // Sub-subcategories, if any
      },
      {
        name: 'Tablets',
        subcategories: [
          {
            name: 'Apple',
            subcategories: []
          },
          {
            name: 'Samsung',
            subcategories: [] // Sub-sub-subcategories, if any
          },
          {
            name: 'Others',
            subcategories: [] // Sub-sub-subcategories, if any
          }
        ] // Sub-subcategories, if any
      },
    ]
  },
  // More categories...
];