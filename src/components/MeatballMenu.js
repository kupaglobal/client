import {useState} from 'react'
import {  Menu, MenuItem , IconButton, } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';


const MeatballMenu = ({options}) => {
    const [anchorEl, setAnchorEl] = useState();
    const open = Boolean(anchorEl);
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
  return (
    <div>
       <IconButton
        aria-label="more"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}

        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}

      >
        {options.map((option) => (
          <MenuItem key={option} onClick={handleClose} sx={{fontSize: "12px"}}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}

export default MeatballMenu;