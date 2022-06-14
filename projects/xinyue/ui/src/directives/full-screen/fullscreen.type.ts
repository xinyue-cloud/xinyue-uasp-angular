export interface KtDocument extends HTMLDocument {
  mozFullScreenElement?: Element;
  mozCancelFullScreen?: () => void;
  msFullscreenElement?: Element;
  msExitFullscreen?: () => void;
  webkitFullscreenElement?: Element;
  webkitExitFullscreen?: () => void;
}

export interface KtDocumentElement extends HTMLElement {
  mozRequestFullScreen?: () => void;
  msRequestFullscreen?: () => void;
  webkitRequestFullscreen?: () => void;
}
