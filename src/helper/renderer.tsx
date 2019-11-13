import React, { ReactNode } from "react";
import { PluginsMap } from "../plugins";
import { Plugin } from "slate-react";
import { nodeTypes, MARK } from "./util";

export type OriginalRenderNodeProps = Parameters<
  Required<Plugin>["renderBlock"]
>;

export interface RenderNodeHandler {
  (params: {
    props: OriginalRenderNodeProps[0];
    next?: OriginalRenderNodeProps[2];
    callbacks?: {
      [key: string]: any;
    };
    pluginsMap: PluginsMap;
  }): ReactNode;
}

// Search from the pluginsMap and give back the node to render
export const renderNode: RenderNodeHandler = ({
  props,
  next,
  callbacks,
  pluginsMap
}) => {
  if (pluginsMap.node[props.node.type]) {
    const RenderNode = pluginsMap.node[props.node.type].plugin.render;
    if (callbacks && callbacks.onBeforeRender) {
      callbacks.onBeforeRender({
        renderType: "node",
        type: props.node.type,
        props
      });
    }
    const noop = () => {};
    return <RenderNode {...props} next={next || noop} />;
  }
  return next && next();
};

export type OriginalRenderInlineProps = Parameters<
  Required<Plugin>["renderInline"]
>;

export interface RenderInlineHandler {
  (params: {
    props: OriginalRenderInlineProps[0];
    next?: OriginalRenderInlineProps[2];
    callbacks?: {
      [key: string]: any;
    };
    pluginsMap: PluginsMap;
  }): ReactNode;
}

// Search from the pluginsMap and give back the inline to render
export const renderInline: RenderInlineHandler = ({
  props,
  next,
  callbacks,
  pluginsMap
}) => {
  if (pluginsMap.inline[props.node.type]) {
    const RenderInline = pluginsMap.inline[props.node.type].plugin.render;
    if (callbacks && callbacks.onBeforeRender) {
      callbacks.onBeforeRender({
        renderType: nodeTypes.INLINE,
        type: props.node.type,
        props
      });
    }
    const noop = () => {};
    return <RenderInline {...props} next={next || noop} />;
  }
  return next && next();
};

export type OriginalRenderMarkProps = Parameters<
  Required<Plugin>["renderMark"]
>;

export interface RenderMarkHandler {
  (params: {
    props: OriginalRenderMarkProps[0];
    next?: OriginalRenderMarkProps[2];
    callbacks?: {
      [key: string]: any;
    };
    pluginsMap: PluginsMap;
  }): ReactNode;
}

// Search from the pluginsMap and give back the mark to render
export const renderMark: RenderMarkHandler = ({
  props,
  next,
  callbacks,
  pluginsMap
}) => {
  if (pluginsMap.mark[props.mark.type]) {
    const RenderMark = pluginsMap.mark[props.mark.type].plugin.render;
    if (callbacks && callbacks.onBeforeRender) {
      const onBeforeRender = callbacks.onBeforeRender({
        renderType: MARK,
        type: props.mark.type,
        props
      });
      if (onBeforeRender) return onBeforeRender;
    }
    return <RenderMark {...props} next={next} />;
  }
  return next && next();
};
