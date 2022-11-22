import React from "react";
import AutoComplete from "./AutoCompleteComponent";
import classnames from "classnames";

const AutoCompleteClassroom = ({ ...props }) => {
  const { placeholder, onChange, setFieldValue, icon, data } = props;

  const temp = [];

  data.map((data) => {
    return temp.push({ id: data.id, name: data.fullname });
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
      name="account_id"
      id="account_id"
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
            setFieldValue("account_id", suggestion.id, false);
          }}
        >
          <span>{suggestion.name}</span>
        </li>
      )}
    />
  );
};

export default AutoCompleteClassroom;
