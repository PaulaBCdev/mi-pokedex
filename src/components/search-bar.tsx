import { useState, type ChangeEvent, type FormEvent } from "react";

interface SearchBarProps {
  onFetch: (searchInput: string) => void;
}

function SearchBar({ onFetch }: SearchBarProps) {
  const [searchInput, setSearchInput] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onFetch(searchInput);
    setSearchInput("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="pokename"
        id="pokename"
        value={searchInput}
        onChange={handleChange}
      />
    </form>
  );
}

export default SearchBar;
