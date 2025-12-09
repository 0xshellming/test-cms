Setup
How to install and set up Kibo UI components in your project

Installing Kibo UI is straightforward and can be done in a couple of ways. You can use the dedicated Kibo UI CLI for the fastest setup, or integrate via the standard shadcn/ui CLI if you’ve already adopted shadcn’s workflow.

This guide will walk you through the prerequisites and the installation steps for both methods, complete with example commands. By the end, you’ll have Kibo UI components ready to use in your project.

Prerequisites
Before installing Kibo UI, make sure your environment meets the following requirements:

Node.js, version 18 or later
A React project, version 18 or later
shadcn/ui installed in your project. In practice, this means you have already initialized shadcn in your project (for example by running npx shadcn@latest init and configuring Tailwind CSS). Kibo UI currently supports only the CSS Variables mode of shadcn/ui for theming.
Note: If you haven’t installed shadcn/ui yet, you should do that first. Follow the official shadcn/ui setup instructions to configure Tailwind CSS and the base components. Kibo UI builds on that foundation, so having shadcn in place is required.

Kibo UI currently only supports the CSS Variables version of shadcn/ui

Installing Components
You can install Kibo UI components using either the Kibo UI CLI or the shadcn/ui CLI. Both achieve the same result: adding the selected component’s code and any needed dependencies to your project. For example, to install the Gantt Chart component, you would run:

Kibo UI CLI
shadcn CLI

npx kibo-ui add gantt
The CLI will download the component’s code and integrate it into your project’s directory (usually under your components folder). By default, Kibo UI components are added to the @/components/kibo-ui/ directory (or whatever folder you’ve configured in your shadcn components settings).

For instance, the command above will place the Gantt component files in @/components/kibo-ui/gantt/. The CLI also ensures that any required dependencies (for example, specific headless libraries a component might need) are installed automatically.

After running the command, you should see a confirmation in your terminal that the files were added. You can then proceed to use the component in your code.

⚡ Fast Installation: Both methods above are very fast – typically taking only a few seconds. You don’t need to leave your editor or manually copy-paste any code. After the command finishes, everything is ready to go.