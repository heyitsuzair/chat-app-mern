const messageSchema = require("../models/messageModel");
module.exports.addMsg = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await messageSchema.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });
    if (data) {
      return res.json({ msg: "Message Added Successfully" });
    } else {
      return res.json({ msg: "Internal Server Error" });
    }
  } catch (error) {
    console.error(error);
  }
};
module.exports.getAllMsg = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    const messages = await messageSchema
      .find({
        users: {
          $all: [from, to],
        },
      })
      .sort({ updatedAt: 1 });
    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });
    return res.json(projectedMessages);
  } catch (error) {
    console.error(error);
  }
};
