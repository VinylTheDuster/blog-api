import { useState } from "react";

import Sidebar from "./STBar/Sidebar";
import Topbar from "./STBar/Topbar";

export default function Menu() {

    const [open, setOpen] = useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    }

    return (
        <main>
            <Topbar handleDrawerOpen={handleDrawerOpen} openDrawerState={open} />
            <div style={{ display: "flex", flexDirection: "row", flexGrow: 1 }}>
                <Sidebar handleDrawerClose={handleDrawerClose} openDrawerState={open} />

            </div>
        </main>
    )
}