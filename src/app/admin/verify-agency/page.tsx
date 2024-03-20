import VerifyAgencyTable from "@/components/VerifyAgencyComponent/VerifyAgencyTable";
import getAgencies from "@/lib/getAgencies";

export type Agency = {
    username: string;
    phone: string;
    email: string;
    image: string;
    role: string;
    agencyName: string;
    licenseNo: string;
    bankAccount: string;
    companyInformation: string;
    authorizeAdminUsername: string;
    authorizeStatus: string;
    approveTime: string;
}

export default async function VerifyAgency() {
    const agencies = await getAgencies().then(
        (res) => {
            if(res && res.status === 200) {
                return res.body.data as Agency[];
            }
            return [] as Agency[];
        }
    );
    return (
        <div className="container flex flex-col gap-6 lg:w-4/5 w-full lg:px-0 px-6">
            <div className="flex justify-between mt-10">
                <h1 className="text-2xl font-semibold">Agency Table</h1>
            </div>
            <div className="flex justify-center">
                <VerifyAgencyTable agencies={agencies}/>
            </div>
        </div>
    );
}