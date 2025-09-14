import { useState } from "react"
console.log("DepartmentOverview file loaded ✅");

// --- (SVG Icons remain same as your code) ---

// Card
const Card = ({ children, className = "" }) => (
    <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}>
        {children}
    </div>
);

const CardHeader = ({ children, className = "" }) => (
    <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>
        {children}
    </div>
);

const CardTitle = ({ children, className = "" }) => (
    <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`}>
        {children}
    </h3>
);

const CardDescription = ({ children, className = "" }) => (
    <p className={`text-sm text-gray-500 ${className}`}>
        {children}
    </p>
);

const CardContent = ({ children, className = "" }) => (
    <div className={`p-6 pt-0 ${className}`}>
        {children}
    </div>
);

// Button with BLUE theme
const Button = ({ children, className = "", variant = "default", onClick }) => {
    const baseClasses =
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50";

    const variants = {
        default: "bg-blue-600 text-white hover:bg-blue-700 h-10 px-4 py-2",
        outline:
            "border border-blue-600 text-blue-600 bg-white hover:bg-blue-50 h-10 px-4 py-2",
    };

    return (
        <button className={`${baseClasses} ${variants[variant]} ${className}`} onClick={onClick}>
            {children}
        </button>
    );
};

// Badge with BLUE/GREEN palette
const Badge = ({ children, className = "", variant = "default" }) => {
    const variants = {
        default: "bg-green-100 text-green-800",
        secondary: "bg-blue-100 text-blue-800",
        outline: "border border-gray-300 text-gray-600",
    };

    return (
        <div
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${variants[variant]} ${className}`}
        >
            {children}
        </div>
    );
};

// Progress bar in BLUE
const Progress = ({ value, className = "" }) => {
    return (
        <div className={`relative w-full overflow-hidden rounded-full bg-gray-200 ${className}`}>
            <div
                className="h-2 bg-blue-600 transition-all"
                style={{ width: `${value || 0}%` }}
            />
        </div>
    );
};

const departments = [
    { name: "Computer Science", students: 485, faculty: 32, courses: 24, budget: "$2.4M", utilization: 92, status: "Excellent" },
    { name: "Engineering", students: 627, faculty: 28, courses: 31, budget: "$3.1M", utilization: 88, status: "Good" },
    { name: "Business Administration", students: 743, faculty: 24, courses: 28, budget: "$1.8M", utilization: 85, status: "Good" },
    { name: "Mathematics", students: 234, faculty: 18, courses: 19, budget: "$1.2M", utilization: 78, status: "Fair" },
    { name: "Biology", students: 392, faculty: 22, courses: 26, budget: "$2.0M", utilization: 83, status: "Good" },
    { name: "Psychology", students: 366, faculty: 16, courses: 22, budget: "$1.5M", utilization: 90, status: "Excellent" },
];

const topPerformers = [
    { name: "Computer Science", metric: "Student Satisfaction", value: "4.8/5" },
    { name: "Engineering", metric: "Job Placement Rate", value: "97%" },
    { name: "Business", metric: "Industry Partnerships", value: "45" },
    { name: "Psychology", metric: "Research Publications", value: "127" },
];

const DepartmentOverview = () => {
    const totalStudents = departments.reduce((sum, dept) => sum + dept.students, 0);
    const totalFaculty = departments.reduce((sum, dept) => sum + dept.faculty, 0);
    const totalCourses = departments.reduce((sum, dept) => sum + dept.courses, 0);
    const avgUtilization = Math.round(
        departments.reduce((sum, dept) => sum + dept.utilization, 0) / departments.length
    );

    return (
        <div className="space-y-6 p-6 bg-blue-50 min-h-screen">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-blue-900">Department Overview</h1>
                    <p className="text-lg text-blue-700 mt-2">
                        Comprehensive view of all academic departments
                    </p>
                </div>
                <Button>Generate Report</Button>
            </div>

            {/* Summary Stats */}
            <div className="grid gap-6 md:grid-cols-4">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center text-blue-900">
                            Total Students
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-blue-900">{totalStudents.toLocaleString()}</div>
                        <p className="text-xs text-green-600">Across all departments</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center text-blue-900">
                            Faculty Members
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-blue-900">{totalFaculty}</div>
                        <p className="text-xs text-blue-600">Active faculty</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center text-blue-900">
                            Total Courses
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-blue-900">{totalCourses}</div>
                        <p className="text-xs text-green-600">+12 from last semester</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center text-blue-900">
                            Avg Utilization
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-blue-900">{avgUtilization}%</div>
                        <p className="text-xs text-green-600">+3% from last semester</p>
                    </CardContent>
                </Card>
            </div>

            {/* Department Grid */}
            <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-blue-900">Department Performance</CardTitle>
                        <CardDescription>Current status and metrics for each department</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {departments.map((dept, index) => (
                                <div key={index} className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="font-medium text-blue-900">{dept.name}</h3>
                                            <p className="text-sm text-blue-700">
                                                {dept.students} students • {dept.faculty} faculty • {dept.courses} courses
                                            </p>
                                        </div>
                                        <Badge
                                            variant={
                                                dept.status === "Excellent" ? "default" :
                                                    dept.status === "Good" ? "secondary" :
                                                        "outline"
                                            }
                                        >
                                            {dept.status}
                                        </Badge>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-blue-700">Capacity Utilization</span>
                                            <span className="font-medium">{dept.utilization}%</span>
                                        </div>
                                        <Progress value={dept.utilization} />
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-blue-700">Annual Budget</span>
                                        <span className="font-medium text-blue-900">{dept.budget}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    {/* Top Performers */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-blue-900">Top Performers</CardTitle>
                            <CardDescription>Departments excelling in key metrics</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {topPerformers.map((performer, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between p-3 bg-blue-100 rounded-lg"
                                    >
                                        <div>
                                            <p className="font-medium text-blue-900">{performer.name}</p>
                                            <p className="text-sm text-blue-700">{performer.metric}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-lg font-bold text-green-600">{performer.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-blue-900">Department Actions</CardTitle>
                            <CardDescription>Common administrative tasks</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-3">
                                <Button variant="outline" className="justify-start">
                                    View Faculty Directory
                                </Button>
                                <Button variant="outline" className="justify-start">
                                    Course Enrollment Report
                                </Button>
                                <Button variant="outline" className="justify-start">
                                    Budget Analysis
                                </Button>
                                <Button variant="outline" className="justify-start">
                                    Academic Performance
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default DepartmentOverview;
