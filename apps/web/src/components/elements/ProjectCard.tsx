"use client";
import React from "react";
import { Button, ProjectCard as Card } from "@repo/ui/index";
import { Project } from "@repo/shared/types";
import { useRouter } from "next/navigation";

const ProjectCard = ({ id, project_name, slug }: Project) => {
  const router = useRouter();
  return (
    <Card
      key={id}
      title={project_name}
      description={project_name}
      action={
        <Button onClick={() => router.push(`/projects/${slug}`)} type="warning">
          View contributions
        </Button>
      }
    />
  );
};

export default ProjectCard;
