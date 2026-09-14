import { useState } from "react"
import AboutMeSec from "./helperComps/aboutMeSec"
import ContactMeSec from "./helperComps/contactMeSec"
import MechElementsSec from "./helperComps/mechELements/mechElements"
import ProjectsSec from "./helperComps/projects"
import NavElement from "./helperComps/navElements"

const navLabels = ["About Me", "Mech-Elements", "Projects", "Contact"]

const MainSection = () => {

    const [activeSec, setActiveSec] = useState<string>(navLabels[0])

    const SelectedSection = () => {

        switch (activeSec) {
            case navLabels[0]: return <AboutMeSec />
            case navLabels[1]: return <MechElementsSec />
            case navLabels[2]: return <ProjectsSec />
            case navLabels[3]: return <ContactMeSec />
        }

    }

    return (
        <>
            <NavElement navLabels={navLabels} activeSec={activeSec} setActive={(value) => {
                setActiveSec(value)
            }} />
            <SelectedSection />
        </>

    )

}

export default MainSection