import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface AddToHomeScreenPromptProps {
  isVisible: boolean;
  onClose: () => void;
  onInstall: () => void;
  canManuallyInstall?: boolean;
}

const AddToHomeScreenPrompt: React.FC<AddToHomeScreenPromptProps> = ({ isVisible, onClose, onInstall, canManuallyInstall = false }) => {
  const getManualInstallInstructions = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(userAgent);
    const isAndroid = /android/.test(userAgent);

    if (isIOS) {
      return (
        <div className="text-sm text-gray-600 space-y-2">
          <p><strong>iOS Safari:</strong></p>
          <ol className="list-decimal list-inside space-y-1">
            <li>Tap the share button <span className="text-blue-500">⬆️</span></li>
            <li>Scroll down and tap "Add to Home Screen"</li>
            <li>Tap "Add" to confirm</li>
          </ol>
        </div>
      );
    } else if (isAndroid) {
      return (
        <div className="text-sm text-gray-600 space-y-2">
          <p><strong>Android Chrome:</strong></p>
          <ol className="list-decimal list-inside space-y-1">
            <li>Tap the menu button <span className="text-blue-500">⋮</span></li>
            <li>Tap "Add to Home screen"</li>
            <li>Tap "Add" to confirm</li>
          </ol>
        </div>
      );
    } else {
      return (
        <div className="text-sm text-gray-600 space-y-2">
          <p><strong>Other browsers:</strong></p>
          <ol className="list-decimal list-inside space-y-1">
            <li>Look for an install icon in the address bar</li>
            <li>Or check the browser menu for "Install" option</li>
          </ol>
        </div>
      );
    }
  };

  return (
    <Dialog open={isVisible} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Autowise to your Home Screen</DialogTitle>
          <DialogDescription>
            Install this application for a faster, full-screen experience.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <p className="text-sm text-gray-500">
            Click the button below to add Autowise to your home screen and use it like a native app.
          </p>
          {canManuallyInstall && (
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm font-medium text-blue-800 mb-2">Manual Installation:</p>
              {getManualInstallInstructions()}
            </div>
          )}
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Not now
          </Button>
          <Button onClick={onInstall}>
            Install App
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddToHomeScreenPrompt;
