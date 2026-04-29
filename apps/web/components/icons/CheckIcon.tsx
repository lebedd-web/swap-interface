import React from "react"

type TCheckIconProps = React.SVGProps<SVGSVGElement>

export const CheckIcon = ({
  className,
  ...props
}: TCheckIconProps): React.JSX.Element => (
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
      d="M18.1005 7.46876C18.3935 7.17632 18.8684 7.17703 19.1611 7.46973C19.4537 7.76288 19.4542 8.23862 19.1611 8.53126L10.3154 17.3613C10.0224 17.6537 9.54752 17.653 9.25482 17.3604L4.83978 12.9453C4.54689 12.6524 4.5469 12.1777 4.83978 11.8848C5.13268 11.5919 5.60744 11.5919 5.90033 11.8848L9.78412 15.7686L18.1005 7.46876Z"
      fill="currentColor"
    />
  </svg>
)
