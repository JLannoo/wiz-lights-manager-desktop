import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/groups")({
    component: Groups,
});

function Groups() {
    return (
        <div className="p-5 animate-appear">
            <h2 className="font-extrabold text-5xl p-4">
                Groups
            </h2>
        </div>
    );
}