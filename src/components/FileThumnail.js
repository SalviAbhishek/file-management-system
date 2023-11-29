import React from "react";
import { constants } from "../Utils";
const FileThumbnail = ({ file }) => {
  const { file_type, url } = file;

  if (file_type.startsWith("image")) {
    return (
      <img
        style={{
          height: 100,
        }}
        className="card-img"
        src={constants?.serverUrl + url}
        alt="Image Thumbnail"
      />
    );
  } else if (file_type.startsWith("video")) {
    return (
      <div className="embed-responsive embed-responsive-16by9">
        <iframe
          style={{
            width: "100%",
            height: 95,
          }}
          className="embed-responsive-item"
          src={constants?.serverUrl + url}
          allowFullScreen
        ></iframe>
      </div>
    );
  } else if (file_type === "application/pdf") {
    return (
      <img
        src="/pdf-image.png"
        style={{
          height: 100,
          width: 100,
          alignSelf: "center",
        }}
        className="card-img"
      />
    );
  } else {
    // Add support for other document types here
    return <div>File type not supported</div>;
  }
};
export default FileThumbnail;
