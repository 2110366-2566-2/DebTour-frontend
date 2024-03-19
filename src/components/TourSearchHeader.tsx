import { set } from "date-fns";
import DatePicker from "./DatePicker";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  heading: string;
  imgPath: string;
  setSearchName: (name: string) => void;
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
  setMemberCount: (count: string) => void;
  setMinPrice: (price: string) => void;
  setMaxPrice: (price: string) => void;
}

const TourSearchHeader = ({
  heading,
  imgPath,
  setSearchName,
  setStartDate,
  setEndDate,
  setMemberCount,
  setMinPrice,
  setMaxPrice,
}: Props) => {
  const handleMemberChange = (selectedOption: any) => {
    console.log(selectedOption.value); // Log the selected value
  };

  return (
    <div
      className="mx-auto mb-12 mt-10 h-[400px] max-w-[1300px] rounded-[36px] bg-indigo-100 object-cover py-12"
      style={{
        backgroundImage: `url("${imgPath}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="mb-10 text-center text-[54px] font-extrabold capitalize text-white drop-shadow">
        {heading}
      </h1>

      <div className="mx-auto grid max-w-[800px] grid-cols-5 gap-x-2 gap-y-8">
        <Input
          className="col-span-5 rounded-2xl"
          placeholder="Search your destination or tour name"
          onChange={(e) => setSearchName(e.target.value)}
        />

        {/* <DatePicker placeholder={"Start Date"} /> */}
        <Input
          type="text"
          className="rounded-md"
          placeholder="Start date"
          onChange={(e) => setStartDate(e.target.value)}
          onFocus={(e) => (e.target.type = "date")}
          onBlur={(e) => (e.target.type = "text")}
        />
        {/* <DatePicker placeholder={"End Date"} /> */}
        <Input
          type="text"
          className="rounded-md"
          placeholder="End date"
          onChange={(e) => setEndDate(e.target.value)}
          onFocus={(e) => (e.target.type = "date")}
          onBlur={(e) => (e.target.type = "text")}
        />
        <Select
          onValueChange={(e) => {
            // need fixing here
            // console.log(e.Max);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Total members" />
          </SelectTrigger>
          <SelectContent>
            {/* need fixing */}
            {/* <SelectItem value={{ Min: "0", Max: "1" }}>1</SelectItem>
            <SelectItem value={{ Min: "2", Max: "5" }}>2-5</SelectItem>
            <SelectItem value={{ Min: "6", Max: "" }}>6+</SelectItem> */}
            <SelectItem value='1'>1</SelectItem>
            <SelectItem value='2'>2-5</SelectItem>
            <SelectItem value='6'>6+</SelectItem>
          </SelectContent>
        </Select>
        <Input
          placeholder="Minimum price"
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <Input
          placeholder="Maximum price"
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>
    </div>
  );
};

export default TourSearchHeader;
