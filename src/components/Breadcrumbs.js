import * as React from "react";
import { Breadcrumbs } from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";


const CustomLink = styled(Link)(({ theme, model }) => ({
  textDecoration: "none",
  color: "inherit",
  fontFamily: 'Montserrat',
  transition: "color 0.3s ease-in-out",
  "&:hover": {
    color: "#25245D",
    fontWeight: "600",
  }
}));

const Breadcrumb = ({ name, firstItem, linkTo }) => {
  return (
    <div role="presentation">
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<NavigateNextIcon fontSize="small" />}
        sx={{ fontSize: "12px", cursor: "pointer" }}
      >
        <CustomLink to={`/${linkTo}`}>{firstItem}</CustomLink>
        <CustomLink href="" aria-current="page">
          {name
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}
        </CustomLink>
      </Breadcrumbs>
    </div>
  );
};

export default Breadcrumb;
