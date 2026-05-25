"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

function SettingsSection({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div data-slot="settings-section" className={cn("flex flex-col gap-6", className)} {...props}>
      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General settings</CardTitle>
              <CardDescription>Manage your workspace preferences.</CardDescription>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <Field orientation="horizontal">
                  <div className="flex flex-1 flex-col gap-1">
                    <FieldLabel htmlFor="marketing">Marketing emails</FieldLabel>
                    <FieldDescription>
                      Receive emails about new features and updates.
                    </FieldDescription>
                  </div>
                  <Switch id="marketing" />
                </Field>
                <Field orientation="horizontal">
                  <div className="flex flex-1 flex-col gap-1">
                    <FieldLabel htmlFor="analytics">Usage analytics</FieldLabel>
                    <FieldDescription>
                      Help improve elorm/ui by sharing anonymous usage data.
                    </FieldDescription>
                  </div>
                  <Switch id="analytics" defaultChecked />
                </Field>
              </FieldGroup>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification settings</CardTitle>
              <CardDescription>Choose what you get notified about.</CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security settings</CardTitle>
              <CardDescription>Manage authentication and access.</CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export { SettingsSection }
