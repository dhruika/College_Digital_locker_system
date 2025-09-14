import { useState } from "react"

// Inline SVG Icons
const UserIcon = () => (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
    </svg>
)

const BellIcon = () => (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
    </svg>
)

const ShieldIcon = () => (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    </svg>
)

const DatabaseIcon = () => (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
    </svg>
)

// Inline Components
const Card = ({ children, className = "" }) => (
    <div className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm ${className}`}>
        {children}
    </div>
)

const CardHeader = ({ children, className = "" }) => (
    <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>
        {children}
    </div>
)

const CardTitle = ({ children, className = "" }) => (
    <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`}>
        {children}
    </h3>
)

const CardDescription = ({ children, className = "" }) => (
    <p className={`text-sm text-gray-500 dark:text-gray-400 ${className}`}>
        {children}
    </p>
)

const CardContent = ({ children, className = "" }) => (
    <div className={`p-6 pt-0 ${className}`}>
        {children}
    </div>
)

const Button = ({ children, className = "", variant = "default", onClick }) => {
    const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300"

    const variants = {
        default: "bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 h-10 px-4 py-2",
        outline: "border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50 h-10 px-4 py-2",
        destructive: "bg-red-500 text-slate-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-slate-50 dark:hover:bg-red-900/90 h-10 px-4 py-2"
    }

    return (
        <button
            className={`${baseClasses} ${variants[variant]} ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

const Input = ({ className = "", ...props }) => (
    <input
        className={`flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300 ${className}`}
        {...props}
    />
)

const Label = ({ children, htmlFor, className = "" }) => (
    <label
        htmlFor={htmlFor}
        className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
    >
        {children}
    </label>
)

const Switch = ({ checked, onCheckedChange, className = "" }) => {
    return (
        <button
            role="switch"
            aria-checked={checked}
            onClick={() => onCheckedChange(!checked)}
            className={`peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 dark:focus-visible:ring-slate-300 dark:focus-visible:ring-offset-slate-950 ${checked ? 'bg-slate-900 dark:bg-slate-50' : 'bg-slate-200 dark:bg-slate-800'
                } ${className}`}
        >
            <span
                className={`pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform dark:bg-slate-950 ${checked ? 'translate-x-5' : 'translate-x-0'
                    }`}
            />
        </button>
    )
}

const Tabs = ({ children, defaultValue }) => {
    const [activeTab, setActiveTab] = useState(defaultValue)

    const tabsListChild = children.find(child => child && child.type && child.type.name === 'TabsList')
    const tabsContentChildren = children.filter(child => child && child.type && child.type.name === 'TabsContent')

    return (
        <div>
            {tabsListChild && (
                <div className="inline-flex h-10 items-center justify-center rounded-md bg-slate-100 p-1 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                    {tabsListChild.props.children.map((trigger, index) => (
                        <button
                            key={index}
                            className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 ${activeTab === trigger.props.value
                                ? 'bg-white text-slate-950 shadow-sm dark:bg-slate-950 dark:text-slate-50'
                                : 'hover:bg-white/50 hover:text-slate-950 dark:hover:bg-slate-950/50 dark:hover:text-slate-50'
                                }`}
                            onClick={() => setActiveTab(trigger.props.value)}
                        >
                            {trigger.props.children}
                        </button>
                    ))}
                </div>
            )}
            {tabsContentChildren.find(content => content.props.value === activeTab)}
        </div>
    )
}

const TabsList = ({ children }) => ({ type: { name: 'TabsList' }, props: { children } })
const TabsTrigger = ({ children, value }) => ({ type: { name: 'TabsTrigger' }, props: { children, value } })
const TabsContent = ({ children, value }) => ({ type: { name: 'TabsContent' }, props: { children, value } })

