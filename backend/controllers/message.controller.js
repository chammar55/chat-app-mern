import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, resp) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id; // we added this in protectRoute middleware

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    // if initially conversation is empty then create one
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    // create new message
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    // push messages in this array
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    // SOCKET.IO FUNCTIONALITY WILL BE HERE

    // await conversation.save();
    // await newMessage.save();

    // This will run in parallel
    await Promise.all([conversation.save(), newMessage.save()]);
    resp.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller", error.message);
    resp.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req, resp) => {
  try {
    const { id: userToChatId } = req.params; // userToChatId is same as receiverId
    const senderId = req.user._id;

    // populate("messages"); will give us direct messages rather then the ids that are in conversation
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages"); //populate==> not reference but will give us actual message

    if (!conversation) return resp.status(200).json([]);

    const messages = conversation.messages;
    resp.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller", error.message);
    resp.status(500).json({ error: "Internal server error" });
  }
};
