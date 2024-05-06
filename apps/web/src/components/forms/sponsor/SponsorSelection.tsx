"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  handleNavigation,
  isValidProject,
  projectList,
} from "@repo/shared/src";
import { Merchant } from "@repo/shared/types";
import { SmallOptionCard, Button } from "@repo/ui/*";

const SponsorSelection = () => {
  const [selected, setSelected] = useState<Merchant["projects"]>([]);
  const { push } = useRouter();

  function handleChange(value: string) {
    if (isValidProject(value)) {
      const newProjects = selected.includes(value)
        ? selected.filter((project) => project !== value)
        : [...selected, value];

      setSelected(newProjects);
    }
  }

  function onNext() {
    const params = handleNavigation([
      {
        key: "projects",
        value: selected.join(","),
      },
    ]);

    push(`/register/sponsor-allocation?${params}`);
  }

  return (
    <div>
      <form className="grid grid-cols-5 gap-5">
        {projectList.map((project) => {
          return (
            <SmallOptionCard
              key={project.id}
              label={project.title}
              value={project.id}
              name="projects"
              onClick={handleChange}
              selected={selected.includes(project.id)}
            />
          );
        })}
        <div className="mt-5 col-span-5">
          <Button size="md" type="accent" buttonType="button" onClick={onNext}>
            Confirm
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SponsorSelection;
