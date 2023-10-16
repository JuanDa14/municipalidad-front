"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Trash, Search,CalendarClock } from "lucide-react";
import { toast } from "react-hot-toast";
import { axiosUrl } from "@/lib/axios";
import { cn } from "@/lib/utils";
import es from "date-fns/locale/es";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Icons } from "@/components/icons";
import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Role } from "@/interfaces/role";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Service } from "@/interfaces/service";
import { ServiceReceipt } from "@/interfaces/service-receipt";
import { Client } from "@/interfaces/client";

const createServiceReceiptSchema = z.object({
  dni_ruc: z
    .string({ required_error: "El dni ruc es requerido" })
    .min(8, {
      message: "El nombre debe tener al menos 8 caracteres.",
    })
    .max(11, {
      message: "El dni_ruc debe tener un máximo de 11 carácteres",
    }),
  service: z.string(),
  name: z.string({ required_error: "El dni es necesario" }),
  months: z.string({
    required_error: "La cantidad de meses es obligatorio"}),
  fromDate: z.date({
    required_error: "La fecha de inicio de pago es necesaria.",
  }),
  amount: z.number({
    required_error: "El precio es obligatorio",
    invalid_type_error:"Debe ser un valor numerico"
  }).int().positive(),
  client: z.string(),
});

interface FormRolProps {
  initialData?: ServiceReceipt;
  services:Service[]
}

export const FormReceipt = ({ initialData,services }: FormRolProps) => {

  const ClientByDni = async () => {
    const dni = form.getValues("dni_ruc");
    if (dni==="") {
      toast.error("Primero ingrese el DNI/RUC");
      return null
    }

    const { data } = await axiosUrl.get(
      `http://localhost:4000/api/client/dni/${dni}`
    );
    if (data) {
      form.setValue("client", data._id);
      return form.setValue("name", data.name);
    }
      toast.error("No se encontro el Ciudadano");
    return null;
  };

  const router = useRouter();
  const form = useForm<z.infer<typeof createServiceReceiptSchema>>({
    resolver: zodResolver(createServiceReceiptSchema),
    // defaultValues: initialData
    //   ? {
    //       dni_ruc: initialData.client.name,
    //     }
    //   : { dni_ruc: "", state: "Activo" },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof createServiceReceiptSchema>) => {
    if (initialData) {
      try {
        const valuesUpdated = {
          ...values,
          // state: values.state === "Activo" ? true : false,
        };
        await axiosUrl.patch(`/rol/${initialData._id}`, valuesUpdated);
        toast.success("Rol actualizado correctamente");
        router.refresh();
        router.push("/roles");
      } catch {
        toast.error("Error al actualizar el rol");
      }
    } else {
      const name= values.service.split("-")
      if (name[1]!=="Mensual") {
        values.months = '0'
      }
      values.service = name[0]
      values.amount= Number(values.amount)
      console.log(values);
      
      // try {
      //   await axiosUrl.post("http://localhost:4000/api/service-receipt", values);
      //   toast.success("Recibo registrado correctamente");
      //   router.refresh();
      //   router.push("/receipt");
      // } catch {
      //   toast.error("Error al crear el recibo");
      // }
    }
  };

  return (
    <div className="h-full w-full p-6 space-y-2  mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex items-center justify-between space-y-2">
            <div className="flex justify-between">
              <div className="text-lg font-medium">
                <h3>Formulario</h3>
                <p className="text-sm text-muted-foreground">
                  Complete todos los datos correctamente.
                </p>
              </div>
            </div>
            <div className="flex gap-x-2 items-center">
              <Button
                type="button"
                variant={"outline"}
                onClick={() => router.back()}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Atras
              </Button>
            </div>
          </div>
          <Separator className="bg-primary/10" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-5">
            <div className="flex flex-reverse items-end gap-x-5">
              <FormField
                control={form.control}
                name="dni_ruc"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Dni del ciudadano</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="Ingrese el dni_ruc del cliente"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                disabled={isSubmitting}
                className="flex bg-blue-600 hover:bg-blue-400"
                type="button"
                onClick={ClientByDni}
              >
                <Search />
              </Button>
            </div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre del ciudadano</FormLabel>
                  <FormControl>
                    <Input
                      disabled
                      placeholder="Nombre del ciudadano"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="service"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Servicios</FormLabel>
                  <Select
                    disabled={isSubmitting}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-background">
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Seleccione un servicio"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {services.map((row, index) => (
                        <SelectItem
                          value={`${row._id}-${row.type.description}`}
                          key={index}
                        >
                          {row.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="months"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Meses del pago</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={isSubmitting}
                      placeholder="Ingrese el numero de meses que se va a cancelar"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="amount"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Precio(S/.) unitario por servicio</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={isSubmitting}
                      placeholder="Ingrese el numero de meses que se va a cancelar"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fromDate"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Fecha del mes a pagar</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP", { locale: es })
                          ) : (
                            <span>Elige la fecha</span>
                          )}
                          <CalendarClock className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
          </div>

          <Button
            className="flex ml-auto"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Guardar
          </Button>
        </form>
      </Form>
    </div>
  );
};
