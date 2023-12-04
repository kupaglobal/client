import React, { useRef } from "react";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { Toast } from 'primereact/toast';

const MeatballMenu = ({ options }) => {
  const menuRight = useRef(null);
  const toast = useRef(null);

  return (
    <>
      <Toast ref={toast}></Toast>

      <Menu model={options} popup popupAlignment="right"  ref={menuRight}/>
      <Button
        icon="pi pi-ellipsis-v"
        onClick={(event) => menuRight.current.toggle(event)}
        aria-controls="popup_menu_left"
        aria-haspopup text
      />
    </>
  );
};

export default MeatballMenu;
