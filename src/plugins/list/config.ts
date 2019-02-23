import { AutoReplaceParams } from "slate-auto-replace";
import { ListPlugin } from ".";
import ListButtonBar from "./ListButtonBar";
import { RenderNode } from "./RenderNode";

const onChange: AutoReplaceParams["change"] = (editor, _, matches) => {
  if (matches.before[0] === "*") {
    return editor.setBlocks("li").wrapBlock("ol");
  } else {
    return editor.setBlocks("li").wrapBlock("ul");
  }
};

export default {
  type: "block",
  tag: "node",
  menuButtons: [{ button: ListButtonBar }],
  toolbarButtons: [],
  render: ({ next, ...props }: { next: () => {}; [key: string]: any }) => {
    return RenderNode(props.node.type, props);
  },
  identifier: ["li", "ol", "ul"],
  main: ListPlugin,
  markdown: {
    trigger: "space",
    before: /^(\*|-)$/,
    change: onChange
  }
};
