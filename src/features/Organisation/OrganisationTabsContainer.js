import { Card } from "primereact/card"
import { TabPanel, TabView } from "primereact/tabview"
import CurrentSubscriptionContainer from "./CurrentSubscriptionContainer"

const OrganisationTabsContainer = ({ organisation }) => {
    return (
        <Card style={{ width: "60vw" }}>
            <TabView>
                <TabPanel header="Current Subscription" style={{ fontSize: "13px" }}>
                    <CurrentSubscriptionContainer subscription={organisation.organisationSubscription.subscription} />
                </TabPanel>

                <TabPanel header="Billing" style={{ fontSize: "13px" }}>
                    Billing
                </TabPanel>
            </TabView>
        </Card>
    )
}

export default OrganisationTabsContainer