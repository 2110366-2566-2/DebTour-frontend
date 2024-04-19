import { Button } from "../ui/button";
import { Label } from "../ui/label";

export default function SubmitButton({ tourId, checkData }: { tourId: string | undefined, checkData: Function }) {
    return (
        <div className="flex items-center justify-end gap-4">
            <Label htmlFor="submitBtn" className="text-slate-400">
                {tourId ? "Update the tour!" : "Create new tour!"}
            </Label>
            <Button
                id="submitBtn"
                type="submit"
                className="h-12 w-12 rounded-full text-2xl"
                onClick={() => checkData()}
            >
                +
            </Button>
        </div>
    )
}