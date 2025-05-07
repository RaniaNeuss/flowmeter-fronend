// "use client";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
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
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";

// import { Devices, SelectType } from "@/types/connections";
// import { dataPolling, dataType } from "./connectionsApi";
// import { getColumns } from "./columns"; // Import getColumns
// import AddConnections from "@/app/components/Connections/AddConnections";
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
// import Fuse from "fuse.js";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import { arrayMove, horizontalListSortingStrategy, SortableContext } from "@dnd-kit/sortable";
// import { closestCenter, DndContext, DragEndEvent, KeyboardSensor, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
// import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
// import { DragAlongCell, DraggableTableHeader } from "./draggable-components";
// interface DataTableProps<TData> {
//   data: TData[];
//   selectType: SelectType[];
//   selectPolling: any;
//   ProjectId: string;
//   devices: Devices[];
// }

// export function DataTable<TData,>({
//   data,
//   ProjectId,
//   devices,
// }: DataTableProps<TData>) {
//   const [sorting, setSorting] = React.useState<SortingState>([]);
//   const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
//     []
//   );
//   const [rowSelection, setRowSelection] = React.useState({});
//   const [isAddDeviceOpen, setIsAddDeviceOpen] = React.useState(false);
//   const [searchTerm, setSearchTerm] = React.useState("");
//   const [columnOrder, setColumnOrder] = useState<string[]>([
//     "select",
//     "name",
//     "type",
//     "description",
//     "polling",
//     "enable",
//     "actions",
//   ]);
//   const handleCloseAddDialog = () => {
//     setIsAddDeviceOpen(false); // Close the edit dialog
//   };

//   // Call getColumns here (client-side)
//   const columns = React.useMemo(
//     () => getColumns<TData>(ProjectId),
//     [ProjectId]
//   );

//   const applyFuzzyFilter = (
//     data: TData[],
//     searchTerm: string,
//     keys: string[]
//   ) => {
//     const fuse = new Fuse(data, {
//       keys,
//       includeScore: true,
//       threshold: 0.3,
//     });

//     return fuse.search(searchTerm).map((result) => result.item);
//   };

//   const filteredData = React.useMemo(() => {
//     if (!searchTerm) return data;
//     return applyFuzzyFilter(data, searchTerm, [
//       "name",
//       "type",
//       "description",
//       "enabled",
//     ]);
//   }, [data, searchTerm]);

//   const table = useReactTable({
//     data: filteredData,
//     columns,
//     columnResizeMode: "onChange",

//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     onSortingChange: setSorting,
//     getSortedRowModel: getSortedRowModel(),
//     onColumnFiltersChange: setColumnFilters,
//     getFilteredRowModel: getFilteredRowModel(),
//     onRowSelectionChange: setRowSelection,
//     state: {
//       sorting,
//       columnFilters,
//       rowSelection,
//       columnOrder,
//     },
//     onColumnOrderChange: setColumnOrder,
//     enableSortingRemoval: false,
//   });
//   function handleDragEnd(event: DragEndEvent) {
//     const { active, over } = event;
//     if (active && over && active.id !== over.id) {
//       setColumnOrder((columnOrder) => {
//         const oldIndex = columnOrder.indexOf(active.id as string);
//         const newIndex = columnOrder.indexOf(over.id as string);
//         return arrayMove(columnOrder, oldIndex, newIndex); //this is just a splice util
//       });
//     }
//   }

//   const sensors = useSensors(
//     useSensor(MouseSensor, {}),
//     useSensor(TouchSensor, {}),
//     useSensor(KeyboardSensor, {}),
//   );

//   useEffect(() => {
//     table.setPageSize(5);
//   }, []);

//   // Pagination logic
//   const currentPage = table.getState().pagination.pageIndex + 1; // +1 because pageIndex is zero-based
//   const totalPages = table.getPageCount();
//   const paginationItemsToDisplay = 5;

//   const { pages, showLeftEllipsis, showRightEllipsis } = usePagination({
//     currentPage,
//     totalPages,
//     paginationItemsToDisplay,
//   });

//   return (
//     <div>
//       {/* Row for Filter, Columns, and AddUser */}
//       <div className="flex items-center justify-between mt-5 mb-5">
//         <Input
//           placeholder="Search Devices"
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
//             <DropdownMenuContent align="end">
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
//           <Sheet >
//             {/* open={isAddDeviceOpen} onOpenChange={setIsAddDeviceOpen} */}
//             <SheetTrigger asChild>
//               <Button variant={'custom'}>Add New device</Button>
//             </SheetTrigger>
//             <SheetContent>
//               {/* Wrap children in a single parent element */}
//               <div>
//                 <SheetHeader>
//                   <SheetTitle>Device Property</SheetTitle>
//                 </SheetHeader>
//                 <AddConnections
//                   devices={devices}
//                   ProjectId={ProjectId}
//                   selectType={dataType}
//                   selectPolling={dataPolling}
//                   onClose={handleCloseAddDialog}
//                 />
//               </div>
//             </SheetContent>
//           </Sheet>
//         </div>
//       </div>

//       <div className="rounded-md border p-5 ">
//       <DndContext
//         sensors={sensors}
//         collisionDetection={closestCenter}
//         modifiers={[restrictToHorizontalAxis]}
//         onDragEnd={handleDragEnd}
//       >
//         <Table>
//         <TableHeader>
//           {table.getHeaderGroups().map((headerGroup) => (
//             <TableRow key={headerGroup.id} className="bg-muted/50">
//               <SortableContext items={columnOrder} strategy={horizontalListSortingStrategy}>
//                 {headerGroup.headers.map((header) => (
//                   <DraggableTableHeader key={header.id} header={header} />
//                 ))}
//               </SortableContext>
//             </TableRow>
//           ))}
//         </TableHeader>
//         <TableBody>
//           {table.getRowModel().rows?.length ? (
//             table.getRowModel().rows.map((row) => (
//               <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
//                 {row.getVisibleCells().map((cell) => (
//                   <SortableContext
//                     key={cell.id}
//                     items={columnOrder}
//                     strategy={horizontalListSortingStrategy}
//                   >
//                     <DragAlongCell key={cell.id} cell={cell} />
//                   </SortableContext>
//                 ))}
//               </TableRow>
//             ))
//           ) : (
//             <TableRow>
//               <TableCell colSpan={columns.length} className="h-24 text-center">
//                 No results.
//               </TableCell>
//             </TableRow>
//           )}
           
//           </TableBody>
//         </Table>
//         </DndContext>

//       </div>

//       <div className="flex items-center justify-between gap-3 mt-2">
//         {/* Page number information */}
//         <p
//           className="flex-1 whitespace-nowrap text-sm text-muted-foreground"
//           aria-live="polite"
//         >
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
//           <SelectTrigger
//             id="results-per-page"
//             className="w-fit whitespace-nowrap"
//           >
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

//   );
// }
