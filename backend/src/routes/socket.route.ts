import { Server } from "socket.io";

export const initSocketRoutes = (io: Server) => {
    io.on("connection", (socket) => {
        console.log("A user connected");

        socket.on("like", (postId) => {
            console.log(`Post ${postId} was liked`);
            socket.broadcast.emit("postLiked", postId);
        });

        socket.on("disconnect", () => {
            console.log("A user disconnected");
        });
    });
};
