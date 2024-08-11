import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
    component: Index,
});

import { 
    RefreshCw as Refresh,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { useLights } from "@/stores/lights";
import { useGroups } from "@/stores/groups";
import { useLoading } from "@/stores/loading";

import { useEffect } from "react";
import WizLight from "@/components/WizLightGroup/WizLight/WizLight";
import WizLightGroup from "@/components/WizLightGroup/WizLightGroup";
import SkeletonCards from "@/components/Skeleton/SkeletonCards";


function Index() {
    const lights = useLights();
    const groups = useGroups();
    const loading = useLoading();

    useEffect(() => {
        lights.refresh();
        groups.refresh();
    }, []);

    return (
        <div className="p-5 animate-appear">
            <h2 className="font-extrabold text-5xl p-4">
                Home
            </h2>

            <h3 className="text-3xl p-4">
                Lights&nbsp;
                {loading.loading ? null : `(${lights.lights.length})`}
                {!loading.loading &&  (
                    <Button variant="outline" size="sm" className="ml-2" onClick={lights.refresh}>
                        <Refresh size={24} />
                    </Button>
                )}
            </h3>

            {loading.loading ? (
                <SkeletonCards count={6} />
            ) : (
                <>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {lights.lights.map((light) => (
                            <WizLight key={light.systemConfig.mac} {...light} />
                        ))}
                    </div>
                </>
            )}  

            <h3 className="text-3xl p-4">
                Groups&nbsp;
                {loading.loading ? null : `(${groups.groups().length})`}
                {!loading.loading && (
                    <Button variant="outline" size="sm" className="ml-2" onClick={groups.refresh}>
                        <Refresh size={24} />
                    </Button>
                )}
            </h3>

            {loading.loading ? (
                <SkeletonCards count={6} className="w-full" />
            ) : (
                <>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {groups.groups().map((group) => (
                            <WizLightGroup key={group.id} {...group} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}