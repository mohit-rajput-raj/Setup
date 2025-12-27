import { PopcornIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { authClient } from "@/lib/auth-client";

interface UpgradeModelProps {
  open: boolean;
  onClose: (open: boolean) => void;
}

export const UpgradeModel = ({ open, onClose }: UpgradeModelProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>

          {/* Title */}
          <AlertDialogTitle className="flex items-center gap-2">
            <PopcornIcon className="h-5 w-5 text-yellow-500" />
            Upgrade to Pro
          </AlertDialogTitle>

          {/* Description – TEXT ONLY */}
          <AlertDialogDescription>
            Upgrade to Pro to unlock advanced features and take your productivity
            to the next level.
          </AlertDialogDescription>

        </AlertDialogHeader>

        {/* Extra content (layout allowed here) */}
        <div className="mt-4 rounded-lg bg-muted p-4 text-sm text-muted-foreground">
          Enjoying the experience? Pro gives you higher limits, faster execution,
          and premium workflows.
        </div>

        <AlertDialogFooter className="mt-6">
          <AlertDialogCancel>Maybe later</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => authClient.checkout({ slug: "pro" })}
          >
            Upgrade to Pro
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
