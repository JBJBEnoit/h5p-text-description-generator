import ContentType from "./contentType.js";
import H5P2Text from "../h5p2Text.js";

export default class CompositeContentType extends ContentType {
    constructor(h5p2Text) {
        super();
        if (!h5p2Text || !(h5p2Text instanceof H5P2Text)) {
            throw new Error("Invalid h5p2Text for CompositeContentType");
        }
        this.name = "CompositeContentType";
        this.h5p2Text = h5p2Text;
    }
}