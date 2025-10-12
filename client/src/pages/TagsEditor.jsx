import Modal from 'react-modal';
import { useState } from 'react';

import TagOverlay from './components/tagseditor/TagOverlay';

export default function TagsEditor({ tags, updatedTagObject }) {

    Modal.setAppElement('#main');

    const [modalState, setModalState] = useState(false);
    const [currentSelectedTag, setCurrentSelectedTag] = useState("");

    const modalStyle = {
        overlay: {
            backgroundColor: '##3f3f4650',
        },
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#3f3f46',
        }
    }

    const openModal = () => setModalState(true)
    const closeModal = () => setModalState(false)

    function handleSubmit(tagVisual, tagColor, isWhite) {

        const tagName = tagVisual.toLowerCase().normalize()
        const data = {
            id: 1,
            tag_name: tagName,
            tag_color: tagColor,
            tag_visual: tagVisual,
            is_white: isWhite
        }
    }

    return (
        <div className="m-10 p-5 rounded-xl bg-zinc-800">
            <div className="flex gap-4 pb-4 border-b-1 border-zinc-300">
                <h1>Tags</h1>
                <input type="text" className="self-center bg-zinc-300 text-zinc-800 h-fit px-4 py-0.5 rounded-md ring-3 ring-zinc-500 transition-all focus:ring-zinc-300" placeholder="Search Tags..."/>
            </div>
            <div className="overflow-y-auto">
                <table className="mt-4 w-full table-auto border-y bg-zinc-200 text-left font-dejavu text-shadow-md text-shadow-zinc-700">
                    <thead className="sticky top-0">
                        <tr className="bg-zinc-600 text-zinc-300">
                            <th className="py-3 px-5 w-0 whitespace-nowrap"><input type="checkbox" /></th>
                            <th>Name</th>
                            <th>Used</th>
                            <th className="">Option</th>
                        </tr>
                    </thead>    
                    <tbody>
                        {tags.map(tag => (
                            <tr key={tag.id} className={`${(tag.id % 2) ? "bg-zinc-500" : "bg-zinc-400"}`}>
                                <td className="py-3 px-5 w-0 whitespace-nowrap"><input type="checkbox" /></td>
                                <td><span>{tag.tag_visual}</span></td>
                                <td><span>0</span></td>
                                <td className="whitespace-nowrap align-middle pt-1">
                                    <button onClick={() => {setCurrentSelectedTag(tag.id), openModal()}} className="cursor-pointer">
                                        <img src="/icons/tagsvert.svg" alt="" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Modal
                isOpen={modalState}
                onRequestClose={closeModal}
                style={modalStyle}
            >
                <TagOverlay tags={tags} selectedTag={currentSelectedTag} handleSubmit={handleSubmit} />
            </Modal>
        </div>
    )
}
