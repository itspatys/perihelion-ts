import { Image, Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react"

import logo from "../../assets/logo.png"

export const TitleBar = () => {
    return (
        <Navbar
            isBordered={true}
            height="32px"
            id="title-bar"
            className="bg-background"
        >
            <NavbarContent />
            <NavbarContent justify="center" className="text-inherit gap-4">
                <NavbarBrand>
                    <Image src={logo} height={16} width={16} />
                    <span>&nbsp;Perihelion</span>
                </NavbarBrand>
            </NavbarContent>
            <NavbarContent />
        </Navbar>
    )
}

export default TitleBar
