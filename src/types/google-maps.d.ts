
declare interface Window {
  google: {
    maps: {
      Map: new (
        mapDiv: HTMLElement,
        opts?: {
          center?: { lat: number; lng: number };
          zoom?: number;
          mapTypeControl?: boolean;
          fullscreenControl?: boolean;
          streetViewControl?: boolean;
        }
      ) => any;
      Marker: new (opts?: {
        position?: { lat: number; lng: number };
        map?: any;
        icon?: any;
        title?: string;
      }) => any;
      SymbolPath: {
        CIRCLE: number;
        FORWARD_CLOSED_ARROW: number;
      };
    };
  };
}
