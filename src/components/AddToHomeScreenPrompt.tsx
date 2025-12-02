import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface AddToHomeScreenPromptProps {
  isVisible: boolean;
  onClose: () => void;
  onInstall: () => void;
}

const AddToHomeScreenPrompt: React.FC<AddToHomeScreenPromptProps> = ({ isVisible, onClose, onInstall }) => {
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
