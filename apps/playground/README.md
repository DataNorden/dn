# Playground

The Playground is a dedicated environment for testing and experimenting with various features of the monorepo framework.

## Getting Started

To run the Playground, use the following command:

```bash
yarn play
```

## Configuration

The setup utilizes `initPresets` to configure different environments for the Playground. These presets are defined in the `init-helper` library, allowing you to:

- Implement features specific to certain environments.
- Test features across different configurations.

## Saved Configurations

The Playground may include a `playgrounds` folder containing files for different saved configurations. This folder is `.gitignore`d, as its content is considered developer notes and not part of the codebase.

To run a specific saved configuration, use the following command:

```bash
yarn dk play <playground-name>
```
