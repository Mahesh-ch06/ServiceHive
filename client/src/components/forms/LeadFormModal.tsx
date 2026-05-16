import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Modal from "../common/Modal";
import Input from "../common/Input";
import Select from "../common/Select";
import Button from "../common/Button";
import { leadSchema } from "../../validations/leadSchema";
import type { LeadFormValues } from "../../validations/leadSchema";
import type { Lead } from "../../types/lead";

interface LeadFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: LeadFormValues) => void;
  lead?: Lead | null;
  isLoading?: boolean;
}

const LeadFormModal = ({ isOpen, onClose, onSubmit, lead, isLoading }: LeadFormModalProps) => {
  const { register, handleSubmit, reset, formState } = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: "",
      email: "",
      status: "New",
      source: "Website"
    }
  });

  useEffect(() => {
    if (lead) {
      reset({
        name: lead.name,
        email: lead.email,
        status: lead.status,
        source: lead.source
      });
    } else {
      reset({
        name: "",
        email: "",
        status: "New",
        source: "Website"
      });
    }
  }, [lead, reset]);

  return (
    <Modal isOpen={isOpen} title={lead ? "Update lead" : "Add new lead"} onClose={onClose}>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Lead name"
          placeholder="Rahul Kumar"
          error={formState.errors.name?.message}
          {...register("name")}
        />
        <Input
          label="Email"
          placeholder="rahul@company.com"
          error={formState.errors.email?.message}
          {...register("email")}
        />
        <div className="grid gap-4 md:grid-cols-2">
          <Select label="Status" {...register("status")}>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Lost">Lost</option>
          </Select>
          <Select label="Source" {...register("source")}>
            <option value="Website">Website</option>
            <option value="Instagram">Instagram</option>
            <option value="Referral">Referral</option>
          </Select>
        </div>
        <div className="flex justify-end gap-3">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : lead ? "Update lead" : "Create lead"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default LeadFormModal;
