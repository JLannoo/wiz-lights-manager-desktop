import {
    Button,
} from "@/components/ui/button";

import { 
    House as Home, 
    Group as Groups,
    Grid3X3 as Scenes,
} from "lucide-react";
import { cn } from "../../lib/utils";

import { 
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "../ui/tooltip";
import { Link } from "@tanstack/react-router";

type Link = {
    icon: typeof Home;
    label: string;
    link: string;
};

const links: Link[] = [
    {
        icon: Home,
        label: "Home",
        link: "/",
    },
    {
        icon: Groups,
        label: "Groups",
        link: "/groups",
    },
    {
        icon: Scenes,
        label: "Scenes",
        link: "/scenes",
    },
];

type SidebarProps = {
    sidebarCollapsed: boolean;
};

export default function Sidebar({ sidebarCollapsed }: SidebarProps) {
    return (
        <>
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl p-4"> 
                {sidebarCollapsed ? "W" : "Wiz Lights"}
            </h1>

            <hr></hr>

            <div className={cn("flex flex-col gap-2 p-4", sidebarCollapsed ? "items-center" : "items-start")}>
                {links.map((link) => (
                    sidebarCollapsed ?
                        <Tooltip key={link.label} delayDuration={0}>
                            <TooltipTrigger>
                                <Link to={link.link} className="w-full">
                                    <Button variant="ghost" className="flex items-center justify-center gap-2 p-2">
                                        <link.icon size={24} />
                                    </Button>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right" align="center">
                                {link.label}
                            </TooltipContent>
                        </Tooltip>
                        :
                        <Link to={link.link} className="w-full" key={link.label}>
                            <Button variant="link" className="flex items-center justify-start gap-2 p-2 w-full">
                                <link.icon size={24} />
                                {link.label}
                            </Button>
                        </Link>
                ))}
            </div>
        </>
    );
}