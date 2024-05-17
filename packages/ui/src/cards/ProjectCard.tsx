import React, { ReactNode } from "react";

export const ProjectCard = ({
  action,
  title,
  description,
}: {
  title: string;
  description?: string;
  children?: ReactNode;
  action?: ReactNode;
}) => {
  return (
    <div className="ui-card ui-w-96 ui-bg-base-100 ui-shadow-xl ui-image-full">
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
          alt="Shoes"
        />
      </figure>
      <div className="ui-card-body">
        <h2 className="ui-card-title">{title}</h2>
        <p>{description}</p>
        {action}
      </div>
    </div>
  );
};
