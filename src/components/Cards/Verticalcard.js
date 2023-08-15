import React from "react";

import {
  Button,
  Typography,
  CardMedia,
  CardContent,
  Card,
  CardActionArea,
  CardActions,
  Chip,
} from "@mui/material";

const Verticalcard = ({handleClick}) => {
  return (
    <>
      <Card sx={{ maxWidth: 200 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image="https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
            alt="green iguana"
          />
          <CardContent>
          <Chip label="Student personal data" size="small"/>
            <Typography gutterBottom component="div"  fontSize={15} paddingTop={2} >
              Template 1
            </Typography>
            <Typography color="text.secondary" fontSize={13}>
            This template allows you to populate the student data in a timely way
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={handleClick}>
            Preview
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default Verticalcard;
