import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {
  Typography,
  Stack,
  IconButton,
} from "@mui/material";
import CategoryIcons from '../Icons/CategoryIcons';


const CreatePostCategoryCard = ( { category } ) => {
  return (
    <Card 
    sx={{
      width: 150,
      height: 120,
      overflow: "hidden",
      mx: 1,
    }}
    style={{ boxShadow: "1px -2px 9px #4189DD70, 0px 1px 9px #4189DD90" }}>
      <CardContent>
        <Stack direction="column" alignItems="center">
          <IconButton>
            <CategoryIcons
              category={category}
              style={{ width: 65, height: 50 }}
            />
          </IconButton>
          <Typography variant="body1" align="center" color="primary" sx={{ textTransform: "uppercase" }}>
            {category}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default CreatePostCategoryCard