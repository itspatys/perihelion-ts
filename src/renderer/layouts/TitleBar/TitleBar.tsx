import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react"

export const TitleBar = () => {
    return (
        <Navbar isBordered={true} height="32px" id="title-bar">
            <NavbarContent />
            <NavbarContent justify="center" className="text-inherit gap-4">
                <NavbarBrand>Perihelion</NavbarBrand>
            </NavbarContent>
            <NavbarContent />
        </Navbar>
    )
}

export default TitleBar
