"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UserRoleManagement } from "./user-role-management"
import { RoleGate } from "@/components/auth/role-gate"
import { Permission } from "@/lib/role-based-access"
import { useUser } from "@/contexts/user-context"

export function SettingsTabs() {
  const { user } = useUser()
  const [darkMode, setDarkMode] = useState(false)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)
  const [pushNotifications, setPushNotifications] = useState(true)

  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList className="grid w-full max-w-3xl grid-cols-6">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="appearance">Appearance</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="integrations">Integrations</TabsTrigger>
        <TabsTrigger value="users">Users</TabsTrigger>
        <TabsTrigger value="advanced">Advanced</TabsTrigger>
      </TabsList>

      <TabsContent value="account" className="mt-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Update your account details and personal information.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Profile" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-2">
                <Button variant="outline" size="sm" className="w-fit">
                  Change Avatar
                </Button>
                <p className="text-xs text-muted-foreground">JPG, GIF or PNG. Max size of 3MB.</p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="first-name">First Name</Label>
                <Input id="first-name" defaultValue="John" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Last Name</Label>
                <Input id="last-name" defaultValue="Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="john.doe@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  defaultValue="Field operations manager with 10+ years of experience in construction and maintenance projects."
                  rows={4}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline">Cancel</Button>
            <Button>Save Changes</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>Update your password to keep your account secure.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input id="confirm-password" type="password" />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline">Cancel</Button>
            <Button>Update Password</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="appearance" className="mt-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>Customize the look and feel of the application.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="dark-mode">Dark Mode</Label>
                <Switch id="dark-mode" checked={darkMode} onCheckedChange={setDarkMode} />
              </div>
              <p className="text-sm text-muted-foreground">
                Enable dark mode for a more comfortable viewing experience in low light.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="theme">Theme</Label>
              <Select defaultValue="teal">
                <SelectTrigger id="theme">
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="teal">Teal (Default)</SelectItem>
                  <SelectItem value="blue">Blue</SelectItem>
                  <SelectItem value="green">Green</SelectItem>
                  <SelectItem value="purple">Purple</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="density">Display Density</Label>
              <Select defaultValue="comfortable">
                <SelectTrigger id="density">
                  <SelectValue placeholder="Select density" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="compact">Compact</SelectItem>
                  <SelectItem value="comfortable">Comfortable</SelectItem>
                  <SelectItem value="spacious">Spacious</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline">Reset to Default</Button>
            <Button>Save Changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="notifications" className="mt-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
            <CardDescription>Manage how and when you receive notifications.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications via email.</p>
                </div>
                <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">SMS Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications via text message.</p>
                </div>
                <Switch checked={smsNotifications} onCheckedChange={setSmsNotifications} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications on your device.</p>
                </div>
                <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Notification Types</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="job-assignments" defaultChecked />
                  <Label htmlFor="job-assignments">Job Assignments</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="job-updates" defaultChecked />
                  <Label htmlFor="job-updates">Job Updates</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="equipment-alerts" defaultChecked />
                  <Label htmlFor="equipment-alerts">Equipment Alerts</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="staff-updates" />
                  <Label htmlFor="staff-updates">Staff Updates</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="system-alerts" defaultChecked />
                  <Label htmlFor="system-alerts">System Alerts</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="image-captures" defaultChecked />
                  <Label htmlFor="image-captures">Field Image Captures</Label>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline">Reset to Default</Button>
            <Button>Save Changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="integrations" className="mt-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Connected Services</CardTitle>
            <CardDescription>Manage third-party services and API integrations.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M21 8v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5Z" />
                      <path d="m8.5 12.5 7-7" />
                      <path d="M16 9v6h-6" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Weather API</h3>
                    <p className="text-xs text-muted-foreground">Connected on May 15, 2025</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Disconnect
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                      <path d="M2 12h20" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Maps Integration</h3>
                    <p className="text-xs text-muted-foreground">Connected on May 10, 2025</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Disconnect
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">HR System</h3>
                    <p className="text-xs text-muted-foreground">Connected on May 5, 2025</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Disconnect
                </Button>
              </div>
            </div>
            <div className="pt-4">
              <Button>Add New Integration</Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="users" className="mt-6 space-y-6">
        <RoleGate
          permission={Permission.MANAGE_USERS}
          user={user}
          fallback={
            <Card>
              <CardHeader>
                <CardTitle>Access Denied</CardTitle>
                <CardDescription>You don't have permission to manage users.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Please contact an administrator for access to this feature.</p>
              </CardContent>
            </Card>
          }
        >
          <UserRoleManagement />
        </RoleGate>
      </TabsContent>

      <TabsContent value="advanced" className="mt-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Advanced Settings</CardTitle>
            <CardDescription>Configure advanced system settings.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="debug-mode">Debug Mode</Label>
                <Switch id="debug-mode" />
              </div>
              <p className="text-sm text-muted-foreground">
                Enable debug mode for additional logging and troubleshooting.
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="analytics">Usage Analytics</Label>
                <Switch id="analytics" defaultChecked />
              </div>
              <p className="text-sm text-muted-foreground">
                Allow anonymous usage data collection to help improve the application.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="data-retention">Data Retention Period</Label>
              <Select defaultValue="90">
                <SelectTrigger id="data-retention">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 days</SelectItem>
                  <SelectItem value="60">60 days</SelectItem>
                  <SelectItem value="90">90 days</SelectItem>
                  <SelectItem value="180">180 days</SelectItem>
                  <SelectItem value="365">1 year</SelectItem>
                  <SelectItem value="unlimited">Unlimited</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                Set how long to keep historical data before automatic cleanup.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="api-key">API Key</Label>
              <div className="flex gap-2">
                <Input id="api-key" value="••••••••••••••••••••••••••••••" readOnly />
                <Button variant="outline">Regenerate</Button>
              </div>
              <p className="text-sm text-muted-foreground">Your API key for accessing the system programmatically.</p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline">Reset All Settings</Button>
            <Button>Save Changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
