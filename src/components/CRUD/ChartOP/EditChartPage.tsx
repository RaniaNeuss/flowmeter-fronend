"use client";
import React, { useEffect, useId, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Braces,
  CaseUpper,
  ChartBarStacked,
  ChartPie,
  ChevronDownIcon,
  Clock,
  Hash,
  LineChartIcon,
  Radius,
} from "lucide-react";

import { ChartSchema } from "@/schemas";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Chart,
  Dataset,
  TripsLogEntry,
  TripsLogResponse,
  VisualizationTypes,
} from "@/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import CustomizeChart from "@/components/Chart/CustomizeChart";
import DataForm from "@/components/ChartOptions/DataForm";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SampleTable from "@/components/Data-Tables/SampleTable";

export default function EditChartPage({
  ProjectId,
  projectName,
  chartId,
  VisualizationTypeData,
}: {
  ProjectId: number;
  projectName: string;
  chartId: number;
  VisualizationTypeData: VisualizationTypes[];
}) {
  console.log("chartId :", chartId);
  const id = useId();
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<number>(0);
  const [chartData, setChartData] = useState<Chart | null>(null);
  const [databases, setDataset] = useState<Dataset[]>([]);
  const [openDataset, setOpenDataset] = useState<boolean>(false);
  const [selectedDataset, setSelectedDataset] = useState<number | null>(null);
  const [fieldsAndTypes, setFieldsAndTypes] = useState<Record<
    string,
    string
  > | null>(null);
  const [sampleData, setSampleData] = useState<TripsLogEntry[] | null>(null);

  // Initialize form with default values
  const form = useForm<z.infer<typeof ChartSchema>>({
    resolver: zodResolver(ChartSchema),
    defaultValues: {
      name: "",
      description: "",
      datasetId: 0,
      visualizationTypeId: 0,
      queryContext: "",
      useExistingQuery: true,
      dimensions: [],
      filters: [],
      metrics: [],
      sortBy: [],
      rowLimit: -1,
      customizationOptions: {
        options: {},
      },
    },
  });
  const selectedType = form.watch("visualizationTypeId");
  // Define the onSubmit function
  const onSubmit = async (values: z.infer<typeof ChartSchema>) => {
    console.log("Update chart :", values);
    try {
      const payload = {
        ...values,
        id: chartId,
      };
      const response = await fetch(
        `https://localhost:7219/api/Charts/${chartId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update chart: ${response.statusText}`);
      }

      const updatedChart = await response.json();
      setChartData(updatedChart);
      toast.success("Chart updated successfully");
    } catch (error) {
      console.error("Error updating chart:", error);
      toast.error("Failed to update chart");
    }
  };
  // Fetch chart data and datasets on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch chart data
        const chartResponse = await fetch(
          `https://localhost:7219/api/Charts/${chartId}`
        );

        if (!chartResponse.ok) {
          throw new Error(`Failed to fetch chart: ${chartResponse.statusText}`);
        }

        const chartData: Chart = await chartResponse.json();
        setChartData(chartData);
        const connectionId = chartData.dataset.dbConnectionId;
        const schemaName = chartData.dataset.schemaName;
        const tableName = chartData.dataset.tableName;

        if (connectionId && schemaName && tableName) {
          console.log(
            "connectionId :",
            connectionId,
            "schemaName :",
            schemaName,
            "tableName :",
            tableName
          );
          fetch(
            `https://localhost:7219/api/DS/table-data?connectionId=${connectionId}&schemaName=${schemaName}&tableName=${tableName}&limit=100&offset=0`
          )
            .then((res) => res.json())
            .then((data: TripsLogResponse) => {
              setSampleData(data.data);
              console.log(data);
            })
            .catch(() => {
              setSampleData([]);
            });
        }
        form.reset({
          id: chartData.id,
          name: chartData.name,
          description: chartData.description || "",
          datasetId: chartData.dataset.id,
          dataset: chartData.dataset,
          visualizationTypeId: chartData.visualizationTypeId,
          metrics: chartData.metrics || [],
          filters: chartData.filters || [],
          sortBy: chartData.sortBy || [],
          rowLimit: chartData.rowLimit || -1,
          customizationOptions: chartData.customizationOptions || {
            options: {},
          },
          displayFields: chartData.displayFields || {},
          dimensions: chartData.dimensions?.map((d: any) => d.columnName) || [],
        });

        // Set the selected dataset and visualization type
        setSelectedDataset(chartData.dataset.id);
        setValue(chartData.visualizationTypeId);

        // Fetch datasets
        const datasetsResponse = await fetch("https://localhost:7219/api/DS");
        if (!datasetsResponse.ok) {
          throw new Error(
            `Failed to fetch datasets: ${datasetsResponse.statusText}`
          );
        }
        const datasets: Dataset[] = await datasetsResponse.json();
        setDataset(datasets);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load data");
      }
    };

    fetchData();
  }, [chartId, form]);

  useEffect(() => {
    const fetchFieldsAndTypes = async () => {
      if (selectedDataset) {
        try {
          const response = await fetch(
            `https://localhost:7219/api/DS/${selectedDataset}`
          );

          if (!response.ok) {
            throw new Error(
              `Failed to fetch dataset fields: ${response.statusText}`
            );
          }

          const data: Dataset = await response.json();
          setFieldsAndTypes(data.fieldsAndTypes);
        } catch (error) {
          console.error("Error fetching columns:", error);
          toast.error("Failed to load dataset fields");
        }
      }
    };

    fetchFieldsAndTypes();
  }, [selectedDataset]);

  const getIconForType = (type: string) => {
    if (
      type.includes("integer") ||
      type.includes("real") ||
      type.includes("id")
    ) {
      return <Hash size={16} className="text-muted-foreground" />;
    } else if (type.includes("character varying") || type.includes("string")) {
      return <CaseUpper size={16} className="text-muted-foreground" />;
    } else if (type.includes("timestamp")) {
      return <Clock size={16} className="text-muted-foreground" />;
    } else if (type.includes("json")) {
      return <Braces size={16} className="text-muted-foreground" />;
    }
    return null;
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex gap-4 my-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="group relative ">
                      <FormLabel
                        htmlFor={id}
                        className="origin-start absolute top-1/2 block -translate-y-1/2 cursor-text px-1 text-sm text-muted-foreground/70 transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium group-focus-within:text-foreground has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium has-[+input:not(:placeholder-shown)]:text-foreground"
                      >
                        <span className="inline-flex bg-background px-2">
                          Enter Chart Name
                        </span>
                      </FormLabel>
                      <Input
                        className="border-none"
                        id={id}
                        type="text"
                        placeholder=""
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Separator className="my-4 bg-custom-green2" />

          <ResizablePanelGroup
            direction="horizontal"
            className="h-[calc(100vh-150px)] w-full"
          >
            <ResizablePanel defaultSize={25} minSize={20} className="min-w-0">
              <ScrollArea className="h-full w-full">
                <div className="p-6">
                  <span className="font-semibold">
                    <FormField
                      control={form.control}
                      name="datasetId"
                      render={({ field }) => (
                        <FormItem className="group relative mb-5">
                          <div className="*:not-first:mt-2">
                            <Label htmlFor={id}>Dataset</Label>
                            <Popover
                              open={openDataset}
                              onOpenChange={setOpenDataset}
                            >
                              <PopoverTrigger asChild>
                                <Button
                                  id={id}
                                  variant="outline"
                                  role="combobox"
                                  aria-expanded={open}
                                  className="bg-background hover:bg-background border-input w-full justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]"
                                >
                                  {field.value ? (
                                    <span className="flex min-w-0 items-center gap-2">
                                      <span className="truncate">
                                        {
                                          databases.find(
                                            (item) => item.id === field.value
                                          )?.name
                                        }
                                      </span>
                                    </span>
                                  ) : (
                                    <span className="text-muted-foreground">
                                      Select dataset
                                    </span>
                                  )}
                                  <ChevronDownIcon
                                    size={16}
                                    className="text-muted-foreground/80 shrink-0"
                                    aria-hidden="true"
                                  />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent
                                className="border-input w-full min-w-[var(--radix-popper-anchor-width)] p-0"
                                align="start"
                              >
                                <Command>
                                  <CommandInput placeholder="Search databases..." />
                                  <CommandList>
                                    <CommandEmpty>
                                      No dataset found.
                                    </CommandEmpty>
                                    <CommandGroup>
                                      {databases.map((item) => (
                                        <CommandItem
                                          key={item.id}
                                          value={item.id.toString()}
                                          onSelect={(currentValue: string) => {
                                            const selectedId =
                                              Number(currentValue);
                                            setSelectedDataset(selectedId);
                                            field.onChange(selectedId);
                                            setOpenDataset(false);
                                          }}
                                          className="flex items-center justify-between"
                                        >
                                          <div className="flex items-center gap-2">
                                            {item.name}
                                          </div>
                                          <span className="text-muted-foreground text-xs">
                                            {item.id.toLocaleString()}
                                          </span>
                                        </CommandItem>
                                      ))}
                                    </CommandGroup>
                                  </CommandList>
                                </Command>
                              </PopoverContent>
                            </Popover>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Accordion
                      type="single"
                      collapsible
                      className="w-full px-3"
                      defaultValue="item-2"
                    >
                      <AccordionItem value="item-2">
                        <AccordionTrigger>Columns</AccordionTrigger>
                        <AccordionContent>
                          {fieldsAndTypes ? (
                            <div className="space-y-2">
                              {Object.entries(fieldsAndTypes).map(
                                ([field, type]) => (
                                  <div
                                    key={field}
                                    className="flex items-center justify-between"
                                  >
                                    <div className="flex items-center gap-2">
                                      <Tooltip>
                                        <TooltipTrigger>
                                          {getIconForType(type)}
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          <p>Type: {type}</p>
                                        </TooltipContent>
                                      </Tooltip>
                                      <span>{field}</span>
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          ) : (
                            <span className="text-muted-foreground">
                              No columns selected.
                            </span>
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </span>
                </div>
              </ScrollArea>
            </ResizablePanel>

            <ResizableHandle withHandle />

            <ResizablePanel defaultSize={25} minSize={20} className="min-w-0">
              <ScrollArea className="h-full w-full">
                <div className="p-6">
                  <span className="font-semibold">
                    <Tabs defaultValue="data" className="w-full">
                      <TabsList className="flex w-full">
                        <TabsTrigger
                          value="data"
                          className="flex-1 text-center"
                        >
                          Data
                        </TabsTrigger>
                        <TabsTrigger
                          value="customize"
                          className="flex-1 text-center"
                        >
                          Customize
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="data" className="py-3">
                        <DataForm
                          chartData={chartData}
                          form={form}
                          selectedDataset={selectedDataset}
                          VisualizationTypeData={VisualizationTypeData}
                        />
                      </TabsContent>
                      <TabsContent value="customize">
                        <CustomizeChart
                          chartData={chartData}
                          VisualizationTypeData={VisualizationTypeData}
                          form={form}
                        />
                      </TabsContent>
                    </Tabs>
                  </span>
                </div>
                <div className="p-6">
                  <Button type="submit" variant={"custom"} className="w-full">
                    Update Chart
                  </Button>
                </div>
              </ScrollArea>
            </ResizablePanel>
            <ResizableHandle withHandle />

            <ResizablePanel defaultSize={50} minSize={30} className="min-w-0">
              <div className="h-full w-full">
                <ResizablePanelGroup
                  direction="vertical"
                  className="h-full w-full rounded-lg border"
                >
                  <ResizablePanel defaultSize={70} minSize={40}>
                    <div className="flex flex-col h-full p-6">
                      <span className="font-semibold">Display chart</span>
                      <div className="flex-1 mt-4 p-4  flex items-center justify-center">
                        <div className="flex-1 mt-4 p-4  flex items-center justify-center">
                          {chartData?.data?.[0] && (
                            <div className="text-center space-y-2">
                              <div
                                className={`font-bold ${
                                  chartData.customizationOptions?.options
                                    ?.BigNumberFontSize || "text-8xl"
                                }`}
                              >
                                {chartData.customizationOptions?.options
                                  ?.CurrencyFormat === "Prefix"
                                  ? chartData.customizationOptions?.options
                                      ?.Currency || ""
                                  : ""}
                                {Object.values(chartData.data[0])[0]}
                                {chartData.customizationOptions?.options
                                  ?.CurrencyFormat === "Suffix"
                                  ? chartData.customizationOptions?.options
                                      ?.Currency || ""
                                  : ""}
                              </div>
                              {chartData.customizationOptions?.options
                                ?.Subtitle && (
                                <div className="text-muted-foreground text-sm">
                                  {
                                    chartData.customizationOptions.options
                                      .Subtitle
                                  }
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </ResizablePanel>

                  <ResizableHandle withHandle />

                  <ResizablePanel
                    defaultSize={30}
                    minSize={20}
                    className="min-w-0"
                  >
                    <Tabs defaultValue="tab-1" className="h-full">
                      <TabsList className="h-auto rounded-none border-b bg-transparent p-0">
                        <TabsTrigger
                          value="tab-1"
                          className="data-[state=active]:after:bg-primary relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                        >
                          Result
                        </TabsTrigger>
                        <TabsTrigger
                          value="tab-2"
                          className="data-[state=active]:after:bg-primary relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                        >
                          Sample
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent
                        value="tab-1"
                        className="h-[calc(100%-40px)] p-4 overflow-auto"
                      >
                        {chartData?.data &&
                        Array.isArray(chartData.data) &&
                        chartData.data.length > 0 ? (
                          <div className="overflow-x-auto">
                            <Table className="text-sm border-collapse w-full">
                              <TableHeader>
                                <TableRow>
                                  {Object.keys(chartData.data[0]).map((key) => (
                                    <TableHead
                                      key={key}
                                      className="w-1/2  p-2 border-b font-medium text-foreground"
                                    >
                                      {key}
                                    </TableHead>
                                  ))}
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {chartData.data.map((row, i) => (
                                  <TableRow key={i}>
                                    {Object.values(row).map((val, j) => (
                                      <TableCell
                                        key={j}
                                        className="whitespace-nowrap w-1/2 p-2 border-b text-muted-foreground"
                                      >
                                        {val === null
                                          ? "-"
                                          : typeof val === "number"
                                          ? val.toLocaleString()
                                          : String(val)}
                                      </TableCell>
                                    ))}
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <p className="text-muted-foreground text-center text-xs">
                              No valid data available
                            </p>
                          </div>
                        )}
                      </TabsContent>
                      <TabsContent
                        value="tab-2"
                        className="h-[calc(100%-40px)] truncate max-w-[800px]"
                      >
                        <SampleTable sampleData={sampleData ?? []} />{" "}
                      </TabsContent>
                    </Tabs>
                  </ResizablePanel>
                </ResizablePanelGroup>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </form>
      </Form>
    </>
  );
}
