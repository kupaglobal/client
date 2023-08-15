import { useState } from "react";
import { Avatar, Typography, Box, IconButton, Button } from "@mui/material";
import {MdFullscreenExit, MdFullscreen} from 'react-icons/md'


const Templateroute1 = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };
  return (
    <>
      <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
        <Avatar
          alt="Template"
          variant="rounded"
          src="https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
        />
        <Typography component="div" fontSize={15}>
          Template 1
        </Typography>
      </div>
      <div>
        <Box sx={{ p: 2, border: "1px dashed grey", height: 200 }}>

        {isExpanded ? (
              <IconButton
                aria-label="shrink"
                onClick={toggleExpand}
                sx={{
                  position: "absolute",
                  bottom: 8,
                  right: 8,
                  color: "#fff",
                }}
              >
                <MdFullscreenExit />
              </IconButton>
            ) : (
              <IconButton
                aria-label="expand"
                onClick={toggleExpand}
                sx={{
               float: 'right',
               
                  color: "#000",
                }}
              >
                <MdFullscreen />
              </IconButton>
            )}
        </Box>
      </div>
      <Button sx={{float: 'right', marginTop: 2}}>Download</Button>
    </>
  );
};

export default Templateroute1;
