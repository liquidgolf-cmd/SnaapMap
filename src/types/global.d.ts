/**
 * Global type declarations for external libraries and browser APIs
 */

declare global {
  interface Window {
    /**
     * html2canvas library loaded from CDN
     * Used for exporting mind map as PNG
     */
    html2canvas?: (
      element: HTMLElement,
      options?: {
        backgroundColor?: string
        useCORS?: boolean
      }
    ) => Promise<HTMLCanvasElement>
  }
}

export {}
