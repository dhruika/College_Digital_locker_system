import { useState } from "react"
import axios from "axios"


// --- Icons (unchanged) ---
const UploadIcon = () => (
  <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="17 8 12 3 7 8"></polyline>
    <line x1="12" y1="3" x2="12" y2="15"></line>
  </svg>
)
const FileIcon = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
)
const CheckCircleIcon = () => (
  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
)
const AlertCircleIcon = () => (
  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="8" x2="12" y2="12"></line>
    <line x1="12" y1="16" x2="12.01" y2="16"></line>
  </svg>
)
const DownloadIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
)
const ChevronDownIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
)

// --- UI Components ---
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg border border-blue-200 shadow-sm ${className}`}>
    {children}
  </div>
)
const CardHeader = ({ children, className = "" }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>
)
const CardTitle = ({ children, className = "" }) => (
  <h3 className={`text-2xl font-semibold text-slate-800 ${className}`}>{children}</h3>
)
const CardDescription = ({ children, className = "" }) => (
  <p className={`text-sm text-blue-600 ${className}`}>{children}</p>
)
const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
)

const Button = ({ children, className = "", variant = "default", size = "default", onClick, disabled, asChild }) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 " +
    "disabled:pointer-events-none disabled:opacity-50"

  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700 h-10 px-4 py-2",
    outline: "border border-blue-200 bg-white hover:bg-blue-50 text-blue-600 h-10 px-4 py-2",
    ghost: "hover:bg-blue-50 text-blue-600 h-8 w-8 p-0"
  }

  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-8 px-3 text-xs",
    lg: "h-12 px-6 text-base"
  }

  if (asChild) {
    return <div className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}>{children}</div>
  }

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

const Input = ({ className = "", type = "text", ...props }) => (
  <input
    type={type}
    className={`flex h-10 w-full rounded-md border border-blue-200 bg-white px-3 py-2 text-sm placeholder:text-blue-400 
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 
    disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
)

