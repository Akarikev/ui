export const ComponentPreview = ({
  component = "button",
  theme = "neutral",
  accent = "default",
  mode = "dark",
}) => {
  const src = `https://ui.elorm.xyz/preview/${component}?theme=${theme}&accent=${accent}&mode=${mode}`

  return (
    <Frame>
      <iframe
        src={src}
        title={`${component} preview`}
        style={{
          width: "100%",
          height: "280px",
          border: "none",
          borderRadius: "8px",
          background: "transparent",
        }}
      />
    </Frame>
  )
}

export const ExampleTabs = ({ title, code, component, preview }) => {
  const previewComponent = preview ?? component

  return (
    <Tabs>
      <Tab title="Preview">
        <ComponentPreview component={previewComponent} />
      </Tab>
      <Tab title="Code">
        ```tsx
        {code}
        ```
      </Tab>
    </Tabs>
  )
}
