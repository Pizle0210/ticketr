import Form from "next/form";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { Button } from "./ui/button";

export default function SearchBar() {
  return (
    <div>
      <Form action={"/search"} className="relative">
        <Input
          type="text"
          name="q"
          placeholder="Search for events..."
          className=" w-full text-gray-500 border-gray-200 bg-transparent px-4 py-5 pl-12 shadow-sm outline-none focus-within:outline-none focus:border-none focus:border-transparent focus:ring-2 focus:ring-primary"
        />
        <Search className="h-5 hover: absolute left-4 top-1/2 w-5 -translate-y-1/2 text-gray-300" />
        <Button
          type="submit"
          className="scroll absolute right-2 top-1/2 -translate-y-1/2 bg-primary/80 px-4 font-medium text-white transition-all duration-200 hover:bg-primary"
          size={"sm"}
        >
          Search
        </Button>
      </Form>
    </div>
  );
}
