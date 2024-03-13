import RatingStar from "./RatingStar"

export default function ReviewCard({description, ratingScore, touristUsername}:{description:string, ratingScore:number, touristUsername:string}) {
    return (
        <div className="w-11/12 mx-auto bg-[#EAEBFF] rounded-2xl p-4 flex flex-col justify-between leading-normal">
            <div className="mb-8 w-full">
                <p className="text-gray-700 text-base line-clamp-4">{description}</p>
            </div>
            <div className="flex items-center justify-between">
                {/* <img className="w-10 h-10 rounded-full mr-4" src="/ben.png" alt="Avatar of Writer" /> */}
                <RatingStar rating={ratingScore}/>
                <div className="text-sm">
                    <p className="text-gray-900 leading-none">{touristUsername}</p>
                    {/* <p className="text-gray-600">Aug 18</p> */}
                </div>
            </div>
        </div>
);
}