import React from "react";
import RuleList from "./RuleList";
import ResultList from "./ResultList";
import * as ruleService from "../services/rule.service";
import Engine from "../services/tdm-engine";

class TdmCalculationContainer extends React.Component {
  calculationId = 1;
  engine = null;

  // These are the calculation results we want to calculate
  // and display on the main page.
  resultRuleCodes = [
    "PARK_REQUIREMENT",
    "PARK_RESIDENTIAL",
    "PARK_COMMERCIAL",
    "PARK_INSTITUTIONAL",
    "PARK_SCHOOL_OTHER"
  ];

  state = {
    rules: [],
    formInputs: {}
  };

  componentDidMount() {
    ruleService.getByCalculationId(this.calculationId).then(response => {
      console.log(response.data);
      this.engine = new Engine(response.data);
      this.engine.run(this.state.formInputs, this.resultRuleCodes);
      this.setState({
        rules: this.engine.showRulesArray()
      });
    });
  }

  onInputChange = e => {
    const ruleCode = e.target.name;
    const value = e.target.value;
    if (!ruleCode) {
      throw new Error("Input is missing name attribute");
    }
    const rule = this.state.rules.filter(rule => rule.code === ruleCode);
    if (!rule) {
      throw new Error("Rule not found for code " + ruleCode);
    }

    // Convert value to appropriate Data type
    if (rule.dataType === "number") {
      value = value ? Number.parseFloat(value) : 0;
    }

    const formInputs = {
      ...this.state.formInputs,
      [e.target.name]: value
    };
    this.engine.run(formInputs, this.resultRuleCodes);
    const rules = this.engine.showRulesArray();
    // update state with modified formInputs and rules
    this.setState({ formInputs, rules });
  };

  render() {
    const { rules } = this.state;
    const inputRules =
      rules && rules.filter(rule => rule.category === "input" && rule.used);
    const resultRules =
      rules && rules.filter(rule => this.resultRuleCodes.includes(rule.code));
    return (
      <div>
        <h1>TDM Calculation</h1>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <div style={{ width: "60%" }}>
            {rules && rules.length > 0 ? (
              <RuleList rules={inputRules} onInputChange={this.onInputChange} />
            ) : (
              <div>No Rules Loaded</div>
            )}
          </div>
          <div style={{ width: "40%" }}>
            {rules && rules.length > 0 ? (
              <ResultList rules={resultRules} />
            ) : (
              <div>No Rules Loaded</div>
            )}
          </div>
        </div>
        <pre>{JSON.stringify(rules, null, 2)}</pre>
      </div>
    );
  }
}

export default TdmCalculationContainer;
