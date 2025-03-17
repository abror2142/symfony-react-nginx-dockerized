import { Formik, Field, Form } from "formik";
import { URLs } from "./api";

function TaskForm ({setOpen}: {setOpen: React.Dispatch<React.SetStateAction<boolean>>}) {
    const handleSubmit = async (json: string) => {
        try {
            await fetch(URLs().TASK_COLLECTION, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/ld+json',
                },
                body: json
            })
        } catch(e) {
            console.log(e);
        } finally {
            setOpen(false)
        }
    }

    return (
        <div>
            <Formik
                initialValues={{
                    owner: '',
                    title: '',
                    description: '',
                    isCompleted: false,
                }}
                onSubmit={async (values) => {
                    const json = JSON.stringify(values, null, 2);
                    await handleSubmit(json)
                }}
            >
                <Form className="flex flex-col gap-2 min-w-sm">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="owner">Owner Full Name</label>
                        <Field id="owner" name="owner" placeholder="John Doe" className="px-3 py-1.5 rounded-sm border dark:border-gray-600 text-base outline-none"/>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="title">Title</label>
                        <Field id="title" name="title" placeholder="Task" className="px-3 py-1.5 rounded-sm border dark:border-gray-600 text-base outline-none"/>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="description">Description</label>
                        <Field id="description" name="description" placeholder="Describe task..." className="px-3 py-1.5 rounded-sm border dark:border-gray-600 text-base outline-none"/>
                    </div>
                    <div className="flex items-center flex-row-reverse gap-2">
                        <label htmlFor="isCompleted">Completed</label>
                        <Field
                            id="isCompleted"
                            name="isCompleted"
                            type="checkbox"
                            className="w-4 h-4"
                        />
                    </div>
                    <button type="submit" className="px-4 py-1.5 rounded-md bg-green-600 max-w-min mx-auto hover:bg-green-700">Submit</button>
                </Form>
            </Formik>
        </div>
    )
}

export default TaskForm;