import Modal from 'react-modal';
import { useEffect, useState } from 'react';

import TagModify from './components/tagseditor/TagModify';
import TagDelete from './components/tagseditor/TagDelete';

export default function TagsEditor({ tags, createTagObject, updatedTagObject, deleteTagObject }) {

    Modal.setAppElement('#main');

    const [currentSelectedTag, setCurrentSelectedTag] = useState("");

    const [checkers, setCheckers] = useState([]);
    const [omniCheckerTags, setOmniCheckerTags] = useState(false);

    useEffect(() => {
        setCheckers(prev =>
            tags.map(tag => {
                const existing = prev.find(c => c.id === tag.id);
                return existing || { id: tag.id, checked: false };
            })
        );
    }, [tags]);

    const [overlayState, setOverlayState] = useState("");

    const [modalState, setModalState] = useState(false);
    const modalStyle = {
        overlay: {
            backgroundColor: '#3f3f4650',
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
            id: tags.at(-1).id + 1,
            tag_name: tagName,
            tag_color: tagColor,
            tag_visual: tagVisual,
            is_white: isWhite
        }
    }

    return (
        <div className="m-10 p-5 rounded-xl bg-zinc-800">
            <div className='flex justify-between pb-4 border-b-1 border-zinc-300'>
                <div className="flex gap-4">
                    <h1>Tags</h1>
                    <input type="text" className="self-center bg-zinc-300 text-zinc-800 h-fit px-4 py-0.5 rounded-md ring-3 ring-zinc-500 transition-all focus:ring-zinc-300" placeholder="Search Tags..."/>
                </div>
                <div className='flex gap-4'>
                    <button onClick={() => {setOverlayState("add"); openModal()}} className='bg-zinc-600 p-2 rounded-2xl transition-all hover:bg-zinc-500 active:bg-zinc-400 cursor-pointer'><img src="/icons/newtag.svg" alt="" /></button>
                    <button onClick={() => {setOverlayState("delete"); openModal()}} className='bg-zinc-600 p-2 rounded-2xl transition-all hover:bg-zinc-500 active:bg-zinc-400 cursor-pointer'><img src="/icons/remove.svg" alt="" /></button>
                </div>
            </div>
            <div className="overflow-y-auto">
                <table className="mt-4 w-full table-auto border-y bg-zinc-200 text-left font-dejavu text-shadow-md text-shadow-zinc-700">
                    <thead className="sticky top-0">
                        <tr className="bg-zinc-600 text-zinc-300">
                            <th className="py-3 px-5 w-0 whitespace-nowrap">
                                <input
                                    type="checkbox"
                                    checked={omniCheckerTags}
                                    onChange={(e) => {
                                        const checked = e.target.checked;
                                        setOmniCheckerTags(checked);
                                        setCheckers(prev => prev.map(c => ({ ...c, checked })));
                                    }}
                                />
                            </th>
                            <th>Name</th>
                            <th>Used</th>
                            <th className="">Option</th>
                        </tr>
                    </thead>    
                    <tbody>
                        {tags.map(tag => (
                            <tr key={tag.id} className={`${(tag.id % 2) ? "bg-zinc-500" : "bg-zinc-400"}`}>
                                <td className="py-3 px-5 w-0 whitespace-nowrap">
                                    <input
                                        type="checkbox"
                                        checked={checkers.find(c => c.id === tag.id)?.checked || false}
                                        onChange={(e) => {
                                            setCheckers(prev =>
                                                prev.map(c =>
                                                    c.id === tag.id ? { ...c, checked: e.target.checked } : c
                                                )
                                            );
                                        }}
                                    />
                                </td>
                                <td><span>{tag.tag_visual}</span></td>
                                <td><span>0</span></td>
                                <td className="whitespace-nowrap align-middle pt-1">
                                    <button onClick={() => {setCurrentSelectedTag(tag.id), setOverlayState("modify"), openModal()}} className="cursor-pointer">
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
                {(overlayState === "add") && <TagAdd tags={tags} selectedTag={currentSelectedTag} handleSubmit={handleSubmit} />}
                {(overlayState === "modify") && <TagModify tags={tags} selectedTag={currentSelectedTag} handleSubmit={handleSubmit} />}
                {(overlayState === "delete") && <TagDelete abort={closeModal} deleteTags={deleteTagObject} />} {/* Attention à deleteTagObject, il faut le rendre fonctionnel vers le parent. */}
            </Modal>
        </div>
    )
}