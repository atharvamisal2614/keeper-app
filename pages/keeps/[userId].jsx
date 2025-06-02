// import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import { Plus } from "lucide-react";
// import { Pencil, Trash2 } from "lucide-react";

// export default function KeepsPage({ keeps }) {

    

//     const router = useRouter();
//     const { userId } = router.query; //Fetch userId from URL
//     const [title, setTitle] = useState("");
//     const [content, setContent] = useState("");
//     const [error, setError] = useState("");
//     const [success, setSuccess] = useState("");
//     const [isFormOpen, setIsFormOpen] = useState(false);

//     const addKeep = async (e) => {
//         e.preventDefault();

//         if (!title || !content) {
//             setError("All fields are required");
//             return;
//         }

//         try {
//             const res = await fetch("/api/AddKeeps", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ title, content, userId }),
//             });

//             const data = await res.json();

//             if (data.success) {
//                 setSuccess("Keep added successfully");
//                 setError("");
//                 setTitle("");
//                 setContent("");
//                 setIsFormOpen(false);
//                 router.replace(router.asPath);
//             } else {
//                 setError(data.error || "Something went wrong");
//                 setSuccess("");
//             }
//         } catch (err) {
//             setError("Failed to add keep");
//             setSuccess("");
//             console.error(err);
//         }
//     };


//     const handleDelete = async (id) => {
//         const res = await fetch('/api/deletekeeps', {
//             method: 'DELETE',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ id })
//         });
//         const response = res.json();
//         if (response) {
//             router.replace(router.asPath);
//         }
//     }


//     return (
//         <div className="p-6 bg-white min-h-screen relative">
//             <h1 className="text-4xl font-bold text-center mt-20 text-blue-800 mb-6 italic">Your Keeps...</h1>

//             {/* Plus Button */}
//             <button
//                 onClick={() => setIsFormOpen(true)}
//                 className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-800 transition"
//             >
//                 <Plus size={24} />
//             </button>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {keeps &&
//                     keeps.map((keep) => (
//                         <div
//                             key={keep._id}
//                             className="relative p-6 bg-white border border-blue-200 shadow-lg rounded-lg transition-transform transform hover:scale-105"
//                         >
//                             {/* Edit & Delete Icons */}
//                             <div className="absolute top-2 right-2 flex space-x-2">
//                                 {/* <button
//                                     onClick={handleEdit}
//                                     className="text-blue-800 hover:text-red-700 transition"
//                                 >
//                                     <Pencil size={20} />
//                                 </button> */}
//                                 <button
//                                     onClick={() => handleDelete(keep._id)}  
//                                     className="text-blue-800 hover:text-red-700 transition"
//                                 >
//                                     <Trash2 size={20} />
//                                 </button>
//                             </div>

//                             <h3 className="text-2xl font-semibold text-blue-700 italic mb-2">
//                                 {keep.title}
//                             </h3>
//                             <p className="text-black">{keep.content}</p>
//                         </div>
//                     ))}
//             </div>


//             {/* Form Modal */}
//             {isFormOpen && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
//                     <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
//                         <h2 className="text-2xl font-bold text-gray-800 mb-4">Add a New Keep</h2>

//                         <form onSubmit={addKeep}>
//                             <input
//                                 type="text"
//                                 placeholder="Title"
//                                 value={title}
//                                 onChange={(e) => setTitle(e.target.value)}
//                                 className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
//                             />
//                             <textarea
//                                 placeholder="Content"
//                                 value={content}
//                                 onChange={(e) => setContent(e.target.value)}
//                                 className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
//                             ></textarea>
//                             <div className="flex justify-between">
//                                 <button
//                                     type="button"
//                                     onClick={() => setIsFormOpen(false)}
//                                     className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button
//                                     type="submit"
//                                     className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800"
//                                 >
//                                     Add Keep
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}

//         </div>
//     );
// }

// export async function getServerSideProps(context) {
//     const { userId } = context.params; //Extracts userId from URL
   
//     const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
//     const res = await fetch(`${baseUrl}/api/AddKeeps?userId=${userId}`); //KEY=VALUE PAIR

//     if (!res.ok) {
//         console.error("Failed to fetch keeps:", res.statusText);
//         return {
//             props: { keeps: [] },
//         };
//     }

//     const keeps = await res.json();
//     return {
//         props: { keeps },
//     };
// }

















import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Plus } from "lucide-react";
import { Trash2 } from "lucide-react";

export default function KeepsPage({ keeps }) {
    const router = useRouter();
    const { userId } = router.query;

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isFormOpen, setIsFormOpen] = useState(false);

    const addKeep = async (e) => {
        e.preventDefault();

        if (!title || !content) {
            setError("All fields are required");
            return;
        }

        try {
            const res = await fetch("/api/AddKeeps", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, content, userId }),
            });

            const data = await res.json();

            if (data.success) {
                setSuccess("Keep added successfully");
                setError("");
                setTitle("");
                setContent("");
                setIsFormOpen(false);
                router.replace(router.asPath);
            } else {
                setError(data.error || "Something went wrong");
                setSuccess("");
            }
        } catch (err) {
            setError("Failed to add keep");
            setSuccess("");
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        const res = await fetch('/api/deletekeeps', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        });
        const response = await res.json();
        if (response) {
            router.replace(router.asPath);
        }
    }

    return (
        <div className="min-h-screen bg-white px-4 sm:px-6 lg:px-12 py-8 relative">
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-blue-800 mb-10 italic">
                Your Keeps...
            </h1>

            {/* Plus Button */}
            <button
                onClick={() => setIsFormOpen(true)}
                className="fixed bottom-6 right-6 sm:right-10 bg-blue-600 text-white p-4 rounded-full shadow-xl hover:bg-blue-800 transition z-50"
            >
                <Plus size={28} />
            </button>

            {/* Keeps Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {keeps?.map((keep) => (
                    <div
                        key={keep._id}
                        className="relative p-6 bg-white border border-blue-200 shadow-lg rounded-lg transition-transform hover:scale-[1.02]"
                    >
                        {/* Delete Icon */}
                        <div className="absolute top-2 right-2 flex space-x-2">
                            <button
                                onClick={() => handleDelete(keep._id)}
                                className="text-blue-800 hover:text-red-700 transition"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>

                        <h3 className="text-xl sm:text-2xl font-semibold text-blue-700 italic mb-2">
                            {keep.title}
                        </h3>
                        <p className="text-black text-sm sm:text-base">{keep.content}</p>
                    </div>
                ))}
            </div>

            {/* Form Modal */}
            {isFormOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-auto">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Add a New Keep</h2>

                        <form onSubmit={addKeep}>
                            <input
                                type="text"
                                placeholder="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                            />
                            <textarea
                                placeholder="Content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                rows={5}
                                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                            ></textarea>

                            {error && <p className="text-red-500 mb-2">{error}</p>}
                            {success && <p className="text-green-500 mb-2">{success}</p>}

                            <div className="flex justify-between">
                                <button
                                    type="button"
                                    onClick={() => setIsFormOpen(false)}
                                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800"
                                >
                                    Add Keep
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export async function getServerSideProps(context) {
    const { userId } = context.params;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const res = await fetch(`${baseUrl}/api/AddKeeps?userId=${userId}`);

    if (!res.ok) {
        console.error("Failed to fetch keeps:", res.statusText);
        return { props: { keeps: [] } };
    }

    const keeps = await res.json();
    return { props: { keeps } };
}
