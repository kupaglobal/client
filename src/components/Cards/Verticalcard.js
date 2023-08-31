import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";

const Verticalcard = ({title, category, date, description}) => {
  const header = (
    <img
      alt="Card"
      src="https://primefaces.org/cdn/primereact/images/usercard.png"
    />
  );
  const footer = (
    <div style={{display:'flex', justifyContent: 'flex-end' }}>
      <Button size="small" icon="pi pi-download" />
    </div>
  );

  return (
    <>
      <Card
        title={title}
        subTitle={
          <div>
            <div className="subtitle">{category}</div>
            <div className="subtitle">{date}</div>
          </div>
        }        
        header={header}
        className="vertical__card"
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
