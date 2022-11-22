import { useDropzone } from "react-dropzone";
import React, { useState, useEffect } from "react";
import { Button, Label } from "reactstrap";

export const ProgrammaticallyDropzone = (props) => {
  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps, open } = useDropzone({
    accept: "image/*",
    noClick: true,
    noKeyboard: true,
    onDrop: (acceptedFiles) => {
      props.setNewAvatar &&
        props.setNewAvatar(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
      props.setFieldValue && props.setFieldValue("photos", acceptedFiles[0]);
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = files.map((file) => (
    <div className="dz-thumb" key={file.name}>
      <div className="dz-thumb-inner">
        <img
          src={file.preview}
          className="dz-img mt-1"
          style={{ objectFit: "cover", objectPosition: "center" }}
          width="150px"
          height="150px"
          alt={file.name}
        />
      </div>
    </div>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <section>
      <div {...getRootProps({ className: "dropzone" })}>
        {props.flag === "from_update" ? null : (
          <Label for="photos">
            <b>Foto Profil</b>
          </Label>
        )}
        <input {...getInputProps()} id="photos" name="photos" />
      </div>
      <Button.Ripple color="primary" outline onClick={open}>
        Upload Foto
      </Button.Ripple>
      {props.values === "" || props.flag === "from_update" ? null : (
        <aside className="thumb-container">{thumbs}</aside>
      )}
    </section>
  );
};
