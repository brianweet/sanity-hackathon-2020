import PropTypes from "prop-types";
import React from "react";
import FormField from "part:@sanity/components/formfields/default";
import PatchEvent, { set, unset } from "@sanity/form-builder/PatchEvent";
import styles from "./slider.css";
import TagsInput from "react-tagsinput";
import "../node_modules/react-tagsinput/react-tagsinput.css?raw";

export default class Tags extends React.Component {
  static propTypes = {
    type: PropTypes.shape({
      title: PropTypes.string
    }).isRequired,
    level: PropTypes.number,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired
  };

  focus() {
    this._inputElement.focus();
  }

  handleChange = event => {
    const inputValue = event.join(",");
    const patch = inputValue === "" ? unset() : set(inputValue);
    this.props.onChange(PatchEvent.from(patch));
  };

  render() {
    const { type, value, level } = this.props;
    const title = `${type.title}: ${value}`;
    const { min, max } = type.options.tags;
    const tags = value ? value.split(",") : [];
    return (
      <div>
        <FormField label={title} level={level} description={type.description}>
          <TagsInput value={tags} onChange={this.handleChange} />
        </FormField>
      </div>
    );
  }
}

Tags.defaultProps = {
  level: 1,
  value: 0
};
