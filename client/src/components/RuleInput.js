import React from "react";

const RuleInput = props => {
  const { rule } = props;
  return (
    <React.Fragment>
      <div style={{ margin: "1em", display: "flex", flexDirection: "row" }}>
        <div style={{ flexBasis: "50%" }}>{rule.name}</div>
        <input
          type="number"
          style={{ flexBasis: "20%" }}
          value={rule.value || ""}
          onChange={props.onInputChange}
          name={rule.code}
        />
        <div style={{ flexBasis: "20%", marginLeft: "1em" }}>{rule.units}</div>
      </div>
    </React.Fragment>
  );
};

export default RuleInput;
