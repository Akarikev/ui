export const InstallCommand = ({ command = "elorm add button" }) => {
  const managers = [
    { name: "npm", cmd: `npx ${command}` },
    { name: "pnpm", cmd: `pnpm dlx ${command}` },
    { name: "yarn", cmd: `yarn dlx ${command}` },
    { name: "bun", cmd: `bunx ${command}` },
  ]

  return (
    <CodeGroup>
      {managers.map(({ name, cmd }) => (
        <pre key={name} data-language="bash" data-title={name}>
          <code>{cmd}</code>
        </pre>
      ))}
    </CodeGroup>
  )
}
