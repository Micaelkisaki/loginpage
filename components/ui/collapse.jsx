"use client";

import * as Collapsible from "@radix-ui/react-collapsible";
import * as React from "react";
import { cn } from "@/lib/utils";

const Collapse = Collapsible.Root;

const CollapseTrigger = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <Collapsible.Trigger
      ref={ref}
      className={cn(
        "flex w-full items-center justify-between rounded-xl border border-gray-800 bg-gray-900 px-4 py-3 text-left text-sm font-semibold text-white hover:bg-white/5 transition",
        className,
      )}
      {...props}
    >
      {children}
    </Collapsible.Trigger>
  ),
);
CollapseTrigger.displayName = "CollapseTrigger";

const CollapseContent = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <Collapsible.Content
      ref={ref}
      className={cn("overflow-hidden text-sm text-gray-300", className)}
      {...props}
    >
      {children}
    </Collapsible.Content>
  ),
);
CollapseContent.displayName = "CollapseContent";

export { Collapse, CollapseContent, CollapseTrigger };
