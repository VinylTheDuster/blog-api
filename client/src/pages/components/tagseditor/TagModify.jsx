import { useState } from "react"

export default function TagModify({ tags, selectedTag, handleSubmit,  }) {

    const [hexColor, setHexColor] = useState((tags.at(selectedTag - 1))?.tag_color ?? "");
    const [checked, setChecked] = useState((tags.at(selectedTag - 1))?.is_white ?? true);

    const [visualName, setVisualName] = useState("");

    return (
        <div className="bg-zinc-700 text-zinc-100 font-ubuntu">
            {}
            <span className="text-2xl">{tags.at(selectedTag - 1).tag_visual} - Tag Modifying</span>
            <div className="flex mt-6 gap-6">
                <div className="flex flex-col gap-4">

                    {/* Visual Name */}
                    <div className="flex justify-between">
                        <label className="pr-4" htmlFor="tagvisual">Visual Name:</label>
                        <input id="tagvisual" type="text" maxLength={25} value={visualName} onChange={(e) => setVisualName(e.target.value)} placeholder={(tags.at(selectedTag - 1)).tag_visual} className="bg-zinc-600 text-sm p-1 rounded-md ring-2" />
                    </div>

                    {/* Color */}
                    <div className="flex justify-between">
                        <label className="pr-4" htmlFor="color">Color:</label>
                        <input id="color" type="color" maxLength={7} placeholder={hexColor} onChange={(e) => setHexColor(e.target.value)} className="bg-zinc-600 text-sm p-1 rounded-md ring-2"/>
                    </div>

                    {/* Is White */}
                    <div className="flex justify-between">
                        <label className="pr-4" htmlFor="white">Is White:</label>
                        <input id="white" type="checkbox" checked={checked} onChange={() => setChecked(!checked)} className="bg-zinc-600 text-sm p-1 rounded-md ring-2"/>
                    </div>
                </div>
                <div className="flex w-45 justify-center">
                    <div style={{ backgroundColor: hexColor === "" ? tags.at(selectedTag - 1).tag_color : hexColor }} className="rounded-md p-2 h-fit self-center w-fit">
                        <span className={`${checked === true ? "text-zinc-50" : "text-zinc-800"}`}>{visualName === "" ? tags.at(selectedTag - 1).tag_visual : visualName }</span>
                    </div>
                </div>
            </div>
            <div className="flex mt-5 justify-center">
                <button onClick={() => handleSubmit("modify")} className="bg-zinc-400 px-6 py-2 text-xl text-zinc-700 rounded-md shadow-zinc-900 shadow-md hover:bg-zinc-500 hover:text-zinc-300 active:bg-zinc-600 active:text-zinc-100">Submit</button>
            </div>
        </div>
    )
}
