import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";

const Verticalcard = ({id, title, category, date, description, hideImg, footer, selected, onEmit}) => {
  const header = (
      !hideImg ? <img
      alt="Card"
      src="https://primefaces.org/cdn/primereact/images/usercard.png"
    /> : ''
  );
  const emit = (type) => {
    onEmit({ type: type , payload: id })
  }
  if (!footer) {
    footer = (
      <div style={{display:'flex', justifyContent: 'flex-end' }}>
        <Button size="small" icon="pi pi-download" />
        <Button size="small" icon="pi pi-check" className="ml-1" onClick={emit('selected')} />
      </div>
    );
  }

  return (
    <>
      <Card
        title={title}
        pt={{
          body: { className: `hover:bg-bluegray-100 cursor-pointer hover:inset-4 ${selected ? 'bg-bluegray-100' : ''}`, },
        }}
        subTitle={
          <div>
            <div className="">{category}</div>
            <div className="subtitle">{date}</div>
          </div>
        }        
        header={header}
        className="vertical__card mx-1 bg-sky-700 border-b b-3"
        footer={footer}
      >
        <p className="m-0">
        {description}
        </p>
      </Card>
    </>
  );
};

export default Verticalcard;
