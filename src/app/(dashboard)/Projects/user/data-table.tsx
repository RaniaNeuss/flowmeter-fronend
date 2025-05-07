// "use client";
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import Fuse from "fuse.js";
// import {
//   ColumnDef,
//   flexRender,
//   getCoreRowModel,
//   getPaginationRowModel,
//   useReactTable,
//   SortingState,
//   getSortedRowModel,
//   ColumnFiltersState,
//   getFilteredRowModel,
//   VisibilityState,
// } from "@tanstack/react-table";
// import * as React from "react";
// import { Input } from "@/components/ui/input";
// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import AddUser from "@/app/components/Users/AddUser";
// import { useEffect, useState } from "react";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationEllipsis,
//   PaginationItem,
//   PaginationLink,
// } from "@/components/ui/pagination";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { usePagination } from "@/hooks/use-pagination";
// import { motion } from "framer-motion";
// import { containerCampaignForm as container } from "@/constants/framer-motion";
// interface DataTableProps<TData, TValue> {
//   columns: ColumnDef<TData, TValue>[];
//   data: TData[];
// }

// export function DataTable<TData, TValue>({
//   columns,
//   data,
// }: DataTableProps<TData, TValue>) {
//   const [sorting, setSorting] = React.useState<SortingState>([]);
//   const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
//     []
//   );
//   const [rowSelection, setRowSelection] = React.useState({});
//   const [columnVisibility, setColumnVisibility] =
//     React.useState<VisibilityState>({});
//     const [searchTerm, setSearchTerm] = React.useState("");


 
  
//     const applyFuzzyFilter = (
//       data: TData[],
//       searchTerm: string,
//       keys: string[]
//     ) => {
//       const fuse = new Fuse(data, {
//         keys,
//         includeScore: true,
//         threshold: 0.3,
//       });
  
//       return fuse.search(searchTerm).map((result) => result.item);
//     };
  
//     const filteredData = React.useMemo(() => {
//       if (!searchTerm) return data;
//       return applyFuzzyFilter(data, searchTerm, [
//         "username",
//         "email",
//         "info",
//         "groups",
//       ]);
//     }, [data, searchTerm]);
  
//     const table = useReactTable({
//       data: filteredData,
//       columns,
//       getCoreRowModel: getCoreRowModel(),
//       getPaginationRowModel: getPaginationRowModel(),
//       onSortingChange: setSorting,
//       getSortedRowModel: getSortedRowModel(),
//       onColumnFiltersChange: setColumnFilters,
//       getFilteredRowModel: getFilteredRowModel(),
//       onColumnVisibilityChange: setColumnVisibility,
//       onRowSelectionChange: setRowSelection,
//       state: {
//         sorting,
//         columnFilters,
//         rowSelection,
//       },
//     });
//   const [open, setOpen] = useState(false);

//   const handleDialogClose = () => {
//     setOpen(false); // Close the  dialog
//   };
  
//   useEffect(() => {
//     table.setPageSize(5);
//   }, []);
//     // Pagination logic
//     const currentPage = table.getState().pagination.pageIndex + 1; // +1 because pageIndex is zero-based
//     const totalPages = table.getPageCount();
//     const paginationItemsToDisplay = 5;
  
//     const { pages, showLeftEllipsis, showRightEllipsis } = usePagination({
//       currentPage,
//       totalPages,
//       paginationItemsToDisplay,
//     });
  
//   return (
//     <motion.div
//     variants={container}
//     className="flex flex-col"
//     initial="hidden"
//     animate="visible"
//     exit="exit"
//   >
//     <div>
//       {/* Row for Filter, Columns, and AddUser */}
//       <div className="flex items-center justify-between mt-5 mb-5">
//       <Input
//           placeholder="Search Users"
//           value={searchTerm}
//           onChange={(event) => setSearchTerm(event.target.value)}
//           className="max-w-sm"

//         />

