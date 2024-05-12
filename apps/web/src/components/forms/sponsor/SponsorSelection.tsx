"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { isValidProject } from "@repo/shared/src";
import { Project } from "@repo/shared/types";
import { SmallOptionCard, Button } from "@repo/ui/*";
import { toast } from "react-toastify";
import { updateMerchant } from "../../../actions/merchant/update.action";

const SponsorSelection = ({ projects }: { projects: Project[] }) => {
  const [selected, setSelected] = useState<Project["project_key"][]>([]);
  const { push } = useRouter();

  function handleChange(value: string) {
    if (isValidProject(value)) {
      const newProjects = selected.includes(value)
        ? selected.filter((project) => project !== value)
        : [...selected, value];

      setSelected(newProjects);
    }
  }

  async function onNext() {
    const _projects = projects.filter((p) => {
      return selected.includes(p.project_key);
    });

    try {
      const updated = await updateMerchant({
        projects: _projects.map((p) => p.id),
      });

      if (updated.error || updated.status !== 200) {
        toast.error("Error updating merchant");
        return;
      }

      push(`/register/sponsor-allocation`);
    } catch (error) {
      console.log("error :>> ", error);
      toast.error("Error updating merchant");
    }
  }

  return (
    <div>
      <form className="grid grid-cols-4 gap-5">
        {projects?.map((project) => {
          return (
            <SmallOptionCard
              key={project.id}
              label={project.project_name}
              value={project.project_key}
              name="projects"
              onClick={handleChange}
              selected={selected.includes(project.project_key)}
            />
          );
        })}
        <div className="mt-5 col-span-4">
          <Button size="md" type="accent" buttonType="button" onClick={onNext}>
            Confirm
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SponsorSelection;
