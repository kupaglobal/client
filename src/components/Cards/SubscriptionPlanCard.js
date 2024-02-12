import React from "react";
import { Card } from "primereact/card";
import { Tag } from "primereact/tag";

const SubscriptionPlanCard = ({ subscription, setSelected }) => {
    const features = subscription.features.map(feature => (
        <li className="flex align-items-center mb-3">
            <i className="pi pi-check-circle mr-3 text-green-500"></i>
            <span className="line-height-3">{feature}</span>
        </li>
    ))

    const subscriptionPriceLabel = new Intl.NumberFormat("en-GB", { style: "currency", currency: subscription.currency }).format(
        subscription.price,
    )
  return (
    <>
      <Card
        onClick={() => setSelected(subscription.id)}
        title={subscription.name}
        pt={{
          body: { className: `cursor-pointer ${!subscription.isCurrentSubscription ? 'hover:bg-bluegray-100 hover:inset-4' : ''} ${subscription.selected ? 'bg-bluegray-100' : ''}`, },
        }}
        subTitle={
          <div>
            <h2 className="">{subscriptionPriceLabel}</h2>
            <div className="subtitle">{subscription.period}</div>
            { subscription.isCurrentSubscription ? 
                <Tag value="current" className="mt-1" key={subscription.id}></Tag>
                : ''
            }
          </div>
        }        
        className="vertical__card mx-1 bg-sky-700 border-b b-3"
      >
        <p className="m-0">
            {subscription.description}
        </p>
        {features}
      </Card>
    </>
  );
};

export default SubscriptionPlanCard;
