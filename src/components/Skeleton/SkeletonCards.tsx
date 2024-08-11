import {
    Skeleton,
} from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type SkeletonCardsProps = {
    count: number;
    className?: string;
};

export default function SkeletonCards({ count, className }: SkeletonCardsProps) {
    return (
        <div className="flex gap-4 flex-wrap">
            {Array.from({ length: count }).map((_, i) => (
                <Skeleton key={i} className={cn("w-64 h-60", className)} />
            ))}
        </div>
    );
}