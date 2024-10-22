'use client';

import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useRenameProjectModal } from '@/features/projects/store/use-rename-project-modal';

export const RenameProjectModal = () => {
  const { isOpen, onClose, title } = useRenameProjectModal();
  const [name, setName] = useState(title);

  const handleSubmit = () => {};

  useEffect(() => {
    setName(title);
  }, [title]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">Rename your workspace</DialogTitle>

          <VisuallyHidden.Root>
            <DialogDescription>Quickly update and manage workspace name with ease.</DialogDescription>
          </VisuallyHidden.Root>
        </DialogHeader>

        <form onSubmit={handleSubmit} autoCapitalize="off" autoComplete="off">
          <Input
            placeholder="Workspace name"
            minLength={3}
            maxLength={50}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <DialogFooter className="mt-4 gap-y-2 pt-2">
            <Button type="submit" onClick={() => {}} className="ml-auto" disabled={false}>
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
