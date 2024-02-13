import TourCreationForm from "@/components/TourCreationForm";

export default function TourCreationPage({params}: {params:{tourId: string}}){
    return <main>
        <TourCreationForm tourId={params.tourId}/>
    </main>;
};
