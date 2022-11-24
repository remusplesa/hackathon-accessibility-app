export function makeXhrRequest(
  eventTarget: any,
  imageUrl: string,
  fileName: string,
  fileType: string
): Promise<Response> {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    var requestData = new Uint8Array(eventTarget!.result as any);

    xhr.open("PUT", imageUrl, true);
    xhr.responseType = "blob";
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.setRequestHeader("X-File-Name", fileName);
    xhr.setRequestHeader("x-ms-blob-type", "BlockBlob");
    xhr.setRequestHeader(
      "Content-Type",
      fileType || "application/octet-stream"
    );
    xhr.setRequestHeader(
      "x-ms-blob-content-type",
      fileType || "application/octet-stream"
    );
    xhr.setRequestHeader("x-ms-version", "2016-05-31");

    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve({ success: true });
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText,
          success: false,
        });
      }
    };

    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: this.statusText,
        success: false,
      });
    };

    xhr.send(requestData);
  });
}

type Response = {
  success: boolean;
  status?: number;
  statusText?: string;
};
