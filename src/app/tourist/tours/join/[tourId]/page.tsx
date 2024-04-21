import MemberJoinForm from "@/components/MemberJoinForm";

export default function Page({ params }: { params: { tourId: string } }) {
  return (
    <main className="container p-16">
      {/* need a tour banner here */}
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Add Your Members List
      </h3>
      <h4 className="text-l scroll-m-20 tracking-tight text-[#515B6F]">
        Insert members that will join in this tour
      </h4>
      <MemberJoinForm tourId={params.tourId} />
    </main>
  );
}
