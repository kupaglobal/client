import * as React from "react";
import { Breadcrumbs } from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";

const CustomLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "inherit",
  transition: "color 0.3s ease-in-out",
  "&:hover": {
    color: "#25245D",
    fontWeight: "600",
  },
}));

const Breadcrumb = ({ name, firstItem, linkTo }) => {
  return (
    <div role="presentation">
      <Breadcrumbs
        aria-label="breadcrumb"
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
