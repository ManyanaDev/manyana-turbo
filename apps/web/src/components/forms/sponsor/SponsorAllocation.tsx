"use client";

import { handleNavigation } from "@repo/shared/src";
import { ProjectList } from "@repo/shared/types";
import { Button, InputGroup } from "@repo/ui/*";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

export interface SponsorAllocationProps {
  projects: ProjectList[];
}

export type Allocation = Record<ProjectList["id"], number>;

export const SponsorAllocation = ({ projects }: SponsorAllocationProps) => {
  const { push } = useRouter();

  const avg = Math.floor(100 / projects.length);
  const defaultValues = projects.reduce((acc, curr) => {
    acc[curr.id] = avg || 0;
    return acc;
  }, {} as Allocation);

  const form = useForm<Allocation>({ defaultValues });

  const total = Object.values(form.watch()).reduce(
    (acc, curr) => Number(acc) + Number(curr),
    0
  );

  function onNext() {
    if (total > 100) {
      return;
    }

    const params = handleNavigation([
      {
        key: "sponsorAllocation",
        value: JSON.stringify(form.getValues()),
      },
    ]);

    push(`/billing/checkout?${params}`);
  }

  return (
    <div>
      <div className="flex gap-x-20">
        <div className="w-2/3 grid grid-cols-2 gap-10">
          {projects?.map((project) => {
            return (
              <div>
                <InputGroup
                  label={project.title}
                  inputType="range"
                  register={form.register(project.id)}
                  min="0"
                  max="100"
                  step={1}
                  displayValue={form.watch(project.id) + "%"}
                />
              </div>
            );
          })}
        </div>
        <div className="w-1/3">
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
