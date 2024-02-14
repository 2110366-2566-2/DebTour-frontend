import DatePicker from "./DatePicker";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TourSearchHeader = () => {
  return (
    <div
      className="mx-auto mb-12 mt-10 h-[400px] max-w-[1300px] rounded-[36px] bg-indigo-100 object-cover py-12"
      style={{
        backgroundImage: `url("/sea-bg.webp")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="mb-10 text-center text-[54px] font-extrabold capitalize text-white drop-shadow">
        Find your adventure
      </h1>

      <div className="mx-auto grid max-w-[800px] grid-cols-5 gap-x-2 gap-y-8">
        <Input
          className="col-span-5 rounded-2xl"
          placeholder="Search your destination or tour name"
        />

        <DatePicker placeholder={"Start Date"} />
        <DatePicker placeholder={"End Date"} />
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Total members" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="2-5">2-5</SelectItem>
            <SelectItem value="6+">6+</SelectItem>
          </SelectContent>
        </Select>

        <Input placeholder="Minimum price" />
        <Input placeholder="Maximum price" />
      </div>
    </div>
  );
};

export default TourSearchHeader;
