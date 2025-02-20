import type {ComponentType} from "react";

export type Wrapper<TProps> = {
  Component: ComponentType<any>,
  props: TProps
}
