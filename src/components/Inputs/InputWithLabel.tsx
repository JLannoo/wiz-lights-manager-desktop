import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { SliderProps } from "@radix-ui/react-slider";

interface InputWithLabelProps {
    onChange: (value: string) => void;
    type: React.InputHTMLAttributes<HTMLInputElement>["type"] | "slider";
    label: string;
    secondaryLabel?: string;
    id: string;
    value: string;
}

interface SliderWithLabelProps extends InputWithLabelProps {
    type: "slider";
    inputProps?: SliderProps;
}

export function InputWithLabel(props: InputWithLabelProps | SliderWithLabelProps) {

    const input = () => {
        if(props.type === "slider") {
            return <Slider
                defaultValue={[parseInt(props.value)]}
                value={[parseInt(props.value)]}
                onValueChange={(value) => props.onChange(value[0].toString())}
                {...(props as SliderWithLabelProps).inputProps}
            />;
        } else {
            return <Input
                type={props.type}
                name={props.id}
                id={props.id}
                value={props.value}
                onChange={(e) => props.onChange(e.target.value)}
            />;
        }
    };

    return (
        <>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <div className="flex gap-2 items-center">
                    <Label htmlFor={props.id}>
                        {props.label}
                    </Label>
                    <Label htmlFor={props.id} className="text-xs text-gray-500">
                        {props.secondaryLabel}
                    </Label>    
                </div>

                {input()}
            </div>
        </>
    );
}