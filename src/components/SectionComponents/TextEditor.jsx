import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";


export default function TextEditor({name, control, label, defaultValue = ""}) {
  return (
    <div>
        {label && <label>{label}</label>}
        <Controller 
            name={name || "content"}
            control={control}
            render= {({field: {onChange}}) => (
                <Editor 
                    apiKey='fs460ukasi0u0zy1rvokbdu44kw62ezrltedcnq3kim9229y'
                    initialValue={defaultValue}
                    init={{
                    initialValue: defaultValue,
                    menubar: false,
                    height: 500,
                    plugins: [
                        "image",
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "preview",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "code",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                        "code",
                        "help",
                        "wordcount",
                        "anchor",
                    ],
                    toolbar: "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                    content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                    }}
                    onEditorChange={onChange}
                />
         )}
        />
    </div>
  )
}