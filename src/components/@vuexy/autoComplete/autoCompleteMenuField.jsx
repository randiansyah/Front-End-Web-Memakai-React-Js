import React from "react";
import AutoComplete from "./AutoCompleteComponent";
import classnames from "classnames";

const AutoCompleteMenuField = ({ ...props }) => {
  const { placeholder, onChange, setFieldValue, icon, data } = props;

  const temp = [{ name: "Induk", id: "1" }];

  data.map((data) => {
    return temp.push({ ...data });
  });

  return (
    <AutoComplete
      suggestions={temp}
      placeholder={placeholder}
      className="form-control"
      filterKey="name"
      onChange={onChange}
      setFieldValue={setFieldValue}
      icon={icon}
      name="parent_id"
      id="parent_id"
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
            setFieldValue("parent_id", suggestion.id, false);
          }}
        >
          <span>{suggestion.name}</span>
        </li>
      )}
    />
  );
};

export default AutoCompleteMenuField;
