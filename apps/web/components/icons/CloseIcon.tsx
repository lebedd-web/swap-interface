import React from "react"

type CloseIconProps = React.SVGProps<SVGSVGElement>

export const CloseIcon = ({ className, ...props }: CloseIconProps): React.JSX.Element => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path
      d="M17.6724 5.22781C17.9761 4.92406 18.4685 4.92406 18.7722 5.22781C19.0759 5.53156 19.0759 6.02392 18.7722 6.32765L13.0999 12L18.7722 17.6724C19.0759 17.9761 19.0759 18.4685 18.7722 18.7722C18.4685 19.0759 17.9761 19.0759 17.6724 18.7722L12 13.0999L6.32765 18.7722C6.02392 19.0759 5.53156 19.0759 5.22781 18.7722C4.92406 18.4685 4.92406 17.9761 5.22781 17.6724L10.9002 12L5.22781 6.32765C4.92406 6.0239 4.92406 5.53155 5.22781 5.22781C5.53155 4.92406 6.0239 4.92406 6.32765 5.22781L12 10.9002L17.6724 5.22781Z"
      fill="currentColor"
    />
  </svg>
)
