import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-green-100 p-3">
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <CardTitle className="text-2xl text-center">
                Thank you for signing up!
              </CardTitle>
              <CardDescription className="text-center">
                Check your email to confirm your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                  We&apos;ve sent a confirmation email to your inbox. Please
                  click the link in the email to verify your account.
                </p>
                <p className="font-medium text-foreground">What&apos;s next?</p>
                <ol className="list-decimal list-inside space-y-2 ml-2">
                  <li>Check your email and confirm your account</li>
                  <li>Sign in to activate your subscription</li>
                  <li>Your device will ship within 3-5 business days</li>
                </ol>
              </div>

              <div className="pt-4 border-t">
                <p className="text-xs text-center text-muted-foreground">
                  Didn&apos;t receive the email? Check your spam folder or
                  contact support.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
