import { SVGProps } from 'react'

export function LoadingAnimationIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <circle cx="12" cy="2" r="0" fill="currentColor">
        <animate
          attributeName="r"
          values="0;2;0;0"
          dur="1s"
          repeatCount="indefinite"
          begin="0"
          keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
          calcMode="spline"
        ></animate>
      </circle>
      <circle
        transform="rotate(45 12 12)"
        cx="12"
        cy="2"
        r="0"
        fill="currentColor"
      >
        <animate
          attributeName="r"
          values="0;2;0;0"
          dur="1s"
          repeatCount="indefinite"
          begin="0.125s"
          keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
          calcMode="spline"
        ></animate>
      </circle>
      <circle
        transform="rotate(90 12 12)"
        cx="12"
        cy="2"
        r="0"
        fill="currentColor"
      >
        <animate
          attributeName="r"
          values="0;2;0;0"
          dur="1s"
          repeatCount="indefinite"
          begin="0.25s"
          keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
          calcMode="spline"
        ></animate>
      </circle>
      <circle
        transform="rotate(135 12 12)"
        cx="12"
        cy="2"
        r="0"
        fill="currentColor"
      >
        <animate
          attributeName="r"
          values="0;2;0;0"
          dur="1s"
          repeatCount="indefinite"
          begin="0.375s"
          keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
          calcMode="spline"
        ></animate>
      </circle>
      <circle
        transform="rotate(180 12 12)"
        cx="12"
        cy="2"
        r="0"
        fill="currentColor"
      >
        <animate
          attributeName="r"
          values="0;2;0;0"
          dur="1s"
          repeatCount="indefinite"
          begin="0.5s"
          keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
          calcMode="spline"
        ></animate>
      </circle>
      <circle
        transform="rotate(225 12 12)"
        cx="12"
        cy="2"
        r="0"
        fill="currentColor"
      >
        <animate
          attributeName="r"
          values="0;2;0;0"
          dur="1s"
          repeatCount="indefinite"
          begin="0.625s"
          keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
          calcMode="spline"
        ></animate>
      </circle>
      <circle
        transform="rotate(270 12 12)"
        cx="12"
        cy="2"
        r="0"
        fill="currentColor"
      >
        <animate
          attributeName="r"
          values="0;2;0;0"
          dur="1s"
          repeatCount="indefinite"
          begin="0.75s"
          keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
          calcMode="spline"
        ></animate>
      </circle>
      <circle
        transform="rotate(315 12 12)"
        cx="12"
        cy="2"
        r="0"
        fill="currentColor"
      >
        <animate
          attributeName="r"
          values="0;2;0;0"
          dur="1s"
          repeatCount="indefinite"
          begin="0.875s"
          keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
          calcMode="spline"
        ></animate>
      </circle>
    </svg>
  )
}
export function SearchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 32 32" {...props}>
      <path
        d="M19 3C13.488 3 9 7.488 9 13c0 2.395.84 4.59 2.25 6.313L3.281 27.28L4.72 28.72l7.968-7.969A9.922 9.922 0 0 0 19 23c5.512 0 10-4.488 10-10S24.512 3 19 3zm0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8s-8-3.57-8-8s3.57-8 8-8z"
        fill="currentColor"
      ></path>
    </svg>
  )
}
