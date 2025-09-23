import { useState } from "react"
const API_URL = import.meta.env.VITE_API_URL;

const AddStudent = () => {
    const [isUploading, setIsUploading] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0)

    // Manual form state
    const [student, setStudent] = useState({
        pnr: "",
        name: "",
        email: "",
        department: "",
        year: "",
    })


    const [notification, setNotification] = useState({
        message: "",
        type: "", // "success" | "error"
        visible: false,
    })


    // ✅ Updated handleManualSubmit with notification instead of alert
    const handleManualSubmit = async () => {
        try {
            console.log(API_URL);
            const res = await fetch(`${API_URL}/api/admin/add-student`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(student),
            });

            const data = await res.json();

            if (res.ok) {
                // 👇 trigger success notification
                setNotification({
                    message: "Student details added successfully ✅",
                    type: "success",
                    visible: true,
                });

                // hide after 3s
                setTimeout(() => {
                    setNotification({ ...notification, visible: false });
                }, 3000);
            } else {
                // 👇 trigger error notification
                setNotification({
                    message: data.message || "Failed to add student ❌",
                    type: "error",
                    visible: true,
                });

                setTimeout(() => {
                    setNotification({ ...notification, visible: false });
                }, 3000);
            }

            console.log(data);
        } catch (error) {
            console.error("Error adding student:", error);

            // 👇 trigger error notification if fetch itself fails
            setNotification({
                message: "Server error. Please try again ❌",
                type: "error",
                visible: true,
            });

            setTimeout(() => {
                setNotification({ ...notification, visible: false });
            }, 3000);
        }
    };


    // Excel upload (dummy progress)
    const handleExcelUpload = () => {
        setIsUploading(true)
        setUploadProgress(0)
        const interval = setInterval(() => {
            setUploadProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval)
                    setIsUploading(false)
                    return 100
                }
                return prev + 10
            })
        }, 200)
    }

    return (
        <div className="space-y-6 p-6 bg-blue-100 min-h-screen">
            {/* ✅ Notification Box */}
            {notification.visible && (
                <div
                    className={`mb-4 p-3 rounded-md text-white ${notification.type === "success" ? "bg-green-500" : "bg-red-500"
                        }`}
                >
                    {notification.message}
                </div>
            )}


            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-slate-800">Add Students</h1>
                <p className="text-lg text-blue-700 mt-2">
                    Add students manually or upload in bulk via Excel
                </p>
            </div>

            {/* Manual Add Form */}
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-slate-800 mb-1">Add Student Manually</h2>
                <p className="text-sm text-slate-600 mb-6">Fill in details to add a student</p>

                <div className="grid gap-4 md:grid-cols-2">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">PNR</label>
                        <input
                            className="w-full border border-gray-300 rounded-md p-2"
                            value={student.pnr}
                            onChange={(e) => setStudent({ ...student, pnr: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                        <input
                            className="w-full border border-gray-300 rounded-md p-2"
                            value={student.name}
                            onChange={(e) => setStudent({ ...student, name: e.target.value })}
                        />
                    </div>


                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                        <input
                            type="email"
                            className="w-full border border-gray-300 rounded-md p-2"
                            value={student.email}
                            onChange={(e) => setStudent({ ...student, email: e.target.value })}
                            placeholder="example@domain.com"
                        />
                    </div>





                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Department</label>
                        <select
                            className="w-full border border-gray-300 rounded-md p-2"
                            value={student.department}
                            onChange={(e) => setStudent({ ...student, department: e.target.value })}
                        >
                            <option value="">-- Select Department --</option>
                            <option value="BBA(CA)">BBA(CA)</option>
                            <option value="BBA(IB)">BBA(IB)</option>
                            <option value="BBA">BBA</option>
                            <option value="BVOC">BVOC</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Year</label>
                        <select
                            className="w-full border border-gray-300 rounded-md p-2"
                            value={student.year}
                            onChange={(e) => setStudent({ ...student, year: e.target.value })}
                        >
                            <option value="">-- Select Year --</option>
                            <option value="First Year">First Year</option>
                            <option value="Second Year">Second Year</option>
                            <option value="Third Year">Third Year</option>
                        </select>
                    </div>
                    {/* <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Year</label>
                        <input
                            className="w-full border border-gray-300 rounded-md p-2"
                            value={student.year}
                            onChange={(e) => setStudent({ ...student, year: e.target.value })}
                        />
                    </div> */}
                </div>

                <div className="flex justify-end mt-6">
                    <button
                        onClick={handleManualSubmit}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Add Student
                    </button>
                </div>
            </div>

            {/* Bulk Upload */}
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-slate-800 mb-1">Upload Students via Excel</h2>
                <p className="text-sm text-slate-600 mb-6">Upload .xlsx file with student records</p>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Excel Upload
                        </label>
                        <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center">
                            <p className="text-lg font-medium text-slate-800 mb-2">
                                Drop Excel file here or click to browse
                            </p>
                            <p className="text-sm text-blue-600 mb-4">Supports only .xlsx format</p>
                            <input type="file" className="hidden" id="excel-upload" />
                            <label
                                htmlFor="excel-upload"
                                className="px-4 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-100"
                            >
                                Choose File
                            </label>
                        </div>
                    </div>

                    {isUploading && (
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-slate-700">
                                    Upload Progress
                                </span>
                                <span className="text-sm text-blue-600">{uploadProgress}%</span>
                            </div>
                            <div className="w-full h-2 bg-blue-200 rounded-full">
                                <div
                                    className="h-2 bg-blue-600 rounded-full transition-all"
                                    style={{ width: `${uploadProgress}%` }}
                                />
                            </div>
                        </div>
                    )}

                    <div className="flex justify-end space-x-4">
                        <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100">
                            Cancel
                        </button>
                        <button
                            onClick={handleExcelUpload}
                            disabled={isUploading}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                        >
                            {isUploading ? "Uploading..." : "Upload Excel"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddStudent
