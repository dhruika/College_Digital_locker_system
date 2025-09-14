import { useState } from "react"
import { Search, Plus, Filter, Download, MoreHorizontal } from "lucide-react"

const students = [
    {
        id: "STU001",
        name: "Alice Johnson",
        email: "alice.johnson@university.edu",
        department: "Computer Science",
        year: "3rd Year",
        status: "Active",
        gpa: "3.8",
    },
    {
        id: "STU002",
        name: "Michael Chen",
        email: "michael.chen@university.edu",
        department: "Engineering",
        year: "2nd Year",
        status: "Active",
        gpa: "3.6",
    },
    {
        id: "STU003",
        name: "Emma Rodriguez",
        email: "emma.rodriguez@university.edu",
        department: "Business",
        year: "4th Year",
        status: "Inactive",
        gpa: "3.9",
    },
    {
        id: "STU004",
        name: "David Kim",
        email: "david.kim@university.edu",
        department: "Mathematics",
        year: "1st Year",
        status: "Active",
        gpa: "3.7",
    },
]

const ManageStudents = () => {
    const [searchTerm, setSearchTerm] = useState("")

    const filteredStudents = students.filter(
        (student) =>
            student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.department.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Manage Students</h1>
                    <p className="text-lg text-gray-500 mt-2">
                        View and manage all student records
                    </p>
                </div>
                <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    <Plus className="h-4 w-4" />
                    Add Student
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-6 md:grid-cols-3">
                <div className="bg-gray-50 shadow-sm rounded-lg p-4 border border-gray-200">
                    <p className="text-sm font-medium text-gray-600">Total Students</p>
                    <h2 className="text-2xl font-bold text-gray-800">2,847</h2>
                    <p className="text-xs text-green-600">+5.2% from last semester</p>
                </div>
                <div className="bg-gray-50 shadow-sm rounded-lg p-4 border border-gray-200">
                    <p className="text-sm font-medium text-gray-600">Active Students</p>
                    <h2 className="text-2xl font-bold text-gray-800">2,642</h2>
                    <p className="text-xs text-gray-500">92.8% active rate</p>
                </div>
                <div className="bg-gray-50 shadow-sm rounded-lg p-4 border border-gray-200">
                    <p className="text-sm font-medium text-gray-600">Average GPA</p>
                    <h2 className="text-2xl font-bold text-gray-800">3.6</h2>
                    <p className="text-xs text-green-600">+0.1 from last semester</p>
                </div>
            </div>

            {/* Search & Actions */}
            <div className="bg-gray-50 shadow-sm rounded-lg p-6 border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">Student Directory</h2>
                <p className="text-sm text-gray-500 mb-6">
                    Search and filter through all student records
                </p>

                <div className="flex items-center gap-4 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                            type="text"
                            placeholder="Search students by name, email, or department..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>
                    <button className="flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-100">
                        <Filter className="h-4 w-4 text-gray-600" />
                        Filter
                    </button>
                    <button className="flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-100">
                        <Download className="h-4 w-4 text-gray-600" />
                        Export
                    </button>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full border border-gray-200 rounded-lg">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="text-left px-4 py-2 text-gray-600">Student ID</th>
                                <th className="text-left px-4 py-2 text-gray-600">Name</th>
                                <th className="text-left px-4 py-2 text-gray-600">Email</th>
                                <th className="text-left px-4 py-2 text-gray-600">Department</th>
                                <th className="text-left px-4 py-2 text-gray-600">Year</th>
                                <th className="text-left px-4 py-2 text-gray-600">Status</th>
                                <th className="text-left px-4 py-2 text-gray-600">GPA</th>
                                <th className="text-right px-4 py-2 text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStudents.map((student) => (
                                <tr
                                    key={student.id}
                                    className="border-t border-gray-200 hover:bg-gray-50 transition"
                                >
                                    <td className="px-4 py-2 font-medium text-gray-700">{student.id}</td>
                                    <td className="px-4 py-2 text-gray-700">{student.name}</td>
                                    <td className="px-4 py-2 text-gray-500">{student.email}</td>
                                    <td className="px-4 py-2 text-gray-700">{student.department}</td>
                                    <td className="px-4 py-2 text-gray-700">{student.year}</td>
                                    <td className="px-4 py-2">
                                        <span
                                            className={`px-2 py-1 text-xs rounded-full font-medium ${student.status === "Active"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-gray-200 text-gray-600"
                                                }`}
                                        >
                                            {student.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2 font-medium text-gray-700">{student.gpa}</td>
                                    <td className="px-4 py-2 text-right">
                                        <button className="p-2 rounded hover:bg-gray-100">
                                            <MoreHorizontal className="h-4 w-4 text-gray-600" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ManageStudents
