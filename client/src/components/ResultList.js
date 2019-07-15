import React from "react";
import ResultView from "./ResultView";

const ResultList = props => {
  const { rules } = props;
  return (
    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
      {rules && rules.length > 0
        ? rules.map(rule => <ResultView key={rule.id} rule={rule} />)
        : null}
    </div>
  );
};

export default ResultList;
