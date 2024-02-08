import { Card } from "primereact/card"
import { TabPanel, TabView } from "primereact/tabview"
import PlansContainer from "./PlansContainer"

const OrganisationTabsContainer = ({ organisation }) => {
    return (
        <Card style={{ width: "60vw" }}>
            <TabView>
                <TabPanel header="Subscription" style={{ fontSize: "13px" }}>
                    <PlansContainer subscription={organisation.subscription} />
                </TabPanel>

                <TabPanel header="Billing" style={{ fontSize: "13px" }}>
                    Billing
                </TabPanel>
            </TabView>
        </Card>
    )
}

export default OrganisationTabsContainer