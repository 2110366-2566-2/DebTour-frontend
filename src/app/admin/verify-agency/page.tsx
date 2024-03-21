import VerifyAgencyTable from "@/components/VerifyAgencyComponent/VerifyAgencyTable";

export default async function VerifyAgency() {
    return (
        <div className="container flex flex-col gap-6 lg:w-4/5 w-full lg:px-0 px-6">
            <div className="flex justify-between mt-10">
                <h1 className="text-2xl font-semibold">Agency Table</h1>
            </div>
            <div className="flex justify-center">
                <VerifyAgencyTable/>
            </div>
        </div>
    );
}