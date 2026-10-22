// Gives every page inside a segment its own backdrop: steel and structure for Industrial, plaster, wood and tile for Household.
// The colours and textures live in globals.css under [data-segment="..."]; everything inside inherits them.
export default function SegmentShell({ segment, children }: { segment?: string; children: React.ReactNode }) {
  return <div data-segment={segment} className={segment ? "seg-shell min-h-[70vh]" : undefined}>{children}</div>;
}
