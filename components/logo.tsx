import { PiggyBank } from "lucide-react";
import Link from "next/link";

import { BRAND_NAME } from "@/lib/constants";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 self-center font-medium">
      <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
        <PiggyBank className="size-4" />
      </div>
      {BRAND_NAME}
    </Link>
  );
}