const Setting = () => {
    const [emailNotifications, setEmailNotifications] = useState(true)
    const [pushNotifications, setPushNotifications] = useState(false)
    const [weeklyReports, setWeeklyReports] = useState(true)
    const [twoFactorAuth, setTwoFactorAuth] = useState(false)

    return (
        <div className="space-y-6 p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Settings</h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
                    Manage your account preferences and system settings
                </p>
            </div>

            <Tabs defaultValue="profile">
                <TabsList>
                    <TabsTrigger value="profile">
                        <UserIcon />
                        <span className="ml-2">Profile</span>
                    </TabsTrigger>
                    <TabsTrigger value="notifications">
                        <BellIcon />
                        <span className="ml-2">Notifications</span>
                    </TabsTrigger>
                    <TabsTrigger value="security">
                        <ShieldIcon />
                        <span className="ml-2">Security</span>
                    </TabsTrigger>
                    <TabsTrigger value="system">
                        <DatabaseIcon />
                        <span className="ml-2">System</span>
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="profile">
                    <div className="grid gap-6 mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Profile Information</CardTitle>
                                <CardDescription>Update your personal details and preferences</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="firstName">First Name</Label>
                                            <Input id="firstName" defaultValue="John" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="lastName">Last Name</Label>
                                            <Input id="lastName" defaultValue="Administrator" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email Address</Label>
                                        <Input id="email" type="email" defaultValue="john.admin@university.edu" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone Number</Label>
                                        <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="department">Department</Label>
                                        <Input id="department" defaultValue="Administration" />
                                    </div>
                                    <div className="flex justify-end space-x-4">
                                        <Button variant="outline">Cancel</Button>
                                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">Save Changes</Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="notifications">
                    <div className="grid gap-6 mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Notification Preferences</CardTitle>
                                <CardDescription>Choose how you want to receive notifications</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label>Email Notifications</Label>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                Receive notifications via email
                                            </p>
                                        </div>
                                        <Switch
                                            checked={emailNotifications}
                                            onCheckedChange={setEmailNotifications}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label>Push Notifications</Label>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                Receive push notifications in your browser
                                            </p>
                                        </div>
                                        <Switch
                                            checked={pushNotifications}
                                            onCheckedChange={setPushNotifications}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label>Weekly Reports</Label>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                Get weekly summary reports via email
                                            </p>
                                        </div>
                                        <Switch
                                            checked={weeklyReports}
                                            onCheckedChange={setWeeklyReports}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="security">
                    <div className="grid gap-6 mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Security Settings</CardTitle>
                                <CardDescription>Manage your account security and authentication</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    <div className="space-y-4">
                                        <div>
                                            <Label>Change Password</Label>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                                                Update your password to keep your account secure
                                            </p>
                                            <div className="space-y-3">
                                                <Input type="password" placeholder="Current password" />
                                                <Input type="password" placeholder="New password" />
                                                <Input type="password" placeholder="Confirm new password" />
                                            </div>
                                            <Button variant="outline" className="mt-3">Update Password</Button>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label>Two-Factor Authentication</Label>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                Add an extra layer of security to your account
                                            </p>
                                        </div>
                                        <Switch
                                            checked={twoFactorAuth}
                                            onCheckedChange={setTwoFactorAuth}
                                        />
                                    </div>

                                    <div className="space-y-3">
                                        <Label>Active Sessions</Label>
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Current Session</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">Chrome on MacOS • Active now</p>
                                                </div>
                                                <Button variant="outline" size="sm">Revoke</Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="system">
                    <div className="grid gap-6 mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>System Preferences</CardTitle>
                                <CardDescription>Configure system-wide settings and preferences</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="timezone">Timezone</Label>
                                        <select
                                            id="timezone"
                                            className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950"
                                            defaultValue="America/New_York"
                                        >
                                            <option value="America/New_York">Eastern Time (ET)</option>
                                            <option value="America/Chicago">Central Time (CT)</option>
                                            <option value="America/Denver">Mountain Time (MT)</option>
                                            <option value="America/Los_Angeles">Pacific Time (PT)</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="language">Language</Label>
                                        <select
                                            id="language"
                                            className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950"
                                            defaultValue="en"
                                        >
                                            <option value="en">English</option>
                                            <option value="es">Spanish</option>
                                            <option value="fr">French</option>
                                            <option value="de">German</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="dateFormat">Date Format</Label>
                                        <select
                                            id="dateFormat"
                                            className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950"
                                            defaultValue="MM/DD/YYYY"
                                        >
                                            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                                            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                                            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                                        </select>
                                    </div>

                                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                                        <div className="space-y-3">
                                            <Label className="text-red-600 dark:text-red-400">Danger Zone</Label>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                Irreversible and destructive actions
                                            </p>
                                            <Button variant="destructive">
                                                Delete Account
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default Setting