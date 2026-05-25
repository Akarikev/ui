function previewOrigin() {
  if (typeof window !== "undefined") {
    return window.location.origin
  }
  return "https://ui.elorm.xyz"
}

export const ComponentPreview = ({
  component = "button",
  theme = "neutral",
  accent = "default",
  mode = "dark",
}) => {
  const src = `${previewOrigin()}/preview/${component}?theme=${theme}&accent=${accent}&mode=${mode}`

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
