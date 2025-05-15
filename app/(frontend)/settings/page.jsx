"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTheme } from "next-themes"

const fontOptions = [
  { value: "inter", label: "Inter" },
  { value: "roboto", label: "Roboto" },
  { value: "poppins", label: "Poppins" },
  { value: "montserrat", label: "Montserrat" },
  { value: "open-sans", label: "Open Sans" },
]

const gradientOptions = [
  {
    value: "blue-purple",
    label: "Blue to Purple",
    class: "from-blue-500 to-purple-500",
  },
  {
    value: "green-blue",
    label: "Green to Blue",
    class: "from-green-400 to-blue-500",
  },
  {
    value: "orange-red",
    label: "Orange to Red",
    class: "from-orange-400 to-red-500",
  },
  {
    value: "pink-purple",
    label: "Pink to Purple",
    class: "from-pink-400 to-purple-500",
  },
  {
    value: "teal-lime",
    label: "Teal to Lime",
    class: "from-teal-400 to-lime-300",
  },
]

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [font, setFont] = useState("inter")
  const [gradient, setGradient] = useState("blue-purple")

  const applyFont = (fontName) => {
    setFont(fontName)
    // Apply font to the document
    if (fontName === "inter") {
      document.body.style.fontFamily = "'Inter', sans-serif"
    } else if (fontName === "roboto") {
      document.body.style.fontFamily = "'Roboto', sans-serif"
    } else if (fontName === "poppins") {
      document.body.style.fontFamily = "'Poppins', sans-serif"
    } else if (fontName === "montserrat") {
      document.body.style.fontFamily = "'Montserrat', sans-serif"
    } else if (fontName === "open-sans") {
      document.body.style.fontFamily = "'Open Sans', sans-serif"
    }
  }

  const applyGradient = (gradientValue) => {
    setGradient(gradientValue)

    // Apply the gradient to the body background
    const selectedGradient = gradientOptions.find((opt) => opt.value === gradientValue)
    if (selectedGradient) {
      const gradientClasses = selectedGradient.class.split(" ")
      const fromColor = gradientClasses[0].replace("from-", "var(--")
      const toColor = gradientClasses[1].replace("to-", "var(--")

      document.body.style.background = `linear-gradient(to right, ${fromColor}), ${toColor}))`

      // For demonstration purposes, apply to a visible element
      const mainElement = document.querySelector("main")
      if (mainElement) {
        mainElement.style.background = `linear-gradient(to right, ${fromColor}), ${toColor}))`
      }
    }
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Settings</h1>

        <Tabs defaultValue="appearance">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-0 max-w-md">
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="appearance" className="space-y-6 pt-6">
            <Card>
              <CardHeader>
                <CardTitle>Theme</CardTitle>
                <CardDescription>Choose between light and dark mode</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={theme}
                  onValueChange={(value) => {
                    setTheme(value)
                    // Force theme application
                    document.documentElement.classList.remove("light", "dark")
                    document.documentElement.classList.add(
                      value === "system"
                        ? window.matchMedia("(prefers-color-scheme: dark)").matches
                          ? "dark"
                          : "light"
                        : value,
                    )
                  }}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                >
                  <div>
                    <RadioGroupItem value="light" id="theme-light" className="peer sr-only" />
                    <Label
                      htmlFor="theme-light"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-100 hover:text-gray-900 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <div className="mb-3 rounded-md border border-gray-200 bg-[#f8f9fa] p-2">
                        <div className="space-y-2">
                          <div className="h-2 w-[80px] rounded-lg bg-[#e9ecef]" />
                          <div className="h-2 w-[100px] rounded-lg bg-[#e9ecef]" />
                        </div>
                      </div>
                      <span>Light</span>
                    </Label>
                  </div>

                  <div>
                    <RadioGroupItem value="dark" id="theme-dark" className="peer sr-only" />
                    <Label
                      htmlFor="theme-dark"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-gray-950 p-4 hover:bg-gray-800 hover:text-gray-50 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <div className="mb-3 rounded-md border border-gray-700 bg-gray-800 p-2">
                        <div className="space-y-2">
                          <div className="h-2 w-[80px] rounded-lg bg-gray-700" />
                          <div className="h-2 w-[100px] rounded-lg bg-gray-700" />
                        </div>
                      </div>
                      <span className="text-gray-300">Dark</span>
                    </Label>
                  </div>

                  <div>
                    <RadioGroupItem value="system" id="theme-system" className="peer sr-only" />
                    <Label
                      htmlFor="theme-system"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-gradient-to-br from-white to-gray-900 p-4 hover:bg-gradient-to-br hover:from-gray-100 hover:to-gray-800 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <div className="mb-3 rounded-md border border-gray-400 bg-gradient-to-br from-white to-gray-800 p-2">
                        <div className="space-y-2">
                          <div className="h-2 w-[80px] rounded-lg bg-gradient-to-r from-gray-200 to-gray-700" />
                          <div className="h-2 w-[100px] rounded-lg bg-gradient-to-r from-gray-200 to-gray-700" />
                        </div>
                      </div>
                      <span>System</span>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Font</CardTitle>
                <CardDescription>Choose your preferred font</CardDescription>
              </CardHeader>
              <CardContent>
                <Select value={font} onValueChange={applyFont}>
                  <SelectTrigger className="w-full max-w-xs">
                    <SelectValue placeholder="Select font" />
                  </SelectTrigger>
                  <SelectContent>
                    {fontOptions.map((font) => (
                      <SelectItem key={font.value} value={font.value}>
                        {font.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="mt-4 p-4 border rounded-md">
                  <p className="text-lg mb-2">Font Preview</p>
                  <p className="mb-2">The quick brown fox jumps over the lazy dog.</p>
                  <p className="text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Background Gradient</CardTitle>
                <CardDescription>Choose a background gradient for your dashboard</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                  {gradientOptions.map((option) => (
                    <div key={option.value} className="flex flex-col items-center">
                      <button
                        className={`w-full h-20 rounded-md mb-2 bg-gradient-to-r ${option.class} ${
                          gradient === option.value ? "ring-2 ring-primary ring-offset-2" : ""
                        }`}
                        onClick={() => applyGradient(option.value)}
                        aria-label={option.label}
                      />
                      <span className="text-xs">{option.label}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="account" className="pt-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account settings and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Account settings would go here</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="pt-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Manage how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Notification settings would go here</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
