import React from "react";
import type { ReactNode, MouseEventHandler } from "react";

// Form Components
import { JsonForms } from "@jsonforms/react";
import {
  vanillaCells,
  vanillaRenderers,
  JsonFormsStyleContext,
} from "@jsonforms/vanilla-renderers";

// Shadcn Components
import { Spinner } from "@/components/ui/spinner.tsx";
import { Button } from "@/components/ui/button.tsx";
import { cn } from "@/lib/utils";

// Override Form Themes
const styleContextValue = {
  styles: [
    {
      name: "control.input",
      classNames: [
        "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
      ],
    },
    {
      name: "input.description",
      classNames: ["block text-gray-700 text-sm font-bold mb-2"],
    },
    {
      name: "control.select",
      classNames: ["select"],
    },
    {
      name: "control.checkbox",
      classNames: ["checkbox"],
    },
    {
      name: "control.radio",
      classNames: ["radio"],
    },
    {
      name: "array.button",
      classNames: ["custom-array-button"],
    },
  ],
};

export type PreviewProps = {
  isLoading: boolean;
  children?: ReactNode;
  state: any;
  onChange: (state: any) => void;
};
export function Preview({
  state,
  onChange,
  isLoading,
  children,
}: PreviewProps) {
  if (isLoading) {
    return (
      <div className="min-h-52">
        <Spinner />
      </div>
    );
  }
  return (
    <JsonFormsStyleContext.Provider value={styleContextValue}>
      <div className="min-h-52">
        <JsonForms
          data={state}
          renderers={vanillaRenderers}
          cells={vanillaCells}
          onChange={({ data }) => onChange(data)}
        />
        {children}
      </div>
    </JsonFormsStyleContext.Provider>
  );
}

export type DirtyFooterProps = {
  isLoading: boolean;
  onSaveClick: MouseEventHandler<HTMLButtonElement>;
};
export function SaveAction({ onSaveClick, isLoading }: DirtyFooterProps) {
  return (
    <div className={cn("flex")}>
      <Button
        onClick={onSaveClick}
        variant="default"
        color="green-900"
        disabled={isLoading}
      >
        {isLoading ? <Spinner /> : "Save"}
      </Button>
      <p>Records are dirty</p>
    </div>
  );
}