const Label = ({ children, htmlFor, className = "" }) => (
  <label
    htmlFor={htmlFor}
    className={`text-sm font-medium text-slate-700 ${className}`}
  >
    {children}
  </label>
)
// --- Simple Select Component ---
const Dropdown = ({ label, options, value, setValue }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div>
      <Label>{label}</Label>
      <div className="relative mt-1">
        <button
          className="flex h-10 w-full items-center justify-between rounded-md border border-blue-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          onClick={() => setIsOpen(!isOpen)}
          type="button"
        >
          <span>{value || `Select ${label}`}</span>
          <ChevronDownIcon />
        </button>
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 rounded-md border border-blue-200 bg-white shadow-lg z-50">
            {options.map((opt) => (
              <div
                key={opt}
                className="px-2 py-1.5 text-sm hover:bg-blue-50 cursor-pointer"
                onClick={() => {
                  setValue(opt)
                  setIsOpen(false)
                }}
              >
                {opt}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// Badge + Progress (unchanged)
// Badge + Progress (fixed)
const Badge = ({ children, variant = "default" }) => {
  const variants = {
    default: "bg-blue-600 text-white",
    secondary: "bg-blue-300 text-blue-800",
    destructive: "bg-red-500 text-white"
  }

  return (
    <div
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${variants[variant]}`}
    >
      {children}
    </div>
  )
}

const Progress = ({ value }) => (
  <div className="relative w-full overflow-hidden rounded-full bg-blue-100">
    <div
      className="h-2 bg-blue-600 transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </div>
)


// --- Component ---
const UploadDocuments = () => {
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [department, setDepartment] = useState("")
  const [year, setYear] = useState("")
  const [docType, setDocType] = useState("")
  const [file, setFile] = useState(null)
  const [recentUploads, setRecentUploads] = useState([])


  // const recentUploads = [
  //   {
  //     id: 1,
  //     name: "Student_Transcripts_Fall2024.pdf",
  //     type: "Transcripts",
  //     size: "2.4 MB",
  //     uploadedBy: "Admin",
  //     uploadDate: "2024-01-15",
  //     status: "Completed"
  //   },
  //   {
  //     id: 2,
  //     name: "Course_Catalog_2024.xlsx",
  //     type: "Course Materials",
  //     size: "1.8 MB",
  //     uploadedBy: "Dr. Smith",
  //     uploadDate: "2024-01-14",
  //     status: "Processing"
  //   },
  //   {
  //     id: 3,
  //     name: "Enrollment_Data_Spring2024.csv",
  //     type: "Enrollment",
  //     size: "856 KB",
  //     uploadedBy: "Registrar",
  //     uploadDate: "2024-01-13",
  //     status: "Completed"
  //   },
  //   {
  //     id: 4,
  //     name: "Faculty_Directory.pdf",
  //     type: "Directory",
  //     size: "3.1 MB",
  //     uploadedBy: "HR Department",
  //     uploadDate: "2024-01-12",
  //     status: "Failed"
  //   }
  // ]



  const handleFileUpload = async () => {
    if (!file || !docType || !department || !year) {
      alert("Please select department, year, document type and upload a file.")
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    try {
      const formData = new FormData()
      formData.append("excel", file) // backend expects "excel" for LC
      formData.append("documentType", docType)
      formData.append("department", department)
      formData.append("year", year)

      const res = await axios.post("http://localhost:5000/api/admin/upload-lc", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          setUploadProgress(percent)
        }
      })

      console.log("✅ Upload success:", res.data)
      // alert("Upload successful!")
      setUploadResults(res.data.results || [])
      setRecentUploads((prev) => [
        ...prev,
        ...res.data.results.map((r, idx) => ({
          id: Date.now() + idx,
          name: `${r.pnr}-LC.pdf`,
          type: docType,
          size: "—",
          uploadedBy: "Admin",
          uploadDate: new Date().toLocaleDateString(),
          status: r.status.includes("✅") ? "Completed" : "Failed"
        }))
      ]);

    } catch (err) {
      console.error("❌ Upload error:", err)
      alert("Upload failed. Check console for details.")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="space-y-6 p-6 bg-blue-100 min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Upload Documents</h1>
        <p className="text-lg text-blue-700 mt-2">
          Manage and upload institutional documents
        </p>
      </div>

      {/* Upload Form */}
      <Card>
        <CardHeader>
          <CardTitle>Upload New Document</CardTitle>
          <CardDescription>Upload documents to the repository</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <Dropdown
                label="Document Type"
                options={["LC", "Bonafide", "Result", "Hallticket", "General"]}
                value={docType}
                setValue={setDocType}
              />
              <Dropdown
                label="Department"
                options={["BBA(CA)", "BBA(IB)", "BBA", "BVoc"]}
                value={department}
                setValue={setDepartment}
              />
            </div>

            <div>
              <Dropdown
                label="Year"
                options={["First Year", "Second Year", "Third Year"]}
                value={year}
                setValue={setYear}
              />
            </div>

            {/* File Upload */}
            <div>
              <Label>File Upload</Label>
              <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center">
                <div className="mx-auto text-blue-500 mb-4"><UploadIcon /></div>
                <p className="text-lg font-medium text-slate-800 mb-2">
                  Drop files here or click to browse
                </p>
                <p className="text-sm text-blue-600 mb-4">
                  Supports PDF, DOC, XLS, CSV (Max: 10MB)
                </p>
                <input
                  type="file"
                  className="hidden"
                  id="file-upload"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <Button asChild variant="outline">
                  <label htmlFor="file-upload" className="cursor-pointer">
                    Choose File
                  </label>
                </Button>
                {file && (
                  <p className="mt-2 text-sm text-slate-700">
                    Selected: {file.name}
                  </p>
                )}
              </div>
            </div>

            {/* Upload Progress */}
            {isUploading && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Upload Progress</Label>
                  <span className="text-sm text-blue-600">
                    {uploadProgress}%
                  </span>
                </div>
                <Progress value={uploadProgress} />
              </div>
            )}

            <div className="flex justify-end space-x-4">
              <Button variant="outline">Cancel</Button>
              <Button onClick={handleFileUpload} disabled={isUploading}>
                {isUploading ? "Uploading..." : "Upload Document"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Uploads</CardTitle>
          <CardDescription>Recently uploaded documents and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentUploads.map((upload) => (
              <div key={upload.id} className="flex items-center space-x-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
                  <div className="text-gray-500 dark:text-gray-400">
                    <FileIcon />
                  </div>
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{upload.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {upload.type} • {upload.size} • Uploaded by {upload.uploadedBy} on {upload.uploadDate}
                  </p>
                </div>
                <Badge
                  variant={
                    upload.status === "Completed" ? "default" :
                      upload.status === "Processing" ? "secondary" :
                        "destructive"
                  }
                  className={
                    upload.status === "Completed" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100" :
                      upload.status === "Processing" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100" :
                        "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                  }
                >
                  {upload.status === "Completed" && <CheckCircleIcon />}
                  {upload.status === "Failed" && <AlertCircleIcon />}
                  <span className="ml-1">{upload.status}</span>
                </Badge>
                <Button variant="ghost" size="sm">
                  <DownloadIcon />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>







    </div>
  )




}

export default UploadDocuments
