import ReactHtmlParser from "react-html-parser";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "ckeditor5-custom-build";
import Sign from "./sign";

const SC = () => {
  let aaa = "aaaaa";

  function MentionCustomization(editor) {
    // The upcast converter will convert view <a class="mention" href="" data-user-id="">
    // elements to the model 'mention' text attribute.
    editor.conversion.for("upcast").elementToAttribute({
      view: {
        name: "a",
        key: "data-mention",
        classes: "mention",
        attributes: {
          href: true,
          "data-user-id": true,
        },
      },
      model: {
        key: "mention",
        value: (viewItem) => {
          // The mention feature expects that the mention attribute value
          // in the model is a plain object with a set of additional attributes.
          // In order to create a proper object use the toMentionAttribute() helper method:
          const mentionAttribute = editor.plugins
            .get("Mention")
            .toMentionAttribute(viewItem, {
              // Add any other properties that you need.
              link: viewItem.getAttribute("href"),
              userId: viewItem.getAttribute("data-user-id"),
            });

          return mentionAttribute;
        },
      },
      converterPriority: "high",
    });

    // Downcast the model 'mention' text attribute to a view <a> element.
    editor.conversion.for("downcast").attributeToElement({
      model: "mention",
      view: (modelAttributeValue, { writer }) => {
        // Do not convert empty attributes (lack of value means no mention).
        if (!modelAttributeValue) {
          return;
        }

        return writer.createAttributeElement(
          "a",
          {
            class: "mention",
            "data-mention": modelAttributeValue.id,
            "data-user-id": modelAttributeValue.userId,
            href: modelAttributeValue.link,
          },
          {
            // Make mention attribute to be wrapped by other attribute elements.
            priority: 20,
            // Prevent merging mentions together.
            id: modelAttributeValue.uid,
          }
        );
      },
      converterPriority: "high",
    });
  }

  return (
    <div className="App">
      <div className="all">
        <div className="App">
          <h2>Using CKEditor 5 build in React</h2>
          <CKEditor
            editor={ClassicEditor}
            config={{
              plugins: [...ClassicEditor.builtinPlugins],
              mention: {
                feeds: [
                  // Feed items as objects.
                  {
                    marker: "@",
                    feed: [
                      {
                        id: "@Address",
                        fullName: "@Barney Bloom",
                      },
                      {
                        id: "@Price",
                        fullName: "Lily Smith",
                      },
                      {
                        id: "@Discount",
                        fullName: "Marshall McDonald",
                      },
                      {
                        id: "@Name",
                        fullName: "Robin Hood",
                      },
                      {
                        id: "@House Property",
                        fullName: "Ted Cruze",
                      },
                      // ...
                    ],
                  },

                  // Feed items as plain strings.
                ],
              },

              toolbar: {
                items: [
                  "heading",
                  "|",
                  "alignment", // <--- ADDED
                  "bold",
                  "italic",
                  "underline",
                  "strikethrough",
                  "todolist",
                  "link",
                  "bulletedList",
                  "numberedList",
                  "code",
                  "mediaembedtoolbar",
                  "highlight",
                  "undo",
                  "redo",
                  "|",
                  "mediaEmbed",
                  "simpleuploadadapter",
                  "imageupload",
                ],
              },

              image: {
                toolbar: [
                  "imageStyle:inline",
                  "imageStyle:block",
                  "imageStyle:side",
                  "|",
                  "toggleImageCaption",
                  "imageTextAlternative",
                ],
              },
              ckfinder: {
                // Upload the images to the server using the CKFinder QuickUpload command
                // You have to change this address to your server that has the ckfinder php connector
                uploadUrl:
                  "https://example.com/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Images&responseType=json",
              },
              headers: {
                "X-CSRF-TOKEN": "CSRF-Token",
                Authorization: "Bearer <JSON Web Token>",
              },
            }}
            onChange={(event, editor) => {
              let data = ReactHtmlParser(editor.getData());
              console.log(data[0].props.children[0]);
              console.log(editor.getData());
            }}
            onBlur={(event, editor) => {
              console.log("Blur.", editor);
            }}
            onFocus={(event, editor) => {
              console.log("Focus.", editor);
            }}
          />

        </div>
        <Sign />
      </div>
    </div>
  );
};

export default SC;
