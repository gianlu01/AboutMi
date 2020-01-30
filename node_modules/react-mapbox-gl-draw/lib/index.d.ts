import { Control } from 'mapbox-gl';
import * as React from 'react';
import { MapContext } from 'react-mapbox-gl';
declare type DrawHandler = (event: any) => void;
/**
 * User-facing props passed to <DrawControl />
 */
export interface DrawControlProps {
    boxSelect?: boolean;
    clickBuffer?: number;
    controls?: Partial<{
        point: boolean;
        line_string: boolean;
        polygon: boolean;
        trash: boolean;
        combine_features: boolean;
        uncombine_features: boolean;
    }>;
    default_mode?: string;
    displayControlsDefault?: boolean;
    keybindings?: boolean;
    modes?: object;
    onDrawActionable?: DrawHandler;
    onDrawCombine?: DrawHandler;
    onDrawCreate?: DrawHandler;
    onDrawDelete?: DrawHandler;
    onDrawModeChange?: DrawHandler;
    onDrawRender?: DrawHandler;
    onDrawSelectionChange?: DrawHandler;
    onDrawUncombine?: DrawHandler;
    onDrawUpdate?: DrawHandler;
    position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
    touchBuffer?: number;
    touchEnabled?: boolean;
    userProperties?: boolean;
    styles?: object[];
}
export default class DrawControl extends React.Component<DrawControlProps> {
    static contextType: React.Context<mapboxgl.Map | undefined>;
    static defaultProps: {
        position: string;
    };
    context: React.ContextType<typeof MapContext>;
    draw?: Control;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): null;
}
export {};
