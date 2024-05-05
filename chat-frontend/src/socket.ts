import { io } from "socket.io-client";

export const socket = io("http://localhost:9000", {
  transports: ["websocket"],
  /* auth: {
    passport:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI5ZGYxYzRjMS0wYjc1LTQzOTgtODg2MC1hODZkMzk1ZmEwNmYiLCJuYW1lIjoiZXhhcGxlIiwiZW1haWwiOiJleGFtcGxAZ21haWwuY29tIiwiaWF0IjoxNzEzODQ1Nzc2LCJleHAiOjE3MTM4NjM3NzZ9.yRZya5K3UEWycoDOCQIH_VjgZ2NhsYVA7TK7hr_l6oQ",
  }, */
});
