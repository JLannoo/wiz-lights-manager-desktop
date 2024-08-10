import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/scenes")({
    component: Scenes,
});

function Scenes() {
    return (
        <div className="p-5 animate-appear">
            <h2 className="font-extrabold text-5xl p-4">
                Scenes
            </h2>
        </div>
    );
}

