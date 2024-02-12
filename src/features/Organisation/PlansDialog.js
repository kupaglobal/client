import { SelectButton } from "primereact/selectbutton";
import SubscriptionPlanCard from "../../components/Cards/SubscriptionPlanCard";
import { useState } from "react";
import { ucFirst } from "../../utils";

const PlansDialog = ({ subscriptions, setSelectedSubscriptionId }) => {
    const periods = [...new Set(subscriptions.map(subscription => ucFirst(subscription.period)))]

    const [period, setPeriod] = useState(periods[0])

    return (
        <>
            <SelectButton
                name='period'
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                options={periods.map(period => ucFirst(period))}
            />

            <div style={{ display: "flex", gap: "20px", marginTop: 10 }}>
                {subscriptions
                    .filter(subscription => subscription.period === period.toLowerCase())
                    .map(subscription => (
                        <SubscriptionPlanCard subscription={subscription} setSelected={setSelectedSubscriptionId} />
                    )
                )}
            </div>
        </>
    )
}

export default PlansDialog;