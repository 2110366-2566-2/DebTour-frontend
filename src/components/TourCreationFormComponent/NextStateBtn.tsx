import { Button } from "../ui/button";
import { Label } from "../ui/label";

export default function NextStateButton({ step, handleNextStep }: Readonly<{step: number, handleNextStep: ()=>void}>) {
    return (
        <div className="flex items-center justify-end gap-4">
            <Label htmlFor="nextBtn" className="text-slate-400">
                Next
            </Label>
            <Button
                id="nextBtn"
                type="button"
                onClick={handleNextStep}
                className="h-12 w-12 rounded-full text-2xl"
            >
                &gt;
            </Button>
        </div>
    )
}