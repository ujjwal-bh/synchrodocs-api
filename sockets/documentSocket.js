const Document  = require("../document/Document");

const findOrCreateDocument = async (id) => {
  if (id == null) return;
  const document = await Document.findById(id);
  if (document) return document;
  return await Document.create({ _id: id, data: "" });
};

module.exports = (io) => {
    io.on("connection", (socket) => {
        socket.on("get-document", async (documentId) => {
          console.log(documentId);
          const document = await findOrCreateDocument(documentId);
          socket.join(documentId);
          socket.emit("load-document", document.data);
          socket.on("send-changes", (delta) => {
            socket.broadcast.to(documentId).emit("receive-changes", delta);
          });
      
          socket.on("save-document", async (data)=> {
              await Document.findByIdAndUpdate(documentId, {data})
          })
        });
        socket.on('disconnect', () => {})
      });
}