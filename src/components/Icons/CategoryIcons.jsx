import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as MarketIcon } from "../../assets/categoryIcons/market.svg";
import { ReactComponent as VehicleIcon } from "../../assets/categoryIcons/vehicle.svg";
import { ReactComponent as PropertyIcon } from "../../assets/categoryIcons/property.svg";
import { ReactComponent as RentalIcon } from "../../assets/categoryIcons/rental.svg";
import { ReactComponent as ValuablesIcon } from "../../assets/categoryIcons/valuables.svg";
import { useTheme } from "@mui/material";

const CategoryIcons = ({ category, ...props }) => {
  let Icon;
  const theme = useTheme();

  switch (category) {
    case 'market':
      Icon = MarketIcon;
      break;
      
    case 'vehicle':
      Icon = VehicleIcon;
      break;

    case 'property':
      Icon = PropertyIcon;
      break;

    case 'rental':
      Icon = RentalIcon;
      break;

    case 'valuables':
      Icon = ValuablesIcon;
      break;
      
    default:
      Icon = null;
      break;
  }

  return (
    
      <Icon {...props} fill={theme.palette.primary.main}/>
    
  );
}

export default CategoryIcons