import SuggestionFormButton from "@/components/SuggestionComponent/SuggestionFormButton";
import SuggestionTable from "@/components/SuggestionComponent/SuggestionTable";

export default function SuggestedTours() {
    return (
        <div className="container flex flex-col gap-6 w-1/2">
            <div className="flex justify-between mt-10">
                <h1 className="text-2xl font-semibold">My Suggested Tours</h1>
                <SuggestionFormButton/>
            </div>
            <div className="flex justify-center">
                <SuggestionTable />
            </div>
        </div>
    );
}