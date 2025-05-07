"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash2,  } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogContent,
} from "@/components/ui/alert-dialog";
import EditViews from "@/app/components/Views/EditViews";
import DeleteViews from "@/app/components/Views/DeleteViews";
import { View } from "@/types/Views";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
interface ViewActionsDropdownProps {
  projectId: string;
  views: View;
}

const ViewActionsDropdown = ({
  projectId,
  views,
}: ViewActionsDropdownProps) => {
  const [isEditViewOpen, setIsEditViewOpen] = useState(false);
  const [isDeleteViewOpen, setIsDeleteViewOpen] = useState(false);

  const handleEditViewOpen = () => {
    setIsEditViewOpen(true);
  };

  const handleDeleteViewOpen = () => {
    setIsDeleteViewOpen(true);
  };

  const handleCloseEditDialog = () => {
    setIsEditViewOpen(false); // Close the edit dialog
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="mr-3" asChild>
          <span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <MoreHorizontal />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Edit or Delete Canvas</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={handleEditViewOpen}
            className="flex justify-between items-center"
          >
            <span>Edit Canvas</span>
            <Pencil className="text-blue-500" />
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleDeleteViewOpen}
            className="flex justify-between items-center"
          >
            <span>Delete Canvas</span>

            <Trash2 className="text-red-500" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Edit View Dialog */}
      <Dialog open={isEditViewOpen} onOpenChange={setIsEditViewOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Canvas</DialogTitle>
          </DialogHeader>
          <EditViews
            projectId={projectId}
            view={views}
            onClose={handleCloseEditDialog}
          />
        </DialogContent>
      </Dialog>

      {/* Delete View Dialog */}
      <AlertDialog open={isDeleteViewOpen} onOpenChange={setIsDeleteViewOpen}>
        <AlertDialogContent>
          <DeleteViews projectId={projectId} view={views} />
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ViewActionsDropdown;
