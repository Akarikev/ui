import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function AlertDemo() {
  return (
    <div className="flex max-w-md flex-col gap-4">
      <Alert>
        <AlertTitle>Heads up</AlertTitle>
        <AlertDescription>You can add components to your app using the CLI.</AlertDescription>
      </Alert>
      <Alert variant="success">
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>Your changes have been saved.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Something went wrong. Please try again.</AlertDescription>
      </Alert>
    </div>
  )
}
