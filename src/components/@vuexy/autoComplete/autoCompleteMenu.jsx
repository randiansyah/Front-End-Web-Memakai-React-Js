import React from "react";
import AutoComplete from "./AutoCompleteComponent";
import classnames from "classnames";
import iconSet from "../../../icons-data/icons-data";

const AutoCompleteMenu = ({ ...props }) => {
  const { placeholder, onChange, setFieldValue, icon } = props;

  const data = iconSet;

  return (
    <AutoComplete
      suggestions={data}
      placeholder={placeholder}
      className="form-control"
      filterKey="name"
      onChange={onChange}
      setFieldValue={setFieldValue}
      icon={icon}
      name="icon"
      id="icon"
      customRender={(
        suggestion,
        i,
        filteredData,
        activeSuggestion,
        onSuggestionItemClick,
        onSuggestionItemHover
      ) => (
        <li
          className={classnames("suggestion-item", {
            active: filteredData.indexOf(suggestion) === activeSuggestion,
          })}
          key={i}
          onMouseEnter={() =>
            onSuggestionItemHover(filteredData.indexOf(suggestion))
          }
          onClick={(e) => {
            onSuggestionItemClick(null, e);
            setFieldValue("icon", suggestion.name, false);
          }}
        >
          <i className={`fa ${suggestion.name}`} aria-hidden="true"></i>
          <span>{suggestion.icon}</span>
        </li>
      )}
    />
  );
};

export default AutoCompleteMenu;
