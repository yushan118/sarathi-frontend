// Defining a functional component named AmbulanceLayout
// It takes an object as a parameter with a property 'children' of type 'React.ReactNode'

export default function AmbulanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  // The component simply returns its children
  // This kind of layout component is often used to wrap other components and provide a common layout structure
  
  return children;
}
