/// <reference types="vite/client" />
declare const BUILD_TIME: string;

interface NxStatic {
  $rcn: {
    event: import('@jswork/event-mitt').EventMittNamespace.EventMitt;
  }
}
