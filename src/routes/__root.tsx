import { lazy, Suspense, useState } from "react";

import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
    component: () => (
        <Root />
    ),
});

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";

import Sidebar from "@/components/Sidebar/Sidebar";

import { TooltipProvider } from "@radix-ui/react-tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";

const TanStackRouterDevtools =
    process.env.NODE_ENV === "development" ? 
        lazy(() => 
            import("@tanstack/router-devtools")
                .then((module) => ({ default: module.TanStackRouterDevtools })),
        ) : 
        (): null => null;


function Root() {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

    return (
        <>
            <TooltipProvider>
                <div className="dark:bg-black dark h-dvh">
                    <ResizablePanelGroup direction="horizontal">
                        <ResizablePanel
                            collapsedSize={6}
                            minSize={24}
                            maxSize={40}
                            collapsible
                            className="bg-gray-950 p-4 overflow-auto"
                            onCollapse={() => setSidebarCollapsed(true)}
                            onExpand={() => setSidebarCollapsed(false)}
                            defaultSize={sidebarCollapsed ? 6 : 24}
                        >
                            <Sidebar sidebarCollapsed={sidebarCollapsed} />
                        </ResizablePanel>
                        <ResizableHandle withHandle />
                        <ResizablePanel>
                            <ScrollArea className="h-full">
                                <Outlet />
                            </ScrollArea>
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </div>
            </TooltipProvider>
            <Suspense fallback={null}>
                <TanStackRouterDevtools />
            </Suspense>
        </>
    );
}
