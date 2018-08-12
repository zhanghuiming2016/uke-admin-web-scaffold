// 用于文件上传,
// 参考：https://github.com/github/fetch/issues/89#issuecomment-256610849
function futch(url, opts = {}, onProgress) {
  return new Promise((res, rej) => {
    var xhr = new XMLHttpRequest();
    xhr.open(opts.method || 'get', url);
    for (var k in opts.headers || {}) xhr.setRequestHeader(k, opts.headers[k]);
    xhr.onload = e => res(e.target.responseText);
    xhr.onerror = rej;
    if (xhr.upload && onProgress) xhr.upload.onprogress = onProgress; // event.loaded / event.total * 100 ; //event.lengthComputable
    xhr.send(opts.body);
  });
}

export default futch;
// futch('/').then(console.log)
