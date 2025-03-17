import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendarCheck, faCalendarXmark, faCheck, faPlus, faTrash, faX } from "@fortawesome/free-solid-svg-icons"
import { URLs } from "./api"
import TaskForm from "./TaskForm"

interface Task {
    "@id": string,
    "@type": string,
    "id": number,
    "title": string,
    "description": string,
    "owner": string,
    "completed": boolean
}

interface Tasks {
    "@context": string,
    "@id": string,
    "@type": string,
    "totalItems": number,
    "member": Task[]   
}

function Task() {
    const [tasks, setTasks] = useState<Tasks | null>(null)
    const [selected, setSelected] = useState<number[]>([]);
    const [open, setOpen] = useState(false);

    const fetchTasks = async() => {
        try {
            const resp = await fetch(URLs().TASK_COLLECTION);
            const json = await resp.json()
            setTasks(json);
        } catch(e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchTasks();
    }, [open])

    const toggleSelection = (id: number) => {
        if(selected.includes(id))
            setSelected(prev => prev.filter(num => num != id))
        else
            setSelected(prev => [...prev, id])
    }

    const toggleSelectionAll = () => {
        if(selected.length == tasks?.member.length)
            setSelected([]);
        else
            setSelected(tasks?.member.map(task => task.id) || []);
    }

    const handleDelete = async () => {
        const promises = selected.map(async (id: number) => {
            try {
                const resp = await fetch(URLs(id).TASK_DOCUMENT, {
                    method: 'DELETE'
                });
                return resp;
            } catch(e) {
                console.log(e);
            }
        });
        await Promise.all(promises);
        fetchTasks();
    }

    const patchTasks = async (json: string) => {
        const promises = selected.map(async (id: number) => {
            try {
                const resp = await fetch(URLs(id).TASK_DOCUMENT, {
                    method: 'PATCH',
                    body: json,
                    headers: {
                        'Content-Type': 'application/merge-patch+json'
                    }
                });
                return resp
            } catch(e) {
                console.log(e);
            }
        });
        await Promise.all(promises);
    }

    const handleCompleted = async () => {
        const json = JSON.stringify({isCompleted: true})
        await patchTasks(json);
        setSelected([]);
        await fetchTasks();
    }

    const handleNotCompleted = async () => {
        const json = JSON.stringify({isCompleted: false})
        await patchTasks(json);
        setSelected([]);
        await fetchTasks();
    }

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg grow-1 max-w-2xl">
            <div className="flex items-center justify-between">
                <div className="flex gap-2 my-2 ">
                    <p 
                        className="flex items-center gap-1 px-4 py-1.5 dark:bg-gray-600 rounded-sm dark:text-gray-300 dark:hover:bg-gray-700"
                        onClick={handleDelete}
                    >
                        <FontAwesomeIcon icon={faTrash} className="text-red-500"/> Delete
                    </p>
                    <p 
                        className="flex items-center gap-1 px-4 py-1.5 dark:bg-gray-600 rounded-sm  dark:hover:bg-gray-700 dark:text-blue-400"
                        onClick={handleCompleted}
                    >
                        <FontAwesomeIcon icon={faCalendarCheck} /> Completed
                    </p>
                    <p 
                        className="flex items-center gap-1 px-4 py-1.5 dark:bg-gray-600 rounded-sm dark:text-gray-300 dark:hover:bg-gray-700"
                        onClick={handleNotCompleted}
                    >
                        <FontAwesomeIcon icon={faCalendarXmark} /> Not Completed
                    </p>
                </div>
                <div className="flex gap-2 my-2 ">
                    <p 
                        className="flex items-center gap-1 px-4 py-1.5 bg-blue-600 rounded-sm dark:text-gray-300 hover:bg-blue-700"
                        onClick={() => setOpen(true)}
                    >
                        <FontAwesomeIcon icon={faPlus} /> New task
                    </p>
                </div>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="p-4">
                            <div className="flex items-center">
                                <input 
                                    id="checkbox-all-search" 
                                    type="checkbox" 
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm 
                                        focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 
                                        dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
                                    onChange={() => toggleSelectionAll()}
                                    checked={selected.length == tasks?.member.length}
                                />
                                <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Task
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Owner
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                            Completed
                        </th>
                    </tr>
                </thead>
                {
                    tasks 
                    ? <tbody>
                        {  
                            tasks?.member
                            ? tasks?.member.map(task => (
                                <tr 
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                                    key={task.id}
                                >
                                    <td className="w-4 p-4">
                                        <div className="flex items-center">
                                            <input 
                                                id="checkbox-table-search-1" 
                                                type="checkbox" 
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 
                                                    rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 
                                                    dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 
                                                    focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
                                                checked={selected.includes(task.id)}
                                                onChange={() => toggleSelection(task.id)}
                                            />
                                            <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                                        </div>
                                    </td>
                                    <td scope="row" className="px-6 py-4">
                                        <p className="text-base dark:text-white">{task?.title}</p>
                                        <p className="text-sm">{task?.description}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        {task?.owner}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <FontAwesomeIcon icon={task?.completed ? faCheck : faX} />
                                    </td>
                                </tr>
                            ))
                            : <p>No Tasks found. Add a Task!</p>
                        }
                    </tbody>
                    : <tbody><tr><td>No Data found</td></tr></tbody>
                }
            </table>

            {
                open 
                && <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="relative bg-white px-8 py-6 rounded-md shadow-lg dark:bg-gray-800 dark:text-gray-200">
                        <h2 className="text-2xl font-bold mb-3 text-center">Create Task</h2>
                        <TaskForm setOpen={setOpen}/>
                        <div>
                            <button 
                                className="absolute top-2 right-2 px-2 text-red-500 border border-transparent hover:border-red-500 rounded-sm" 
                                onClick={() => setOpen(false)}
                            ><FontAwesomeIcon icon={faX} /> </button>
                        </div>
                    </div>
                </div>
           }
        </div>
    )
}

export default Task