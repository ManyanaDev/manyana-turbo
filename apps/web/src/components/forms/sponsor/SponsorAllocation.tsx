"use client";

import { Merchant, Project } from "@repo/shared/types";
import { Button, InputGroup } from "@repo/ui/*";
import classNames from "classnames";
import React from "react";
import { useForm } from "react-hook-form";
import { updateMerchant } from "../../../actions/merchant/update.action";
import { toast } from "react-toastify";

export interface SponsorAllocationProps {
  projects: Project[];
}

export type Allocation = Record<Project["project_key"], number>;

export const SponsorAllocation = ({ projects }: SponsorAllocationProps) => {
  const avg = Math.floor(100 / projects.length);
  const defaultValues = projects.reduce((acc, curr) => {
    acc[curr.project_key] = avg || 0;
    return acc;
  }, {} as Allocation);

  const form = useForm<Allocation>({ defaultValues });

  const total = Object.values(form.watch()).reduce(
    (acc, curr) => Number(acc) + Number(curr),
    0
  );

  async function onNext() {
    if (total > 100) {
      return;
    }

    const values = form.getValues();

    const project_allocations: Merchant["project_allocations"] = projects.map(
      (p) => {
        return {
          project: p.id,
          allocation: Number(values[p.project_key]),
        };
      }
    );
    // const project_allocations = Object.entries(form.getValues()).map((obj) => ({
    //   project: obj[0],
    //   allocation: obj[1],
    // }));

    console.log("project_allocations :>> ", project_allocations);

    try {
      const updated = await updateMerchant({
        project_allocations,
      });

      console.log("updated :>> ", updated);

      if (updated.error) {
        toast.error(updated.error.message);
        return;
      }

      // push(`/register/checkout`);
    } catch (error) {
      console.log("error :>> ", error);
      toast.error("Error updating merchant");
    }
  }

  return (
    <div>
      <div className="flex flex-col gap-20">
        <div className="w-full grid grid-cols-2 gap-10">
          {projects?.map((project) => {
            return (
              <div>
                <InputGroup
                  label={project.project_name}
                  inputType="range"
                  register={form.register(project.project_key)}
                  min="0"
                  max="100"
                  step={1}
                  displayValue={form.watch(project.project_key) + "%"}
                />
              </div>
            );
          })}
        </div>
        <div className="w-full">
          <h2 className="font-bold text-2xl">Total</h2>
          <h2
            className={classNames("font-bold text-5xl", {
              "text-error": total > 100,
            })}
          >
            {total}
          </h2>
          {total > 100 && (
            <p className="text-error">Total allocation exceeds 100%</p>
          )}
        </div>
      </div>
      <div className="w-full mt-10">
        <Button
          size="md"
          type="accent"
          buttonType="button"
          onClick={onNext}
          disabled={total > 100}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
};
