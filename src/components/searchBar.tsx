import { useState } from "react"

interface SearchBarParams {
    onSearch: (city: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarParams) => {
    const [input, setInput] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const trim = input.trim();
        if (trim) {
            onSearch(trim);
            setInput("");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="text-white flex gap-2 mb-6 bg-gray-100/10 p-3 rounded-[20px] shadow-md shadow-white/20 ">
            <input type="text" placeholder="" value={input} onChange={(e) => setInput(e.target.value)} className="focus:outline-none focurs:ring-0"></input>
            <button type="submit" className="">👀</button>
        </form>
    )
}