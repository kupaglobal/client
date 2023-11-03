import React, { useState } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";

const TemplateCard = ({id, title, category, date, description, hideImg, onDownloadTemplate, onSelected, loading}) => {
  const header = (
      !hideImg ? <img
      alt="Card"
      src="https://primefaces.org/cdn/primereact/images/usercard.png"
    /> : ''
  );
  const footer = (
    <div style={{display:'flex', justifyContent: 'flex-end' }}>
      <Button size="small" icon="pi pi-download" loading={loading} onClick={() => onDownloadTemplate(id)} />
      <Button size="small" icon="pi pi-check" className="ml-1" onClick={onSelected} />
    </div>
  );

  return (
    <>
      <Card
        title={title}
        pt={{
          body: { className: 'hover:bg-bluegray-100 cursor-pointer hover:inset-4' },
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

export default TemplateCard;
