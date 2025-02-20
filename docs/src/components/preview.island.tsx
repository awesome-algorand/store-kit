import React from "react";
import { useStore } from "@tanstack/react-store";
import { bearStore } from "@/store";
import { withManager } from "@/hooks/use-wallet.tsx";
import { useEffect, useMemo, useState } from "react";
import { diff } from "@awesome-algorand/store-kit/objects";
import debounce from "lodash.debounce";
import type { WalletManager } from "@txnlab/use-wallet";
import { Preview, SaveAction } from "@/components/preview.tsx";
import { withControls } from "@/components/controls.hooks.tsx";

/**
 * Handles the preview interaction and data state synchronization logic for rendering a preview
 * component. It manages the state of the preview data and keeps it in sync with the application store.
 *
 * @param {Object} params The parameters for the PreviewController component.
 * @param {boolean} params.isLoading Indicates whether the preview data is in a loading state.
 * @param {WalletManager} params.manager Manages the wallet operations and state.
 *
 * @return A React component that renders the preview interface, with functionality to
 * handle changes, save modified data, and indicate loading status.
 */
export function PreviewController({
  isLoading,
}: {
  isLoading: boolean;
  manager: WalletManager;
}) {
  /**
   * `bears` retrieves and provides access to the state and actions
   * from the specified `bearStore` using the `useStore` function.
   */
  const bears = useStore(bearStore);

  /**
   * Represents the data structure containing from the preview.
   */
  const [previewData, setPreviewData] = useState<object>(bears);

  /**
   * A boolean variable that indicates whether a saving operation is currently in progress.
   * It is typically used to represent the state of an ongoing save action.
   * When `true`, it represents that the save operation is active.
   * When `false`, it indicates that no save operation is currently in progress.
   */
  const [isSaving, setIsSaving] = useState(false);

  /**
   * `isDirty` indicates whether the preview data has been modified or is in an unclean or incomplete state.
   * Used as a flag to track changes requiring further action, such as saving, cleaning, or processing.
   */
  const isDirty = useMemo(() => {
    return diff(previewData, bears).length > 0;
  }, [previewData, bears]);

  /**
   * When the store has changed, update the preview data
   * @TODO: CRDT
   */
  useEffect(() => {
    if (isLoading) return;
    console.log(
      `[Starlight Docs] Bears data changed: ${diff(previewData, bears).length}`,
    );
    if (isDirty) {
      setPreviewData(bears);
      setIsSaving(false);
    }
  }, [bears]);

  /**
   * Render the Preview
   */
  return (
    <Preview
      onChange={(state) => {
        setPreviewData(state);
      }}
      isLoading={isLoading}
      state={previewData}
    >
      {isDirty ? (
        <SaveAction
          isLoading={isSaving}
          onSaveClick={debounce(() => {
            setIsSaving(true);
            bearStore.state = previewData;
            bearStore.save().then(() => {
              bearStore.setState(() => bearStore.state);
              setIsSaving(false);
            });
          }, 100)}
        />
      ) : undefined}
    </Preview>
  );
}

/**
 * The PreviewIsland variable is created by applying a higher-order function `withManager`
 * to the `PreviewController` component. It is typically used to enhance the functionality
 * of PreviewController by attaching manager-specific logic or behavior.
 *
 * This abstraction allows for a modular approach to building features, where PreviewController
 * contains core implementation details and `withManager` adds additional functionality
 * such as state or behavior management.
 *
 */
export const PreviewIsland = withManager(PreviewController);
export default PreviewIsland;
