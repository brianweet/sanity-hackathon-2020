import Slider from "../components/Slider";
import Tags from "../components/Tags";

export default function resolveInput(type) {
  if (type.name === "number" && type.options && type.options.range) {
    return Slider;
  }
  if (type.name === "string" && type.options && type.options.tags) {
    return Tags;
  }
}
