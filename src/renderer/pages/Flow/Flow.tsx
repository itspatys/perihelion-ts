import { Divider } from "@nextui-org/react"

import FlowChart from "../../features/FlowChart"
import SidePanel from "../../features/SidePanel"

const Flow = () => {
    return (
        <section className="flex flex-row h-full bg-background">
            <div className="basis-1/5 h-full px-4">
                <SidePanel />
            </div>
            <Divider orientation="vertical" />
            <div className="basis-4/5 h-full shrink-0 overflow-x-hidden">
                <FlowChart />
            </div>
        </section>
    )
}

export default Flow
