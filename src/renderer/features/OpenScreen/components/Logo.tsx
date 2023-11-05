import logo from "../../../assets/logo.png"

const Logo = () => {
    return (
        <section className="flex flex-col text-center justify-center items-center">
            <div className="text-center">
                <img src={logo} alt="logo" className="h-12" />
            </div>
            <p className="text-xl select-none">Perihelion</p>
        </section>
    )
}

export { Logo }
