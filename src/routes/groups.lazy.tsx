import { useEffect } from "react";

import { useGroups } from "@/stores/groups";

import WizLightGroup from "@/components/WizLightGroup/WizLightGroup";

import { createLazyFileRoute } from "@tanstack/react-router";
import { useLights } from "@/stores/lights";
import { useLoading } from "@/stores/loading";
import SkeletonCards from "@/components/Skeleton/SkeletonCards";

export const Route = createLazyFileRoute("/groups")({
    component: Groups,
});

function Groups() {
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
                Groups
            </h2>

            {loading.loading ? 
                <SkeletonCards count={6} />
                :
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {groups.groups().map((group) => (
                        <WizLightGroup key={group.id} {...group} />
                    ))}
                </div>
            }
        </div>
    );
}