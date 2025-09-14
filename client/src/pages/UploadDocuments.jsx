import { useState } from "react"

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

const Select = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState("")
  const handleToggle = () => setIsOpen(!isOpen)
  const handleSelect = (val) => {
    setValue(val)
    setIsOpen(false)
  }
  return (
    <div className="relative">
      <button
        className="flex h-10 w-full items-center justify-between rounded-md border border-blue-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
        onClick={handleToggle}
      >
        <span>{value || "Select an option"}</span>
        <ChevronDownIcon />
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 rounded-md border border-blue-200 bg-white shadow-lg z-50">
          {["Transcripts", "Enrollment Data", "Course Materials", "Policies & Procedures", "Reports", "Other"].map((opt) => (
            <div
              key={opt}
              className="px-2 py-1.5 text-sm hover:bg-blue-50 cursor-pointer"
              onClick={() => handleSelect(opt)}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// Badge + Progress
const Badge = ({ children, variant = "default" }) => {
  const variants = {
    default: "bg-blue-600 text-white",
    secondary: "bg-blue-300 text-blue-800",
    destructive: "bg-red-500 text-white"
  }
  return (
    <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${variants[variant]}`}>
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

// Mock Data
const recentUploads = [
  { id: 1, name: "Student_Transcripts_Fall2024.pdf", type: "Transcripts", size: "2.4 MB", uploadedBy: "Admin", uploadDate: "2024-01-15", status: "Completed" },
  { id: 2, name: "Course_Catalog_2024.xlsx", type: "Course Materials", size: "1.8 MB", uploadedBy: "Dr. Smith", uploadDate: "2024-01-14", status: "Processing" },
  { id: 3, name: "Enrollment_Data_Spring2024.csv", type: "Enrollment", size: "856 KB", uploadedBy: "Registrar", uploadDate: "2024-01-13", status: "Completed" },
  { id: 4, name: "Faculty_Directory.pdf", type: "Directory", size: "3.1 MB", uploadedBy: "HR Department", uploadDate: "2024-01-12", status: "Failed" }
]

const UploadDocuments = () => {
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  const handleFileUpload = () => {
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
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Upload Documents</h1>
        <p className="text-lg text-blue-700 mt-2">Manage and upload institutional documents</p>
      </div>

      {/* Upload Stats */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader><CardTitle>Total Documents</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-slate-800">1,293</div></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Storage Used</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-slate-800">47.2 GB</div></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Pending Review</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-slate-800">12</div></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Success Rate</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-slate-800">94.8%</div></CardContent>
        </Card>
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
              <div><Label>Document Type</Label><Select /></div>
              <div><Label>Department</Label><Select /></div>
            </div>

            <div>
              <Label>File Upload</Label>
              <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center">
                <div className="mx-auto text-blue-500 mb-4"><UploadIcon /></div>
                <p className="text-lg font-medium text-slate-800 mb-2">Drop files here or click to browse</p>
                <p className="text-sm text-blue-600 mb-4">Supports PDF, DOC, XLS, CSV (Max: 10MB)</p>
                <Input type="file" className="hidden" id="file-upload" multiple />
                <Button asChild variant="outline">
                  <label htmlFor="file-upload" className="cursor-pointer">Choose Files</label>
                </Button>
              </div>
            </div>

            {isUploading && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Upload Progress</Label>
                  <span className="text-sm text-blue-600">{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} />
              </div>
            )}

            <div className="flex justify-end space-x-4">
              <Button variant="outline">Cancel</Button>
              <Button onClick={handleFileUpload} disabled={isUploading}>
                {isUploading ? "Uploading..." : "Upload Documents"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Uploads */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Uploads</CardTitle>
          <CardDescription>Recently uploaded documents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentUploads.map((upload) => (
              <div key={upload.id} className="flex items-center space-x-4 p-4 border border-blue-200 rounded-lg">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-500">
                  <FileIcon />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-800">{upload.name}</p>
                  <p className="text-xs text-blue-600">{upload.type} • {upload.size} • {upload.uploadedBy} • {upload.uploadDate}</p>
                </div>
                <Badge variant={
                  upload.status === "Completed" ? "default" :
                    upload.status === "Processing" ? "secondary" : "destructive"
                }>
                  {upload.status}
                </Badge>
                <Button variant="ghost" size="sm"><DownloadIcon /></Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default UploadDocuments