//         {/* Group Columns and AddUser Buttons */}
//         <div className="flex items-center space-x-2">
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant={'custom'}>Columns</Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="start">
//               {table
//                 .getAllColumns()
//                 .filter((column) => column.getCanHide())
//                 .map((column) => {
//                   return (
//                     <DropdownMenuCheckboxItem
//                       key={column.id}
//                       className="capitalize"
//                       checked={column.getIsVisible()}
//                       onCheckedChange={(value) =>
//                         column.toggleVisibility(!!value)
//                       }
//                     >
//                       {column.id}
//                     </DropdownMenuCheckboxItem>
//                   );
//                 })}
//             </DropdownMenuContent>
//           </DropdownMenu>
//           <Dialog open={open} onOpenChange={setOpen}>
//             <DialogTrigger asChild>
//               <Button variant={'custom'}>Add New user</Button>
//             </DialogTrigger>
//             <DialogContent>
//               <DialogHeader></DialogHeader>
//               <AddUser onClose={handleDialogClose} />
//             </DialogContent>
//           </Dialog>
//         </div>
//       </div>

//       <div className="rounded-md border p-5">
//         <Table>
//           <TableHeader>
//             {table.getHeaderGroups().map((headerGroup) => (
//               <TableRow key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => {
//                   return (
//                     <TableHead key={header.id}>
//                       {header.isPlaceholder
//                         ? null
//                         : flexRender(
//                             header.column.columnDef.header,
//                             header.getContext()
//                           )}
//                     </TableHead>
//                   );
//                 })}
//               </TableRow>
//             ))}
//           </TableHeader>
//           <TableBody>
//             {table.getRowModel().rows?.length ? (
//               table.getRowModel().rows.map((row) => (
//                 <TableRow
//                   key={row.id}
//                   data-state={row.getIsSelected() && "selected"}
//                 >
//                   {row.getVisibleCells().map((cell) => (
//                     <TableCell key={cell.id}>
//                       {flexRender(
//                         cell.column.columnDef.cell,
//                         cell.getContext()
//                       )}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell
//                   colSpan={columns.length}
//                   className="h-24 text-center"
//                 >
//                   No results.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>

//       <div className="flex items-center justify-between gap-3 mt-2">
//         {/* Page number information */}
//         <p className="flex-1 whitespace-nowrap text-sm text-muted-foreground" aria-live="polite">
//           Page <span className="text-foreground">{currentPage}</span> of{" "}
//           <span className="text-foreground">{totalPages}</span>
//         </p>

//         {/* Pagination */}
//         <div className="grow">
//           <Pagination>
//             <PaginationContent>
//               {/* Previous page button */}
//               <PaginationItem>
//                 <PaginationLink
//                   className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
//                   onClick={() => table.previousPage()}
//                   aria-label="Go to previous page"
//                   aria-disabled={!table.getCanPreviousPage()}
//                 >
//                   <ChevronLeft size={16} strokeWidth={2} aria-hidden="true" />
//                 </PaginationLink>
//               </PaginationItem>

//               {/* Left ellipsis (...) */}
//               {showLeftEllipsis && (
//                 <PaginationItem>
//                   <PaginationEllipsis />
//                 </PaginationItem>
//               )}

//               {/* Page number links */}
//               {pages.map((page) => (
//                 <PaginationItem key={page}>
//                   <PaginationLink
//                     onClick={() => table.setPageIndex(page - 1)} // -1 because pageIndex is zero-based
//                     isActive={page === currentPage}
//                   >
//                     {page}
//                   </PaginationLink>
//                 </PaginationItem>
//               ))}

//               {/* Right ellipsis (...) */}
//               {showRightEllipsis && (
//                 <PaginationItem>
//                   <PaginationEllipsis />
//                 </PaginationItem>
//               )}

//               {/* Next page button */}
//               <PaginationItem>
//                 <PaginationLink
//                   className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
//                   onClick={() => table.nextPage()}
//                   aria-label="Go to next page"
//                   aria-disabled={!table.getCanNextPage()}
//                 >
//                   <ChevronRight size={16} strokeWidth={2} aria-hidden="true" />
//                 </PaginationLink>
//               </PaginationItem>
//             </PaginationContent>
//           </Pagination>
//         </div>

//         {/* Results per page */}
//         <Select
//           value={table.getState().pagination.pageSize.toString()}
//           onValueChange={(value) => {
//             table.setPageSize(Number(value));
//           }}
//         >
//           <SelectTrigger id="results-per-page" className="w-fit whitespace-nowrap">
//             <SelectValue placeholder="Select number of results" />
//           </SelectTrigger>
//           <SelectContent>
//             {[5, 10, 20, 30, 40, 50].map((pageSize) => (
//               <SelectItem key={pageSize} value={pageSize.toString()}>
//                 Show {pageSize}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </div>
//     </div>
//     </motion.div>
//   );
// }
