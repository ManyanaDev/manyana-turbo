import configPromise from "@payload-config";
import { getPayload } from "payload";
import { projectList } from "@repo/shared/src";

export const GET = async () => {
  try {
    const payload = await getPayload({
      config: configPromise,
    });

    // drop all collections

    await payload.delete({
      collection: "users",
      where: {},
    });
    await payload.delete({
      collection: "merchants",
      where: {},
    });
    await payload.delete({
      collection: "projects",
      where: {},
    });

    // NEW USER
    const user1 = await payload.create({
      collection: "users",
      data: {
        first_name: "Jack",
        last_name: "Sparrow",
        email: "jack@manyana1.io",
        password: "Password1!",
        role: "super_admin",
      },
    });

    const user2 = await payload.create({
      collection: "users",
      data: {
        first_name: "Jack",
        last_name: "Sparrow",
        email: "jack@manyana2.io",
        password: "Password1!",
        role: "super_admin",
      },
    });

    // NEW PROJECTS
    const _projects = await Promise.all(
      projectList.map(async (project) => {
        return await payload.create({
          collection: "projects",
          data: {
            project_name: project.title,
            project_key: project.id,
            slug: project.slug,
          },
        });
      })
    );

    const new_users = await Promise.all(
      Array.from({ length: 5 }, async (_, i) => {
        return await payload.create({
          collection: "users",
          data: {
            first_name: "Regular",
            last_name: "User",
            email: `jack@manyana-${i}.io`,
            password: "Password1!",
            role: "user",
          },
        });
      })
    );

    // CREATE MERCHANT FOR EACH USER

    await Promise.all(
      new_users.map(async (user) => {
        return await payload.create({
          collection: "merchants",
          data: {
            business_name: "Test Merchant",
            primary_user: user.id,
            projects: _projects
              .slice(1, Math.floor(Math.random() * 10))
              .map((p) => p.id),
          },
        });
      })
    );

    // NEW MERCHANT
    await payload.create({
      collection: "merchants",
      data: {
        business_name: "Test Merchant (with projects)",
        primary_user: user1.id,
        projects: _projects
          .slice(1, Math.floor(Math.random() * 10))
          .map((p) => p.id),
      },
    });

    await payload.create({
      collection: "merchants",
      data: {
        business_name: "Test Merchant (without projects)",
        primary_user: user2.id,
      },
    });

    const users = await payload.find({
      collection: "users",
    });
    const merchants = await payload.find({
      collection: "merchants",
    });
    const projects = await payload.find({
      collection: "projects",
    });

    return Response.json({ users, merchants, projects });
  } catch (error) {
    console.log("error :>> ", error);
    return Response.json({ error });
  }
};
