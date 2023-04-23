import React from "react";
import { ReactComponent as YearIcon } from "../../assets/car-related-icons/year.svg";
import { ReactComponent as MileageIcon } from "../../assets/car-related-icons/mileage.svg";
import { ReactComponent as DoorsIcon } from "../../assets/car-related-icons/car-door.svg";
import { ReactComponent as PaletteIcon } from "../../assets/car-related-icons/palette.svg";
import { useTheme } from "@mui/material";

const VehicleCardIcons = ({ category, ...props }) => {
  let Icon;
  const theme = useTheme();

  switch (category) {
    case 'year':
      Icon = YearIcon;
      break;
      
    case 'mileage':
      Icon = MileageIcon;
      break;

    case 'doors':
      Icon = DoorsIcon;
      break;

    case 'palette':
      Icon = PaletteIcon;
      break;
      
    default:
      Icon = null;
      break;
  }

  return (
    
      <Icon {...props} fill={theme.palette.primary.main}/>
    
  );
}

export default VehicleCardIcons