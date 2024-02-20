// Defining a functional component named AdminLayout
export default function AdminLayout({
  children,     // The children prop represents the content to be displayed within the layout
}: {
  children: React.ReactNode;    // Type definition for the children prop, specifying it should be of type React.ReactNode
}) {
  return children;       // Render the children, allowing the component to act as a layout wrapper
}

