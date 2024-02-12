import { ucFirst } from "../../utils";
import { useContext, useEffect, useState } from "react";
import { SubscriptionsService } from "../../services/subscriptions.service";
import { toastStore } from "../../store/toast";
import Plans from "./PlansDialog";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
const CurrentSubscriptionContainer = ({ subscription: currentSubscription }) => {
    const { toast } = useContext(toastStore)

    const features = currentSubscription.features.map(feature => (
        <li className="flex align-items-center mb-3">
            <i className="pi pi-check-circle mr-3 text-green-500"></i>
            <span className="line-height-3">{feature}</span>
        </li>
    ))

    const [showPlans, setShowPlans] = useState(false)
    const [plans, setPlans] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [selectedSubscriptionId, setSelectedSubscriptionId] = useState('')
    const [selectedSubscription, setSelectedSubscription] = useState(null)

    const handleSelectedSubscription = (subscriptionId) => {
        const selectedPlan = plans.filter(plan => !plan.isCurrentSubscription && plan.id === subscriptionId)[0]
        if (selectedPlan) {
            setSelectedSubscription(selectedPlan)
        }
        setSelectedSubscriptionId(subscriptionId)
        setPlans(plans.map(plan => {
            plan.selected = !plan.isCurrentSubscription && plan.id === subscriptionId 
            return plan;
        }))
    }

    const updateSubscription = async () => {
        if (selectedSubscriptionId) {
            setIsLoading(true)
            const {data: {paymentStatus, paymentLink, paymentProvider} } = await SubscriptionsService.subscribeToPlan(selectedSubscriptionId)
            if (paymentStatus === 'pending' && paymentLink) {
                toast('success', `You are being redirected to ${paymentProvider} for payment...`)
                window.location.href = paymentLink
            } else if (paymentStatus === 'completed') {
                toast(`Your organisation is now subscribed to ${selectedSubscription.name} (${selectedSubscription.period})!`)
                window.location.href = ''
            }
        } else {
            toast('error', 'First select a subscription plan.')
        }
    }    
    const [shouldRetry, setShouldRetry] = useState(true)
 
    useEffect(() => {
        async function fetchSubscriptions() {
            try {
                const {data: subscriptions} = await SubscriptionsService.getSubscriptions();
                setPlans(subscriptions.map(subscription => {
                    subscription.isCurrentSubscription = subscription.id === currentSubscription.id;
                    subscription.selected = subscription.id === selectedSubscriptionId
                    return subscription
                }))
            } catch (e) {
                setShouldRetry(false)
                console.error(`Exception when fetching subscriptions, e: ${e}`)
                setShowPlans(false)
                toast('error', 'Failed to load subscriptions, please try again.');
            }
        }
        if (shouldRetry) {
            fetchSubscriptions();   
        }
    }, [setShowPlans, toast, setPlans, currentSubscription.id, selectedSubscriptionId])

    const closePlans = () => {
        setShowPlans(false)
        setIsLoading(false)
        setSelectedSubscription(null)
        setSelectedSubscriptionId('')
    }

    const plansFooterContent = (
        <div style={{ borderTop: '0.75px solid #ccc', paddingTop: '15px'}}>
            <Button
                label="Cancel"
                icon="pi pi-times"
                onClick={() => closePlans()}
                className="custom-button"
                outlined
            />
            <Button
                label={`${selectedSubscription ? `Subscribe to ${selectedSubscription.name} (${selectedSubscription.period})` : 'Change Plan'}`}
                icon="pi pi-money-bill"
                onClick={() => updateSubscription()}
                className="custom-button"
                loading={isLoading}
            />
      </div>
    )

    return (
        <div>
            <div className="card mb-5">
                <div className="flex flex-wrap align-items-center justify-content-between gap-3">
                    <div>
                        <div className="text-2xl text-900 font-semibold mb-3">{currentSubscription.name}</div>
                        <p className="m-0 line-height-3 mb-5 text-secondary text-lg text-800">1 {ucFirst(currentSubscription.period)} Subscription</p>
                    </div>
                    <button
                        onClick={() => setShowPlans(true)}
                        className="flex align-items-center justify-content-center border-1 bg-indigo-500 border-round block p-3 mb-4 hover:bg-indigo-600 transition-all transition-duration-300 text-white font-medium text-lg"
                    >
                        Change Plan
                    </button>
                </div>
                <div className="flex flex-wrap -mt-3 gap-3 text-800">
                    <ul className="flex-auto list-none p-0 m-0 text-lg p-3">
                        {features}
                    </ul>
                </div>
            </div>
            <Dialog
                header={`Choose a new plan`}
                style={{ width: "60vw" }}
                visible={showPlans}
                breakpoints={{ "960px": "75vw", "641px": "100vw" }}
                onHide={() => closePlans()}
                footer={plansFooterContent}
            > 
                <div> 
                    <Plans
                        subscriptions={plans}
                        setSelectedSubscriptionId={handleSelectedSubscription}
                        updateSubscription={updateSubscription}
                        isLoading={isLoading}
                    />
                </div>
            </Dialog>
        </div>
    );
};

export default CurrentSubscriptionContainer;