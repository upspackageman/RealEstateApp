export interface Location {
    lat: number;
    lng: number;
    viewport?: Object;
    zoom: number;
    isOpen?:boolean;
    address_level_1?:string;
    address_level_2?: string;
    address_country?: string;
    address_zip?: string;
    address_state?: string;
    iconUrl:string;
    draggable:boolean;
    disableDefaultUI:boolean;
    padding:string;
    border: boolean;
    borderRadius:string;
    showDefaultInfoWindow:boolean;
    label:{};
    styles:any[];
    clickableIcons:boolean;
    imageSize:any[];
    gestureHandling:string;
   
  }
  