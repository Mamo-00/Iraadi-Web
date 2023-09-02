import React from "react";
import { ReactComponent as ElectronicsIcon } from "../../assets/categoryIcons/svg/appliances.svg";
import { ReactComponent as VehicleIcon } from "../../assets/categoryIcons/svg/car.svg";
import { ReactComponent as PropertyIcon } from "../../assets/categoryIcons/svg/propertysale.svg";
import { ReactComponent as FurnitureIcon } from "../../assets/categoryIcons/svg/furniture.svg";
import { ReactComponent as MobileIcon } from "../../assets/categoryIcons/svg/phone_tablet.svg";
import { ReactComponent as PropertyRentIcon } from "../../assets/categoryIcons/svg/property.svg";
import { ReactComponent as BusinessIcon } from "../../assets/categoryIcons/svg/business.svg";
import { ReactComponent as JobsIcon } from "../../assets/categoryIcons/svg/jobs.svg";
import { ReactComponent as ClothesIcon } from "../../assets/categoryIcons/svg/clothes.svg";
import { ReactComponent as ValuablesIcon } from "../../assets/categoryIcons/svg/valuables.svg";
import { useTheme } from "@mui/material";


const CategoryIcons = ({ category, ...props }) => {
  let Icon;
  const theme = useTheme();

  switch (category) {
    case 'Electronics':
      Icon = ElectronicsIcon;
      break;
      
    case 'Vehicles':
      Icon = VehicleIcon;
      break;

    case 'Property For Sale':
      Icon = PropertyIcon;
      break;

    case 'Furniture & Interior':
      Icon = FurnitureIcon;
      break;

    case 'Mobiles & Tablet':
      Icon = MobileIcon;
      break;

    case 'Jobs':
      Icon = JobsIcon;
      break;

    case 'Clothes & Footwear':
      Icon = ClothesIcon;
      break;

    case 'Business & Industries':
      Icon = BusinessIcon;
      break;

    case 'Property For Rent':
      Icon = PropertyRentIcon;
      break;

    case 'Valuables':
      Icon = ValuablesIcon;
      break;  

    default:
      Icon = ElectronicsIcon;
      break;
  }

  return (
    
      <Icon {...props} fill={theme.palette.primary.main}/>
    
  );
}

export default CategoryIcons