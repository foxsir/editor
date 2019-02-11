import React from "react";
import classnames from "classnames";

import { orderedListStrategy, isOrderedList } from "./ListUtils";
/* eslint-disable react/prop-types */
const OrderedListButton = ({ editor, className, style, type }) => {
    if (!editor) return <span />;
    return (
        <span
            style={style}
            type={type}
            onMouseDown={() =>
                orderedListStrategy(editor, "ordered-list")
            }
            className={classnames(
                "button slate-list-plugin--button",
                { active: isOrderedList(editor.value) },
                className
            )}
        >
            <span className="material-icons">format_list_numbered</span>
        </span>
    );
};
export default OrderedListButton;
