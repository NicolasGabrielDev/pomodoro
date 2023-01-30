import { Menubar } from "primereact/menubar";

export function NavBar() {
    return (
        <Menubar
            model={[
                {
                    label: "Teste"
                }
            ]}
        />
    )
}